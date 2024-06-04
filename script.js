


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDragging = false;

let arrow_isDragging = false;
let offsetX, offsetY;
let circleX = 95, circleY = 50;

let radius = 40;

let ind=3000000000000;
let indiced = 300000000000000;





let w = document.body.clientWidth - 10;
let h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;




window.onload = function() {
document.getElementById('hhh').style.left =  (document.body.clientWidth / 2 - (document.getElementById('hhh').clientWidth)/2) + 'px';
document.getElementById('btns').style.left = ((w-50) - (document.getElementById('btns').clientWidth)) + 'px';
document.getElementById('btns').style.top = (h/2) + 'px';
}


let circles = [
    
  ];
  
  
 
 function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    circles.forEach((circle, index) => {
        ctx.beginPath();
        if(ind == index){
            ctx.fillStyle = 'blue';
        } else if(indiced == index)
            ctx.fillStyle = 'green';
        else
            ctx.fillStyle = 'red';
        ctx.arc(circle.x, circle.y, circle.radius-5, 0, 2 * Math.PI);
        ctx.fill();

        const letter = String.fromCharCode(65 + index); 
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, circle.x, circle.y);
    });


    drawArrows();
    drawInput();
}


function addArrowIfNotExists(startX, startY, endX, endY) {
    const arrowExists = arrows.some(arrow => 
        arrow.startX === startX && arrow.startY === startY &&
        arrow.endX === endX && arrow.endY === endY
    );

    if (!arrowExists) {
        arrows.push({
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color: 'green'
        });
        drawArrows();
        drawInput();
    }
}



let btno = false;
let btnd = false;

  
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
    
    
    let circleClicked = null;
    let cerchioi=0, cerchiof=0;
   
    circles.forEach(circle => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance <= circle.radius) {
            circleClicked = circle;
        }
        if(circleClicked != null)
            cerchioi++;

         cerchiof ++;
    });

    if (circleClicked) {
        
        
        if (selectedCircles.length < 2) {
            selectedCircles.push(circleClicked);
            
            if(!btno && !btnd){
                canvas.style.cursor = 'crosshair'; 
            }
            else if(btno){
                let vi = ind;
                ind = cerchiof - cerchioi;
                if(ind == vi){
                    ind = 3000000000000;
                    document.getElementById('nr').value = "";
                    btno = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                }else if(ind != indiced){
                    document.getElementById('nr').value = (ind+1);
                    btno = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                }else{
                    ind = vi;
                    selectedCircles = [];
                }
            }if(btnd){
                let vi = indiced;
                indiced = cerchiof - cerchioi;
                if(indiced == vi){
                    indiced = 3000000000000;
                    document.getElementById('nd').value = "";
                    btnd = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                }else if(indiced != ind){
                    document.getElementById('nd').value = (indiced+1);
                    btnd = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                }else{ 
                    indiced = vi;
                    selectedCircles = [];
                }
            }

            if (selectedCircles.length === 2) {
                if (selectedCircles[0] !== selectedCircles[1]) {
                    
                    addArrowIfNotExists(selectedCircles[0].x, selectedCircles[0].y, selectedCircles[1].x, selectedCircles[1].y);
                    
                   
                }
                selectedCircles = [];
                if (!cancfrec && !bott)
                    canvas.style.cursor = 'default'; 
                else if (cancfrec)
                    canvas.style.cursor = 'url("color-wand.svg"), auto';
                    else
                    canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
            }
        } else {
            selectedCircles = [circleClicked]; 
            canvas.style.cursor = 'crosshair'; 
        }
    } else {
        if (bott){
            circles.push({ x: mouseX, y: mouseY, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 });
            drawCircles();
        }
        selectedCircles = []; 
        if (!cancfrec && !bott)
        canvas.style.cursor = 'default'; 
    else if (cancfrec)
        canvas.style.cursor = 'url("color-wand.svg"), auto';
        else
        canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
    }
  });
  
  canvas.addEventListener('mouseup', function() {

    circles.forEach(circle => {
      circle.isDragging = false;
    });

    

    
  });
  
