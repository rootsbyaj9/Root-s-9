import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { readFileSync } from "fs";

try {
  const env = readFileSync(".env.local", "utf-8");
  env.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim().replace(/['"]/g, '');
  });
} catch {
  dotenv.config();
}

console.log("Token length:", process.env.SANITY_API_WRITE_TOKEN?.length);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  try {
    const res = await client.fetch('*[_type == "serviceCategory"]{title, "count": count(items)}');
    console.log("Current Sanity DB Categories:");
    console.log(res);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}
run();
