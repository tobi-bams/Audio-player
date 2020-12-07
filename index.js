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
let createPlaylist = document.getElementById("createPlaylist");
let savePlaylist = document.getElementById("savePlaylist");
let cancel = document.getElementById("cancel");
let newPlayListContainer = document.getElementById("newPlayListContainer");
let playlistName = document.getElementById("playlistName");
let playlistNameError = document.getElementById("playlistNameError");
let playlistContainer = document.getElementById("playlistContainer");

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

// Playlist code

savePlaylist.addEventListener("click", () => {
    if(playlistName.value === ""){
        playlistName.style.border = "2px solid black";
        playlistNameError.style.display = "inline";
    }
    else{
        newPlayListContainer.style.display = "none";
        creatingTiles();
        playlistName.value = "";
    } 
});

function creatingTiles(){
    let firstDiv = document.createElement("div");
    firstDiv.className = "playlist";
    let innerDiv = document.createElement("button");
    innerDiv.className = "playlistButtons";
    innerDiv.style.backgroundColor = "red";
    let playListTitle = document.createElement("p");
    playListTitle.textContent = playlistName.value;

    firstDiv.appendChild(innerDiv);
    firstDiv.appendChild(playListTitle);
    playlistContainer.prepend(firstDiv);
}

playlistName.addEventListener("input", () => {
    playlistName.style.border = "2px solid grey";
    playlistNameError.style.display = "none";
})

createPlaylist.addEventListener("click", () => {
    newPlayListContainer.style.display = "flex";
})

cancel.addEventListener("click", () => {
    newPlayListContainer.style.display = "none";
    playlistName.value = "";
    playlistName.style.border = "2px solid grey";
    playlistNameError.style.display = "none";
})