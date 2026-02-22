# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (including dev dependencies for TypeScript compilation)
RUN npm install

# Copy application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]

