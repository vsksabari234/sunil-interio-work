import https from 'node:https';
import fs from 'node:fs';

https.get('https://storied-belekoy-4a2680.netlify.app/assets/index-BTTqFiW0.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('/tmp/bundle.js', data);
    console.log('Saved bundle. Size:', data.length);

    // Let us extract common strings
    const strRegex = /"([^"\\]{15,120})"/g;
    const strings = [];
    let match;
    while ((match = strRegex.exec(data)) !== null) {
      if (!match[1].includes('{') && !match[1].includes(';')) {
        strings.push(match[1]);
      }
    }
    console.log('Found string count:', strings.length);
    console.log('Sample strings:', strings.slice(0, 60));
  });
});
