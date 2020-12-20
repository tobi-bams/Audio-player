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
let songsContainer = document.getElementById("songsContainer");
let SelectSongsContainer = document.getElementById("SelectSongsContainer");
let selectedPlaylistTitle = document.getElementById("selectedPlaylistTitle");
let saveSongs = document.getElementById("saveSongs");
let cancelSaveSongs = document.getElementById("cancelSaveSongs");
let moreSongs = document.getElementById("moreSongs");
let playPlayistSong = document.getElementById("playPlayistSong");
let playPlaylistTitle = document.getElementById("playPlaylistTitle");
let cancelPlaySongs = document.getElementById("cancelPlaySongs");
let storedPlaylistSongsContainer = document.getElementById("storedPlaylistSongsContainer");
let currentPlaylist = "none";
let currentPlaylistSong = "";
let platlistAlreadyExist = document.getElementById("platlistAlreadyExist");
let localStorage = window.localStorage;
let playlistSavedContainer = document.getElementById("playlistSavedContainer");
let repeatButton = document.getElementById("repeatButton");
let repeatStatus = false;

const musicLibrary = [{title: "Tonight", artist: "Nonso Amadi", image: "image1"}, {title: "Say Something", artist: "A Great Big World", image: "image2"},
                        {title: "No Longer Beneficial", artist: "Simi", image: "image3"}, {title: "Never Enough", artist: "Loren Allred", image: "try"},
                        {title: "Someone Like You", artist: "Adele", image: "image1"}];


let playlistData = [];

if(localStorage.getItem("playlistData")){
    playlistData = JSON.parse(localStorage.getItem("playlistData"));
    playlistData.forEach((playlist) => {
        creatingPlaylistUI(playlist.title);
    })
}

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
        if(currentPlaylist === "none"){
            currentlyPlaying += 1;
            if(currentlyPlaying < musicLibrary.length){
                playAudio(currentlyPlaying);
                audio.play();
            }
            else if((currentlyPlaying === musicLibrary.length) && (repeatStatus === true)){
                currentlyPlaying = 0;
                playAudio(currentlyPlaying);
                audio.play();
            }
            else{
                audioStatus.setAttribute("src", "assets/controls/play.svg");
                audioStatusContainer = "playing";
            }
        }
        else{
            let playlistIndex = playlistData.findIndex((playlist) => {
                return playlist.title == currentPlaylist;
            }) 
            let nextSongPlaylistIndex = playlistData[playlistIndex].data.indexOf(currentPlaylistSong) + 1;
            if(nextSongPlaylistIndex < playlistData[playlistIndex].data.length){
                currentPlaylistSong = playlistData[playlistIndex].data[nextSongPlaylistIndex];
                playAudio(currentPlaylistSong);
                audio.play();
            }
            else if((nextSongPlaylistIndex === playlistData[playlistIndex].data.length) && (repeatStatus === true)){
                nextSongPlaylistIndex = 0;
                currentPlaylistSong = playlistData[playlistIndex].data[nextSongPlaylistIndex];
                playAudio(currentPlaylistSong);
                audio.play();
            }
            else{
                audioStatus.setAttribute("src", "assets/controls/play.svg");
                audioStatusContainer = "playing";
            }
            
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

//Function for calculating the duration for each song and the amount of time the song has played for
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
    if(currentPlaylist === "none"){
        currentlyPlaying += 1;
        if(currentlyPlaying < musicLibrary.length){
            playAudio(currentlyPlaying);
            audioStatus.setAttribute("src", "assets/controls/pause.svg")
                audio.play();
                audioStatusContainer = "paused";
        }
        else{
            currentlyPlaying = 0;
            playAudio(currentlyPlaying);
            audio.play();
        }
    }
    else{
        let playlistIndex = playlistData.findIndex((playlist) => {
            return playlist.title == currentPlaylist;
        }) 
        let nextSongPlaylistIndex = playlistData[playlistIndex].data.indexOf(currentPlaylistSong) + 1;
        if(nextSongPlaylistIndex < playlistData[playlistIndex].data.length){
            currentPlaylistSong = playlistData[playlistIndex].data[nextSongPlaylistIndex];
            playAudio(currentPlaylistSong);
                audioStatus.setAttribute("src", "assets/controls/pause.svg")
                audio.play();
                audioStatusContainer = "paused";
        }
        else{
            nextSongPlaylistIndex = 0;
            currentPlaylistSong = playlistData[playlistIndex].data[nextSongPlaylistIndex];
            playAudio(currentPlaylistSong);
            audio.play();
        }
    } 
})

