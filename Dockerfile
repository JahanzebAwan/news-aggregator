# Step 1: Use a Node.js base image to build the app
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use a lightweight Nginx server to serve the app
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will use
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
