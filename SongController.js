var PPButton = document.getElementById("PPButton");
var testSongButton = document.getElementById("testSongButton");
var audio = document.getElementById("audio");

PPButton.onclick = function() {
    if (audio.paused) {
        audio.play();
    }

    else {
        audio.pause();
    }
}

testSongButton.onclick = function() {
    document.getElementById("audio").pause();
    document.getElementById("audio").setAttribute('src', 'testSong.mp3');
    document.getElementById("audio").load();
    document.getElementById("audio").play();
}
