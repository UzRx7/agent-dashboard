/* ==========================================================================
   CYBER-PREMIUM ENGINE LOGIC - AI AGENT DASHBOARD
   ========================================================================== */

// 1. Initial State Definition
const DEFAULT_AGENTS = [
    {
        id: "agent-1",
        name: "Antigravity Prime",
        role: "Code Architect",
        model: "Gemini 3.5 Pro",
        goal: "Building new microservice APIs and resolving compiler bottlenecks",
        status: "active",
        runtime: 1420,
        tokens: 342900,
        successRate: 98.4,
        avatar: "⚡",
        logs: [
            { time: "00:01:23", level: "system", tag: "KERNEL", msg: "Initializing Antigravity Prime kernel on Gemini 3.5 Pro" },
            { time: "00:01:25", level: "info", tag: "DOCKER", msg: "Establishing secure dev environment container: dev-arch-node-24" },
            { time: "00:01:26", level: "success", tag: "ENV", msg: "Dev container verified. CPU: 8 Cores Allocated, RAM: 16GB" },
            { time: "00:02:10", level: "info", tag: "GIT", msg: "Cloning repository: github.com/antigravity/core-apis.git [branch: main]" },
            { time: "00:02:12", level: "success", tag: "GIT", msg: "Successfully pulled commit 9f12a3d: 'Add hyper-scalable routing framework'" },
            { time: "00:03:00", level: "info", tag: "BUILD", msg: "Executing compile run: `npm run build`" },
            { time: "00:03:04", level: "warning", tag: "LINT", msg: "Deprecated API usage found in src/services/auth.ts (Line 144)" },
            { time: "00:03:08", level: "success", tag: "COMPILE", msg: "Build completed successfully in 8.24s. Package bundle: 4.2MB" }
        ]
    },
    {
        id: "agent-2",
        name: "Nexus Analyst",
        role: "Data Analyst",
        model: "Gemini 1.5 Flash",
        goal: "Refining predictive analytics models on multi-modal datasets",
        status: "idle",
        runtime: 840,
        tokens: 120400,
        successRate: 95.2,
        avatar: "🌌",
        logs: [
            { time: "00:00:05", level: "system", tag: "KERNEL", msg: "Booting Nexus Analyst on Gemini 1.5 Flash engine" },
            { time: "00:00:10", level: "info", tag: "DB", msg: "Connecting to transactional analytics cluster: postgres://analytics-read:***@db.cluster" },
            { time: "00:00:12", level: "success", tag: "DB", msg: "Connection pooled successfully. Latency: 4ms" },
            { time: "00:01:05", level: "info", tag: "SQL", msg: "Executing high-dimensional aggregation on user_interactions_2026 (12.4M rows)" },
            { time: "00:01:10", level: "info", tag: "MODEL", msg: "Training XGBoost regression weights for churn estimation" },
            { time: "00:02:40", level: "success", tag: "MODEL", msg: "Training converged. Validation R-squared: 0.892, MAE: 0.024" },
            { time: "00:03:15", level: "info", tag: "SYSTEM", msg: "Aggregated results exported to cloud storage. Standing by for instructions..." }
        ]
    },
    {
        id: "agent-3",
        name: "Aegis QA",
        role: "Security Engineer",
        model: "Gemini 1.5 Pro",
        goal: "Simulating intrusion payloads on core authorization protocols",
        status: "active",
        runtime: 2190,
        tokens: 684200,
        successRate: 99.1,
        avatar: "🛡️",
        logs: [
            { time: "00:00:02", level: "system", tag: "BOOT", msg: "Activating Aegis security scanning module" },
            { time: "00:00:05", level: "info", tag: "SYS", msg: "Configuring vulnerability payload generation parameters" },
            { time: "00:00:20", level: "info", tag: "ATTACK", msg: "Probing endpoints for cross-site scripting (XSS) vectors on route /login" },
            { time: "00:01:15", level: "success", tag: "AUDIT", msg: "Sanitization middleware correctly stripped standard payload tags" },
            { time: "00:01:40", level: "info", tag: "FUZZ", msg: "Injecting malformed JWT tokens into authentication authorization header" }
        ]
    },
    {
        id: "agent-4",
        name: "Sophia",
        role: "Literature Researcher",
        model: "Gemini 1.5 Pro",
        goal: "Crawling PubMed indices for metabolic pathway correlations",
        status: "error",
        runtime: 430,
        tokens: 88500,
        successRate: 84.6,
        avatar: "📚",
        logs: [
            { time: "00:00:01", level: "system", tag: "INIT", msg: "Booting literature search pipeline" },
            { time: "00:00:04", level: "info", tag: "CRAWL", msg: "Accessing PubMed OpenAccess API endpoints" },
            { time: "00:00:30", level: "info", tag: "SEARCH", msg: "Querying articles: 'metabolic pathways AND glucose-6-phosphate dehydrogenase'" },
            { time: "00:01:05", level: "success", tag: "PARSE", msg: "Successfully indexed 42 meta-analyses on G6PD biological expressions" },
            { time: "00:02:15", level: "error", tag: "HTTP", msg: "Connection timed out on secondary NCBI endpoint: HTTP 504 Gateway Timeout" },
            { time: "00:02:18", level: "error", tag: "RESOLVER", msg: "Failed to fetch document tree. Fatal crash: Retries exhausted." }
        ]
    }
];

