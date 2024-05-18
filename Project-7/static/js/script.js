
// Login user via entering their name
function loginUser() {
    let userName = prompt('Enter Your Name: ');
    if (userName) {
        document.getElementById('hey').innerHTML = userName;
        document.getElementById('hey').removeEventListener('click', loginUser);
    }
}

// Fetch the playlists from the server
async function fetchPlaylists() {
    let response = await fetch('/songs/');
    let playlistsHTML = await response.text();

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = playlistsHTML;

    let playlistLinks = tempDiv.getElementsByTagName('a');

    Array.from(playlistLinks).forEach((playlistLink) => {
        if (playlistLink.innerHTML !== "../") {
            let albumName = playlistLink.innerHTML.slice(0, playlistLink.innerHTML.length - 1);
            let imgSource = `/songs/${albumName}/${albumName}-img.jpeg`;
            let defaultImgSource = `./static/img/album logo.png`;

            let albumElement = document.createElement('div');
            albumElement.classList.add('album');
            albumElement.classList.add('pointer');
            albumElement.innerHTML = `
                <div class="image">
                    <span class="popup-hover">
                        <img src="./static/svg/play.svg" alt="">
                    </span>
                    <img src="${imgSource}" onerror="this.onerror=null; this.src='${defaultImgSource}';">
                </div>
                <h3>${albumName}</h3>
                <p>This is Album No. 1</p>
            `;

            let albumContainer = document.querySelector('.album-container');
            albumContainer.appendChild(albumElement);
        }
    });
}

// Fetch songs for a specific playlist
async function fetchSongs(playlistName) {
    let response = await fetch(`/songs/${playlistName}/`);
    let songsHTML = await response.text();

    let songsContainer = document.querySelector('.songslist');
    songsContainer.innerHTML = "";

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = songsHTML;

    let songLinks = Array.from(tempDiv.getElementsByTagName('a'));
    for (let index = 0; index < songLinks.length; index++) {
        if ((index > 0) && !(((songLinks[index].innerHTML).includes('-img.')))) {
            let songName = (songLinks[index].innerHTML).split('.m')[0];
            let songPath = songLinks[index].getAttribute('href');

            let duration = await findSongDuration(songPath);

            let songElement = document.createElement('div');
            songElement.classList.add('pointer');
            songElement.setAttribute('data-path', songPath);
            songElement.innerHTML = `
                <img src="./static/img/album logo.png" onerror = "this.onerror = null; this.src = './static/img/album logo.png'" alt="song">
                <div class="song-detail">
                    <span>${songName}</span>
                    <span>Unknown</span>
                </div>
                <span class="duration">${duration}</span>
            `;

            songsContainer.appendChild(songElement);
        }
    }

    await playSong(songsContainer.children[0]);

}

// Find duration of a song
async function findSongDuration(songPath) {
    return new Promise((resolve, reject) => {
        let audio = new Audio(songPath);

        audio.addEventListener('loadedmetadata', () => {
            let duration = audio.duration;
            let minutes = Math.floor(duration / 60);
            let seconds = Math.floor(duration - (minutes * 60));

            let durationString = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            resolve(durationString);
        });

        audio.addEventListener('error', (error) => {
            reject(error);
        });

        audio.load();
    });
}

// CHANGE VISIBILITY OF PLAY BUTTON
async function playBtnVisibility() {
    let play = document.querySelector('.curr-song .play');
    if (!currentSong) {
        play.style = `opacity: 0.4;`;
        play.classList.add('reject-hover', 'reject-active');
    } else {
        play.style = `opacity: 1;`;
        play.classList.remove('reject-hover', 'reject-active');
    }

}

// DISABLE PRE/NXT BUTTON
async function disableBtn(index) {
    let preNxtBtn = document.querySelectorAll('.controls > span:nth-child(2n+1)');
    preNxtBtn[index].style = `opacity: 0.4;`;
    preNxtBtn[index].classList.add('reject-hover', 'reject-active');
}

// ENABLE PRE/NXT BUTTON
async function enableBtn(index) {
    let preNxtBtn = document.querySelectorAll('.controls > span:nth-child(2n+1)');
    preNxtBtn[index].style = ``;
    preNxtBtn[index].classList.remove('reject-hover', 'reject-active');
}


