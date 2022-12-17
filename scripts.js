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
		let bookHtml = '<section class="shelf"><div class="empty"><h2>There are no books in your library.</h2><button class="add-book btn-primary">Add a book</button></div></section>';
		bookShelf.insertAdjacentHTML('beforeend', bookHtml);
		document.querySelector('.add-book').addEventListener('click', showNewBookModal);
	}

}
loadShelf();
