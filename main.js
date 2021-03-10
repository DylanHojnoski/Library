let myLibrary = [];
let active = false;

const body = document.querySelector("body");
body.addEventListener("load", addBookToLibrary());

function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function()
    {
        return title + " by " + author + ", " + pages + " pages, " + read;
    }
}

function addBookToLibrary()
{
    const addBookButton = document.querySelector("#addBook");
    addBookButton.addEventListener("click", () => {
        if(!active)
        {
            newBookForm();
            active = true;
        }
    });
}

function newBookForm()
{
    const header = document.querySelector("header");
    const bookForm = document.createElement("div");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");

    const authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("placeholder", "Author");

    const pagesInput = document.createElement("input");
    pagesInput.setAttribute("type", "number");
    pagesInput.setAttribute("placeholder", "Pages");
    pagesInput.setAttribute("min", 1);

    const readInput = document.createElement("input");
    readInput.setAttribute("type", "checkbox");
    readInput.setAttribute("class", "read");

    const checkmark = document.createElement("span");
    checkmark.setAttribute("class", "checkmark");

    const label = document.createElement("label");
    label.textContent = "Read";

    const submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", () => {
        if(titleInput.value != "" && authorInput.value != "" && pagesInput.value != "")
        {
            myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked));
            bookForm.remove();
            addBookCard();
            active = false;
        }
    });

    bookForm.append(titleInput);
    bookForm.append(authorInput);
    bookForm.append(pagesInput);
    label.append(readInput);
    bookForm.append(label);
    label.append(checkmark);
    bookForm.append(submit);
    header.append(bookForm);
}

function addBookCard()
{
    const bookcontainer = document.querySelector(".bookContainer");
    const book = document.createElement("div");
    book.setAttribute("class", "book");
    const bookObject = myLibrary[myLibrary.length -1];

    const title = document.createElement("h2");
    title.textContent = bookObject.title;

    const author = document.createElement("p");
    author.textContent = `By: ${bookObject.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${bookObject.pages}`;

    const read = document.createElement("input");
    read.setAttribute("type", "checkbox");
    read.setAttribute("class", "read");
    bookObject.read ? read.setAttribute("checked", bookObject.read): false;
    read.addEventListener("change", () => {
        bookObject.read = read.checked;
    });

    const checkmark = document.createElement("span");
    checkmark.setAttribute("class", "checkmark");

    const label = document.createElement("label");
    label.textContent = "Read";

    const deleteBook = document.createElement("button");
    deleteBook.textContent = "X";
    deleteBook.setAttribute("class", "deleteBook");
    deleteBook.addEventListener("click", () => {
        book.remove();
        let index = myLibrary.indexOf(bookObject);
        myLibrary.splice(index, 1);
    });


    book.append(deleteBook);
    book.append(title);
    book.append(author);
    book.append(pages);
    label.append(read);
    label.append(checkmark);
    book.append(label);
    bookcontainer.append(book);
}