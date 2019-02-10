document.addEventListener('DOMContentLoaded', ()=> {

  ///////////////////////////////////////////////////  
  ///////////////// effet sonore ////////////////////
  ///////////////////////////////////////////////////

  // initialization
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  //Ciblage 
  const mute = document.querySelector('#mute');
  const lab = document.querySelector('.lab');
  const on_off =  document.querySelector('#rond');
  const potard = document.querySelector('.potard');
  const red = document.querySelector('.button');
  let pedal2 = document.querySelector('.pedal2');

  //////////////// Allumage du flux et de la pédal ////////////////////
  red.addEventListener('click',()=> {
    const context = new AudioContext();
      
    //direction de l'audio du navigateur
    navigator.mediaDevices.getUserMedia({audio:true})
       .then(function(stream) {
        let guitare = context.createMediaStreamSource(stream);
        let speaker = context.destination;
        let delay = context.createDelay(5.0);
        let distortion = context.createWaveShaper();
        let biquadFilter = context.createBiquadFilter();
        let gainNode = context.createGain(1);
        let gainNode2 = context.createGain(1); 
        let convolver = context.createConvolver();

        // Retour Guitare
        guitare.connect(speaker);
          
        ////////////////// Fonction de distortion /////////////////

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
            }
            distortion.curve = makeDistortionCurve(400);
            distortion.oversample = '4x';
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.setValueAtTime(1000, context.currentTime);
            biquadFilter.gain.setValueAtTime(25, context.currentTime);
        }

        /////////// Fonction impulsion pour la réverbération /////////////

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
          //Controller de la reverb
            let rev1 = document.querySelector('#rang1');
            let rev2 = document.querySelector('#rang2');
            let rev3 = document.querySelector('#rang3');
            let revers;
            pedal2.addEventListener('mousemove',(e)=>{
              if (e.buttons != 0) {  
                let duree = rev1.value;
                let decal = rev2.value;
                if(rev3.checked){
                  revers = 1;
                } else {
                  revers = 0;
                }
                console.log(duree+'-'+decal+'-'+revers);
                convolver.buffer = impulseResponse( duree, decal, revers); 
              }
            });

        ///////////// Fonction potard delay //////////////

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

        /////////////////// Effet Bitcruch ////////////////////



        //////////////////// Enclanchement des effets //////////////////////

        let boucle=0;
        let off_effet;

        on_off.addEventListener('click',()=> {
                     
          if(boucle == 0){ 
            let effet = document.querySelector('#effets').value;
            switch(effet){
              case 'distortion':
                disto();
                guitare.connect(distortion);
                distortion.connect(biquadFilter);
                biquadFilter.connect(gainNode);
                gainNode.connect(speaker);
                //distortion.connect(speaker);                       
                break;
              case 'overdrive':
                guitare.connect(gainNode);
                guitare.connect(gainNode2);
                gainNode.connect(speaker);
                gainNode2.connect(speaker);
                break;
              case 'delay':
                delayEffet();
                guitare.connect(delay);
                delay.connect(speaker);                  
                break;
              case 'reverb':  
                  guitare.connect(convolver);
                  convolver.connect(speaker);
                  break;
            }
            boucle = 1;
            off_effet = effet;
            console.log(off_effet+' connecté');
          } else {
            if(off_effet == 'distortion'){
                guitare.disconnect(distortion);
                distortion.disconnect(biquadFilter);
                biquadFilter.disconnect(gainNode);
                gainNode.disconnect(speaker);
            } else if (off_effet == 'overdrive'){
                guitare.disconnect(gainNode);
                guitare.disconnect(gainNode2);
                gainNode.disconnect(speaker);
                gainNode2.disconnect(speaker);
            } else if (off_effet == 'delay'){
                guitare.disconnect(delay);
                delay.disconnect(speaker);
            } else {
                guitare.disconnect(convolver);
                convolver.disconnect(speaker);
            }
            boucle = 0;
            console.log(off_effet+' deconnecté');
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

