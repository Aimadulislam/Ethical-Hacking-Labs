# Getting Started: Installation 💻

Follow these instructions to safely set up and deploy the laboratory environment on your workstation.

---

## 📋 System Requirements

We recommend using a native Linux system or an isolated virtual machine for your exercises.

* **Operating System**: Kali Linux, Ubuntu 22.04 LTS+, or Debian 11+
* **System Shell**: GNU Bash v4.4+
* **Virtualization**: Docker Engine v20.10+ and Docker Compose v2.0+
* **Environment**: Python v3.10+ with standard pip packages

---

## 🔧 Step-by-Step System Setup

### 1. Update Host Package Manager
Update your local registry to fetch the latest security libraries:
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Primary Toolchains
Ensure Python and standard development tools are available:
```bash
sudo apt install -y python3 python3-pip python3-venv git curl
```

### 3. Deploy Docker and Docker Compose
If Docker is not currently running on your system, install it using standard repository packages:
```bash
# Install Docker Engine
sudo apt install -y docker.io docker-compose-v2

# Start Docker Daemon and enable it on startup
sudo systemctl enable --now docker

# Add your user to the docker group to run without sudo
sudo usermod -aG docker $USER
```
*(Note: Log out and log back in to apply group privileges).*

### 4. Clone and Verify the Lab Environment
Clone the repository and execute our secure diagnostic validator script:
```bash
git clone https://github.com/aimadulislam/Secure-Sandbox-Ethical-Hacking-Labs.git
cd Secure-Sandbox-Ethical-Hacking-Labs

# Grant executable permission and run setup
chmod +x scripts/setup.sh
./scripts/setup.sh
```

If the validator returns `SUCCESS`, your workstation possesses all required libraries and is ready for training.
