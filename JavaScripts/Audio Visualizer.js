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

    var canvas2 = document.getElementById("canvas2");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    var ctx2 = canvas2.getContext("2d");

    var WIDTH2 = canvas2.width;
    var HEIGHT2 = canvas2.height;

    var x = 0;

    var fftSizePreset = 1024;
    var lineHeight = 5;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, HEIGHT / 2 - lineHeight / 2, (WIDTH + 1), lineHeight);

    //---- Draw Visualizer Line Shadow ----
    ctx2.fillStyle = "#000";
    ctx2.fillRect(0, HEIGHT2 / 2 - lineHeight / 2, (WIDTH2 + 1), lineHeight);
    //--------------------------------

    file.onchange = function() {
      var files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
    };

    audio.onplay = function() {
      PPButton.style.backgroundImage = "url(PageArt/pauseButton.png)";      
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = fftSizePreset;
      analyser.maxDecibels = -20;
      analyser.minDecibels = -100;
      analyser.smoothingTimeConstant = 1;

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
        ctx2.clearRect(0, 0, WIDTH2, HEIGHT2)
          
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] + lineHeight;
          barHeight2 = dataArray[dataArray.length - i] + lineHeight;
          ctx.fillStyle = "#fff";

          ctx.fillRect(x, HEIGHT / 2 + lineHeight / 2 - barHeight2, barWidth + 1, barHeight2);
          ctx.fillRect(x, HEIGHT / 2 - lineHeight / 2, barWidth + 1, barHeight2);

          ctx.fillRect(x + WIDTH / 2, HEIGHT / 2 + lineHeight / 2 - barHeight, barWidth + 1, barHeight);
          ctx.fillRect(x + WIDTH / 2, HEIGHT / 2 - lineHeight / 2 , barWidth + 1, barHeight);

          //---- Draw Visualizer Shadow ----
          ctx2.fillStyle = "#000";

          ctx2.fillRect(x, HEIGHT2 / 2 + lineHeight / 2 - barHeight2, barWidth + 1, barHeight2);
          ctx2.fillRect(x, HEIGHT2 / 2 - lineHeight / 2, barWidth + 1, barHeight2);

          ctx2.fillRect(x + WIDTH2 / 2, HEIGHT2 / 2 + lineHeight / 2 - barHeight, barWidth + 1, barHeight);
          ctx2.fillRect(x + WIDTH2 / 2, HEIGHT2 / 2 - lineHeight / 2 , barWidth + 1, barHeight);
          //--------------------------------

          x += barWidth;
        }
      }

      renderFrame();
    };

    audio.onpause = function() {
      PPButton.style.backgroundImage = "url(PageArt/playButton.png)"; 
    }
  };