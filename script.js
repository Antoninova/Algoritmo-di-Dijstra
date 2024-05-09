


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDragging = false;

let arrow_isDragging = false;
let offsetX, offsetY;
let circleX = 95, circleY = 50;
let radius = 40;




let circles = [
    // { x: 100, y: 100, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 },
    // { x: 200, y: 200, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 }
  ];
  
 // Disegna tutti i cerchi nell'array sul canvas
 function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
    circles.forEach((circle, index) => {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fill();

        // Aggiungi un elemento <p> con una lettera dell'alfabeto
        const letter = String.fromCharCode(65 + index); // Converti l'indice in una lettera dell'alfabeto
        console.log("Index = " + index)
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, circle.x, circle.y);
    });


    drawArrows();
    drawInput();
}

// function drawCircles() {
//     // Rimuovi tutti gli input precedenti
//     document.querySelectorAll('input[type="number"]').forEach(input => {
//         input.remove();
//     });

//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
//     circles.forEach(circle => {
//         // Disegna il cerchio
//         ctx.beginPath();
//         ctx.fillStyle = 'red';
//         ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
//         ctx.fill();

//         // Aggiungi l'input number
//         const input = document.createElement('input');
//         input.type = 'number';
//         input.value = circle.radius; // Imposta il valore iniziale del raggio
//         input.style.position = 'absolute';
//         input.style.left = (circle.x + circle.radius + 5) + 'px'; // Posiziona l'input alla destra del cerchio
//         input.style.top = circle.y + 'px'; // Allinealo verticalmente con il cerchio
//         document.body.appendChild(input);
//     });

//     drawArrows();
// }


  
  // Gestisci l'evento di click del mouse per iniziare il trascinamento
  canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    
    
    circles.forEach(circle => {
      const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
      
      if (distance <= circle.radius) {
        circle.isDragging = true;
        circle.offsetX = mouseX - circle.x;
        circle.offsetY = mouseY - circle.y;
      }
    });
    
    
  });
  
  // Gestisci l'evento di rilascio del mouse per terminare il trascinamento
  canvas.addEventListener('mouseup', function() {

    circles.forEach(circle => {
      circle.isDragging = false;
    });

    

    
  });
  
  // Gestisci l'evento di movimento del mouse per trascinare i cerchi
canvas.addEventListener('mousemove', function(e) {

    circles.forEach(circle => {
        if (circle.isDragging) {
            const mouseX = e.clientX - canvas.getBoundingClientRect().left;
            const mouseY = e.clientY - canvas.getBoundingClientRect().top;

            // Calcola la nuova posizione proposta per il cerchio
            const newX = mouseX - circle.offsetX;
            const newY = mouseY - circle.offsetY;

            // Controlla se la nuova posizione causerebbe una collisione con altri cerchi
            let collisionDetected = false;
            circles.forEach(otherCircle => {
                if (circle !== otherCircle) {
                    const distance = Math.sqrt((newX - otherCircle.x) ** 2 + (newY - otherCircle.y) ** 2);
                    const minDistance = circle.radius + otherCircle.radius; // Distanza minima per evitare sovrapposizioni
                    if (distance < minDistance) {
                        // Se c'è collisione, imposta il flag di collisione su true e interrompi il ciclo
                        collisionDetected = true;
                        return;
                    }
                }
            });

            // Se non c'è collisione, aggiorna la posizione del cerchio
            if (!collisionDetected) {
                circle.x = newX;
                circle.y = newY;
            }

            


            // Aggiorna la posizione delle frecce
            arrows.forEach(arrow => {
                // Controlla se le estremità delle frecce si trovano all'interno del cerchio
                if (pointInsideCircle(arrow.startX, arrow.startY, circle.x, circle.y, circle.radius)) {
                    arrow.startX = circle.x;
                    arrow.startY = circle.y;
                }
                if (pointInsideCircle(arrow.endX, arrow.endY, circle.x, circle.y, circle.radius)) {
                    arrow.endX = circle.x;
                    arrow.endY = circle.y;
                }
            });
           
            
            
            drawCircles();
            
        }
    });
});

// Funzione per verificare se un punto è all'interno di un cerchio
function pointInsideCircle(x, y, centerX, centerY, radius) {
    const distanceSquared = (x - centerX) ** 2 + (y - centerY) ** 2;
    return distanceSquared <= radius ** 2;
}




