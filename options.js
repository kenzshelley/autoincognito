$(document).ready(function() {
  var input = document.getElementById('new_url');
  input.onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      // Enter pressed
      console.log('Pressed enter!');
      var row = document.getElementById("urls_table").insertRow();
      row.insertCell(0).innerHTML = input.value;
      row.insertCell(1).innerHTML = '<input type="checkbox" checked>';
      input.value = '';

      return false;
    }
  }
});
