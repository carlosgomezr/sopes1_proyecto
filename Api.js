const { Router } = require("express");
/*
 * ubicaciones: estructura de datos para ubicaciones estaticas
 */


module.exports = (router = new Router()) => {
  /*
  * endpoint para solicitar ubicacion de un piloto
  * parametros a recibir:
  *     ->id del piloto
  * tipo resuesta:json
  * formato respuesta: {idpiloto:777,Nombre:"..."}

 */
  router.get("/", async (req, res) => {
   
    res.sendFile("index.html", {root: '.'});
  });
  return router;
};
