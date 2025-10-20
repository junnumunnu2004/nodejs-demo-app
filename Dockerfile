FROM node:18-alpine

WORKDIR /app

# Install only production dependencies first for better layer caching
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

