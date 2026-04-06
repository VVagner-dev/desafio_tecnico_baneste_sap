// Atalho para pegar uma aba pelo nome
function aba(nome) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(nome);
}

/**
 * Pega todos os processos e troca os IDs pelos nomes reais
 */
function getProcessoCompleto() {
  var dadosProcessos = aba("Processos").getDataRange().getValues();
  var dadosClientes = aba("Clientes").getDataRange().getValues();
  var dadosProdutos = aba("Produtos").getDataRange().getValues();

  var listaParaTabela = [];

  // Começa do 1 para pular o cabeçalho
  for (var i = 1; i < dadosProcessos.length; i++) {
    var linha = dadosProcessos[i];
    
    var idCli  = linha[1];
    var idProd = linha[2];
    var valor  = linha[5];
    var garan  = linha[6];

    // Busca o nome do cliente manualmente
    var nomeCli = "Não encontrado";
    for (var c = 1; c < dadosClientes.length; c++) {
      if (dadosClientes[c][0] == idCli) {
        nomeCli = dadosClientes[c][1];
        break;
      }
    }

    // Busca o nome do produto manualmente
    var nomeProd = "Não encontrado";
    for (var p = 1; p < dadosProdutos.length; p++) {
      if (dadosProdutos[p][0] == idProd) {
        nomeProd = dadosProdutos[p][2];
        break;
      }
    }

    listaParaTabela.push({
      id: linha[0],
      nome: nomeCli,
      produto: nomeProd,
      produtoId: idProd,
      unidadeId: linha[3],
      contrato: linha[4],
      valor: valor,
      garantia: garan,
      status: linha[7],
      eViavel: calcularViabilidade(valor, garan) // Regra de negócio
    });
  }
  return listaParaTabela;
}

/**
 * Salva um novo processo ou atualiza um existente
 */
function cadastrarNovoProcesso(dados) {
  var planilha = aba("Processos");
  var idCliente = buscarOuCriarCliente(dados.nome, dados.cpf);
  var contrato = gerarProximoContrato();
  var idProcesso = "PROC_" + new Date().getTime();
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
  var planilha = aba("Processos");
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
  var planilha = aba("Clientes");
  var clientes = planilha.getDataRange().getValues();
  var nomeBusca = nome.trim().toUpperCase();

  for (var i = 1; i < clientes.length; i++) {
    if (clientes[i][1].toString().toUpperCase() == nomeBusca) {
      return clientes[i][0];
    }
  }

  var novoId = "CLI_" + new Date().getTime();
  planilha.appendRow([novoId, nomeBusca, cpf]);
  return novoId;
}

function obterDadosParaSelects() {
  var p = aba("Produtos").getDataRange().getValues();
  var u = aba("Unidades").getDataRange().getValues();
  var c = aba("Clientes").getDataRange().getValues();

  function limpar(lista, colId, colNome) {
    var aux = [];
    for (var i = 1; i < lista.length; i++) {
      if (lista[i][colNome] != "") {
        aux.push({ id: lista[i][colId], nome: String(lista[i][colNome]) });
      }
    }
    return aux.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  return {
    produtos: limpar(p, 0, 2),
    unidades: limpar(u, 0, 2),
    clientes: limpar(c, 0, 1)
  };
}

function excluirProcessoNoServidor(id) {
  var planilha = aba("Processos");
  var dados = planilha.getDataRange().getValues();
  for (var i = 1; i < dados.length; i++) {
    if (dados[i][0] == id) {
      planilha.deleteRow(i + 1);
      return "Excluído!";
    }
  }
}