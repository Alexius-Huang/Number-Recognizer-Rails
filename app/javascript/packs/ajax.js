$(document).ready(function() {
  $('#feed').on('click', function(event) {
    event.preventDefault();
    var canvas = document.getElementById('main-canvas');
    var mime = 'image/jpeg';
    var imgURL = canvas.toDataURL(mime);
    var answer = parseInt($('input[type="radio"]:checked').val());
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

  $('#train').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'post',
      url: './train_classifier',
      dataType: 'json',
      sucess: function(data) {
        console.log(data)
      }
    })
  })
});