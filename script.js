const searchSong = () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
    fetch(url)
    .then(response => response.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError("Something went wrong! Please try again later!"));
    document.getElementById("search-field").value = "";
}
const displaySongs = songs => {
    const songContainer = document.getElementById("song-container")
    const songLyrics = document.getElementById("song-lyrics")
    songContainer.innerHTML = "";
    songLyrics.innerText = "";
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
               <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
}
const getLyric = async (artist, title) => {
    toggleSpinner();
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(url);
    const data = await response.json();
    displayLyrics(data.lyrics);
    toggleSpinner();   
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById("error-message");
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById("loading");
    spinner.classList.toggle("d-none");
}

document.getElementById("search-field").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById("Search").click();
    }
});