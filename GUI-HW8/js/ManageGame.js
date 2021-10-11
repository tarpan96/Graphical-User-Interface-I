
let ScrabbleBoard = document.getElementById("ScrabbleBoard");
let Rack = document.getElementById("RackHolder");
let letterLocation = "./Images/Letter/Scrabble_Tile_";
let playingTiles = [], wordTrack="";
let PlayingLetters = 0, remainingLetters= 0, scoreKeeper = 0;

var pieces = [
    {"letter":"A", "value":1, "amount":9},
    {"letter":"B", "value":3, "amount":2},
    {"letter":"C", "value":3, "amount":2},
    {"letter":"D", "value":2, "amount":4},
    {"letter":"E", "value":1, "amount":12},
    {"letter":"F", "value":4, "amount":2},
    {"letter":"G", "value":2, "amount":3},
    {"letter":"H", "value":4, "amount":2},
    {"letter":"I", "value":1, "amount":9},
    {"letter":"J", "value":8, "amount":1},
    {"letter":"K", "value":5, "amount":1},
    {"letter":"L", "value":1, "amount":4},
    {"letter":"M", "value":3, "amount":2},
    {"letter":"N", "value":1, "amount":5},
    {"letter":"O", "value":1, "amount":8},
    {"letter":"P", "value":3, "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1, "amount":6},
    {"letter":"S", "value":1, "amount":4},
    {"letter":"T", "value":1, "amount":6},
    {"letter":"U", "value":1, "amount":4},
    {"letter":"V", "value":4, "amount":2},
    {"letter":"W", "value":4, "amount":2},
    {"letter":"X", "value":8, "amount":1},
    {"letter":"Y", "value":4, "amount":2},
    {"letter":"Z", "value":10,"amount":1},
    {"letter":"_", "value":0,"amount":10},
];

setupGame(7);

function setupGame(Letters) {
    let randLet, letterImg;

    //calculate the total number of letters left
    for(let i = 0; i < pieces.length; ++i) {
        remainingLetters += pieces[i].amount;
    }

    PlayingLetters = Letters;
    //Load Rack image and assign attributes
    //Source: https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript
    let rackImage = document.createElement('img');
    Object.assign(rackImage, {
        id: 'Rack',
        src: "./Images/Other/Scrabble_LetterRack.png",
        width: 550,
        height: 100,
    });
    //Append the rackImage to Rack div
    Rack.append(rackImage);

    //Create scrabble board by creating 7 tiles for letter holders and set attributea
    for(let i = 0; i < PlayingLetters; ++i) {
        //create new element div
        let tile = document.createElement('div');
        Object.assign(tile, {
            className : 'Tiles ui-droppable'
        });
        if(i == 1) {
            tile.setAttribute("id", "doubleLetter");
        }
        if(i == 5) {
            tile.setAttribute("id", "doubleWord");
        }
        //append the tile to the board
        ScrabbleBoard.append(tile);
    }

    //get 7 letters for the game
    for(let i = 0; i < PlayingLetters; ++i) {
        letterImg = document.createElement('img');
        //get random number and get the letter from teh array
        randLet = getRandomLetter();
        //check if the letter is no avaiable to use, if 0 then get a different letter
        while(pieces[randLet].amount === 0) {
            randLet = getRandomLetter();
        }

        //assign properties to the letter images loaded for it to become droppable
        Object.assign(letterImg, {
            id: pieces[randLet].letter,
            src:letterLocation + pieces[randLet].letter + '.jpg',
            className: 'LetterTile ui-draggable ui-draggable-handle',
            width: 71,
            height: 71,
        });
        //if the letter is dash from word, load the Blank Tile
        if(pieces[randLet].Letter === '_') {
            letterImg.src=letterLocation  + 'Blank.jpg';
        }
        //Store the letters in playingTiles
        playingTiles[i] = pieces[randLet].letter;
        //Assign data reflecting the data from the array pieces
        $(letterImg).data({'Letter': pieces[randLet].letter, 'value': pieces[randLet].value, 'amount': pieces[randLet].amount--});
        //add the letters to the Rack
        RackHolder.append(letterImg);
    }
}

$(".Tiles").droppable({
    accept: ".LetterTile",
    tolerance:'pointer',
    greedy: true,
    revert: true,
    drop: function(ev, ui) {
        $(ui.draggable).detach().css({position : 'relative', top: 'auto',left: 'auto'}).appendTo(this);
        remainingLetters--;
        updateWord();
    }
});

$(".LetterTile").draggable({
    snap: '.Tiles',
    snapMode: 'inner',
    revert: true
});


function setNewTiles() {
    //check if the board has old tiles, if true, remove the old tiles
    if($("#ScrabbleBoard").children('div')) {
        $('#ScrabbleBoard').children('div').each(function () {
            $(this).remove();
        });
    }

    //create new tiles
    playingTiles = 7;
    //Create scrabble board, create 7 tiles
    for(let i = 0; i < PlayingLetters; ++i) {
        //create new element div
        let tile = document.createElement('div');
        //assign properites to elememnt tile
        Object.assign(tile, {
            className : 'Tiles ui-droppable'
        });
        //add each tile to the board
        ScrabbleBoard.append(tile);
    }
}


function getNewLetter(letters, action) {
if(action = 0)
    if($("#RackHolder").children('img')) {
        $('#RackHolder').children('img').each(function () {
            for(let i = 0; i < PlayingLetters; i++ ) {
                if($(this).data('Letter') === playingTiles[i]){
                    $(this).remove();
                }
            }
        });
    }

    PlayingLetters = letters;
    console.log(PlayingLetters);
    //get 7 letters for the game
    for(let i = 0; i < PlayingLetters; ++i) {
        letterImg = document.createElement('img');
        //get random number and get the letter from teh array
        randLet = getRandomLetter();
        //check if the letter is no avaiable to use, if 0 then get a different letter
        while (pieces[randLet].amount === 0) {
            randLet = getRandomLetter();
        }

        //assign properties to the letter images loaded for it to become droppable
        Object.assign(letterImg, {
            id: pieces[randLet].letter,
            src: letterLocation + pieces[randLet].letter + '.jpg',
            className: 'LetterTile ui-draggable ui-draggable-handle',
            width: 71,
            height: 71,
        });
        //if the letter is dash from word, load the Blank Tile
        if (pieces[randLet].Letter === '_') {
            letterImg.src = letterLocation + 'Blank.jpg';
        }
        //Store the letters in playingTiles
        playingTiles[i] = pieces[randLet].letter;
        //Assign data reflecting the data from the array pieces
        $(letterImg).data({
            'Letter': pieces[randLet].letter,
            'value': pieces[randLet].value,
            'amount': pieces[randLet].amount--
        });
        //add the letters to the Rack
        RackHolder.append(letterImg);
    }
}

//update the score on when button is submitted
$("#submitBtn").click( function () {
    updateScore();
    var leftover = 0;

    if((($("#RackHolder > img").length) - 1) < 7) {
        leftover = 7 - (($("#RackHolder > img").length) - 1);
    }

    getNewLetter(leftover);
    scoreKeeper = 0;
    wordTrack = "";
    $("#Word").text("Word: " + wordTrack);
});

$("#resetBtn").click( function () {
    setNewTiles();
    getNewLetter(($("#RackHolder > img").length) - 1);
    remainingLetters = 107;
});

//
function getRandomLetter() {
    return (Math.floor(Math.random() * 26));
}

//update the score holder as the user drags each letter
function updateScore() {
    //loop through each image and get value and add the score
    $('#ScrabbleBoard').find('img').each(function () {
        scoreKeeper += $(this).data("value");
    });
    //update the text in html files
    $("#Score").text("Score: " + scoreKeeper);
    $("#Word").text("Word: " + wordTrack);
}

//Update the word holder as the user drags the letter
function updateWord() {
    //loop through each img and add the letter
    $('#ScrabbleBoard').find('img').each(function () {
        wordTrack += $(this).data("Letter");
    });
    //update the content in html
    $("#Word").text("Word: " + wordTrack);
    $("#Remaining").text("Total Letters Remaining: " + remainingLetters);
    //reset the wordTrack
    wordTrack ="";
}