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
    console.log("test");
    audio.setAttribute('src', 'testSong.mp3');
    audio.load();
    audio.play();
}
