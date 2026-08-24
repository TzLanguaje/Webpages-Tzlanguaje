const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace all < and > in code tags with JSX expressions
content = content.replace(/<code><\/code>/g, "<code>{'<'}</code>");
content = content.replace(/<code>><\/code>/g, "<code>{'>'}</code>");
content = content.replace(/<code><=<\/code>/g, "<code><=</code>");
content = content.replace(/<code>>=<\/code>/g, "<code>>=</code>");

// Also handle any remaining raw < and > in code tags
content = content.replace(/<code>([^<]*?)<([^<]*?)<\/code>/g, (match, p1, p2) => {
  return `<code>${p1}{'<'}(${p2}</code>`;
});
content = content.replace(/<code>([^>]*?)>([^>]*?)<\/code>/g, (match, p1, p2) => {
  return `<code>${p1}{'>'}${p2}</code>`;
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done');