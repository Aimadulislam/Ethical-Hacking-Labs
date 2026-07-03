# 💼 Professional Cybersecurity Portfolio Presentation

Welcome to the professional portfolio showcase for the **Secure Sandbox Workstation**. This document highlights the engineering decisions, technical challenges, and problem-solving methodologies applied to create this project.

---

## 🎯 Project Summary & Elevator Pitch

The **Secure Sandbox Workstation** is a self-contained, offline-ready educational laboratory environment designed to teach secure system administration, network sockets, vulnerability assessments, and privilege escalation mechanics.

By combining containerized Docker targets, ShellCheck-compliant Bash utilities, and Python diagnostics with a polished React-based dashboard, the workspace provides an elegant, interactive system playground.

---

## 💻 Technical Overview & Architecture

The architecture focuses on complete local isolation, ensuring all network sockets and scripts are bound to loopback interfaces or private bridge networks.

```text
  [ User Interface ]  ---> React 18 / Tailwind Dashboard Console
                                  │
  [ Script Automation ] ---> Bash (setup.sh, port_scanner.sh, permission_audit.sh)
                                  │
  [ Program Diagnostics ] ---> Python 3 (integrity monitoring, access log analysis)
                                  │
  [ Target Sandboxes ] ---> Docker Engine (private subnets, custom bridges)
```

---

## 🏆 Key Skills Demonstrated

* **Systems Automation**: Developed robust, production-ready GNU Bash scripts leveraging safety constraints (`set -euo pipefail`) and custom socket redirects.
* **System Programming**: Developed clean, modular Python utilities implementing chunk-based SHA256 calculations and regex-based log parsing.
* **Infrastructure as Code**: Designed multi-container Docker Compose environments isolated on private bridge subnets to simulate realistic target scenarios.
* **Quality Engineering**: Configured automated GitHub Actions CI pipelines to run linter checks, unit tests, and shell validations on every change.
* **Interactive Design**: Designed a high-fidelity React 18/TypeScript dashboard featuring a simulated terminal console, folder explorer, and CVSS calculator.

---

## 🛠️ Problems Solved & Design Decisions

### 1. Safe Network Diagnostics without Complex Toolchains
* **Problem**: Standard port scanners (like `nmap`) require privileged access and can be heavy to install in lightweight, restricted environments.
* **Decision**: Developed `port_scanner.sh` using native Bash TCP socket redirection (`/dev/tcp/host/port`), allowing users to perform socket audits without administrative privileges or external dependencies.

### 2. File Integrity Checking with Low Memory Footprint
* **Problem**: Calculating hashes for large systems can consume significant memory and slow down workstations.
* **Decision**: Programmed `file_integrity.py` with chunk-based file reading (4KB blocks) to process files of any size efficiently with a flat, constant memory footprint of less than 15MB.

### 3. Container Isolation and Escape Prevention
* **Problem**: Vulnerable test applications can represent a security risk to the host computer if they are exposed to the wider network or run with root privileges.
* **Decision**: Configured Docker Compose files to bind ports strictly to `127.0.0.1`, disabled container privileges, and enforced low-privilege `USER` profiles inside container builds.

---

## 📝 Lessons Learned & Future Directions

* **Clean Shell Scripting is Critical**: Adhering to standards like `ShellCheck` prevents common scripting issues (such as word splitting or glob expansion) and improves reliability across different Linux distributions.
* **Monospace UI Enhances User Experience**: Pairing clear display typography with monospace fonts for terminal readouts and CVSS calculators improves readability and helps users interpret system data quickly.
* **Future Extension**: Plan to integrate automated static site generators (MkDocs/Material) to host documentation on GitHub Pages and add more isolated, multi-host network topologies.
