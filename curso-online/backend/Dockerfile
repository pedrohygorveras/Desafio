# Set the base image to node:alpine
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/app

# Copy all files from the context (Dockerfile directory) to the working directory
COPY . .

# Install project dependencies and run the migration command using npm
RUN npm install

# Expose port 8686, allowing external communication with the application
EXPOSE 8686

# Command to run when the container starts
# CMD ["npm", "run", "dev"]
CMD ["sh", "-c", "npm run migrate && npm run dev"]
