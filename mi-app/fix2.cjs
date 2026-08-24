const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/<code><=<\/code>/g, "<code><=</code>");
content = content.replace(/<code>>=<\/code>/g, "<code>>=</code>");
fs.writeFileSync('src/App.tsx', content);
console.log('Done');