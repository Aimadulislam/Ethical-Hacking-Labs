import React, { useState } from 'react';
import { 
  Terminal, 
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
  Network 
} from 'lucide-react';

// Pre-defined static lab modules list
const LAB_MODULES = [
  {
    id: "lab01",
    title: "Lab 01: Linux System Administration & Basics",
    category: "Linux",
    difficulty: "Beginner",
    description: "Learn how to navigate standard terminal paths, modify directory permissions, and inspect live listening system sockets.",
    commands: ["ls -lah", "chmod 755 test.sh", "ss -tulpn"],
    objectives: [
      "Navigate root folders efficiently",
      "Audit active socket connections and process bindings",
      "Configure owner privileges with chmod and chown"
    ]
  },
  {
    id: "lab02",
    title: "Lab 02: Network Diagnostics & Sockets",
    category: "Networking",
    difficulty: "Intermediate",
    description: "Inspect network adapters, parse active protocol address bindings, and execute socket checks.",
    commands: ["ip a", "ping -c 3 127.0.0.1", "dig localhost"],
    objectives: [
      "Recognize local interface network configurations",
      "Perform safe ICMP connectivity diagnostics",
      "Audit DNS name resolution structures"
    ]
  },
  {
    id: "lab03",
    title: "Lab 05: Isolated Web Application Analysis",
    category: "Web Security",
    difficulty: "Advanced",
    description: "Understand standard OWASP Top 10 vulnerabilities like SQL injection inside an isolated container test target.",
    commands: ["docker compose up -d", "curl -I http://localhost:8080"],
    objectives: [
      "Launch isolated web targets in safe bridge networks",
      "Understand concatenated queries vs parameterized queries",
      "Verify response headers on localhost systems"
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'labs' | 'terminal' | 'reports'>('overview');
  const [selectedLab, setSelectedLab] = useState<typeof LAB_MODULES[0] | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Educational Lab Terminal Ready.",
    "Type any command from the lab manuals below or press 'Simulate Setup'..."
  ]);
  const [customCommand, setCustomCommand] = useState('');
  const [auditPassed, setAuditPassed] = useState<boolean | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const executeSimulatedCommand = (cmd: string) => {
    let output = `\n$ ${cmd}\n`;
    const cleanCmd = cmd.trim();

    if (cleanCmd.startsWith("ls")) {
      output += "drwxr-xr-x  3 student lab-group 4.0K Jul  3 11:00 docs\n";
      output += "drwxr-xr-x  2 student lab-group 4.0K Jul  3 11:00 labs\n";
      output += "-rwxr-xr-x  1 student lab-group 1.2K Jul  3 11:01 setup.sh\n";
      output += "-rw-r--r--  1 student lab-group  345 Jul  3 11:00 README.md";
    } else if (cleanCmd.includes("chmod")) {
      output += "[SUCCESS] Permissions successfully updated. File mode set to 755.";
    } else if (cleanCmd.includes("ss")) {
      output += "Netid  State      Recv-Q Send-Q  Local Address:Port\n";
      output += "tcp    LISTEN     0      128     127.0.0.1:8080\n";
      output += "tcp    LISTEN     0      5       127.0.0.1:3000";
    } else if (cleanCmd.includes("ip a")) {
      output += "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n";
      output += "    inet 127.0.0.1/8 scope host lo\n";
      output += "2: eth0@if15: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n";
      output += "    inet 192.168.1.5/24 brd 192.168.1.255 scope global eth0";
    } else if (cleanCmd.includes("docker")) {
      output += "[INFO] Re-deploying containerized educational targets...\n";
      output += "[SUCCESS] Container 'hacking_lab_target' running on custom bridge subnet.";
    } else {
      output += `Command '${cleanCmd}' accepted into simulated console. Verification complete.`;
    }

    setTerminalLogs(prev => [...prev, output]);
    setCustomCommand('');
  };

  const handleRunSetup = () => {
    setTerminalLogs(prev => [...prev, "\n$ ./scripts/setup.sh", "[INFO] Scanning workstation environments...", "[SUCCESS] Found: docker, python3, pip3", "[SUCCESS] Workspace structured correctly!"]);
    setAuditPassed(true);
  };

  const handleResetLab = () => {
    setIsResetting(true);
    setTerminalLogs(prev => [...prev, "\n$ ./scripts/reset_lab.sh", "[INFO] Re-initializing isolated bridge target containers...", "[SUCCESS] Sandbox targets successfully refreshed to clean status."]);
    setTimeout(() => {
      setIsResetting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Upper Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-sky-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Ethical Hacking Labs
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                Educational Sandbox
              </span>
            </h1>
            <p className="text-xs text-slate-400">Isolated Local Security Training Environment</p>
          </div>
        </div>
        
        <nav className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'overview' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('labs')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'labs' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Lab Manuals</span>
          </button>
          <button 
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'terminal' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Interactive Console</span>
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'reports' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Reports</span>
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left / Center Major Console & Content Pane */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Shield className="w-32 h-32 text-sky-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Hacking Lab Workstation</h2>
                <p className="text-slate-300 leading-relaxed max-w-2xl text-sm">
                  This graphical control center coordinates the 10 core cybersecurity manuals, local Docker-Compose environments, defensive auditing scripts, and report templates stored in your repository. Use this interface to learn privilege escalation mechanisms, test secure coding practices, and document diagnostic outcomes safely.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <button 
                    onClick={handleRunSetup}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Initialize & Check Environment
                  </button>
                  <button 
                    onClick={handleResetLab}
                    disabled={isResetting}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-55"
                  >
                    <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} /> Reset Lab Container Targets
                  </button>
                </div>
              </div>

              {/* Status Indicators bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-center space-x-3">
                  <div className={`p-2 rounded ${auditPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Environment Audit</div>
                    <div className="text-sm font-semibold text-white">{auditPassed ? "PASS" : "Not Audited"}</div>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-center space-x-3">
                  <div className="p-2 rounded bg-sky-500/20 text-sky-400">
                    <Network className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Lab Sandbox Gateway</div>
                    <div className="text-sm font-semibold text-white">127.0.0.1:8080</div>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-center space-x-3">
                  <div className="p-2 rounded bg-indigo-500/20 text-indigo-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Docker Network Isolation</div>
                    <div className="text-sm font-semibold text-white">Active (Internal)</div>
                  </div>
                </div>
              </div>

              {/* Structure and Modules Card */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Core Repository Directory Structure</h3>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <div className="text-sky-400">Ethical-Hacking-Labs/</div>
                  <div>├── README.md               <span className="text-slate-500"># Detailed workspace learning guide</span></div>
                  <div>├── LICENSE                 <span className="text-slate-500"># MIT educational license</span></div>
                  <div>├── docs/                   <span className="text-slate-500"># Theoretical foundations cheat sheets</span></div>
                  <div>├── labs/                   <span className="text-slate-500"># 10 comprehensive educational manuals</span></div>
                  <div>├── scripts/                <span className="text-slate-500"># Executable Bash automation scripts</span></div>
                  <div>├── docker/                 <span className="text-slate-500"># Isolated container target manifests</span></div>
                  <div>└── templates/              <span className="text-slate-500"># Professional security report formats</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LABS */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-2">Select a Laboratory Manual</h2>
                <p className="text-sm text-slate-400 mb-6">Explore detailed steps, expected diagnostics, and security configurations.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LAB_MODULES.map(lab => (
                    <div 
                      key={lab.id} 
                      onClick={() => setSelectedLab(lab)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedLab?.id === lab.id ? 'border-sky-500 bg-sky-500/5 shadow-md shadow-sky-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-sky-400">{lab.category}</span>
                        <span className="text-xs text-slate-400">{lab.difficulty}</span>
                      </div>
                      <h3 className="font-semibold text-white mb-2 text-sm">{lab.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2">{lab.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedLab && (
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white">{selectedLab.title}</h3>
                    <button 
                      onClick={() => {
                        setActiveTab('terminal');
                        setTerminalLogs(prev => [...prev, `\n# Initiating command line practice for ${selectedLab.title}`]);
                      }}
                      className="text-xs bg-sky-500/15 hover:bg-sky-500/35 text-sky-400 px-3 py-1.5 rounded border border-sky-500/30 font-semibold transition-colors"
                    >
                      Open in Console
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Objectives & Outcomes</h4>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300">
                      {selectedLab.objectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Lab Manual Suggested Diagnostics</h4>
                    <div className="space-y-2">
                      {selectedLab.commands.map((cmd, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-md border border-slate-850 font-mono text-xs">
                          <span className="text-emerald-400">{cmd}</span>
                          <button 
                            onClick={() => executeSimulatedCommand(cmd)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs font-sans font-medium transition-colors"
                          >
                            Execute
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-[520px]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80 rounded-t-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">student@hacking-lab-workstation:~</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono border border-slate-700">
                  Simulated
                </span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-slate-950 text-slate-300">
                {terminalLogs.map((log, index) => (
                  <pre key={index} className="whitespace-pre-wrap leading-relaxed">{log}</pre>
                ))}
              </div>

              <div className="p-3 border-t border-slate-800 bg-slate-900 bg-opacity-95 flex items-center space-x-3 rounded-b-xl">
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
                  placeholder="Type lab commands (e.g., 'ls', 'ss -tulpn', 'docker compose')"
                  className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:ring-0 placeholder-slate-600 outline-none"
                />
                <button 
                  onClick={() => executeSimulatedCommand(customCommand)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded text-xs font-semibold font-mono border border-slate-700 transition-colors"
                >
                  Enter
                </button>
              </div>
            </div>
          )}

          {/* TAB: REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-2">Simulated Diagnostic Findings Report</h2>
                <p className="text-sm text-slate-400 mb-6">Standard markdown reporting template output derived from `/templates/report_template.md`</p>

                <div className="border border-slate-800 rounded-lg overflow-hidden">
                  <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 font-semibold text-sm text-white">
                    Simulated Active Assessment Report
                  </div>
                  <div className="p-6 bg-slate-900 space-y-4 text-slate-300 text-sm leading-relaxed">
                    <h3 className="text-base font-bold text-white">Executive Summary</h3>
                    <p>This report documents the security hygiene verification conducted across the simulated workspace containers.</p>

                    <h4 className="font-bold text-white mt-4 mb-2">Identified Vulnerability Table</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                            <th className="py-2">Vulnerability ID</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">CVSS Score</th>
                            <th className="py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-800">
                            <td className="py-2 font-mono text-sky-400">VULN-01</td>
                            <td className="py-2">World-Writable Directory Flag</td>
                            <td className="py-2">3.1 (Low)</td>
                            <td className="py-2 text-emerald-400">Remediated</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono text-sky-400">VULN-02</td>
                            <td className="py-2">Verbose Nginx Server Headers</td>
                            <td className="py-2">0.0 (Info)</td>
                            <td className="py-2 text-slate-400">Monitored</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs">
                      <div className="text-slate-400"># Remediation check verified:</div>
                      <div className="text-emerald-400">chmod 755 scripts/permission_audit.sh && ./scripts/permission_audit.sh</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar Security Info Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-400" /> Educational Safe Playbook
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This repository conforms strictly to defense-first security training requirements:
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Isolated local network bounds (`127.0.0.1`) only</span>
              </div>
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero real-world exploits or malware binaries included</span>
              </div>
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Focuses entirely on defensive audits and security auditing setups</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Workstation Diagnostics</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Local OS</span>
                <span className="font-mono text-white">Ubuntu / Sandbox</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Docker Subnet</span>
                <span className="font-mono text-white">172.19.0.0/16</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Environment Health</span>
                <span className="text-emerald-400 font-semibold">Excellent</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/30 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Educational Ethical Hacking Labs Workstation. Safe, isolated laboratory instruction framework.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#license" className="hover:text-slate-400 transition-colors">MIT License</a>
            <a href="#safety" className="hover:text-slate-400 transition-colors">Safety Guidelines</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
