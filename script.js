window.onload = function() {
    var audioElement = new Audio();
    audioElement.src = 'ANMLCat_Cat purring 3 (ID 1010)_BSB.wav';
    audioElement.controls = true;
    audioElement.loop = true;

    playAudio=()=>{
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }

    let canvas = document.getElementById("audio_visual");
    let ctx = canvas.getContext("2d");

    let audioCtx = new AudioContext();
    let analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    let source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    source.connect(audioCtx.destination);
    let data = new Uint8Array(analyser.frequencyBinCount);
    requestAnimationFrame(updateAudioVisualizer);

    function updateAudioVisualizer() {
        requestAnimationFrame(updateAudioVisualizer);
        analyser.getByteFrequencyData(data);
        draw(data);
    }

    draw =(data)=> {
        ctx.canvas.width  = window.innerWidth;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let space = canvas.width / data.length;
        for (let i = 1; i < data.length; i++) {
            let x = i%2 == 0 ? space*(data.length/2 + Math.floor(i/2)): space*(data.length/2 - Math.floor(i/2));
            ctx.beginPath();
            ctx.moveTo(x,canvas.height);
            ctx.lineTo(x,canvas.height-(data[i]*1.5));
            ctx.lineWidth = 10;
            ctx.stroke();
        }
    }

    audioElement.onplay = ()=>{
        audioCtx.resume();
    }
};