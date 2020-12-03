const playButton = document.getElementById("playButton");
let audio = document.createElement("audio");
currentlyPlaying = 0;
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let audioStatus = document.getElementById("audioStatus");
let audioRange = document.getElementById("audioRange");
let audioStatusContainer = "start";
let playingStatus = document.getElementById("playingStatus");

const musicLibrary = [{title: "Tonight", artist: "Nonso Amadi"}, {title: "Say Something", artist: "A Great Big World"},
                        {title: "No Longer Beneficial", artist: "Simi"}, {title: "Never Enough", artist: "Loren Allred"},
                        {title: "Someone Like You", artist: "Adele"}];

audioStatus.addEventListener("click", () => {
    if(audioStatusContainer === "start"){
        audioStatus.setAttribute("src", "assets/controls/pause.svg");
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        audio.play();
        audioStatusContainer = "paused";
    }
    else if(audioStatusContainer === "paused"){
        audioStatus.setAttribute("src", "assets/controls/play.svg");
        audio.pause();
        audioStatusContainer = "playing";
    }
    else{
        audioStatus.setAttribute("src", "assets/controls/pause.svg");
        audio.play();
        audioStatusContainer = "paused";
    }
})
audio.addEventListener("timeupdate", (evt) => {
    audioRange.value = parseInt(((audio.currentTime / audio.duration) * 600), 10);
    if(audio.currentTime === audio.duration){
        currentlyPlaying += 1;
        if(currentlyPlaying < musicLibrary.length){
            audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
            audio.play();
        }
        else{
            audioStatus.setAttribute("src", "assets/controls/play.svg");
            audioStatusContainer = "playing";
        }
    }
    let currentPlayingTime = duration (audio.currentTime);
    let totalDuration = duration(audio.duration);
    if(totalDuration == "NaN:NaN"){
        totalDuration = "--:--";
    }
    playingStatus.textContent = `${currentPlayingTime} / ${totalDuration}`;
})

function duration(value){
    let min = Math.floor(value/60);
    let sec = Math.floor(value - (min * 60));
    
    let result = `${min}:${sec}`;
    return result;
}

audioRange.addEventListener("input", () => {
    audio.currentTime = (audioRange.value * audio.duration) / 600;
})

forward.addEventListener("click", () => {
    currentlyPlaying += 1;
    if(currentlyPlaying < musicLibrary.length){
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        audioStatus.setAttribute("src", "assets/controls/pause.svg")
            audio.play();
            audioStatusContainer = "paused";
    }
    else{
        currentlyPlaying -= 1;
    }
})

backward.addEventListener("click", () => {
    currentlyPlaying -= 1;
    if(currentlyPlaying >= 0){
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        audioStatus.setAttribute("src", "assets/controls/pause.svg")
        audio.play();
        audioStatusContainer = "paused";
    }

    else{
        currentlyPlaying += 1;
    }
})