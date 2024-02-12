// add function
const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "65c59f4f266cfc3fde87d272";
const MASTER_KEY = "$2a$10$bGGtgHiNbK3z4vgOgJ28J.fxGlg8OD9LqM/yfLGJp7zF6XnFV0hoa";

let songs = [];

function addSong(songs, song, status){
    let newSong = {
        id: Math.floor(Math.random() * 100 + 1),
        song: song,
        status: status
    };
    songs.push(newSong);
}

function modifySong(songs, id, newSong, newStatus) {
    // adding the new song
    let modifiedSong = {
        "id": id,
        "song": newSong,
        "status": newStatus
    }

    // insert index of the song that user wants to replace
    const indexToReplace = songs.findIndex(function(t){
        return t.id == id;
    });

    // if loop to check if the findIndex can find the index, if not findIndex to return -1
    if (indexToReplace > -1) {
        songs[indexToReplace] = modifiedSong;
    }
}

function deleteSong(songs, id) {
    let indexToDelete = null;
    for (let i = 0; i < songs.length; i++){
        if (songs[i].id == id){
            indexToDelete = i;
            break;
        }
    }
    if (indexToDelete !== null) {
        songs.splice(indexToDelete, 1);
    } else {
        console.log("Unable to find song");
    }
}

async function loadSongs() {
    const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
    console.log(response.data);
    return response.data.record;
}


async function saveSongs(songs) {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, songs, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY
        }
    });
    return response.data;
}