//   // Aggiungi un nuovo cerchio quando viene premuto un pulsante (iD = i) 
// document.getElementById('i').addEventListener('click', function() {
//     circles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 });
//     drawCircles();
//   });
  
  

let arrows = [
    // { startX: 50, startY: 50, endX: 200, endY: 50, trianglePoints: [[200, 50], [180, 40], [180, 60]], color: 'black' },
    // { startX: 100, startY: 100, endX: 250, endY: 100, trianglePoints: [[250, 100], [230, 90], [230, 110]], color: 'blue' }
];



                    /*GIUSTO*/ 
// function drawArrows() {
    
//         arrows.forEach(arrow => {
//             ctx.beginPath();
//             ctx.moveTo(arrow.startX, arrow.startY);
//             ctx.lineTo(arrow.endX, arrow.endY);
//             ctx.strokeStyle = arrow.color;
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             // Calcola i punti per formare la freccia
//             let angle = Math.atan2(arrow.endY - arrow.startY, arrow.endX - arrow.startX);
//             let arrowSize = 10;
//             let arrowEndX = arrow.endX - arrowSize * Math.cos(angle - Math.PI / 6);
//             let arrowEndY = arrow.endY - arrowSize * Math.sin(angle - Math.PI / 6) ;

//             ctx.beginPath();
//             ctx.moveTo(arrow.endX, arrow.endY);
//             ctx.lineTo(arrowEndX, arrowEndY);
            
//             arrowEndX = arrow.endX - arrowSize * Math.cos(angle + Math.PI / 6);
//             arrowEndY = arrow.endY - arrowSize * Math.sin(angle + Math.PI / 6);

//             ctx.lineTo(arrowEndX, arrowEndY);
//             ctx.closePath();
            
//             ctx.fillStyle = arrow.color;
//             ctx.fill();
//         });
// }



function drawArrows() {
    arrows.forEach(arrow => {
        const startX = arrow.startX;
        const startY = arrow.startY;
        const endX = arrow.endX;
        const endY = arrow.endY;

       

        

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const normalizedDeltaX = deltaX / length;
        const normalizedDeltaY = deltaY / length;

        // Calcoliamo il punto di inizio sulla circonferenza del cerchio in base alla direzione della freccia
        const arrowStartX = startX + normalizedDeltaX * (circles[0].radius + 2);
        const arrowStartY = startY + normalizedDeltaY * (circles[0].radius + 2);

        // Calcoliamo il punto di fine sulla circonferenza del cerchio in base alla direzione inversa della freccia
        const arrowEndX = endX - normalizedDeltaX * (circles[1].radius + 2);
        const arrowEndY = endY - normalizedDeltaY * (circles[1].radius + 2);

        

        ctx.beginPath();
        ctx.moveTo(arrowStartX, arrowStartY);
        ctx.lineTo(arrowEndX, arrowEndY);
        // ctx.strokeStyle = arrow.color;
        // ctx.lineWidth = 2;
        // if(Math.abs(arrowStartX - arrowEndX) > 150){
        //     if (arrowEndY - arrowStartY > 10){
        //         ctx.quadraticCurveTo((arrowStartX + arrowEndX)/2 -50,(arrowStartY + arrowEndY)/2 -100, arrowEndX, arrowEndY)
        //         console.log("0")
        //     }
        //     else{
        //         ctx.quadraticCurveTo((arrowStartX + arrowEndX)/2 + (Math.abs(arrowStartY - arrowEndY) + Math.abs(arrowStartX - arrowEndX)),(arrowStartY + arrowEndY)/2 - 100, arrowEndX, arrowEndY)
        //         console.log("1")
        //     }
        // }
        // else{
        //     // if(arrowStartX >= arrowEndX - 80 && arrowStartX <= arrowEndX + 80 && Math.abs(arrowEndY - arrowStartY) + 10 >= 0 && Math.abs(arrowEndY - arrowStartY) - 10 < 0)
        //     //     ctx.quadraticCurveTo((arrowStartX + arrowEndX)/2 + 100,(arrowStartY + arrowEndY)/2, arrowEndX, arrowEndY)
        //     if (arrowEndY - arrowStartY > 0){
        //         ctx.quadraticCurveTo((arrowStartX + arrowEndX)/2 + 50,(arrowStartY + arrowEndY)/2 +50, arrowEndX, arrowEndY)
        //         console.log("2")
        //     }
        //     else{
        //         ctx.quadraticCurveTo((arrowStartX + arrowEndX)/2 +100,(arrowStartY + arrowEndY)/2 -100, arrowEndX, arrowEndY)
        //         console.log("3")
        //     }
        // }
            
        // ctx.quadraticCurveTo((arrowStartX + arrowEndX)/2 - 100,(arrowStartY + arrowEndY)/2, arrowEndX, arrowEndY)

    
        
        // ctx.bezierCurveTo(arrowStartX+50, arrowStartY+50, arrowEndX -50, arrowEndY +50, arrowEndX, arrowEndY)
        ctx.stroke();


        const arrowHeadSize = 10;

        // // Calcoliamo la posizione della testa della freccia
        // const arrowHeadX = arrowEndX - normalizedDeltaX * arrowHeadSize;
        // const arrowHeadY = arrowEndY - normalizedDeltaY * arrowHeadSize;

        // // Calcoliamo le coordinate dei due lati del triangolo della freccia
        // const sideX1 = arrowHeadX + normalizedDeltaY * arrowHeadSize * 0.5;
        // const sideY1 = arrowHeadY - normalizedDeltaX * arrowHeadSize * 0.5;
        // const sideX2 = arrowHeadX - normalizedDeltaY * arrowHeadSize * 0.5;
        // const sideY2 = arrowHeadY + normalizedDeltaX * arrowHeadSize * 0.5;

        // // Disegniamo il triangolo della freccia
        // ctx.beginPath();
        // ctx.moveTo(arrowHeadX, arrowHeadY);
        // ctx.lineTo(sideX1, sideY1);
        // ctx.lineTo(sideX2, sideY2);
        // ctx.closePath();
        // ctx.fillStyle = arrow.color;
        // ctx.fill();
    });
}














