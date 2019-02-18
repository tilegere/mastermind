var mainDiv = document.getElementById('main-div');
var button = document.getElementById('button');

button.addEventListener('click', function(event){
    var newGroup1 = document.createElement('ul');
    var newGroup2 = document.createElement('ul');
    var newList1 = document.createElement('li');
    var newList2 = document.createElement('li');
    var newList3 = document.createElement('li');
    var newList4 = document.createElement('li');
    newGroup1.className = "play-space";
    newList1.className = "color-setter unspecified";
    newList2.className = "color-setter unspecified";
    newList3.className = "color-setter unspecified";
    newList4.className = "color-setter unspecified";
    newGroup2.className = "correct-count";
    newGroup1.appendChild(newList1);
    newGroup1.appendChild(newList2);
    newGroup1.appendChild(newList3);
    newGroup1.appendChild(newList4);

    mainDiv.appendChild(newGroup1);
    mainDiv.appendChild(newGroup2);
    setUndoColor();
    console.log(newList4);
});

setUndoColor = function(){
    var unspecifiedList = document.getElementsByClassName('color-setter');
    for(i = 0; i < unspecifiedList.length; i++){
        unspecifiedList[i].addEventListener('click', function(event){
            event.target.className = "color-setter unspecified";
        })
    }
}

colorSet = function(color){
    var colorUpdate = document.querySelector('.unspecified');
    if(colorUpdate){
        colorUpdate.className = "color-setter " + color;
    }
}

setUndoColor();