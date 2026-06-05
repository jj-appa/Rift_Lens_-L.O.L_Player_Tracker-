from fastapi import FastAPI

app = FastAPI(title="LOL Player Tracker API")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "framework": "FastAPI"}

@app.get("/api/players")
def get_players():
    return {
        "message": "This endpoint will return League of Legends player data from the Riot API.",
        "example": {
            "summonerName": "ExamplePlayer",
            "region": "NA1",
        },
    }


