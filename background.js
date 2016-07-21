
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {

    chrome.storage.sync.get('domains', function(obj) {
      for (var i in obj['domains']) {
        var entry = obj['domains'][i];
        if (entry.active) {
          if (changeInfo.url.search(entry.domain) != -1) {
            var createData = {url: changeInfo.url, incognito: true};
            chrome.windows.create(createData, function() {
            });
          }
        }
      }
    });
  }
});

