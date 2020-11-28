const playButton = document.getElementById("playButton");
let audio = document.createElement("audio");
currentlyPlaying = 0;

const musicLibrary = [{title: "Tonight", artist: "Nonso Amadi"}, {title: "Say Something", artist: "A Great Big World"},
                        {title: "No Longer Beneficial", artist: "Simi"}, {title: "Never Enough", artist: "Loren Allred"},
                        {title: "Someone Like You", artist: "Adele"}];

audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
audio.play();
playButton.addEventListener("click", (evt) => {
    audio.play();
})

audio.addEventListener("timeupdate", (evt) => {
    if(audio.currentTime === audio.duration){
        currentlyPlaying += 1;
        if(currentlyPlaying < musicLibrary.length){
            audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
            audio.play();
            console.log(audio.played)
        }
    }
})