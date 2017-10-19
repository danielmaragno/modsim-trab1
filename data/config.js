var config = {
	"TEC1": {
		"metodo": "constante",
		"valor": 3000
	},
	"TEC2": {
		"metodo": "constante",
		"valor": 4000
	},

	"TS1": {
		"metodo": "constante",
		"valor": 1000
	},
	"TS2": {
		"metodo": "constante",
		"valor": 1000
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