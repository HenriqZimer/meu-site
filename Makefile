# Variables
HARBOR_URL := harbor.henriqzimer.com.br
HARBOR_PROJECT := meu-site
BACKEND_IMAGE := $(HARBOR_URL)/$(HARBOR_PROJECT)/backend
FRONTEND_IMAGE := $(HARBOR_URL)/$(HARBOR_PROJECT)/frontend
TAG := latest
VERSION_TAG := $(shell date +%d-%m-%Y)

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  build-backend       - Build backend Docker image"
	@echo "  build-frontend      - Build frontend Docker image"
	@echo "  build-all           - Build both backend and frontend images"
	@echo "  push-backend        - Push backend image to Harbor"
	@echo "  push-frontend       - Push frontend image to Harbor"
	@echo "  push-all            - Push both images to Harbor"
	@echo "  deploy              - Build and push all images (CI/CD)"
	@echo "  redeploy            - Update running services"
	@echo "  remove              - Remove stack"
	@echo "  dev                 - Start development environment"
	@echo "  dev-stop            - Stop development environment"
	@echo "  test                - Start test environment"
	@echo "  test-stop           - Stop test environment"
	@echo "  clean               - Remove unused Docker resources"

# Build targets
.PHONY: build-backend
build-backend:
	@echo "Building backend image: $(BACKEND_IMAGE):$(TAG)"
	@docker build --no-cache \
		-t $(BACKEND_IMAGE):$(TAG) \
		-t $(BACKEND_IMAGE):$(VERSION_TAG) \
		./backend

.PHONY: build-frontend
build-frontend:
	@echo "Building frontend image: $(FRONTEND_IMAGE):$(TAG)"
	@docker build --no-cache \
		-t $(FRONTEND_IMAGE):$(TAG) \
		-t $(FRONTEND_IMAGE):$(VERSION_TAG) \
		./frontend

.PHONY: build-all
build-all: build-backend build-frontend

# Push targets
.PHONY: push-backend
push-backend: build-backend
	@echo "Pushing backend images to Harbor..."
	@docker push $(BACKEND_IMAGE):$(TAG)
	@docker push $(BACKEND_IMAGE):$(VERSION_TAG)

.PHONY: push-frontend
push-frontend: build-frontend
	@echo "Pushing frontend images to Harbor..."
	@docker push $(FRONTEND_IMAGE):$(TAG)
	@docker push $(FRONTEND_IMAGE):$(VERSION_TAG)

.PHONY: push-all
push-all: push-backend push-frontend

# Deploy targets
.PHONY: deploy
deploy: push-all
	@echo "All images built and pushed to Harbor successfully!"
	@echo "Backend: $(BACKEND_IMAGE):$(TAG) and $(BACKEND_IMAGE):$(VERSION_TAG)"
	@echo "Frontend: $(FRONTEND_IMAGE):$(TAG) and $(FRONTEND_IMAGE):$(VERSION_TAG)"

.PHONY: redeploy
redeploy:
	@echo "Updating services..."
	@docker service update --force meu-site_backend
	@docker service update --force meu-site_frontend

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