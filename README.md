# 🧠 2u.tv Agentic OS // Command Center

A high-fidelity, production-ready, cloud-hosted **Agentic OS** mission control dashboard and backend API. This unified system orchestrates multiple AI agents around a shared, Git-synced Obsidian vault memory system to manage video localization, transcription, dubbing, and technical deployments for `2u.tv`.

---

## 🏗️ 4-Layer Systems Architecture

```
                       ┌────────────────────────┐
                       │   Founder / iPad / PC  │
                       └───────────┬────────────┘
                                   │ HTTPS / WSS
                       ┌───────────▼────────────┐
                       │ Next.js Dashboard (3000)│
                       └─────┬────────────┬─────┘
                             │            │
             ┌───────────────┘            └───────────────┐
             │ Reads/Writes                               │ Dispatches Planning Goals
   ┌─────────▼─────────────┐                              ▼
   │  Obsidian Vault local │                    ┌──────────────────┐
   │  (/var/agentos/vault)  │                    │ Claude CEO (API) │
   └─────────┬─────────────┘                    └─────────┬────────┘
             │                                            │ Returns Plan Details
             │ git push/pull                              ▼
   ┌─────────▼─────────────┐                    ┌──────────────────┐
   │  Remote Git Server    │                    │  OpenClaw Router │
   └───────────────────────┘                    └─────────┬────────┘
                                                          │ Routes Subtasks
                                             ┌────────────┴────────────┐
                                             ▼                         ▼
                                    ┌─────────────────┐       ┌─────────────────┐
                                    │ Hermes-1 (VPS)  │       │ Hermes-2 (VPS)  │
                                    │ Research/Voice  │       │ DevOps/Technical│
                                    └─────────────────┘       └─────────────────┘
```

---

## 📂 Vault Memory Folder Structure
The Next.js backend reads and parses Markdown frontmatter properties directly from your git-synced Obsidian vault path (configured via `OBSIDIAN_VAULT_PATH`):

*   `01-Goals/` — Strategic target files with markdown checkboxes.
*   `02-Projects/` — Kanban boards (`kanban.md`) tracking localization campaigns.
*   `03-Knowledge/` — SOPs, brand voices, and translation guidelines.
*   `04-Logs/` — Daily notes and consolidated agent activity telemetry.
*   `05-Agents/Hermes-1/` — Content generator outputs.
*   `05-Agents/Hermes-2/` — Tech-node code scripts and container definitions.
*   `dashboard.md` — Root status overview file.

---

## 💻 Local Quick-Start Guide

### 1. Prerequisite Installations
Ensure you have **Node.js 18+** installed on your developer machine.

### 2. File Preparation
Verify that your directory has the pre-configured local `.env` and mock `vault/` folders we set up:
```bash
# Vault mocks created in: ./vault/
# Local credentials loaded in: .env
```

### 3. Install packages
Run the dependencies setup in your terminal:
```powershell
npm install
```

### 4. Boot Dev Server
Start the Next.js local server:
```powershell
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🚀 VPS Production Deployment (Hostinger)

Follow these instructions to deploy your Agentic OS subdomain onto your Hostinger Ubuntu VPS:

### 1. Install Node.js, PM2, and Nginx
Connect to your VPS via SSH and install the host utilities:
```bash
# Update repositories
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. Git Setup your Repository
Create the application host folder and clone your repository:
```bash
# Create directory
sudo mkdir -p /var/agentos
sudo chown -R $USER:$USER /var/agentos
cd /var/agentos

# Clone your refined repository
git clone https://github.com/UzRx7/agent-dashboard.git
cd agent-dashboard
```

### 3. Production Environment Credentials Setup
Create a `.env` file matching your VPS parameters (see `.env.example` as guide):
```bash
nano .env
```
Ensure you set your **actual Anthropic API key**, Hostinger URLs for OpenClaw, Hermes-1, and Hermes-2, and define `OBSIDIAN_VAULT_PATH=/var/agentos/vault`.

### 4. Deploy and Compile
Run the automated deployment script to pull commits, compile the Next.js production build, and boot the PM2 cluster:
```bash
chmod +x deploy.sh
./deploy.sh
```

### 5. Nginx Server Subdomain Proxy setup
Create the Nginx Host configuration:
```bash
sudo nano /etc/nginx/sites-available/os.2u.tv
```
Copy and paste the configuration from `nginx.conf` in your project folder. Save the file and enable the site:
```bash
# Symlink site
sudo ln -s /etc/nginx/sites-available/os.2u.tv /etc/nginx/sites-enabled/

# Verify configuration
sudo nginx -t

# Reload Nginx server
sudo systemctl reload nginx
```

### 6. SSL Configuration via Let's Encrypt
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d os.2u.tv -d agent.2u.tv
```
Follow prompts to activate secure TLS HTTP/2 connections!

---

## 🛠️ Diagnostics & PM2 Commands
To monitor your running Agentic OS cluster:
*   View live Node output: `pm2 logs agentic-os`
*   Check CPU/RAM loads: `pm2 monit`
*   Force clean rebuilds: `pm2 restart agentic-os`
