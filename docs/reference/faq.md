# Reference: Frequently Asked Questions (FAQ) ❓

This document answers common questions about the lab environment, setup requirements, and script troubleshooting.

---

### General Workspace

#### Q: Do I need root access on my host system to complete the labs?
**A**: You only need administrative privileges (`sudo`) to install Docker and build the container sandboxes. Once your user is added to the `docker` group, you can run all scripts and exercises as a standard user.

#### Q: Can I run this environment offline without an internet connection?
**A**: Yes! Once you have cloned the repository and built the Docker containers, the entire laboratory workspace can be run completely offline, with no external network dependencies.

---

### Script Troubleshooting

#### Q: Why does `permission_audit.sh` display "Permission Denied" errors?
**A**: Some system directories (like `/root`) are restricted. This is normal and expected. The script is designed to bypass restricted directories gracefully and display accessible misconfigurations without requiring administrative access.

#### Q: How can I change the default target port for scanning?
**A**: You can change the target port list by passing custom flags directly to the script:
```bash
./scripts/port_scanner.sh -p 80,443,8080
```
Alternatively, you can update the global defaults inside `config/config.yaml`.