canvas.addEventListener('mousemove', function(e) {

    circles.forEach(circle => {
        if (circle.isDragging) {
            const mouseX = e.clientX - canvas.getBoundingClientRect().left;
            const mouseY = e.clientY - canvas.getBoundingClientRect().top;

            const newX = mouseX - circle.offsetX;
            const newY = mouseY - circle.offsetY;

            let collisionDetected = false;
            circles.forEach(otherCircle => {
                if (circle !== otherCircle) {
                    const distance = Math.sqrt((newX - otherCircle.x) ** 2 + (newY - otherCircle.y) ** 2);
                    const minDistance = circle.radius + otherCircle.radius; // Distanza minima per evitare sovrapposizioni
                    if (distance < minDistance) {
                        collisionDetected = true;
                        return;
                    }
                }
            });

            if (!collisionDetected) {
                circle.x = newX;
                circle.y = newY;
            }

            


           
            arrows.forEach(arrow => {
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


function pointInsideCircle(x, y, centerX, centerY, radius) {
    const distanceSquared = (x - centerX) ** 2 + (y - centerY) ** 2;
    return distanceSquared <= radius ** 2;
}
  
  

let arrows = [
    
];



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

        const arrowStartX = startX + normalizedDeltaX * (circles[0].radius + 2 - 5); //-5 leva
        const arrowStartY = startY + normalizedDeltaY * (circles[0].radius + 2 - 5);

        const arrowEndX = endX - normalizedDeltaX * (circles[1].radius + 2 - 5);
        const arrowEndY = endY - normalizedDeltaY * (circles[1].radius + 2 - 5);

        

        ctx.beginPath();
        ctx.moveTo(arrowStartX, arrowStartY);
        ctx.lineTo(arrowEndX, arrowEndY);
    
        ctx.stroke();


        const arrowHeadSize = 10;

    });
}

let i = 0

let se = [];

function drawInput() {
    se = [];
    const v = Array.from(document.querySelectorAll('.narrow-input')).map(input => parseInt(input.value));

    
    document.querySelectorAll('.narrow-input').forEach(input => {
        input.remove();
    });

    document.querySelectorAll('.frecce-container').forEach(container => {
        container.remove();
    });

   
    document.querySelectorAll('.frecce').forEach(icon => {
        icon.remove();
    });
    
    let previousLines = {}; 
    i = 0
    arrows.forEach(arrow => {
        const deltaX = arrow.endX - arrow.startX;
        const deltaY = arrow.endY - arrow.startY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);


        const lineRepresentation = `${arrow.startX},${arrow.startY},${arrow.endX},${arrow.endY}`;
        if (previousLines[lineRepresentation]) {
            return;
        }
        previousLines[lineRepresentation] = true;



         let startCircleLetter = '';
         let endCircleLetter = '';

        circles.forEach(circle => {
            const distance = Math.sqrt((arrow.startX - circle.x) ** 2 + (arrow.startY - circle.y) ** 2);
            if (distance <= circle.radius) {
                startCircleLetter = String.fromCharCode(65 + circles.indexOf(circle));
            }
        });

        circles.forEach(circle => {
            const distance = Math.sqrt((arrow.endX - circle.x) ** 2 + (arrow.endY - circle.y) ** 2);
            if (distance <= circle.radius) {
                endCircleLetter = String.fromCharCode(65 + circles.indexOf(circle));
            }
        })





        const normalizedDeltaX = deltaX / length;
        const normalizedDeltaY = deltaY / length;

        const angle = Math.atan2(normalizedDeltaY, normalizedDeltaX) * (180 / Math.PI);

        const distanceFromArrowEnd = -70; 

        const inputX = arrow.endX + normalizedDeltaX * distanceFromArrowEnd;
        const inputY = arrow.endY + normalizedDeltaY * distanceFromArrowEnd; 

        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('narrow-input');
        input.value = v[i];
        input.addEventListener("input", (e) => {
            let value = e.target.value != "" ? parseInt(e.target.value) : 1

            if (value <= 0) input.value = 1
        })
        
        
        
        input.setAttribute('io', startCircleLetter)
        input.setAttribute('orr', endCircleLetter)

        se.push(startCircleLetter);
        se.push(endCircleLetter);


        i ++;
        document.getElementById('a').setAttribute('num', i);
        
        

        input.style.position = 'absolute';
        input.style.left = inputX + 'px';
        input.style.top = inputY + 'px';
        
       
        document.body.appendChild(input);

        
const iconContainer = document.createElement('button');
iconContainer.classList.add('frecce-container'); 


const icon = document.createElement('ion-icon');
icon.setAttribute('name', 'arrow-up-outline');
icon.classList.add('frecce');


iconContainer.appendChild(icon);


iconContainer.style.position = 'absolute';
iconContainer.style.left = inputX + 'px';
iconContainer.style.top = (inputY + input.offsetHeight + 5) + 'px';
iconContainer.style.transform = `rotate(${angle+90}deg)`;


document.body.appendChild(iconContainer);


    });
}

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
});


let selectedCircles = [];











const elemento = document.getElementById('i');


elemento.setAttribute('data', '1');


document.getElementById('a').addEventListener('click', function() {
  
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


    const inputs = document.querySelectorAll('input.narrow-input');
    inputs.forEach(input => {
        
        const cerchioInizio = input.getAttribute('io');
        const cerchioFine = input.getAttribute('orr');

        


          
          var numeroSpan3 = document.createElement("number");
          numeroSpan3.value = input.value;
          numeroSpan3.className = 'dati';
          numeroSpan3.id = z;
          numeroSpan3.min = 1;
          z++;


        
            var numeroSpan = document.createElement("number");
            numeroSpan.value = cerchioInizio;
            numeroSpan.className = 'dati';
            numeroSpan.id = z;
            numeroSpan.min = 1;
            z++;

        

             
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

    document.getElementById('b').style.display = 'block';
});

let cancfrec = false;


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


document.getElementById('nodr').addEventListener('click', function(event){
    event.preventDefault();
    btnd = false;
    if(btno){
        btno = false;
        canvas.style.cursor = 'default';
    }
    else{
        btno = true;
        canvas.style.cursor = 'url(cursor-242.ico), auto';
    }
});

document.getElementById('nodd').addEventListener('click', function(event){
    event.preventDefault();
    if(btnd){
        btnd = false;
        canvas.style.cursor = 'default';
    }
    else {
        btnd = true;
        canvas.style.cursor = 'url(cursor-24.ico), auto';
    } 
    btno = false;
});


let matric = true;
document.getElementById('matr').addEventListener('click', function(event){
    event.preventDefault();
    if(!matric){
        document.getElementById('containerc').style.display = 'none';
        matric = true;
    }
    else {
        document.getElementById('containerc').style.display = 'block';
        matric = false;
    }
});


document.getElementById('btnmatr').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('containerc').style.display = 'none';
    matric = true;
});


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('frecce')) {
        const icon = e.target;
        const container = icon.closest('.frecce-container');
        const iconIndex = Array.from(document.querySelectorAll('.frecce')).indexOf(icon);
        const clickedArrow = arrows[iconIndex];

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
    
let canvases = document.querySelectorAll('canvas[name="canva"]');


canvases.forEach(canvas => {
    canvas.parentNode.removeChild(canvas);
});

    canvas2 = document.createElement('canvas');
    canvas2.setAttribute('name', 'canva');
    canvas2.width = w;
    canvas2.height = h;
    canvas2.style.marginTop = '10px'; 
    

   
    document.body.appendChild(canvas2);

    
    canvas2.style.border = '2px double black';

    ctx2 = canvas2.getContext('2d');

    
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);



    const canvas = document.getElementById('myCanvas');
    const rect = canvas.getBoundingClientRect();
    
    
    const offsetX2 = 0;
    const offsetY2 = 0;  


