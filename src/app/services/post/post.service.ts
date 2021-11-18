import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
	constructor(private httpClient: HttpClient) {}

	getPosts(): Observable<Post[]> {
		return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
	}

	getPost(postId: number): Observable<Post> {
		return this.httpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
	}
}
