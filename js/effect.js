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
    const red = document.querySelector('.button');

    

    red.addEventListener('click',()=> {
      const context = new AudioContext();
      
      //direction de l'audio du navigateur
      navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream) {
          let guitare = context.createMediaStreamSource(stream);
          let speaker = context.destination;
          let delay = context.createDelay(5.0);
          let distorsion = context.createWaveShaper();
          let biquadFilter = audioCtx.createBiquadFilter();
          let convolver = audioCtx.createConvolver();
          let gainNode = context.createGain(2); 
          guitare.connect(speaker);
          
          //gainNode.connect(delay);
          //delay.connect(gainNode);
          
            potard.addEventListener('mousemove', (e)=> {
              // Gestion du clic enfoncé
                if (e.buttons != 0) {
                  let nombre = document.querySelector('.nombre').textContent;
                  let delay_cmd = nombre/100/2;
                  console.log(delay_cmd); 
                  delay.delayTime.setValueAtTime(delay_cmd, context.currentTime);     
                }
              });

          // Faire le changement d'effet ICI
          let boucle=0;
          // effet de delay.js
          on_off.addEventListener('click',()=> {
                     
            if(boucle == 0){ 
              let effet = document.querySelector('#effets').value;
              switch(effet){
                case 'distorsion':
                  guitare.connect(distorsion);
                  distorsion.connect(speaker);                       
                
                case 'overdrive':
                  guitare.connect(gainNode);
                  gainNode.connect(speaker);
                
                case 'delay':
                  guitare.connect(delay);
                  delay.connect(speaker);
              }

                boucle = 1;
                console.log(effet);
            } else {
                guitare.disconnect(distorsion);
                distorsion.disconnect(speaker);
                guitare.disconnect(delay);
                delay.disconnect(speaker);
                guitare.disconnect(delay);
                delay.disconnect(speaker);
                boucle = 0;
                console.log(effet);
            }
          });

        });
    });

  //});

  // mute.addEventListener('click', ()=> {
  //   voiceMute()
  // });

  // function voiceMute() {
  //   if(mute.checked) {
  //     gainNodeNode.gainNode.setTargetAtTime(0, audioCtx.currentTime, 0)
  //     lab.innerHTML = "Unmute";
  //   } else {
  //     gainNodeNode.gainNode.setTargetAtTime(1, audioCtx.currentTime, 0)
  //     lab.innerHTML = "Mute";
  //   }
  // }

  mute.onclick = voiceMute;

  function voiceMute() {
    if(mute.id === "") {
      gainNode.gain.setTargetAtTime(0, context.currentTime, 0)
      mute.id = "activated";
      lab.innerHTML = "Unmute";
    } else {
      gainNode.gain.setTargetAtTime(1, context.currentTime, 0)
      mute.id = "";
      lab.innerHTML = "Mute";
    }
  }
});

