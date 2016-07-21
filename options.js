$(document).ready(function() {
  function toggleActive() {
    var cb = $(this)[0];
    if (cb.parentNode == undefined) return;
    var domain = cb.parentNode.previousElementSibling.innerHTML;

    chrome.storage.sync.get('domains', function(obj) {
      var domains = obj['domains'];
      if (domains == undefined) return;

      if (cb.checked) {
        domains[domain] = true;
      } else {
        domains[domain] = false;
      }

      chrome.storage.sync.set({'domains': domains}, function() {});
    });
  }

  $(document).on('click', '.active', $(this),  toggleActive);

  function initializeTable() {
    chrome.storage.sync.get('domains', function(obj) {
      for (var domain in obj['domains']) {
        var row = document.getElementById("urls_table").insertRow();
        var active = obj['domains'][domain];
        row.insertCell(0).innerHTML = domain;
        if (active) {
          var newCell = row.insertCell(1)
          newCell.innerHTML = '<input class="active" type="checkbox" checked>';
          var inputs = newCell.getElementsByTagName('input');
          var input = inputs[0];
        } else {
          var newCell = row.insertCell(1);
          newCell.innerHTML = '<input class="active" type="checkbox">';
          var inputs = newCell.getElementsByTagName('input');
          var input = inputs[0];
        }
      }    
    }); 
  }

  initializeTable();

  var domainInput = document.getElementById('new_url');
  domainInput.onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      // Enter pressed
      var row = document.getElementById("urls_table").insertRow();
      var domain = domainInput.value;
      domainInput.value = '';
      row.insertCell(0).innerHTML = domain;
      var newCell = row.insertCell(1)
      newCell.innerHTML = '<input class="active" type="checkbox" checked>';
      var inputs = newCell.getElementsByTagName('input');
      var input = inputs[0];

      chrome.storage.sync.get('domains', function(obj) {
        var domains = obj['domains'];
        if (domains == undefined) {
          domains = {};
        } 
        domains[domain] = true;

        chrome.storage.sync.set({'domains': domains}, function() {});
      });

      return false;
    }
  }
});
