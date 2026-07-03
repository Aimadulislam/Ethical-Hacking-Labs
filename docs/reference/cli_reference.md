# Reference: CLI Command Guide 💻

A comprehensive reference guide for all command-line scripts and tools in this repository.

---

## 🛠️ `scripts/setup.sh`
The environment validator checks that your workstation meets the requirements to run the labs.

### Options
* `--diagnose`: Run the diagnostic scan and display a status report without installing packages.
* `-h`, `--help`: Display the usage help menu.

---

## 🛠️ `scripts/port_scanner.sh`
A lightweight, user-space port scanner that checks open sockets on your local networks.

### Options
* `-t <IP>`: Specify the target IP address (defaults to `127.0.0.1`).
* `-p <ports>`: Comma-separated list of ports to scan (defaults to `80,443,8080`).
* `-v`: Enable verbose debug logging.
* `-h`: Display the usage help menu.

---

## 🛠️ `scripts/permission_audit.sh`
The permission auditor checks system files for common misconfigurations and excessive privileges.

### Audits Performed
* Scans `/usr/bin` and `/usr/sbin` to list non-standard binaries with SUID flags.
* Checks local system folders for insecure permissions (such as paths with `777` permissions).

---

## 🛠️ `tools/file_integrity.py`
The integrity monitor computes and tracks SHA256 hashes of system files to detect tampering.

### Options
* `--dir <path>`: Specify the target directory to scan (defaults to `.`).
* `--create`: Calculate hashes and write them to `baseline.json`.
* `--verify <file>`: Compare current files against your saved baseline file.
