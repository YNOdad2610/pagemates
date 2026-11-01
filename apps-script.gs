// Pagemates signup collector — paste into the "Pagemates signups" sheet:
// Extensions → Apps Script, replace everything, Save, then Deploy → New deployment →
// type "Web app", Execute as "Me", Who has access "Anyone". Copy the Web app URL.

const MAX_LEN = 200;

// Strip leading = + - @ so a visitor can't plant a formula in your sheet.
function clean(v) {
  let s = String(v == null ? "" : v).slice(0, MAX_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const now = new Date();
    if (d.type === "signup") {
      ss.getSheetByName("signups").appendRow([
        now, clean(d.email), clean(d.book), clean(d.book_title), clean(d.slot),
        clean(d.format), clean(d.city), clean(d.source), clean(d.test_id), clean(d.at)
      ]);
    } else if (["page_view", "book_select"].indexOf(d.type) !== -1) {
      ss.getSheetByName("events").appendRow([
        now, d.type, clean(d.book), clean(d.source), clean(d.test_id), clean(d.at)
      ]);
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error");
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the URL in a browser to check the deployment is live.
function doGet() {
  return ContentService.createTextOutput("Pagemates collector is running.");
}
