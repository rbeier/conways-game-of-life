

/**
 * enable fullscreen on different browsers
 */
export function enableFullscreen() {

    let element = document.documentElement;

    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }

}

export function bindKeyboardEventListener() {

    console.log("evt. listener");

    window.onkeyup = e => {
        let key = e.keyCode ? e.keyCode : e.which;

        if (key == 32) {
            if( this.timer ) {
                this.pause();
            } else {
                this.play();
            }
        } else if (key == 78) {
            this.pause();
            this.nextRound();
        }
    }

}