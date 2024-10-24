const fs = require('fs-extra');

fs.writeFileSync('dist/_redirects', '/* /index.html 200');
console.log('_redirects file created in dist folder.');
