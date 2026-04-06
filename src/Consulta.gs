//retorna um map generico entre duas colunas | (nomeDaAba: string,colunaId: number, colunaNome: number )
function gerarMapGenerico(nomeDaAba, colunaId, colunaNome){
  const aba = buscarDadosDaAba(nomeDaAba);
  let dicionario = {}

  // cria um dicinario ligando colunaId : colunaNome para cada item
  for(let i = 1;i<aba.length;i++){
    const dadosId = aba[i][colunaId];
    const dadosNome = aba[i][colunaNome];

    dicionario[dadosId] = dadosNome;
  }
  return dicionario;
}

/**
 * Pega todos os processos e troca os IDs pelos nomes reais
 */
function getProcessoCompleto() {
  var dadosProcessos = consultaAba("Processos").getDataRange().getValues();
  var dadosClientes = consultaAba("Clientes").getDataRange().getValues();
  var dadosProdutos = consultaAba("Produtos").getDataRange().getValues();

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
  return listaParaTabela.reverse();
}

//Retorna os dados de uma aba atravez do nome da aba | (nomaDaAba : string) 
function buscarDadosDaAba(nomeDaAba) {
  return consultaAba(nomeDaAba).getDataRange().getValues();
}

//Retorna a planilha atravez do nome da aba | (nomaDaAba : string) 
function consultaAba(nomeAba){
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nomeAba);
}