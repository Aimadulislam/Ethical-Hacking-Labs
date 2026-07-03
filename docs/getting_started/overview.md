# Getting Started: Overview 🌟

This laboratory environment has been engineered to serve as a comprehensive system playground for studying modern cybersecurity domains.

## 👥 Target Audience
* **Computer Science Students**: Practical exposure to network protocols, socket sockets, and operating system permissions.
* **Security Engineers & Pentesters**: Refresh scripting techniques, validate SUID escalations, and practice Docker safety reviews.
* **System Administrators**: Learn security auditing, file integrity baselining, and secure permissions orchestration.

## 📦 Sandbox Foundations
The workstation separates tools into clean, logical blocks:
1. **Auditing Scripts**: Secure GNU Bash scripts designed to analyze permissions and perform local socket checks.
2. **Analysis Tools**: Lightweight Python modules that track directory integrity and compute web access logs distribution.
3. **Target Sandboxes**: Isolated, containerized Docker microservices simulating standard vulnerable setups.

## 🛡️ Sandbox Safety Matrix
Safety is a core architectural rule:
* **All tools** target localhost (`127.0.0.1`) only.
* No malicious binaries, exploit vectors, or system backdoors are stored in this workspace.
* All training networks leverage isolated Docker subnets with private bridging.
