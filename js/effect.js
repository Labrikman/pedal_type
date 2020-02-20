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
          let biquadFilter = context.createBiquadFilter();
          //let convolver = context.createConvolver();
          let gainNode = context.createGain(1);
          let gainNode1 = context.createGain(1); 
          let gainNode2 = context.createGain(1); 
 
          guitare.connect(speaker);
          
          
          
          //Fonction de distortion
          function disto(){
            function makeDistortionCurve(amount) {
              let k = typeof amount === 'number' ? amount : 50,
                n_samples = 44100,
                curve = new Float32Array(n_samples),
                deg = Math.PI / 180,
                i = 0,
                x;
              for ( ; i < n_samples; ++i ) {
                x = i * 2 / n_samples - 1;
                curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
              }
              return curve;
            };
            
            distortion.curve = makeDistortionCurve(400);
            distortion.oversample = '4x';
          }

          //gainNode.connect(delay);
          function delayEffet(){
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
            }

          // Faire le changement d'effet ICI
          let boucle=0;
          // effet de delay.js
          on_off.addEventListener('click',()=> {
                     
            if(boucle == 0){ 
              let effet = document.querySelector('#effets').value;
              switch(effet){
                case 'distorsion':
                  disto();
                  guitare.connect(distorsion);
                  distorsion.connect(speaker);                       
                  break;
                case 'overdrive':
                  guitare.connect(gainNode);
                  guitare.connect(gainNode1);
                  guitare.connect(gainNode2);
                  gainNode.connect(speaker);
                  gainNode1.connect(speaker);
                  gainNode2.connect(speaker);
                  break;
                case 'delay':
                  delayEffet();
                  guitare.connect(delay);
                  delay.connect(speaker);                  
                  break;
                case 'reverb':
                    function impulseResponse( duration, decay, reverse ) {
                      let sampleRate = context.sampleRate;
                      let length = sampleRate * duration;
                      let impulse = context.createBuffer(2, length, sampleRate);
                      let impulseL = impulse.getChannelData(0);
                      let impulseR = impulse.getChannelData(1);
                      if (!decay)
                          decay = 2.0;
                      for (let i = 0; i < length; i++){
                        let n = reverse ? length - i : i;
                        impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
                        impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
                      }
                      return impulse;
                      }  
                      function createReverb() {
                        var convolver = context.createConvolver();
                        convolver.buffer = impulseResponse( 5, 2.0, 0); 
                        guitare.connect(convolver);
                        convolver.connect(speaker);
                        return convolver;
                    }
                      createReverb()
                      break;
              }
                boucle = 1;
                console.log(effet);
            } else {
              let effet = document.querySelector('#effets').value;
              switch(effet){
                case 'distorsion':
                  guitare.disconnect(distorsion);
                  distorsion.disconnect(speaker);
                  break;
                case 'overdrive':
                  guitare.disconnect(gainNode);
                  guitare.disconnect(gainNode1);
                  guitare.disconnect(gainNode2);
                  gainNode.disconnect(speaker);
                  gainNode1.disconnect(speaker);
                  gainNode2.disconnect(speaker);
                  break;
                case 'delay':
                  guitare.disconnect(delay);
                  delay.disconnect(speaker);
                  break;
                case 'reverb':
                  guitare.disconnect(convolver);
                  convolver.disconnect(speaker);
                  break;
              }
                boucle = 0;
                console.log(effet);
                return;
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
  //     gainNodeNode.gainNode.setTargetAtTime(0, context.currentTime, 0)
  //     lab.innerHTML = "Unmute";
  //   } else {
  //     gainNodeNode.gainNode.setTargetAtTime(1, context.currentTime, 0)
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

