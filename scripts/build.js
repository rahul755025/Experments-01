const fs = require('fs');
const path = require('path');
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/src', { recursive: true });
for (const file of ['index.html', 'src/app.js', 'src/styles.css']) {
  fs.copyFileSync(file, path.join('dist', file));
}
console.log('Built static app into dist/');
