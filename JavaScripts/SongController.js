var PPButton = document.getElementById("PPButton");
var testSongButton = document.getElementById("testSongButton");

var audio = document.getElementById("audio");
var songTitle = document.getAnimations("songName");

audio.onload = function() {
    audio.files.getMetaData(gotMetaData);
}

function gotMetaData(metaData) {
    console.log(metaData);
}

PPButton.onclick = function() {
    if (audio.paused) {
        audio.play();
    }

    else {
        audio.pause();
    }
}

testSongButton.onclick = function() {
    audio.setAttribute('src', 'PresetAudio/testSong.mp3');
    audio.load();
    audio.play();
}