circles.forEach((circle, index) => {
    
    const circleX = circle.x + offsetX2;
    const circleY = circle.y + offsetY2;

    ctx2.beginPath();
    if(ind == index){
        ctx2.fillStyle = 'blue';
    } else if(indiced == index)
        ctx2.fillStyle = 'green';
    else
        ctx2.fillStyle = 'red';

    ctx2.arc(circleX, circleY, circle.radius, 0, 2 * Math.PI);
    ctx2.fill();

    
    const letter = String.fromCharCode(65 + index); 
    ctx2.font = '16px Arial';
    ctx2.fillStyle = 'white';
    ctx2.textAlign = 'center';
    ctx2.textBaseline = 'middle';
    ctx2.fillText(letter, circleX, circleY);







});

var lista = JSON.parse(list);



for (i = 0; i < se.length - 1; i++){
    for (p = 0; p < lista.length; p = p + 2){   
       
        if(se[i] == lista[p+1] && se[i+1] == lista[p] && i%2 == 0){
            var j = i / 2;
            
            
            const startX = arrows[j].startX + offsetX2;
            const startY = arrows[j].startY + offsetY2;
            const endX = arrows[j].endX + offsetX2;
            const endY = arrows[j].endY + offsetY2;
    
           
    
            
    
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
            const normalizedDeltaX = deltaX / length;
            const normalizedDeltaY = deltaY / length;
    
           
            const arrowStartX = startX + normalizedDeltaX * (circles[0].radius + 2);
            const arrowStartY = startY + normalizedDeltaY * (circles[0].radius + 2);
    
            
            const arrowEndX = endX - normalizedDeltaX * (circles[1].radius + 2);
            const arrowEndY = endY - normalizedDeltaY * (circles[1].radius + 2);
    
            
    
            ctx2.beginPath();
            ctx2.moveTo(arrowStartX, arrowStartY);
            ctx2.lineTo(arrowEndX, arrowEndY);
            ctx2.stroke();
        }
}
}

}





