const https = require('https');
const fs = require('fs');

const getMeta = (url, name) => {
  https.get(url, res => {
    if (res.headers.location) {
      if (res.headers.location.startsWith('/')) {
        return getMeta('https://www.google.com' + res.headers.location, name);
      }
      return getMeta(res.headers.location, name);
    }
    
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const titleMatch = data.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
      const descMatch = data.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
      fs.appendFileSync('map_data.txt', `[${name}] Title: ${titleMatch?.[1]}\nDesc: ${descMatch?.[1]}\n\n`);
    });
  });
};

fs.writeFileSync('map_data.txt', '');
getMeta('https://maps.app.goo.gl/ocq8uts9jYaCp3bu8', 'Branch 1');
getMeta('https://maps.app.goo.gl/NSNafg2mqV9acw9m7', 'Branch 2');
