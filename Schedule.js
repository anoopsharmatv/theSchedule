// create an array of to do list items which ar f the type objects , each object should contain text , wiht the value that should be entered in the label elmemt 




let getTheLsitFromstorage = function() {
    let stringifiedToDoList = localStorage.getItem("abcd");
    let parsedToDoList = JSON.parse(stringifiedToDoList);

    if (parsedToDoList === null) {
        return [];
    } else {
        return parsedToDoList
    }
}





let abcd = getTheLsitFromstorage()

let countToDo = abcd.length



let onClickStatus = function(checkBoxid, labelID, listID) {
    let cele = document.getElementById(checkBoxid)
    let lel = document.getElementById(labelID)
    lel.classList.toggle("strike")

    let checkIndex = abcd.findIndex(function(eachItem) {
        let listIDEle = "listID" + eachItem.uid
        if (listIDEle === listID) {
            return true;
        } else {
            return false;
        }
    })
    console.log(checkIndex)
    let theObject = abcd[checkIndex];
    console.log(theObject)

    if (theObject.isChecked === false) {
        theObject.isChecked = true;
    } else {
        theObject.isChecked = false;
    }
}



let inputele = document.getElementById("inputEleId")
inputele.type = "text";
inputele.placeholder = "Enter Your task"




let buttonEle = document.getElementById("addButtonEle")
buttonEle.onclick = function() {
    addToDo()
}

let uListEle = document.getElementById("listContainer");

let deleteItem = function(listID) {
    let liD = document.getElementById(listID)
    uListEle.removeChild(liD)

    let deleteIndex = abcd.findIndex(function(eachItem) {
        let deletId = "listID" + abcd.uid
        if (deletId === listID) {
            return true;
        } else {
            return false;
        }
    })
    abcd.splice(deleteIndex, 1)
}
let createAndAppendToDo = function(abcd) {
    let listID = "listID" + abcd.uid
    let labelID = "labelId" + abcd.uid
    let checkBoxid = "checkbpoxId" + abcd.uid
    let listEle = document.createElement("li");
    listEle.classList.add("d-flex", "flex-row", "todo-item-container", "w-100")
    uListEle.appendChild(listEle);
    listEle.id = listID


    let checkBoxEle = document.createElement("input");
    checkBoxEle.type = "checkbox";
    checkBoxEle.id = checkBoxid
    checkBoxEle.classList.add('checkbox-input')
    listEle.appendChild(checkBoxEle);
    checkBoxEle.onclick = function() {
        onClickStatus(checkBoxid, labelID, listID)
    }

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row")
    listEle.appendChild(labelContainer);

    let labelEle = document.createElement("label");
    labelEle.setAttribute("for", checkBoxid);
    labelEle.textContent = abcd.text
    labelEle.id = labelID
    labelContainer.appendChild(labelEle);
    labelEle.classList.add("checkbox-label")

    let deleteIconCont = document.createElement("div");
    deleteIconCont.classList.add("delete-icon-container")
    labelContainer.appendChild(deleteIconCont);

    let iconEle = document.createElement("i");
    iconEle.classList.add("far", "fa-trash-alt", "delete-icon")
    deleteIconCont.appendChild(iconEle);
    iconEle.onclick = function() {
        deleteItem(listID)
    }
}
let addToDo = function() {
    let inputEle = document.getElementById("inputEleId");
    let inputEleValue = inputEle.value;

    if (inputEleValue === "") {
        alert("Please enter a valid input")
    } else {
        countToDo += 1

        let newTodo = {
            text: inputEleValue,
            uid: countToDo,
            isChecked: false
        }
        abcd.push(newTodo)
        createAndAppendToDo(newTodo)

        inputEle.value = "";
    }

}
console.log(abcd)


let saveButton = document.getElementById("savebuttonid");

saveButton.onclick = function() {
    localStorage.setItem("abcd", JSON.stringify(abcd))
}



for (let x of abcd) {
    createAndAppendToDo(x);
}