/*Funzionante senza icona*/
// document.getElementById('a').addEventListener('click', function() {
//     arrows.forEach(arrow => {
//         // Calcola la lunghezza della freccia
//         const deltaX = arrow.endX - arrow.startX;
//         const deltaY = arrow.endY - arrow.startY;
//         const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//         // Normalizza il vettore della freccia
//         const normalizedDeltaX = deltaX / length;
//         const normalizedDeltaY = deltaY / length;

//         // Definisci la distanza dall'estremità della freccia per posizionare l'input number
//         const distanceFromArrowEnd = -70; // Modifica questo valore a tuo piacimento

//         // Calcola le nuove coordinate per l'input number
//         const inputX = arrow.endX + normalizedDeltaX * distanceFromArrowEnd;
//         const inputY = arrow.endY + normalizedDeltaY * distanceFromArrowEnd;

//         // Crea l'input number
//         const input = document.createElement('input');
//         input.type = 'number';
//         input.classList.add('narrow-input');

//         // Imposta la posizione dell'input number vicino alla fine della freccia, ma non al centro
//         input.style.position = 'absolute';
//         input.style.left = inputX + 'px';
//         input.style.top = inputY + 'px';
        
//         // Aggiungi l'input number al documento
//         document.body.appendChild(input);
//     });
// });
let i = 0

let se = [];

