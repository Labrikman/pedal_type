document.addEventListener('DOMContentLoaded', ()=> {
    /////////////////  effet sonore  ///////////////////

  // initialization
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  //Ciblage 
    // gestion de mute
    const mute = document.querySelector('#mute');
    const lab = document.querySelector('.lab');
    const on_off =  document.querySelector('#rond');
    const potard = document.querySelector('.potard');

    document.querySelector('.button').addEventListener('click',()=> {
      const context = new AudioContext();
      
      //direction de l'audio du navigateur
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream) {
          const guitare = context.createMediaStreamSource(stream);
          const speaker = context.destination;
          guitare.connect(speaker);
          var allume = 0;
        // effet de delay.js
          on_off.addEventListener('click',()=> {

            if(allume == 0){  
               potard.addEventListener('mousemove', (e)=> {
                // Gestion du clic enfoncé
                  if (e.buttons != 0) {
                    let nombre = document.querySelector('.nombre').textContent;
                    delay_cmd = nombre/100;
                    console.log(delay_cmd);
                    const delay = context.createDelay();
                    delay.delayTime.value = delay_cmd/2;
                  }
                });
                
                  const gain = context.createGain(0.8);
                  delay.connect(gain);
                  gain.connect(delay);
                  guitare.connect(delay);
                  guitare.connect(gain);
                  guitare.connect(speaker);
                
            } else {
              allume = 0;
              console.log(allume);
            }
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