// Play a song
async function playSong(song) {

    // Change Visibility of nex/prev according to every song
    let songList = document.querySelectorAll('.songslist > div');
    let songIndex = Array.from(songList).indexOf(song);

    if (songList.length == 1) {
        disableBtn(0);
        disableBtn(1);
    }
    else if (songIndex == ((songList.length) - 1)) {
        enableBtn(0);
        disableBtn(1);
    }
    else if (songIndex == 0) {
        disableBtn(0);
        enableBtn(1);
    }
    else {
        enableBtn(0);
        enableBtn(1);
    }

    // Set Current Song in PlayingBar
    let currentSongElement = document.querySelector('.curr-song');
    let songDetail = {
        songPath: song.getAttribute('data-path'),
        songName: song.querySelector('.song-detail > span:first-child').innerHTML,
        songArtist: song.querySelector('.song-detail > span:last-child').innerHTML,
        songLength: song.querySelector('.duration').innerHTML
    }

    if (currentSong != null) {
        currentSongElement.querySelector('.play > img').setAttribute('src', './static/svg/play.svg');
        await currentSong.pause();
        // await playPause();
    }

    currentSongElement.querySelector('.song-detail > span:first-child').innerHTML = songDetail['songName'];
    currentSongElement.querySelector('.song-detail > span:last-child').innerHTML = songDetail['songArtist'];
    currentSongElement.querySelector('.duration').innerHTML = songDetail['songLength'];
    currentSongElement.querySelector('.play > img').setAttribute('src', './static/svg/pause.svg');

    // Play The Song
    currentSong = new Audio(songDetail['songPath']);
    await currentSong.play();
    await wave.play();
    await playPause();

    currentSong.addEventListener('play', playPause);
    currentSong.addEventListener('pause', playPause);

    await playBtnVisibility();
    if (!initilizeEvents) {
        await intilizeSlideEvents();
    }
}


// Running Duration
function seekBarTime() {
    // If more then one seekBarTime() function overlaps.
    if (runningSongTime) {
        clearInterval(runningSongTime);
    }

    if (currentSong != null) {
        let currentSongElement = document.querySelector('.curr-song');
        let runningbar = currentSongElement.querySelector('.seekbar .complete-bar');

        // console.trace();
        runningSongTime = setInterval(() => {
            let start = currentSong.currentTime
            let minutes = Math.floor(start / 60);
            let seconds = Math.floor(start % 60);
            let barLength = (start * 100) / (currentSong.duration);
            runningbar.style.width = `${barLength}%`;

            currentSongElement.querySelector('.start').innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }, 1000);
    }
}

// PLAY / PAUSE FUNCTION
async function playPause() {
    if (currentSong) {
        let currentSongElement = document.querySelector('.curr-song');
        // If Song is in Playing State
        if (!currentSong.paused) {
            seekBarTime();
            wave.play();
            currentSongElement.querySelector('.play > img').setAttribute('src', './static/svg/pause.svg');
        }
        // If Song is in Pause State
        else {
            wave.pause();
            clearInterval(runningSongTime);
            currentSongElement.querySelector('.play > img').setAttribute('src', './static/svg/play.svg');
        }
    }
}

// PRE / NXT FUNCTION
async function preNxt(operationType) {
    if (currentSong) {
        // Identify Index of CurrentSong
        let currentPath = (currentSong.getAttribute('src')).replaceAll(`\\`, '\\\\');
        let currentDiv = document.querySelector(`.songslist > div[data-path = "${currentPath}"]`)
        let allSongs = document.querySelectorAll('.songslist > div');

        // Current Song Shouldn't be The Fist Song of Playlist
        if ((operationType == 'pre') && (currentDiv != allSongs[0])) {
            await playSong(currentDiv.previousElementSibling)
        }
        // Current Song Shouldn't be The last Song of Playlist
        else if ((operationType == 'nxt') && (currentDiv != allSongs[(allSongs.length) - 1])) {
            await playSong(currentDiv.nextElementSibling)
        }
    }

}

// Main function
async function main() {
    // Fatch Playlists From Songs Folder
    await fetchPlaylists();

    // FOR EACH ALBUM
    let albums = document.getElementsByClassName('album');
    Array.from(albums).forEach((album) => {
        // Add Click event on each playlist
        album.addEventListener('click', async () => {
            playlistName = Array.from(album.children)[1].innerHTML;

            // If Song Already Playing And user Trying To Switch Playlist
            if (currentSong !== null) {
                let currentSongElement = document.querySelector('.curr-song');
                currentSongElement.querySelector('.play > img').setAttribute('src', './static/svg/play.svg');
                currentSong.pause();
            }
            // Fetch Songs from Clicked Playlist
            await fetchSongs(playlistName);


            // FOR EACH SONG
            let songs = document.querySelectorAll('.songslist > .pointer');
            Array.from(songs).forEach((song) => {
                // Add Click event on each song
                song.addEventListener('click', async () => {
                    // Playing clicked song
                    await playSong(song);
                })
            })
        })
    })


    // CHANGE STATE OF SONG : PLAY/PAUSE 
    let currentSongElement = document.querySelector('.curr-song');
    // Add click event on play/pause button
    currentSongElement.querySelector('.play').addEventListener('click', async () => {
        if (currentSong) {
            if (!currentSong.paused) {
                await currentSong.pause();
                // await wave.pause();
            }
            // if song is in pause state
            else {
                await currentSong.play();
                // await wave.play();
            }
        }
    });


    // CHANGE STATE OF SONGBARS : PLAY/PAUSE 
    // Add click event on SongBar Video
    wave.addEventListener('click', async () => {
        if (currentSong) {
            // if SongWave is in playing state then song Start
            if (!wave.paused) {
                await currentSong.pause();
                await wave.pause();
            }
            // if SongWave is in pause state then song Pause
            else {
                await currentSong.play();
                await wave.play();
            }
        }
    });

    // NXT / PREVIOUS BUTTONS FUNCTINALITY  
    let btns = currentSongElement.querySelectorAll('.controls > span:nth-child(2n+1)')
    btns.forEach((btn, index) => {
        // Add click event on nxt/pre button
        btn.addEventListener('click', () => {
            let operation;
            // if user click on previous button
            if (index == 0) {
                operation = "pre"
            }
            // if user click on next button
            else if (index == 1) {
                operation = "nxt"
            }

            preNxt(operation);
        })
    })

    // Volume Icon
    let ico = document.querySelector('.curr-song .volume-bar img');
    let runningbar = document.querySelector('.curr-song .volume-bar .complete-bar');
    // let runningbar = volumeElement.querySelector('.seekbar .complete-bar');
    ico.addEventListener('click', async () => {
        if (currentSong) {
            if ((currentSong.volume <= 0.6) && (currentSong.volume > 0)) {
                runningbar.style.width = "0%"
            }
            else {
                runningbar.style.width = "60%"
            }
            await slideVolume();
        }
    })

    // DISABLE BUTTONS TILL DOM NOT BEEN INTERACTED
    playBtnVisibility();
    disableBtn(0);
    disableBtn(1);
}

