from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

RIOT_API_KEY = os.getenv("RIOT_DEV_APIKEY")

# Maps the frontend's platform region codes to Riot's regional routing
# clusters (used by Account-V1 / Match-V5 endpoints)
ROUTING: dict[str, str] = {
    "NA1": "AMERICAS",
    "BR1": "AMERICAS",
    "EUW1": "EUROPE",
    "RU": "EUROPE",
    "JP1": "ASIA",
    "KR": "ASIA",
}

# Maps region codes to Riot's platform hosts (used by LoL-specific endpoints,
# e.g. League-V4, Champion-Mastery-V4)
PLATFORM_ROUTING: dict[str, str] = {
    "NA1": "na1",
    "EUW1": "euw1",
    "BR1": "br1",
    "JP1": "jp1",
    "KR": "kr",
    "RU": "ru",
}

def split_riot_id(raw: str) -> tuple[str, str]:
    """Clean up a combined 'GameName#TagLine' search string into its two parts."""
    cleaned = raw.replace(" ", "")
    if "#" not in cleaned:
        raise HTTPException(
            status_code=400,
            detail="Riot ID must be in the form GameName#TagLine",
        )
    game_name, tag_line = cleaned.split("#", 1)
    if not game_name or not tag_line:
        raise HTTPException(
            status_code=400,
            detail="Riot ID must include both a game name and a tag line",
        )
    return game_name, tag_line


app = FastAPI(title="Rift Lens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "framework": "FastAPI"}

# Step 1: PUUID Getter — checks if player riot account exists by gameName + tagLine
@app.get("/api/puuid")
async def get_puuid(
    riotId: str = Query(..., description="Combined Riot ID in the form GameName#TagLine"),
    region: str = Query(..., description="Region code: NA1, EUW1, BR1, JP1, KR, or RU"),
):
    gameName, tagLine = split_riot_id(riotId)

    routing = ROUTING.get(region.upper())
    if not routing:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown region '{region}'. Valid values: {list(ROUTING.keys())}",
        )

    base_url = f"https://{routing}.api.riotgames.com"
    headers = {"X-Riot-Token": RIOT_API_KEY}

    try:
        async with httpx.AsyncClient() as client:
            #Get account by riot ID
            resp = await client.get(
                f"{base_url}/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}",
                headers=headers,
            )
            resp.raise_for_status()
            account = resp.json()

    except httpx.HTTPStatusError as e:
        status = e.response.status_code
        if status == 404:
            raise HTTPException(status_code=404, detail="Player not found")
        if status == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired Riot API key")
        raise HTTPException(status_code=502, detail=f"Riot API error: {status}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach Riot API: {e}")

    return {
        "puuid": account["puuid"],
        "gameName": account.get("gameName"),
        "tagLine": account.get("tagLine"),
    }


# Step 2: Region Validator — confirms the PUUID is active in the selected region
@app.get("/api/player")
async def get_player(
    puuid: str = Query(..., description="Player Universal Unique Identifier (78 chars)"),
    region: str = Query(..., description="Region code: NA1, EUW1, BR1, JP1, KR, or RU"),
    game: str = Query(default="lol", description="Game to lookup active region"),
):
    routing = ROUTING.get(region.upper())
    if not routing:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown region '{region}'. Valid values: {list(ROUTING.keys())}",
        )

    base_url = f"https://{routing}.api.riotgames.com"
    headers = {"X-Riot-Token": RIOT_API_KEY}

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{base_url}/riot/account/v1/region/by-game/{game}/by-puuid/{puuid}",
                headers=headers,
            )
            resp.raise_for_status()
            data = resp.json()

    except httpx.HTTPStatusError as e:
        status = e.response.status_code
        if status == 404:
            raise HTTPException(status_code=404, detail="Player not active in the selected region")
        if status == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired Riot API key")
        raise HTTPException(status_code=502, detail=f"Riot API error: {status}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach Riot API: {e}")

    return {
        "puuid": data["puuid"],
        "game": data["game"],
        "activeRegion": data["region"],
    }


