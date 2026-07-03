# User Guide: Operational Workflows 🧑‍💻

This guide provides instructions on how to use our automation scripts, diagnostic utilities, and reporting tools during your exercises.

---

## 🛠️ Port Scanner Wrapper (`scripts/port_scanner.sh`)

The port scanner checks open ports on your local test servers using native socket tools.

### Command Flags
* `-t <IP>`: Specify the target IP address (defaults to `127.0.0.1`).
* `-p <ports>`: Comma-separated list of ports to scan (defaults to `80,443,8080`).
* `-v`: Enable verbose debug logging.
* `-h`: Display the help menu.

### Example Operations
Scan a local container with verbose logging:
```bash
./scripts/port_scanner.sh -t 127.0.0.1 -p 80,8080 -v
```

---

## 📊 File Integrity Monitor (`tools/file_integrity.py`)

The integrity monitor calculates and registers SHA256 hashes for system files to detect unauthorized changes or tampering.

### Core Operations
* **Create Baseline**: Scan and save a trusted hash snapshot of a target folder:
  ```bash
  python3 tools/file_integrity.py --dir config/ --create
  ```
  This creates a `baseline.json` database containing the safe file index.

* **Verify Integrity**: Compare current files against your saved baseline database:
  ```bash
  python3 tools/file_integrity.py --dir config/ --verify baseline.json
  ```

---

## 📑 Web Access Log Parser (`tools/log_analyzer.py`)

The log analyzer scans web server logs to parse response codes, identify requesting IP addresses, and flag authorization failures.

### Usage
Run the analyzer against your web server's access log:
```bash
python3 tools/log_analyzer.py --log /var/log/nginx/access.log
```

The tool compiles HTTP status codes, counts requests per IP address, and alerts you to potential brute-force activities.
