# Guides: Troubleshooting & Diagnostics 🔧

This guide outlines step-by-step diagnostic workflows to resolve issues with system installations, Docker containers, and script errors.

---

## 🐋 1. Docker & Container Issues

### Issue: "Cannot connect to the Docker daemon. Is the docker daemon running?"
This error occurs when the Docker background process is stopped or your current user lacks the privileges to communicate with the Docker socket.

* **Resolution 1: Verify the service is running**
  Ensure the Docker service is enabled and active on your system:
  ```bash
  sudo systemctl status docker
  # If stopped, run:
  sudo systemctl start docker
  ```
* **Resolution 2: Check user group membership**
  Confirm your user belongs to the `docker` system group:
  ```bash
  groups | grep docker
  # If missing, add your user:
  sudo usermod -aG docker $USER
  ```
  *Note: You must log out and log back in (or run `newgrp docker`) to apply group membership changes.*

### Issue: "Port 8080 is already in use by another process."
This happens when another service (such as Apache, Nginx, or an alternate container) is already bound to port `8080`.

* **Resolution: Find and stop the competing service**
  Identify the process currently listening on port `8080`:
  ```bash
  sudo ss -tulpn | grep :8080
  # Or:
  sudo lsof -i :8080
  ```
  Stop the identified service, or modify the host port binding in `docker/docker-compose.yml` (e.g., change `"127.0.0.1:8080:80"` to `"127.0.0.1:9090:80"`).

---

## 🐚 2. Bash Script Failures

### Issue: `/bin/bash^M: bad interpreter: No such file or directory`
This issue occurs when repository files are cloned or edited on Windows and retain carriage return characters (`\r\n` or CRLF line endings) instead of standard Linux line feeds (`\n` or LF line endings).

* **Resolution: Strip carriage returns**
  Convert the script files back to Unix-compliant formatting:
  ```bash
  sed -i -e 's/\r$//' scripts/*.sh
  # Or use dos2unix:
  sudo apt install -y dos2unix
  dos2unix scripts/*.sh
  ```

### Issue: Permission Denied when launching a script
By default, scripts cloned from git may lose their executable permissions depending on your system configuration.

* **Resolution: Grant executable permissions**
  ```bash
  chmod +x scripts/*.sh
  ```

---

## 🐍 3. Python Execution Issues

### Issue: `ModuleNotFoundError: No module named '...'`
Our core diagnostic tools (`tools/file_integrity.py` and `tools/log_analyzer.py`) rely strictly on standard Python library modules (like `hashlib`, `argparse`, and `collections`). If you encounter import issues, ensure you are running python natively:

* **Resolution: Verify your Python path**
  Ensure you are using Python 3:
  ```bash
  python3 --version
  ```
  Ensure you are launching the scripts with `python3` rather than a legacy Python 2 interpreter.
