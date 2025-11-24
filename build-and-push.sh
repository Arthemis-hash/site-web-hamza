#!/bin/bash

# Docker Hub credentials
DOCKER_USER="meddiabubbletech"
IMAGE_NAME="manos-expertas"
TAG="latest"

# Build the Docker image
docker build -t $DOCKER_USER/$IMAGE_NAME:$TAG .

# Log in to Docker Hub using GitHub token
echo $GITHUB_TOKEN | docker login -u $DOCKER_USER --password-stdin

# Push the image to Docker Hub
docker push $DOCKER_USER/$IMAGE_NAME:$TAG

echo "Image pushed: $DOCKER_USER/$IMAGE_NAME:$TAG"
