# Architecture: System Design & Network Layout 📐

This document outlines the system architecture, network topology, and execution flows of the **Secure Sandbox Workstation** environment.

---

## 🏗️ 1. Conceptual System Architecture

The environment isolates automated security testing and script execution on the local host machine, preventing exposure or risks to wider network boundaries.

```mermaid
graph TD
    subgraph Browser Interface
        UI[React 18 Dashboard] <-->|Interactive Guides & Manuals| MD[Markdown Parser]
        UI <-->|Terminal Scenarios| TS[Simulated Shell Macros]
        UI <-->|Calculate CVSS v3.1| CALC[Dynamic Threat Rating Slider]
    end

    subgraph Host Workstation OS [Ubuntu / Kali Linux]
        CLI[Bash / Python Terminal CLI] -->|Run Perm audits| AUD[scripts/permission_audit.sh]
        CLI -->|Scan Sockets| PS[scripts/port_scanner.sh]
        CLI -->|Verify Hashes| FIM[tools/file_integrity.py]
        CLI -->|Filter Logs| LA[tools/log_analyzer.py]
    end

    subgraph Containerized Target Subnet [Isolated Bridge: 172.19.0.0/16]
        PS -->|Audit loopback:8080| CNT[vulnerable-app Container]
        CNT -->|Access web logs| NGINX[Isolated Nginx Daemon]
    end

    UI -.->|Documented reference workflow| CLI
```

---

## 🌐 2. Isolated Docker Subnet Topology

The target lab server runs on a private bridge subnet, allowing you to practice socket diagnostics and port scanning safely without exposing the container to external networks.

```text
  +-------------------------------------------------------+
  |              Host Workstation Loopback                |
  |                      127.0.0.1                        |
  +-------------------------------------------+-----------+
                                              |
                                              v (Port Bind: 127.0.0.1:8080)
  +-------------------------------------------+-----------+
  |            Isolated Docker Bridge Network             |
  |                Subnet: 172.19.0.0/16                  |
  |                                                       |
  |   +-----------------------------------------------+   |
  |   |           vulnerable-app Container            |   |
  |   |               IP: 172.19.0.2                  |   |
  |   |         Active Daemon: Nginx (Port 80)        |   |
  |   +-----------------------------------------------+   |
  +-------------------------------------------------------+
```

---

## 🛠️ 3. Quality Control & Continuous Integration (CI)

Our quality pipeline runs on every code submission to verify script compliance and ensure the stability of our diagnostic utilities.

```mermaid
sequenceDiagram
    autonumber
    Developer->>GitHub: Push code / open Pull Request
    GitHub Actions->>Runner Instance: Initialize runner environment
    Runner Instance->>ShellCheck: Lint Bash scripts
    alt ShellCheck Passed
        Runner Instance->>PEP 8 Check: Audit Python script formats
    else ShellCheck Failed
        GitHub Actions-->>Developer: Reject build (Build RED)
    end
    alt Python PEP 8 Passed
        Runner Instance->>Unittest Engine: Run tests/test_file_integrity.py & test_log_analyzer.py
        Unittest Engine-->>Runner Instance: Status: SUCCESS (7/7 tests passed)
        Runner Instance->>Bash test suite: Execute ./tests/test_scripts.sh
        Bash test suite-->>Runner Instance: Status: SUCCESS (13/13 scripts passed)
        Runner Instance-->>GitHub: Complete Build (Build GREEN)
        GitHub-->>Developer: PR approved and ready for merge
    else PEP 8 or Test Failures
        GitHub Actions-->>Developer: Reject build (Build RED)
    end
```

---

## 📊 4. File Integrity Monitoring Verification Flow

Our file integrity checking utility follows a structured workflow to establish file baselines and identify modifications or tempering:

```mermaid
graph LR
    A[Root Directory] -->|Read Files| B{Calculate SHA256}
    B -->|Create Mode| C[Write json Database: baseline.json]
    B -->|Verify Mode| D{Compare with baseline.json}
    D -->|Hash Match| E[Status: INTEGRITY OK]
    D -->|Hash Mismatch| F[Status: MODIFIED DETECTED]
    D -->|Missing Path| G[Status: MISSING DETECTED]
    D -->|Unindexed Path| H[Status: NEW DETECTED]
```
By isolating these components, we maintain high stability, consistent test performance, and clear safety limits across our exercises.
