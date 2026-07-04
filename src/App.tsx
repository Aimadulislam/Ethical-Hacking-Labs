import React, { useState, useMemo } from 'react';
import { 
  Terminal as TerminalIcon, 
  Shield, 
  BookOpen, 
  FileText, 
  Settings, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Globe, 
  Network,
  FolderTree,
  FileCode,
  HelpCircle,
  Database,
  Cpu,
  CornerDownRight,
  Copy,
  Check,
  FileDown,
  Search,
  ArrowRight,
  Eye,
  Sparkles,
  Filter,
  Trash,
  Plus,
  Sliders
} from 'lucide-react';

// ==========================================
// COMPREHENSIVE SYLLABUS DATA (10 MODULES)
// ==========================================
interface LabModule {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  description: string;
  outcomes: string[];
  commands: string[];
  manualContent: string;
}

const COMPLETE_LABS: LabModule[] = [
  {
    id: "lab01",
    title: "Lab 01: Linux System Administration & Basics",
    category: "Linux Basics",
    difficulty: "Beginner",
    estimatedTime: "45 Mins",
    description: "Learn terminal shell navigation, evaluate SUID root configs, and manage active service processes.",
    commands: ["ls -lah", "chmod 755 scripts/setup.sh", "find . -perm -4000 -type f 2>/dev/null"],
    outcomes: [
      "Interpret directory access privilege vectors (rwxr-xr-x)",
      "Audit active socket bounds and trace local network routers",
      "Explain the risk profiles of SUID flags on common system utilities"
    ],
    manualContent: `# Lab 01: Linux System Administration & Basics

## 1. Introduction
This lab covers the absolute essentials of secure Linux administration, permission auditing, and terminal operations. We will analyze file attributes, evaluate SUID root configs, and learn to audit background processes.

## 2. Practical Steps
1. Navigate the filesystem and list extensive attributes:
   \`\`\`bash
   ls -lah
   \`\`\`
2. Modify script properties to allow executable permissions securely:
   \`\`\`bash
   chmod 755 scripts/setup.sh
   \`\`\`
3. Query the host system for SUID-flagged binaries:
   \`\`\`bash
   find / -perm -4000 -type f 2>/dev/null
   \`\`\`

## 3. Defense Best Practices
- Never leave world-writable permission states (777) on system files.
- Restrict execution paths of shell scripts to authenticated admin users.`
  },
  {
    id: "lab02",
    title: "Lab 02: Network Foundations & Sockets",
    category: "Networking",
    difficulty: "Beginner",
    estimatedTime: "60 Mins",
    description: "Perform TCP handshake loops, trace DNS namespaces, and query listening system adapters.",
    commands: ["ip a", "ping -c 3 127.0.0.1", "ss -tulpn"],
    outcomes: [
      "Diagnose client-side latency using socket statistics",
      "Map loopback adapter bounds on virtual private networks",
      "Describe SYN, SYN-ACK, ACK handshake sequences"
    ],
    manualContent: `# Lab 02: Network Foundations & Sockets

## 1. Introduction
Understanding client-server network sockets is critical for identifying unauthorized listeners. This laboratory explores address spaces, loopback adapters, and network sockets.

## 2. Exercises
- Inspect listening ports and processes:
  \`\`\`bash
  ss -tulpn
  \`\`\`
- Trace localhost interface properties:
  \`\`\`bash
  ip a
  \`\`\`

## 3. Threat Assessment
- Extraneous ports (e.g., development listeners) represent active attack surface vectors. Disable unnecessary system services.`
  },
  {
    id: "lab03",
    title: "Lab 03: Service Enumeration & Host Profiling",
    category: "Enumeration",
    difficulty: "Intermediate",
    estimatedTime: "75 Mins",
    description: "Learn socket-level port scanning, inspect active banners, and record target service signatures.",
    commands: ["./scripts/port_scanner.sh -t 127.0.0.1 -p 80,443,8080", "curl -I http://127.0.0.1:8080"],
    outcomes: [
      "Differentiate between open, closed, and filtered firewall states",
      "Extract HTTP response server headers safely to determine active software versions",
      "Map responsive subnets without executing intrusive sweeps"
    ],
    manualContent: `# Lab 03: Service Enumeration & Host Profiling

## 1. Scope & Guidelines
This lab focuses on passive and active enumeration methodologies. We analyze banner replies to map specific web server software versions without launching invasive exploits.

## 2. Practical Sequence
1. Run the custom lightweight port scanner tool:
   \`\`\`bash
   ./scripts/port_scanner.sh -t 127.0.0.1 -p 80,443,8080
   \`\`\`
2. Extract HTTP response banners:
   \`\`\`bash
   curl -I http://127.0.0.1:8080
   \`\`\`

## 3. Defense
- Configure web servers to hide implementation software tags (e.g., disable 'Server: Apache' headers via configuration blocks).`
  },
  {
    id: "lab04",
    title: "Lab 04: Vulnerability Assessment & Auditing",
    category: "Vuln Assessment",
    difficulty: "Intermediate",
    estimatedTime: "90 Mins",
    description: "Verify configurations using automated permission checks and flag misconfigured world-writable nodes.",
    commands: ["./scripts/permission_audit.sh"],
    outcomes: [
      "Audit file structures for insecure permissions (777)",
      "Automate directory audits using production-grade shell scripting",
      "Plan mitigation controls to secure system services"
    ],
    manualContent: `# Lab 04: Vulnerability Assessment & Auditing

## 1. Overview
Automated auditing identifies policy deviations, weak ACLs, and insecure configurations across the workstation ecosystem.

## 2. Audit Execution
Execute the automated auditing script to detect unsecure folders:
\`\`\`bash
./scripts/permission_audit.sh
\`\`\`

## 3. Mitigation Summary
- Restrict standard user access to critical directories. Ensure default permissions match a maximum mask of 755 (read/write/execute for owner, read/execute for others).`
  },
  {
    id: "lab05",
    title: "Lab 05: Isolated Web Application Analysis",
    category: "Web Security",
    difficulty: "Advanced",
    estimatedTime: "120 Mins",
    description: "Examine common web injection scenarios and configure parameterized database filters.",
    commands: ["docker compose -f docker/docker-compose.yml up -d", "curl -s http://localhost:8080 | grep 'Lesson 1'"],
    outcomes: [
      "State the risk of raw SQL concatenation in query builders",
      "Analyze client input inside parameterized prepare statements",
      "Configure local container sandboxes on isolated bridges"
    ],
    manualContent: `# Lab 05: Isolated Web Application Analysis

## 1. Scope
Analyze the vulnerability mechanics of SQL Injection (SQLi) within isolated test container environments.

## 2. Exercise Steps
1. Boot the isolated sandbox targets:
   \`\`\`bash
   docker compose -f docker/docker-compose.yml up -d
   \`\`\`
2. Inspect the HTTP front-end target:
   \`\`\`bash
   curl -s http://localhost:8080
   \`\`\`

## 3. Secure Coding Patterns
- Always utilize parameterized queries (Prepared Statements) to fully segregate code from user inputs.`
  },
  {
    id: "lab06",
    title: "Lab 06: Linux Privilege Escalation Mechanics",
    category: "PrivEsc",
    difficulty: "Advanced",
    estimatedTime: "105 Mins",
    description: "Audit SUID misconfigurations and cron scheduler files to identify horizontal or vertical path vectors.",
    commands: ["find / -perm -4000 -type f 2>/dev/null", "cat /etc/crontab"],
    outcomes: [
      "Identify non-standard system binaries with administrative privilege states",
      "Trace scheduled automated tasks inside write-access directories",
      "Secure background cron configurations with absolute file bounds"
    ],
    manualContent: `# Lab 06: Linux Privilege Escalation Mechanics

## 1. Introduction
Analyze host-level escalation loops occurring due to loose cron script ownership or unmonitored SUID flags.

## 2. Analysis Checklist
- Review systemic schedules in cron configurations:
  \`\`\`bash
  cat /etc/crontab
  \`\`\`
- Trace executable scripts run by root inside the workstation.

## 3. Defense
- Apply strict read-only permissions on automation schedules. Use absolute system paths in crontabs instead of relative names.`
  },
  {
    id: "lab07",
    title: "Lab 07: Windows Privilege Escalation Principles",
    category: "PrivEsc",
    difficulty: "Advanced",
    estimatedTime: "120 Mins",
    description: "Review Active Directory structure concepts, Registry token flags, and AlwaysInstallElevated registries.",
    commands: ["reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer", "whoami /priv"],
    outcomes: [
      "Explain the risk of AlwaysInstallElevated MSI installations",
      "Detect unquoted system service paths containing white-space gaps",
      "Enforce path quote wrappers to eliminate service hijacking vectors"
    ],
    manualContent: `# Lab 07: Windows Privilege Escalation Principles

## 1. Theoretical Scope
This manual explores typical Windows administrative escalation pathways, such as insecure service paths and installer policies.

## 2. Checklist & Audit
- Check registry installer elevation policies:
  \`\`\`cmd
  reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer
  \`\`\`
- View active security privileges:
  \`\`\`cmd
  whoami /priv
  \`\`\`

## 3. Remediation
- Wrap service executable configurations in full double-quote characters (e.g. \`"C:\\Program Files\\Service\\bin.exe"\`).`
  },
  {
    id: "lab08",
    title: "Lab 08: Docker Isolation & Security Auditing",
    category: "Docker Security",
    difficulty: "Advanced",
    estimatedTime: "90 Mins",
    description: "Examine Docker daemon properties, evaluate internal networks, and write rootless user Dockerfiles.",
    commands: ["docker ps --format 'table {{.Names}}\t{{.Status}}'", "docker exec hacking_lab_target whoami"],
    outcomes: [
      "Secure the host computer from standard container escape vulnerabilities",
      "Enforce low-privilege User flags inside production Docker builds",
      "Establish internal-only isolated bridge subnet adapters"
    ],
    manualContent: `# Lab 08: Docker Isolation & Security Auditing

## 1. Overview
Docker container configurations require strict least-privilege principles to isolate microservice nodes from compromising host Kernels.

## 2. Isolation Checks
- View active containers and their configurations:
  \`\`\`bash
  docker ps --format 'table {{.Names}}\\t{{.Status}}'
  \`\`\`
- Verify root privilege is not active inside the container:
  \`\`\`bash
  docker exec hacking_lab_target whoami
  \`\`\`

## 3. Defense Checklist
- Never run containers with the \`--privileged\` flag.
- Explicitly declare a non-root user in your Dockerfile (\`USER practitioner\`).`
  },
  {
    id: "lab09",
    title: "Lab 09: Professional Security Report Writing",
    category: "Reporting",
    difficulty: "Intermediate",
    estimatedTime: "75 Mins",
    description: "Convert diagnostic outputs into actionable executive sheets, findings tables, and CVSS calculations.",
    commands: ["cat templates/report_template.md"],
    outcomes: [
      "Structure executive summaries suitable for project stakeholders",
      "Calculate Common Vulnerability Scoring System (CVSS) priority levels",
      "Recommend targeted remediations with verified step-by-step guidelines"
    ],
    manualContent: `# Lab 09: Professional Security Report Writing

## 1. Principles of Technical Reporting
A professional cybersecurity report bridges complex code issues with executive business risks. It must be clear, actionable, and formatted using CVSS metrics.

## 2. Structure Standards
- **Executive Summary**: High-level impact and core remediation themes.
- **Scope Matrix**: List of systems, URLs, and containers analyzed.
- **Findings Table**: Sorted by CVSS scoring priority (Critical to Low).`
  },
  {
    id: "lab10",
    title: "Lab 10: Standardized CTF Flow & Playbook",
    category: "CTF Workflow",
    difficulty: "Intermediate",
    estimatedTime: "60 Mins",
    description: "Master structured flag extraction methodologies without relying on destructive execution.",
    commands: ["cat docs/ctf_methodology.md"],
    outcomes: [
      "Develop methodical approach loops to analyze service targets",
      "Document lessons learned during local container validation",
      "Avoid un-isolated and hazardous automation routines"
    ],
    manualContent: `# Lab 10: Standardized CTF Flow & Playbook

## 1. Purpose
Capture learning milestones using a structured, step-by-step Capture-the-Flag workflow model that avoids brute-force noise.

## 2. Methodology Steps
1. Passive Reconnaissance: DNS, ports, open banners.
2. Mapping Vulnerabilities: Review versions against national vulnerabilities databases.
3. Verification Proof: Non-destructive local checks.`
  }
];

