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
function Book(title,author,year,haveRead,category) {
	this.title = title;
	this.author = author;
	this.year = year;
	this.haveRead = haveRead;
	this.category = category;
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
	const newBookForm = e.target.closest('form');
	const newBookData = new FormData(newBookForm);
	thisBook = new Book(newBookData.get('title'), newBookData.get('author'), newBookData.get('year'), newBookData.get('newBook-read') === 'true' ? true : false, newBookData.get('category'));
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
		// get categories
		const bookCats = [... new Set(library.map(book => book.category))];
		console.log(bookCats);
		bookCats.forEach(cat => {
			let bookHtml = `<section class="category"><h2>${cat}</h2><div class="shelf">`;
			const libraryFiltered = library.filter(book => book.category === cat);
			const librarySorted = libraryFiltered.sort((book1, book2) => (book1.title > book2.title) ? 1 : (book2.title > book1.title) ? -1 : 0);
			for (let i = 0; i < librarySorted.length; i++) {
				const book = librarySorted[i];
				bookHtml += 
					`<article data-bookID="${book.id}">
						<h3>${book.title}</h3>
						<div>
							<h4>${book.author}</h4>
							<p>${book.year}</p>
							<form>
								<fieldset>
									<legend>Read?</legend>
									<div class="radio-box">
										<input type="radio" name="book${book.id}-read" id="book${book.id}-read-yes" value="true" ${book.haveRead === true ? 'checked' : ''}>
										<label for="book${book.id}-read-yes">
											<svg width="24" height="24"><title>yes</title><use href="#icon-read"></use></svg>
										</label>
										<input type="radio" name="book${book.id}-read" id="book${book.id}-read-no" value="false" ${book.haveRead === false ? 'checked' : ''}>
										<label for="book${book.id}-read-no">
											<svg width="24" height="24"><title>no</title><use href="#icon-unread"></use></svg>
										</label>
									</div>
								</fieldset>
							</form>
							<div class="remove">
								<button>remove <svg width="24" height="24"><title>remove icon</title><use href="#icon-delete"></use></svg></button>
							</div>
						</div>
					</article>
				`;
			}
			bookHtml += '</div></section>';
			bookShelf.insertAdjacentHTML('beforeend', bookHtml);
		})
		const allBooks = document.querySelectorAll('.shelf article');
		allBooks.forEach(book => {
			const randomColor = Math.floor(Math.random() * 12) + 1;
			book.classList.add(`color-${randomColor}`);
		})
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
			"id": 1,
			"title": "Things Fall Apart",
			"author": "Chinua Achebe",
			"year": "1958",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 2,
			"title": "Pride and Prejudice",
			"author": "Jane Austen",
			"year": "1813",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 3,
			"title": "Molloy, Malone Dies, The Unnamable, a trilogy",
			"author": "Samuel Beckett",
			"year": "1951–53",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 4,
			"title": "Wuthering Heights",
			"author": "Emily Brontë",
			"year": "1847",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 5,
			"title": "The Canterbury Tales",
			"author": "Geoffrey Chaucer",
			"year": "1380s–1400",
			"haveRead": false,
			"category": "Fiction"
		},
		{
			"id": 6,
			"title": "Nostromo",
			"author": "Joseph Conrad",
			"year": "1904",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 7,
			"title": "Great Expectations",
			"author": "Charles Dickens",
			"year": "1861",
			"haveRead": true,
			"category": "Fiction"
		},
		{
			"id": 8,
			"title": "Middlemarch",
			"author": "George Eliot",
			"year": "1871",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 9,
			"title": "Invisible Man",
			"author": "Ralph Ellison",
			"year": "1952",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 10,
			"title": "Absalom, Absalom!",
			"author": "William Faulkner",
			"year": "1936",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 11,
			"title": "The Sound and the Fury",
			"author": "William Faulkner",
			"year": "1929",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 12,
			"title": "The Old Man and the Sea",
			"author": "Ernest Hemingway",
			"year": "1952",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 13,
			"title": "Ulysses",
			"author": "James Joyce",
			"year": "1922",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 14,
			"title": "Sons and Lovers",
			"author": "D. H. Lawrence",
			"year": "1913",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 15,
			"title": "The Golden Notebook",
			"author": "Doris Lessing",
			"year": "1962",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 16,
			"title": "Moby-Dick",
			"author": "Herman Melville",
			"year": "1851",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 17,
			"title": "Beloved",
			"author": "Toni Morrison",
			"year": "1987",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 18,
			"title": "Lolita",
			"author": "Vladimir Nabokov",
			"year": "1955",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 19,
			"title": "Nineteen Eighty-Four",
			"author": "George Orwell",
			"year": "1949",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 20,
			"title": "Tales",
			"author": "Edgar Allan Poe",
			"year": "1832–49",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 21,
			"title": "Midnight's Children",
			"author": "Salman Rushdie",
			"year": "1981",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 22,
			"title": "Hamlet",
			"author": "William Shakespeare",
			"year": "1603",
			"haveRead": true,
			"category": "Fiction"
		},
		{
			"id": 23,
			"title": "King Lear",
			"author": "William Shakespeare",
			"year": "1608",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 24,
			"title": "Othello",
			"author": "William Shakespeare",
			"year": "1609",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 25,
			"title": "Tristram Shandy",
			"author": "Laurence Sterne",
			"year": "1760",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 26,
			"title": "Gulliver's Travels",
			"author": "Jonathan Swift",
			"year": "1726",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 27,
			"title": "Adventures of Huckleberry Finn",
			"author": "Mark Twain",
			"year": "1884",
			"haveRead": false,
			"category": "Fiction"
		},
		{
			"id": 28,
			"title": "Leaves of Grass",
			"author": "Walt Whitman",
			"year": "1855",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 29,
			"title": "Mrs Dalloway",
			"author": "Virginia Woolf",
			"year": "1925",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 30,
			"title": "To the Lighthouse",
			"author": "Virginia Woolf",
			"year": "1927",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 31,
			"title": "To the Lighthouse",
			"author": "Virginia Woolf",
			"year": "1927",
			"haveRead": null,
			"category": "Fiction"
		},
		{
			"id": 32,
			"title": "Unbroken: A World War II Story of Survival, Resilience and Redemption",
			"author": "Laura Hillenbrand",
			"year": "2010",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 33,
			"title": "Just Mercy: A Story of Justice and Redemption",
			"author": "Bryan Stevenson",
			"year": "2014",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 34,
			"title": "Eyewitness Auschwitz: Three Years in the Gas Chambers",
			"author": "Filip Müller",
			"year": "1979",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 35,
			"title": "The Boys in the Boat: Nine Americans and Their Epic Quest for Gold at the 1936 Berlin Olympics",
			"author": "Daniel James Brown",
			"year": "2013",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 36,
			"title": "Parsnips, Buttered: How to baffle, bamboozle and boycott your way through modern life",
			"author": "Joe Lycett",
			"year": "2016",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 37,
			"title": "Orange Is the New Black",
			"author": "Piper Kerman",
			"year": "2010",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 38,
			"title": "Auschwitz: A Doctor's Eyewitness Account",
			"author": "Miklós Nyiszli",
			"year": "1946",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 39,
			"title": "Them: Adventures with Extremists",
			"author": "Jon Ronson",
			"year": "2001",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 40,
			"title": "So You've Been Publicly Shamed",
			"author": "Jon Ronson",
			"year": "2015",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 41,
			"title": "Rising Strong: The Reckoning. The Rumble. The Revolution.",
			"author": "Brené Brown",
			"year": "2015",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 42,
			"title": "Simplicity Parenting: Using the Extraordinary Power of Less to Raise Calmer, Happier, and More Secure Kids",
			"author": "Kim John Payne",
			"year": "2009",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 43,
			"title": "The Omnivore's Dilemma: A Natural History of Four Meals",
			"author": "Michael Pollan",
			"year": "2006",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 44,
			"title": "A Homemade Life: Stories and Recipes from My Kitchen Table",
			"author": "Molly Wizenberg",
			"year": "2009",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 45,
			"title": "The Tipping Point: How Little Things Can Make a Big Difference",
			"author": "Malcolm Gladwell",
			"year": "2000",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 46,
			"title": "My Life in France",
			"author": "Julia Child",
			"year": "2006",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 47,
			"title": "Animal, Vegetable, Miracle: A Year of Food Life",
			"author": "Barbara Kingsolver",
			"year": "2007",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 48,
			"title": "Project-Based Homeschooling: Mentoring Self-Directed Learners",
			"author": "Lori McWilliam Pickert",
			"year": "2012",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 49,
			"title": "Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead",
			"author": "Brené Brown",
			"year": "2012",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 50,
			"title": "The Gifts of Imperfection",
			"author": "Brené Brown",
			"year": "2010",
			"haveRead": null,
			"category": "Non Fiction"
		},
		{
			"id": 51,
			"title": "The Well-Educated Mind: A Guide to the Classical Education You Never Had",
			"author": "Susan Wise Bauer",
			"year": "2003",
			"haveRead": null,
			"category": "Non Fiction"
		}
	];
	localStorage.removeItem('library');
	saveLibraryData(library)
	loadShelf();
}
