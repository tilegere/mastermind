var mainDiv = document.getElementById('main-div');
var button = document.getElementById('button');
var count = 0;
//Number of spots in the answer
var numSpots = 4;

var matchNo = 0; //Right color, right spot
var nearMatch = 0; //Right color, wrong spot
var resultCount = 0; //Keeping track of which result indicator we're on

var colors = ["blue", "red", "green", "yellow"];
var solution = [];

for (var i = 0; i < numSpots; i++){
    solution[i] = colors[Math.floor(Math.random() * 4)];
}

console.log(solution);

// Gives the player the ability to undo a selected color
setUndoColor = function(){
    var unspecifiedList = document.getElementsByClassName('unspecified');
    for(var i = 0; i < unspecifiedList.length; i++){
        unspecifiedList[i].addEventListener('click', setUnspecified);
    }
}

setUnspecified = function(event){
        event.target.className = "color-setter unspecified";
}

//Takes the first available unspecified spot and sets it to the color clicked
colorSet = function(color){
    var colorUpdate = document.querySelector('.unspecified');
    if(colorUpdate){
        colorUpdate.className = "color-setter " + color;
    }
}

checkMatches = function(lastDiv){
    var matchCheckSolution = []; //check to make sure solution spot doesn't count twice
    var matchCheckSpot = []; //check to make sure chosen spot doesn't count twice

    //Check for accurate matches first
    for (var i = 0; i < numSpots; i++){
        if (lastDiv.children[i].className == "color-setter " + solution[i]){
            matchNo++;
            matchCheckSolution[i] = true;
            matchCheckSpot[j] = true;
        }
    }
    
    if(matchNo != 4){
        for (var i = 0; i < numSpots; i++){
            if(!matchCheckSolution[i]){ // Make sure the i spot hasn't already been matched previously
                for (var j = 0; j < numSpots; j++){
                    if(lastDiv.children[i].className == "color-setter " + solution[j] && !matchCheckSolution[i] && !matchCheckSpot[j]){
                        matchCheckSolution[i] = true;
                        matchCheckSpot[j] = true;
                        nearMatch++;
                        console.log("Matched color " + i + " with spot " + j);
                    }
                    
                }
            }
        }
    }
    
}

addNewLine = function(){
        var newGroup1 = document.createElement('ul');
        var newGroup2 = document.createElement('ul');
        var newList1 = document.createElement('li');
        var newList2 = document.createElement('li');
        var newList3 = document.createElement('li');
        var newList4 = document.createElement('li');
        var newResult1 = document.createElement('li');
        var newResult2 = document.createElement('li');
        var newResult3 = document.createElement('li');
        var newResult4 = document.createElement('li');
        newGroup1.className = "play-space";
        newList1.className = "color-setter unspecified";
        newList2.className = "color-setter unspecified";
        newList3.className = "color-setter unspecified";
        newList4.className = "color-setter unspecified";
        newGroup2.className = "correct-count";
        newResult1.className = "correct-ind";
        newResult2.className = "correct-ind";
        newResult3.className = "correct-ind";
        newResult4.className = "correct-ind";
        newGroup1.appendChild(newList1);
        newGroup1.appendChild(newList2);
        newGroup1.appendChild(newList3);
        newGroup1.appendChild(newList4);
        newGroup2.appendChild(newResult1);
        newGroup2.appendChild(newResult2);
        newGroup2.appendChild(newResult3);
        newGroup2.appendChild(newResult4);

        mainDiv.appendChild(newGroup1);
        mainDiv.appendChild(newGroup2);
}

setCorrectIndicator = function(){
    var resultDivs = document.getElementsByClassName('correct-count');
    var lastResultDiv = resultDivs[resultDivs.length - 1];
         
    var resultCount = 0; //counting which result spot we're on
    
    while(matchNo != 0){
            lastResultDiv.children[resultCount].className = "correct-ind correct-spot";
            resultCount++;
            matchNo--;
    }
    
    if(resultCount == numSpots){
        console.log("Congratulations!  You win!");
        button.innerHTML = "Play again!";
    }
    else {
        while(nearMatch != 0){
            lastResultDiv.children[resultCount].className = "correct-ind correct-color";
            resultCount++;
            nearMatch--;
        }
    }    
}

button.addEventListener('click', function(event){
    if(button.innerHTML == "Play again!"){
        window.location.reload();
    }
    
    if(document.querySelector('.unspecified')){
        alert("You must choose all " + numSpots + " colors to continue!");
    }
    else{
        //Finding the last Div added
        var divList = document.getElementsByClassName('play-space');
        var lastDiv = divList[divList.length - 1];
        
        //check for matches
        checkMatches(lastDiv);
        setCorrectIndicator();
        
        lastDiv.childNodes.forEach(function(element){
            element.removeEventListener('click', setUnspecified);
        });
        
        // If it's not correct yet, add a new line.
        if(button.innerHTML == "Submit"){
            addNewLine();
        }
        //Removing the event listener as we should not be able to undo submitted choices
        
        setUndoColor();
        count++;
        document.getElementById('turn-count').innerHTML = "Attempt count: " + count;
    }
    console.log("matchNo: " + matchNo);
    console.log("nearMatch: " + nearMatch);
});

setUndoColor();