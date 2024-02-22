# Use the official PostgreSQL image from Docker Hub
FROM postgres:14.3

# Environment variables for PostgreSQL user and password
ENV POSTGRES_USER="edu"
ENV POSTGRES_PASSWORD="c8596sgw"

# Copy the SQL script into the container
COPY ./data/init.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port (5432)
EXPOSE 5432
