var PPButton = document.getElementById("PPButton");
var audio = document.getElementById("audio");

PPButton.onclick = function() {
    if (audio.paused) {
        audio.play();
    }

    else {
        audio.pause();
    }
}