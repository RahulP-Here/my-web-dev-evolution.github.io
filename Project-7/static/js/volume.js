document.addEventListener('DOMContentLoaded', function() {
    
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
            slideDuration();
        }
    }
});


async function slideDuration() {
    let currentSongElement = document.querySelector('.curr-song');
    let runningbar = currentSongElement.querySelector('.seekbar .complete-bar');

    let newWidth = parseFloat((runningbar.style.width).replace('%', ''));
        // let start = currentSong.currentTime
        // let minutes = Math.floor(start / 60);
        // let seconds = Math.floor(start % 60);
        // let barLength = (start * 100) / (currentSong.duration);
        // runningbar.style.width = `${barLength}%`;
        console.log(parseFloat(newWidth));
        

        // currentSongElement.querySelector('.start').innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}