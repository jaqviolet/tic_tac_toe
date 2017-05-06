$( document ).ready(function() {
   var amountPlayer;
   var player1='X';
   var player2='O';
   
   var move=false;

   var winner=false;
   
   var player1Score=0;
   var player2Score=0;

   var oneQuestion='Would you like to be<br>X\'s or O\'s';
   var twoQuestion='Player 1 <br> Would you like to be X\'s or O\'s';

   var gridArray=[
   '','','',
   '','','',
   '','',''	
	];

	var turns=0;

   $('.btn-default').click(function(){
   		
   		amountPlayer = $(this).val();
   		$('.gameType').toggle();
   		$('.charChoice').toggle();
   		
	   		if(amountPlayer==1){
	   			$('.question').html(oneQuestion);
	   			
	   		}
	   		else if(amountPlayer==2){
	   			$('.question').html(twoQuestion);
	   		}
		   		$('.btn-basic').click(function(){
	   				player1 = $(this).val();
	   				$('.charChoice').toggle();
					$('.grid').toggle();
					$('.score').toggle();
		   				if(player1==player2){
		   					player2='X';
		   				}
					game();
				});
   	/*--end of default click--*/
   });

function game(){
turn();
}

function turn(){
	var player=player1;
	
	$('.btn-primary').click(function(){
		
			$(this).html(player);
			gridArray[$(this).val()] = player;
			$(this).prop("disabled",true);
			turns+=1;
			
				if(player==player1){
					player=player2;
					if(amountPlayer==1){
						compBrute(player);
						player=player1;
					}
				}
				else{
					player=player1;
				}
				checkWinner();
	});
	
};

function reset() {
	gridArray= ['','','',
				'','','',
				'','',''];

		$('.btn-primary').html('');
		$('.btn-primary').prop("disabled",false);
		winner=false;
		player=player1;
		turns=0;
}

function compBrute(player){
turns+=1;
var g=gridArray;
var p1=player1;
var p2=player2
//strat 1
	if(check2(player, player2)!==false){	
		aiMove(move, player);
		console.log('strat 1');
	}
	//strat 2;
	else if(check2(player, player1)!==false){
		aiMove(move, player);
		console.log('strat 2');
	}
	//strat 3 create a fork
	else if(checkFork(player)!==false){
		aiMove(move, player);
		console.log('strat 3');
	}
	//strat 4 block fork
	else if (checkFork(player1)!==false){
		aiMove(move, player);
		console.log('strat 4');
	}
	/*--strat 5--*/
	else if(g[4]==''){
		aiMove(4, player);
		console.log('strat 5');
	}
	//strat 6
	else if(g[0]==p1 && g[8]=='') {
		aiMove(8,player);
		console.log('strat 6');
	}
	else if(g[8]==p1 && g[0]=='') {
		aiMove(0,player);
		console.log('strat 6');
	}
	else if(g[2]==p1 && g[6]=='' ) {
		aiMove(6,player);
		console.log('strat 6');
	}
	else if(g[6]==p1 && g[2]=='' ) {
		aiMove(2,player);
		console.log('strat 6');
	}
//strat 7
	else if(g[0]==''){
		aiMove(0,player);
		console.log('strat 7');
	}
	else if(g[8]==''){
		aiMove(8,player);
		console.log('strat 7');
	}
	else if(g[2]==''){
		aiMove(2,player);
		console.log('strat 7');
	}
	else if(g[6]==''){
		aiMove(6,player);
		console.log('strat 7');
	}
//strat 8
	else if(g[1]==''){
		aiMove(1,player);
		console.log('strat 8');
	}
	else if(g[3]==''){
		aiMove(3,player);
		console.log('strat 8');
	}
	else if(g[5]==''){
		aiMove(5,player);
		console.log('strat 8');
	}
	else if(g[7]==''){
		aiMove(7,player);
		console.log('strat 8');
	}
/*--end compbrute--*/
}

function check2(player, whichPlayer){
	var g=gridArray;
	var arrayCheck=[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
	];

	for(var i=0;i<arrayCheck.length;i++){
	var twoInRow=0;
	var blank=0;
		for(var j=0;j<3;j++){
		
			if(g[arrayCheck[i][j]]==whichPlayer){
				twoInRow+=1;
			}
			else if(g[arrayCheck[i][j]]==''){
				blank+=1
				move=arrayCheck[i][j];
			}
		}	
		if(twoInRow==2 && blank==1){
					return true;
					break;
				}
				else{
					move=false;
				}	
	}
return false;
}

function checkFork(whichPlayer){
//structure so that first 2 values are needed marks, 
//last 3 are needed blanks
var g=gridArray;
var arrayCheck=[

[1,3, 0,2,6],
[1,5, 2,0,8],
[3,7, 6,0,8],
[5,7, 8,6,2],

[0,8, 6,3,7],
[0,8, 2,1,5],
[2,6, 0,1,3],
[2,6, 8,7,5]
];
	for(var i=0;i<arrayCheck.length;i++){
		
		if(g[arrayCheck[i][0]]==whichPlayer && 
		   g[arrayCheck[i][1]]==whichPlayer &&
		   g[arrayCheck[i][2]]=='' &&
		   g[arrayCheck[i][3]]=='' &&
		   g[arrayCheck[i][4]]==''){
			
			if(whichPlayer==player2){
				move=arrayCheck[i][2];
				return true;
			}
			else if(i<4){
				move=arrayCheck[i][2];
				return true;
			}
			else{
				for(var j=1;j<8;j+=2){
					if(g[j]==''){
						move=j;
						return true;
					}
				}
			}
		}
	}
return false;
}

function aiMove(num, player){
	
		$('.'+num).html(player);
		gridArray[num] = player;
		$('.'+num).prop("disabled",true);
	
}

function isWinner(a,b,c){
	if(gridArray[a]!='' && gridArray[a]==gridArray[b] && gridArray[b]==gridArray[c]){
		if(gridArray[a]==player1){
			player1Score+=1;
			$('.pOne').html('Player 1<br>'+player1Score);
		}
		else{
			player2Score+=1;
			$('.pTwo').html('Player 2<br>'+player2Score);
		}
	winner=true;
	reset();
	}
}

function checkWinner(){
	isWinner(0,1,2);
	isWinner(3,4,5);
	isWinner(6,7,8);
	isWinner(0,3,6);
	isWinner(1,4,7);
	isWinner(2,5,8);
	isWinner(0,4,8);
	isWinner(2,4,6);
	if(turns>8 && winner===false){
		reset();
	}
}

/*--end of script--*/
});