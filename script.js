
/* ................./ les variables /................... */


// variable pré-établie
let numeroDe = 0;

var joueur = 0;

var roundPlayer1= document.getElementById("round-player1")
roundPlayer1.value = 0;

var roundPlayer2 = document.getElementById("round-player2")
roundPlayer2.value = 0;

var globalPlayer1 = document.getElementById('global-player1')
globalPlayer1.value = 0;

var globalPlayer2 = document.getElementById('global-player2')
globalPlayer2.value = 0;

var buttonRolldice = document.getElementById('rolldice')

var buttonHold = document.getElementById('hold')


/* ................../ les fonctions /...................... */



// fonction pour incrementer score apres lancer de Dé
var score=0;
function addScore(increment) {
score+=increment;
return score;
};

//fonction pour faire apparaitre la couleur du joureur en cours
function couleurJoueur(){

    if (joueur < 1){

        // afficher style.css joueur1
        let pastilleJoueur1 = document.getElementById("pastille_joueur1");
        pastilleJoueur1.style.background = "red";
      
        // masquer style.css du joueur2
        let pastilleJoueur2 = document.getElementById("pastille_joueur2");
      pastilleJoueur2.style.background = "none";
       

    }else if(joueur > 0){

        // afficher style.css joueur2
        let pastilleJoueur2 = document.getElementById("pastille_joueur2");
        pastilleJoueur2.style.background = "red";
   

        // masquer style.css du joueur1
        let pastilleJoueur1 = document.getElementById("pastille_joueur1");
        pastilleJoueur1.style.background = "none";
    }
    
}

// fonction pour ajouter une image sur le Dé virtuel
var image = function (resultat){
    document.getElementById('image-dice')
    .src = "images/dé-" + resultat + ".jpg"
}

// function nouvelle partie
function newgame(){ 
roundPlayer1.value = 0;
roundPlayer1.innerText = 0;
roundPlayer2.value = 0;
roundPlayer2.innerText = 0;
globalPlayer1.value = 0;
globalPlayer1.innerText = 0;
globalPlayer2.value = 0;
globalPlayer2.innerText = 0;
joueur = 0;
score = 0;
couleurJoueur()
}

//confetti gagnant start
const startConfetti = () => {
    setTimeout(function(){
        confetti.start();
        
        
    })
}
//confetti stop
const stopConfetti = () => {
    setTimeout(function(){
        confetti.stop();
    },3000)
}

// fonction pour verifier et afficher le nom du gagnant
function winner(score, message) {

   if (score == 100 || score > 100){
        //declancher animation + modal message
        joueurWin.innerText = message
        toggleModal()
        startConfetti();
        stopConfetti();
    }
}


// fonction pour activer animation du lancer de dé
function animationStart() {
    var element = document.getElementById("image-dice");
    element.classList.add("animation");
    buttonRolldice.style.pointerEvents = "none";
    buttonHold.style.pointerEvents = "none";
}


// fonction pour désactiver animation du lancer de dé
function animationEnd() {
    setTimeout(() => {
    var element = document.getElementById("image-dice");
    element.classList.remove("animation");
    buttonRolldice.style.pointerEvents = "auto";
    buttonHold.style.pointerEvents = "auto";
},1500)
}


 // fonction nouvelle partie click newgame
 document.getElementById("newgame").
 addEventListener('click', function(){
     location.reload();
 });



// fonction pour afficher une modal message winner
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const joueurWin = document.getElementById('name_winner');

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal(); 
    }
}


trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
closeButton.addEventListener("click", function(){
    newgame();
});






/* ......../ fonction en application /.......... */




//afficher la couleur du joueur de depart
couleurJoueur()

// afficher l'image de départ sur le Dé virtuel
image(numeroDe)



// fonction lors du click sur rolldice
document.getElementById("rolldice").
addEventListener('click', function(){

    //afficher image a zero avant animation
    image(0);
    // animation du lancer du dé
    animationStart()
    animationEnd()

// timer pour attendre la fin de l'aniamtion et lancer les opérations
setTimeout(() => {
    
    //afficher la couleur du joueur
    couleurJoueur()

    //lancer dé
    numeroDe = parseInt(Math.random()*6+1);

    image(numeroDe)

    //appel fonction pour incrémenter le score
    current = addScore(numeroDe)
   
     
    // verifier quel est le joueur est le player1
    if (joueur == 0){

        // afficher le score dans current player1 + minitueur pour attendre l'affiche image du dé
        setTimeout(() =>{
        roundPlayer1.value = current;
        roundPlayer1.innerText = current},300)
    
        //si resultat du lancer = 1
        if ( numeroDe == 1) {
            //réinitialiser round + score + incrementer joueur pour changer player
            roundPlayer1.value = 0;
            roundPlayer1.innerText = 0;
            score = 0; 
            current=0;
            joueur++;

            //appel fonction pour chnager indicateur de joueur
            couleurJoueur()
        }
            
        
    // verifier quel est le joueur est le player2       
    }else if (joueur > 0){
        
        // afficher le score dans current player2 + minitueur pour attendre l'affiche image du dé
        setTimeout(() =>{
        roundPlayer2.value = current
        roundPlayer2.innerText = current},300)
        
        if ( numeroDe == 1) {
        //réinitialiser round + score + décrementer joueur pour changer player
        roundPlayer2.value = 0;
        roundPlayer2.innerText = 0;
        score = 0; 
        current=0;
        joueur--;

        //appel fonction pour chnager indicateur de joueur
        couleurJoueur()
        
        }
    }    
}, 1500);
})
    





// fonction lors du click sur hold
document.getElementById("hold").
addEventListener('click', function(){ 
   
    // si joueur en cours = player1
    if (joueur == 0){

        //incrementer le score
        const sumvalue = roundPlayer1.value + globalPlayer1.value;

        //affecter le resultat dans value + afficher
        globalPlayer1.innerText = sumvalue;
        globalPlayer1.value = sumvalue;

        //réinitialiser le score round + numerodé
        roundPlayer1.value = 0;
        roundPlayer1.innerText = 0;
        score = 0;

       
        // incrementer joueur pour changer player
        joueur++;
    
        //appel fonction pour changer indicateur de joueur
        couleurJoueur()
        //réinitialiser image du dé
        image(0)

        //verifier score gagnant
        winner(sumvalue, "le players 1 gagne !")

    

    // si joueur en cours = player2
    }else if (joueur > 0 ){
     

        //incrementer le score
        const sumvalue2 = roundPlayer2.value + globalPlayer2.value;
        
        //affecter le resultat dans value + afficher
        globalPlayer2.innerText = sumvalue2;
        globalPlayer2.value = sumvalue2;

        //réinitialiser le score round + numerodé

        roundPlayer2.value = 0;
        roundPlayer2.innerText = 0;
        
        score = 0;
        // incrementer joueur pour changer player
        joueur--;
    
        //appel fonction pour changer indicateur de joueur
        couleurJoueur()

        //réinitialiser image du dé
        image(0)

        //verifier score gagnant
        winner(sumvalue2, "le players 2 gagne !")
    }
   });
   
