/**
 * Lógica de viabilidade baseada em Valor e Garantia (valorTexto: string, garantia:string)
 */
function calcularViabilidade(valorTexto, garantia) {
  //converte o valor texto para valor number
  var valorNumber = converterParaNumero(valorTexto);
  
  //se o valor for >= 15k é VIAVEL
  if (valorNumber >= 15000) {
    //e se for >= 15k e ter garantia ele é PRIORIDADE
    if (garantia.toUpperCase() != "NENHUMA") {
      return "PRIORIDADE";
    }
    return "VIAVEL";
  }
  //e se não for nenhum dos dois acima ele é NÃO VIAVEL
  return "NÃO VIAVEL";
}

/**
 * Transforma R$ 1.234,56 em 1234.56 (valor: String) se (valor:number -> retorna direto)
 */
function converterParaNumero(valor) {
  //se o valor for number retorna
  if (typeof valor == "number") return valor;

  var limpo = valor
      .replace("R$", "")    // remove o R$                R$ 1.234,56 -> 1.234,56
      .replace(/\./g, "")   //remove o . em milhar         1.234,56 -> 1234,56
      .replace(",", ".")    //troca a virgula por ponto   1234,56 -> 1234.56
      .trim();              //remova os espaços
  return parseFloat(limpo) || 0;
}


/**
 * Retorna a ultima linha do CÓD. DO CONTRATO+1
 */
function gerarProximoContrato() {
  var planilha = consultaAba("Processos");
  var ultima = planilha.getLastRow(); // pega o numero ultima linha
  if (ultima <= 1) return "0015001209"; //se não tiver processo ele cria 

  var ultimo = planilha.getRange(ultima, 5).getValue().toString(); //pega o dado da ultima linha da 5º colune
  var proximo = parseInt(ultimo, 10) + 1; //transforma em int e adiciona + 1 = 0015001209" + 1 -> 0015001210
  return proximo.toString().padStart(ultimo.length, "0"); // adiciona os zeros no começo = 15001210 -> 0015001210
}