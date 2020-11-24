const playButton = document.getElementById("playButton");
let audio = document.createElement("audio");

const musicLibrary = [{title: "Tonight", artist: "Nonso Amadi"}, {title: "Say Something", artist: "A Great Big World"},
                        {title: "No Longer Beneficial", artist: "Simi"}, {title: "Never Enough", artist: "Loren Allred"},
                        {title: "Someone Like You", artist: "Adele"}];

audio.setAttribute("src", `assets/${musicLibrary[1].title.toLocaleLowerCase()}.mp3`);
audio.play();
playButton.addEventListener("click", (evt) => {
    audio.pause();
})