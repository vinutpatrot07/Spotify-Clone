console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs;
let currFolder;

async function getSongs() {
    currFolder = "songs";
    // We are hardcoding the songs for now as per the plan since there is no server to list them
    let songs = [
        "song.mp3",
        "I'm_Dead_Inside_(Mashup)___Dj_Ari_Nation___@Mohit_Visual.mp3",
        "BORDER_2_Ghar_Kab_Aaoge_Sunny_Deol_Anu,Mithoon,_Sonu,_Roop,_Arijit.mp3",
        "Dhanda_Nyoliwala_-_Not_Guilty__Official_Music_Video_(256k).mp3"
    ];
    return songs;
}

const playMusic = (track, pause = false) => {
    // currentSong.src = "/songs/" + track
    currentSong.src = `${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "play.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {

    // Get the list of all the songs
    songs = await getSongs()
    playMusic(songs[0], true)

    // Variable to track the current song index
    let currentSongIndex = 0;

    // Attach an event listener to play, next and previous
    let play = document.querySelector(".songbuttons").getElementsByTagName("img")[1]
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "play.svg" // Assuming you might have a pause icon, but keeping play.svg as requested structure implies toggle logic might be needed visually too, but for now specific request is play next/prev
            // Note: The user didn't explicitly provide a pause.svg, so sticking to logic. 
            // Ideally we swap sources. 
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    })

    // Add an event listener to previous
    document.querySelector(".songbuttons").getElementsByTagName("img")[0].addEventListener("click", () => {
        console.log("Previous clicked")
        // Update index
        if ((currentSongIndex - 1) >= 0) {
            currentSongIndex--;
        } else {
            currentSongIndex = songs.length - 1; // Loop to last
        }
        playMusic(songs[currentSongIndex])
    })

    // Add an event listener to next
    document.querySelector(".songbuttons").getElementsByTagName("img")[2].addEventListener("click", () => {
        console.log("Next clicked")
        // Update index
        if ((currentSongIndex + 1) < songs.length) {
            currentSongIndex++;
        } else {
            currentSongIndex = 0; // Loop to first
        }
        playMusic(songs[currentSongIndex])
    })

}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

main()

