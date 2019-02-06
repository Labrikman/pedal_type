document.addEventListener('DOMContentLoaded', ()=> {
    /////////////////  effet sonore  ///////////////////

  // initialization
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  //Ciblage 
    // gestion de mute
    const mute = document.querySelector('#mute');
    const lab = document.querySelector('.lab');
  
    document.querySelector('.button').addEventListener('click', function() {
      const context = new AudioContext();
      const delay = context.createDelay(5.0);
      
      //direction de l'audio du navigateur
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream) {
          const guitare = context.createMediaStreamSource(stream);
          const speaker = context.destination;
          guitare.connect(speaker);
        });
    });

// One-liner to resume playback when user interacted with the page.
mute.addEventListener('click', ()=> {
  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

  // effet de delayjs
  const on_off =  document.querySelector('#rond');
    // Fonction  
      on_off.addEventListener('click',function active() {
        guitare.connect(delay);
        let gain = context.createGain();
        delay.connect(gain);
        gain.connect(speaker);
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

