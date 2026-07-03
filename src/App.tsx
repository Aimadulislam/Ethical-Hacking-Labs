import React, { useState } from 'react';
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
  CornerDownRight
} from 'lucide-react';

// Comprehensive listing of 10-module syllabus for Ethical Hacking Labs
const COMPLETE_LABS = [
  {
    id: "lab01",
    title: "Lab 01: Linux System Administration & Basics",
    category: "Linux Basics",
    difficulty: "Beginner",
    description: "Learn terminal shell navigation, evaluate SUID root configs, and manage active service processes.",
    commands: ["ls -lah", "chmod 755 test.sh", "find . -perm -4000 -type f 2>/dev/null"],
    outcomes: [
      "Interpret directory access privilege vectors (rwxr-xr-x)",
      "Audit active socket bounds and trace local network routers",
      "Explain the risk profiles of SUID flags"
    ]
  },
  {
    id: "lab02",
    title: "Lab 02: Network Foundations & Sockets",
    category: "Networking",
    difficulty: "Beginner",
    description: "Perform TCP handshake loops, trace DNS namespaces, and query listening system adapters.",
    commands: ["ip a", "ping -c 3 127.0.0.1", "ss -tulpn"],
    outcomes: [
      "Diagnose client-side latency using socket statistics",
      "Map loopback adapter bounds on virtual private networks",
      "Describe SYN, SYN-ACK, ACK handshake sequences"
    ]
  },
  {
    id: "lab03",
    title: "Lab 03: Service Enumeration & Host Profiling",
    category: "Enumeration",
    difficulty: "Intermediate",
    description: "Learn socket-level port scanning, inspect active banners, and record target service signatures.",
    commands: ["./scripts/port_scanner.sh -t 127.0.0.1 -p 80,443,8080", "curl -I http://127.0.0.1:8080"],
    outcomes: [
      "Differentiate between open, closed, and filtered firewall states",
      "Extract HTTP response server headers safely",
      "Map responsive subnets without executing intrusive sweeps"
    ]
  },
  {
    id: "lab04",
    title: "Lab 04: Vulnerability Assessment & Auditing",
    category: "Vuln Assessment",
    difficulty: "Intermediate",
    description: "Verify configurations using automated permission checks and flag misconfigured world-writable nodes.",
    commands: ["./scripts/permission_audit.sh"],
    outcomes: [
      "Audit file structures for insecure permissions (777)",
      "Automate directory audits using production-grade shell scripting",
      "Plan mitigation controls to secure system services"
    ]
  },
  {
    id: "lab05",
    title: "Lab 05: Isolated Web Application Analysis",
    category: "Web Security",
    difficulty: "Advanced",
    description: "Examine common web injection scenarios and configure parameterized database filters.",
    commands: ["docker compose up -d", "curl -s http://localhost:8080 | grep 'Lesson 1'"],
    outcomes: [
      "State the risk of raw SQL concatenation",
      "Analyze client input inside parameterized prepare statements",
      "Configure local container sandboxes on isolated bridges"
    ]
  },
  {
    id: "lab06",
    title: "Lab 06: Linux Privilege Escalation Mechanics",
    category: "PrivEsc",
    difficulty: "Advanced",
    description: "Audit SUID misconfigurations and cron scheduler files to identify horizontal or vertical path vectors.",
    commands: ["find / -perm -4000 -type f 2>/dev/null", "cat /etc/crontab"],
    outcomes: [
      "Identify non-standard system binaries with administrative privilege states",
      "Trace scheduled automated tasks inside write-access directories",
      "Secure background cron configurations with absolute file bounds"
    ]
  },
  {
    id: "lab07",
    title: "Lab 07: Windows Privilege Escalation Principles",
    category: "PrivEsc",
    difficulty: "Advanced",
    description: "Review Active Directory structure concepts, Registry token flags, and AlwaysInstallElevated registries.",
    commands: ["reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer", "whoami /priv"],
    outcomes: [
      "Explain the risk of AlwaysInstallElevated MSI installations",
      "Detect unquoted system service paths containing white-space gaps",
      "Enforce path quote wrappers to eliminate service hijacking vectors"
    ]
  },
  {
    id: "lab08",
    title: "Lab 08: Docker Isolation & Security Auditing",
    category: "Docker Security",
    difficulty: "Advanced",
    description: "Examine Docker daemon properties, evaluate internal networks, and write rootless user Dockerfiles.",
    commands: ["docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'", "docker exec hacking_lab_target whoami"],
    outcomes: [
      "Secure the host computer from standard container escape vulnerabilities",
      "Enforce low-privilege User flags inside production Docker builds",
      "Establish internal-only isolated bridge subnet adapters"
    ]
  },
  {
    id: "lab09",
    title: "Lab 09: Professional Security Report Writing",
    category: "Reporting",
    difficulty: "Intermediate",
    description: "Convert diagnostic outputs into actionable executive sheets, findings tables, and CVSS calculations.",
    commands: ["cat templates/report_template.md"],
    outcomes: [
      "Structure executive summaries suitable for project stakeholders",
      "Calculate Common Vulnerability Scoring System (CVSS) priority levels",
      "Recommend targeted remediations with verified step-by-step guidelines"
    ]
  },
  {
    id: "lab10",
    title: "Lab 10: Standardized CTF Flow & Playbook",
    category: "CTF Workflow",
    difficulty: "Intermediate",
    description: "Master structured flag extraction methodologies without relying on destructive execution.",
    commands: ["cat docs/ctf_methodology.md"],
    outcomes: [
      "Develop methodical approach loops to analyze service targets",
      "Document lessons learned during local container validation",
      "Avoid un-isolated and hazardous automation routines"
    ]
  }
];