// 2. Realistic Role-Based Mock Log Database
const LOG_GENERATORS = {
    "Code Architect": [
        { level: "info", tag: "DOCKER", msg: "Spinning up Node.js server container: dev-core-service-12" },
        { level: "info", tag: "BUILD", msg: "Compiling TS sources: standard tsc validation ongoing" },
        { level: "warning", tag: "LINT", msg: "Implicit 'any' found in legacy utility block. Recommend typing." },
        { level: "success", tag: "TEST", msg: "Executing unit tests: 42 passed, 0 failed in 1.25 seconds" },
        { level: "info", tag: "GIT", msg: "Pushing commit bundle to remote origin: main" },
        { level: "info", tag: "HOTFIX", msg: "Applying dependency patches to prevent CVE vulnerability" },
        { level: "success", tag: "API", msg: "Endpoint GET /api/v1/metrics responded successfully. Latency: 12ms" },
        { level: "info", tag: "COMPILE", msg: "Optimizing code bundles: dead code tree-shaking triggered" },
        { level: "success", tag: "BUILD", msg: "Bundle minimized successfully. Saved 1.4MB (32.4% compression)" }
    ],
    "Data Analyst": [
        { level: "info", tag: "DB", msg: "Connected to BigQuery analytics instance: analytics-prod-v2" },
        { level: "info", tag: "SQL", msg: "Scanning table: interaction_logs_q2_2026. Target volume: 22.4 GB" },
        { level: "success", tag: "PARSE", msg: "Extracted demographic trends. Outlier removal completed." },
        { level: "info", tag: "MODEL", msg: "Re-indexing user cohort embeddings using K-Means Clustering" },
        { level: "warning", tag: "STATS", msg: "Data skew detected on mobile user channel. Adjusting normalization factors" },
        { level: "success", tag: "TRAIN", msg: "Clustering complete. Silhouette score: 0.742" },
        { level: "info", tag: "EXPORT", msg: "Uploading generated tabular reports to AWS S3 bucket: analysis-reports" },
        { level: "success", tag: "CSV", msg: "CSV generation completed successfully. Extracted 8,420 key profiles" }
    ],
    "Security Engineer": [
        { level: "info", tag: "AUDIT", msg: "Scanning open network ports: active mapping active" },
        { level: "warning", tag: "PORT", msg: "Port 22 SSH found open with password authentication allowed" },
        { level: "info", tag: "ATTACK", msg: "Simulating brute force dictionary payload injection on auth port" },
        { level: "success", tag: "DEFEND", msg: "Rate-limiter successfully blocked host: 198.51.100.42 after 5 failures" },
        { level: "info", tag: "FUZZ", msg: "Sending raw buffer overflow payload to payment gateway gateway-v1" },
        { level: "success", tag: "AUDIT", msg: "Gateway validation correctly rejected payload with HTTP 400 Bad Request" },
        { level: "warning", tag: "SYSTEM", msg: "Detected outdated TLS version (1.1) in secondary load balancer" }
    ],
    "Literature Researcher": [
        { level: "info", tag: "CRAWL", msg: "Requesting article indexes from bioRxiv API server" },
        { level: "info", tag: "SEARCH", msg: "Querying: 'CRISPR-Cas9 off-target gene editing outcomes'" },
        { level: "success", tag: "PARSE", msg: "Parsed 12 relevant pre-print abstracts on target editing precision" },
        { level: "info", tag: "NLP", msg: "Synthesizing research summaries with entity extraction models" },
        { level: "warning", tag: "DUPLICATE", msg: "Found duplicate citation: doi.org/10.1101/42142. Deduplicating." },
        { level: "success", tag: "INDEX", msg: "Successfully added 8 papers to workspace research bibliography" },
        { level: "info", tag: "BIBTEX", msg: "Exporting bibliography citation index to reference.bib" }
    ],
    "Autonomous Agent Manager": [
        { level: "system", tag: "ORCH", msg: "Monitoring subagent execution states across multi-agent tree" },
        { level: "info", tag: "HEART", msg: "Polling agent Nexus Analyst... Status: IDLE" },
        { level: "info", tag: "HEART", msg: "Polling agent Sophia... Status: ACTIVE" },
        { level: "success", tag: "SYNC", msg: "System state synchronized cleanly with parent harness" },
        { level: "warning", tag: "LOAD", msg: "Subagent Sophia reporting elevated latency. Adding memory bounds." },
        { level: "success", tag: "TASK", msg: "Dispatched compile micro-goal to Antigravity Prime subagent" }
    ]
};

