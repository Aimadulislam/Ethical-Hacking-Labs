# Contributing to Secure Sandbox 🤝

Thank you for your interest in improving the **Secure Sandbox Laboratory Workstation**! We welcome educational audits, script improvements, documentation enhancements, and containerized laboratory additions.

By contributing to this project, you help security researchers, system administrators, and students learn defensive and administrative cybersecurity mechanics in a safe, fully isolated environment.

---

## 📜 Code of Conduct & Safety Guidelines

### 🔒 1. Strict Safety Boundary
We **strictly enforce** an educational, defensive-only mandate.
* We **DO NOT** accept any submissions containing active malware, remote exploit scripts, phishing templates, reverse shell backdoors, or credential harvesters.
* All port scanners, permission monitors, and log analyzers must target local host environments (`127.0.0.1`) only and rely strictly on standard user-space privileges.

### 📝 2. Code Quality Standards
* **Bash Shell Scripts**: Must pass `ShellCheck` validations with zero errors or warnings, and implement the standard error parameters:
  ```bash
  set -euo pipefail
  ```
* **Python Utilities**: Must conform to `PEP 8` styling guidelines, use explicit variable naming, and implement chunk-based memory-safe file reading.
* **Documentation & Labs**: Must be written in clear, concise markdown with detailed, high-impact Mermaid flowcharts and step-by-step instructions.

---

## 🚀 Step-by-Step Contribution Workflow

### 1. Fork and Clone the Repository
Fork this repository to your GitHub profile, then clone it to your host machine:
```bash
git clone https://github.com/your-username/Secure-Sandbox-Ethical-Hacking-Labs.git
cd Secure-Sandbox-Ethical-Hacking-Labs
```

### 2. Create a Feature Branch
Use descriptive, standard prefix names for your branches:
* For features: `feature/your-feature-name`
* For bug fixes: `fix/your-bug-name`
* For documentation: `docs/your-doc-name`

```bash
git checkout -b feature/add-new-lab-module
```

### 3. Implement and Test Your Changes
Make your changes inside the workspace, ensuring no API keys, credentials, or sensitive host parameters are committed.

Run our automated script and tool test suites before committing:
```bash
# Run Python unittests
python3 -m unittest discover -s tests -p "test_*.py"

# Run Bash script integration audits
./tests/test_scripts.sh
```

### 4. Open a Pull Request
Commit your changes with clear, descriptive commit messages matching standard semantic styling:
* `feat: add custom directory scanner tool`
* `fix: correct typo in lab 05 manual`
* `docs: update deployment guidelines`

Push your branch to your forked repository and open a Pull Request against our master branch using our standard PR template.
