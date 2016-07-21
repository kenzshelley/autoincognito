
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {

    chrome.storage.sync.get('domains', function(obj) {
      for (var domain in obj['domains']) {
        var active = obj['domains'][domain];
        if (active) {
          if (changeInfo.url.search(domain) != -1) {
            var createData = {url: changeInfo.url, incognito: true};
            chrome.windows.create(createData, function() {});
          }
        }
      }
    });
  }
});

