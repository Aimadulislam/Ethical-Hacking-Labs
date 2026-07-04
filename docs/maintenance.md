# ⚙️ Long-Term Maintenance, Observability & Compliance Plan

This manual defines operational quality metrics, observability workflows, automated maintenance procedures, risk management baselines, and compliance policies for the **Secure Sandbox Workstation**.

---

## 📈 1. Quality Metrics & Observability

To maintain engineering maturity and ensure the stability of our diagnostic automation, we enforce measurable quality indicators.

### Key Quality Indicators (KQIs)
| Metric Domain | Target KQI | Measurement Method | Verification Frequency |
| :--- | :--- | :--- | :--- |
| **Documentation Coverage** | `100%` of modules documented | Manual audit of `docs/` and `mkdocs.yml` | Every release cycle |
| **Linting Compliance** | `0` warnings or errors | `ShellCheck` and `flake8` pipelines | On every pull request |
| **Test Coverage** | `>85%` statement coverage | Code coverage utilities (e.g. `coverage.py`) | Monthly audits |
| **Automation Success** | `100%` integration test pass | GitHub Actions workflow execution | On every commit |
| **Issue Triage Velocity**| `<48 Hours` first response | GitHub API tracking metrics | Weekly review |

### Observability & Logging Architecture
To improve visibility during system execution, our scripts implement standardized structured logging.

* **Shell Scripting Verbosity**: All Bash tools (`scripts/port_scanner.sh`, `scripts/permission_audit.sh`) support a verbose flag (`-v`) to output detailed state progression to standard error (`stderr`).
* **Python Diagnostics Logging**: Python utilities (`tools/file_integrity.py`, `tools/log_analyzer.py`) employ the native Python `logging` module to output standardized log entries containing timestamps, threat severity categories, and descriptive diagnostic statements:
  ```text
  YYYY-MM-DD HH:MM:SS [INFO] Generating baseline for directory: /config
  YYYY-MM-DD HH:MM:SS [WARNING] NEW FILE DETECTED: config/settings.ini.bak
  ```

---

## 🤖 2. Automated Maintenance Workflows

The repository uses automated checks to guarantee consistency, check for security issues, and reduce maintainer effort.

```text
  [ Scheduled Trigger ] (Cron or Commit)
            │
            ├──> [ ShellCheck ] (Verify Bash Syntax)
            ├──> [ Flake8/Black ] (Verify Python Formatting)
            ├──> [ Python Unittest ] (Verify Functional Integrity)
            └──> [ Dependency Review ] (Audit Docker Base Images)
```

### Recurring Automated Pipelines
1. **Script Validation**: Continuous integration runs linter and formatting sweeps on every commit to maintain clean codebase patterns.
2. **Broken Link Testing**: Automated crawlers verify documentation hyperlinks to eliminate dead references.
3. **Dependency Auditing**: Vulnerability scanners (such as `trivy` or `snyk`) verify container base images (`alpine`, `node`) for active CVE disclosures.

---

## ⚠️ 3. Risk Management & Environments Matrix

### Supported Environments
* **Linux (Recommended)**: Kali Linux, Ubuntu 22.04 LTS+, Debian 11+, or Fedora Workstation.
* **Windows WSL**: WSL 2 (Windows Subsystem for Linux) running a standard Ubuntu distribution.

### Unsupported Environments
* **Native Windows (CMD / PowerShell)**: Core utilities depend on POSIX-compliant Linux subsystems and standard file redirection operators.
* **Native macOS**: While some features may operate via Homebrew, specific socket redirects (`/dev/tcp/`) are restricted in macOS's default shell implementation.

### Operational Risks & Security Assumptions
* **Security Assumption**: It is assumed that the practitioner executes all tools in an isolated sandbox and does not expose vulnerable container ports to open public network adapters.
* **Resource Risk**: Misconfigured recursive directory scans could consume elevated disk I/O on older systems.

---

## ⚖️ 4. Compliance & Licensing Governance

We prioritize licensing compliance, attribution, and secure development standards:

* **Open-Source License**: This project is licensed under the **MIT License**, permitting unrestricted non-commercial use, customization, and deployment.
* **Third-Party Attributions**: We document all open-source libraries, base containers, and CSS dependencies (refer to our [Roadmap & Credits Guide](roadmap_credits.md)).
* **Privacy Controls**: Our diagnostics utilities operate entirely locally. No telemetry data, system parameters, or scan results are transmitted to external servers.
