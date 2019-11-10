/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var requestify = require('requestify');
/*var urlPostPais = "http://35.196.116.216/director/services/operaciones/creaPais";
var urlGetDefunciones = "http://35.196.116.216/director/services/consulta/obtenerDefunciones";
var urlGetDepartamentos = "http://35.196.116.216/director/services/consulta/obtenerDepartamentosById";
var urlGetMunicipios = "http://35.196.116.216/director/services/consulta/obtenerMunicipiosById";
var urlPostCrearPersona = "http://35.196.116.216/director/services/operaciones/creaNacimiento/";
var urlPostObtenerPersona = "http://35.196.116.216/director/services/consulta/obtenerNacimientoById";
var urlPostCrearMatrimonio = "http://35.196.116.216/director/services/operaciones/creaMatrimonio/";
var urlPostObtenerMatrimonio = "http://35.196.116.216/director/services/consulta/obtenerMatrimonioById";
var urlPostCrearDivorcio = "http://35.196.116.216/director/services/operaciones/creaDivorcio/";
var urlPostObtenerDivorcio = "http://35.196.116.216/director/services/consulta/obtenerDivorcioById";
var urlPostCreateDefuncion = "http://35.196.116.216/director/services/operaciones/creaDefuncion/";
var urlPostObtenerDefuncion = "http://35.196.116.216/director/services/consulta/obtenerDefuncionById";
*/


var urlPostPais = "http://35.190.23.182:8080/director/services/operaciones/creaPais";
var urlGetDefunciones = "http://35.190.23.182:8080/director/services/consulta/obtenerDefunciones";
var urlGetDepartamentos = "http://35.190.23.182:8080/director/services/consulta/obtenerDepartamentosById";
var urlGetMunicipios = "http://35.190.23.182:8080/director/services/consulta/obtenerMunicipiosById";
var urlPostCrearPersona = "http://35.190.23.182:8080/director/services/operaciones/creaNacimiento/";
var urlPostObtenerPersona = "http://35.190.23.182:8080/director/services/consulta/obtenerNacimientoById";
var urlPostCrearMatrimonio = "http://35.190.23.182:8080/director/services/operaciones/creaMatrimonio/";
var urlPostObtenerMatrimonio = "http://35.190.23.182:8080/director/services/consulta/obtenerMatrimonioById";
var urlPostCrearDivorcio = "http://35.190.23.182:8080/director/services/operaciones/creaDivorcio/";
var urlPostObtenerDivorcio = "http://35.190.23.182:8080/director/services/consulta/obtenerDivorcioById";
var urlPostCreateDefuncion = "http://35.190.23.182:8080/director/services/operaciones/creaDefuncion/";
var urlPostObtenerDefuncion = "http://35.190.23.182:8080/director/services/consulta/obtenerDefuncionById";
/*
"http://35.196.116.216/director/services/consulta/obtenerDivorcios";
"http://35.196.116.216/director/services/consulta/obtenerDpis";
"http://35.196.116.216/director/services/consulta/obtenerEstadosCiviles";

"http://35.196.116.216/director/services/consulta/obtenerNacimientos";
"http://35.196.116.216/director/services/consulta/obtenerPersonas";
"http://35.196.116.216/director/services/consulta/obtenerRegimenMatrimoniales";

"http://35.196.116.216/director/services/consulta/obtenerDepartamentoById";

"http://35.196.116.216/director/services/consulta/obtenerDpiById";
"http://35.196.116.216/director/services/consulta/obtenerEstadosCivilById";

"http://35.196.116.216/director/services/consulta/obtenerMunicipioById";
"http://35.196.116.216/director/services/consulta/obtenerNacimientoById";

"http://35.196.116.216/director/services/consulta/obtenerRegimenMatrimonialById";

"http://35.196.116.216/director/services/operaciones/creaDepartamento/";

"http://35.196.116.216/director/services/operaciones/creaDpi/";
"http://35.196.116.216/director/services/operaciones/creaEstadosCivil/";
"http://35.196.116.216/director/services/operaciones/creaMatrimonio/";
"http://35.196.116.216/director/services/operaciones/creaMunicipio/";
"http://35.196.116.216/director/services/operaciones/creaNacimiento/";

"http://35.196.116.216/director/services/operaciones/creaRegimenMatrimonial/";
*/

