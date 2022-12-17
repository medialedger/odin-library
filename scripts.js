// get stored data
function getLibraryData() {
	return JSON.parse(localStorage.getItem('library'));
}
function saveLibraryData(data) {
	localStorage.setItem('library', JSON.stringify(data));
}

// save read info
const updateRead = function() {
	const thisID = Number(this.closest('article').dataset.bookid);
	const library = getLibraryData();
	for (let i = 0; i < library.length; i++) {
		let element = library[i];
		if(element.id === thisID) {
			if(this.value === 'true') {
				element.haveRead = true;
			} else if(this.value === 'false') {
				element.haveRead = false;
			}
		}
	}
	saveLibraryData(library);
}
function hookupReadButtons() {
	const allReadButtons = document.querySelectorAll('article input[type="radio"]');
	if(allReadButtons) {
		allReadButtons.forEach(btn => {
			btn.addEventListener('click', updateRead);
		})
	}
}

// remove book 
const removeBook = function(id) {
	const library = getLibraryData();
	const newLibrary = library.filter(book => book.id !== id)
	saveLibraryData(newLibrary);
	loadShelf();
}
function hookupRemoveButtons() {
	const allRemoveButtons = document.querySelectorAll('article .remove button');
	if(allRemoveButtons) {
		allRemoveButtons.forEach(btn => {
			btn.addEventListener('click', () => {
				const thisID = Number(btn.closest('article').dataset.bookid);
				showRemoveBookModal(thisID);
			})
		})
	}
}
function showRemoveBookModal(id) {
	const removeBookModal = document.getElementById('remove-modal');
	const library = getLibraryData();
	const thisBook = library.filter(book => book.id === id);
	removeBookModal.querySelector('.title').textContent = `"${thisBook[0].title}"`;
	removeBookModal.querySelector('button[type="submit"]').addEventListener('click', () => {
		removeBook(id);
	})
	removeBookModal.showModal();
}

// book constructor
function Book(title,author,year,haveRead) {
	this.title = title;
	this.author = author;
	this.year = year;
	this.haveRead = haveRead;
}
// add new book
Book.prototype.addBook = function(book) {
	const library = getLibraryData();
	if(library && library.length > 0){
		const maxID = Math.max(...library.map(book => book.id));
		book.id = maxID + 1;
		library.push(book);
		saveLibraryData(library);
	} else {
		let library = [];
		book.id = 1;
		library.push(book);
		saveLibraryData(library);
	}
	loadShelf();
}

// fire new book dialog
const showNewBookModal = function() {
	const newBookModal = document.getElementById('new-modal');
	newBookModal.showModal();
}
document.getElementById('add-book').addEventListener('click', showNewBookModal);
document.querySelector('#new-modal button[type="submit"]').addEventListener('click', (e) => {
	const thisBookData = e.target.closest('form');
	thisBook = new Book(thisBookData.querySelector('input[name="title"]').value, thisBookData.querySelector('input[name="author"]').value, thisBookData.querySelector('input[name="year"]').value, thisBookData.querySelector('input[name="newBook-read"]:checked').value === 'true' ? true : false);
	thisBook.addBook(thisBook);
});

// close buttons
function closeModal() {
	this.closest('dialog').close('close');
}
const allCloseButtons = document.querySelectorAll('button.close');
allCloseButtons.forEach(btn => btn.addEventListener('click',closeModal));

// display books
function loadShelf() {
	const bookShelf = document.querySelector('main');
	bookShelf.innerHTML = '';
	const library = getLibraryData();
	if(library && library.length > 0) {
		let bookHtml = '<section class="shelf">';
		const librarySorted = library.sort((book1, book2) => book1.title > book2.title);
		for (let i = 0; i < librarySorted.length; i++) {
			const book = librarySorted[i];
			bookHtml += 
				`<article data-bookID="${book.id}">
					<h2>${book.title}</h2>
					<div>
						<h3>${book.author}</h3>
						<p>${book.year}</p>
						<form>
							<fieldset>
								<legend>Read?</legend>
								<input type="radio" name="book${book.id}-read" id="book${book.id}-read-yes" value="true" ${book.haveRead === true ? 'checked' : ''}>
								<label for="book${book.id}-read-yes">
									<svg width="24" height="24"><title>yes</title><use href="#icon-read"></use></svg>
								</label>
								<input type="radio" name="book${book.id}-read" id="book${book.id}-read-no" value="false" ${book.haveRead === false ? 'checked' : ''}>
								<label for="book${book.id}-read-no">
									<svg width="24" height="24"><title>no</title><use href="#icon-unread"></use></svg>
								</label>
							</fieldset>
						</form>
						<div class="remove">
							<button>remove <svg width="24" height="24"><title>remove icon</title><use href="#icon-delete"></use></svg></button>
						</div>
					</div>
				</article>
			`;
		}
		bookHtml += '</section>';
		bookShelf.insertAdjacentHTML('beforeend', bookHtml);
		hookupReadButtons();
		hookupRemoveButtons();
	} else {
		let bookHtml = '<section class="shelf"><div class="empty"><h2>There are no books in your library.</h2><div class="btn-box"><button class="add-book btn-primary">Add a book</button> <button class="add-books btn-primary">Add a bunch of books</button></div></div></div></section>';
		bookShelf.insertAdjacentHTML('beforeend', bookHtml);
		document.querySelector('.add-book').addEventListener('click', showNewBookModal);
		document.querySelector('.add-books').addEventListener('click', initData);
	}

}
loadShelf();