function drawInput() {
    se = [];
    const v = Array.from(document.querySelectorAll('.narrow-input')).map(input => parseInt(input.value));

    // Rimuovi tutti gli input number precedenti
    document.querySelectorAll('.narrow-input').forEach(input => {
        input.remove();
    });

    document.querySelectorAll('.frecce-container').forEach(container => {
        container.remove();
    });

    // Rimuovi tutte le icone precedenti
    document.querySelectorAll('.frecce').forEach(icon => {
        icon.remove();
    });
    
    let previousLines = {}; // Oggetto per tenere traccia delle coordinate delle linee precedenti
    i = 0
    arrows.forEach(arrow => {
        // Calcola la lunghezza della freccia
        const deltaX = arrow.endX - arrow.startX;
        const deltaY = arrow.endY - arrow.startY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);


        // Calcola una rappresentazione unica per la linea
        const lineRepresentation = `${arrow.startX},${arrow.startY},${arrow.endX},${arrow.endY}`;
        if (previousLines[lineRepresentation]) {
            return; // Salta l'iterazione del ciclo se la linea è già stata disegnata
        }
        previousLines[lineRepresentation] = true;



         // Calcola le lettere del cerchio di inizio e fine
         let startCircleLetter = '';
         let endCircleLetter = '';

        // Controlla se il punto di inizio della freccia è all'interno di un cerchio
        circles.forEach(circle => {
            const distance = Math.sqrt((arrow.startX - circle.x) ** 2 + (arrow.startY - circle.y) ** 2);
            if (distance <= circle.radius) {
                startCircleLetter = String.fromCharCode(65 + circles.indexOf(circle));
            }
        });

        // Controlla se il punto di fine della freccia è all'interno di un cerchio
        circles.forEach(circle => {
            const distance = Math.sqrt((arrow.endX - circle.x) ** 2 + (arrow.endY - circle.y) ** 2);
            if (distance <= circle.radius) {
                endCircleLetter = String.fromCharCode(65 + circles.indexOf(circle));
            }
        })





        // Normalizza il vettore della freccia
        const normalizedDeltaX = deltaX / length;
        const normalizedDeltaY = deltaY / length;

        // Calcola l'angolo tra la freccia e l'asse x
        const angle = Math.atan2(normalizedDeltaY, normalizedDeltaX) * (180 / Math.PI);

        // Definisci la distanza dall'estremità della freccia per posizionare l'input number
        const distanceFromArrowEnd = -70; // Modifica questo valore a tuo piacimento

        // Calcola le nuove coordinate per l'input number
        const inputX = arrow.endX + normalizedDeltaX * distanceFromArrowEnd;
        const inputY = arrow.endY + normalizedDeltaY * distanceFromArrowEnd + 72;

        // Crea l'input number
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('narrow-input');
        input.value = v[i];
        input.addEventListener("input", (e) => {
            let value = e.target.value != "" ? parseInt(e.target.value) : 1

            if (value <= 0) input.value = 1
        })
        
        
        //Impostare attributi
        input.setAttribute('io', startCircleLetter)
        input.setAttribute('orr', endCircleLetter)

        se.push(startCircleLetter);
        se.push(endCircleLetter);


        i ++;
        document.getElementById('a').setAttribute('num', i);
        
        

        // Imposta la posizione dell'input number vicino alla fine della freccia, ma non al centro
        input.style.position = 'absolute';
        input.style.left = inputX + 'px';
        input.style.top = inputY + 'px';
        
        // Aggiungi l'input number al documento
        document.body.appendChild(input);

        /// Crea l'elemento div come contenitore per l'icona
const iconContainer = document.createElement('button');
iconContainer.classList.add('frecce-container'); // Aggiungi una classe per identificare il contenitore

// Crea l'icona
const icon = document.createElement('ion-icon');
icon.setAttribute('name', 'arrow-up-outline');
icon.classList.add('frecce');

// Posiziona l'icona all'interno del div
iconContainer.appendChild(icon);

// Imposta la posizione e la trasformazione dell'icona
iconContainer.style.position = 'absolute';
iconContainer.style.left = inputX + 'px';
iconContainer.style.top = (inputY + input.offsetHeight + 5) + 'px';
iconContainer.style.transform = `rotate(${angle+90}deg)`;

// Aggiungi il contenitore al documento
document.body.appendChild(iconContainer);


    });
}

// document.getElementById('a').addEventListener('click', function() {
//     arrows.forEach(arrow => {
//         // Calcola la lunghezza della freccia
//         const deltaX = arrow.endX - arrow.startX;
//         const deltaY = arrow.endY - arrow.startY;
//         const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//         // Normalizza il vettore della freccia
//         const normalizedDeltaX = deltaX / length;
//         const normalizedDeltaY = deltaY / length;

//         // Calcola l'angolo tra la freccia e l'asse x
//         const angle = Math.atan2(normalizedDeltaY, normalizedDeltaX) * (180 / Math.PI);

//         // Definisci la distanza dall'estremità della freccia per posizionare l'input number
//         const distanceFromArrowEnd = -70; // Modifica questo valore a tuo piacimento

