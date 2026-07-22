# Stage 1: build the static assets with Node
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first so this layer is cached unless package*.json changes
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source and produce the production build (tsc && vite build -> dist/)
COPY . .
RUN npm run build

# Stage 2: serve the build output with nginx (final image has no Node/node_modules)
FROM nginx:alpine

# Copy only the compiled static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback config so client-side routes don't 404 on refresh
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
