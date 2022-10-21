window.onload = function() {
  
    var file = document.getElementById("uploadSong");
    var audio = document.getElementById("audio");
    var PPButton = document.getElementById("PPButton");

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var x = 0;

    var fftSizePreset = 2048;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, HEIGHT / 2 - 2.5, (((WIDTH / (fftSizePreset / 2)) / 2) + 1) * (fftSizePreset / 2), 5);

    file.onchange = function() {
      var files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
    };

    audio.onplay = function() {
      PPButton.style.backgroundImage = "url(pauseButton.png)";      
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = fftSizePreset;
      analyser.maxDecibels = 0;
      analyser.minDecibels = -100;
      analyser.smoothingTimeConstant = 0;

      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
  
      var barWidth = (WIDTH / bufferLength) / 2;
      var barHeight;
      var barHeight2;

      function renderFrame() {
        requestAnimationFrame(renderFrame);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
          
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] + 5;
          barHeight2 = dataArray[dataArray.length - i] + 5;
          ctx.fillStyle = "#fff";

          ctx.fillRect(x, HEIGHT / 2 + 2.5 - barHeight2, barWidth + 1, barHeight2);
          ctx.fillRect(x, HEIGHT / 2 - 2.5, barWidth + 1, barHeight2);

          ctx.fillRect(x + WIDTH / 2, HEIGHT / 2 + 2.5 - barHeight, barWidth + 1, barHeight);
          ctx.fillRect(x + WIDTH / 2, HEIGHT / 2 - 2.5 , barWidth + 1, barHeight);

          x += barWidth;
        }
      }

      renderFrame();
    };

    audio.onpause = function() {
      PPButton.style.backgroundImage = "url(playButton.png)"; 
    }
  };