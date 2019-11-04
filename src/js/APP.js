var APP = {
	municipio: [],
	selectedGroup: "5",
	developer: false,
	ipServer: "localhost:8081",
	urlCrearNacimiento: "registrarNacimiento",
	urlCrearMatrimonio: "registrarMatrimonio",
	urlCrearDivorcio: "registrarDivorcio",
	urlCrearDefuncion: "registrarDefuncion",
	urlActualizarDPI: "actualizarDPI",
	urlConsultarNacimiento: "imprimirNacimiento",
	urlConsultarMatrimonio: "imprimirMatrimonio",
	urlConsultarDivorcio: "imprimirDivorcio",
	urlConsultarDefuncion: "imprimirDefuncion",
	urlConsultarDPI: "consultarDPI",
	urlConsultarDepartamentos: "obtenerListaDepartamentos",
	urlConsultarMunicipios: "obtenerListaMunicipios",
	SEPARATOR: "/",
	GROUP: "Grupo",
	/*
	flag
	0	depto
	1	municipio
	2	crearNacimiento
	3	consultarNacimiento
	4	crearMatrimonio
	5	consultarMatrimonio
	6	crearDivorcio
	7	consultarDivorcio
	8	crearDefuncion
	9	consultarDefuncion
	10	actualizarDPI
	11	consultarDPI
	*/
	buildURL: function(flag){
		var urlResult = "https://us-central1-elated-scope-174804.cloudfunctions.net/function-2";
		if(!APP.developer)
		{
			urlResult = APP.ipServer + APP.SEPARATOR + APP.getURLService(flag) + APP.GROUP + APP.selectedGroup; 
		}
		console.log("[buildURL]: " + urlResult);
		return urlResult;
	},
	getURLService: function(flag){
		if(flag == 0){
			return APP.urlConsultarDepartamentos;
		}
		else if(flag == 1){
			return APP.urlConsultarMunicipios;
		}
		else if(flag == 2){
			return APP.urlCrearNacimiento;
		}
		else if(flag == 3){
			return APP.urlConsultarNacimiento;
		}
		else if(flag == 4){
			return APP.urlCrearMatrimonio;
		}
		else if(flag == 5){
			return APP.urlConsultarMatrimonio;
		}
		else if(flag == 6){
			return APP.urlCrearDivorcio;
		}
		else if(flag == 7){
			return APP.urlConsultarDivorcio;
		}
		else if(flag == 8){
			return APP.urlCrearDefuncion;
		}
		else if(flag == 9){
			return APP.urlConsultarDefuncion;
		}
		else if(flag == 10){
			return APP.urlActualizarDPI;
		}
		else if(flag == 11){
			return APP.urlConsultarDPI;
		}
	}
};