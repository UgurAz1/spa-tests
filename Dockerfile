FROM mcr.microsoft.com/playwright:v1.51.0-noble

RUN apt-get update && apt-get install -y \
    poppler-utils \
    xvfb \
    fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npx playwright install --with-deps

