/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var requestify = require('requestify');

var ipESB = "http://35.196.116.216";
var SEPARATOR = "/";
var portESB = ":8081";
var urlCrearNacimiento = ipESB + portESB + SEPARATOR + "registrarNacimiento";
var urlCrearMatrimonio = ipESB + portESB + SEPARATOR + "registrarMatrimonio";
var urlCrearDivorcio = ipESB + portESB + SEPARATOR + "registrarDivorcio";
var urlCrearDefuncion = ipESB + portESB + SEPARATOR + "registrarDefuncion";
var urlActualizarDPI = ipESB + portESB + SEPARATOR + "actualizarDPI";
var urlConsultarNacimiento = ipESB + portESB + SEPARATOR + "imprimirNacimiento";
var urlConsultarMatrimonio = ipESB + portESB + SEPARATOR + "imprimirMatrimonio";
var urlConsultarDivorcio = ipESB + portESB + SEPARATOR + "imprimirDivorcio";
var urlConsultarDefuncion = ipESB + portESB + SEPARATOR + "imprimirDefuncion";
var urlConsultarDPI = ipESB + portESB + SEPARATOR + "consultarDPI";
var urlConsultarDepartamentos = ipESB + portESB + SEPARATOR + "obtenerListaDepartamentos";
var urlConsultarMunicipios = ipESB + portESB + SEPARATOR + "obtenerListaMunicipios";

exports.init_ = (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  console.log("[req.body] " + JSON.stringify(req.body));
  var msg = req.body;
  console.log("[flag] " + msg.flag);

  if (msg.flag == 0) {
    console.log("[response x0] " + urlConsultarDepartamentos);
    requestify.post(urlConsultarDepartamentos, req.body).then(function (response) {
      console.log("[response x0].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x0] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 1) {
    console.log("[response x1] " + urlConsultarMunicipios);
    requestify.post(urlConsultarMunicipios, req.body).then(function (response) {
      console.log("[response x1].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x1] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 2) {
    console.log("[response x2] " + urlCrearNacimiento);
    requestify.post(urlCrearNacimiento, req.body).then(function (response) {
      console.log("[response x2].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
  } else if (msg.flag == 3) {
    console.log("[response x3] " + urlConsultarNacimiento);
    requestify.post(urlConsultarNacimiento, req.body).then(function (response) {
      console.log("[response x3].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x3] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 4) {
    console.log("[response x4] " + urlCrearMatrimonio);
    requestify.post(urlCrearMatrimonio, req.body).then(function (response) {
      console.log("[response x4].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
  } else if (msg.flag == 5) {
    console.log("[response x5] " + urlConsultarMatrimonio);
    requestify.post(urlConsultarMatrimonio, req.body).then(function (response) {
      console.log("[response x5].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x5] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 6) {
    console.log("[response x6] " + urlCrearDivorcio);
    requestify.post(urlCrearDivorcio, req.body).then(function (response) {
      console.log("[response x6].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
  } else if (msg.flag == 7) {
    console.log("[response x7] " + urlConsultarDivorcio);
    requestify.post(urlConsultarDivorcio, req.body).then(function (response) {
      console.log("[response x7].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x7] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 8) {
    console.log("[response x8] " + urlCrearDefuncion);
    requestify.post(urlCrearDefuncion, req.body).then(function (response) {
      console.log("[response x8].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
  } else if (msg.flag == 9) {
    console.log("[response x9] " + urlConsultarDefuncion);
    requestify.post(urlConsultarDefuncion, req.body).then(function (response) {
      console.log("[response x9].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x9] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 10) {
    var message = {};
    message.status = 1;
    message.mensaje = "DPI actualizado correctamente";
    console.log("[response x10] " + JSON.stringify(message));
    res.status(200).send(message);
  } else {
    var message = {
      "cui": 242000888877,
      "nombre": "Armando",
      "apellido": "Colon",
      "genero": "masculino",
      "fechaNacimiento": "05/02/1997",
      "paisNacimiento": "Guatemala",
      "departamentoMacimiento": "Guatemala",
      "municipioNacimiento": "San Miguel Petapa",
      "paisVecindad": "Guatemala",
      "departamentoVecindad": "Guatemala",
      "municipioVecindad": "Guatemala",
      "estadoCivil": "Soltero",
      "huella": "fasdfasdfasdfasdf",
      "fechaVencimiento": "18/01/2010",
      "status": 1,
      "mensaje": "DPI consultado exitosamente"
    };
    console.log("[response x11] " + JSON.stringify(message));
    res.status(200).send(message);
  }
};