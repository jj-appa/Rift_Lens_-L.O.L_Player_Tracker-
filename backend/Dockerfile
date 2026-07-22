FROM python:3.12-slim

WORKDIR /app

# perl-base ships in the Debian base image for internal tooling (dpkg, tar); the app
# never uses Perl, so purge it to drop unrelated CVEs (e.g. Socket.xs) from image scans
RUN apt-get purge -y --allow-remove-essential perl-base \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