function Matrice(matrice, n, nodoprece) {
    var matr = JSON.parse(matrice);
    var nodi = JSON.parse(n);
    var nodop = JSON.parse(nodoprece);

    const table = document.querySelector('#tab.tabl');
    table.style.margin = '0';
    table.style.borderCollapse = 'collapse';
    table.position = 'absolute';
    const tbody = table.querySelector('#tbody.tbod');

    const generatedRows = tbody.querySelectorAll('.generated-row');
generatedRows.forEach(row => row.remove());
    
   
    let firstRow = true;
    let o = 0;

    for (let i = 0; i < matr.length; i++) {
        if (firstRow) {
            const tr = tbody.querySelector('#tr.trr');
            const thEmpty = tr.querySelector('#th.thh');

            for (let j = 0; j < nodi.length; j++) {
                const th = document.createElement('th');
                th.textContent = nodi[j];
                th.style.verticalAlign = 'middle';
                th.style.textAlign = 'center';
                if (j == 0)
                    th.style.color = 'blue';
                else if (j == nodi.length - 1) 
                    th.style.color = 'green';
                else{
                    let nod = false;
                        for (let u = 0; u < nodop.length; u++) {
                            if (nodop[u] == nodi[j]) {
                                th.style.color = 'red';
                                u = nodop.length;
                            }
                        }
                }

                th.classList.add('generated-row');
                tr.appendChild(th);
            }
            firstRow = false;
        }

        if (matr[i] != "," || i == 0) {
            o++;
            let j = i;

            const tr = document.createElement('tr');
            tr.classList.add('generated-row');
            const tdFirst = document.createElement('td');
            let indice = o - 1;
            tdFirst.textContent = nodi[indice];
            tdFirst.style.verticalAlign = 'middle';
            tdFirst.style.textAlign = 'center';
            if (indice == 0)
                tdFirst.style.color = 'blue';
            else if (indice == nodi.length - 1) 
                tdFirst.style.color = 'green';
            else{
                let nod = false;
                    for (let u = 0; u < nodop.length; u++) {
                        if (nodop[u] == nodi[indice]) {
                            tdFirst.style.color = 'red';
                            u = nodop.length;
                        }
                    }
            }
            tr.appendChild(tdFirst);

            while (j < matr.length && matr[j] != ",") {
                const td = document.createElement('td');
                td.style.verticalAlign = 'middle';
                td.style.textAlign = 'center';

                while (matr[j] != " ") {
                    td.textContent += matr[j];
                    if (j == 0)
                        td.style.color = 'blue';
                    else if (j == matr.length - 3) 
                        td.style.color = 'green';
                    j++;
                }
                tr.appendChild(td);
                j++;
            }
            tbody.appendChild(tr);
            i = j;
        }
    }
}







const contentDiv = document.getElementById('containerc');

let offsetXX, offsetYY;

contentDiv.addEventListener('mousedown', function(event) {
    const rect = contentDiv.getBoundingClientRect();
    if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
        offsetXX = event.pageX - contentDiv.offsetLeft;
        offsetYY = event.pageY - contentDiv.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});

function onMouseMove(event) {
    contentDiv.style.left = event.pageX - offsetXX + 'px';
    contentDiv.style.top = event.pageY - offsetYY + 'px';
}


