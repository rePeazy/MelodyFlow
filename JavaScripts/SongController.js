const jsmediatags = window.jsmediatags;

var PPButton = document.getElementById("PPButton");
var testSongButton = document.getElementById("testSongButton");

var file = document.getElementById("uploadSong");
var audio = document.getElementById("audio");

var songCover = document.getElementById("songCover");
var songTitle = document.getElementById("songName");
var artistName = document.getElementById("artistName");

file.addEventListener("change", (event) => {

    var file = event.target.files[0];

    jsmediatags.read(file, {
        onSuccess: function(tag) {

            // Array buffer to base64
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
                base64String += String.fromCharCode(data[i]);
            }

            // Output media tags
            songCover.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
    
            songTitle.textContent = tag.tags.title;
            artistName.textContent = tag.tags.artist;
            //document.querySelector("#album").textContent = tag.tags.album;
            //document.querySelector("#genre").textContent = tag.tags.genre;
        },
    });  
});

PPButton.onclick = function() {
    if (audio.paused) {
        audio.play();
    }

    else {
        audio.pause();
    }
}

testSongButton.onclick = function() {
    audio.setAttribute('src', 'PresetAudio/lilbubblegum - af1.mp3');
    audio.load();
    audio.play();
}
