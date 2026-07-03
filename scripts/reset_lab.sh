#!/bin/bash
# ==============================================================================
# Ethical Hacking Labs - Docker Container Lifecycle & Target Reset Utility
# Restores container targets to pristine, isolated status.
# ==============================================================================

set -euo pipefail

# Visual colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

COMPOSE_FILE="docker/docker-compose.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
    log_error "Compose manifest not found at $COMPOSE_FILE"
    exit 1
fi

log_info "Stopping active container simulation targets..."
docker compose -f "$COMPOSE_FILE" down --volumes --remove-orphans || true

log_info "Cleaning orphan storage bindings and volumes..."
docker volume prune -f || true

log_info "Re-deploying containerized educational targets in isolated subnet..."
docker compose -f "$COMPOSE_FILE" up -d --build

log_success "Educational targets successfully reset to base configuration. Lab is clean."
exit 0
