export interface Blog {
	title: string;
	paragraphs: string[];
	authorName: string; // Part 2
	comments: {
		// Part 3
		email: string;
		paragraphs: string[];
	}[];
}
