$(document).ready(function() {
  function initializeTable() {
    chrome.storage.sync.get('domains', function(obj) {
      for (var i in obj['domains']) {
        var entry = obj['domains'][i];
        var row = document.getElementById("urls_table").insertRow();
        var domain = entry.domain;
        var active = entry.active;
        row.insertCell(0).innerHTML = domain;
        if (active) {
          row.insertCell(1).innerHTML = '<input type="checkbox" checked>';
        } else {
          row.insertCell(1).innerHTML = '<input type="checkbox">';
        }
      }    
    }); 
  }

  initializeTable();

  var input = document.getElementById('new_url');
  input.onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      // Enter pressed
      var row = document.getElementById("urls_table").insertRow();
      var domain = input.value;
      input.value = '';
      row.insertCell(0).innerHTML = domain;
      row.insertCell(1).innerHTML = '<input type="checkbox" checked>';

      chrome.storage.sync.get('domains', function(obj) {
        var domains = obj['domains'];
        if (domains == undefined) {
          domains = [{'domain':domain, 'active': true}]; 
        } else {
          domains.push({'domain':domain, 'active': true});
        }

        chrome.storage.sync.set({'domains': domains}, function() {});
      });

      return false;
    }
  }
});