// 3. App Core Module Class (Encapsulates State and Dynamic Methods)
class AgentDashboard {
    constructor() {
        this.agents = this.loadAgents();
        this.selectedAgentId = null;
        this.uptimeSeconds = 0;
        
        // Element cache
        this.gridEl = document.getElementById("agent-grid");
        this.statActiveEl = document.getElementById("stat-active");
        this.statSuccessEl = document.getElementById("stat-success");
        this.statTokensEl = document.getElementById("stat-tokens");
        this.statCostEl = document.getElementById("stat-cost");
        this.uptimeEl = document.getElementById("system-uptime");
        
        this.searchEl = document.getElementById("search-agents");
        this.filterStatusEl = document.getElementById("filter-status");
        
        // Drawer elements
        this.drawerEl = document.getElementById("console-drawer");
        this.overlayEl = document.getElementById("drawer-overlay");
        this.drawerCloseBtn = document.getElementById("drawer-close");
        this.drawerAvatar = document.getElementById("drawer-agent-avatar");
        this.drawerName = document.getElementById("drawer-agent-name");
        this.drawerRole = document.getElementById("drawer-agent-role");
        this.drawerStatusText = document.getElementById("drawer-status-text");
        this.drawerStatusDot = document.getElementById("drawer-status-dot");
        this.drawerStatusContainer = document.getElementById("drawer-status-container");
        this.drawerMetaModel = document.getElementById("drawer-meta-model");
        this.drawerMetaTokens = document.getElementById("drawer-meta-tokens");
        this.drawerMetaRuntime = document.getElementById("drawer-meta-runtime");
        this.drawerMetaGoal = document.getElementById("drawer-meta-goal");
        this.terminalBody = document.getElementById("terminal-body");
        
        this.btnDrawerResume = document.getElementById("btn-drawer-resume");
        this.btnDrawerPause = document.getElementById("btn-drawer-pause");
        this.btnDrawerTask = document.getElementById("btn-drawer-task");
        this.btnDrawerDelete = document.getElementById("btn-drawer-delete");
        
        // Modal elements
        this.modalEl = document.getElementById("modal-overlay");
        this.btnOpenModal = document.getElementById("btn-add-agent");
        this.btnCloseModal = document.getElementById("modal-close");
        this.btnCancelModal = document.getElementById("btn-modal-cancel");
        this.addAgentForm = document.getElementById("add-agent-form");
        
        // Tab navigation items
        this.navItems = document.querySelectorAll(".nav-item");
        
        this.init();
    }