// Interactive Workspace File Tree
const FILE_TREE = [
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
  const [activeTab, setActiveTab] = useState<'overview' | 'labs' | 'terminal' | 'reports' | 'config'>('overview');
  const [selectedLab, setSelectedLab] = useState<typeof COMPLETE_LABS[0]>(COMPLETE_LABS[0]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Ethical Hacking Labs Workspace Workstation [v1.0.0] Ready.",
    "Target environment bounds locked: Localhost only (127.0.0.1).",
    "Type any command from the manual or choose predefined diagnostics below..."
  ]);
  const [customCommand, setCustomCommand] = useState('');
  const [auditPassed, setAuditPassed] = useState<boolean | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [reportState, setReportState] = useState({
    title: "Local Workspace Configuration Verification",
    author: "Security Training Practitioner",
    vulnerabilities: [
      { id: "VULN-01", name: "Insecure Folder Write Permissions", severity: "Low", cvss: "3.1", status: "Remediated" },
      { id: "VULN-02", name: "Verbose Server Response Headers", severity: "Informational", cvss: "0.0", status: "Monitored" }
    ]
  });

  const executeSimulatedCommand = (cmd: string) => {
    let output = `\n$ ${cmd}\n`;
    const cleanCmd = cmd.trim();

    if (cleanCmd.startsWith("ls")) {
      output += "drwxr-xr-x  3 practitioner lab-group 4.0K Jul  3 11:00 docs\n";
      output += "drwxr-xr-x  2 practitioner lab-group 4.0K Jul  3 11:00 labs\n";
      output += "drwxr-xr-x  2 practitioner lab-group 4.0K Jul  3 11:00 scripts\n";
      output += "drwxr-xr-x  2 practitioner lab-group 4.0K Jul  3 11:00 tools\n";
      output += "-rwxr-xr-x  1 practitioner lab-group 1.2K Jul  3 11:01 setup.sh\n";
      output += "-rw-r--r--  1 practitioner lab-group  345 Jul  3 11:00 README.md";
    } else if (cleanCmd.includes("chmod")) {
      output += "[SUCCESS] File properties updated. Execution privileges allocated successfully.";
    } else if (cleanCmd.includes("ss") || cleanCmd.includes("port_scanner")) {
      output += "[INFO] Port scan diagnostic initiated on target address: 127.0.0.1\n";
      output += "[OPEN] Port 8080 (hacking_lab_target) is reachable. State: LISTEN\n";
      output += "[CLOSED] Port 80 (Standard Web Proxy) is not reachable.\n";
      output += "[INFO] Query complete. Socket-level checks finished successfully.";
    } else if (cleanCmd.includes("ip a")) {
      output += "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN\n";
      output += "    inet 127.0.0.1/8 scope host lo\n";
      output += "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP\n";
      output += "    inet 172.19.0.5/16 scope global bridge-subnet";
    } else if (cleanCmd.includes("permission_audit.sh")) {
      output += "[AUDIT] Commencing SUID permission checks...\n";
      output += "[WARNING] World-writable folder located at ./notes\n";
      output += "[INFO] Remediation proposal: run 'chmod 755 ./notes'\n";
      output += "[SUCCESS] Privilege scanner execution sequence completed.";
    } else if (cleanCmd.includes("file_integrity.py")) {
      output += "[INFO] Running python integrity scanner baseline...\n";
      output += "[SUCCESS] Computed baseline SHA256 hashes for 24 workspace files.\n";
      output += "[SUCCESS] Baseline log generated successfully: baseline.json";
    } else if (cleanCmd.includes("log_analyzer.py")) {
      output += "[INFO] Parsing local simulated access metrics file...\n";
      output += "==================================================\n";
      output += "           EDUCATIONAL LOG AUDIT METRICS\n";
      output += "==================================================\n";
      output += "[HTTP Status Distribution]\n";
      output += "  HTTP 200: 3 requests\n";
      output += "  HTTP 401: 2 requests (Potential Authentication Auditing Event)\n";
      output += "  HTTP 403: 1 requests\n";
      output += "[Requests Per Remote IP Address]\n";
      output += "  127.0.0.1: 2 requests\n";
      output += "  192.168.1.5: 3 requests\n";
      output += "==================================================";
    } else if (cleanCmd.includes("docker")) {
      output += "[INFO] Initializing Docker Compose Orchestrator...\n";
      output += "[SUCCESS] Container 'hacking_lab_target' built and launched on bridge interface.";
    } else {
      output += `Command '${cleanCmd}' executed successfully in safe learning sandbox workspace.`;
    }

    setTerminalLogs(prev => [...prev, output]);
    setCustomCommand('');
  };

  const handleRunSetup = () => {
    setTerminalLogs(prev => [
      ...prev, 
      "\n$ ./scripts/setup.sh", 
      "[INFO] Scanning diagnostic pre-requisites...", 
      "[SUCCESS] Found local dependencies: python3, pip3, docker, bash", 
      "[SUCCESS] Environment validated. Sandbox directory hierarchy is fully secure."
    ]);
    setAuditPassed(true);
  };

  const handleResetLab = () => {
    setIsResetting(true);
    setTerminalLogs(prev => [
      ...prev, 
      "\n$ ./scripts/reset_lab.sh", 
      "[INFO] Stopping existing local container sandboxes...", 
      "[INFO] Flushing local temporary storage volumes...", 
      "[SUCCESS] Isolated web targets cleanly refreshed to default settings."
    ]);
    setTimeout(() => {
      setIsResetting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-sky-500/35 selection:text-white">
      
      {/* Top Professional Control Bar */}
      <header className="border-b border-slate-900 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 self-start">
          <div className="p-2 bg-gradient-to-tr from-sky-600 to-indigo-700 rounded-lg shadow-inner">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-sans">
                Ethical Hacking Labs
              </h1>
              <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                LOCKED SANDBOX
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">MIT educational lab framework & workspace dashboard</p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleRunSetup}
            className="bg-sky-600 hover:bg-sky-500 text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 shadow"
          >
            <CheckCircle className="w-3.5 h-3.5" /> Prerequisite Check
          </button>
          <button 
            onClick={handleResetLab}
            disabled={isResetting}
            className="bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} /> Refresh Container Targets
          </button>
        </div>
      </header>

      {/* Primary Workspace Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Tab Selector (Compact & Aesthetic) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900/50 rounded-xl border border-slate-900 p-3 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Workspace Controls</div>
            
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'overview' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><FolderTree className="w-4 h-4" /> Repository Explorer</span>
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
              <span className="flex items-center gap-2"><TerminalIcon className="w-4 h-4" /> Lab Terminal Console</span>
              <span className="text-[10px] text-emerald-400 font-mono animate-pulse">●</span>
            </button>

            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'reports' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Assessment Reports</span>
            </button>

            <button 
              onClick={() => setActiveTab('config')}
              className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg transition-all flex items-center justify-between ${activeTab === 'config' ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> Global Settings</span>
            </button>
          </div>

          {/* Quick Metrics Cards */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900 space-y-3.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Workstation Diagnostics</div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-slate-500" /> CPU Core Status</span>
              <span className="text-slate-200 font-semibold font-mono">0.02% load</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-slate-500" /> Sandbox Subnet</span>
              <span className="text-sky-400 font-semibold font-mono">172.19.0.0/16</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-500" /> Gateway Bounds</span>
              <span className="text-emerald-400 font-mono font-semibold">127.0.0.1</span>
            </div>
          </div>
        </div>

        {/* Right Dynamic Content Area (Spans remaining columns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB: REPOSITORY EXPLORER / OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Modern Enterprise Header banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Shield className="w-48 h-48 text-sky-400" />
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2">Comprehensive Educational Security Labs</h2>
                <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
                  This repository serves as a highly modular laboratory blueprint for studying network diagnostics, permissions auditing, parameterized web filters, and privilege escalation pathways safely on localhost container networks.
                </p>
                
                {/* Visual verification checklist */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-900 pt-4">
                  <div>
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-2">Included Automation Features</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Automated environment checking (`scripts/setup.sh`)</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Colorized TCP socket scanners</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Python SHA256 integrity baseline scripts</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Safety Containment Rules</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-sky-500" /> Binds exclusively to localhost interface adapters</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-sky-500" /> Zero un-isolated code blocks or malware paths</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-sky-500" /> Purely diagnostic validation algorithms</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Graphical File Tree Viewer */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <div>
                    <h3 className="font-bold text-sm text-white">Interactive Repository File Tree</h3>
                    <p className="text-[11px] text-slate-400">Review modular folder structure of your open-source project</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">24 files mapped</span>
                </div>

                <div className="space-y-1.5 max-h-[350px] overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-900">
                  {FILE_TREE.map((node, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 transition-colors ${node.indent ? 'pl-6' : 'font-bold text-sky-400 border-b border-slate-900/20 mt-1 pb-1'}`}
                    >
                      <span className="flex items-center gap-1.5">
                        {node.indent && <CornerDownRight className="w-3 h-3 text-slate-600 shrink-0" />}
                        {node.type === 'dir' ? '📁' : '📄'}
                        <span className={node.indent ? 'text-slate-300 font-medium' : 'text-sky-400 font-bold'}>{node.path}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans italic">{node.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: 10 LAB SYLLABUS MANUALS */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <h3 className="font-bold text-white text-base mb-2">10-Module Practice Syllabus</h3>
                <p className="text-xs text-slate-400 mb-6">Select any module below to inspect lesson guides, expected command diagnostics, and educational outputs.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {COMPLETE_LABS.map(lab => (
                    <div 
                      key={lab.id}
                      onClick={() => setSelectedLab(lab)}
                      className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${selectedLab.id === lab.id ? 'border-sky-500 bg-sky-500/5 shadow-md' : 'border-slate-850 hover:border-slate-700 bg-slate-950/40'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-sky-400 font-semibold border border-slate-800">{lab.category}</span>
                        <span className="text-[10px] text-slate-500">{lab.difficulty}</span>
                      </div>
                      <h4 className="font-semibold text-white text-xs mb-1">{lab.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{lab.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Detail Panel */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500">Active Syllabus Manual Viewer</span>
                    <h3 className="font-bold text-white text-base">{selectedLab.title}</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('terminal');
                      setTerminalLogs(prev => [...prev, `\n# Ready to practice: ${selectedLab.title}`, `# Suggested diagnostic: ${selectedLab.commands[0]}`]);
                    }}
                    className="text-xs bg-sky-600/15 hover:bg-sky-600/35 text-sky-400 px-3 py-1.5 rounded border border-sky-500/20 font-bold transition-all"
                  >
                    Load in Console Terminal
                  </button>
                </div>

                {/* Lesson Objectives */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Objectives & Knowledge Outcomes</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedLab.outcomes.map((outcome, idx) => (
                      <li key={idx} className="bg-slate-950 p-3 rounded border border-slate-900 text-xs text-slate-300 leading-relaxed flex flex-col justify-between">
                        <span>{outcome}</span>
                        <span className="text-[9px] font-mono text-slate-500 mt-2">Verified Objective #{idx + 1}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Sandbox Quick Runs */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Predefined Command Exercises</h4>
                  <div className="space-y-2">
                    {selectedLab.commands.map((cmd, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-md border border-slate-900 font-mono text-xs">
                        <span className="text-emerald-400">{cmd}</span>
                        <button 
                          onClick={() => executeSimulatedCommand(cmd)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-sans font-semibold transition-colors"
                        >
                          Simulate Run
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: INTERACTIVE LAB CONSOLE */}
          {activeTab === 'terminal' && (
            <div className="space-y-6">
              
              {/* Fully functional simulated command line environment */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-[520px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900 bg-slate-950/80 rounded-t-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-2">practitioner@hacking-lab-sandbox:~</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono border border-slate-700 font-semibold">
                    SIMULATION NODE
                  </span>
                </div>

                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-slate-950 text-slate-300">
                  {terminalLogs.map((log, index) => (
                    <pre key={index} className="whitespace-pre-wrap leading-relaxed">{log}</pre>
                  ))}
                </div>

                {/* Pre-defined Diagnostic Macros panel for easy testing */}
                <div className="p-2 border-t border-slate-900 bg-slate-900 bg-opacity-40 flex flex-wrap gap-2">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase px-2 py-1 select-none">Quick Diagnostics:</span>
                  <button 
                    onClick={() => executeSimulatedCommand("./scripts/port_scanner.sh -t 127.0.0.1 -p 8080")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1 rounded border border-slate-750 transition-all font-mono"
                  >
                    Run Port Scan
                  </button>
                  <button 
                    onClick={() => executeSimulatedCommand("./scripts/permission_audit.sh")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1 rounded border border-slate-750 transition-all font-mono"
                  >
                    Audit Permissions
                  </button>
                  <button 
                    onClick={() => executeSimulatedCommand("python3 tools/file_integrity.py --generate")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1 rounded border border-slate-750 transition-all font-mono"
                  >
                    Python Integrity Check
                  </button>
                  <button 
                    onClick={() => executeSimulatedCommand("python3 tools/log_analyzer.py -f notes/simulated_access.log")}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1 rounded border border-slate-750 transition-all font-mono"
                  >
                    Python Log Metrics
                  </button>
                </div>

                <div className="p-3 border-t border-slate-900 bg-slate-950 flex items-center space-x-3 rounded-b-xl">
                  <span className="text-sky-400 font-mono text-sm">$</span>
                  <input 
                    type="text" 
                    value={customCommand}
                    onChange={(e) => setCustomCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        executeSimulatedCommand(customCommand);
                      }
                    }}
                    placeholder="Type commands (e.g., 'ls -lah', 'ip a', 'ss -tulpn', 'docker compose')"
                    className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:ring-0 placeholder-slate-600 outline-none"
                  />
                  <button 
                    onClick={() => executeSimulatedCommand(customCommand)}
                    className="bg-sky-600 hover:bg-sky-500 text-white px-3.5 py-1 rounded text-xs font-semibold font-mono transition-colors"
                  >
                    Enter
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB: REPORTS AND ASSESSMENT WRITING */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              
              {/* Form to configure simulated report output dynamically */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-4">
                <div className="border-b border-slate-900 pb-3">
                  <h3 className="font-bold text-white text-base">Security Findings Report Generator</h3>
                  <p className="text-xs text-slate-400">Generate a sanitized educational markdown or text summary of your workstation status</p>
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
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Assessor Practitioner Name</label>
                    <input 
                      type="text"
                      value={reportState.author}
                      onChange={(e) => setReportState(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Markdown Output Preview Container */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Preview: template_report.md</span>
                  <span className="text-[11px] text-slate-500 font-mono">Format: Standard Markdown</span>
                </div>

                <div className="bg-slate-950 p-6 rounded-lg border border-slate-900 font-mono text-xs text-slate-300 space-y-4 overflow-x-auto leading-relaxed">
                  <div># Cybersecurity Assessment Report</div>
                  <div className="text-slate-400">
                    <div>**Target Environment**: Isolated Container Bridge Target (`hacking_lab_target`)</div>
                    <div>**Practitioner Assessor**: {reportState.author}</div>
                    <div>**Title**: {reportState.title}</div>
                  </div>

                  <hr className="border-slate-900 my-4" />

                  <div>## 1. Executive Summary</div>
                  <div className="text-slate-400 leading-relaxed">
                    This document serves as the educational audit file generated automatically after completing the workspace diagnostics checks inside the isolated hacking lab workstation. All identified parameters have been resolved or mapped defensively.
                  </div>

                  <div>## 2. Findings Log Table</div>
                  <div className="text-slate-400">
                    <table className="w-full text-left text-xs text-slate-300 border-collapse my-2">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-1">Vulnerability ID</th>
                          <th className="py-1">Description / Finding</th>
                          <th className="py-1">CVSS</th>
                          <th className="py-1">Remediation Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportState.vulnerabilities.map((v, idx) => (
                          <tr key={idx} className="border-b border-slate-900/60">
                            <td className="py-1 text-sky-400">{v.id}</td>
                            <td className="py-1 text-slate-300">{v.name}</td>
                            <td className="py-1 font-semibold text-amber-400">{v.cvss}</td>
                            <td className="py-1 text-emerald-400">{v.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>## 3. Technical Verification Diagnostics</div>
                  <div className="text-slate-500">
                    $ ./scripts/permission_audit.sh<br />
                    [AUDIT] Complete. Resolved VULN-01 with chmod 755.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: CONFIG / PROFILES */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-900 space-y-4">
                <div className="border-b border-slate-900 pb-3">
                  <h3 className="font-bold text-white text-base">Global Configuration Profiles</h3>
                  <p className="text-xs text-slate-400">Inspect the static parameter assets defined inside `config/config.yaml` and `config/settings.ini`</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* config.yaml */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400">config/config.yaml</div>
                    <pre className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] text-slate-300 leading-relaxed">
{`lab_defaults:
  target_host: "127.0.0.1"
  default_ports: [80, 443, 8080]
  log_level: "INFO"
  enable_color: true
  isolation_mode: "internal"`}
                    </pre>
                  </div>

                  {/* settings.ini */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400">config/settings.ini</div>
                    <pre className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] text-slate-300 leading-relaxed">
{`[lab]
target_host = 127.0.0.1
default_ports = 80,443,8080
log_level = INFO
enable_color = true
isolation_mode = internal`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-slate-900 bg-slate-900/40 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Educational Ethical Hacking Labs Workstation. Built for safe, isolated diagnostics study.</p>
          <div className="flex space-x-4 mt-2 md:mt-0 font-mono">
            <span>v1.0.0 (Stable)</span>
            <span>Local Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
