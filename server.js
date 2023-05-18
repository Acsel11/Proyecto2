const http = require('http');
const fs = require('fs');

http.createServer((request,response)=>{

  const file = request.url == '/' ? 
  './WWW/landingPage.html' : `./WWW${request.url}`;

  if(request.url == '/guardado'){
    let data = [];
    request.on("data", value => {
      data.push(value);
    }).on("end", ()=>{
      let params = Buffer.concat(data).toString();
      console.log(params);
      params += '\n';
      fs.appendFile('WWW/guardado', params, (err) => {
        if (err) {
          console.error(err);
          response.statusCode = 500;
          response.end('Error al guardar los datos');
        } else {
          response.end('Datos guardados correctamente');
        }
      });
    });
  }

  //const data = fs.readFileSync('./WWW/index.html');
  fs.readFile(file, (err, data) => {
    if(err){
      response.writeHead(404, {"Content-Type":"text/html"});
      response.write("Not found");
      response.end();
    }else{
    const extension = request.url.split('.').pop();
    console.log(extension);
    switch (extension){
	    case 'txt':
        response.writeHead(200, {"Content-Type":"text/plain"});
        break;
      case 'html':
        response.writeHead(200, {"Content-Type":"text/html"});
        break;
      case 'css':
        response.writeHead(200, {"Content-Type":"text/css"});
        break;
      case 'ico':
        response.writeHead(200, {"Content-Type":"image/x-icon"});
        break;
      case 'js':
        response.writeHead(200, {"Content-Type":"text/javascript"});
        break;
      case 'jpeg':
        response.writeHead(200, {"Content-Type":"/image/jpeg"});
        break;
      case 'png':
        response.writeHead(200, {"Content-Type":"/image/png"});
        break;
      default:
          response.writeHead(200, {"Content-Type":"text/html"});
          break;
     }
     response.write(data);
     response.end();
     }
    });
}).listen(8888); 
