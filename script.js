document.addEventListener("DOMContentLoaded", function () {
    async function main() {
        let songs = await loadSongs();

        const addSongButton = document.querySelector("#addSong");
        addSongButton.addEventListener('click', function (){
        
        const saveButton = document.querySelector("#save-btn");
            saveButton.addEventListener("click", async function (){
                saveSongs(songs);
            })
            
            const songNameInput = document.querySelector("#songName");
            const songName = songNameInput.value;

            const songStatusSelect = document.querySelector("#songStatus");
            const songStatus = songStatusSelect.value;

            if (songName) {
                addSong(songs, songName, songStatus);
                renderSongs(songs);
                songNameInput.value = '';
        }
    });
    //     )
    };

    function renderSongs(songs) {
        const songList = document.querySelector('#songList');
        songList.innerHTML = '';
        for (let song of songs) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
            ${song.name} <span class="badge  bg-primary">${song.status}</span>
            <button data-task-id=${song.id} class="btn edit-btn btn-success btn-sm">Edit</button>
            <button data-task-id=${song.id} class="btn delete-btn btn-danger btn-sm">Delete</button>
            `;
            songList.appendChild(li);

            li.querySelector(".edit-btn").addEventListener('click', function () {
                const newSong = prompt("Enter the new song name: ", song.name);
                const newStatus = prompt("Enter the new urgency: ", song.status);
                modifySong(songs, song.id, newSong, newStatus);
                renderSongs(songs);
            })

            li.querySelector(".delete-btn").addEventListener('click', function () {
                const confirmation = confirm("Do you want to delete the song: " + song.name + "?");
                if (confirmation) {
                    deleteSong(songs, song.id);
                    renderSongs(songs);
                }
            });
        }
    };
    main();
});


