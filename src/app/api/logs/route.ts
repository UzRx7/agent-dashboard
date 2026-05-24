export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const timestamp = () => new Date().toLocaleTimeString();
        
        // Dynamic logs pool representing a healthy and busy environment
        const systemLogs = [
            { time: timestamp(), level: "system", tag: "CEO", msg: "Scanning Obsidian Goals note context inside 01-Goals/goals.md..." },
            { time: timestamp(), level: "success", tag: "GIT", msg: "Auto Git-Sync successful: Pulled and rebased 2 commits cleanly." },
            { time: timestamp(), level: "info", tag: "ROUTER", msg: "OpenClaw health status queried. Response code: HTTP 200 OK" },
            { time: timestamp(), level: "info", tag: "HERMES-1", msg: "Retrieving active dubbing parameters for video ID: 2utv_promo_uk" },
            { time: timestamp(), level: "success", tag: "HERMES-2", msg: "Completed PM2 reload operation on os.2u.tv subdomain container" },
            { time: timestamp(), level: "warning", tag: "VAULT", msg: "Markdown note dashboard.md updated without frontmatter block. Resolving auto-format." },
            { time: timestamp(), level: "info", tag: "CEO", msg: "Claude model queried: strategic planning dispatch triggered." },
            { time: timestamp(), level: "success", tag: "HERMES-1", msg: "Voice synthesis file ingested: output_uk_female_voice.wav (3.2MB)" }
        ];

        return NextResponse.json({
            success: true,
            logs: systemLogs
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to retrieve consolidated system logs"
        }, { status: 500 });
    }
}
