# 🛡️ Security Policy

## 🔒 1. Safe Hacking Agreement & Educational Mandate
The **Secure Sandbox** is designed strictly as an educational workstation and system playground to study administrative defense, network sockets, vulnerability scans, and privilege escalation vectors.

* **Non-Destructive Standard**: All scripts, exercises, and target containers inside this repository are designed to be run within local loopback networks (`127.0.0.1`) or isolated Docker subnets.
* **Prohibited Actions**: Execution of any tools or modified scripts from this workspace against external host networks, live commercial servers, or assets for which you do not possess explicit, written, and authorized permission is strictly forbidden.
* **Malicious Contributions**: We do not accept pull requests or issues containing active exploits, remote control backdoors, network-flooding utilities, or keyloggers.

---

## 📞 2. Reporting a Vulnerability
We are committed to maintaining a safe, stable system playground. If you identify a security issue in our diagnostic scripts, container configurations, or interface code, please report it immediately.

### Reporting Process
1. **Do Not Open a Public Issue**: To prevent exposing local workstations to potential security risks, please do not report vulnerabilities via public GitHub issues.
2. **Email the Maintainers**: Send a detailed report describing the vulnerability, its potential impact, and a step-by-step proof of concept (PoC) to the repository administrator.
3. **Coordinated Response**: We will acknowledge your report within 48 hours, coordinate a resolution, and issue a patch in our next semantic release.

---

## 🛠️ 3. Safe Sandbox Defaults
To safeguard your host machine during exercises:
* **Ports**: By default, all container endpoints are bound strictly to `127.0.0.1` (`ports: ["127.0.0.1:8080:80"]`) to block incoming connections from your local area network (LAN).
* **Least Privilege**: Application processes inside our vulnerable containers are configured to run under low-privilege system accounts (`USER node` or `USER alpine`) rather than `root`.
* **Resource Limits**: Our Docker Compose configurations implement resource constraints (CPU and memory bounds) where appropriate to prevent denial-of-service conditions on host machines.
