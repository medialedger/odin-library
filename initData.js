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
