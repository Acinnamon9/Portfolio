import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const docsDir = path.join(process.cwd(), "docs");

  try {
    const files = fs
      .readdirSync(docsDir)
      .filter((f) => f.endsWith(".md"))
      .sort();

    const docs = files.map((filename) => {
      const content = fs.readFileSync(path.join(docsDir, filename), "utf-8");
      const name = filename.replace(".md", "").replace(/_/g, " ");
      return { filename, name, content };
    });

    return NextResponse.json(docs);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
