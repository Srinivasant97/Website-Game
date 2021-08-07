
function ageindays() {
	var birthyear = prompt("What year were you born..");
	var ageindays1 = (2020 - birthyear) * 365;
	var h =document.createElement('h1');
	var textAnswer = document.createTextNode("Your Age is "+ ageindays1 +" days");
	console.log(textAnswer)
	h.setAttribute("id","setid"); 
	h.appendChild(textAnswer);
	document.getElementById("flex-box-result").appendChild(h);

}


function reset(){
	document.getElementById("setid").remove();
}


//cat generator


function generatecat(){
	var image = document.createElement('img');
	var div = document.getElementById("flex-cat");
	image.src="images/giphy.gif" 
	div.appendChild(image)


}


//Rock paper Scissor Game


function game(your){
	console.log(your);
	var humanchoice, batchoice;
	humanchoice=your.id;
	batchoice=choice();
	result=Winner(humanchoice,batchoice);
	message=finalMessage(result);
	Frontend(humanchoice,batchoice,message);
	//message=finalMessage(results);
	//rpsFrondend(your.id,batchoice,message);
}


function random(){
	return Math.floor(Math.random()*3);

}


function choice(){
	return ["Rock","Paper","Scissors"][random()]
}


function Winner(yourchoice,compterchoice){
	var Database={
		'Rock': {'Scissors':1,'Rock':0.5,'Paper':0},
		'Paper':{'Scissors':0,'Rock':1,'Paper':0.5},
		'Scissors':{'Scissors':0.5,'Rock':0,'Paper':1}
	}

	var YourScore=Database[yourchoice][compterchoice]
	var ComputerScore=Database[compterchoice][yourchoice]
	return [YourScore,ComputerScore]


}

function finalMessage([YourScore,ComputerScore]){
	if (YourScore===0){
		return {'message':'You Lost','color':'red'};
	}else if (YourScore===0.5) {
		return {'message':'Match Draw','color':'yellow'};
	}else{
		return {'message':'You Won','color':'green'};
	}
}


function Frontend(humanImageChoice, batImageChoice, finalMessage){
	var imageDatabase= {
		'Rock' : document.getElementById('Rock').src,
		'Paper': document.getElementById('Paper').src,
		'Scissors':document.getElementById('Scissors').src
	}

	document.getElementById('Rock').remove();
	document.getElementById('Paper').remove();
	document.getElementById('Scissors').remove();

	var humanDiv = document.createElement('div');
	var BatDiv=document.createElement('div');
	var messageDiv=document.createElement('div');


	humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "'width=150 height=150>"
	messageDiv.innerHTML = "<h1 style='color: "+ finalMessage['color']+ ";font-size: 60px;padding:30px; '>"+ finalMessage['message'] + "<h1>"
	BatDiv.innerHTML = "<img src='" + imageDatabase[batImageChoice] + "'width=150 height=150 style='box-shadow:10px 10px 10px 0px #ffcccb'>"
	
	
	document.getElementById('Share').appendChild(humanDiv);
	document.getElementById('Share').appendChild(messageDiv);
	document.getElementById('Share').appendChild(BatDiv);
}



//Change the color of all buttons


var all_buttons = document.getElementsByTagName('button');


var CopyallButtons=[];
for (let i=0;i<all_buttons.length;i++){
	CopyallButtons.push(all_buttons[i].classList[0]);
	
	//CopyallButtons[i].classList.remove('blue')
	
}
console.log(CopyallButtons);
function buttoncolorchange(buttonThingy){
	if (buttonThingy.value === 'red') {
		buttonsRed();
	}
	else if(buttonThingy.value === 'green'){
		buttonsgreen();

	}
	else if (buttonThingy.value === 'reset') {
		buttoncolorreset();

	}else if (buttonThingy.value === 'random'){
		randomcolor();

	}
}


function buttonsRed(){
	for (let i=0;i<all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[0])
		all_buttons[i].classList.add('Danger')

	}
}

function buttonsgreen(){
	for (let i=0;i<all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[0])
		all_buttons[i].classList.add('Success')

	}
}


function buttoncolorreset(){
	for (let i=0;i<all_buttons.length;i++){
		all_buttons[i].classList.remove(all_buttons[i].classList[0])
		all_buttons[i].classList.add(CopyallButtons[i])

	}
}


function randomcolor(){
	let choices= ["blue", "red", "Green", "Primary", "Danger", "Warning", "Success"]
	for (let i=0;i<all_buttons.length;i++){
		let randomNumber=Math.floor(Math.random() * 4);
		all_buttons[i].classList.remove(all_buttons[i].classList[0]);
		all_buttons[i].classList.add(choices[randomNumber]);

	}
}




// Challenge 5: BlackJack Game

