var CONFIG = {
	"TEC1": {
		"metodo": "exponencial",
		"a": 0.0001
	},
	"TEC2": {
		"metodo": "uniforme",
		"a": 3500,
		"b": 5000
	},

	"TS1": {
		"metodo": "normal",
		"media": 1000,
		"desvio": 100
	},
	"TS2": {
		"metodo": "triangular",
		"a": 800,
		"b": 1200,
		"c": 1500
	},
	"FALHA1": {
		"entre_falhas": {
			"metodo": "constante",
			"valor": 10000
		},
		"em_falha": {
			"metodo": "constante",
			"valor": 8000	
		}
	},

	"FALHA2": {
		"entre_falhas": {
			"metodo": "constante",
			"valor": 20000
		},
		"em_falha": {
			"metodo": "constante",
			"valor": 15000	
		}
	},

	// Tamanho máximo de cada fila (-1 corresponde a tamanho infinito)
	"SERVER1MaxFila": -1,
	"SERVER2MaxFila": -1,

	"SimulationTime": 60000
	
};