# Player Current Ranked Info
@app.get("/api/ranked")
async def get_ranked_info(
    puuid: str = Query(..., description="Player Universal Unique Identifier (78 chars)"),
    region: str = Query(..., description="Region code: NA1, EUW1, BR1, JP1, KR, or RU"),
):
    platform = PLATFORM_ROUTING.get(region.upper())
    if not platform:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown region '{region}'. Valid values: {list(PLATFORM_ROUTING.keys())}",
        )

    base_url = f"https://{platform}.api.riotgames.com"
    headers = {"X-Riot-Token": RIOT_API_KEY}

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{base_url}/lol/league/v4/entries/by-puuid/{puuid}",
                headers=headers,
            )
            resp.raise_for_status()
            entries: list[dict] = resp.json()

    except httpx.HTTPStatusError as e:
        status = e.response.status_code
        if status == 404:
            raise HTTPException(status_code=404, detail="Player not found on this platform")
        if status == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired Riot API key")
        raise HTTPException(status_code=502, detail=f"Riot API error: {status}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach Riot API: {e}")

    return [
        {
            "queueType": e["queueType"],
            "tier": e["tier"],
            "rank": e["rank"],
            "leaguePoints": e["leaguePoints"],
            "wins": e["wins"],
            "losses": e["losses"],
        }
        for e in entries
    ]


# Player Match History IDs
@app.get("/api/match-history")
async def get_match_history(
    puuid: str = Query(..., description="Player Universal Unique Identifier (78 chars)"),
    region: str = Query(..., description="Region code: NA1, EUW1, BR1, JP1, KR, or RU"),
    start: int = Query(default=0, ge=0, description="Index of the first match to return"),
    count: int = Query(default=10, ge=1, le=100, description="Number of match IDs to return"),
):
    routing = ROUTING.get(region.upper())
    if not routing:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown region '{region}'. Valid values: {list(ROUTING.keys())}",
        )

    base_url = f"https://{routing}.api.riotgames.com"
    headers = {"X-Riot-Token": RIOT_API_KEY}

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{base_url}/lol/match/v5/matches/by-puuid/{puuid}/ids",
                headers=headers,
                params={"start": start, "count": count},
            )
            resp.raise_for_status()
            match_ids: list[str] = resp.json()

    except httpx.HTTPStatusError as e:
        status = e.response.status_code
        if status == 404:
            raise HTTPException(status_code=404, detail="Player not found")
        if status == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired Riot API key")
        raise HTTPException(status_code=502, detail=f"Riot API error: {status}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach Riot API: {e}")

    return match_ids


# Match Details
@app.get("/api/match/{match_id}")
async def get_match_details(
    match_id: str,
    region: str = Query(..., description="Region code: NA1, EUW1, BR1, JP1, KR, or RU"),
):
    routing = ROUTING.get(region.upper())
    if not routing:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown region '{region}'. Valid values: {list(ROUTING.keys())}",
        )

    base_url = f"https://{routing}.api.riotgames.com"
    headers = {"X-Riot-Token": RIOT_API_KEY}

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{base_url}/lol/match/v5/matches/{match_id}",
                headers=headers,
            )
            resp.raise_for_status()
            data: dict = resp.json()

    except httpx.HTTPStatusError as e:
        status = e.response.status_code
        if status == 404:
            raise HTTPException(status_code=404, detail=f"Match '{match_id}' not found")
        if status == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired Riot API key")
        raise HTTPException(status_code=502, detail=f"Riot API error: {status}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach Riot API: {e}")

    info = data["info"]

    return {
        "endOfGameResult": info.get("endOfGameResult"),
        "gameDuration": info["gameDuration"],
        "gameType": info["gameType"],
        "participants": [
            {
                "puuid": p["puuid"],
                "championId": p["championId"],
                "kills": p["kills"],
                "deaths": p["deaths"],
                "assists": p["assists"],
            }
            for p in info["participants"]
        ],
    }


# Player Top 3 Champion Mastery
@app.get("/api/champion-mastery")
async def get_champion_mastery(
    puuid: str = Query(..., description="Player Universal Unique Identifier (78 chars)"),
    count: int = Query(default=3, description="Top 3 champion masteries to return"),
    region: str = Query(..., description="Region code: NA1, EUW1, BR1, JP1, KR, or RU"),
):
    platform = PLATFORM_ROUTING.get(region.upper())
    if not platform:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown region '{region}'. Valid values: {list(PLATFORM_ROUTING.keys())}",
        )

    base_url = f"https://{platform}.api.riotgames.com"
    headers = {"X-Riot-Token": RIOT_API_KEY}

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{base_url}/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top", 
                headers=headers,
                params={"count": count},
            )
            resp.raise_for_status()
            masteries: list[dict] = resp.json()

    except httpx.HTTPStatusError as e:
        status = e.response.status_code
        if status == 404:
            raise HTTPException(status_code=404, detail="Player not found on this platform")
        if status == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired Riot API key")
        raise HTTPException(status_code=502, detail=f"Riot API error: {status}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach Riot API: {e}")

    return [
        {
            "championId": m["championId"],
            "championLevel": m["championLevel"],
            "championPoints": m["championPoints"],
        }
        for m in masteries
    ]