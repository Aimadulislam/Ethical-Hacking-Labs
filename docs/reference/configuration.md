# Reference: Configuration Guidelines ⚙s

This document provides a comprehensive reference for configuring the **Secure Sandbox Workstation** environment variables, YAML defaults, and INI properties.

---

## 📑 1. YAML Configuration (`config/config.yaml`)

The primary workspace defaults are managed using a standard structural YAML configuration. This file controls the target hosts, network ports, logging levels, and output formats.

### Schema Fields & Metadata
```yaml
lab_defaults:
  target_host: "127.0.0.1"    # The default IP address targeted by audit scripts.
  default_ports:             # List of network port sockets to scan during diagnostics.
    - 80
    - 443
    - 8080
  log_level: "INFO"           # Output detail level (DEBUG, INFO, WARNING, ERROR).
  enable_color: true         # Toggle colorized ANSI console feedback in terminals.
  isolation_mode: "internal"  # Dictates network isolation bounds ("internal", "external").
```

---

## 📑 2. INI Configuration (`config/settings.ini`)

A secondary INI initialization file is supported to maintain compatibility with legacy parsers and command utilities.

### Properties Definitions
```ini
[lab]
target_host = 127.0.0.1       ; Default target IPv4 loopback socket.
default_ports = 80,443,8080   ; Comma-separated list of ports.
log_level = INFO              ; Core diagnostic verbosity parameter.
```

---

## 📑 3. Environment Variables (`.env.example`)

To customize configurations dynamically during continuous integration pipelines or shell processes, use standard environment variables.

| Variable Name | Allowed Values | Default | Purpose / Description |
| :--- | :--- | :--- | :--- |
| `LAB_TARGET_HOST` | IPv4 address / Domain | `127.0.0.1` | Sets the default target host for scripts. |
| `LAB_PORTS` | Comma-separated integers | `80,443,8080` | Overrides the target ports scanned. |
| `LAB_LOG_LEVEL` | `DEBUG`, `INFO`, `WARNING` | `INFO` | Adjusts terminal stream detail levels. |
| `LAB_COLOR` | `true`, `false` | `true` | Toggles ANSI terminal colors on output. |

### Access in Bash Scripts
Environment variables are safely extracted and defaults are evaluated as fallbacks:
```bash
TARGET_IP="${LAB_TARGET_HOST:-127.0.0.1}"
PORT_LIST="${LAB_PORTS:-80,443,8080}"
```
This ensures high flexibility and deterministic execution behavior during automated workflows.
