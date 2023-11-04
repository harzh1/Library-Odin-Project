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

function addBookToLibraryFromForm(event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  var form = document.getElementById("myForm");
  var title = document.getElementById("ftitle").value;
  var author = document.getElementById("fauthor").value;
  var pages = document.getElementById("fpages").value;
  var selectedValue = document.querySelector(
    'input[name="readForm"]:checked'
  ).value;
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