let blackJackGame = {
	'you':{'ScoreSpan' : '#your-boxresult', 'div': '#your-box','score':0},
	'dealer':{'ScoreSpan' : '#dealer-boxresult', 'div': '#dealer-box','score':0},
	'cards': ['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
	'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'K':10,'Q':10,'A':[1,11]},
	'wins': 0,
	'losses': 0,
	'draws' : 0,
	'isStand': false,
	'turnOver': false,


};

const YOU = blackJackGame['you'] 
const DEALER = blackJackGame['dealer']

const hitsound= new Audio('sounds/swish.m4a');
const winsound = new Audio('sounds/cash.mp3');
const lostsound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal').addEventListener('click',blackjackdeal);
document.querySelector('#blackjack-stand').addEventListener('click',blackjackStand);





function blackjackHit(){
	if (blackJackGame['isStand'] === false){
		let card = randomcard();
		console.log(card);
		showcard(card,YOU);
		updateScore(card,YOU);
		showScore(YOU);		

	}
	
	
}


function randomcard(){
	let randomindex = Math.floor(Math.random() * 13);
	return blackJackGame['cards'][randomindex];
}

function showcard(card,activeplayer){
	if (activeplayer['score'] <= 21) {
		let cardImage = document.createElement('img');
		cardImage.src = 'images/'+card+'.png';
		document.querySelector(activeplayer['div']).appendChild(cardImage);
		hitsound.play();
	}

}


function blackjackdeal(){
	if (blackJackGame['turnOver'] === true){
		blackJackGame['isStand'] = false;

		let yourImages = document.querySelector('#your-box').querySelectorAll('img');
		let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
	
		for (i=0;i<yourImages.length;i++){
			yourImages[i].remove();
		}
	
		for (i=0;i<dealerImages.length;i++){
			dealerImages[i].remove();

		}

		YOU['score'] = 0;
		DEALER['score']=0;
		document.querySelector('#your-boxresult').textContent = 0 ;
		document.querySelector('#your-boxresult').style.color= "white";
		document.querySelector('#dealer-boxresult').textContent = 0 ;
		document.querySelector('#dealer-boxresult').style.color= "white";
		document.querySelector('#blackjack-result').textContent = "Let's Play" ;
		document.querySelector('#blackjack-result').style.color= "black";
		blackJackGame['turnOver'] = true;
	}
	
}


function updateScore(card,activeplayer){
	if (card === 'A'){
		if (activeplayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
			activeplayer['score'] += blackJackGame['cardsMap'][card][1];
		}else {
			activeplayer['score'] += blackJackGame['cardsMap'][card][0];
		}

	}else {
	activeplayer['score'] += blackJackGame['cardsMap'][card];
	}

}


function showScore(activeplayer){
	if (activeplayer['score'] > 21) {
		document.querySelector(activeplayer['ScoreSpan']).textContent= "BUST!";
		document.querySelector(activeplayer['ScoreSpan']).style.color= "red";

	}else{
		document.querySelector(activeplayer['ScoreSpan']).textContent= activeplayer['score'];
		

	}
	
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
	blackJackGame['isStand'] = true;
	while (DEALER['score'] < 16 && blackJackGame['isStand'] === true){
		let card = randomcard();
		showcard(card,DEALER);
		updateScore(card,DEALER);
		showScore(DEALER);
		await sleep(1000);
	}
	
	blackJackGame['turnOver'] = true;
	let winner = computerWinner();
	showResult(winner);
	

	
}


function computerWinner(){
	let winner;

	if (YOU['score'] <= 21){
//condition : higher score than dealer or when dealer busts but  you're score
		if (YOU['score']>DEALER['score'] || (DEALER['score'] > 21)) {
			blackJackGame['wins']++;
			winner= YOU;

		}else if (YOU['score'] < DEALER['score']){
			blackJackGame['losses']++;
			winner = DEALER;

		}else if (YOU['score'] === DEALER['score']){
			blackJackGame['draws']++;

		}

//condition:when user busts but dealer doesn't

	}else if (YOU['score'] > 21 && DEALER['score'] <= 21 ){

		blackJackGame['losses']++;
		winner = DEALER;
	//condition: when you AND dealer  busts 
	}else if (YOU['score'] > 21 && DEALER['score'] > 21 ) {
		blackJackGame['draws']++;

	}
	console.log(blackJackGame);
	return winner;
}


function showResult(winner){
	let message, messageColor;

	if (blackJackGame['turnOver'] === true){


		if (winner === YOU){
			document.querySelector('#wins').textContent = blackJackGame['wins'];
			message = 'You won!';
			messageColor= 'green';
			winsound.play();
		}else if (winner === DEALER){
			document.querySelector('#losses').textContent = blackJackGame['losses'];
			message = 'You lost!';
			messageColor= 'red';
			lostsound.play();
		}else{
			document.querySelector('#draws').textContent = blackJackGame['draws'];
			message = 'You Draw!';
			messageColor = 'black';

		}
		document.querySelector('#blackjack-result').textContent = message;
		document.querySelector('#blackjack-result').style.color = messageColor;
	}


} 


