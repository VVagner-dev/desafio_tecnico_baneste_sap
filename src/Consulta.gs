//Retorna os dados de uma aba atravez do nome da aba | (nomaDaAba : string) 
function buscarDadosDaAba(nomeDaAba) {
  const aba = consultaAba(nomeDaAba);
  return aba.getDataRange().getValues();
}

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

//retorna uma lista organizada dos processos (id, nome, produto, unidade, contrato, garantia, status)
function getProcessoCompleto(){
  let lista = []
  const processoDados = buscarDadosDaAba("Processos");
  const mapCliente = gerarMapGenerico("Clientes",0,1)
  const mapProdutos = gerarMapGenerico("Produtos",0,2)
  const mapUnidades = gerarMapGenerico("Unidades",0,2)

  for(let i = 1;i<processoDados.length;i++){
    const linha = processoDados[i]
    // crianto o objeto processo com as conexões com as outras abas (nome, produto, unidade)
    const processo = {
       id : linha[0],
       nome : mapCliente[linha[1]],
       produto : mapProdutos[linha[2]],
       unidade : mapUnidades[linha[3]],
       contrato : linha[4],
       valor : converterValorTextoParaNumero(linha[5]),
       garantia : linha[6],
       status : linha[7],
       eViavel :  eViavel(linha[5],linha[6])
    } 
    lista.push(processo);
  }
return lista;
}

function consultaAba(nomeAba){
  return SpreadsheetApp.getActiveSpreadsheet().planilha.getSheetByName(nomeAba);
}