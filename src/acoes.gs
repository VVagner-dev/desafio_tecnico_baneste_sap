

/**
 * Salva um novo processo ou atualiza um existente
 */
function cadastrarNovoProcesso(dados) {
  var planilha = consultaAba("Processos");
  var idCliente = buscarOuCriarCliente(dados.nome, dados.cpf);
  var contrato = gerarProximoContrato();
  var idProcesso = "PROCESSO_" + planilha.getLastRow();
  var dataAgora = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm");

  var novaLinha = [
    idProcesso, idCliente, dados.produtoId, dados.unidadeId, 
    contrato, converterParaNumero(dados.valor), dados.garantia, 
    "INICIADO", dataAgora, dataAgora
  ];

  planilha.appendRow(novaLinha);
  return "Processo salvo com sucesso!";
}

function atualizarProcessoNoServidor(idProcesso, dados) {
  var planilha = consultaAba("Processos");
  var dadosPlanilha = planilha.getDataRange().getValues();
  var idCliente = buscarOuCriarCliente(dados.nome, dados.cpf);
  var dataAgora = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm");

  for (var i = 1; i < dadosPlanilha.length; i++) {
    if (dadosPlanilha[i][0] == idProcesso) {
      var linha = i + 1;
      planilha.getRange(linha, 2).setValue(idCliente);
      planilha.getRange(linha, 3).setValue(dados.produtoId);
      planilha.getRange(linha, 4).setValue(dados.unidadeId);
      planilha.getRange(linha, 6).setValue(converterParaNumero(dados.valor));
      planilha.getRange(linha, 7).setValue(dados.garantia);
      planilha.getRange(linha, 8).setValue(dados.status);
      planilha.getRange(linha, 10).setValue(dataAgora);
      return "Processo atualizado!";
    }
  }
}

function buscarOuCriarCliente(nome, cpf) {
  var planilha = consultaAba("Clientes");
  var clientes = planilha.getDataRange().getValues();
  var nomeBusca = nome.trim().toUpperCase();

  for (var i = 1; i < clientes.length; i++) {
    if (clientes[i][1].toString().toUpperCase() == nomeBusca) {
      return clientes[i][0];
    }
  }

  var novoId = "CLIENTE_" + planilha.getLastRow();
  planilha.appendRow([novoId, nomeBusca, cpf]);
  return novoId;
}

function obterDadosParaSelects() {
  var p = consultaAba("Produtos").getDataRange().getValues();
  var u = consultaAba("Unidades").getDataRange().getValues();
  var c = consultaAba("Clientes").getDataRange().getValues();

  function limpar(lista, colId, colNome) {
  return lista.slice(1) // Pula o cabeçalho
    .map(r => ({ id: r[colId], nome: String(r[colNome]) })) // Transforma em objeto
    .sort((a, b) => a.nome.localeCompare(b.nome)); // Organiza de A a Z
}

  return {
    produtos: limpar(p, 0, 2),
    unidades: limpar(u, 0, 2),
    clientes: limpar(c, 0, 1)
  };
}

function excluirProcessoNoServidor(id) {
  var planilha = consultaAba("Processos");
  var dados = planilha.getDataRange().getValues();
  for (var i = 1; i < dados.length; i++) {
    if (dados[i][0] == id) {
      planilha.deleteRow(i + 1);
      return "Excluído!";
    }
  }
}