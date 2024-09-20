window.addEventListener('DOMContentLoaded', () => {

    const audio = document.querySelector('audio');

    let isPlay = false;

    function playToggle() {
        if (!isPlay) {
            playAudio()
        } else {
            pauseAudio()
        }
    }
    function playAudio() {
        audio.currentTime = 0;
        audio.play
    }

    function pauseAudio() {
        audio.pause
    }

})