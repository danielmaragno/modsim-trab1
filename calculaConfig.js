
function calculaConfig() {
	var config = {};

	config.TEC1 = {
		"metodo": $("#TEC1").find("select[name='metodo']").val(),
		"a": parseFloat($("#TEC1").find("input[name='a']").val()),
		"b": parseFloat($("#TEC1").find("input[name='b']").val()),
		"c": parseFloat($("#TEC1").find("input[name='c']").val())
	};
	config.TEC2 = {
		"metodo": $("#TEC2").find("select[name='metodo']").val(),
		"a": parseFloat($("#TEC2").find("input[name='a']").val()),
		"b": parseFloat($("#TEC2").find("input[name='b']").val()),
		"c": parseFloat($("#TEC2").find("input[name='c']").val())
	};
	config.TS1 = {
		"metodo": $("#TS1").find("select[name='metodo']").val(),
		"a": parseFloat($("#TS1").find("input[name='a']").val()),
		"b": parseFloat($("#TS1").find("input[name='b']").val()),
		"c": parseFloat($("#TS1").find("input[name='c']").val())
	};
	config.TS2 = {
		"metodo": $("#TS2").find("select[name='metodo']").val(),
		"a": parseFloat($("#TS2").find("input[name='a']").val()),
		"b": parseFloat($("#TS2").find("input[name='b']").val()),
		"c": parseFloat($("#TS2").find("input[name='c']").val())
	};

	config.FALHA1 = {};
	config.FALHA1.entre_falhas = {
		"metodo": $("#Falha1_entre_falhas").find("select[name='metodo']").val(),
		"a": parseFloat($("#Falha1_entre_falhas").find("input[name='a']").val()),
		"b": parseFloat($("#Falha1_entre_falhas").find("input[name='b']").val()),
		"c": parseFloat($("#Falha1_entre_falhas").find("input[name='c']").val())
	};

	config.FALHA1.em_falha = {
		"metodo": $("#Falha1_em_falha").find("select[name='metodo']").val(),
		"a": parseFloat($("#Falha1_em_falha").find("input[name='a']").val()),
		"b": parseFloat($("#Falha1_em_falha").find("input[name='b']").val()),
		"c": parseFloat($("#Falha1_em_falha").find("input[name='c']").val())
	};

	config.FALHA2 = {};
	config.FALHA2.entre_falhas = {
		"metodo": $("#Falha2_entre_falhas").find("select[name='metodo']").val(),
		"a": parseFloat($("#Falha2_entre_falhas").find("input[name='a']").val()),
		"b": parseFloat($("#Falha2_entre_falhas").find("input[name='b']").val()),
		"c": parseFloat($("#Falha2_entre_falhas").find("input[name='c']").val())
	};

	config.FALHA2.em_falha = {
		"metodo": $("#Falha2_em_falha").find("select[name='metodo']").val(),
		"a": parseFloat($("#Falha2_em_falha").find("input[name='a']").val()),
		"b": parseFloat($("#Falha2_em_falha").find("input[name='b']").val()),
		"c": parseFloat($("#Falha2_em_falha").find("input[name='c']").val())
	};

	config.SERVER1MaxFila = parseFloat($("#SERVER1MaxFila").find('input').val());
	config.SERVER2MaxFila = parseFloat($("#SERVER2MaxFila").find('input').val());
	config.SimulationTime = parseFloat($("#SimulationTime").find('input').val());

	console.log(config);


	return config;
}