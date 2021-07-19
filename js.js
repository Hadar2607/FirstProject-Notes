



var jsonStr=localStorage.getItem("item"); // json string
var arrObjNotes = JSON.parse(jsonStr);   //  array of object


function main(){
    const isBad = CheckVailid();     // when the user click submit check validation;
    if(isBad) return;                 // If the details check was not successful
     SavelocalStorage();            // save json format and return the object;
     LoadFromStorage();

}



function CheckVailid(){
    const inpObj = document.getElementsByClassName("valid");
    let flag=false;
    for (const iterator of inpObj) {
        if (!iterator.checkValidity()) 
        {
            iterator.style.backgroundColor = "red";
            flag=true;
        }
        else{ iterator.style.backgroundColor = "green";}
    }
    return flag;
}


function CreateNotes(objPush,index){  // create html from start to end.

    document.getElementById("col2").innerHTML+=
    `<div class="divNotes" id=${index}>
     <a class="btn btn-info btn" href="#" onClick="RemoveThisNotped(this)">x </a> <br>
    <textarea >${objPush["noteText"]}</textarea> 
    <h3>${objPush["noteDate"]}</h3> 
    <h4>${objPush["noteTime"]}</h4> </div>`;
}


function SavelocalStorage(){
    const arrayInput =document.getElementsByClassName("valid");
    let textnote;
    var objtask={noteText:arrayInput[0].value,noteDate:arrayInput[1].value,noteTime:arrayInput[2].value,};

    if (jsonStr == "undefined"||jsonStr==null) { // if local is empety
        const arr =[];  
        arr.push(objtask);
        textnote= JSON.stringify(arr); 
    }
    else {
        arrObjNotes.push(objtask);
        textnote = JSON.stringify(arrObjNotes); 
    }


    localStorage.setItem("item", textnote); 

}

    

function LoadFromStorage(){  //  Loads all the notes from localStorage

    document.getElementById("col2").innerHTML="";
    for(var i =+arrObjNotes.length-1; i>=0; i--) 
    CreateNotes(arrObjNotes[i],i);
}



  function RemoveThisNotped(e){     // A function that deletes this note

     let choise=prompt("if you sure that you want to remove this note write yes");
     if(choise==null||choise.toLowerCase()!="yes") return; 
     var parent = (e.parentElement); // the div to remove
     arrObjNotes.splice(parent.id, 1);  // remove from the array
     localStorage.setItem('item', JSON.stringify(arrObjNotes)); // update localStorage without the div .
      e.parentElement.remove();  // remove from the screen.
      LoadFromStorage();  // Reload to see the changes.
 
}