//         // Calcola le nuove coordinate per l'input number
//         const inputX = arrow.endX + normalizedDeltaX * distanceFromArrowEnd;
//         const inputY = arrow.endY + normalizedDeltaY * distanceFromArrowEnd;

//         // Crea l'input number
//         const input = document.createElement('input');
//         input.type = 'number';
//         input.classList.add('narrow-input');

//         // Imposta la posizione dell'input number vicino alla fine della freccia, ma non al centro
//         input.style.position = 'absolute';
//         input.style.left = inputX + 'px';
//         input.style.top = inputY + 'px';
        
//         // Aggiungi l'input number al documento
//         document.body.appendChild(input);

//         // Crea e aggiungi l'icona dell'arrow-up dopo l'input number
//         const icon = document.createElement('ion-icon');
//         icon.setAttribute('name', 'arrow-up-outline');
//         icon.style.position = 'absolute';
//         icon.style.left = inputX + 'px'; // Posiziona l'icona nella stessa posizione orizzontale dell'input
//         icon.style.top = (inputY + input.offsetHeight + 5) + 'px'; // Posiziona l'icona sotto l'input
//         icon.style.transform = `rotate(${angle+90}deg)`; // Applica la rotazione all'icona
//         document.body.appendChild(icon); // Aggiungi l'icona al documento
//     });
// });

let bott = false;

  document.getElementById('i').addEventListener('click', function() {
    bott =! bott;
    
    if (bott){
         canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
         if (cancfrec)
            cancfrec =! cancfrec;
    }else{
        canvas.style.cursor = 'default';
    }
    // circles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 });
    // drawCircles();
});


let selectedCircles = [];


canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    let circleClicked = null;

    // Controlla se il click del mouse è avvenuto all'interno di un cerchio
    circles.forEach(circle => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance <= circle.radius) {
            circleClicked = circle;
        }
    });

    if (circleClicked) {
        
        // Se è stato cliccato un cerchio, gestisci la selezione
        if (selectedCircles.length < 2) {
            selectedCircles.push(circleClicked);
            canvas.style.cursor = 'crosshair'; // Cambia il cursore quando un cerchio è selezionato

            if (selectedCircles.length === 2) {
                // Se sono stati selezionati due cerchi, controlla che siano diversi e aggiungi la freccia
                if (selectedCircles[0] !== selectedCircles[1]) {
                    arrows.push({
                        startX: selectedCircles[0].x,
                        startY: selectedCircles[0].y,
                        endX: selectedCircles[1].x,
                        endY: selectedCircles[1].y,
                        color: 'green'
                    });
                    drawArrows();
                    drawInput();
                }
                selectedCircles = []; // Resetta la selezione
                if (!cancfrec && !bott)
                    canvas.style.cursor = 'default'; // Cambia il cursore quando un cerchio è selezionato
                else if (cancfrec)
                    canvas.style.cursor = 'url("color-wand.svg"), auto';
                    else
                    canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
            }
        } else {
            selectedCircles = [circleClicked]; // Seleziona un solo cerchio
            canvas.style.cursor = 'crosshair'; // Cambia il cursore quando un cerchio è selezionato
        }
    } else {
        if (bott){
            circles.push({ x: mouseX, y: mouseY, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 });
            drawCircles();
        }
        selectedCircles = []; // Se è stato cliccato fuori dai cerchi, resetta la selezione
        if (!cancfrec && !bott)
        canvas.style.cursor = 'default'; // Cambia il cursore quando un cerchio è selezionato
    else if (cancfrec)
        canvas.style.cursor = 'url("color-wand.svg"), auto';
        else
        canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
    }
});










// Seleziona l'elemento con l'ID specifico
const elemento = document.getElementById('i');

// Imposta un attributo personalizzato sull'elemento con le informazioni desiderate
elemento.setAttribute('data', '1');

console.log(elemento.getAttribute('data'));

