# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-03

### Added
- Core 10 module security education path manuals in `/labs`
- Complete cheat sheets for Linux, Networking, and Privilege Escalation in `/docs`
- Secure automation tools: local socket validation (`scripts/port_scanner.sh`) and permission checks (`scripts/permission_audit.sh`)
- Pre-requisite validation and local deployment wrappers (`scripts/setup.sh`, `scripts/reset_lab.sh`)
- Isolated Docker-Compose simulation targets for local web pentesting practice
- Report templates in `/templates` for professional CTF and pentesting documentation
- Configuration profiles inside `/config`
- Comprehensive python unit testing suites for log parsers and file integrity monitors (`tests/test_file_integrity.py`, `tests/test_log_analyzer.py`)
- Automated bash script verification test framework (`tests/test_scripts.sh`) ensuring robust execution bounds
- Full continuous integration (CI) tests running directly on commits and pull requests via GitHub Actions
