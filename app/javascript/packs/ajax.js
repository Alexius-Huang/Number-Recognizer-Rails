$(document).ready(function() {
  $('#feed').on('click', function(event) {
    event.preventDefault();
    var canvas = document.getElementById('main-canvas');
    var mime = 'image/jpeg';
    var imgURL = canvas.toDataURL(mime);
    var answer = parseInt($('input[type="radio"]:checked').val());
    var inputOptions = new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          0: '0',
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6',
          7: '7',
          8: '8',
          9: '9',
        })
      }, 1000)
    })
    $.ajax({
      type: 'post',
      url:  './feed',
      data: { imgURL: imgURL, target: answer },
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
      }
    });
  });
});