    // Load initial agents, merging custom ones from localStorage
    loadAgents() {
        const stored = localStorage.getItem("antigravity_agents");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored agents, reverting to default.", e);
            }
        }
        this.saveAgents(DEFAULT_AGENTS);
        return [...DEFAULT_AGENTS];
    }

    saveAgents(agentsList) {
        localStorage.setItem("antigravity_agents", JSON.stringify(agentsList));
    }

    init() {
        this.renderAgents();
        this.updateSummaryStats();
        this.setupEventListeners();
        
        // Startup Simulation loop (Ticking stats, changing states, appending logs)
        setInterval(() => this.runSimulationTick(), 1000);
        
        // System Uptime Timer (minute based)
        setInterval(() => {
            this.uptimeSeconds += 60;
            const mins = Math.floor(this.uptimeSeconds / 60);
            this.uptimeEl.textContent = `${mins}m`;
        }, 60000);
    }

    // Set up standard browser click hooks
    setupEventListeners() {
        // Search & Filtration hooks
        this.searchEl.addEventListener("input", () => this.renderAgents());
        this.filterStatusEl.addEventListener("change", () => this.renderAgents());
        
        // Drawer interaction hooks
        this.drawerCloseBtn.addEventListener("click", () => this.closeConsole());
        this.overlayEl.addEventListener("click", () => this.closeConsole());
        
        this.btnDrawerPause.addEventListener("click", () => this.setAgentStatus(this.selectedAgentId, "idle"));
        this.btnDrawerResume.addEventListener("click", () => this.setAgentStatus(this.selectedAgentId, "active"));
        this.btnDrawerDelete.addEventListener("click", () => this.deleteAgent(this.selectedAgentId));
        this.btnDrawerTask.addEventListener("click", () => this.triggerManualTask(this.selectedAgentId));
        
        // Add Agent Modal Hooks
        this.btnOpenModal.addEventListener("click", () => this.toggleModal(true));
        this.btnCloseModal.addEventListener("click", () => this.toggleModal(false));
        this.btnCancelModal.addEventListener("click", () => this.toggleModal(false));
        
        this.addAgentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.deployAgent();
        });
        
        // Tab Navigation click hooks (aesthetic selection only)
        this.navItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                this.navItems.forEach(nav => nav.classList.remove("active"));
                item.classList.add("active");
                
                // Static demo notice if switching away from Core Dashboard
                const tab = item.getAttribute("data-tab");
                if (tab !== "dashboard") {
                    this.showTransientNotification(`Navigation: Switched to ${tab.toUpperCase()} pane.`);
                }
            });
        });
    }

    // Render active agents dynamically based on query and status filter
    renderAgents() {
        const query = this.searchEl.value.toLowerCase().trim();
        const statusFilter = this.filterStatusEl.value;
        
        this.gridEl.innerHTML = "";
        
        this.agents.forEach(agent => {
            const matchesQuery = agent.name.toLowerCase().includes(query) || 
                                 agent.role.toLowerCase().includes(query) || 
                                 agent.goal.toLowerCase().includes(query);
            
            const matchesFilter = statusFilter === "all" || agent.status === statusFilter;
            
            if (matchesQuery && matchesFilter) {
                const card = document.createElement("div");
                card.className = `agent-card ${this.selectedAgentId === agent.id ? 'selected-active' : ''}`;
                card.setAttribute("data-id", agent.id);
                
                // Event listener to open console drawer on click
                card.addEventListener("click", () => this.openConsole(agent.id));
                
                // Formatted Stats
                const formattedTokens = this.formatTokenCount(agent.tokens);
                
                card.innerHTML = `
                    <div class="card-top">
                        <div class="agent-avatar">
                            <span class="agent-avatar-inner">${agent.avatar || "🤖"}</span>
                            <span class="status-badge ${agent.status}"></span>
                        </div>
                        <div class="agent-details">
                            <h2>${agent.name}</h2>
                            <div class="agent-role">${agent.role}</div>
                        </div>
                        <button class="agent-card-options" aria-label="Agent options">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"/>
                                <circle cx="12" cy="5" r="1"/>
                                <circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="agent-goal-container">
                        <div class="goal-label">Core Target</div>
                        <div class="goal-text">${agent.goal}</div>
                    </div>
                    
                    <div class="agent-card-stats">
                        <div class="agent-stat-item">
                            <span class="agent-stat-label">Model</span>
                            <span class="agent-stat-val" style="color: var(--accent-cyan); font-size: 0.75rem;">${agent.model.replace("Gemini ", "")}</span>
                        </div>
                        <div class="agent-stat-item">
                            <span class="agent-stat-label">Tokens</span>
                            <span class="agent-stat-val">${formattedTokens}</span>
                        </div>
                        <div class="agent-stat-item">
                            <span class="agent-stat-label">Success Rate</span>
                            <span class="agent-stat-val rate">${agent.successRate}%</span>
                        </div>
                    </div>
                `;
                
                this.gridEl.appendChild(card);
            }
        });
        
        if (this.gridEl.children.length === 0) {
            this.gridEl.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted); border: 1px dashed var(--border-glass); border-radius: 12px;">
                    No operational agents match the specified search query or status criteria.
                </div>
            `;
        }
    }

    // Recalculates stats panel card counts and costs
    updateSummaryStats() {
        const total = this.agents.length;
        const active = this.agents.filter(a => a.status === "active").length;
        this.statActiveEl.textContent = `${active} / ${total}`;
        
        // Average Success Rate
        const avgSuccess = total > 0 
            ? (this.agents.reduce((sum, a) => sum + parseFloat(a.successRate), 0) / total).toFixed(1)
            : "0.0";
        this.statSuccessEl.textContent = `${avgSuccess}%`;
        
        // Aggregated Tokens
        const totalTokens = this.agents.reduce((sum, a) => sum + a.tokens, 0);
        this.statTokensEl.textContent = this.formatTokenCount(totalTokens);
        
        // Estimated Cost: standard Gemini Pro Pricing averages $1.25 per 1M tokens ($0.00125 per 1k)
        const costVal = (totalTokens * 0.00000125).toFixed(2);
        this.statCostEl.textContent = `$${costVal}`;
    }

    // Open console drawer details
    openConsole(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;
        
        this.selectedAgentId = agentId;
        
        // Highlight active card
        this.renderAgents();
        
        // Populate fields
        this.drawerAvatar.textContent = agent.avatar || "🤖";
        this.drawerName.textContent = agent.name;
        this.drawerRole.textContent = agent.role;
        this.drawerMetaModel.textContent = agent.model;
        this.drawerMetaTokens.textContent = agent.tokens.toLocaleString();
        this.drawerMetaRuntime.textContent = `${agent.runtime}s`;
        this.drawerMetaGoal.textContent = agent.goal;
        
        // Update Drawer Status Badge UI
        this.drawerStatusText.textContent = agent.status.charAt(0).toUpperCase() + agent.status.slice(1);
        this.drawerStatusContainer.className = `console-status-badge ${agent.status}`;
        this.drawerStatusDot.className = `console-status-dot`;
        
        // Controls toggle state based on status
        if (agent.status === "active") {
            this.btnDrawerResume.style.display = "none";
            this.btnDrawerPause.style.display = "inline-flex";
        } else {
            this.btnDrawerResume.style.display = "inline-flex";
            this.btnDrawerPause.style.display = "none";
        }
        
        // Re-render logs in console terminal
        this.terminalBody.innerHTML = "";
        agent.logs.forEach(log => {
            const line = this.createLogLineElement(log);
            this.terminalBody.appendChild(line);
        });
        
        // Scroll terminal to the bottom
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
        
        // Open drawer visual sliding classes
        this.overlayEl.classList.add("active");
        this.drawerEl.classList.add("active");
    }

    closeConsole() {
        this.selectedAgentId = null;
        this.overlayEl.classList.remove("active");
        this.drawerEl.classList.remove("active");
        this.renderAgents();
    }

    setAgentStatus(agentId, status) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;
        
        agent.status = status;
        
        // Log status change inside agent logs
        const time = this.getCurrentSimTime();
        const msg = status === "active" 
            ? `Resuming core orchestration kernel. Status: ACTIVE`
            : `Pausing operational loops. Standing by in low-power IDLE state.`;
        
        agent.logs.push({ time, level: "system", tag: "KERNEL", msg });
        
        // Save
        this.saveAgents(this.agents);
        
        // Update UI
        this.updateSummaryStats();
        if (this.selectedAgentId === agentId) {
            this.openConsole(agentId);
        } else {
            this.renderAgents();
        }
    }

    deleteAgent(agentId) {
        if (!confirm("Are you sure you want to decommission and shut down this agent module permanently?")) return;
        
        this.agents = this.agents.filter(a => a.id !== agentId);
        this.saveAgents(this.agents);
        
        this.closeConsole();
        this.updateSummaryStats();
        this.renderAgents();
        this.showTransientNotification("Agent engine decommissioned successfully.");
    }

    // Trigger a simulated manual task to wake the agent
    triggerManualTask(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;
        
        // Wake the agent if idle
        agent.status = "active";
        
        // Inject manual request log
        const time = this.getCurrentSimTime();
        agent.logs.push({
            time, 
            level: "system", 
            tag: "MANUAL", 
            msg: `Manual diagnostics trigger received. Dispatched objective: '${agent.goal}'`
        });
        
        this.saveAgents(this.agents);
        this.updateSummaryStats();
        this.openConsole(agentId);
        
        this.showTransientNotification("Diagnostics event sent to agent.");
    }

    // Deploy modal visibility toggle
    toggleModal(visible) {
        if (visible) {
            this.modalEl.classList.add("active");
            document.getElementById("input-name").focus();
        } else {
            this.modalEl.classList.remove("active");
            this.addAgentForm.reset();
        }
    }

    // Handle Form submission for Deploying Agents
    deployAgent() {
        const name = document.getElementById("input-name").value.trim();
        const role = document.getElementById("input-role").value;
        const model = document.getElementById("input-model").value;
        const goal = document.getElementById("input-goal").value.trim();
        
        // Assign beautiful thematic avatar emojis
        let avatar = "🤖";
        if (role === "Code Architect") avatar = "⚡";
        else if (role === "Data Analyst") avatar = "🌌";
        else if (role === "Security Engineer") avatar = "🛡️";
        else if (role === "Literature Researcher") avatar = "📚";
        else if (role === "Autonomous Agent Manager") avatar = "🧠";
        
        const newAgent = {
            id: `agent-${Date.now()}`,
            name,
            role,
            model,
            goal,
            status: "active",
            runtime: 0,
            tokens: 0,
            successRate: (90 + Math.random() * 9.8).toFixed(1),
            avatar,
            logs: [
                { time: "00:00:00", level: "system", tag: "KERNEL", msg: `Bootstrapping '${name}' engine on ${model}` },
                { time: "00:00:01", level: "info", tag: "INIT", msg: `Configuring default operational targets for role: ${role.toUpperCase()}` },
                { time: "00:00:02", level: "success", tag: "SECURE", msg: `Assigned credentials. Agent fully registered.` }
            ]
        };
        
        this.agents.push(newAgent);
        this.saveAgents(this.agents);
        
        this.toggleModal(false);
        this.updateSummaryStats();
        this.renderAgents();
        this.showTransientNotification(`Agent '${name}' successfully spawned!`);
        
        // Auto open console for the newly created agent to see logs right away
        this.openConsole(newAgent.id);
    }

    // Create log lines with color coding tags
    createLogLineElement(log) {
        const line = document.createElement("div");
        line.className = `log-line ${log.level}`;
        
        line.innerHTML = `
            <span class="timestamp">[${log.time}]</span>
            <span class="tag">&lt;${log.tag}&gt;</span>
            <span class="message">${log.msg}</span>
        `;
        return line;
    }

    // Main interval tick: simulates active processing
    runSimulationTick() {
        let stateChanged = false;
        
        this.agents.forEach(agent => {
            if (agent.status === "active") {
                agent.runtime += 1;
                
                // Add tokens
                const addedTokens = Math.floor(40 + Math.random() * 180);
                agent.tokens += addedTokens;
                
                // Simulation behavior: 15% chance to push a new realistic log line
                if (Math.random() < 0.18) {
                    const logsPool = LOG_GENERATORS[agent.role] || LOG_GENERATORS["Autonomous Agent Manager"];
                    const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
                    
                    const time = this.formatSeconds(agent.runtime);
                    const newLog = {
                        time,
                        level: randomLog.level,
                        tag: randomLog.tag,
                        msg: randomLog.msg
                    };
                    
                    agent.logs.push(newLog);
                    
                    // Cap log history length to prevent buffer lag
                    if (agent.logs.length > 100) {
                        agent.logs.shift();
                    }
                    
                    // If this agent is open, stream live
                    if (this.selectedAgentId === agent.id) {
                        const line = this.createLogLineElement(newLog);
                        this.terminalBody.appendChild(line);
                        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
                        
                        // Update live numbers inside console details
                        this.drawerMetaTokens.textContent = agent.tokens.toLocaleString();
                        this.drawerMetaRuntime.textContent = `${agent.runtime}s`;
                    }
                    
                    // Tweak success rate dynamically over time
                    if (Math.random() < 0.05) {
                        const originalRate = parseFloat(agent.successRate);
                        const diff = (Math.random() * 0.4 - 0.2); // minor shift
                        agent.successRate = Math.min(100, Math.max(70, originalRate + diff)).toFixed(1);
                    }
                }
                
                // Dynamic Status Transitions: 2% chance to drop to idle (task finished) or 1% chance of error
                if (Math.random() < 0.012) {
                    agent.status = "idle";
                    const time = this.formatSeconds(agent.runtime);
                    agent.logs.push({
                        time,
                        level: "info",
                        tag: "SYSTEM",
                        msg: "Completed task pipeline objectives successfully. Pausing calculations, entering IDLE state."
                    });
                    
                    if (this.selectedAgentId === agent.id) {
                        this.openConsole(agent.id);
                    }
                    stateChanged = true;
                } else if (Math.random() < 0.004) {
                    agent.status = "error";
                    const time = this.formatSeconds(agent.runtime);
                    agent.logs.push({
                        time,
                        level: "error",
                        tag: "FATAL",
                        msg: "Internal runtime integrity exception. Retrying operational kernel handshakes."
                    });
                    
                    if (this.selectedAgentId === agent.id) {
                        this.openConsole(agent.id);
                    }
                    stateChanged = true;
                }
            } else if (agent.status === "error") {
                // 10% chance for an error agent to auto-resolve and resume idle
                if (Math.random() < 0.1) {
                    agent.status = "idle";
                    const time = this.formatSeconds(agent.runtime);
                    agent.logs.push({
                        time,
                        level: "success",
                        tag: "KERNEL",
                        msg: "Re-established secondary gateway channels. Error resolved successfully. Standing by."
                    });
                    
                    if (this.selectedAgentId === agent.id) {
                        this.openConsole(agent.id);
                    }
                    stateChanged = true;
                }
            } else if (agent.status === "idle") {
                // 3% chance for an idle agent to automatically pick up a new task goal and activate
                if (Math.random() < 0.03) {
                    agent.status = "active";
                    const time = this.formatSeconds(agent.runtime);
                    
                    // Simple randomized goals just to feel completely alive
                    const newTasks = [
                        "Analyzing anomalous latency spikes in data endpoints",
                        "Scanning framework directories for redundant memory references",
                        "Compiling deployment builds for secondary QA clusters",
                        "Scouring knowledge indices for regulatory compliance updates"
                    ];
                    agent.goal = newTasks[Math.floor(Math.random() * newTasks.length)];
                    
                    agent.logs.push({
                        time,
                        level: "system",
                        tag: "KERNEL",
                        msg: `Waking engine due to scheduled polling request. New Goal: '${agent.goal}'`
                    });
                    
                    if (this.selectedAgentId === agent.id) {
                        this.openConsole(agent.id);
                    }
                    stateChanged = true;
                }
            }
        });
        
        // Save state changes
        this.saveAgents(this.agents);
        
        // Real-time render ticks
        this.updateSummaryStats();
        
        // Re-render grid if statuses modified to maintain coloring or if search is on
        if (stateChanged) {
            this.renderAgents();
        } else {
            // Live stats updates inside list cards without rebuilding DOM
            this.agents.forEach(agent => {
                const card = document.querySelector(`.agent-card[data-id="${agent.id}"]`);
                if (card) {
                    const tokenVal = card.querySelector(".agent-card-stats .agent-stat-item:nth-child(2) .agent-stat-val");
                    if (tokenVal) tokenVal.textContent = this.formatTokenCount(agent.tokens);
                    
                    const successVal = card.querySelector(".agent-card-stats .agent-stat-item:nth-child(3) .agent-stat-val");
                    if (successVal) successVal.textContent = `${agent.successRate}%`;
                    
                    const badge = card.querySelector(".status-badge");
                    if (badge && !badge.classList.contains(agent.status)) {
                        badge.className = `status-badge ${agent.status}`;
                    }
                }
            });
        }
    }

    // Formatters & helpers
    formatTokenCount(tokens) {
        if (tokens >= 1000000) {
            return `${(tokens / 1000000).toFixed(1)}M`;
        } else if (tokens >= 1000) {
            return `${(tokens / 1000).toFixed(0)}k`;
        }
        return tokens.toString();
    }

    formatSeconds(s) {
        const hrs = Math.floor(s / 3600).toString().padStart(2, '0');
        const mins = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
        const secs = (s % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    getCurrentSimTime() {
        const now = new Date();
        return now.toTimeString().split(' ')[0];
    }

    // Displays a dynamic sliding notification toast in bottom right
    showTransientNotification(message) {
        const toast = document.createElement("div");
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "rgba(13, 20, 35, 0.95)";
        toast.style.border = "1px solid var(--accent-violet)";
        toast.style.color = "var(--text-primary)";
        toast.style.padding = "0.75rem 1.25rem";
        toast.style.borderRadius = "8px";
        toast.style.fontSize = "0.85rem";
        toast.style.fontWeight = "600";
        toast.style.boxShadow = "var(--shadow-premium), var(--shadow-violet-glow)";
        toast.style.zIndex = "999";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Slide in
        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        }, 50);
        
        // Fade and delete
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// 4. Instantiate Dashboard Engine on page load
document.addEventListener("DOMContentLoaded", () => {
    window.Dashboard = new AgentDashboard();
});