// initial data
function initData() {
	let library = [
		{
			"title": "Things Fall Apart",
			"author": "Chinua Achebe",
			"year": "1958",
			"haveRead": null,
			id: 1
		},
		{
			"title": "Pride and Prejudice",
			"author": "Jane Austen",
			"year": "1813",
			"haveRead": null,
			id: 2
		},
		{
			"title": "Molloy, Malone Dies, The Unnamable, a trilogy",
			"author": "Samuel Beckett",
			"year": "1951–53",
			"haveRead": null,
			id: 3
		},
		{
			"title": "Wuthering Heights",
			"author": "Emily Brontë",
			"year": "1847",
			"haveRead": null,
			id: 4
		},
		{
			"title": "The Canterbury Tales",
			"author": "Geoffrey Chaucer",
			"year": "1380s–1400",
			"haveRead": false,
			id: 5
		},
		{
			"title": "Nostromo",
			"author": "Joseph Conrad",
			"year": "1904",
			"haveRead": null,
			id: 6
		},
		{
			"title": "Great Expectations",
			"author": "Charles Dickens",
			"year": "1861",
			"haveRead": true,
			id: 7
		},
		{
			"title": "Middlemarch",
			"author": "George Eliot",
			"year": "1871",
			"haveRead": null,
			id: 8
		},
		{
			"title": "Invisible Man",
			"author": "Ralph Ellison",
			"year": "1952",
			"haveRead": null,
			id: 9
		},
		{
			"title": "Absalom, Absalom!",
			"author": "William Faulkner",
			"year": "1936",
			"haveRead": null,
			id: 10
		},
		{
			"title": "The Sound and the Fury",
			"author": "William Faulkner",
			"year": "1929",
			"haveRead": null,
			id: 11
		},
		{
			"title": "The Old Man and the Sea",
			"author": "Ernest Hemingway",
			"year": "1952",
			"haveRead": null,
			id: 12
		},
		{
			"title": "Ulysses",
			"author": "James Joyce",
			"year": "1922",
			"haveRead": null,
			id: 13
		},
		{
			"title": "Sons and Lovers",
			"author": "D. H. Lawrence",
			"year": "1913",
			"haveRead": null,
			id: 14
		},
		{
			"title": "The Golden Notebook",
			"author": "Doris Lessing",
			"year": "1962",
			"haveRead": null,
			id: 15
		},
		{
			"title": "Moby-Dick",
			"author": "Herman Melville",
			"year": "1851",
			"haveRead": null,
			id: 16
		},
		{
			"title": "Beloved",
			"author": "Toni Morrison",
			"year": "1987",
			"haveRead": null,
			id: 17
		},
		{
			"title": "Lolita",
			"author": "Vladimir Nabokov",
			"year": "1955",
			"haveRead": null,
			id: 18
		},
		{
			"title": "Nineteen Eighty-Four",
			"author": "George Orwell",
			"year": "1949",
			"haveRead": null,
			id: 19
		},
		{
			"title": "Tales",
			"author": "Edgar Allan Poe",
			"year": "1832–49",
			"haveRead": null,
			id: 20
		},
		{
			"title": "Midnight's Children",
			"author": "Salman Rushdie",
			"year": "1981",
			"haveRead": null,
			id: 21
		},
		{
			"title": "Hamlet",
			"author": "William Shakespeare",
			"year": "1603",
			"haveRead": true,
			id: 22
		},
		{
			"title": "King Lear",
			"author": "William Shakespeare",
			"year": "1608",
			"haveRead": null,
			id: 23
		},
		{
			"title": "Othello",
			"author": "William Shakespeare",
			"year": "1609",
			"haveRead": null,
			id: 24
		},
		{
			"title": "Tristram Shandy",
			"author": "Laurence Sterne",
			"year": "1760",
			"haveRead": null,
			id: 25
		},
		{
			"title": "Gulliver's Travels",
			"author": "Jonathan Swift",
			"year": "1726",
			"haveRead": null,
			id: 26
		},
		{
			"title": "Adventures of Huckleberry Finn",
			"author": "Mark Twain",
			"year": "1884",
			"haveRead": false,
			id: 27
		},
		{
			"title": "Leaves of Grass",
			"author": "Walt Whitman",
			"year": "1855",
			"haveRead": null,
			id: 28
		},
		{
			"title": "Mrs Dalloway",
			"author": "Virginia Woolf",
			"year": "1925",
			"haveRead": null,
			id: 29
		},
		{
			"title": "To the Lighthouse",
			"author": "Virginia Woolf",
			"year": "1927",
			"haveRead": null,
			id: 30
		}
	];
	localStorage.removeItem('library');
	localStorage.setItem('library', JSON.stringify(library));
	loadShelf();
}
