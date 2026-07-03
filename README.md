# Ethical Hacking Labs (Educational Laboratory)

[![Security Research](https://img.shields.io/badge/Security-Educational-brightgreen.svg)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Linux / Docker](https://img.shields.io/badge/Platform-Linux%20%7C%20Docker-orange.svg)](https://github.com/)
[![ShellCheck: Passed](https://img.shields.io/badge/ShellCheck-Passed-emerald.svg)](https://github.com/)

An elite, production-quality educational laboratory environment and security repository designed for learning, practicing, and mastering modern ethical hacking, system administration, and security automation.

> **⚠️ EDUCATIONAL DISCLAIMER**
> This repository is strictly for educational purposes, authorized security testing, and defensive research in isolated environments. All demonstrations, tools, and manuals are confined to local, self-owned lab targets (such as intentionally vulnerable Docker containers or virtual machines). Unauthorized scanning or targeting of external networks is illegal.

---

## 🗺️ Learning Path & Modules

This repository is organized into 10 structured, progressive labs covering essential cybersecurity domains:

1. **Lab 01: Linux System Administration & Basics** – Command-line efficiency, permissions auditing, system configs.
2. **Lab 02: Network Foundations & TCP/IP** – In-depth inspection of packets, DNS lookups, routing, and sockets.
3. **Lab 03: Enumeration & Active Reconnaissance** – Port scanning methodology, banner grabbing, host discovery.
4. **Lab 04: Vulnerability Assessment & Analysis** – Identifying configuration flaws and outdated services.
5. **Lab 05: Web Security & OWASP Top 10** – Hands-on simulated analysis of SQL Injection, XSS, and broken auth.
6. **Lab 06: Linux Privilege Escalation** – SUID misconfigurations, cron auditing, kernel checks, and group analysis.
7. **Lab 07: Windows Privilege Escalation** – Active Directory concepts, service permission flaws, token abuse.
8. **Lab 08: Docker Security & Containment** – Auditing daemon configs, escaping containers, and securing build manifests.
9. **Lab 09: Professional Security Reporting** – Drafting Executive summaries, findings logs, and recommendation tables.
10. **Lab 10: Capture The Flag (CTF) Workflow** – Developing a systematic approach to solving security challenges.

---

## 📂 Repository Directory Structure

```text
Ethical-Hacking-Labs/
├── README.md               # Main documentation and quick start guide
├── LICENSE                 # MIT License details
├── CHANGELOG.md             # Project history and releases
├── CONTRIBUTING.md         # Open source participation guidelines
├── CODE_OF_CONDUCT.md       # Community standards and code of conduct
├── .gitignore              # Ignored system files and sensitive logs
├── docs/                   # Exhaustive cheat sheets and theoretical foundations
│   ├── linux_basics.md
│   ├── networking.md
│   ├── web_security.md
│   ├── priv_esc.md
│   └── ctf_methodology.md
├── labs/                   # Hands-on interactive laboratory exercise manuals
│   ├── lab01_linux.md
│   ├── lab02_networking.md
│   ├── lab03_enumeration.md
│   ├── lab04_vuln_assessment.md
│   ├── lab05_web_security.md
│   ├── lab06_linux_privesc.md
│   ├── lab07_win_privesc.md
│   ├── lab08_docker.md
│   ├── lab09_reporting.md
│   └── lab10_ctf_workflow.md
├── scripts/                # Production-grade Bash scripts for automation and audits
│   ├── setup.sh            # Complete environment pre-requisite installer
│   ├── reset_lab.sh        # Restores docker targets to a clean state
│   ├── port_scanner.sh     # Colorized socket-level host verification wrapper
│   └── permission_audit.sh # Deep system security permission auditing script
├── docker/                 # Deployment manifests for local isolated test targets
│   ├── docker-compose.yml  # Multi-container isolated target orchestration
│   └── vulnerable-app/     # Containerized educational target application
├── templates/              # Standard report formats
│   └── report_template.md  # Markdown assessment report format
└── config/                 # Central settings
    ├── config.yaml         # Tool global configurations
    └── settings.ini        # Local laboratory defaults
```

---

## 🛠️ Quick Start & Lab Deployment

### Prerequisite Verification
Ensure your environment has the required dependencies:
* Linux (Ubuntu 20.04 LTS or newer recommended)
* Docker & Docker Compose v2
* Python 3.10+
* Bash shell

### 1. Initialize and Validate Environment
Run the secure environment checker and setup utility to install missing diagnostics tools:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Boot Local Lab Containers
Launch the safe, containerized local practice applications:
```bash
docker compose -f docker/docker-compose.yml up -d
```

Verify that containers are up and isolated on the custom network `hacking_lab_net` by running:
```bash
docker ps
```

### 3. Run Simulated Audits
Execute the local port scanner on the isolated lab network range:
```bash
chmod +x scripts/port_scanner.sh
./scripts/port_scanner.sh -t 127.0.0.1 -p 80,443,8080
```

---

## 📋 Security Guidelines & Best Practices
1. **Never** execute scripts against production devices or targets you do not explicitly own.
2. Ensure Docker containers are bound strictly to `127.0.0.1` and never exposed to the wider public internet.
3. Keep the laboratory isolated on a private virtual adapter to prevent lateral movement.
4. Routinely monitor file changes using the provided Python File Integrity check scripts.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
