#!/bin/bash
# ==============================================================================
# Ethical Hacking Labs - SUID/SGID & Permission Auditor
# Defensive script auditing local workstation or server configuration.
# ==============================================================================

set -euo pipefail

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${BLUE}[AUDIT] Starting local directory write permissions inspection...${NC}"

# Finding world-writable configurations in local directory
echo -e "${BLUE}[AUDIT] Checking local directory world-writable elements...${NC}"
find . -type f -perm -o+w 2>/dev/null | while read -r filepath; do
    echo -e "${YELLOW}[WARNING] World writable file found:${NC} $filepath"
done

# Finding SUID executable helpers in system configuration (dry run or safe check)
echo -e "${BLUE}[AUDIT] Checking executable permission layouts...${NC}"
find . -type f -perm -4000 2>/dev/null | while read -r suidfile; do
    echo -e "${YELLOW}[SUID-FIND] Found SUID set binary in workspace:${NC} $suidfile"
done

echo -e "${GREEN}[AUDIT] Permission auditing completed.${NC}"
exit 0
