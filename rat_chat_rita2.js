let ratX, ratY, ratSpeedX, ratSpeedY;
let rat;
let ratSize = 100;
let ratCaught = false; 
let chatInput, sendButton, chatBox, closeButton; 
let backgroundImage;


let texts = [
    
    "squeaksqueak",
    "squeaksqueaksqueaksqueak",
    "squeaksqueaksqueaksqueaksqueaksqueaksqueak",
    "squeaksqueaksqueaksqueaksqueaksqueaksqueaksqueaksqueak",
    "squeaksqueaksqueaksqueaks * get out of my way * queaksqueaksqueaksqueaksqueak",
    "squeak"
  ];

function preload() {
  rat = loadImage('rat.png'); 
    backgroundImage = loadImage('catch.png');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block'); 
    canvas.style('margin', 'auto'); 
    canvas.style('margin-top', '150px'); 

    ratX = random(width - ratSize); 
    ratY = random(height - ratSize);
  
    ratSpeedX = random(-2, 2);
    ratSpeedY = random(-2, 2);
  
  chatInput = createInput('');
  sendButton = createButton('send');
  chatBox = createElement('textarea', '').attribute('readonly', true).style('height', '200px').style('width', '180px');
  closeButton = createButton('close');

  sendButton.mousePressed(sendChat);
  closeButton.mousePressed(hideChat); 

  hideChat(); 
}

function draw() {
   background(220);
   imageMode(CENTER);
   image(backgroundImage, width / 2, height / 2,300,120);
     
  if (ratSpeedX != 0 && ratSpeedY != 0) {
    ratX += ratSpeedX;
    ratY += ratSpeedY;
    keepRatInBounds();
  }

  drawRat(ratX, ratY);
}

function keepRatInBounds() {
   
    if (ratX < 0 || ratX > width - ratSize) ratSpeedX *= -1;
    if (ratY < 0 || ratY > height - ratSize) ratSpeedY *= -1;
  }

function drawRat(x, y) {
 
  image(rat, x, y, ratSize, ratSize);
}

function mousePressed() {
    let d = dist(mouseX, mouseY, ratX, ratY);
    if (d < ratSize) {
      showChat(ratX + ratSize, ratY); 
      ratSpeedX = 0; 
      ratSpeedY = 0;
    }
}

function sendChat() {
    let userText = chatInput.value().trim();
    if (userText !== '') {
      let response = generateResponse(userText);
      chatBox.value(chatBox.value() + 'you: ' + userText + '\n' + 'rat: ' + response + '\n');
      chatBox.elt.scrollTop = chatBox.elt.scrollHeight;
      chatInput.value('');
    }
}


function showChat(x, y) {
    chatBox.position(x + 10, y);
    chatInput.position(x + 10, y + 210);
    sendButton.position(x + 190, y + 210);
    closeButton.position(x + 190, y + 240); 
    chatBox.show();
    chatInput.show();
    sendButton.show();
    closeButton.show(); 
  }
  
function hideChat() {
  chatBox.hide();
  chatInput.hide();
  sendButton.hide();


  keepRatInBounds();
  
 
  ratSpeedX = random(-2, 2);
  ratSpeedY = random(-2, 2);
}

function generateResponse(userText) {

    let markov = new RiTa.RiMarkov(2);
    markov.addText(texts);
    
    let tokens = RiTa.tokenize(userText);
    let posTags = RiTa.pos(tokens);

    console.log("tokenize: "+tokens);
    console.log("pos: "+posTags);
    
   
    for (let i = 0; i < posTags.length; i++) {
      if (posTags[i] === 'nn') {

        if(tokens[i]==='cheese'){
          return "cheeeeeeeeeeeeeeeese!!!!!!!" + markov.generate();
      }
      else if(tokens[i]==='rat'){
            return "right( ̀⌄ ́)" + markov.generate();
      }else if(tokens[i]==='name'){
            return "Mr.Rat!" + markov.generate();
      }else if(tokens[i]==='hi'){
            return "Get off me!!!" ;
      }else if(tokens[i]==='cat'){
            return "..................." ;
      }else{
            return  " What is "+ RiTa.pluralize(tokens[i]) +"?"+ markov.generate();
      }
        
        
      }else if(posTags[i] === 'vb'){
        return "I wish I can " + RiTa.singularize(tokens[i]) +". "+ markov.generate();
      }else if(posTags[i] === 'vbg'){
        return "I like " + RiTa.singularize(tokens[i]) +". "+ markov.generate();
      }else if(posTags[i] === 'prp' ){
        if(tokens[i]==='he'){
            return "He is a rat " + markov.generate();
        }
        else if(tokens[i]==='she'){
            return "She is a rat " + markov.generate();
        }
      }
    }
   
    return "!?(･_･;? squeak？";

}
