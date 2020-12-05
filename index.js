const playButton = document.getElementById("playButton");
let audio = document.createElement("audio");
let currentlyPlaying = 0;
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let audioStatus = document.getElementById("audioStatus");
let audioRange = document.getElementById("audioRange");
let audioStatusContainer = "start";
let playingStatus = document.getElementById("playingStatus");
let audioDuration = document.getElementById("duration");
let audioTitle = document.getElementById("title");
let audioImage = document.getElementById("audioImage");

const musicLibrary = [{title: "Tonight", artist: "Nonso Amadi", image: "image1"}, {title: "Say Something", artist: "A Great Big World", image: "image2"},
                        {title: "No Longer Beneficial", artist: "Simi", image: "image3"}, {title: "Never Enough", artist: "Loren Allred", image: "try"},
                        {title: "Someone Like You", artist: "Adele", image: "image1"}];

audioTitle.textContent = `${musicLibrary[currentlyPlaying].title} - ${musicLibrary[currentlyPlaying].artist}` 
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
            audioImage.setAttribute("src", `assets/images/${musicLibrary[currentlyPlaying].image}.jpg`)
            audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
            audioTitle.textContent = `${musicLibrary[currentlyPlaying].title} - ${musicLibrary[currentlyPlaying].artist}`
            audio.play();
        }
        else{
            audioStatus.setAttribute("src", "assets/controls/play.svg");
            audioStatusContainer = "playing";
        }
    }
    let cal = audio.duration - audio.currentTime;
    let currentPlayingTime = duration (audio.currentTime);
    let totalDuration = duration(cal);
    if(totalDuration == "NaN:NaN"){
        totalDuration = "--:--";
    }
    playingStatus.textContent = `${currentPlayingTime}`;
    audioDuration.textContent = `-${totalDuration}`
})

function duration(value){
    let min = Math.floor(value/60);
    let sec = Math.floor(value - (min * 60));
    if(sec < 10){
        sec = `0${sec}`;
    }
    let result = `${min}:${sec}`;
    return result;
}

audioRange.addEventListener("input", () => {
    audio.currentTime = (audioRange.value * audio.duration) / 600;
})

forward.addEventListener("click", () => {
    currentlyPlaying += 1;
    if(currentlyPlaying < musicLibrary.length){
        audioImage.setAttribute("src", `assets/images/${musicLibrary[currentlyPlaying].image}.jpg`)
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        audioTitle.textContent = `${musicLibrary[currentlyPlaying].title} - ${musicLibrary[currentlyPlaying].artist}`
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
        audioImage.setAttribute("src", `assets/images/${musicLibrary[currentlyPlaying].image}.jpg`)
        audio.setAttribute("src", `assets/${musicLibrary[currentlyPlaying].title.toLocaleLowerCase()}.mp3`);
        audioTitle.textContent = `${musicLibrary[currentlyPlaying].title} - ${musicLibrary[currentlyPlaying].artist}`
        audioStatus.setAttribute("src", "assets/controls/pause.svg")
        audio.play();
        audioStatusContainer = "paused";
    }

    else{
        currentlyPlaying += 1;
    }
})