document.getElementById('a').addEventListener('click', function() {
    // Seleziona tutti gli elementi <input>.dati
    var existingElements = document.querySelectorAll('.dati');
    existingElements.forEach(function(element) {
        element.remove();
    });


    let z1 = 0;
    let z = 1;

    var num = document.createElement("number");
        num.value = i;
        num.id = z1;
        num.className = 'dati';
        document.body.appendChild(num);

    console.log("I: " + i)

    const inputs = document.querySelectorAll('input.narrow-input');
    inputs.forEach(input => {
        // Recuperare i valori degli attributi data-cerchio-inizio e data-cerchio-fine
        const cerchioInizio = input.getAttribute('io');
        const cerchioFine = input.getAttribute('orr');

        


          // Crea un elemento span per ogni numero e aggiungi il numero come testo
          var numeroSpan3 = document.createElement("number");
          numeroSpan3.value = input.value;
          numeroSpan3.className = 'dati';
          numeroSpan3.id = z;
          numeroSpan3.min = 1;
          z++;


        // Crea un elemento span per ogni numero e aggiungi il numero come testo
            var numeroSpan = document.createElement("number");
            numeroSpan.value = cerchioInizio;
            numeroSpan.className = 'dati';
            numeroSpan.id = z;
            numeroSpan.min = 1;
            z++;

        

             // Crea un elemento span per ogni numero e aggiungi il numero come testo
             var numeroSpan1 = document.createElement("number");
             numeroSpan1.id = z;
             numeroSpan1.className = 'dati';
             numeroSpan1.value = cerchioFine;
             numeroSpan1.min = 1;
             z++;
 
            
             num.value = z;
            

            document.body.appendChild(numeroSpan);
        document.body.appendChild(numeroSpan1);
        document.body.appendChild(numeroSpan3);
    });
    
});

let cancfrec = false;
// document.getElementById('c').addEventListener('click', function() {
//     cancfrec =! cancfrec
//     event.preventDefault();
//     // document.body.style.cursor = 'url("color-wand.svg"), auto';
//     canvas.style.cursor = 'url("color-wand.svg"), auto';
// });

document.getElementById('c').addEventListener('click', function(event) {
    event.preventDefault();
    cancfrec =! cancfrec
    if (cancfrec){
         canvas.style.cursor = 'url("color-wand.svg"), auto';
         if(bott)
            bott =! bott;
    }else{
        canvas.style.cursor = 'default';
    }
});




document.addEventListener('click', function(e) {
    if (e.target.classList.contains('frecce')) {
        const icon = e.target;
        const container = icon.closest('.frecce-container');
        const iconIndex = Array.from(document.querySelectorAll('.frecce')).indexOf(icon);
        const clickedArrow = arrows[iconIndex];

        console.log('Icona cliccata!');
        if (cancfrec) {
            arrows.splice(iconIndex, 1);
            drawCircles();
        }
    }
});

const input = document.getElementById('nr');

input.addEventListener("input", (e) => {
    let value = e.target.value != "" ? parseInt(e.target.value) : 1;

    if (value <= 0) input.value = 1;
});









