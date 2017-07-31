var $canvas = {
  element: null,
  width:  window.innerWidth,
  height: window.innerHeight,
  drawing: false,
  defaultPenSize: 30
};
var $ctx;

$(document).ready(function() {
  draw2DCanvas(function() {
    drawOnCanvasEvents();
  });
});

function draw2DCanvas(callback) {
  initCanvasObject();

  if ($canvas.element.getContext) {
    $ctx = $canvas.element.getContext('2d');
    $ctx.lineCap = 'round';
    fillBackgroundWhite();

    /* Clear Button for clearing the whole canvas */
    $('#clear').on('click', function() {
      $ctx.clearRect(0, 0, 300, 300);
      fillBackgroundWhite();
    });

    callback();
  }
}

function initCanvasObject() {
  $canvas.element = document.getElementById('main-canvas');
  $canvas.element.width  = 300;
  $canvas.element.height = 300;
}

function fillBackgroundWhite() {
  $ctx.fillStyle = 'white';
  $ctx.fillRect(0, 0, 300, 300);
}

function drawOnCanvasEvents() {
  $canvas.element.addEventListener('mousedown', function(event) {
    $canvas.drawing = true;
    $ctx.strokeStyle = '#000000';
    $ctx.lineWidth = $canvas.defaultPenSize;
    $ctx.beginPath();
    $ctx.moveTo(event.offsetX, event.offsetY);
  });
  $canvas.element.addEventListener('mouseup', function(event) {
    $canvas.drawing = false;
    $ctx.stroke();
  });
  $canvas.element.addEventListener('mousemove', function(event) {
    if ($canvas.drawing) {
      $ctx.lineTo(event.offsetX, event.offsetY);
      $ctx.stroke();
      $ctx.beginPath();
      $ctx.moveTo(event.offsetX, event.offsetY);      
    }
  });
}