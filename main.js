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

    const readInput = document.createElement("input");
    readInput.setAttribute("type", "checkbox");

    const submit = document.createElement("button");
    submit.innerText = "Add";
    submit.addEventListener("click", () => {
        myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked));
        bookForm.remove();
        addBookCard();
        active = false;
    });
    submit.textContent = "";

    bookForm.append(titleInput);
    bookForm.append(authorInput);
    bookForm.append(pagesInput);
    bookForm.append(readInput);
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
    author.textContent = `Author: ${bookObject.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${bookObject.pages}`;

    const read = document.createElement("input");
    read.setAttribute("checked", bookObject.read);
    read.setAttribute("type", "checkbox");
    read.addEventListener("change", () => {
        bookObject.read = read;
    });

    const label = document.createElement("label");
    label.textContent = "Read";

    book.append(title);
    book.append(author);
    book.append(pages);
    book.append(read);
    book.append(label);
    bookcontainer.append(book);
}