//déclaration des variables des ékéments html
   let button = document.querySelector("#click");
   let multi = document.querySelector("#multi");
   let info_multi = document.querySelector("#info_multi");
   let prix_multi = document.querySelector("#prix_multi");
   let affichage = document.querySelector("#affichage");
   let erreur_message = document.querySelector("#erreur_message");
   let message_correct = document.querySelector("#message_correct");
   let niveau_jeux = document.querySelector("#niveau");
   let autoclick = document.querySelector("#autoclick");
   let info_autoclick = document.querySelector("#info_autoclick");
   let prix_autoclick = document.querySelector("#prix_autoclick");
   let bonus = document.querySelector("#bonus");
   let time = document.querySelector("#time");
   let info_bonus = document.querySelector("#info_bonus");
   let prix_bonus = document.querySelector("#prix_bonus");
   let brique = document.querySelector("#brique");
   let nb_autoclicker = document.querySelector("#nb_autoclicker");
   let playgame = document.querySelector("#play_game");
   let menu_game = document.querySelector("#menu_game");
   let speackermusic = document.querySelector("#icone_master_musique");
   let speackersound = document.querySelector("#icone_master_sound");

// 

//sound design
   let jump_sound = document.querySelector("#jump_sound");
   let piece_sound = document.querySelector("#piece_sound");
   let yoshi_sound = document.querySelector("#yoshi_sound");
   let level_sound = document.querySelector("#next_level_sound");
   let ahah_sound = document.querySelector("#ahah_sound");
   let invincible = document.querySelector("#invincible");
   let power_up = document.querySelector("#power_up");
   let starsound = document.querySelector("#stars_dispo");
   let themegame = document.querySelector("#theme_sound");
   let voicego = document.querySelector("#voice_go_sound");
//

//déclaration des constante
   const passage_niveau = 6;//le niveau change tout les multiple de 4
   const rangeMusique = document.querySelector("#range_music");
   const rangesound = document.querySelector("#range_sound");
//

//volume son
   let volumemusique = rangeMusique.value/100;
   let volumesound = rangesound.value/100;
//

//déclaration des variables jeux
   let value_btn_multipli = 2;
   let score = 0;
   let multiplicateur = 1;
   let compteurClics_multiplicateur = 0;
   let compteurClics_autoclicker = 0;
   let compteurClics_bonus = 0;
   let compteurClics_timer = 0;
   let paie_multiplicateur = 50;
   let paie_autoclicker = 500;
   let paie_bonus = 5000;
   let niveau = 1;
   let interval;//on déclare la variable interval sans valeur (utilisé pour le clearinterval)
   let intervaltimer;//on déclare la variable interval sans valeur utilisé pour le clearinterval
   let timer=30;
   let value_btn_bonus=""; 
//

//************************  valeur au chargement de la page ************************ 

   //initialisation du texte html pour pour remplacer le texte défini dans le html en dur
   niveau_jeux.innerHTML = "1";

   //initialisation des élément html par leur value pour remplacer la value défini dans le html en dur

   info_bonus.innerHTML="Bonus" ;
   prix_bonus.innerHTML="$"+ paie_bonus

   nb_autoclicker.innerHTML=compteurClics_autoclicker;
   info_autoclick.innerHTML="Auto" ;
   prix_autoclick.innerHTML="$" + paie_autoclicker;

   info_multi.innerHTML="x2";
   prix_multi.innerHTML= "$" + paie_multiplicateur;
   affichage.innerHTML =  score;

   levelmusic();
   levelsound();
   creatspeedstar();

//************************  fin valeur au chargement de la page ************************


/************************  Affichage dans la page HTML ************************ /

   /** Fonction qui s'occupe de l'actualisation de la page HTML **/
   function actualiser_page() {
   // on change la valeur du html a chaque tour(+1)
   affichage.innerHTML = score;

   //valeur ecrite sur le bouton
   info_multi.innerHTML = "x" + Math.trunc((multiplicateur + 1));
   prix_multi.innerHTML= "$" + Math.trunc(paie_multiplicateur);

   //on met à jour la valeur html de niveau jeux pour afficher le niveau en cours sur la page 
   niveau_jeux.innerHTML =  niveau;
      //mis a jour du bouton bonus
     
      time.innerHTML= value_btn_bonus ;
       //mis a jour info autoclicker dans le aside
      info_autoclick.innerHTML="Auto" ;
      prix_autoclick.innerHTML="$" + Math.trunc(paie_autoclicker);
       //mis a jour info autoclicker dans le header
      nb_autoclicker.innerHTML=compteurClics_autoclicker;

      info_bonus.innerHTML="Bonus";
      prix_bonus.innerHTML="$"+ Math.trunc(paie_bonus);
   }

   /** Fonction qui affiche un message durant un laps de temps court **/
   function flash(dom_element, text, duration = 5000) {
      dom_element.innerHTML = text;
      //on change la valeur html de message_correct a vide après 5 seconde (le message d'information va disparaitre après 5 secondes )
      setTimeout(function () {
         dom_element.innerHTML = " ";
      }, duration);
   }

