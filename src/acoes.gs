/**
 * Salva um novo processo ou atualiza um existente (dados: object)
 */
function cadastrarNovoProcesso(dados) {

  // definindo atributos do processo
  var planilha = consultaAba("Processos");
  var idCliente = buscarOuCriarCliente(dados.nome, dados.cpf);
  var contrato = gerarProximoContrato();
  var idProcesso = "PROCESSO_" + planilha.getLastRow();
  var dataAgora = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm:ss");

  // criando uma lista com os atributos
  var novaLinha = [
    idProcesso,
    idCliente,
    dados.produtoId, 
    dados.unidadeId, 
    contrato, 
    converterParaNumero(dados.valor), 
    dados.garantia, 
    "INICIADO", 
    dataAgora, dataAgora
  ];

  //enviando o processo criado para a planilha
  planilha.appendRow(novaLinha);
  return "Processo salvo com sucesso!";
}

/**
 * Atualiza os dados do processo na planilha (idProcesso: string, dados: object)
 */
function atualizarProcessoNoServidor(idProcesso, dados) {
  var planilha = consultaAba("Processos");
  var dadosPlanilha = buscarDadosDaAba("Processos")
  var idCliente = buscarOuCriarCliente(dados.nome, dados.cpf);
  var dataAgora = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm:ss");

  //percorre a planilha processo
  for (var i = 1; i < dadosPlanilha.length; i++) {
    //se o id for igual set atualiza os dados
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

/**
 * Busca o cliente e se não achar ele cria (nome: string, cpf: string)
 */
function buscarOuCriarCliente(nome, cpf) {
  var planilha = consultaAba("Clientes");
  var clientes = buscarDadosDaAba("Clientes");
  var nomeBusca = nome.trim().toUpperCase();

  // percorre a planilha cliente buscando pelo nome igual 
  for (var i = 1; i < clientes.length; i++) {
    if (clientes[i][1].toString().toUpperCase() == nomeBusca) {
      return clientes[i][0];
    }
  }

  // e se não achar na planilha ele é criado
  var novoId = "CLIENTE_" + planilha.getLastRow();
  planilha.appendRow([novoId, nomeBusca, cpf]);
  return novoId;
}

/**
 * Retorna os dados em objeto das planilhas (Produtos, Unidades, Clientes) para aparecer no select
 */
function obterDadosParaSelects() {
  //definir os dados da tabelas
  var produtos = buscarDadosDaAba("Produtos");
  var unidades = buscarDadosDaAba("Unidades");
  var clientes = buscarDadosDaAba("Clientes");

  // somente limpa os dados da planilha para poder retornar na função obterDadosParaSelects() como objeto
  function limpar(lista, colId, colNome) {
  return lista.slice(1) // Pula o cabeçalho
    .map(r => ({ id: r[colId], nome: String(r[colNome]) })) // mapeia os dados em objeto
    .sort((a, b) => a.nome.localeCompare(b.nome)); // Organiza de A a Z
}

  // retorna o object com os dados das tabelas para os select do frontend
  return {
    produtos: limpar(produtos, 0, 2),
    unidades: limpar(unidades, 0, 2),
    clientes: limpar(clientes, 0, 1)
  };
}

/**
 * Excluir um processso na planilha pelo id (id: String) -> PROCESSO_X
 */
function excluirProcessoNoServidor(idProcesso) {
  //define a tabela e os dados dela
  var planilha = consultaAba("Processos");
  var dados = buscarDadosDaAba("Processos");

  //percorre os dados da tabela procurando o id
  for (var i = 1; i < dados.length; i++) {
    // se o id dos dados for igual ao id do parametro
    if (dados[i][0] == idProcesso) {
      //delete a linha +1
      planilha.deleteRow(i + 1);
      return "Excluído!";
    }
  }
}