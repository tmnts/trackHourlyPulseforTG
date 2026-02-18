function trackHourlyPulse() {
  const API_TOKEN = 'WHERE_YOUR_TOKEN_AT';
  const CHANNEL_ID = 'WHERE_YOUR_CHANNEL_AT'; 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 1. Стучимся в API за детальной статой
  const url = 'https://api.tgstat.ru/channels/stat?token=' + API_TOKEN + '&channelId=' + CHANNEL_ID;
  
  try {
    const response = UrlFetchApp.fetch(url, {"muteHttpExceptions": true});
    const json = JSON.parse(response.getContentText());
    
    if (json.status === 'ok') {
      const data = json.response;
      
      const followers = data.participants_count;
      const avgReach = data.avg_post_reach; // Средний охват поста
      const err = data.err_percent; // ERR от подписчиков
      const timestamp = new Date();
      
      // Считаем дельту подписок
      const lastRow = sheet.getLastRow();
      let delta = 0;
      if (lastRow > 1) {
        const prevValue = sheet.getRange(lastRow, 2).getValue();
        delta = followers - prevValue;
      }
      
      // Записываем: Время | Подписчики | +/- | Средний охват | ERR %
      sheet.appendRow([timestamp, followers, delta, avgReach, err + "%"]);
      
      // Стилизация (наводим лоск для презентации)
      const lastRowIdx = sheet.getLastRow();
      const deltaCell = sheet.getRange(lastRowIdx, 3);
      if (delta > 0) deltaCell.setFontColor("green").setValue("+" + delta);
      if (delta < 0) deltaCell.setFontColor("red");
      
      // Подсвечиваем ERR если он выше 15% (наш стандарт "живого" канала)
      if (err >= 15) {
        sheet.getRange(lastRowIdx, 5).setBackground("#d9ead3").setFontWeight("bold");
      }
      
    } else {
      Logger.log("Ошибка API: " + json.error);
    }
  } catch (e) {
    Logger.log("Критический сбой: " + e.message);
  }
}
