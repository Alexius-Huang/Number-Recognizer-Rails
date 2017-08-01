$(document).ready(function() {
  $('#feed').on('click', function(event) {
    event.preventDefault();
    var canvas = document.getElementById('main-canvas');
    var mime = 'image/jpeg';
    var imgURL = canvas.toDataURL(mime);
    var answer = parseInt($('input[type="radio"]:checked').val());

    if (isNaN(answer)) {
      appendConsole(`You must specify the target of the sample!`, '#f1749a');
      $('.input-group').addClass('warning');
      setTimeout(() => { $('.input-group').removeClass('warning') }, 1000)
      return
    }

    $.ajax({
      type: 'post',
      url:  './feed',
      data: { imgURL: imgURL, target: answer },
      dataType: 'json',
      cache: false,
      success: function(data) {
        appendConsole(`Number ${answer} is fed to the machine!`)
        uncheckAllButtons()
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
        appendConsole('New Classifier Has Been Trained!')
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
        appendConsole(`Predicted Result: ${data.result}`)
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

function currentTimeString() {
  var d = new Date()
  return d.toLocaleString()
}

function appendConsole(message, color = '') {
  var $console = $('#console')
  var inlineStyle = ''
  if (color) {
    inlineStyle += `background-color: ${color};`
  }
  $console.append(`<p style="${inlineStyle}">${message}</p><span class="time-string">${currentTimeString()}</span><br />`)
  $console[0].scrollTop = $console[0].scrollHeight;
}

function uncheckAllButtons() {
  $('input[type="radio"]:checked').prop('checked', false)
}