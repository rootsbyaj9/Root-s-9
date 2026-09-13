import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const home = await client.fetch('*[_type == "homePage"][0]');
  console.log('HOME:', JSON.stringify(home, null, 2));
}

run();
