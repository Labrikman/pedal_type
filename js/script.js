document.addEventListener('DOMContentLoaded', function() {

//console.log('ok');

///////////////POTARD///////////////////

  // Initialisation
  var posMX, posMY;
  var posPX, posPY;
  var angleDegre, angleRadiant;
  var css_potard;
  var css_pedal;

  // Ciblages
  var potard = document.querySelector('.potard');
  var rond = document.querySelector('.rond');
  var nombre = document.querySelector('.nombre');
  var pedal = document.querySelector('.pedal');

  // FONCTION de récupération de la position du potard
  function recupPos() {
    css_potard = getComputedStyle(potard);
    css_pedal = getComputedStyle(pedal);
    posPX = parseInt(css_pedal.left)+parseInt(css_potard.left)+52;
    posPY = parseInt(css_pedal.top)+parseInt(css_potard.top)+52;
  }

  // Récupération initiale de la position du potard
  recupPos();

  // Gestion du resize
  window.addEventListener('resize', function(){
    recupPos();
  });

  // Gestion du survol
  potard.addEventListener('mousemove', function(e) {

    // Gestion du clic enfoncé
    if (e.buttons != 0) {

      // Récupération de la position de la souris
      posMX = e.clientX;
      posMY = e.clientY;

      // Détermination de l'angle de rotation
      angleRadiant = Math.atan2(posMY-posPY,posMX-posPX);
      angleDegre = Math.round(angleRadiant*(180/Math.PI))+90;

      // Formatage
      if (angleDegre<0) {angleDegre = 360+angleDegre;}

      // Modification graphique
      rond.style.transform = 'rotate('+angleDegre+'deg)';
      nombre.textContent = Math.round(angleDegre/3.6);

//console.log (posMX,posMY,posPX,posPY);

    }
  });

//////////////activation de l'effet visuel////////////////

//ciblage bouton avec id
var on_off = document.getElementById("rond");

// Allumage de l'amploule
  //fonction du click
  on_off.addEventListener('click',function allume() {
  // Ciblage des éléments
      var ampoule = document.querySelector(".ampoule");
      var bouton = document.querySelector(".bouton");
     // var fond = document.querySelector("body");
  // Switch de classe
      ampoule.classList.toggle('active');
      bouton.classList.toggle('on');
      pedal.classList.toggle('jour');
  });





});
