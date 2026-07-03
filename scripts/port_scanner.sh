#!/bin/bash
# ==============================================================================
# Ethical Hacking Labs - Port Scanner Utility (Pure Socket-Level Demonstration)
# Safe loop checking local loopback or assigned private hosts.
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

TARGET="127.0.0.1"
PORTS="80,443,8080"

print_usage() {
    echo "Usage: ./port_scanner.sh [-t target_host] [-p ports]"
    echo "Example: ./port_scanner.sh -t 127.0.0.1 -p 80,443,8080"
}

while getopts "t:p:h" opt; do
    case "$opt" in
        t) TARGET=$OPTARG ;;
        p) PORTS=$OPTARG ;;
        h|*) print_usage; exit 0 ;;
    esac
done

echo -e "${BLUE}[INFO] Scanning host:${NC} $TARGET"
IFS=',' read -ra PORT_ARR <<< "$PORTS"

for port in "${PORT_ARR[@]}"; do
    if (echo > "/dev/tcp/$TARGET/$port") &>/dev/null; then
        echo -e "${GREEN}[OPEN] Port $port is reachable.${NC}"
    else
        echo -e "${RED}[CLOSED] Port $port is not reachable.${NC}"
    fi
done

exit 0
