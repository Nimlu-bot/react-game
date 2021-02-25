class AudioProcessor {
    init() {
        this.audioContext = new AudioContext();
        this.gainNode = this.audioContext.createGain();
        this.pannerOptions = { pan: 0 };
        this.panner = new StereoPannerNode(this.audioContext, this.pannerOptions);

        // all sounds
        this.muz = this.createMediaElement(document.querySelector('#muz'));
        // this.click = this.createMediaElement(document.querySelector('#click'));

        if (localStorage.getItem('volumeLevel')) {
            this.setVolume(+localStorage.getItem('volumeLevel'));
        }
        if (localStorage.getItem('panLevel')) {
            this.setPan(+localStorage.getItem('panLevel'));
        }
    }

    createMediaElement(tagAudio) {
        const audioWithEffects = this.audioContext.createMediaElementSource(tagAudio);
        audioWithEffects.connect(this.gainNode).connect(this.panner).connect(this.audioContext.destination);
        return audioWithEffects;
    }

    audio(name) {
        return this[name].mediaElement;
    }

    play(name) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        if (this[name] && this[name].mediaElement) {
            this[name].mediaElement.play();
        }
    }

    pause(name) {
        if (this[name] && this[name].mediaElement) {
            this[name].mediaElement.pause();
        }
    }

    reset(name) {
        if (this[name] && this[name].mediaElement) {
            this[name].mediaElement.currentTime = 0;
        }
    }

    setVolume(volume) {
        this.gainNode.gain.value = volume;
        localStorage.setItem('volumeLevel', volume);
    }

    setPan(pan) {
        this.panner.pan.value = pan;
        localStorage.setItem('panLevel', pan);
    }

    get gain() {
        return this.gainNode.gain.value;
    }

    get pan() {
        return this.panner.pan.value;
    }
}
export default new AudioProcessor();