exports.init_ = (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  console.log("[message x2] " + JSON.stringify(req.body));
  var msg = req.body;
  console.log("[message x3] " + msg.flag);

  if (msg.flag == -1) {
    console.log("[response -1]");
    requestify.post(urlPostPais, req.body).then(function (response) {
      console.log("[response -1].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
  } else if (msg.flag == 0) {
    /*var message = ['ALTA VERAPAZ', 'BAJA VERAPAZ', 'CHIMALTENANGO', 'CHIQUIMULA', 'EL PROGESO', 'ESCUINTLA', 'GUATEMALA', 'HUEHUETENANGO', 'IZABAL', 'JALAPA', 'JUTIAPA', 'PETÉN', 'QUETZALTENANGO', 'QUICHÉ', 'RETALHULEU', 'SACATEPÉQUEZ', 'SAN MARCOS', 'SANTA ROSA', 'SOLOLÁ', 'SUCHITEPÉQUEZ', 'TOTONICAPÁN', 'ZACAPA'];
    res.status(200).send(message);*/
    console.log("[response x0]");
    requestify.post(urlGetDepartamentos, req.body).then(function (response) {
      console.log("[response x0].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x0] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 1) {
    /*var message = [				
      			{value: "Cahabón", id: 0},
    {value: "Chisec", id: 1},
    {value: "Cobán", id: 2},
    {value: "Fray Bartolomé de las Casas", id: 3},
    {value: "Lanquín", id: 4},
    {value: "Panzós", id: 5},
    {value: "Raxruha", id: 6},
    {value: "San Cristóbal Verapaz", id: 7},
    {value: "San Juan Chamelco", id: 8},
    {value: "Santa Cruz Verapaz", id: 9},
    {value: "Senahú", id: 10},
    {value: "Tactic", id: 11},
    {value: "Tucurú", id: 12},
    {value: "Santa Catarina La Tinta", id: 13}
                ];
      console.log("[response x1] "+JSON.stringify(message));	
      res.status(200).send(message);*/
    console.log("[response x1]");
    requestify.post(urlGetMunicipios, req.body).then(function (response) {
      console.log("[response x0].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x0] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 2) {
    console.log("[response x2]");
    requestify.post(urlPostCrearPersona, req.body).then(function (response) {
      console.log("[response x2].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
    /*var message = {};
    message.status = 1;
    message.mensaje = "La persona se registro correctamente";
    message.cui = 201314367;
    console.log("[response x2] "+JSON.stringify(message));	
    res.status(200).send(message);*/
  } else if (msg.flag == 3) {
    /*var message = {
       "cui": 20131436789,
       "nombre": "Carlos Estuardo",
       "apellido": "Gómez Rodríguez",
       "genero": "Masculino",
       "fechaNacimiento": "17/01/1996",
       "pais": "GUATEMALA",
       "departamento": "Guatemala", 
       "municipio": "San Miguel Petapa",
       "lugarNacimiento": "Ciudad de Guatemala",
       "cuiPadre": 14367903192,
       "nombrePadre": "Carlos Humberto",
       "apellidoPadre": "Gómez García",
       "fechaNacimientoPadre": "27/08/1973",
       "paisPadre": "GUATEMALA",
       "departamentoPadre": "Guatemala",
       "municipioPadre": "Ciudad de Guatemala",
       "cuiMadre": 100190922423,
       "nombreMadre": "Maida Yanet",
       "apellidoMadre": "Rodríguez Gómez",
       "fechaNacimientoMadre": "08/04/1975",
       "paisMadre": "GUATEMALA",
       "departamentoMadre": "Retalhuleu",
       "municipioMadre": "San Jose",
       "status": 1,
       "mensaje": "Consulta realizada correctamente",
       "flag": 3
    };
     console.log("[response x3] "+JSON.stringify(message));	
    res.status(200).send(message);*/
    console.log("[response x3]");
    requestify.post(urlPostObtenerPersona, req.body).then(function (response) {
      console.log("[response x3].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x3] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
  } else if (msg.flag == 4) {
    console.log("[response x4]");
    requestify.post(urlPostCrearMatrimonio, req.body).then(function (response) {
      console.log("[response x4].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
    /*var message = {};
    message.status = 1;
    message.mensaje = "Matrimonio registrado correctamente";
    console.log("[response x4] "+JSON.stringify(message));	
    res.status(200).send(message);*/
  } else if (msg.flag == 5) {
    console.log("[response x5]");
    requestify.post(urlPostObtenerMatrimonio, req.body).then(function (response) {
      console.log("[response x5].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x5] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
    /*var message = {
        "cuiHombre": 20131413,
        "nombreHombre": "Carlos Humberto",
        "apellidoHombre": "Gómez García",
        "paisHombre": "Guatemala",
        "departamentoHombre": "Guatemala",
        "municipioHombre": "Guatemala",
        "cuiMujer": 242302342,
        "nombreMujer": "Maida",
        "apellidoMujer": "Rodríguez",
        "paisMujer": "Guatemala",
        "departamentoMujer": "Retalhuleu",
        "municipioMujer": "San Jose",
        "municipio": "Guatemala",
        "lugarMatrimonio": "Ciudad de Guatemala",
        "fechaMatrimonio": "14-01-1995",
        "regimenMatrimonial": "MANCOMUNADO",
        "status": 1,
        "mensaje": "Matrimonio Ok"
      };
      console.log("[response x5] "+JSON.stringify(message));	
      res.status(200).send(message);  */
  } else if (msg.flag == 6) {
    console.log("[response x6]");
    requestify.post(urlPostCrearDivorcio, req.body).then(function (response) {
      console.log("[response x6].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
    /*var message = {};
     message.status = 1;
     message.mensaje = "Divorcio registrado correctamente";
     console.log("[response x6] "+JSON.stringify(message));	
    res.status(200).send(message);*/
  } else if (msg.flag == 7) {
    console.log("[response x7]");
    requestify.post(urlPostObtenerDivorcio, req.body).then(function (response) {
      console.log("[response x7].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x7] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
    /*var message = {
      "cuiHombre": 20131413,
      "nombreHombre": "Carlos Humberto",
      "apellidoHombre": "Gómez García",
      "paisHombre": "Guatemala",
      "departamentoHombre": "Guatemala",
      "municipioHombre": "Guatemala",
      "cuiMujer": 242302342,
      "nombreMujer": "Maida",
      "apellidoMujer": "Rodríguez",
      "paisMujer": "Guatemala",
      "departamentoMujer": "Retalhuleu",
      "municipioMujer": "San Jose",
      "municipio": "Guatemala",
      "lugarDivorcio": "Ciudad de Guatemala",
      "fechaDivorcio": "14-01-2022",
      "regimenMatrimonial": "NO MANCOMUNADO",
      "status": 1,
      "mensaje": "Divorcio Ok"
    };
    console.log("[response x7] "+JSON.stringify(message));	
    res.status(200).send(message);    	*/
  } else if (msg.flag == 8) {
    console.log("[response x8]");
    requestify.post(urlPostCreateDefuncion, req.body).then(function (response) {
      console.log("[response x8].. " + JSON.stringify(response));
      res.status(200).send(response.body);
    }).fail(function (response) {});
    /*var message = {};
     message.status = 1;
     message.mensaje = "Defunción registrada correctamente";
     console.log("[response x8] "+JSON.stringify(message));	
    res.status(200).send(message);*/
  } else if (msg.flag == 9) {
    console.log("[response x9]");
    requestify.post(urlPostObtenerDefuncion, req.body).then(function (response) {
      console.log("[response x9].. " + JSON.stringify(response));
      var aux = JSON.parse(response.body);
      console.log("[response x9] aux .. " + JSON.stringify(aux));
      res.status(200).send(aux);
    }).fail(function (response) {});
    /*var message = {
      "cui": 201312312312312,
      "nombre": "Victor",
      "apellido": "Urrutia",
      "genero": "Masculino",
      "fechaNacimiento": "12/08/1965",
      "pais": "Guatemala",
      "departamento": "Guatemala",
      "municipio": "chinautla",
      "lugarNacimiento": "Panzos",
      "estadoCivil": "Casado",
      "nombreConyuge": "Maria",
      "apellidoConyuge": "Gonzalez",
      "cuiCompareciente": 2423423423,
      "nombreCompareciente": "Julion",
      "apellidoCompareciente": "Alvarez",
      "paisCompareciente": "Guatemala",
      "departamentoCompareciente": "Suchitepequez",
      "municipioCompareciente": "Mazatenango",
      "residenciaCompareciente": "Mazatenango",
      "paisDefuncion": "Guatemala",
      "departamentoDefuncion": "Peten",
      "lugarDefuncion": "Mencos",
      "fechaDefuncion": "24/12/2018",
      "causa": "Asfixia",
      "status": 1,
      "mensaje": "Defuncion OK"
    };
    console.log("[response x9] "+JSON.stringify(message));	
    res.status(200).send(message);*/
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