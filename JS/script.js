console.log("This is a Notes Application");
showText();
var count = 0;

//Adding title along with the note and displaying it inplace of Note 1, Note 2, etc.
//This method will be carried out everytime the "Add Note" button is CLICKED
document.getElementById("submitButton").addEventListener("click", function (e) {
  //Input of Note Titles and storing it in local storage
  let textInput2 = document.getElementById("floatingTextarea2");
  if (textInput2.value == "") {
    alert("Cannot Add Empty Note");
  } else {
    let heading = localStorage.getItem("heading");
    if (heading == null) {
      headingObj = [];
    } else {
      headingObj = JSON.parse(heading);
    }
    headingObj.push(textInput2.value);
    localStorage.setItem("heading", JSON.stringify(headingObj));
    textInput2.value = "";
    // showText();
  }
  let textInput = document.getElementById("floatingTextarea");
  if (textInput.value == "") {
    alert("Cannot Add Empty Note");
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(textInput.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textInput.value = "";
    showText();
  }
});

//A function to display the notes that the user has entered
function showText() {
  let heading = localStorage.getItem("heading");
  if (heading == null) {
    headingObj = [];
  } else {
    headingObj = JSON.parse(heading);
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  let i = 1;
  let cardTitle = "";
  //Iterating through the Array and displaying the notes
  notesObj.forEach(function (element, index) {
    html += `<div class="notesCard card me-3 mb-3 scroll" style="width: 18rem;">
        <div class="card-body">
          <h4 class="card-heading"></h4>
          <p class="para">${element}</p>
          <button id="${index}" onclick="deleteText(this.id)" class="btn" id="deleteBtn">Delete Note</button>
        </div>
      </div>`;
    let itemVariable = localStorage.getItem("notes");
    itemVariable = JSON.parse(itemVariable);
    // console.log(itemVariable);
  });
  let notesElement = document.getElementById("notes");
  notesElement.innerHTML = html;

  /*Here what I am trying to do is that im extracting the heading values from
  local storage = "heading" and then editing the inner text of current heading
  and assigining new heading values imported from local storage .*/

  let cardHeading = document.getElementsByClassName("card-heading");
  let headingStorage = JSON.parse(localStorage.getItem("heading"));

  for (let i = 0; i < headingStorage.length; i++) {
    cardHeading[i].innerText = headingStorage[i];
  }

  //If the number of notes entered is 0 then show a default message untill a new note is entered
  if (notesObj.length == 0) {
    notesElement.innerHTML = `<p>Nothing to show ! Use "Add Note" to add your notes.</p>`;
  }
}

//A function to delete the notes entered by the user
function deleteText(index) {
  //Deleting the heading from the local storage
  let heading = localStorage.getItem("heading");
  if (heading == null) {
    headingObj = [];
  } else {
    headingObj = JSON.parse(heading);
  }
  headingObj.splice(index, 1);
  localStorage.setItem("heading", JSON.stringify(headingObj));

  //Deleting the notes from the local storage
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj)); // Again sets a new local storage with updated array (after deletion of the card)
  showText();
}

//This displays only those cards which matches the Search Text
let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function (e) {
  inputVal = searchText.value; // The text that is entered in the Search Box
  let numberOfHeadingArray = JSON.parse(localStorage.getItem("heading"));
  let numberOfNotesArray = JSON.parse(localStorage.getItem("notes"));
  let flag = false;
  for (let i = 0; i < numberOfHeadingArray.length; i++) {
    if (
      numberOfHeadingArray[i].toLowerCase().includes(inputVal) ||
      numberOfNotesArray[i].toLowerCase().includes(inputVal)
    ) {
      flag = true;
      break;
    }
  }

  // let x = document.getElementById("notes");
  // let y = document.createElement("p");
  // /*Here if the flag is false then there are no more cards on display which is because seaerch result does not match
  //  So adding a new message if all card's display is none
  //  If the user then enters a search result which matches the card content then remove the search result error message
  //  If the user enters search result error more than 1 time, for example the user enters 'hs' and no result found and
  //  if the user continues to type 'hsq' and no search result found then in that case remove the lastly entererd
  //  search result error message because there is already a search result error message on display.
  //  */
  // console.log(inputVal);
  // console.log(inputVal == "");
  // if (inputVal == "") {
  //   let newElems = document.getElementById("notes");
  //   console.log("HELLO BABES");
  //   newElems.innerHTML = `<p>Nothing to show ! Use "Add Note" to add your notes.</p>`;
  //   console.log(newElems);
  // }
  // if (flag == false) {
  //   ++count;
  //   console.log("COUNTING :" + count);
  //   if (count > 1) {
  //     x.removeChild(x.lastChild);
  //   }
  //   y.innerHTML = `Sorry, we couldn't find any results. <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
  //         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  //         <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
  //       </svg>`;
  //   x.append(y);
  // } else {
  //   x.removeChild(x.lastChild);
  // }

  //Search by writing the content of the notes or the content of the heading
  let notesCard = document.getElementsByClassName("notesCard");

  Array.from(notesCard).forEach(function (element) {
    let headingText = element.getElementsByTagName("h4")[0].innerText;
    let cardText = element.getElementsByTagName("p")[0].innerText;
    //Converted Both Card Content and Search Text to Same Case so that result
    // is shown even if case is not matched
    headingText = headingText.toLowerCase(); // Content of the Headinig
    cardText = cardText.toLowerCase(); //Content of the Card
    inputVal = inputVal.toLowerCase(); // Content of Search Box
    if (cardText.includes(inputVal) || headingText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// Further Features:
// 1. Add Title --> Done
// 2. Showing No result found when search result does not match --> Done
// 2. Mark Note as Important
// 3. Separate Notes for Separate User
