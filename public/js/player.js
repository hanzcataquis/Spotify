let currentSongIndex = -1;
let songsList = [];
let isRepeating = false;
let isShuffling = false;
let selectedSongId = null;

function populateSongsList() {
    const songItems = document.querySelectorAll('.song-card');
    songsList = Array.from(songItems).map(item => ({
        id: item.dataset.id,
        title: item.querySelector('.song-title').textContent,
        filePath: item.dataset.filepath
    }));
}

function selectSong(element) {
    currentSongIndex = parseInt(element.dataset.index);
    selectedSongId = element.dataset.id;
    playCurrentSong();
}

function playCurrentSong() {
    if (currentSongIndex >= 0 && currentSongIndex < songsList.length) {
        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');
        const currentSongTitle = document.getElementById('currentSongTitle');
        const editSongId = document.getElementById('editSongId');
        const deleteSongId = document.getElementById('deleteSongId');

        audioSource.src = songsList[currentSongIndex].filePath;
        audioPlayer.load();
        audioPlayer.play();

        currentSongTitle.textContent = songsList[currentSongIndex].title;
        editSongId.value = songsList[currentSongIndex].id;
        deleteSongId.value = songsList[currentSongIndex].id;

        openPlayerModal();
    }
}

function nextSong() {
    currentSongIndex = isShuffling
        ? Math.floor(Math.random() * songsList.length)
        : currentSongIndex + 1;

    if (currentSongIndex >= songsList.length) {
        currentSongIndex = isRepeating ? 0 : songsList.length - 1;
    }

    playCurrentSong();
}

function prevSong() {
    currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songsList.length - 1;
    playCurrentSong();
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    document.getElementById('repeatButton').classList.toggle('active', isRepeating);
}

function toggleShuffle() {
    isShuffling = !isShuffling;
    document.getElementById('shuffleButton').classList.toggle('active', isShuffling);
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function openPlayerModal() {
    document.getElementById('playerModal').style.display = 'block';
}

function closePlayerModal() {
    document.getElementById('playerModal').style.display = 'none';
}

function openEditModal() {
    const currentSong = songsList[currentSongIndex];
    document.getElementById('editSongTitle').value = currentSong.title;
    document.getElementById('editSongId').value = currentSong.id;
    document.getElementById('editSongModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editSongModal').style.display = 'none';
}

function deleteSong() {
    openDeleteConfirmationModal();
}

function openDeleteConfirmationModal() {
    document.getElementById('deleteConfirmationModal').style.display = 'block';
}

function closeDeleteConfirmationModal() {
    document.getElementById('deleteConfirmationModal').style.display = 'none';
}

function confirmDeleteSong() {
    document.getElementById('deleteForm').submit();
}

function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

document.getElementById('audioPlayer').addEventListener('ended', () => {
    isRepeating ? playCurrentSong() : nextSong();
});

document.addEventListener('DOMContentLoaded', () => {
    populateSongsList();
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.addEventListener('click', closePlayerModal);
    });
});