/************************ fin  Affichage dans la page HTML ************************ /

/************************  Logique ************************/

   /** Fonction qui incrémente le score **/
   function ajoute_score() {
     
      //on incrémente de la valeur de score + la valeur du multiplicateur .Si on clique pas sur multiplicateur on reste a 1
      
      score +=multiplicateur;
      soundpiece();
     
      //affichage prend la veleur de score (+1 à chaque tour)
      
      // si le score est superieur a 200 et désactive le bouton autoclick
      if (score >= paie_multiplicateur) {
         multi.classList.remove("disabled");
         multi.classList.add("disponible");   
      }else{
         multi.classList.add("disabled");
         multi.classList.remove("disponible");
      }
      if (score >= paie_autoclicker) {
         autoclick.classList.remove("disabled");
         autoclick.classList.add("disponible");
      }else{
         autoclick.classList.add("disabled");
         autoclick.classList.remove("disponible");
      }
      if (score >= paie_bonus){
         bonus.classList.remove("disabled");
         bonus.classList.add("disponible");
      }else{
         bonus.classList.add("disabled");
         bonus.classList.remove("disponible");
      }
      if(timer>0 && timer<30){
        
         bonus.classList.add("disabled");
         bonus.classList.remove("disponible");
      }else{
       
         value_btn_bonus="";
      }
    actualiser_page()
   }

   /** Fonction qui incrémente le multiplicateur **/
   function augmenterMultiplicateur() {
      //si le score est superieur ou egale au prix du multiplicateur(paie)
      
      if (score >= paie_multiplicateur) {
         yoshidispo();

         //on soustrait la valeur de paie la valueur de score
         score = score - paie_multiplicateur;
         // on ajoute 2 à chaque clic()
         multiplicateur++;
         
       //on affiche lme prix dans le bouton
         "Prix : " + paie_multiplicateur  ;

         flash(message_correct, "tu multiplis ton score unitaire est  par " + multiplicateur);
       //on appel la fonction next_level pour changer de niveau
         next_Level()
         
         multi.classList.add("disabled");
         multi.classList.remove("disponible");
      
      } else {
         //si on a pas assez de points pour acheter un multiplicateur, on affiche un message d'erreur pendant 5 secondes
        // flash(erreur_message, "Tu n'as pas " + paie_multiplicateur + " points pour acheter un muliticateur ❌")
        multi.classList.add("disabled");
        multi.classList.remove("disponible");
      }
    actualiser_page();
   }
   //fonction de permet de changer de niveau après avoir cliquer 2 fois sur le multiplicateur 
   function next_Level() {
      //on incremente compteurclic de 1 pour savoir combien de fois on clique dessus 
      compteurClics_multiplicateur++;
      //si compteur clic est un multiple de la valeur passage_niveau
      if (compteurClics_multiplicateur % passage_niveau === 0){
         //on calcule l'affichage du niveau en cours (match.floor pour convertir en integer)
         niveau = Math.floor(compteurClics_multiplicateur / passage_niveau) + 1;
         console.log("on passe au nivau suivent");
         //console.log("le compteur de clic fonctionne ✅");
         //on multipli par 2 le prix d'achat du multiplicateur
         paie_multiplicateur *= 2;
         next_level_sound() 
         niveau_jeux.classList.add("event_scale")
         setTimeout(() => {
            niveau_jeux.classList.remove("event_scale")
         }, 3000);
      
      }
   }
   
   // Fonction qui génère un autoclicker 
   function autoclicker() {
      ajoute_score();
      for (let i = 0; i < multiplicateur; i++) {
         creatstars();
      }
      actualiser_page();
   }

   //fonction pour acheter un auto clicker
   function achatClicker(){
      if (score>=paie_autoclicker) {
         //on incremente compteurclic de 1 pour savoir combien de fois on clique dessus 
         compteurClics_autoclicker++;
         starsdispo();

         //si la variable interval n'est pas null ou indefinit 
         if (interval !== undefined) {
            //on vide réinitialise le interval de l'autoclicker
            clearInterval(interval)
         }
         //on initialise la variale avec le set interval 
         // pour supprimer le décalage on boucle sur le nomrbre de clic (on réinitialise le décalage de l'autoclicker )
         interval = setInterval(() => {for (let i = 0; i<compteurClics_autoclicker; i++){ autoclicker()}}, 1000);
           
         //on deduit le score par le prix de l'autoclicker
         score = score - paie_autoclicker;
         //console.log("nb auto " + compteurClics_autoclicker);
      
         //si compteur clic cliquer est un multiple de la valeur passage_niveau
         if (compteurClics_autoclicker % passage_niveau === 0){
            //on multipli par 2 le prix d'achat de l'auto clicker
            paie_autoclicker *= 2;
         } 
         console.log("value autoclicker : " + paie_autoclicker );
      
         //console.log("value autoclicker = " + paie_autoclicker);
      }else{
         //flash(erreur_message, "tu ne dispose pas de " + paie_autoclicker + " pour acheter un auto clicker")
         autoclick.classList.add("disabled");
         autoclick.classList.remove("disponible");
      }
    actualiser_page()
   }

   //fonction réinitialise le valeur du multiplicateur par défaut 30 seconde après avoir cliquer sur le bonnus
   function reset_bonus(){
      //après 30 seconde on divise par 3 le valeur du multiplicateur pour le réinitialiser a 1
      setTimeout(function() {
         multiplicateur /= 3;
      
      }, 30000);
   }


   //funnction du décompter de 30 secondes 
      function decompte() {
      
         compteurClics_timer++
         if (compteurClics_timer>1) {
            timer = 30; //30 secondes
         }
      
         intervaltimer=setInterval(function (){
            
         timer-- ;//on soustrait 1 à chaque itération
         value_btn_bonus = "Time : " + timer;//mise a jour de la valeur du bouton 
         //bonus.setAttribute("disabled", "");
            bonus.classList.add("disabled");
            bonus.classList.remove("disponible");
         creatluigi();
         
      
            if (timer === 0) {//si le décmpte est à zero on arret le compter
               clearInterval(intervaltimer);
               if (score>paie_bonus) {
                  //bonus.removeAttribute("disabled", "");
                  bonus.classList.remove("disabled");
                  bonus.classList.add("disponible");
                  value_btn_bonus = " " ;
               }
            }
            actualiser_page() //on appel la fonction actualiser page a chaque itération pour metre a jour la valeur du bouton
         }, 1000)//interval de 1s pour chaque itération
      }
   //  




   //fonction pour acheter un bonus
      function achatBonus(){
      
         if (score>=paie_bonus) {
            //on incremente on multipli x3 la valeur unitaire du multiplicateur
            multiplicateur *= 3;
         
            //on appel la fonction decompte
         decompte();
         
         //on  appel la fonction reset bonus qui initialise la valeur du bouton bonus 
            reset_bonus()
         
            compteurClics_bonus++;//on ajoute 1 à compteur clic pour savoir combien de fois on a cliqué dessus
            //on deduit le score par le prix du bonus
            score = score - paie_bonus;
            bonussound()
            //si compteur clic cliquer est un multiple de la valeur passage_niveau
            if (compteurClics_bonus % passage_niveau === 0){
               //on multipli par 2 le prix d'achat de l'auto clicker
               paie_bonus *= 2;
            } 
         }else{//si non on affiche un message d'erreur
         //flash(erreur_message, "Tu ne dispose pas de " + paie_bonus + " pour acheter un bonus");
         }

      actualiser_page()
      }
   //


   //fonction qui lance le jeux 
      function lancerjeux(){
         voicego.play();//voix de mario au click sur le bouton jouer
         //passe la section en display none 1 seconde après avoir clicker sur jouer le temps que marion termine de parler puis un lance la musique du theme
         setTimeout(() => {
            menu_game.classList.add("none")
            themesound() 
         }, 1000);
      }
   //



   /**********  gestion des éléments crées  **********/

      //fonction qui crée une pièce 
      function piece() {
         const newpiece = document.createElement("span");
         newpiece.classList.add('piece');
         document.querySelector("#ctn_img").appendChild(newpiece);
         soundjump();
      }


      //fonction qui crée une étoile
      function creatstars() {
         const newStars = document.createElement("span");
         newStars.classList.add('stars');
         document.querySelector("#ctn_img").appendChild(newStars);
      }

      //fonction qui crée une tete de luigi
      function creatluigi() {
         const newLuigi = document.createElement("span");
         newLuigi.classList.add('head_luigi');
         document.querySelector("#ctn_click").appendChild(newLuigi);
      }

      //fonction qui crée une etoile filante en arrière plan
      function creatspeedstar(){
         setInterval(() =>{
            const speedstars = document.createElement("span");
            speedstars.classList.add('speedstars');
            document.querySelector("#header").appendChild(speedstars);
         }, 20000);
         
      }
   /********** fin gestion des éléments crées  **********/





   /**********  gestion de l'audio  **********/

      //fonction qui regle le volume de la musique
      function levelmusic(){
         themegame.volume=volumemusique;
         invincible.volume=volumemusique;
         // mise à jour de la valeur 
         volumemusique = rangeMusique.value/100;
         speackermusic.src="asset/img/master.webp";
      }   

      //fonction qui regle le volume des sound
      function levelsound(){
         jump_sound.volume=volumesound;
         piece_sound.volume=volumesound;
         starsound.volume=volumesound;
         yoshi_sound.volume=volumesound;
         level_sound.volume=volumesound;
         power_up.volume=volumesound;
         ahah_sound.volume=volumesound;
         // mise à jour de la valeur 
         volumesound=rangesound.value/100;
         speackersound.src="asset/img/master.webp"; 
         
      }
      //fonction qui coupe le son
      function mutedsound(){
         if (jump_sound.volume > 0) {
            jump_sound.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            jump_sound.volume=volumesound; 
         } 
         if (piece_sound.volume > 0) {
            piece_sound.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            piece_sound.volume=volumesound; 
         } 
         if (starsound.volume > 0) {
            starsound.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            starsound.volume=volumesound; 
         } 
         if (yoshi_sound.volume > 0) {
            yoshi_sound.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            yoshi_sound.volume=volumesound; 
         } 
         if (level_sound.volume > 0) {
            level_sound.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            level_sound.volume=volumesound; 
         } 
         if (power_up.volume > 0) {
            power_up.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            power_up.volume=volumesound; 
         } 
         if (ahah_sound.volume > 0) {
            ahah_sound.volume=0;
            speackersound.src="asset/img/iconemuted.webp";
         }else{
            ahah_sound.volume=volumesound;
            speackersound.src="asset/img/master.webp"; 
         } 
      }

      //fonction qui coupe la musique
      function mutedmusic(){
         if (themegame.volume > 0) {
            themegame.volume=0;
            speackermusic.src="asset/img/iconemuted.webp";
         }else{
            themegame.volume=volumemusique;
         }
         if (invincible.volume > 0) {
            invincible.volume=0
            speackermusic.src="asset/img/iconemuted.webp";
         }else{
            invincible.volume=volumemusique;
            speackermusic.src="asset/img/master.webp";
         } 
      }

         //fonction qui lance la musique principale
         function themesound(){ //son du theme
            themegame.play();
         }

         // fonction qui déclanche le son quand mario saute
         function soundjump() {
            if (jump_sound.paused) {
            // Si le son est en pause, lancez-le
            jump_sound.play();
            } else {
            // Si le son est en cours de lecture, mettez-le en pause et réinitialisez la position de lecture à zéro
            jump_sound.pause();
            jump_sound.currentTime = 0;
            jump_sound.play();
            }
         }
         
         // fonction qui déclanche le son quand un piece apparait 
         function soundpiece() {
            if (piece_sound.paused) {
            // Si le son est en pause, lancez-le
            piece_sound.play();
            } else {
            // Si le son est en cours de lecture, mettez-le en pause et réinitialisez la position de lecture à zéro
            piece_sound.pause();
            piece_sound.currentTime = 0;
            piece_sound.play();
            }
         }

         
         function starsdispo() {
            starsound.play();//son de l'autoclicker quand on click dessus
         }
         function yoshidispo() { //son de yoshi quand on click sur le multiplicateur
            yoshi_sound.play();
         }
         function next_level_sound() { // son qui informe le changement de niveau
            level_sound.play();
         }
         function bonussound(){
            power_up.play();
            ahah_sound.play();
            //on lance gère les musiques avec 1s econde décallage le temps que les autres sons se termine
            setTimeout(() => {
               themegame.pause();//on met en pause la musique du theme 
               invincible.play(); // on met en lecture la musique invincible
               button.classList.add("invincible")
            }, 1000);
            //on réinitialise la musique par defuat après 30 secondes
            setTimeout(() => {
               invincible.pause();
               themegame.play();
               button.classList.remove("invincible")
            }, 30000);
         }

   /********** fin gestion de l'audio  **********/


/************************ fin Logique  ************************/



/************************ Elements déclencheur  ************************/

   //au clic sur le bouton click on lance la fonction ajoute_score avec un ecouter d'evenement
   button.addEventListener("click", ajoute_score);
   // au clic sur le bouton multiplicateur on multipli sa valeur actuel par 2
   multi.addEventListener("click", augmenterMultiplicateur);
   // au clic sur le bouton autoclick on multipli on lance l'auto clicker
   autoclick.addEventListener("click", achatClicker)
   // au clic sur le bouton bonus on active le bonus pendan 30 secondes
   bonus.addEventListener("click", achatBonus);
   //lancer le jeux
   playgame.addEventListener("click", lancerjeux);
   //les réglages son
  // au click sur les inputs range on appel les foncion qui gère les volumes
   rangeMusique.addEventListener("input", levelmusic);
   rangesound.addEventListener("input", levelsound);
      
/************************ fin Elements déclencheur  ************************/