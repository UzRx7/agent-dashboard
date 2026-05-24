export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

function getVaultPath() {
    return path.resolve(process.env.OBSIDIAN_VAULT_PATH || "./vault");
}

function getKanbanPath() {
    return path.join(getVaultPath(), "02-Projects", "kanban.md");
}

// Simple git auto-sync dispatcher
function triggerGitSync() {
    const vaultRoot = getVaultPath();
    if (fs.existsSync(path.join(vaultRoot, ".git"))) {
        exec(`git pull --rebase && git add . && git commit -m "AgenticOS Projects Auto-Sync: ${new Date().toISOString()}" && git push`, { cwd: vaultRoot });
    }
}

// Parses Kanban boards markdown into columns of task strings
function parseKanbanMarkdown(content: string) {
    const todo: string[] = [];
    const inProgress: string[] = [];
    const done: string[] = [];

    const sections = content.split(/(?=^##\s+)/m); // split by headers
    
    sections.forEach(section => {
        const lines = section.split("\n");
        const headerLine = lines[0].trim().toLowerCase();
        
        const tasks = lines.slice(1)
            .map(l => l.trim())
            .filter(l => l.startsWith("- [ ]") || l.startsWith("- [x]"))
            .map(l => l.replace(/^-\s+\[\s*[x ]\s*\]\s*/, "")); // strip standard list checkboxes
        
        if (headerLine.includes("to do")) {
            todo.push(...tasks);
        } else if (headerLine.includes("in progress")) {
            inProgress.push(...tasks);
        } else if (headerLine.includes("done")) {
            done.push(...tasks);
        }
    });

    return { todo, inProgress, done };
}

// Rebuilds Kanban Markdown from columns list
function serializeKanbanMarkdown(todo: string[], inProgress: string[], done: string[]): string {
    let md = `---\nkanban-plugin: basic\n---\n\n# 📋 2u.tv Project Hub\n\n`;
    
    md += `## To Do\n`;
    todo.forEach(t => {
        md += `- [ ] ${t}\n`;
    });
    md += `\n`;

    md += `## In Progress\n`;
    inProgress.forEach(t => {
        md += `- [ ] ${t}\n`;
    });
    md += `\n`;

    md += `## Done\n`;
    done.forEach(t => {
        md += `- [x] ${t}\n`; // Done column gets checks
    });
    md += `\n`;

    return md;
}

// GET: Read Kanban projects board
export async function GET() {
    try {
        const kp = getKanbanPath();
        
        if (!fs.existsSync(kp)) {
            // Default pre-populated list if file not created yet
            return NextResponse.json({
                success: true,
                todo: [
                    "Localize French marketing video for 2u.tv (Assigned: Hermes-1)",
                    "Verify SSL configurations on Hermes-2 technical VPS (Assigned: Hermes-2)",
                    "Incorporate text-to-speech voice clones for English dubs"
                ],
                inProgress: [
                    "Build Agentic OS mission control panel (Assigned: Antigravity Prime)",
                    "Sync OpenClaw routing endpoints (Assigned: Hermes-2)"
                ],
                done: [
                    "Deploy primary Hermes VPS nodes on Hostinger (Assigned: Hermes-2)",
                    "Draft brand voice guidelines (Assigned: Hermes-1)"
                ]
            });
        }

        const content = fs.readFileSync(kp, "utf-8");
        const board = parseKanbanMarkdown(content);
        
        return NextResponse.json({
            success: true,
            ...board
        });
    } catch (error: any) {
        console.error("Projects GET API error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to load projects board"
        }, { status: 500 });
    }
}

// POST: Add task, or Move task between columns
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, task, sourceCol, targetCol } = body;
        
        const kp = getKanbanPath();
        
        // Ensure parent directory exists
        const parentDir = path.dirname(kp);
        if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
        }

        let todo: string[] = [];
        let inProgress: string[] = [];
        let done: string[] = [];

        // Read current state
        if (fs.existsSync(kp)) {
            const content = fs.readFileSync(kp, "utf-8");
            const parsed = parseKanbanMarkdown(content);
            todo = parsed.todo;
            inProgress = parsed.inProgress;
            done = parsed.done;
        } else {
            // Setup defaults if missing
            todo = ["Localize French marketing video for 2u.tv (Assigned: Hermes-1)", "Verify SSL configurations on Hermes-2 technical VPS (Assigned: Hermes-2)"];
            inProgress = ["Build Agentic OS mission control panel (Assigned: Antigravity Prime)"];
            done = ["Deploy primary Hermes VPS nodes on Hostinger (Assigned: Hermes-2)"];
        }

        if (action === "add") {
            if (!task) {
                return NextResponse.json({ success: false, error: "Task content required" }, { status: 400 });
            }
            todo.push(task);
        } else if (action === "move") {
            if (!task || !sourceCol || !targetCol) {
                return NextResponse.json({ success: false, error: "Move actions require task, sourceCol, and targetCol parameters" }, { status: 400 });
            }

            // Remove from source column list
            let removed = false;
            if (sourceCol === "todo") {
                const idx = todo.indexOf(task);
                if (idx !== -1) { todo.splice(idx, 1); removed = true; }
            } else if (sourceCol === "inProgress") {
                const idx = inProgress.indexOf(task);
                if (idx !== -1) { inProgress.splice(idx, 1); removed = true; }
            } else if (sourceCol === "done") {
                const idx = done.indexOf(task);
                if (idx !== -1) { done.splice(idx, 1); removed = true; }
            }

            // Add to target column list
            if (targetCol === "todo") {
                todo.push(task);
            } else if (targetCol === "inProgress") {
                inProgress.push(task);
            } else if (targetCol === "done") {
                done.push(task);
            }
        } else {
            return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
        }

        // Serialize and save back
        const newMd = serializeKanbanMarkdown(todo, inProgress, done);
        fs.writeFileSync(kp, newMd, "utf-8");
        
        // Trigger Git Sync
        triggerGitSync();

        return NextResponse.json({
            success: true,
            todo,
            inProgress,
            done
        });
    } catch (error: any) {
        console.error("Projects POST API error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to update projects board"
        }, { status: 500 });
    }
}
