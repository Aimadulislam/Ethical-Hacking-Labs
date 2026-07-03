# Lab Manuals: Introduction 🎓

Welcome to the Secure Sandbox Laboratory Syllabus. These manuals provide structured, hands-on exercises to help you master practical cybersecurity and system administration.

---

## 🗺️ Lab Progression Map

We recommend completing the modules in sequence:

```text
  [ Beginner ]
  ├── Lab 01: Linux Basics (terminal, permission flags)
  └── Lab 02: Network Sockets (listening interfaces, loopbacks)
        │
  [ Intermediate ]
  ├── Lab 03: Service Enumeration (banner grabs, scanning)
  ├── Lab 04: Vulnerability Auditing (automated file check scripts)
  │     │
  [ Advanced / Full Sandbox ]
  ├── Lab 05: Web Security (parameterized SQL inputs)
  ├── Lab 06: Linux Privilege Escalation (root cron paths, SUID)
  ├── Lab 07: Windows Privilege Escalation (AlwaysInstallElevated)
  └── Lab 08: Docker Sandboxing (least-privilege users, escapes)
        │
  [ Professional Mastery ]
  ├── Lab 09: Report Writing (CVSS scores, finding logs)
  └── Lab 10: CTF Workflow (structured solver patterns)
```

---

## 📝 General Rules & Standards

To ensure a safe and effective learning experience, always follow these rules during your exercises:

1. **Verify Sandbox Isolation**: Always check that your container sandboxes are active on loopback interfaces before testing scripts.
2. **Read the Theory Sheets**: Review the relevant theoretical guides in `/docs` before launching a lab.
3. **Draft Actionable Findings**: When analyzing a vulnerability, document its CVE identifier, CVSS v3.1 score, and specific code remediation.
4. **Clean Up System Paths**: Reset your test sandboxes at the end of each session using our cleanup scripts.
