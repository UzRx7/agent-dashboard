export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getVaultPath() {
    return path.resolve(process.env.OBSIDIAN_VAULT_PATH || "./vault");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { goal } = body;
        
        if (!goal) {
            return NextResponse.json({ success: false, error: "Strategic goal input required" }, { status: 400 });
        }

        const vaultRoot = getVaultPath();
        let vaultContext = "Obsidian memory vault loaded successfully.\n";

        // Read Goals context
        const goalsPath = path.join(vaultRoot, "01-Goals", "goals.md");
        if (fs.existsSync(goalsPath)) {
            vaultContext += `Current Strategic Goals:\n${fs.readFileSync(goalsPath, "utf-8")}\n`;
        }

        // Read Kanban projects context
        const kanbanPath = path.join(vaultRoot, "02-Projects", "kanban.md");
        if (fs.existsSync(kanbanPath)) {
            vaultContext += `Active Projects Board:\n${fs.readFileSync(kanbanPath, "utf-8")}\n`;
        }

        const apiKey = process.env.ANTHROPIC_API_KEY || "";
        let claudeResponseText = "";
        let parsedPlan = null;

        // Verify if actual Anthropic API should be called
        if (apiKey && !apiKey.includes("mock-anthropic")) {
            try {
                const response = await fetch("https://api.anthropic.com/v1/messages", {
                    method: "POST",
                    headers: {
                        "x-api-key": apiKey,
                        "anthropic-version": "2023-06-01",
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "claude-3-5-sonnet-20241022",
                        max_tokens: 1024,
                        system: "You are the CEO Intelligence Layer of 2u.tv's Agentic OS. You decompose high-level business goals into subtasks assigned to your two workers: Hermes-1 (Research, content, writing, subtitles) and Hermes-2 (Technical, coding, DevOps, Git, VPS integrations). Return a JSON object with: { \"planSummary\": \"...\", \"subtasks\": [ { \"title\": \"...\", \"agent\": \"hermes1|hermes2\", \"instruction\": \"...\" } ] }",
                        messages: [
                            {
                                role: "user",
                                content: `Vault Context:\n${vaultContext}\n\nHigh-Level Business Objective to Decompose:\n'${goal}'`
                            }
                        ]
                    })
                });

                const data = await response.json();
                if (data.content && data.content[0]) {
                    claudeResponseText = data.content[0].text;
                    // Attempt to parse JSON from Claude
                    const jsonMatch = claudeResponseText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        parsedPlan = JSON.parse(jsonMatch[0]);
                    }
                }
            } catch (e) {
                console.warn("Anthropic API dispatch failed, degrading gracefully to mock planning engine", e);
            }
        }

        // Graceful fallback mock planner if Anthropic is offline/unconfigured
        if (!parsedPlan) {
            const isTechnical = goal.toLowerCase().includes("vps") || 
                                goal.toLowerCase().includes("docker") || 
                                goal.toLowerCase().includes("ssl") || 
                                goal.toLowerCase().includes("git") || 
                                goal.toLowerCase().includes("api") || 
                                goal.toLowerCase().includes("code");
            
            if (isTechnical) {
                parsedPlan = {
                    planSummary: `CEO Analysis: Objective '${goal}' is technically oriented. Dispatched to Hermes-2 (Technical) for implementation and git commits.`,
                    subtasks: [
                        {
                            title: "Audit local Git repository configuration bounds",
                            agent: "hermes2",
                            instruction: "Run checks on /var/agentos/vault remote origins and pull credentials."
                        },
                        {
                            title: "Setup and configure target Docker container specifications",
                            agent: "hermes2",
                            instruction: "Generate verified docker-compose config files inside 05-Agents/Hermes-2/."
                        },
                        {
                            title: "Trigger system checking pings on VPS deployment ports",
                            agent: "hermes2",
                            instruction: "Ensure security headers and PM2 clusters are loaded successfully."
                        }
                    ]
                };
            } else {
                parsedPlan = {
                    planSummary: `CEO Analysis: Objective '${goal}' is research and marketing oriented. Dispatched to Hermes-1 (Research) to draft scripts and subtitles.`,
                    subtasks: [
                        {
                            title: "Examine UK voice transcript models and SEO parameters",
                            agent: "hermes1",
                            instruction: "Search regional metrics on video localization channels."
                        },
                        {
                            title: "Draft localized video voice-over scripts",
                            agent: "hermes1",
                            instruction: "Write localized brand text files inside 05-Agents/Hermes-1/ in the Obsidian vault."
                        },
                        {
                            title: "Finalize brand alignment and translation metadata",
                            agent: "hermes1",
                            instruction: "Cross-reference brand SOP guidelines from 03-Knowledge/sop.md."
                        }
                    ]
                };
            }
        }

        return NextResponse.json({
            success: true,
            goal,
            plan: parsedPlan
        });
    } catch (error: any) {
        console.error("Claude Planning Route Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to parse strategic planning bounds via Claude CEO"
        }, { status: 500 });
    }
}
