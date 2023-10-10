//Seleccionar todos los elementos
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{ //Una vez se cargue la ventana
    for (let i = 0; i < allBox.length; i++) { //añadir atributo onclick en todos los span disponibles
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); //ocultar caja de selección
    playBoard.classList.add("show"); //mostrar la sección playboard
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide"); //ocultar caja de selección
    playBoard.classList.add("show"); //mostrar la sección playboard
    players.setAttribute("class", "players active player"); //establecer atributo class en players con valores de players active player
}

let playerXIcon = "fas fa-times"; //nombre de clase del icono de la cruz fontawesome
let playerOIcon = "far fa-circle"; //nombre de clase del icono del círculo fontawesome
let playerSign = "X"; //esta es una variable global porque la hemos usado en varias funciones
let runBot = true; //esta tambien es una variable global con valor boolen...usamos esta variable para parar el bot una vez que el partido es ganado por alguien o empatado

// función clic del usuario
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O"; //if player choose (O) then change playerSign to O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element/box
        players.classList.remove("active"); ///add active class in players
        element.setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element/box
        element.setAttribute("id", playerSign); //establecer el atributo id en span/box con el signo elegido por el jugador
        players.classList.add("active"); ///añadir clase activa en jugadores
    }
    selectWinner(); //llamar a la función selectWinner
    element.style.pointerEvents = "none"; //una vez que el usuario selecciona una casilla, no puede volver a hacer clic en ella
    playBoard.style.pointerEvents = "none"; //añade pointerEvents none al playboard para que el usuario no pueda hacer click inmediatamente en ninguna otra casilla hasta que el bot seleccione
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); //generar un número aleatorio para que el bot se retrase aleatoriamente en seleccionar la casilla no seleccionada
    setTimeout(()=>{
        bot(runBot); //llamando a la función bot
    }, randomTimeDelay); //passing random delay value
}

// función de selección automática de bot
function bot(){
    let array = []; //creating empty array...we'll store unclicked boxes index
    if(runBot){ //if runBot is true
        playerSign = "O"; //change the playerSign to O so if player has chosen X then bot will O
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){ //if the box/span has no children means <i> tag
                array.push(i); //inserting unclicked boxes number/index inside array
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        if(array.length > 0){ //if array length is greater than 0
            if(players.classList.contains("player")){ 
                playerSign = "X"; //if player has chosen O then bot will X
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside bot selected element
                allBox[randomBox].setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
                players.classList.add("active"); ///add active class in players
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside bot selected element
                players.classList.remove("active"); //eliminar la clase active de los jugadores
                allBox[randomBox].setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
            }
            selectWinner(); //llamar a la función selectWinner
        }
        allBox[randomBox].style.pointerEvents = "none"; //una vez que el bot selecciona una caja, el usuario no puede hacer click en esa caja
        playBoard.style.pointerEvents = "auto"; //añade pointerEvents auto en el playboard para que el usuario pueda volver a hacer click en la casilla
        playerSign = "X"; //si el jugador ha elegido X entonces el bot será O correcto entonces cambiamos el playerSign de nuevo a X para que el usuario sea X porque arriba hemos cambiado el playerSign a O para el bot
    }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id;//devuelve el valor de id
}
function checkIdSign(val1, val2, val3, sign){ //comprobar si el valor del id es igual al signo (X u O) o no si es si entonces devolver true
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){ //si la siguiente combinación ganadora coincide, selecciona el ganador
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, jugadorSigno) || checkIdSigno(2,5,8, jugadorSigno) || checkIdSigno(3,6,9, jugadorSigno) || checkIdSigno(1,5,9, jugadorSigno) || checkIdSigno(3,5,7, jugadorSigno)){
        runBot = false; //pasando el valor boolen false a runBot para que el bot no vuelva a ejecutarse
        bot(runBot); //llamando a la función bot
        setTimeout(()=>{ //después de que alguien gane la partida, oculta el tablero y muestra la caja de resultados después de 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1s = 1000ms
        wonText.innerHTML = `¡El jugador <p>${firmaDelJugador}</p> ha ganado la partida!`; //visualizar el texto ganador con la firma del jugador (X o O)
    }else{ //si todas las casillas/elementos tienen valor id y todavía nadie gana entonces dibuja la partida
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false; //pasando el valor boolen false a runBot para que el bot no vuelva a ejecutarse
            bot(runBot); //llamar a la función bot
            setTimeout(()=>{ //después de que el partido se dibuje, oculta el tablero y muestra la caja de resultados después de 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); //1s = 1000ms
            wonText.textContent = "¡Se ha sorteado la partida!"; //visualizar el texto de sorteo de la partida
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); //recargar la página actual al pulsar el botón de reproducción
}