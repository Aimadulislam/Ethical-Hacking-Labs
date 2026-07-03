# Developer Guide: System Customization & Contribution 🛠️

This guide outlines our development standards and contribution workflows for developers who want to add new tools, scripts, or exercises to the Secure Sandbox.

---

## 📐 Development Guidelines

### 1. Bash Scripting Standard
All shell scripts must be compliant with `ShellCheck`.
* Always use a standard shebang: `#!/bin/bash`.
* Always include safety parameters at the top of your scripts: `set -euo pipefail`.
* Wrap all variables in double quotes to prevent word splitting issues.
* Avoid using custom aliases; stick to standard POSIX-compliant options.

### 2. Python Coding Standard
All Python modules must align with `PEP 8` styling rules.
* Limit all code lines to a maximum of 79 characters.
* Use clear, explicit variable names instead of short abbreviations.
* Handle exceptions gracefully with specific try/except blocks.

---

## 🧪 Testing and Quality Control

Run the following validation checks before submitting a pull request:

```bash
# Run unit tests to verify script operations
python3 -m unittest discover -s tests -p "test_*.py"

# Run Bash integration tests
./tests/test_scripts.sh
```

Ensure all linting checks and unit tests pass before committing your changes.
