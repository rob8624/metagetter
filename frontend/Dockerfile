# Use Node.js to build the React app
FROM node:18-slim as build

# Set working directory for React app inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json from the current directory to the container
COPY ./package.json ./package-lock.json ./
RUN npm install

# Copy all React source files from the current directory to the container
COPY ./ ./

# Build the React app
RUN npm run build

CMD ["npm", "start"]