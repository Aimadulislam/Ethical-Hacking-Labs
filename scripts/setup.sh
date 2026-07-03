#!/bin/bash
# ==============================================================================
# Ethical Hacking Labs - Environment Pre-requisite Checker & Setup Utility
# Safe educational orchestration script.
# ==============================================================================

set -euo pipefail

# Visual Color Variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_usage() {
    echo "Usage: ./setup.sh [options]"
    echo "Options:"
    echo "  -h, --help       Display this assistance menu"
    echo "  -d, --diagnose   Run pre-flight dependency diagnostics only"
}

# Parameter Parsing
diagnose_only=false
while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            print_usage
            exit 0
            ;;
        -d|--diagnose)
            diagnose_only=true
            shift
            ;;
        *)
            log_error "Unknown parameter: $1"
            print_usage
            exit 1
            ;;
    esac
done

log_info "Ethical Hacking Labs setup sequence initiated..."

# 1. Diagnostic Checks
check_tool() {
    if command -v "$1" &> /dev/null; then
        log_success "Found required tool: $1"
        return 0
    else
        log_warning "Missing recommended tool: $1"
        return 0
    fi
}

check_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        log_success "Found required tool: docker-compose"
        return 0
    elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
        log_success "Found required tool: docker compose"
        return 0
    else
        log_warning "Missing recommended tool: docker-compose"
        return 0
    fi
}

check_tool "docker"
check_docker_compose
check_tool "python3"
check_tool "pip3"

if [ "$diagnose_only" = true ]; then
    log_info "Diagnosis check sequence completed successfully."
    exit 0
fi

# 2. Workspace Directories Creation
log_info "Creating required subdirectory tree structures..."
mkdir -p labs scripts docker templates reports wordlists notes config resources examples docs screenshots assets tools

log_success "Ethical Hacking Lab workspace directories are structured and verified."
exit 0