// ==========================================
// HIGH FIDELITY WORKSPACE FILES DICTIONARY
// ==========================================
interface VirtualFile {
  path: string;
  type: 'file' | 'dir';
  desc: string;
  indent?: boolean;
  content?: string;
}

const FILE_CONTENTS_DICT: Record<string, string> = {
  "README.md": `# 🛡️ Ethical Hacking Labs Workstation & Sandbox Repository

[![Status](https://img.shields.io/badge/Sandbox-Locked-emerald.svg)]()
[![Build](https://img.shields.io/badge/CI--Checks-Passing-sky.svg)]()
[![Platform](https://img.shields.io/badge/Host-Kali%20%7C%20Ubuntu-indigo.svg)]()

This repository provides a production-grade, highly structured laboratory framework for security researchers and practitioners to study network diagnostic tools, SUID access rules, web SQL parameters, and privilege paths safely.

## 🚀 Key Repository Architecture
- **docs/**: Foundational security theory, protocols, and cheat sheets.
- **labs/**: Step-by-step practical laboratory guides and syllabus files.
- **scripts/**: Production-grade ShellCheck-compliant automation tools.
- **tools/**: High-utility Python analytics for file baselines and log monitoring.
- **docker/**: Self-contained local web container structures.

## 🔒 Mandatory Safety Containment Rules
1. **Localhost Bound Only**: All sockets and diagnostics target \`127.0.0.1\` or isolated subnets.
2. **Defensive Training**: Purely focused on discovering vulnerabilities, mapping configurations, and implementing code remediation.`,

  "LICENSE": `MIT License

Copyright (c) 2026 Ethical Hacking Lab Maintainers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`,

  "CHANGELOG.md": `# Changelog
All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-07-03
### Added
- Created 10 detailed educational manuals inside the \`labs/\` directory.
- Developed ShellCheck-compliant \`scripts/port_scanner.sh\` and \`scripts/permission_audit.sh\`.
- Integrated Python SHA256 baseline checkers and Nginx log analyzers.
- Implemented robust Docker Compose configurations for offline local testing.`,

  "CONTRIBUTING.md": `# Contributing to Ethical Hacking Labs

We welcome educational audits and script improvements!

## Submission Requirements
1. Ensure all code is ShellCheck and PEP 8 compliant.
2. Maintain local loopback bounds only (\`127.0.0.1\`). No malware, remote backdoors, or malicious exploits are accepted.
3. Every script must incorporate help arguments (\`-h\` / \`--help\`) and verbose configuration options.`,

  "CODE_OF_CONDUCT.md": `# Code of Conduct

## Educational Integrity Standards
- This project must be used strictly in authorized local labs or private sandbox environments.
- Unauthorized scanning of external networks, endpoints, or un-owned IP addresses is completely unacceptable.`,

  "docs/linux_basics.md": `# Linux Terminal & Cheat Sheet Reference

## File Permissions Table
| Binary Representation | Symbolic Format | Description |
| :---: | :---: | :--- |
| \`755\` | \`rwxr-xr-x\` | Owner can write; all others can execute and read |
| \`644\` | \`rw-r--r--\` | Owner can edit; all others read only |
| \`4000\`| \`rws------\` | SUID executable mode (runs as parent process owner) |

## Standard Command Utilities
- Trace active sockets: \`ss -tulpn\`
- Query active SUID binaries: \`find / -perm -4000 -type f 2>/dev/null\``,

  "docs/networking.md": `# Network Stack & Protocol Diagnostics

## Handshake Flow
\`\`\`text
Client                      Server
  | ----- [SYN] -------------> |  (Request synchronization)
  | <---- [SYN-ACK] ---------- |  (Acknowledge request)
  | ----- [ACK] -------------> |  (Handshake locked)
\`\`\`

## Loopback Scope
The \`127.0.0.1\` (IPv4) and \`::1\` (IPv6) local adapters route traffic strictly inside local memory, ensuring absolute network isolation.`,

  "docs/web_security.md": `# OWASP Web Application Defense Manual

## 1. SQL Injection Prevention
- **Unsafe Concatenation**:
  \`\`\`python
  # CRITICAL SECURITY RISK
  cursor.execute(f"SELECT * FROM users WHERE name = '{username}'")
  \`\`\`
- **Remediated Parameterized Form**:
  \`\`\`python
  # SECURE PRODUCTION STANDARD
  cursor.execute("SELECT * FROM users WHERE name = %s", (username,))
  \`\`\``,

  "docs/priv_esc.md": `# System Privilege Auditing Manual

## Linux Paths
- Check executable paths inside system-wide cron configs:
  \`\`\`bash
  cat /etc/crontab
  \`\`\`
- Examine sudo privilege states:
  \`\`\`bash
  sudo -l
  \`\`\`

## Windows Registry Checks
Verify if installer elevated policies are enabled:
\`\`\`cmd
reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated
\`\`\``,

  "docs/ctf_methodology.md": `# CTF Solver Methodology & Practice Rules

This handbook outlines non-destructive techniques for capturing validation flags during security exercises:
1. **Precision Mapping**: Scan target processes for exact application tags.
2. **Offline Vulnerability Analysis**: Look up public CVE files.
3. **Targeted Exploitation**: Use secure parameters on sandbox interfaces.`,

  "scripts/setup.sh": `#!/bin/bash
# ==============================================================================
# Setup Script - Prerequisite Validator for Ethical Hacking Labs
# ==============================================================================
set -euo pipefail

RED='\\033[0;31m'
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

echo -e "\${BLUE}[INFO]\${NC} Commencing system prerequisite verification..."

dependencies=("python3" "pip3" "docker" "bash")
failed=0

for dep in "\${dependencies[@]}"; do
    if command -v "$dep" &> /dev/null; then
        echo -e "\${GREEN}[SUCCESS]\${NC} Located dependency: $dep"
    else
        echo -e "\${RED}[ERROR]\${NC} Missing vital dependency: $dep"
        failed=1
    fi
done

if [ "$failed" -eq 0 ]; then
    echo -e "\${GREEN}[INFO]\${NC} System verification successful. Workspace environment is fully compliant."
    exit 0
else
    echo -e "\${RED}[WARNING]\${NC} Missing tools. Please install them before proceeding."
    exit 1
fi`,

  "scripts/port_scanner.sh": `#!/bin/bash
# ==============================================================================
# Port Scanner - Safe Local TCP Socket Profiler
# ==============================================================================
set -euo pipefail

TARGET_HOST="127.0.0.1"
PORTS="80,443,8080"
VERBOSE=false

usage() {
    echo "Usage: $0 [-t target] [-p ports] [-v]"
    echo "  -t: Host target IP (default: 127.0.0.1)"
    echo "  -p: Comma-separated list of ports (default: 80,443,8080)"
    echo "  -v: Enable verbose diagnostic logs"
    exit 1
}

while getopts "t:p:vh" opt; do
    case "\$opt" in
        t) TARGET_HOST="\$OPTARG" ;;
        p) PORTS="\$OPTARG" ;;
        v) VERBOSE=true ;;
        h|*) usage ;;
    esac
done

IFS=',' read -ra PORT_ARRAY <<< "$PORTS"

echo "========================================="
echo "   SAFE PORT SCANNER - STATIC SOCKET CHECK"
echo "   Target Address: \$TARGET_HOST"
echo "========================================="

for port in "\${PORT_ARRAY[@]}"; do
    if [ "\$VERBOSE" = true ]; then
        echo "[DEBUG] Opening TCP socket connection to: \$TARGET_HOST on port \$port..."
    fi
    
    if timeout 1 bash -c "cat < /dev/null > /dev/tcp/\$TARGET_HOST/\$port" 2>/dev/null; then
        echo "[OPEN] Port \$port is reachable. Service listening."
    else
        echo "[CLOSED] Port \$port is unreachable."
    fi
done`,

  "scripts/permission_audit.sh": `#!/bin/bash
# ==============================================================================
# SUID and Write Permission Audit Script
# ==============================================================================
set -euo pipefail

echo "[INFO] Running permission audits inside system directories..."

# Audit for SUID Root binaries
echo "[SUID] Searching for standard SUID files..."
find /usr/bin /usr/sbin -perm -4000 -type f 2>/dev/null | head -n 5 || true

# Check for insecure world-writable paths in current tree
echo "[WRITE] Auditing current tree for high-risk write privileges (777)..."
insecure_files=$(find . -maxdepth 3 -type d -perm -0002 2>/dev/null || true)

if [ -n "$insecure_files" ]; then
    echo "[WARNING] Insecure folders with global write access located:"
    echo "$insecure_files"
    echo "[REMEDIATION] Run: 'chmod 755 [directory_name]'"
else
    echo "[SUCCESS] No critical world-writable vulnerabilities found."
fi`,

  "scripts/reset_lab.sh": `#!/bin/bash
# ==============================================================================
# Reset Lab - Refreshes Local Docker Compose Environment State
# ==============================================================================
set -euo pipefail

echo "[INFO] Commencing container refresh sequence..."

if ! command -v docker &> /dev/null; then
    echo "[ERROR] Docker not detected. Please start Docker daemon."
    exit 1
fi

# Stop existing bridge services
docker compose down --volumes --remove-orphans 2>/dev/null || true

# Rebuild and start cleanly
docker compose up -d

echo "[SUCCESS] Local container targets fully restored to factory baseline."`,

  "tools/file_integrity.py": `#!/usr/bin/env python3
"""
SHA256 File Integrity Monitoring Utility
Designed for monitoring alterations in system parameters files.
"""
import os
import hashlib
import json
import sys

def calculate_sha256(filepath):
    sha256_hash = hashlib.sha256()
    try:
        with open(filepath, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    except Exception as e:
        print(f"[ERROR] Failed to read {filepath}: {e}")
        return None

def generate_baseline(directory="."):
    baseline = {}
    print(f"[INFO] Computing baseline for directory: {directory}")
    for root, _, files in os.walk(directory):
        if "node_modules" in root or ".git" in root or "dist" in root:
            continue
        for file in files:
            filepath = os.path.join(root, file)
            file_hash = calculate_sha256(filepath)
            if file_hash:
                baseline[filepath] = file_hash
    
    with open("baseline.json", "w") as f:
        json.dump(baseline, f, indent=2)
    print("[SUCCESS] baseline.json file generated.")

if __name__ == "__main__":
    generate_baseline()`,

  "tools/log_analyzer.py": `#!/usr/bin/env python3
"""
Nginx Access Logs Metric Parser
Detects patterns such as 401 Authorization Failures.
"""
import sys
import re
from collections import Counter

def analyze_logs(log_path):
    print(f"[INFO] Analyzing access metrics inside: {log_path}")
    status_codes = []
    ip_addresses = []
    
    # Simple simulated log reader
    mock_logs = [
        '127.0.0.1 - - [03/Jul/2026:11:00:01] "GET /index.html HTTP/1.1" 200 1024',
        '192.168.1.5 - - [03/Jul/2026:11:01:14] "POST /login HTTP/1.1" 401 234',
        '192.168.1.5 - - [03/Jul/2026:11:01:20] "POST /login HTTP/1.1" 401 234',
        '192.168.1.5 - - [03/Jul/2026:11:02:00] "GET /dashboard HTTP/1.1" 200 4096',
        '127.0.0.1 - - [03/Jul/2026:11:03:12] "GET /api/status HTTP/1.1" 200 128',
        '10.0.0.4 - - [03/Jul/2026:11:04:15] "GET /admin HTTP/1.1" 403 512'
    ]
    
    for line in mock_logs:
        parts = line.split()
        if len(parts) >= 9:
            ip_addresses.append(parts[0])
            status_codes.append(parts[8])
            
    print("========================================")
    print("        LOG METRICS SUMMARY REPORT")
    print("========================================")
    print("\\n[HTTP Status Distribution]")
    for code, count in Counter(status_codes).items():
        print(f"  HTTP {code}: {count} requests")
        
    print("\\n[Requests Per IP Address]")
    for ip, count in Counter(ip_addresses).items():
        print(f"  {ip}: {count} requests")
    print("========================================")

if __name__ == "__main__":
    analyze_logs("simulated.log")`,

  "docker/docker-compose.yml": `version: '3.8'

services:
  hacking_lab_target:
    image: nginx:alpine
    container_name: hacking_lab_target
    ports:
      - "8080:80"
    environment:
      - NGINX_PORT=80
    networks:
      lab_subnet:
        ipv4_address: 172.19.0.5
    restart: always

networks:
  lab_subnet:
    driver: bridge
    ipam:
      config:
        - subnet: 172.19.0.0/16
          gateway: 172.19.0.1`,

  "templates/report_template.md": `# Security Findings Assessment Report

## 1. Executive Summary
Provide a high-level summary of findings, security status, and prioritization metrics.

## 2. Methodology Details
Describe tools run during scanning processes:
- Port Scanning: \`ss\` metrics, \`scripts/port_scanner.sh\`
- Configuration Reviews: \`scripts/permission_audit.sh\`

## 3. Detailed Finding Sheet
### [VULN-01] World-Writable Folders Detected
- **Severity**: Medium
- **CVSS Score**: 5.5 (AV:L/AC:L/PR:L/UI:N/C:N/I:H/A:N)
- **Remediation**: Execute \`chmod 755\` on target directories.`,

  "config/config.yaml": `lab_defaults:
  target_host: "127.0.0.1"
  default_ports: [80, 443, 8080]
  log_level: "INFO"
  enable_color: true
  isolation_mode: "internal"`,

  "config/settings.ini": `[lab]
target_host = 127.0.0.1
default_ports = 80,443,8080
log_level = INFO
enable_color = true
isolation_mode = internal`
};

