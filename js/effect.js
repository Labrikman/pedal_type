document.addEventListener('DOMContentLoaded', ()=> {
    /////////////////  effet sonore  ///////////////////

  // initialization
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  //Ciblage 
    // gestion de mute
    const mute = document.querySelector('#mute');
    //const lab = document.querySelector('.lab');
    const on_off =  document.querySelector('#rond');
    const potard = document.querySelector('.potard');
    const red = document.querySelector('.button');

    

    red.addEventListener('click',()=> {
      const context = new AudioContext();
      
      //direction de l'audio du navigateur
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream) {
          let guitare = context.createMediaStreamSource(stream);
          let speaker = context.destination;
          let delay = context.createDelay(5.0);
          let gain = context.createGain(2); 
          guitare.connect(speaker);
          
          //gain.connect(delay);
          //delay.connect(gain);
          

          potard.addEventListener('mousemove', (e)=> {
            // Gestion du clic enfoncé
              if (e.buttons != 0) {
                let nombre = document.querySelector('.nombre').textContent;
                let delay_cmd = nombre/100/2;
                console.log(delay_cmd); 
                delay.delayTime.setValueAtTime(delay_cmd, context.currentTime);     
              }
            });
            
          let effet=0;
          // effet de delay.js
          on_off.addEventListener('click',()=> {
                     
            if(effet == 0){ 
                guitare.connect(gain);
                guitare.connect(delay);                          
                delay.connect(speaker);
                effet = 1;
                console.log(effet);
            } else {
                guitare.disconnect(delay);
                delay.disconnect(speaker);
                effet = 0;
                console.log(effet);
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

