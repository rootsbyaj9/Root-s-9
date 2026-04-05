import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { readFileSync } from "fs";

try {
  const env = readFileSync(".env.local", "utf-8");
  env.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) {
      let val = rest.join("=").trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      process.env[key.trim()] = val;
    }
  });
} catch {
  dotenv.config();
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function cleanEmptyCategories() {
  try {
    const categories = await client.fetch('*[_type == "serviceCategory"]');
    
    // We want to delete ones that have no items because the real seeded ones all have > 0 items.
    // Let's filter first:
    const emptyCats = categories.filter(c => !c.items || c.items.length === 0);
    
    console.log(`Found ${categories.length} total categories. of which ${emptyCats.length} are empty.`);
    
    for (const cat of emptyCats) {
      console.log(`Deleting empty category: ${cat.title} (${cat._id})`);
      await client.delete(cat._id);
    }
    
    console.log("Cleanup complete!");
  } catch (err) {
    console.error("Cleanup Error:", err);
  }
}

cleanEmptyCategories();
