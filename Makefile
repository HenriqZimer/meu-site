# Variables
IMAGE_NAME := henriquezimermann/meu-site
TAG := latest
VERSION_TAG := $(shell date +%d-%m-%Y)

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  build          - Build Docker image with latest tag"
	@echo "  build-version  - Build Docker image with version tag"
	@echo "  push           - Push latest image to registry"
	@echo "  push-version   - Push versioned image to registry"
	@echo "  deploy         - Deploy to production (build + push + stack deploy)"
	@echo "  redeploy       - Update running services"
	@echo "  remove         - Remove stack"
	@echo "  dev            - Start development environment"
	@echo "  dev-stop       - Stop development environment"
	@echo "  test           - Start test environment"
	@echo "  test-stop      - Stop test environment"
	@echo "  clean          - Remove unused Docker resources"

# Build targets
.PHONY: build
build:
	@echo "Building Docker image: $(IMAGE_NAME):$(TAG)"
	@docker build --no-cache -t $(IMAGE_NAME):$(TAG) .

.PHONY: build-version
build-version:
	@echo "Building Docker image: $(IMAGE_NAME):$(VERSION_TAG)"
	@docker build --no-cache -t $(IMAGE_NAME):$(TAG) -t $(IMAGE_NAME):$(VERSION_TAG) .

# Push targets
.PHONY: push
push: build
	@echo "Pushing image: $(IMAGE_NAME):$(TAG)"
	@docker push $(IMAGE_NAME):$(TAG)

.PHONY: push-version
push-version: build-version
	@echo "Pushing images: $(IMAGE_NAME):$(TAG) and $(IMAGE_NAME):$(VERSION_TAG)"
	@docker push $(IMAGE_NAME):$(TAG)
	@docker push $(IMAGE_NAME):$(VERSION_TAG)

# Deploy targets
.PHONY: deploy
deploy: push-version
	@echo "Deploying to production..."
	@docker stack deploy -c docker-compose-swarm.yml meu-site

.PHONY: redeploy
redeploy:
	@echo "Updating services..."
	@docker service update --force meu-site_app

.PHONY: remove
remove:
	@echo "Removing stack..."
	@docker stack rm meu-site

# Development targets
.PHONY: dev
dev:
	@echo "Starting development environment..."
	@docker compose -f docker-compose-dev.yml up -d

.PHONY: dev-stop
dev-stop:
	@echo "Stopping development environment..."
	@docker compose -f docker-compose-dev.yml down

.PHONY: test
test:
	@echo "Starting test environment..."
	@docker compose -f docker-compose-teste.yml up -d

.PHONY: test-stop
test-stop:
	@echo "Stopping test environment..."
	@docker compose -f docker-compose-teste.yml down

# Cleanup
.PHONY: clean
clean:
	@echo "Cleaning up Docker resources..."
	@docker system prune -f
	@docker image prune -f