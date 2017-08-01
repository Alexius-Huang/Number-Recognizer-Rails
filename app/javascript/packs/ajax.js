$(document).ready(function() {
  $('#feed').on('click', function(event) {
    event.preventDefault();
    var answer = parseInt($('input[type="radio"]:checked').val());

    if (isNaN(answer)) {
      appendConsole(`You must specify the target of the sample!`, '#f1749a');
      $('.input-group').addClass('warning');
      setTimeout(() => { $('.input-group').removeClass('warning') }, 1000)
      return
    }

    disableAllPanel();
    uncheckAllButtons();

    $.ajax({
      type: 'post',
      url:  './feed',
      data: { imgURL: getCanvasImgBase64(), target: answer },
      dataType: 'json',
      cache: false,
      success: function(data) {
        appendConsole(`Number ${answer} is fed to the machine!`)
        uncheckAllButtons()
        clearCanvas();
        enableAllPanel();
      }
    });
  });

  $('#train').on('click', function(event) {
    event.preventDefault();
    disableAllPanel();
    uncheckAllButtons();
    $.ajax({
      type: 'post',
      url: './train_classifier',
      dataType: 'json',
      success: function(data) {
        appendConsole('New Classifier Has Been Trained!')
        enableAllPanel();
      }
    });
  });

  $('#predict').on('click', function(event) {
    event.preventDefault();
    disableAllPanel();
    uncheckAllButtons();
    $.ajax({
      type: 'post',
      url: './predict',
      data: { img_base64: getCanvasImgBase64() },
      dataType: 'json',
      cache: false,
      success: function(data) {
        appendConsole(`Predicted Result: ${data.result}`)
        appendConsole("Is the prediction correct?", "#00c78c")
        promptForUser().then(function(yes) {
          yes ? predictionCorrect(data.result) : predictionFailed()
        })
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

function promptForUser() {
  return new Promise(function(resolve, reject) {
    showPrompt()
    $('#ans-yes').on('click', () => { hidePrompt(); resolve(true) })
    $('#ans-no').on('click', () => { hidePrompt(); resolve(false) })
  })
}

function getCanvasImgBase64() {
  var canvas = document.getElementById('main-canvas');
  var mime = 'image/jpeg';
  return canvas.toDataURL(mime);
}

function disableAllPanel() {
  $('#shade').fadeIn();
}

function enableAllPanel() {
  $('#shade').fadeOut();
}

function showPrompt() {
  $('#prompt').fadeIn();
}

function hidePrompt() {
  $('#prompt').fadeOut();
}

function predictionCorrect(result) {
  setTimeout(() => {
    appendConsole("Do you want to add it as a new sample?", "#00c78c")
    promptForUser().then(function(yes) {
      if (yes) {
        $.ajax({
          type: 'post',
          url:  './feed',
          data: { imgURL: getCanvasImgBase64(), target: result },
          dataType: 'json',
          cache: false,
          success: function(data) {
            appendConsole(`Number ${result} is fed to the machine!`)
            clearCanvas();
            enableAllPanel();
          }
        })
      } else {
        clearCanvas();
        enableAllPanel();
        appendConsole("Okay, got it!")
      }
    })
  }, 1000)
}

function predictionFailed() {
  setTimeout(() => {
    appendConsole("Do you want to correct and make it a new sample?", "#00c78c")
    promptForUser().then(function(yes) {
      if (yes) {
        $('#shade').animate({'height': '75px'})
        setTimeout(() => {
          appendConsole("Please choose the correct digit!", "#ffb732")
          $('input[type="radio"]').on('click', function() {
            $('#submit').fadeIn();
            $('#submit-result').on('click', function() {
              var result = parseInt($('input[type="radio"]:checked').val());
              $.ajax({
                type: 'post',
                url:  './feed',
                data: { imgURL: getCanvasImgBase64(), target: result },
                dataType: 'json',
                cache: false,
                success: function(data) {
                  appendConsole(`Number ${result} is fed to the machine!`)
                  clearCanvas();
                  enableAllPanel();
                  $('#shade').animate({'height': '125px'})
                }
              });
              $('#submit-result').off('click')
              $('#submit').fadeOut();
            })
            $('input[type="radio]').off('click')
          })
        }, 1000);
      } else {
        appendConsole("Okay, got it!")
        hidePrompt()
        enableAllPanel()
        clearCanvas()
      }
    })
  }, 1000)
}