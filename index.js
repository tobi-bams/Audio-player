const playButton = document.getElementById("playButton");
let audio = document.createElement("audio");
currentlyPlaying = 0;
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let audioStatus = document.getElementById("audioStatus");
let audioRange = document.getElementById("audioRange");
let audioStatusContainer = "start";

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
        }
    }
})

audioRange.addEventListener("input", () => {
    audio.currentTime = (audioRange.value * audio.duration) / 600;
})

forward.addEventListener("click", () => {
    currentlyPlaying += 1;
    if(currentlyPlaying < musicLibrary.length){
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        if(audioStatusContainer === "paused"){
            audio.play();
        }
    }
    else{
        currentlyPlaying -= 1;
    }
})

backward.addEventListener("click", () => {
    currentlyPlaying -= 1;
    if(currentlyPlaying >= 0){
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        if(audioStatusContainer === "paused"){
            audio.play();
        }
    }

    else{
        currentlyPlaying += 1;
    }
})