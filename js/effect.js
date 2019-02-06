document.addEventListener('DOMContentLoaded', ()=> {
    /////////////////  effet sonore  ///////////////////

  // initialization
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  //Ciblage 
    // gestion de mute
    const mute = document.querySelector('#mute');
    const lab = document.querySelector('.lab');
    const on_off =  document.querySelector('#rond');

    document.querySelector('.button').addEventListener('click',()=> {
      const context = new AudioContext();
      
      //direction de l'audio du navigateur
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream) {
          const guitare = context.createMediaStreamSource(stream);
          const speaker = context.destination;
          guitare.connect(speaker);
          
        // effet de delayjs
          on_off.addEventListener('click',()=> {
            let delay = context.createDelay(0.5);
            let gain = context.createGain(0.8);
            delay.connect(gain);
            gain.connect(delay);

            guitare.connect(delay);
            guitare.connect(gain);

            guitare.connect(speaker);
          });
        });
    });

// One-liner to resume playback when user interacted with the page.
mute.addEventListener('click', ()=> {
  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

  
  //});



  // mute.addEventListener('click', ()=> {
  //   voiceMute()
  // });

  // function voiceMute() {
  //   if(mute.checked) {
  //     gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
  //     lab.innerHTML = "Unmute";
  //   } else {
  //     gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0)
  //     lab.innerHTML = "Mute";
  //   }
  // }

});

