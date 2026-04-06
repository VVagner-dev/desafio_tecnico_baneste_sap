// Injeta scripts JS ou CSS dentro do HTML
function include(nomeArquivo) {
  return HtmlService.createHtmlOutputFromFile(nomeArquivo).getContent();
}

// Carrega a página principal
function doGet(e) {
  return HtmlService.createTemplateFromFile('Cliente')
    .evaluate()
    .setTitle('Sistema de Processos - Banestes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}