async function slideDuration() {
    let currentSongElement = document.querySelector('.curr-song');
    let runningbar = currentSongElement.querySelector('.seekbar .complete-bar');

    let newWidth = parseFloat((runningbar.style.width).replace('%', ''));
    currentSong.currentTime = (newWidth * (currentSong.duration)) / 100;

    let minutes = Math.floor(currentSong.currentTime / 60);
    let seconds = Math.floor(currentSong.currentTime % 60);

    currentSongElement.querySelector('.start').innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

async function slideVolume() {
    let volumeElement = document.querySelector('.curr-song .volume-bar');
    let runningbar = volumeElement.querySelector('.seekbar .complete-bar');
    let newWidth;

    if (!initilizeEvents) {
        let computedStyle = window.getComputedStyle(runningbar); // Get the computed style
        let width = computedStyle.getPropertyValue('width'); // Get the width property
        newWidth = parseFloat(width.replace('px', '')); // Parse the width value as float
    }
    else {
        newWidth = parseFloat((runningbar.style.width).replace('%', ''));
    }

    currentSong.volume = (newWidth) / 100;

    if (currentSong.volume == 0) {
        volumeElement.querySelector('img').src = "./static/svg/volume-off.svg"
    }
    else if (currentSong.volume <= 0.6) {
        volumeElement.querySelector('img').src = "./static/svg/volume-1.svg"
    }
    else {
        volumeElement.querySelector('img').src = "./static/svg/volume-2.svg"
    }
}

async function intilizeSlideEvents() {
    if (currentSong) {
        for (let index = 0; index < 2; index++) {
            const seekbar = document.querySelectorAll('.seekbar')[index];
            const completeBar = document.querySelectorAll('.complete-bar')[index];
            const circle = document.querySelectorAll('.circle')[index];

            circle.addEventListener('mousedown', startDrag);
            seekbar.addEventListener('click', moveCircle);

            function startDrag(e) {
                e.preventDefault(); // Prevents text selection while dragging

                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', stopDrag);
            }

            function drag(e) {
                circle.style = 'display: initial;';

                const rect = seekbar.getBoundingClientRect();
                const newPosition = e.clientX - rect.left;

                // Ensure the new position is within the seekbar boundaries
                const maxWidth = seekbar.offsetWidth;
                const newPositionPercentage = (newPosition / maxWidth) * 100;

                updatePosition(newPositionPercentage);
            }

            function stopDrag() {
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('mouseup', stopDrag);
            }

            function moveCircle(e) {
                const rect = seekbar.getBoundingClientRect();
                const clickPosition = e.clientX - rect.left;

                // Ensure the click position is within the seekbar boundaries
                const maxWidth = seekbar.offsetWidth;
                const newPositionPercentage = (clickPosition / maxWidth) * 100;

                updatePosition(newPositionPercentage);
            }

            function updatePosition(newPositionPercentage) {
                // Ensure the new position is within the seekbar boundaries
                newPositionPercentage = Math.max(0, Math.min(100, newPositionPercentage));

                completeBar.style.width = newPositionPercentage + '%';
                // circle.style.left = newPositionPercentage + '%';
                if (index == 0) {
                    slideDuration();
                }
                else {
                    slideVolume();
                }
            }
        }
        await slideVolume();
        initilizeEvents = true;
    }
}

// LOAD THE DOM
async function load() {
    document.addEventListener('DOMContentLoaded', async () => {
        wave = document.querySelector('video');
        await main();
    })
}

document.getElementById('hey').addEventListener('click', loginUser);

let wave = null;
let currentSong = null;
let runningSongTime = 0;
let play;
let initilizeEvents = false;

load();