backward.addEventListener("click", () => {
    if(currentPlaylist === "none"){
        currentlyPlaying -= 1;
        if(currentlyPlaying >= 0){
            playAudio(currentlyPlaying)
            audioStatus.setAttribute("src", "assets/controls/pause.svg")
            audio.play();
            audioStatusContainer = "paused";
        }
    
        else{
            currentlyPlaying += 1;
        }
    }
    else{
        let playlistIndex = playlistData.findIndex((playlist) => {
            return playlist.title == currentPlaylist;
        }) 
        let nextSongPlaylistIndex = playlistData[playlistIndex].data.indexOf(currentPlaylistSong) - 1; 
        if( nextSongPlaylistIndex >= 0){
            currentPlaylistSong = playlistData[playlistIndex].data[nextSongPlaylistIndex];
            playAudio( currentPlaylistSong)
            audioStatus.setAttribute("src", "assets/controls/pause.svg")
            audio.play();
            audioStatusContainer = "paused";
        }
    }
   
})

// Playlist code

savePlaylist.addEventListener("click", () => {
    let notExist = true
    if(playlistData.length > 0){
        notExist = playlistData.every(checker);
    }
    if(playlistName.value === ""){
        playlistName.style.border = "2px solid black";
        playlistNameError.style.display = "inline";
    }else if(notExist === false){
        playlistName.style.border = "2px solid black";
        platlistAlreadyExist.style.display = "inline";
    }
    else{
        newPlayListContainer.style.display = "none";
        creatingPlaylistUI(playlistName.value);
        SelectSongsContainer.style.display = "flex";
        let playlist = {title: playlistName.value.toLocaleLowerCase(), data: []};
        playlistData.push(playlist);
        localStorage.setItem("playlistData", `${JSON.stringify(playlistData)}`);
        displaySongs(playlistName.value);
        playlistName.value = "";
    } 
});

function checker(playlist){
    return playlist.title !== playlistName.value.toLocaleLowerCase();
}

function creatingPlaylistUI(playlist){
    let firstDiv = document.createElement("div");
    firstDiv.className = "playlist";
    let innerDiv = document.createElement("button");
    innerDiv.className = "playlistButtons";
    innerDiv.addEventListener("click", viewPlaylist);
    innerDiv.style.backgroundImage = "url('./assets/images/image1.jpg')";
    let playListTitle = document.createElement("p");
    playListTitle.textContent = playlist;
    playListTitle.style.textTransform = "capitalize";
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
    platlistAlreadyExist.style.display = "none";
});

saveSongs.addEventListener("click", () => {
    SelectSongsContainer.style.display = "none";
    songsContainer.innerHTML = "";
    let playPlaylistTitle = selectedPlaylistTitle.textContent;
    storedPlaylistSongsContainer.innerHTML = "";
    playlistSavedMusicDispay(playPlaylistTitle)
    playPlayistSong.style.display = "flex";
});

cancelSaveSongs.addEventListener("click", () =>{
    SelectSongsContainer.style.display = "none";
    songsContainer.innerHTML = "";
})

function displaySongs(playlistTitle){
    selectedPlaylistTitle.textContent = playlistTitle;
    let playlistIndex = playlistData.findIndex((playlist) => {
        return playlist.title == playlistTitle.toLocaleLowerCase();
    })
    let songIndex = 0;
    musicLibrary.forEach((song) => {
        let songs = document.createElement("div");
        songs.setAttribute("class", "songs");
        let radio = document.createElement("div")
        radio.setAttribute("class", "radioButton");
        let radioClick = document.createElement('div');
        radioClick.setAttribute('class', "radioButtonClick");
        radio.appendChild(radioClick);
        let songTitle = document.createElement("p");
        songTitle.setAttribute("data-status", "notAdded");
        songTitle.setAttribute("data-index", songIndex);
        if(playlistData[playlistIndex].data.includes(songIndex.toString())){
            radioClick.style.backgroundColor = 'black';
            songTitle.setAttribute("data-status", "added");
        }
        songIndex += 1;
        songTitle.textContent = `${song.title} - ${song.artist}`;
        songTitle.addEventListener("click", addSongToPlayList);
        songs.appendChild(radio);
        songs.appendChild(songTitle);
        songsContainer.appendChild(songs)
    })
}

