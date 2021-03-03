const axios= require("axios");
const fs = require("fs").promises;
const http = require('http');


const URL_proveedores="https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
const URL_clientes="https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"


  const server = http.createServer(async function (req, res) {
   
    res.setHeader("Content-Type", "text/html");
    switch(req.url){
        case "/api/clientes": 
        try {
            let clientes= await axios.get(URL_clientes);
            let dclientes= await JSON.stringify(clientes.data);
            fs.readFile("./clientes.html","utf-8").then(contents => {
                contents = contents.replace("{{data}}", dclientes).replace("{{id}}", "idCliente").replace("{{nombre}}", "NombreCompania").replace("{{contacto}}", "NombreContacto");
                res.writeHead(200);
                res.write(contents);
                res.end();
                
            }).catch(err=>{console.log(err)});
        }
        catch (e){
            console.log(e.message);
        }
            break;
        case "/api/proveedores":
            try {
                let proveedores= await axios.get(URL_proveedores);
                let dproveedores= await JSON.stringify(proveedores.data);
                fs.readFile("./proveedores.html","utf-8").then(contents => {
                    contents = contents.replace("{{data}}", dproveedores).replace("{{id}}", "idproveedor").replace("{{nombre}}", "nombrecompania").replace("{{contacto}}", "nombrecontacto");
                    res.writeHead(200);
                    res.write(contents);
                    res.end();
                    
                }).catch(err=>{console.log(err)});
            }
            catch (e){
                console.log(e.message);
            }
            break;

        case "/":
            res.writeHead(200);
            res.end(`<html><body><h1>HOME</h1> <a href="/api/clientes">Clientes</a> <a href="/api/proveedores">Proveedores</a></body></html>`);
            break;
        default:
            res.writeHead(404);
            res.end(``);
    
    }
  
  });

  server.listen(8081, "localhost", () => {
      console.log(`Server is running on http://localhost:8081`);
  });

  