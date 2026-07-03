#!/bin/bash
# ==============================================================================
# Ethical Hacking Labs - Bash Scripts Verification Runner
# Validates parameters, help screens, error handling, and operational integrity.
# ==============================================================================

set -euo pipefail

# Visual Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SUCCESS_COUNT=0
FAILED_COUNT=0

log_section() {
    echo -e "\n${BLUE}======================================================================${NC}"
    echo -e "${BLUE}>>> $1${NC}"
    echo -e "${BLUE}======================================================================${NC}"
}

assert_exit_code() {
    local cmd="$1"
    local expected="$2"
    local desc="$3"

    echo -n "Running: $desc... "
    if eval "$cmd" > /dev/null 2>&1; then
        local actual=0
    else
        local actual=$?
    fi

    if [ "$actual" -eq "$expected" ]; then
        echo -e "${GREEN}PASS${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo -e "${RED}FAIL (Expected exit code $expected, got $actual)${NC}"
        FAILED_COUNT=$((FAILED_COUNT + 1))
    fi
}

assert_output_contains() {
    local cmd="$1"
    local expected_substring="$2"
    local desc="$3"

    echo -n "Running: $desc... "
    local output
    output=$(eval "$cmd" 2>&1)

    if [[ "$output" == *"$expected_substring"* ]]; then
        echo -e "${GREEN}PASS${NC}"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo -e "${RED}FAIL (Output did not contain: '$expected_substring')${NC}"
        echo -e "--- Output was ---"
        echo "$output"
        echo -e "------------------"
        FAILED_COUNT=$((FAILED_COUNT + 1))
    fi
}

log_section "Static Permissions & Shebang Audit"

# Check if executables have chmod +x
for script in scripts/setup.sh scripts/port_scanner.sh scripts/permission_audit.sh scripts/reset_lab.sh; do
    assert_exit_code "[ -x $script ]" 0 "Executable permission check for $script"
done

log_section "setup.sh Functional Tests"

# Test help menu
assert_output_contains "./scripts/setup.sh -h" "Usage:" "setup.sh -h prints usage help"
assert_output_contains "./scripts/setup.sh --help" "Usage:" "setup.sh --help prints usage help"

# Test diagnostic mode
assert_exit_code "./scripts/setup.sh --diagnose" 0 "setup.sh diagnose-only mode completes with exit code 0"

# Test failure mode with bad options
assert_exit_code "./scripts/setup.sh --invalid-arg-option" 1 "setup.sh terminates with exit code 1 for invalid options"

log_section "port_scanner.sh Functional Tests"

# Test help menu
assert_output_contains "./scripts/port_scanner.sh -h" "Usage:" "port_scanner.sh -h prints usage help"

# Test port scanning parsing
assert_output_contains "./scripts/port_scanner.sh -t 127.0.0.1 -p 99999" "Port 99999" "port_scanner.sh parses and tries ports"

log_section "permission_audit.sh Functional Tests"

# Test general audit execution
assert_exit_code "./scripts/permission_audit.sh" 0 "permission_audit.sh completes with exit code 0"
assert_output_contains "./scripts/permission_audit.sh" "Permission auditing completed" "permission_audit.sh prints completion marker"

log_section "reset_lab.sh Validation Tests"

# Validate compose file existence check
assert_exit_code "[ -f docker/docker-compose.yml ]" 0 "reset_lab.sh prerequisite compose file present check"

log_section "Test Summary Statistics"
echo -e "${BLUE}Successes:${NC} $SUCCESS_COUNT"
echo -e "${RED}Failures:${NC} $FAILED_COUNT"

if [ "$FAILED_COUNT" -eq 0 ]; then
    echo -e "${GREEN}ALL SCRIPT VERIFICATIONS PASSED SUCCESSFULLY!${NC}"
    exit 0
else
    echo -e "${RED}SOME SCRIPT VERIFICATIONS FAILED!${NC}"
    exit 1
fi
