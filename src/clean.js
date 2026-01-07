// clean.js
const fs = require("fs");
const path = require("path");

// Directorio objetivo: ./ciudad-data/src
const targetDir = path.resolve(__dirname);

// Función recursiva para eliminar archivos .js
function deleteJsFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      deleteJsFiles(fullPath);
    } else if (file.endsWith(".js")) {
      // Evitar borrar este mismo script
      if (path.basename(fullPath) === "clean.js") return;

      fs.unlinkSync(fullPath);
      console.log("Eliminado:", fullPath);
    }
  });
}

// Ejecutar en ./ciudad-data/src
deleteJsFiles(targetDir);
