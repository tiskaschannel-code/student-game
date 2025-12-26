function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.studentId, data.name, data.points, data.item]);
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  var summary = {};
  for (var i = 1; i < data.length; i++) {
    var name = data[i][2];
    var pts = parseInt(data[i][3]);
    summary[name] = (summary[name] || 0) + pts;
  }
  var sorted = Object.keys(summary).map(k => ({name: k, score: summary[k]}))
               .sort((a,b) => b.score - a.score).slice(0, 10);
  return ContentService.createTextOutput(JSON.stringify(sorted)).setMimeType(ContentService.MimeType.JSON);
}
