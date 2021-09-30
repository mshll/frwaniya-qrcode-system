

// get url params
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'), sParameterName, i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  return false;
};

// Generate random ID func
function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
// =====================


$(document).ready(function () { 


// Check url path
pathURL = window.location.pathname;
// * IF HOMEPAGE
if (pathURL == '/') {

  

  document.getElementById("uuid").value = guidGenerator(); // generate random id

  // * Handle form etc
  // Send data
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwwReEPH6Uaf6v_4ZPeGUva57jx7I66_yk26mByAYy3SXB-wfRyAvqCzgVwlkDQmHzu4A/exec';
  const form = document.forms['submit-to-google-sheet'];

  form.addEventListener('submit', e => {
    $('.form-status-success').css('display', 'none');
    $('.form-status-error').css('display', 'none');
    $('#submit-btn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="color: darkgray;"></span>');
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(function (response) { 
        $('.form-status-success').css('display', 'block');
        $('#submit-btn').html('إرسال');
        
        window.location.href = "/info/?uuid=" + document.getElementById("uuid").value;


        form.reset();
      })
    .catch(function (error) { 
      $('.form-status-error').css('display', 'block');
      $('#submit-btn').html('إرسال');
     })
  });

  // Restricts input for the set of matched elements to the given inputFilter function.
(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));

  $("#input1").inputFilter(function(value) {
    return /^\d*$/.test(value);    // Allow digits only, using a RegExp
  });


  // * IF INFO PAGE
} else if (pathURL == '/info/') {



// Recieve data
const spreadsheetId = '1-9PVqqaqHI0Y8jAEg6wIrbxM9fkJUjdubmnLu8EDqvA'
fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));

    const uuidd = getUrlParameter('uuid');
    var foundIndex = -1;

      json.table.rows.forEach(function (row, rowIndex) { 
        console.log(row.c[1].v);
        if (row.c[1].v === uuidd) {
          foundIndex = rowIndex;
        }
       });

       if (foundIndex > -1) {
        json.table.rows[foundIndex].c.forEach(function (col, colIndex) { 
          console.log(col.v, colIndex);
         });
         $('#txt1').html(json.table.rows[foundIndex].c[3].v);
         $('#txt2').html(json.table.rows[foundIndex].c[2].v);
         $('#txt3').html(json.table.rows[foundIndex].c[4].v);
         $('#txt4').html(json.table.rows[foundIndex].c[5].v);
         $('#txt5').html(json.table.rows[foundIndex].c[6].v);

       } else {
        window.location.replace("/");
       }
});


}











 })