function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}





contentDiv.addEventListener('touchstart', function(event) {
    const touch = event.touches[0];
    const rect = contentDiv.getBoundingClientRect();
    if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        offsetXX = touch.pageX - contentDiv.offsetLeft;
        offsetYY = touch.pageY - contentDiv.offsetTop;
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        event.preventDefault();
    }
});

function onTouchMove(event) {
    const touch = event.touches[0];
    contentDiv.style.left = touch.pageX - offsetXX + 'px';
    contentDiv.style.top = touch.pageY - offsetYY + 'px';
    event.preventDefault();
}

function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    event.preventDefault();
}




canvas.addEventListener('touchstart', function(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    circles.forEach(circle => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance <= circle.radius) {
            circle.isDragging = true;
            circle.offsetX = mouseX - circle.x;
            circle.offsetY = mouseY - circle.y;
        }
    });

    let circleClicked = null;
    let cerchioi = 0, cerchiof = 0;

    circles.forEach(circle => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance <= circle.radius) {
            circleClicked = circle;
        }
        if (circleClicked != null)
            cerchioi++;

        cerchiof++;
    });

    if (circleClicked) {
        if (selectedCircles.length < 2) {
            selectedCircles.push(circleClicked);

            if (!btno && !btnd) {
                canvas.style.cursor = 'crosshair';
            } else if (btno) {
                let vi = ind;
                ind = cerchiof - cerchioi;
                if (ind == vi) {
                    ind = 3000000000000;
                    document.getElementById('nr').value = "";
                    btno = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                } else if (ind != indiced) {
                    document.getElementById('nr').value = (ind + 1);
                    btno = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                } else {
                    ind = vi;
                    selectedCircles = [];
                }
            } if (btnd) {
                let vi = indiced;
                indiced = cerchiof - cerchioi;
                if (indiced == vi) {
                    indiced = 3000000000000;
                    document.getElementById('nd').value = "";
                    btnd = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                } else if (indiced != ind) {
                    document.getElementById('nd').value = (indiced + 1);
                    btnd = false;
                    selectedCircles = [];
                    drawCircles();
                    canvas.style.cursor = 'default';
                } else {
                    indiced = vi;
                    selectedCircles = [];
                }
            }

            if (selectedCircles.length === 2) {
                if (selectedCircles[0] !== selectedCircles[1]) {
                    addArrowIfNotExists(selectedCircles[0].x, selectedCircles[0].y, selectedCircles[1].x, selectedCircles[1].y);
                }
                selectedCircles = [];
                if (!cancfrec && !bott)
                    canvas.style.cursor = 'default';
                else if (cancfrec)
                    canvas.style.cursor = 'url("color-wand.svg"), auto';
                else
                    canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
            }
        } else {
            selectedCircles = [circleClicked];
            canvas.style.cursor = 'crosshair';
        }
    } else {
        if (bott) {
            circles.push({ x: mouseX, y: mouseY, radius: 40, isDragging: false, offsetX: 0, offsetY: 0 });
            drawCircles();
        }
        selectedCircles = [];
        if (!cancfrec && !bott)
            canvas.style.cursor = 'default';
        else if (cancfrec)
            canvas.style.cursor = 'url("color-wand.svg"), auto';
        else
            canvas.style.cursor = 'url("ellipse-outline.svg"), auto';
    }
});

canvas.addEventListener('touchend', function() {
    circles.forEach(circle => {
        circle.isDragging = false;
    });
});

canvas.addEventListener('touchmove', function(e) {
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    circles.forEach(circle => {
        if (circle.isDragging) {
            const newX = mouseX - circle.offsetX;
            const newY = mouseY - circle.offsetY;

            let collisionDetected = false;
            circles.forEach(otherCircle => {
                if (circle !== otherCircle) {
                    const distance = Math.sqrt((newX - otherCircle.x) ** 2 + (newY - otherCircle.y) ** 2);
                    const minDistance = circle.radius + otherCircle.radius;
                    if (distance < minDistance) {
                        collisionDetected = true;
                        return;
                    }
                }
            });

            if (!collisionDetected) {
                circle.x = newX;
                circle.y = newY;
            }

            arrows.forEach(arrow => {
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