var canvas2, ctx2;
function Output(list){
    console.log("SUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
    canvas2 = document.createElement('canvas');

    canvas2.width = 800;
    canvas2.height = 600;

    // Aggiungi il canvas al documento HTML
    document.body.appendChild(canvas2);

    // Imposta lo stile del bordo per il canvas
    canvas2.style.border = '2px solid black';

    ctx2 = canvas2.getContext('2d');

    // Pulisci il canvas
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);



    const canvas = document.getElementById('myCanvas');
    const rect = canvas.getBoundingClientRect();
    
    // Calcola l'offset in base alla posizione del canvas rispetto alla finestra del browser
    const offsetX2 = rect.left; // Offset orizzontale
    const offsetY2 = rect.top;  // Offset verticale

// Disegna i cerchi
circles.forEach((circle, index) => {
    // Calcola le coordinate traslate per il canvas2
    const circleX = circle.x + offsetX2;
    const circleY = circle.y + offsetY2;

    ctx2.beginPath();
    ctx2.fillStyle = 'red';
    ctx2.arc(circleX, circleY, circle.radius, 0, 2 * Math.PI);
    ctx2.fill();

    // Aggiungi un elemento <p> con una lettera dell'alfabeto
    const letter = String.fromCharCode(65 + index); // Converti l'indice in una lettera dell'alfabeto
    console.log("Index = " + index)
    ctx2.font = '16px Arial';
    ctx2.fillStyle = 'white';
    ctx2.textAlign = 'center';
    ctx2.textBaseline = 'middle';
    ctx2.fillText(letter, circleX, circleY);






//le frecce
});

var lista = JSON.parse(list);

console.log("LISTA" + lista.length)
for (p = 0; p < lista.length; p ++)
         console.log(lista[p])

for (i = 0; i < se.length - 1; i++){
    for (p = 0; p < lista.length; p = p + 2){   
        console.log("SP"); 
        console.log(se[i]);
        console.log(se[i+1]);

        console.log(lista[p]);
        console.log(lista[p+1]);
        if(se[i] == lista[p+1] && se[i+1] == lista[p]){
            j = i / 2;
            const startX = arrows[j].startX + offsetX2;
            const startY = arrows[j].startY + offsetY2;
            const endX = arrows[j].endX + offsetX2;
            const endY = arrows[j].endY + offsetY2;
    
           
    
            
    
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
            const normalizedDeltaX = deltaX / length;
            const normalizedDeltaY = deltaY / length;
    
            // Calcoliamo il punto di inizio sulla circonferenza del cerchio in base alla direzione della freccia
            const arrowStartX = startX + normalizedDeltaX * (circles[0].radius + 2);
            const arrowStartY = startY + normalizedDeltaY * (circles[0].radius + 2);
    
            // Calcoliamo il punto di fine sulla circonferenza del cerchio in base alla direzione inversa della freccia
            const arrowEndX = endX - normalizedDeltaX * (circles[1].radius + 2);
            const arrowEndY = endY - normalizedDeltaY * (circles[1].radius + 2);
    
            
    
            ctx2.beginPath();
            ctx2.moveTo(arrowStartX, arrowStartY);
            ctx2.lineTo(arrowEndX, arrowEndY);
            ctx2.stroke();
        }
}
}


// arrows.forEach(arrow => {

    

//     for (p = 0; p < lista.length; p ++)
//         console.log(lista[p])

//     for (p = 0; p < lista.length; p = p + 2){    
//         if(arrow.startCircleLetter == lista[p] && arrow.endCircleLetter == lista[p+1]){
//             const startX = arrow.startX + offsetX2;
//         const startY = arrow.startY + offsetY2;
//         const endX = arrow.endX + offsetX2;
//         const endY = arrow.endY + offsetY2;

       

        

//         const deltaX = endX - startX;
//         const deltaY = endY - startY;
//         const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//         const normalizedDeltaX = deltaX / length;
//         const normalizedDeltaY = deltaY / length;

//         // Calcoliamo il punto di inizio sulla circonferenza del cerchio in base alla direzione della freccia
//         const arrowStartX = startX + normalizedDeltaX * (circles[0].radius + 2);
//         const arrowStartY = startY + normalizedDeltaY * (circles[0].radius + 2);

//         // Calcoliamo il punto di fine sulla circonferenza del cerchio in base alla direzione inversa della freccia
//         const arrowEndX = endX - normalizedDeltaX * (circles[1].radius + 2);
//         const arrowEndY = endY - normalizedDeltaY * (circles[1].radius + 2);

        

//         ctx2.beginPath();
//         ctx2.moveTo(arrowStartX, arrowStartY);
//         ctx2.lineTo(arrowEndX, arrowEndY);
//         ctx2.stroke();
//         }
//     }
    
    
        

// });
}






// document.getElementById('a').addEventListener('click', function() {
//     // Ottieni i valori degli attributi data-cerchio-inizio e data-cerchio-fine
// const cerchioInizio = canvas.getAttribute('data-cerchio-inizio');
// const cerchioFine = canvas.getAttribute('data-cerchio-fine');

// // Stampa i valori a console
// console.log(`Cerchio Inizio: ${cerchioInizio}, Cerchio Fine: ${cerchioFine}`);
// });


















// document.getElementById('deleteLine').addEventListener('click', function() {
//     // Rimuovi la linea selezionata dall'array di frecce
//     arrows = arrows.filter(arrow => {
//         return !arrow.isSelected;
//     });

//     // Rimuovi tutti gli input e le icone associati alla linea selezionata
//     const inputsToRemove = document.querySelectorAll('.narrow-input');
//     const iconsToRemove = document.querySelectorAll('ion-icon');
//     inputsToRemove.forEach(input => input.remove());
//     iconsToRemove.forEach(icon => icon.remove());

//     // Ridisegna il canvas dopo la rimozione della linea, degli input e delle icone
//     drawCircles();
// });