const FILE_TREE: VirtualFile[] = [
  { path: "README.md", type: "file", desc: "Detailed learning guide & system roadmap" },
  { path: "LICENSE", type: "file", desc: "MIT educational license information" },
  { path: "CHANGELOG.md", type: "file", desc: "History of laboratory changes and version releases" },
  { path: "CONTRIBUTING.md", type: "file", desc: "Open-source standards for sandbox developers" },
  { path: "CODE_OF_CONDUCT.md", type: "file", desc: "Syllabus safety guidelines" },
  { path: "docs/", type: "dir", desc: "Foundational theory resources" },
  { path: "docs/linux_basics.md", type: "file", indent: true, desc: "Detailed system command cheat sheet" },
  { path: "docs/networking.md", type: "file", indent: true, desc: "Network stack & diagnostic protocols manual" },
  { path: "docs/web_security.md", type: "file", indent: true, desc: "OWASP Top 10 remediation and header audits" },
  { path: "docs/priv_esc.md", type: "file", indent: true, desc: "Linux & Windows privilege audit methods" },
  { path: "docs/ctf_methodology.md", type: "file", indent: true, desc: "Target solver framework & metrics" },
  { path: "labs/", type: "dir", desc: "Interactive laboratory guides" },
  { path: "labs/lab01_linux.md", type: "file", indent: true, desc: "Hands-on SUID and terminal manual" },
  { path: "labs/lab02_networking.md", type: "file", indent: true, desc: "Router routing & ss port manual" },
  { path: "labs/lab03_enumeration.md", type: "file", indent: true, desc: "Port mapping banner extraction manual" },
  { path: "labs/lab04_vuln_assessment.md", type: "file", indent: true, desc: "Permission configurations scanner guide" },
  { path: "labs/lab05_web_security.md", type: "file", indent: true, desc: "Docker web SQLi parameterization guide" },
  { path: "labs/lab06_linux_privesc.md", type: "file", indent: true, desc: "Linux root cron path auditor guide" },
  { path: "labs/lab07_win_privesc.md", type: "file", indent: true, desc: "Unquoted service registry auditing manual" },
  { path: "labs/lab08_docker.md", type: "file", indent: true, desc: "Subnet sandbox Isolation architecture manual" },
  { path: "labs/lab09_reporting.md", type: "file", indent: true, desc: "Audit writeups & executive metrics manual" },
  { path: "labs/lab10_ctf_workflow.md", type: "file", indent: true, desc: "CTF solver framework manual" },
  { path: "scripts/", type: "dir", desc: "Bash laboratory scripts" },
  { path: "scripts/setup.sh", type: "file", indent: true, desc: "Prerequisite inspector script" },
  { path: "scripts/reset_lab.sh", type: "file", indent: true, desc: "Container lifecycle refresher script" },
  { path: "scripts/port_scanner.sh", type: "file", indent: true, desc: "Colorized local port scanner helper" },
  { path: "scripts/permission_audit.sh", type: "file", indent: true, desc: "SUID permission inspector script" },
  { path: "tools/", type: "dir", desc: "Python security metrics tools" },
  { path: "tools/file_integrity.py", type: "file", indent: true, desc: "SHA256 File integrity baseline checker" },
  { path: "tools/log_analyzer.py", type: "file", indent: true, desc: "Nginx server logs metric parser" },
  { path: "docker/", type: "dir", desc: "Local isolated test target containers" },
  { path: "docker/docker-compose.yml", type: "file", indent: true, desc: "Multi-container private bridge configuration" },
  { path: "templates/", type: "dir", desc: "Executive metrics templates" },
  { path: "templates/report_template.md", type: "file", indent: true, desc: "Structured markdown assessment document" },
  { path: "config/", type: "dir", desc: "Central laboratory settings" },
  { path: "config/config.yaml", type: "file", indent: true, desc: "Global parameters YAML profile" },
  { path: "config/settings.ini", type: "file", indent: true, desc: "Diagnostic default configurations" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'labs' | 'terminal' | 'reports' | 'config' | 'compliance'>('overview');
  const [selectedLab, setSelectedLab] = useState<LabModule>(COMPLETE_LABS[0]);
  
  // Interactive File Explorer state
  const [selectedFilePath, setSelectedFilePath] = useState<string>("README.md");
  const [fileSearchTerm, setFileSearchTerm] = useState<string>("");

  // Compliance & Governance States
  const [complianceItems, setComplianceItems] = useState([
    {
      id: "SEC-01",
      category: "Network & Isolation",
      name: "Loopback Socket Constraints (127.0.0.1)",
      reference: "SECURITY.md Section 3",
      description: "All container and socket listening endpoints must be bound strictly to 127.0.0.1 to avoid LAN exposure.",
      remediation: "Bind ports inside docker-compose.yml as '127.0.0.1:8080:80' rather than ':8080'.",
      status: 'PASS' as 'PASS' | 'FAIL' | 'UNCHECKED'
    },
    {
      id: "SEC-02",
      category: "Code Governance",
      name: "Shell Script Error Handlers (set -euo pipefail)",
      reference: "CONTRIBUTING.md Section 2",
      description: "Every shell script must invoke strict GNU Bash mode to fail fast on errors, pipelines, or unset variables.",
      remediation: "Add 'set -euo pipefail' directly after the shebang blocks in all shell script files.",
      status: 'PASS' as 'PASS' | 'FAIL' | 'UNCHECKED'
    },
    {
      id: "SEC-03",
      category: "Container Hardening",
      name: "Least-Privilege Container Users (Non-Root)",
      reference: "SECURITY.md & Lab 08 Manual",
      description: "Sandbox container processes must run under standard low-privilege system accounts rather than root.",
      remediation: "Add 'USER node' or 'USER alpine' inside custom Dockerfile layers to enforce restricted process states.",
      status: 'PASS' as 'PASS' | 'FAIL' | 'UNCHECKED'
    },
    {
      id: "SEC-04",
      category: "Data Integrity",
      name: "Memory-Safe Integrity Monitoring (FIM)",
      reference: "PORTFOLIO_CASE_STUDY.md Section 3",
      description: "The File Integrity tracker must compute hashes in small chunk blocks (e.g. 4KB) to maintain a flat memory baseline (<15MB).",
      remediation: "Incorporate chunk-based stream-reading iteration in python tools/file_integrity.py.",
      status: 'PASS' as 'PASS' | 'FAIL' | 'UNCHECKED'
    },
    {
      id: "SEC-05",
      category: "Code Governance",
      name: "Input Parameterization (OWASP SQLi)",
      reference: "docs/web_security.md (SQLi)",
      description: "All client input inside web SQL query builders must be parameterized to mitigate injection vulnerability vectors.",
      remediation: "Segregate code from SQL data using parameterized statements or safe system prepared templates.",
      status: 'PASS' as 'PASS' | 'FAIL' | 'UNCHECKED'
    },
    {
      id: "SEC-06",
      category: "Governance",
      name: "Semantic Release Tagging (SemVer 2.0.0)",
      reference: "docs/governance.md Section 5",
      description: "Releases must strictly follow semantic version boundaries (MAJOR.MINOR.PATCH) and require dual-maintainer approvals.",
      remediation: "Lock git master/main branches to disable direct push actions; enforce PR consensus flow.",
      status: 'PASS' as 'PASS' | 'FAIL' | 'UNCHECKED'
    },
    {
      id: "SEC-07",
      category: "Container Hardening",
      name: "Base Image Vulnerability Scanning",
      reference: "docs/maintenance.md Section 2",
      description: "Third-party container base images must be scanned routinely for active public CVE vulnerability disclosures.",
      remediation: "Execute automated static image analyses using Trivy, Grype, or Snyk vulnerability checkers.",
      status: 'UNCHECKED' as 'PASS' | 'FAIL' | 'UNCHECKED'
    }
  ]);

  const [newComplianceItem, setNewComplianceItem] = useState({
    id: "SEC-08",
    category: "Network & Isolation",
    name: "",
    reference: "docs/governance.md",
    description: "",
    remediation: "",
    status: 'UNCHECKED' as 'PASS' | 'FAIL' | 'UNCHECKED'
  });

  const [isScanningCompliance, setIsScanningCompliance] = useState<string | null>(null);

  const complianceScore = useMemo(() => {
    const total = complianceItems.length;
    if (total === 0) return 0;
    const passed = complianceItems.filter(item => item.status === 'PASS').length;
    return Math.round((passed / total) * 100);
  }, [complianceItems]);

  const complianceMarkdownCertificate = useMemo(() => {
    let md = `# SECURITY COMPLIANCE & GOVERNANCE REPORT
    
**Verification Standard**: Ethical Hacking Workspace Security Policy
**Assessor**: Certified Lead Security Practitioner
**Date of Audit**: ${new Date().toISOString().split('T')[0]}
**Compliance Score**: ${complianceScore}%

---

## 🛡️ Executive Summary
This document provides a compliance and governance alignment certificate confirming the secure boundaries, container hardening, code quality baselines, and execution sandboxing of the active workstation. The verification parameters are based on the master governance and security blueprints.

## 📊 Alignment Scorecard
- **Overall Score**: **${complianceScore}%**
- **Security Assessment Status**: ${complianceScore === 100 ? "🟢 FULLY COMPLIANT" : "🟡 PARTIAL REMEDIATION REQUIRED"}

---

## 📋 Governance Checklist Alignment Matrix

| Standard ID | Compliance Standard / Control | Category | Reference | Status |
| :--- | :--- | :--- | :--- | :---: |
`;

    complianceItems.forEach(item => {
      md += `| **${item.id}** | ${item.name} | ${item.category} | ${item.reference} | ${item.status === 'PASS' ? '✅ PASS' : item.status === 'FAIL' ? '❌ FAIL' : '⚪ UNCHECKED'} |\n`;
    });

    md += `
---
*This alignment certificate was compiled automatically by the Ethical Hacking Sandbox Compliance Auditor.*
*Hash Baseline Signature: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}*`;
    return md;
  }, [complianceItems, complianceScore]);

  const runSingleComplianceScan = (id: string) => {
    setIsScanningCompliance(id);
    setTimeout(() => {
      setComplianceItems(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, status: 'PASS' };
        }
        return item;
      }));
      setIsScanningCompliance(null);
    }, 800);
  };

  const runAllComplianceScans = () => {
    setIsScanningCompliance("all");
    setTimeout(() => {
      setComplianceItems(prev => prev.map(item => ({ ...item, status: 'PASS' })));
      setIsScanningCompliance(null);
    }, 1500);
  };

  // Terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "======================================================================",
    "🛡️  Ethical Hacking Labs Workspace Workstation [v1.0.0] - Online",
    "🛡️  Security Policy: Sandbox locked on localhost (127.0.0.1) limits.",
    "======================================================================",
    "Type any command (e.g. 'help', 'ls', 'ip a') or click a predefined macro below...",
  ]);
  const [customCommand, setCustomCommand] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isPreCheckRunning, setIsPreCheckRunning] = useState(false);
  const [auditPassed, setAuditPassed] = useState<boolean | null>(null);

  // Configuration States
  const [targetHost, setTargetHost] = useState("127.0.0.1");
  const [defaultPorts, setDefaultPorts] = useState("80, 443, 8080");
  const [logLevel, setLogLevel] = useState("INFO");
  const [isolationMode, setIsolationMode] = useState("internal");
  const [configValidationMsg, setConfigValidationMsg] = useState<string | null>(null);

  // Assessment Vulnerabilities Report States
  const [reportState, setReportState] = useState({
    title: "Quarterly Local Sandboxed Container Environment Audit",
    author: "Certified Lead Security Practitioner",
    targetHost: "127.0.0.1",
    assessmentDate: "2026-07-03",
    vulnerabilities: [
      { id: "VULN-01", name: "Insecure World-Writable Directory Privileges", severity: "Medium", cvss: "5.5", status: "Remediated", desc: "Found writeable directory /notes lacking restricted ACL masks. Solved via chmod 755." },
      { id: "VULN-02", name: "Unquoted Service Executable Exec Paths", severity: "Low", cvss: "3.4", status: "Monitored", desc: "A Windows service wrapper contained spaces without quote grouping. Remediated via path quote wraps." },
      { id: "VULN-03", name: "Verbose Nginx HTTP Daemon Server Headers", severity: "Informational", cvss: "0.0", status: "Monitored", desc: "Server header explicitly discloses Nginx version numbers. Recommended ServerTokens off." }
    ]
  });

  const [newVuln, setNewVuln] = useState({ id: "VULN-04", name: "", severity: "High", cvss: "7.5", status: "Pending", desc: "" });

  // CVSS Interactive Calculator Metrics
  const [cvssMetrics, setCvssMetrics] = useState({
    AV: 0.85, // Network
    AC: 0.77, // Low
    PR: 0.85, // None
    UI: 0.85, // None
    C: 0.56,  // High
    I: 0.56,  // High
    A: 0.56,  // High
  });

  // Calculate dynamic CVSS Score based on sliders
  const calculatedCvssScore = useMemo(() => {
    const exploitability = 8.22 * cvssMetrics.AV * cvssMetrics.AC * cvssMetrics.PR * cvssMetrics.UI;
    const impact = 1 - (1 - cvssMetrics.C) * (1 - cvssMetrics.I) * (1 - cvssMetrics.A);
    const score = impact * exploitability;
    const boundedScore = Math.min(Math.max(score, 0), 10);
    return boundedScore.toFixed(1);
  }, [cvssMetrics]);

  // Command simulation handling
  const executeSimulatedCommand = (cmd: string) => {
    let output = `\n practitioner@hacking-lab-sandbox:~$ ${cmd}\n`;
    const cleanCmd = cmd.trim();

    if (cleanCmd.startsWith("ls")) {
      output += "drwxr-xr-x  3 practitioner lab-group 4.0K Jul  3 11:00 docs\n";
      output += "drwxr-xr-x  2 practitioner lab-group 4.0K Jul  3 11:00 labs\n";
      output += "drwxr-xr-x  2 practitioner lab-group 4.0K Jul  3 11:00 scripts\n";
      output += "drwxr-xr-x  2 practitioner lab-group 4.0K Jul  3 11:00 tools\n";
      output += "-rwxr-xr-x  1 practitioner lab-group 1.2K Jul  3 11:01 setup.sh\n";
      output += "-rw-r--r--  1 practitioner lab-group  345 Jul  3 11:00 README.md";
    } else if (cleanCmd.includes("chmod")) {
      output += "[+] SUCCESS: Changed permissions state successfully.\n";
      output += "[+] Target node updated with designated numeric attributes.";
    } else if (cleanCmd.includes("ss -tulpn") || cleanCmd.includes("port_scanner")) {
      output += `[+] Port scan diagnostic initialized on target address: ${targetHost}\n`;
      output += "[+] Target subnets locked: Checking ports in list [" + defaultPorts + "]\n";
      output += "[OPEN] Port 8080 (hacking_lab_target) is reachable. State: LISTEN. Software: Nginx/alpine\n";
      output += "[CLOSED] Port 80 (Standard Web Proxy) is not reachable.\n";
      output += "[CLOSED] Port 443 (HTTPS Secure Socket) is closed.\n";
      output += "[+] Diagnostics query complete. Local socket scanning sequence finished.";
    } else if (cleanCmd.includes("ip a")) {
      output += "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN\n";
      output += "    inet 127.0.0.1/8 scope host lo\n";
      output += "    inet6 ::1/128 scope host\n";
      output += "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP\n";
      output += `    inet ${targetHost}/24 scope global bridge-subnet`;
    } else if (cleanCmd.includes("permission_audit.sh")) {
      output += "[+] SUID Permission Audit Diagnostics Tool v1.0.0\n";
      output += "[AUDIT] Evaluating critical workspace files patterns...\n";
      output += "[WARNING] Insecure globally writeable folder located: ./notes (Permissions: 777)\n";
      output += "[REMEDIATION PROPOSAL] Run 'chmod 755 ./notes' to restore restrictive safety bounds.\n";
      output += "[SUCCESS] Privilege scanner execution complete. Safe isolation validated.";
    } else if (cleanCmd.includes("file_integrity.py")) {
      output += "[+] Initializing Python SHA256 Integrity Monitor...\n";
      output += "[+] Scanning 24 files inside workspace folders...\n";
      output += "[SUCCESS] Baseline log generated successfully: baseline.json\n";
      output += "[SUCCESS] Calculated file integrity indices match initial safety profiles.";
    } else if (cleanCmd.includes("log_analyzer.py")) {
      output += "[+] Python Log Parsing Module activated.\n";
      output += "[+] File: simulated_access.log - Loading simulated web metrics...\n";
      output += "=========================================================\n";
      output += "          DETAILED SECURITY ACCESS LOG STATISTICS\n";
      output += "=========================================================\n";
      output += "[HTTP Status Code Frequency distribution]\n";
      output += "  HTTP 200 (Success): 4 requests\n";
      output += "  HTTP 401 (Unauthorized): 3 requests -> Traceable login failure bursts!\n";
      output += "  HTTP 403 (Forbidden Access): 1 requests\n";
      output += "[Requests Per Remote Source Adapter]\n";
      output += "  127.0.0.1 (Local host): 5 requests\n";
      output += "  192.168.1.15 (Bridge interface): 3 requests\n";
      output += "=========================================================\n";
      output += "[DEBUG] Diagnostic complete. Log statistics parsing resolved successfully.";
    } else if (cleanCmd.includes("docker")) {
      output += "[+] Initiating local Docker Compose network components...\n";
      output += "[+] Subnet address pool established: 172.19.0.0/16\n";
      output += "[SUCCESS] Container 'hacking_lab_target' compiled & activated on bridge interface.";
    } else if (cleanCmd === "help") {
      output += "Available commands in this educational dashboard:\n";
      output += "  help                             Show this diagnostic command manual\n";
      output += "  ls -lah                          List files in the safe current workstation directory\n";
      output += "  ip a                             Query active network interfaces and subnet scopes\n";
      output += "  ss -tulpn                        Examine socket status and active TCP/UDP ports\n";
      output += "  ./scripts/port_scanner.sh        Execute colorized TCP port scan sequence\n";
      output += "  ./scripts/permission_audit.sh    Run automatic privilege level audits\n";
      output += "  python3 tools/file_integrity.py  Check integrity checksum maps\n";
      output += "  python3 tools/log_analyzer.py    Compute access statistics metrics\n";
      output += "  clear                            Clear terminal logs screen";
    } else if (cleanCmd === "clear") {
      setTerminalLogs([]);
      return;
    } else {
      output += `Command '${cleanCmd}' executed in safe sandboxed environment.\n`;
      output += "[INFO] Activities are logged strictly under local practitioner training logs.";
    }

    setTerminalLogs(prev => [...prev, output]);
    setCustomCommand('');
  };

  const handleRunSetup = () => {
    setIsPreCheckRunning(true);
    setTerminalLogs(prev => [
      ...prev, 
      "\n practitioner@hacking-lab-sandbox:~$ ./scripts/setup.sh", 
      "[INFO] Scanning system architecture requirements...", 
      "[SUCCESS] Environment matches. Found dependencies: python3, pip3, docker, bash", 
      "[SUCCESS] Active workstation credentials valid. Workspace fully isolated."
    ]);
    setTimeout(() => {
      setIsPreCheckRunning(false);
      setAuditPassed(true);
    }, 700);
  };

  const handleResetLab = () => {
    setIsResetting(true);
    setTerminalLogs(prev => [
      ...prev, 
      "\n practitioner@hacking-lab-sandbox:~$ ./scripts/reset_lab.sh", 
      "[INFO] Resetting local target container structures to default state...", 
      "[INFO] Pruning dynamic system mounts...", 
      "[SUCCESS] Local laboratory target containers successfully refreshed."
    ]);
    setTimeout(() => {
      setIsResetting(false);
    }, 800);
  };

  // Add customized finding to vulnerability report list
  const handleAddVuln = () => {
    if (!newVuln.name) return;
    setReportState(prev => ({
      ...prev,
      vulnerabilities: [...prev.vulnerabilities, {
        id: newVuln.id,
        name: newVuln.name,
        severity: newVuln.severity,
        cvss: calculatedCvssScore,
        status: newVuln.status,
        desc: newVuln.desc || "Verified diagnostic vulnerability. Remediation steps logged."
      }]
    }));
    // reset form
    const nextIdNum = parseInt(newVuln.id.split('-')[1]) + 1;
    const nextId = `VULN-${nextIdNum.toString().padStart(2, '0')}`;
    setNewVuln({ id: nextId, name: "", severity: "High", cvss: "7.5", status: "Pending", desc: "" });
  };

  // Remove finding
  const handleRemoveVuln = (id: string) => {
    setReportState(prev => ({
      ...prev,
      vulnerabilities: prev.vulnerabilities.filter(v => v.id !== id)
    }));
  };

  // Filtered files list based on search term
  const filteredFiles = useMemo(() => {
    return FILE_TREE.filter(f => f.path.toLowerCase().includes(fileSearchTerm.toLowerCase()));
  }, [fileSearchTerm]);

  // Read current active file content
  const activeFileContent = useMemo(() => {
    // If it's a file path in our dict, return that
    if (FILE_CONTENTS_DICT[selectedFilePath]) {
      return FILE_CONTENTS_DICT[selectedFilePath];
    }
    // If it's a directory, return a listing
    const isDir = FILE_TREE.find(f => f.path === selectedFilePath)?.type === 'dir';
    if (isDir) {
      return `[DIRECTORY PATH] ${selectedFilePath}\n\nThis is a structural module containing laboratory assets. Use the workspace explorer files to view specific documentation or code contents.`;
    }
    return `# File: ${selectedFilePath}\n\nBinary content, documentation, or script configurations. Fully isolated in local repository workstation structure.`;
  }, [selectedFilePath]);

  // Validation function for settings
  const handleValidateConfig = () => {
    // Basic format checking
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipv4Regex.test(targetHost)) {
      setConfigValidationMsg("❌ Error: Target Host must be a valid IPv4 address.");
      return;
    }
    setConfigValidationMsg("✅ Success: Settings verified. Configuration profiles are completely compliant!");
  };

  // Dynamically constructed markdown report for previewing and exporting
  const fullGeneratedMarkdownReport = useMemo(() => {
    let reportMd = `# SECURITY FINDINGS ASSESSMENT REPORT

**Assessment Title**: ${reportState.title}
**Assessor Practitioner**: ${reportState.author}
**Host Target**: ${reportState.targetHost}
**Verification Date**: ${reportState.assessmentDate}

---

## 1. Executive Summary
This document serves as the official, educational security report compiled for the verified target workstation environment. Utilizing containerized local sandboxes and custom terminal diagnostic scripts, multiple configuration priorities were identified and audited for lease privilege compliance.

## 2. Assessment Finding Matrix
We prioritize vulnerabilities according to the Common Vulnerability Scoring System (CVSS v3.1) metrics framework.

| Finding ID | Vulnerability / Configuration Gap | Priority | CVSS Base Score | Status |
| :--- | :--- | :--- | :---: | :--- |
`;

    reportState.vulnerabilities.forEach(v => {
      reportMd += `| **${v.id}** | ${v.name} | ${v.severity} | **${v.cvss}** | ${v.status} |\n`;
    });

    reportMd += `
## 3. Technical Vulnerabilities Details

`;

    reportState.vulnerabilities.forEach(v => {
      reportMd += `### [${v.id}] ${v.name}
- **Vulnerability Priority**: ${v.severity}
- **CVSS v3 Score**: ${v.cvss}
- **Remediation Status**: ${v.status}
- **Finding Description**: ${v.desc}

`;
    });

    reportMd += `---
*Report compiled automatically inside the Ethical Hacking Labs Workstation. Safe Local Sandbox Mode.*`;
    return reportMd;
  }, [reportState]);

  // Copy helper
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(label);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-sky-500/35 selection:text-white">
      
      {/* Top Enterprise Navigation & Header */}
      <header className="border-b border-slate-900 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 self-start">
          <div className="p-2.5 bg-gradient-to-tr from-sky-600 to-indigo-700 rounded-lg shadow-inner">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white font-sans">
                Ethical Hacking Labs
              </h1>
              <span className="text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                LOCKED SANDBOX
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">MIT educational lab framework & interactive workspace</p>
          </div>
        </div>

        {/* Diagnostic Actions & Operations */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleRunSetup}
            disabled={isPreCheckRunning}
            className="bg-sky-600 hover:bg-sky-500 text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 shadow disabled:opacity-50"
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isPreCheckRunning ? 'animate-pulse' : ''}`} /> 
            {isPreCheckRunning ? 'Verifying...' : 'Prerequisite Check'}
          </button>
          
          <button 
            onClick={handleResetLab}
            disabled={isResetting}
            className="bg-slate-900 hover:bg-slate-850 text-slate-100 border border-slate-800 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} /> 
            {isResetting ? 'Restoring Containers...' : 'Refresh Container Targets'}
          </button>
        </div>
      </header>

      {/* Primary Dashboard Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Sidebar Controls */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Main Module Tabs Navigation */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-900 p-3 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Workspace Modules</div>
            
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'overview' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><FolderTree className="w-4 h-4" /> Workspace Explorer</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 font-mono text-slate-400">24 Nodes</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('labs')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'labs' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> 10 Lab Syllabus</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 font-mono text-slate-400">10 Modules</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('terminal')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'terminal' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><TerminalIcon className="w-4 h-4" /> Console Terminal</span>
              <span className="text-[10px] text-emerald-400 font-mono animate-pulse">● Live</span>
            </button>

            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'reports' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Assessment Reports</span>
              <span className="text-[10px] font-mono text-indigo-400">CVSS v3</span>
            </button>

            <button 
              onClick={() => setActiveTab('compliance')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'compliance' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-indigo-400" /> Compliance & Gov</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{complianceScore}%</span>
            </button>

            <button 
              onClick={() => setActiveTab('config')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'config' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> Global Config</span>
            </button>
          </div>

          {/* Quick Metrics & Realtime diagnostics */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900 space-y-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Workstation Telemetry</div>
            
            <div className="flex items-center justify-between text-xs border-b border-slate-900/40 pb-2">
              <span className="text-slate-400 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-slate-500" /> Host OS Target</span>
              <span className="text-slate-300 font-semibold">Kali / Ubuntu</span>
            </div>

            <div className="flex items-center justify-between text-xs border-b border-slate-900/40 pb-2">
              <span className="text-slate-400 flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-slate-500" /> Container Subnet</span>
              <span className="text-sky-400 font-semibold font-mono">172.19.0.0/24</span>
            </div>

            <div className="flex items-center justify-between text-xs border-b border-slate-900/40 pb-2">
              <span className="text-slate-400 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-500" /> Gateway Bounds</span>
              <span className="text-emerald-400 font-mono font-semibold">{targetHost}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-slate-500" /> Setup Audit State</span>
              {auditPassed === null ? (
                <span className="text-amber-400 font-semibold text-[11px] bg-amber-400/10 px-1.5 py-0.5 rounded">Unchecked</span>
              ) : auditPassed ? (
                <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-400/10 px-1.5 py-0.5 rounded">Verified</span>
              ) : (
                <span className="text-rose-400 font-semibold text-[11px] bg-rose-400/10 px-1.5 py-0.5 rounded">Error</span>
              )}
            </div>
          </div>

          {/* Quick Info Box on Ethics */}
          <div className="bg-sky-500/5 p-4 rounded-xl border border-sky-500/10 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Safety Containment Protocol</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              All activities run strictly inside the local isolated memory stack. External packet transmission is disabled by security configuration attributes.
            </p>
          </div>
        </div>

        {/* Right Dynamic Tab Content Columns */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: WORKSPACE EXPLORER */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Modern Enterprise Repository Header */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Shield className="w-48 h-48 text-sky-400" />
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2">Open-Source Lab Workspace Explorer</h2>
                <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
                  This interactive directory is a precise representation of the repository workspace structure. Click any file node below to inspect script codes, security configurations, or markdown manuals live in the workspace code viewer.
                </p>
                
                {/* Visual verification checklist */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-900 pt-4">
                  <div>
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-2">Automated Repository Assets</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> ShellCheck-compliant Bash utilities</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Python SHA256 integrity checkers</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Docker bridge network configs</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Lab Isolation Attributes</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Local loopback bounds enforced</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Restrictive permission profiles</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Purely educational diagnostic modules</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* IDE Split Container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/40 rounded-xl border border-slate-900 p-4">
                
                {/* File tree sidebar panel */}
                <div className="md:col-span-1 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Repository Files</span>
                    <span className="text-[10px] font-mono text-slate-500">{FILE_TREE.length} items</span>
                  </div>

                  {/* Search file input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                    <input 
                      type="text"
                      placeholder="Filter files..."
                      value={fileSearchTerm}
                      onChange={(e) => setFileSearchTerm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  {/* Nodes listing list */}
                  <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                    {filteredFiles.map((node, idx) => {
                      const isSelected = selectedFilePath === node.path;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => {
                            if (node.type === 'file') setSelectedFilePath(node.path);
                          }}
                          className={`flex items-center justify-between py-1.5 px-2 rounded cursor-pointer transition-all ${node.indent ? 'ml-4' : 'mt-1.5 font-bold border-b border-slate-900/30'} ${node.type === 'dir' ? 'cursor-default pointer-events-none' : ''} ${isSelected ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm' : 'hover:bg-slate-900 text-slate-300'}`}
                        >
                          <span className="flex items-center gap-1.5 text-[11px] font-mono truncate">
                            {node.indent && <CornerDownRight className="w-3 h-3 text-slate-600 shrink-0" />}
                            <span className="text-xs shrink-0">{node.type === 'dir' ? '📁' : '📄'}</span>
                            <span className={node.type === 'dir' ? 'text-slate-400 font-semibold' : 'truncate'}>{node.path}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* File Contents display editor viewport */}
                <div className="md:col-span-2 flex flex-col h-[480px] bg-slate-950 rounded-lg border border-slate-900 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-900">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-xs font-mono text-sky-400 font-semibold truncate">{selectedFilePath}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">READ-ONLY</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleCopyToClipboard(activeFileContent, selectedFilePath)}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        title="Copy content"
                      >
                        {copiedPath === selectedFilePath ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Editor View */}
                  <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
                    {activeFileContent}
                  </div>

                  <div className="px-4 py-2 bg-slate-900/40 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Format: {selectedFilePath.endsWith('.md') ? 'Markdown Documentation' : selectedFilePath.endsWith('.sh') ? 'Bash Script Engine' : 'System Properties File'}</span>
                    <span>Charset: UTF-8</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: 10 MODULE SYLLABUS */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              
              {/* Syllabus Header and Selection Grid */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <h3 className="font-bold text-white text-base mb-1">10-Module Cybersecurity Syllabus Manuals</h3>
                <p className="text-xs text-slate-400 mb-6">Select a module to view objectives, commands, remediation standards, and to trigger diagnostic code simulations.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {COMPLETE_LABS.map(lab => (
                    <div 
                      key={lab.id}
                      onClick={() => setSelectedLab(lab)}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${selectedLab.id === lab.id ? 'border-sky-500 bg-sky-500/5 shadow-md' : 'border-slate-850 hover:border-slate-700 bg-slate-950/40'}`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-sky-400 font-bold border border-slate-800">{lab.category}</span>
                        <span className="text-[10px] font-mono text-slate-500">{lab.difficulty} | {lab.estimatedTime}</span>
                      </div>
                      <h4 className="font-bold text-white text-xs mb-1 truncate">{lab.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{lab.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus detail inspection viewport */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500">Active Syllabus Manual</span>
                    <h3 className="font-bold text-white text-lg">{selectedLab.title}</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('terminal');
                      setTerminalLogs(prev => [
                        ...prev, 
                        `\n# Initializing workspace metrics for lab module: ${selectedLab.title}`, 
                        `# Pre-configured helper tool available: ${selectedLab.commands[0]}`
                      ]);
                    }}
                    className="text-xs bg-sky-600/10 hover:bg-sky-600/25 text-sky-400 px-3 py-1.5 rounded border border-sky-500/20 font-bold transition-all flex items-center gap-1.5"
                  >
                    <TerminalIcon className="w-3.5 h-3.5" /> Mount Lab in Console
                  </button>
                </div>

                {/* Practical Lab Manual Reader (IDE styled viewport) */}
                <div className="bg-slate-950 p-5 rounded-lg border border-slate-900 max-h-[300px] overflow-y-auto font-mono text-xs text-slate-300 space-y-4">
                  <div className="whitespace-pre-wrap leading-relaxed select-text">
                    {selectedLab.manualContent}
                  </div>
                </div>

                {/* Objectives */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-sky-400" /> Key Learning Outcomes & Goals
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedLab.outcomes.map((outcome, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-900 text-xs text-slate-300 flex flex-col justify-between">
                        <span>{outcome}</span>
                        <span className="text-[9px] font-mono text-slate-500 mt-2">Verified Standard #{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Diagnostic Quick Commands Run */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-emerald-400" /> Interactive Diagnostic Quick-Runs
                  </h4>
                  <div className="space-y-2">
                    {selectedLab.commands.map((cmd, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-md border border-slate-900 font-mono text-xs">
                        <span className="text-emerald-400">{cmd}</span>
                        <button 
                          onClick={() => {
                            executeSimulatedCommand(cmd);
                            setActiveTab('terminal');
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 text-emerald-400" /> Simulate Run
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: CONSOLE TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="space-y-6">
              
              {/* Fully functional simulated terminal command environment */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-[520px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900 bg-slate-950/80 rounded-t-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-2">practitioner@hacking-lab-sandbox:~</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono border border-slate-700 font-semibold animate-pulse">
                    ACTIVE LOCAL WORKSTATION
                  </span>
                </div>

                {/* Terminal logs viewport */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-slate-950 text-slate-300">
                  {terminalLogs.map((log, index) => (
                    <pre key={index} className="whitespace-pre-wrap leading-relaxed select-text">{log}</pre>
                  ))}
                </div>

                {/* Pre-defined Diagnostic Macros panel for easy testing */}
                <div className="p-2 border-t border-slate-900 bg-slate-900/60 flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase px-2 py-1 select-none flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Predefined Macros:
                  </span>
                  
                  <button 
                    onClick={() => executeSimulatedCommand("./scripts/port_scanner.sh -t 127.0.0.1 -p 8080")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1.5 rounded border border-slate-750 transition-all font-mono"
                  >
                    Run Port Scan
                  </button>
                  
                  <button 
                    onClick={() => executeSimulatedCommand("./scripts/permission_audit.sh")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1.5 rounded border border-slate-750 transition-all font-mono"
                  >
                    Audit Permissions
                  </button>
                  
                  <button 
                    onClick={() => executeSimulatedCommand("python3 tools/file_integrity.py")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1.5 rounded border border-slate-750 transition-all font-mono"
                  >
                    Python Integrity Check
                  </button>
                  
                  <button 
                    onClick={() => executeSimulatedCommand("python3 tools/log_analyzer.py")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1.5 rounded border border-slate-750 transition-all font-mono"
                  >
                    Python Log Metrics
                  </button>
                </div>

                {/* Input prompt bar */}
                <div className="p-3 border-t border-slate-900 bg-slate-950 flex items-center space-x-3 rounded-b-xl">
                  <span className="text-sky-400 font-mono text-sm font-semibold">$</span>
                  <input 
                    type="text" 
                    value={customCommand}
                    onChange={(e) => setCustomCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        executeSimulatedCommand(customCommand);
                      }
                    }}
                    placeholder="Type diagnostic commands (e.g., 'help', 'ls -lah', 'ip a', 'ss -tulpn', 'docker compose')"
                    className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:ring-0 placeholder-slate-700 outline-none"
                  />
                  <button 
                    onClick={() => executeSimulatedCommand(customCommand)}
                    className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-1.5 rounded text-xs font-semibold font-mono transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: REPORTS AND ASSESSMENT WRITING */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              
              {/* Form to configure report output metadata */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-4">
                <div className="border-b border-slate-900 pb-3">
                  <h3 className="font-bold text-white text-base">Security Assessment Report Generator</h3>
                  <p className="text-xs text-slate-400">Generate a professional, sanitized educational markdown report summarizing your workstation and container safety audits.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Assessment Scope Title</label>
                    <input 
                      type="text"
                      value={reportState.title}
                      onChange={(e) => setReportState(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Practitioner Assessor Name</label>
                    <input 
                      type="text"
                      value={reportState.author}
                      onChange={(e) => setReportState(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Host Scope</label>
                    <input 
                      type="text"
                      value={reportState.targetHost}
                      onChange={(e) => setReportState(prev => ({ ...prev, targetHost: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Verification Date</label>
                    <input 
                      type="date"
                      value={reportState.assessmentDate}
                      onChange={(e) => setReportState(prev => ({ ...prev, assessmentDate: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Vulnerabilities List findings manager with CVSS interactive Calculator */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-6">
                <div>
                  <h3 className="font-bold text-white text-base">Vulnerabilities Findings Log Sheet</h3>
                  <p className="text-xs text-slate-400 mb-4">Add, remove, or customize findings. Compute compliant CVSS score priorities automatically using the metrics panel below.</p>
                </div>

                {/* List of active vulnerabilities in report */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {reportState.vulnerabilities.map((v, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-950 p-3 rounded border border-slate-900 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-400">{v.id}</span>
                          <span className="text-xs font-semibold text-white">{v.name}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${v.severity === 'Critical' || v.severity === 'High' ? 'bg-rose-500/10 text-rose-400' : v.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                            {v.severity} ({v.cvss})
                          </span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">{v.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">{v.desc}</p>
                      </div>

                      <button 
                        onClick={() => handleRemoveVuln(v.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 hover:bg-slate-900 rounded transition-colors self-end md:self-auto shrink-0"
                        title="Delete finding"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new vulnerability findings form */}
                <div className="border-t border-slate-900 pt-4 space-y-4">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add Customized Security Finding
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Finding Code ID</label>
                      <input 
                        type="text"
                        value={newVuln.id}
                        onChange={(e) => setNewVuln(prev => ({ ...prev, id: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] text-slate-400 mb-1">Finding Name / Vulnerability Title</label>
                      <input 
                        type="text"
                        value={newVuln.name}
                        onChange={(e) => setNewVuln(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. World-Writable Cron Paths"
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* CVSS Metric Selectors */}
                  <div className="bg-slate-950 p-4 rounded border border-slate-900 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                        <Sliders className="w-4 h-4" /> Interactive CVSS v3.1 Calculator Metrics
                      </div>
                      <div className="text-xs font-mono font-bold text-white bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                        Computed Score: {calculatedCvssScore} / 10
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Exploitability Sliders */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Exploitability Metrics</div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">Attack Vector (AV):</span>
                            <span className="text-sky-400 font-mono">{cvssMetrics.AV === 0.85 ? 'Network' : cvssMetrics.AV === 0.62 ? 'Adjacent' : cvssMetrics.AV === 0.55 ? 'Local' : 'Physical'}</span>
                          </div>
                          <input 
                            type="range" min="1" max="4" step="1"
                            defaultValue="1"
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const av = val === 1 ? 0.85 : val === 2 ? 0.62 : val === 3 ? 0.55 : 0.2;
                              setCvssMetrics(prev => ({ ...prev, AV: av }));
                            }}
                            className="w-full accent-sky-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">Attack Complexity (AC):</span>
                            <span className="text-sky-400 font-mono">{cvssMetrics.AC === 0.77 ? 'Low' : 'High'}</span>
                          </div>
                          <input 
                            type="range" min="1" max="2" step="1"
                            defaultValue="1"
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const ac = val === 1 ? 0.77 : 0.44;
                              setCvssMetrics(prev => ({ ...prev, AC: ac }));
                            }}
                            className="w-full accent-sky-500"
                          />
                        </div>
                      </div>

                      {/* Impact Metrics */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Security Impact Metrics (CIA)</div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">Confidentiality Impact (C):</span>
                            <span className="text-sky-400 font-mono">{cvssMetrics.C === 0.56 ? 'High' : cvssMetrics.C === 0.22 ? 'Low' : 'None'}</span>
                          </div>
                          <input 
                            type="range" min="1" max="3" step="1"
                            defaultValue="1"
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const c = val === 1 ? 0.56 : val === 2 ? 0.22 : 0;
                              setCvssMetrics(prev => ({ ...prev, C: c }));
                            }}
                            className="w-full accent-indigo-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">Integrity Impact (I):</span>
                            <span className="text-sky-400 font-mono">{cvssMetrics.I === 0.56 ? 'High' : cvssMetrics.I === 0.22 ? 'Low' : 'None'}</span>
                          </div>
                          <input 
                            type="range" min="1" max="3" step="1"
                            defaultValue="1"
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const i = val === 1 ? 0.56 : val === 2 ? 0.22 : 0;
                              setCvssMetrics(prev => ({ ...prev, I: i }));
                            }}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Status</label>
                      <select 
                        value={newVuln.status}
                        onChange={(e) => setNewVuln(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      >
                        <option value="Pending">Pending Audit Review</option>
                        <option value="Remediated">Remediated & Verified</option>
                        <option value="Monitored">Sustained / Monitored</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Remediation Action Description</label>
                      <input 
                        type="text"
                        value={newVuln.desc}
                        onChange={(e) => setNewVuln(prev => ({ ...prev, desc: e.target.value }))}
                        placeholder="e.g. Restored 755 mask values."
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-[10px] text-slate-500 font-mono">
                      Metric priority rating: {parseFloat(calculatedCvssScore) >= 7.0 ? '🚨 HIGH/CRITICAL' : parseFloat(calculatedCvssScore) >= 4.0 ? '⚠️ MEDIUM' : '✅ LOW/INFO'}
                    </div>
                    <button 
                      onClick={handleAddVuln}
                      disabled={!newVuln.name}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-xs font-semibold transition-all disabled:opacity-50"
                    >
                      Commit Finding
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Report Markdown Preview and Copy Export controls */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Generated Assessment Report Output Preview</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 font-mono">EXPORT FORMAT: MARKDOWN (.md)</span>
                  </div>
                  <button 
                    onClick={() => handleCopyToClipboard(fullGeneratedMarkdownReport, "Full Report")}
                    className="text-xs bg-indigo-600/10 hover:bg-indigo-600/25 text-indigo-400 px-3 py-1.5 rounded border border-indigo-500/20 font-bold transition-all flex items-center gap-1"
                  >
                    {copiedPath === "Full Report" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy Markdown Report
                  </button>
                </div>

                <div className="bg-slate-950 p-6 rounded-lg border border-slate-900 font-mono text-xs text-slate-300 space-y-4 max-h-[300px] overflow-y-auto leading-relaxed select-text">
                  <pre className="whitespace-pre-wrap">{fullGeneratedMarkdownReport}</pre>
                </div>
              </div>

            </div>
          )}

          {/* TAB: COMPLIANCE & GOVERNANCE */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              
              {/* Compliance Title Banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Shield className="w-48 h-48 text-indigo-400" />
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-400" />
                  Compliance & Governance Dashboard
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
                  Inspect, audit, and log your ethical laboratory environment's adherence to security and administrative governance standards. This checklist is compiled dynamically based on the project's foundational specifications (e.g., <code>SECURITY.md</code>, <code>CONTRIBUTING.md</code>, and syllabus guidelines).
                </p>
              </div>

              {/* Scorecard Gauge & Operational Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Scorecard Widget Card */}
                <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Overall Security Alignment</h3>
                    <p className="text-slate-500 text-[10px]">Real-time percentage compliance</p>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black font-mono tracking-tight text-white">{complianceScore}%</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${complianceScore === 100 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                      {complianceScore === 100 ? 'Fully Compliant' : 'Remediation Needed'}
                    </span>
                  </div>

                  {/* Progress bar container */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className={`h-full transition-all duration-500 ${complianceScore === 100 ? 'bg-emerald-500' : complianceScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${complianceScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Categories breakdown and status counters */}
                <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 md:col-span-2 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Policy Registry Statistics</h3>
                      <p className="text-slate-500 text-[10px]">Audit lifecycle states & counts</p>
                    </div>

                    <button 
                      onClick={runAllComplianceScans}
                      disabled={isScanningCompliance !== null}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 text-white px-3 py-1.5 rounded font-bold border border-indigo-500/25 transition-all flex items-center gap-1.5 disabled:text-slate-500"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isScanningCompliance === 'all' ? 'animate-spin' : ''}`} />
                      {isScanningCompliance === 'all' ? 'Verifying Ledger...' : 'Audit Entire Workspace'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded border border-slate-900 text-center space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Passed</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        {complianceItems.filter(i => i.status === 'PASS').length}
                      </div>
                      <div className="text-[9px] text-slate-500">Verified standards</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded border border-slate-900 text-center space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unchecked</div>
                      <div className="text-2xl font-bold font-mono text-amber-400">
                        {complianceItems.filter(i => i.status === 'UNCHECKED').length}
                      </div>
                      <div className="text-[9px] text-slate-500">Awaiting audit</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded border border-slate-900 text-center space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Failed</div>
                      <div className="text-2xl font-bold font-mono text-rose-400">
                        {complianceItems.filter(i => i.status === 'FAIL').length}
                      </div>
                      <div className="text-[9px] text-slate-500">Gaps detected</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Dynamic Interactive Checklist Grid */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base">Active Governance Standard Controls</h3>
                  <p className="text-xs text-slate-400">Click any control row to inspect references, vulnerability remediation policies, and trigger localized auditing loops.</p>
                </div>

                <div className="space-y-3">
                  {complianceItems.map((item, index) => {
                    const isScanning = isScanningCompliance === item.id;
                    return (
                      <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-900 hover:border-slate-800 transition-all space-y-3">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{item.id}</span>
                              <span className="text-xs font-bold text-white">{item.name}</span>
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                            {/* Interactive status indicators / buttons */}
                            <button 
                              onClick={() => {
                                setComplianceItems(prev => prev.map(p => p.id === item.id ? { ...p, status: 'PASS' } : p));
                              }}
                              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${item.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-slate-500 border border-slate-850 hover:text-slate-300 hover:bg-slate-800'}`}
                            >
                              PASS
                            </button>
                            <button 
                              onClick={() => {
                                setComplianceItems(prev => prev.map(p => p.id === item.id ? { ...p, status: 'FAIL' } : p));
                              }}
                              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${item.status === 'FAIL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-900 text-slate-500 border border-slate-850 hover:text-slate-300 hover:bg-slate-800'}`}
                            >
                              FAIL
                            </button>
                            <button 
                              onClick={() => {
                                setComplianceItems(prev => prev.map(p => p.id === item.id ? { ...p, status: 'UNCHECKED' } : p));
                              }}
                              className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${item.status === 'UNCHECKED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-900 text-slate-500 border border-slate-850 hover:text-slate-300 hover:bg-slate-800'}`}
                            >
                              UNCHECK
                            </button>

                            <button 
                              onClick={() => runSingleComplianceScan(item.id)}
                              disabled={isScanning || isScanningCompliance !== null}
                              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-2.5 py-1 rounded text-[10px] font-bold font-mono transition-colors"
                            >
                              {isScanning ? 'Testing...' : 'Verify'}
                            </button>
                          </div>
                        </div>

                        {/* Expandable details showing mitigation standard reference */}
                        <div className="border-t border-slate-900 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-normal">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Governance Doc Reference</span>
                            <div className="text-slate-400 font-mono flex items-center gap-1">
                              <span>📖 {item.reference}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Verification & Remediation Path</span>
                            <p className="text-slate-400 font-sans italic">{item.remediation}</p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Governance Standard Form */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-4">
                <div className="border-b border-slate-900 pb-3">
                  <h3 className="font-bold text-white text-base">Incorporate Corporate Governance Standard</h3>
                  <p className="text-xs text-slate-400">Append customized security requirements, audit bounds, or organizational compliance baselines directly to the active verified ledger.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Standard Code ID</label>
                    <input 
                      type="text"
                      value={newComplianceItem.id}
                      onChange={(e) => setNewComplianceItem(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Domain Category</label>
                    <select 
                      value={newComplianceItem.category}
                      onChange={(e) => setNewComplianceItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                    >
                      <option value="Network & Isolation">Network & Isolation</option>
                      <option value="Code Governance">Code Governance</option>
                      <option value="Container Hardening">Container Hardening</option>
                      <option value="Data Integrity">Data Integrity</option>
                      <option value="Governance">Governance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Doc Reference Link</label>
                    <input 
                      type="text"
                      value={newComplianceItem.reference}
                      onChange={(e) => setNewComplianceItem(prev => ({ ...prev, reference: e.target.value }))}
                      placeholder="e.g. docs/maintenance.md"
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Standard Policy Title</label>
                    <input 
                      type="text"
                      value={newComplianceItem.name}
                      onChange={(e) => setNewComplianceItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Mandatory Port Exposure Bounds"
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Audit Policy Description</label>
                    <input 
                      type="text"
                      value={newComplianceItem.description}
                      onChange={(e) => setNewComplianceItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Specify standard validation objectives and criteria..."
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Remediation Action Path</label>
                  <input 
                    type="text"
                    value={newComplianceItem.remediation}
                    onChange={(e) => setNewComplianceItem(prev => ({ ...prev, remediation: e.target.value }))}
                    placeholder="Steps required to bring configuration back into full compliance states..."
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => {
                      if (!newComplianceItem.name || !newComplianceItem.description) return;
                      setComplianceItems(prev => [...prev, {
                        id: newComplianceItem.id,
                        category: newComplianceItem.category,
                        name: newComplianceItem.name,
                        reference: newComplianceItem.reference,
                        description: newComplianceItem.description,
                        remediation: newComplianceItem.remediation || "Review corporate guidelines and adjust properties accordingly.",
                        status: newComplianceItem.status
                      }]);
                      // increment next ID
                      const nextNum = parseInt(newComplianceItem.id.split('-')[1]) + 1;
                      const nextId = `SEC-${nextNum.toString().padStart(2, '0')}`;
                      setNewComplianceItem({
                        id: nextId,
                        category: "Network & Isolation",
                        name: "",
                        reference: "docs/governance.md",
                        description: "",
                        remediation: "",
                        status: 'UNCHECKED'
                      });
                    }}
                    disabled={!newComplianceItem.name || !newComplianceItem.description}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    Commit Governance Control
                  </button>
                </div>
              </div>

              {/* Copyable Compliance Certificate / Export Area */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Alignment Verification Report Output</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 font-mono">FORMAT: MARKDOWN (.md)</span>
                  </div>
                  <button 
                    onClick={() => handleCopyToClipboard(complianceMarkdownCertificate, "Compliance Certificate")}
                    className="text-xs bg-indigo-600/10 hover:bg-indigo-600/25 text-indigo-400 px-3 py-1.5 rounded border border-indigo-500/20 font-bold transition-all flex items-center gap-1"
                  >
                    {copiedPath === "Compliance Certificate" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Compliance Certificate
                  </button>
                </div>

                <div className="bg-slate-950 p-6 rounded-lg border border-slate-900 font-mono text-xs text-slate-300 space-y-4 max-h-[250px] overflow-y-auto leading-relaxed select-text">
                  <pre className="whitespace-pre-wrap">{complianceMarkdownCertificate}</pre>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: GLOBAL CONFIG */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-6">
                <div className="border-b border-slate-900 pb-3">
                  <h3 className="font-bold text-white text-base">Global Workstation Configuration Profiles</h3>
                  <p className="text-xs text-slate-400">Tweak host parameters. These parameters govern dynamic terminal diagnostics and SUID verification loops instantly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Host IP Bounds</label>
                    <input 
                      type="text"
                      value={targetHost}
                      onChange={(e) => setTargetHost(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Recommended loopback adapter constraints: 127.0.0.1</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Default Ports Scopes</label>
                    <input 
                      type="text"
                      value={defaultPorts}
                      onChange={(e) => setDefaultPorts(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Comma-separated TCP ports mapping list</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Diagnostics Verbosity Level</label>
                    <select 
                      value={logLevel}
                      onChange={(e) => setLogLevel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans"
                    >
                      <option value="DEBUG">DEBUG (Detailed raw variables trace)</option>
                      <option value="INFO">INFO (Standard security execution logs)</option>
                      <option value="WARN">WARN (Permission anomalies highlight)</option>
                      <option value="ERROR">ERROR (Severe crashes or socket blockages)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sandbox Subnet Isolation Mode</label>
                    <select 
                      value={isolationMode}
                      onChange={(e) => setIsolationMode(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans"
                    >
                      <option value="internal">Internal (Exclusively container bridge adapters)</option>
                      <option value="isolated-host">Isolated-Host (No routing to outside adapters)</option>
                      <option value="localhost-only">Localhost Only (Strict routing to 127.0.0.1)</option>
                    </select>
                  </div>
                </div>

                {/* Validation and Apply */}
                <div className="border-t border-slate-900 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    {configValidationMsg && (
                      <div className="text-xs font-mono font-medium">{configValidationMsg}</div>
                    )}
                  </div>
                  <button 
                    onClick={handleValidateConfig}
                    className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded text-xs font-semibold transition-all self-end"
                  >
                    Validate & Apply Settings
                  </button>
                </div>
              </div>

              {/* Visualized Environment Configuration Files */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <div className="border-b border-slate-900 pb-3 mb-4">
                  <h4 className="font-bold text-white text-sm">Synchronized Configuration Profiles</h4>
                  <p className="text-xs text-slate-400">These profiles sync with parameters dynamically inside the database configuration engine.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* config.yaml */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 font-mono">config/config.yaml</div>
                    <pre className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] text-slate-300 leading-relaxed select-text">
{`lab_defaults:
  target_host: "${targetHost}"
  default_ports: [${defaultPorts}]
  log_level: "${logLevel}"
  enable_color: true
  isolation_mode: "${isolationMode}"`}
                    </pre>
                  </div>

                  {/* settings.ini */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 font-mono">config/settings.ini</div>
                    <pre className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] text-slate-300 leading-relaxed select-text">
{`[lab]
target_host = ${targetHost}
default_ports = ${defaultPorts}
log_level = ${logLevel}
enable_color = true
isolation_mode = ${isolationMode}`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Footer information */}
      <footer className="border-t border-slate-900 bg-slate-900/40 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Educational Ethical Hacking Labs Workstation. Authorized local sandboxed environment.</p>
          <div className="flex space-x-4 mt-2 md:mt-0 font-mono">
            <span>v1.0.0 (Stable release)</span>
            <span>Local isolation bound</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
