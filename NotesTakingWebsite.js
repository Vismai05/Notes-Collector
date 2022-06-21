display();
let x = localStorage.getItem("myindex1");
if (x != null) {
    changes();
}

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function () {
    let addtext = document.getElementById("addTxt").value;
    let addtitle = document.getElementById("addtitle").value;
    let check = localStorage.getItem("mynotes");
    if (check == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(check);
    }
    let obj = {
        title : addtitle,
        text : addtext
    }
    notesarr.push(obj);
    localStorage.setItem("mynotes", JSON.stringify(notesarr));
    addtext.value = "";
    display();
});

function display() {
    let card = "" ;
    let check = localStorage.getItem("mynotes");
    if (check == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(check);
    }
    notesarr.forEach( function(ele, index) {
        card += `
        <div class="card mx-3 my-1" style="width: 18rem; borderColor" id="card${index}">
        <div class="card-body" id="style${index}">
        <h5 class="card-title">${ele["title"]}</h5>
        <p class="card-text">${ele["text"]}</p>
        <button class="btn btn-danger" id="${index}" onClick="deletenote(id)">Delete</button>
        <button class="btn btn-danger" id="imp${index}" onClick="markimp(${index})">Mark Important</button>
        <button class="btn btn-danger" id="notimp${index}"  style="display: none;" onClick="unmark(${index})">Unmark</button>
        </div>
        </div>
        `;
    });
    let notecards = document.getElementById("notes");
    if (notesarr.length!=0){
        notecards.innerHTML = card;
    }
    else{
        notecards.innerHTML = `<h4>You have not added any notes. Use "Add Note" to add your note.</h4>`;
    }
};

function deletenote(index){
    let check = localStorage.getItem("mynotes");
    if (check == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(check);
    }
    notesarr.splice(index,1);
    localStorage.setItem("mynotes", JSON.stringify(notesarr));
    display();
};

document.getElementById('searchtxt').addEventListener("input", function(){
    let check = localStorage.getItem("mynotes");
    if (check == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(check);
    }
    let var2 = document.getElementById('searchtxt').value;
    notesarr.forEach( function(element, index){
        let var1 = element["title"];
        if (var1.includes(var2)==true){
            document.getElementById(`card${index}`).style.display = "block";
        }
        else{
            document.getElementById(`card${index}`).style.display = "none";
        }
    });
});

function markimp(index){
    let important = document.getElementById(`card${index}`);
    let mark = document.getElementById(`imp${index}`);
    let unmark = document.getElementById(`notimp${index}`);
    important.style.borderColor = "red";
    mark.style.display = "none";
    unmark.style.display = "inline-block";
    let check = localStorage.getItem("myindex1");
    if (check == null) {
        indexArr1 = {};
    }
    else {
        indexArr1 = JSON.parse(check);
    }
    indexArr1[`card${index}`] = index;
    localStorage.setItem("myindex1",JSON.stringify(indexArr1));
};
function unmark(index){
    let important = document.getElementById(`card${index}`);
    let mark = document.getElementById(`imp${index}`);
    let unmark = document.getElementById(`notimp${index}`);
    important.style.borderColor = "";
    mark.style.display = "inline-block";
    unmark.style.display = "none";
    let check = localStorage.getItem("myindex1");
    if (check == null) {
        indexArr1 = {};
    }
    else {
        indexArr1 = JSON.parse(check);
    }
    delete indexArr1[`card${index}`];
    localStorage.setItem("myindex1",JSON.stringify(indexArr1));
};
function changes(){
    let mark = JSON.parse(localStorage.getItem("myindex1"));
    let value1 = Object.values(mark);
    value1.forEach(function(index){
        console.log(index);
        let card = document.getElementById(`card${index}`);
        let impbtn = document.getElementById(`imp${index}`);
        let notimpbtn = document.getElementById(`notimp${index}`);
        card.style.borderColor = "red";
        impbtn.style.display = "none";
        notimpbtn.style.display = "inline-block";
    });
}