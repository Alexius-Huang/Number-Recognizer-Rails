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
        console.log(`Number ${answer} is fed to the machine!`);
        clearCanvas();
      }
    });
  });

  $('#train').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'post',
      url: './train_classifier',
      dataType: 'json',
      success: function(data) {
        console.log(`Classifier trained!`);
      }
    });
  });

  $('#predict').on('click', function(event) {
    event.preventDefault();
    var canvas = document.getElementById('main-canvas');
    var mime = 'image/jpeg';
    var imgURL = canvas.toDataURL(mime);
    var answer = parseInt($('input[type="radio"]:checked').val());
    $.ajax({
      type: 'post',
      url: './predict',
      data: { img_base64: imgURL, answer: answer },
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(`Expected: ${answer} Got: ${data.result}`)
      }
    });
  });
});

function clearCanvas() {
  var canvas = document.getElementById('main-canvas'); 
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 300);
  }
}