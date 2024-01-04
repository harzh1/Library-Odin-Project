const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    console.log(
      `${title} by ${author}, ${pages} pages, ${
        read ? "has been read" : "not read yet"
      }`
    );
  }
}

// Clear the initial books
myLibrary.length = 0;

// Now you can add books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, false);

buildTable(myLibrary);

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function buildTable(data) {
  var table = document.getElementById("myTable");
  table.innerHTML = ""; // Clear the table first

  for (var i = 0; i < data.length; i++) {
    var row = `
            <tr>
                <td>${data[i].title}</td>
                <td>${data[i].author}</td>
                <td>${data[i].pages}</td>
                <td>${data[i].read ? "Yes" : "No"}</td>
                <td><button class="btn btn-outline-danger" onclick="removeBookFromLibrary(${i})" type="button">Remove</button></td>
                <td><button class="btn btn-outline-primary" onclick="changeReadStatus(${i})" type="button">Change</button></td>
            </tr>`;

    table.innerHTML += row;
  }
}

const fform = document.getElementById("myForm");
const ftitle = document.getElementById("title");
const fauthor = document.getElementById("author");
const fpages = document.getElementById("pages");
const titleError = document.querySelector("#title + span.error");

fform.addEventListener("submit", addBookToLibraryFromForm);

ftitle.addEventListener("input", (event) => {
  if (ftitle.validity.valid) {
    titleError.textContent = ""; // Reset the content of the message
    titleError.className = "error"; // Reset the visual state of the message
  } else {
    showError(ftitle);
  }
});

fauthor.addEventListener("input", (event) => {
  if (fauthor.validity.valid) {
    authorError.textContent = ""; // Reset the content of the message
    authorError.className = "error"; // Reset the visual state of the message
  } else {
    showError(fauthor);
  }
});

fpages.addEventListener("input", (event) => {
  if (fpages.validity.valid) {
    pagesError.textContent = ""; // Reset the content of the message
    pagesError.className = "error"; // Reset the visual state of the message
  } else {
    showError(fpages);
  }
});

function showError(item) {
  const itemError = document.querySelector(`#${item.id} + span.error`);
  if (item.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    itemError.textContent = `You need to enter an ${item.name}.`;
  } else if (item.validity.typeMismatch) {
    // If the field doesn't contain an title address,
    // display the following error message.
    itemError.textContent = "Entered value needs to be an title address.";
  } else if (item.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    itemError.textContent = `${item.name} should be at least ${item.minLength} characters; you entered ${item.value.length}.`;
  }
  itemError.className = "error active";
}

function addBookToLibraryFromForm(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  var form = document.getElementById("myForm");

  if (!form.checkValidity()) {
    // If the form is not valid, display the validation message and stop the function
    form.reportValidity();
    return;
  }

  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var pages = document.getElementById("pages").value;
  var selectedRadio = document.querySelector('input[name="readForm"]:checked');

  var selectedValue = selectedRadio ? selectedRadio.value : "NO";
  var read = selectedValue === "YES" ? true : false;

  addBookToLibrary(title, author, pages, read);
  buildTable(myLibrary);

  // Clear the form inputs
  form.reset();
}

function removeBookFromLibrary(index) {
  if (index >= 0 && index < myLibrary.length) {
    myLibrary.splice(index, 1); // Remove the book at the specified index
    buildTable(myLibrary); // Rebuild the table
  }
}

function changeReadStatus(index) {
  if (index >= 0 && index < myLibrary.length) {
    myLibrary[index].read = !myLibrary[index].read;
    buildTable(myLibrary);
  }
}
