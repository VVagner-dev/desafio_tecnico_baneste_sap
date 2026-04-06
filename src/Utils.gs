/**
 * Lógica de viabilidade baseada em Valor e Garantia
 */
function calcularViabilidade(valorTexto, garantia) {
  var valor = converterParaNumero(valorTexto);
  
  // Regra: > 15k com garantia é Prioridade[cite: 1]
  if (valor >= 15000) {
    if (garantia.toUpperCase() != "NENHUMA") {
      return "PRIORIDADE";
    }
    return "VIAVEL";
  }
  return "NÃO VIAVEL";
}

/**
 * Transforma R$ 1.234,56 em 1234.56
 */
function converterParaNumero(valor) {
  if (typeof valor == "number") return valor;
  var limpo = valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
  return parseFloat(limpo) || 0;
}

function gerarProximoContrato() {
  var planilha = aba("Processos");
  var ultima = planilha.getLastRow();
  if (ultima <= 1) return "0015001209";

  var ultimo = planilha.getRange(ultima, 5).getValue().toString();
  var proximo = parseInt(ultimo, 10) + 1;
  return proximo.toString().padStart(ultimo.length, "0");
}