const fs = require('fs');
const path = require('path');

// Quelle: Frontend Icons
const sourceIconPath = path.join(
  __dirname,
  '..',
  'MemoryBreakout',
  'src',
  'assets',
  'icons'
);

// Ziel: Backend Icons
const targetIconPath = path.join(__dirname, 'icons');

// Fallback: Wenn MemoryBreakout Pfad nicht existiert (z.B. auf Heroku nach git clone)
// dann überspringe das Script - die Icons sollten schon vom letzten Build da sein
if (!fs.existsSync(sourceIconPath)) {
  console.log(`[copy-icons.js] Quelle existiert nicht: ${sourceIconPath}`);
  console.log(
    `[copy-icons.js] Dies ist normal auf Heroku. Icons sollten bereits vorhanden sein.`
  );
  process.exit(0);
}

// Rekursive Kopier-Funktion
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

try {
  console.log(
    `[copy-icons.js] Kopiere Icons von ${sourceIconPath} nach ${targetIconPath}`
  );
  copyDir(sourceIconPath, targetIconPath);
  console.log(`[copy-icons.js] Icons erfolgreich kopiert!`);
} catch (error) {
  console.error(
    `[copy-icons.js] Fehler beim Kopieren der Icons:`,
    error.message
  );
  process.exit(1);
}
