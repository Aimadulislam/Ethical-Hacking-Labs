# Getting Started: Quick Start 🚀

Get your laboratory workspace running and perform your first system audits in less than two minutes.

---

## ⚡ 1. Launch the Sandboxed Targets
Boot the local, isolated test web containers. This sets up a private Docker network and starts a mock target web service:
```bash
docker compose -f docker/docker-compose.yml up -d
```

Confirm that the target service is active and listening on port `8080`:
```bash
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
```

---

## ⚡ 2. Execute a Safe TCP Port Scan
Use our lightweight port scanner to check open sockets and extract host banners:
```bash
chmod +x scripts/port_scanner.sh
./scripts/port_scanner.sh -t 127.0.0.1 -p 8080,9000 -v
```

---

## ⚡ 3. Check for Insecure World-Writable Directories
Run our permission auditing tool to detect directory misconfigurations (such as paths with excessive `777` permissions):
```bash
chmod +x scripts/permission_audit.sh
./scripts/permission_audit.sh
```

---

## ⚡ 4. Compute Folder Hash Integrity Baselines
Create a baseline hash index to track system changes and detect modified files:
```bash
python3 tools/file_integrity.py --dir config/ --create
```

Modify a file, then verify the baseline to see how the system identifies changes:
```bash
echo "# Altered parameter" >> config/settings.ini
python3 tools/file_integrity.py --dir config/ --verify baseline.json
```

---

## ⚡ 5. Tear Down and Clean Up
When you complete your training sessions, stop and reset the container sandbox to clean up system volumes and interfaces:
```bash
./scripts/reset_lab.sh
```