function viewPlaylist(evt){
    let playPlaylistTitle = evt.target.nextElementSibling.textContent;
    storedPlaylistSongsContainer.innerHTML = "";
    playlistSavedMusicDispay(playPlaylistTitle)
    playPlayistSong.style.display = "flex";
}

// savePlaylist.previousElementSibling
moreSongs.addEventListener("click", (evt) => {
    // selectedPlaylistTitle.textContent = 
    playPlayistSong.style.display = "none";
    displaySongs(evt.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    SelectSongsContainer.style.display = "flex";
})

cancelPlaySongs.addEventListener('click', () => {
    playPlayistSong.style.display = "none";
})

function addSongToPlayList(evt){
    let playlistTitle = evt.target.parentElement.parentElement.previousElementSibling.textContent.toLocaleLowerCase();
    let songIndex = evt.target.getAttribute("data-index");
    let index = playlistData.findIndex((playlist) => {
        return playlist.title == playlistTitle;
    });
    let dataStatus = evt.target.getAttribute("data-status");
    if(dataStatus === "notAdded"){
        playlistData[index].data.push(songIndex);
       evt.target.previousElementSibling.firstElementChild.style.backgroundColor = "black";
        evt.target.setAttribute("data-status", "added");
        localStorage.setItem("playlistData", `${JSON.stringify(playlistData)}`);
    }
    else{
        let deleteIndex = playlistData[index].data.indexOf(songIndex)
        playlistData[index].data.splice(deleteIndex, 1);
        evt.target.previousElementSibling.firstElementChild.style.backgroundColor = "white";
        evt.target.setAttribute("data-status", "notAdded");
        localStorage.setItem("playlistData", `${JSON.stringify(playlistData)}`);
    } 
   
}


function playlistSavedMusicDispay(playlistTitle){
    playPlaylistTitle.textContent = playlistTitle;
    let playlistIndex = playlistData.findIndex((playlist) => {
        return playlist.title == playlistTitle.toLocaleLowerCase();
    })
    if(playlistData[playlistIndex].data.length > 0){
        playlistData[playlistIndex].data.forEach((index) => {
            let container = document.createElement("div");
            container.setAttribute("class", "songs");
            let playButton = document.createElement("img");
            playButton.setAttribute("src", "./assets/controls/play.svg");
            playButton.setAttribute("class", "playSongButton");
            let songTitle = document.createElement("p");
            songTitle.textContent = `${musicLibrary[index].title} - ${musicLibrary[index].artist}`;
            songTitle.setAttribute("class", "currentPlaylistSongTitle");
            songTitle.setAttribute("song-index", `${index}`);
            songTitle.addEventListener("click", playSong)
            container.appendChild(playButton);
            container.appendChild(songTitle);
            storedPlaylistSongsContainer.appendChild(container);
        })
    }
    else{
        let emptyPlaylistMessage = document.createElement("p");
        emptyPlaylistMessage.textContent = "Empty Playlist.......";
        emptyPlaylistMessage.style.textTransform = "uppercase";
        storedPlaylistSongsContainer.appendChild(emptyPlaylistMessage);
    }

}

function playSong(evt){
    let songIndex = evt.target.getAttribute("song-index");
    currentPlaylistSong = songIndex;
    let playlist = evt.target.parentElement.parentElement.previousElementSibling.textContent;
    currentPlaylist = playlist.toLocaleLowerCase();
    audioImage.setAttribute("src", `assets/images/${musicLibrary[songIndex].image}.jpg`)
    audio.setAttribute("src", `assets/${musicLibrary[songIndex].title.toLocaleLowerCase()}.mp3`);
    audioTitle.textContent = `${musicLibrary[songIndex].title} - ${musicLibrary[songIndex].artist}`
    audioStatus.setAttribute("src", "assets/controls/pause.svg");
    playPlayistSong.style.display = "none";
    audio.play();
    audioStatusContainer = "paused";
}

function playAudio(index){
    audioImage.setAttribute("src", `assets/images/${musicLibrary[index].image}.jpg`)
    audio.setAttribute("src", `assets/${musicLibrary[index].title.toLocaleLowerCase()}.mp3`);
    audioTitle.textContent = `${musicLibrary[index].title} - ${musicLibrary[index].artist}`
}

repeatButton.addEventListener("click", (evt) => {
    if(repeatStatus === false){
        evt.target.parentElement.style.backgroundColor = "white";
        repeatStatus = true;
    }
    else{
        evt.target.parentElement.style.backgroundColor = "transparent";
        repeatStatus = false;
    }
})
