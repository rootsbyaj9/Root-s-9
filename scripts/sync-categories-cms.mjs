import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skDn0m93X5cgGVk9euXH8Hcmv8xBTZOzHtuum8fHFN3T7xF2wKptqxkUbw0l9v0B1oXTy8XsPIxp6ilkIEQ4fP17M2S7C20ovFr84DDrXm0GgvLAxsuB4sE3051lazbuFu4UH9oFkT06p7YVGJUl4HmfC2bQSAKmKkJY0jZ0cAEBBrbx2W80',
  useCdn: false,
});

async function main() {
  const cats = await client.fetch('*[_type == "serviceCategory"]{ _id, title, gender, displayTabs }');
  console.log(`Found ${cats.length} categories.`);

  for (const cat of cats) {
    let tabs = cat.displayTabs || [];
    if (!tabs || tabs.length === 0) {
      if (cat.gender === 'both') {
        tabs = ['womens', 'mens'];
      } else if (cat.gender) {
        tabs = [cat.gender];
      }
    }

    // Specific user requests:
    // 1. Women's Piercing in womens + piercing
    if (cat.title?.toLowerCase().includes("women's piercing") || cat._id === 'e81439e6-1ff2-42f7-b3e1-684c1bb74520') {
      tabs = Array.from(new Set([...tabs, 'womens', 'piercing']));
    }
    // 2. Men's Piercing in mens + piercing
    if (cat.title?.toLowerCase().includes("men's piercing") || cat._id === 'ff6b8266-bd06-4d9b-b1ed-5fe78f57eb2c') {
      tabs = Array.from(new Set([...tabs, 'mens', 'piercing']));
    }

    const patch = client.patch(cat._id).set({ displayTabs: tabs });

    // 3. Change "Nail Art" title to "Nail Art & Styling"
    if (cat.title === 'Nail Art' || cat._id === '27beb51c-903f-4ec8-8698-16ec49cd98a3') {
      patch.set({ title: 'Nail Art & Styling', displayTabs: ['nails'] });
    }

    await patch.commit();
    console.log(`✅ Patched ${cat.title} (${cat._id}) -> tabs:`, tabs);
  }

  console.log('🎉 All categories synced successfully!');
}

main().catch(console.error);
