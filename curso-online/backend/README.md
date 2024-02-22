# Running PostgreSQL Docker Container

This Dockerfile is designed to create a PostgreSQL Docker container with a specified user, password, and an initial SQL script for database setup.

## Prerequisites

Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

## Build the Docker Image

To build the Docker image, navigate to the directory containing your Dockerfile and run the following command in the terminal:

```bash
docker build -t postgres .
```

## Run the PostgreSQL Container

Once the Docker image is built, you can run the PostgreSQL container using the following command:

```bash
docker run -d -p 5432:5432 --name postgres-container postgres
```
