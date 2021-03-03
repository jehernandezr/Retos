const axios= require("axios");
const fs = require("fs");
const http = require('http');


const URL_proveedores="https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
const URL_clientes="https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"

//Lee un archivo del sistema de archivos
fs.readFile("app.js", (err, data) => {
    console.log(data);
  });
  
  //Crea un archivo en el sistema de archivos 
  fs.writeFile("file.txt", "contenido", "utf-8", (err) => {
    if (err) console.log("Error writing file");
  });


http.createServer(function (req, res) {
  
    // Lee el archivo testfile.txt el cual se encuentra en la misma ruta que este script
    fs.readFile('testfile.txt', 'utf8', function(err, data) {
      if (err) throw err; // Retorna error si no encuentra el archivo
      
      // Encabezado de la respuesta del servidor
      res.writeHead(200, {'Content-Type': 'text/html'}); 
    
      // Especifica el contenido que debe ser incluido en la respuesta
      // Note que el objeto data ahora es parámetro de la función uc, alias del módulo upper-case
      res.end(uc(data));
    });
  
  }).listen(8081); 

