// Recebe os pedidos da vitrine e grava uma linha por pedido na planilha.
// Como usar: Planilha Google → Extensões → Apps Script → cole este arquivo →
// Implantar → Nova implantação → Tipo "App da Web" → Executar como: Eu →
// Quem pode acessar: Qualquer pessoa → copie a URL que termina em /exec.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Data", "Nome", "Contato", "Serviço", "O que quer resolver", "Orçamento"]);
  }
  var p = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(p.data),
    p.nome,
    p.contato,
    p.servico,
    p.problema,
    p.orcamento || "Não informado",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
