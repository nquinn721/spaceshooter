<canvas id="canvas1" width="500" height="500"></canvas>

<script>
    var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.tabIndex = 0;

var xoffset = 0;
var yoffset = 0;

// A radial gradient to use as a mock background
var backgroundGradient = ctx.createRadialGradient(200,200,50,200,220,190);
backgroundGradient.addColorStop(0, '#F4F201');
backgroundGradient.addColorStop(0.8, '#E4C700');
backgroundGradient.addColorStop(1, 'rgba(228,199,0,0)');

can.addEventListener('keydown', function(e) { 
    var keysDown = e.keyCode; 
    if (38 === keysDown){ //UP KEY PRESSED KEY
        yoffset += 12;
    }else if (40 === keysDown){ //DOWN KEY PRESSED
        yoffset -= 12;
    }
    draw();    
}, false);

function draw() {
    ctx.clearRect(0,0,500,500);
    
    // Save the default transformation matrix
    ctx.save();
    
    // Translate by the background's offset
    console.log(yoffset);
    ctx.translate(xoffset, yoffset);

    // Draw the background (and maybe other things) translated
    ctx.fillStyle = 'black'; 
    ctx.fillRect(0, 0, 500, 10);
    // ctx.fillRect(0,0,500,500);
        
    // We restore to the default transformation
    // This will draw the hero not translated at all
    // That means we can always draw the hero in the center!
    ctx.restore();
    
    // hero is a black rectangle
    ctx.fillRect(240, 240, 20, 20);
}

draw();
</script>