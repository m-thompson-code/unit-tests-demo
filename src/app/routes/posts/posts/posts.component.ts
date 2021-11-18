import { Component } from '@angular/core';

import { Post } from '../../../services/post/post.model';
import { User } from '../../../services/user/user.model';
import { Comment } from '../../../services/comment/comment.model';
import { PostService } from '../../../services/post/post.service';
import { CommentService } from '../../../services/comment/comment.service';
import { UserService } from '../../../services/user/user.service';
import { Blog } from './posts.model';
import { forkJoin, Observable } from 'rxjs';
import { map, share, startWith, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
	posts!: Post[];

	constructor(
		private readonly postService: PostService,
		private readonly commentService: CommentService,
		private readonly userService: UserService,
	) {}

	getPosts(): void {
		// console.log('Before', this.posts);
		this.postService.getPosts().subscribe((posts) => {
			this.posts = posts;
			// console.log('Inside subscribe', this.posts);
		});
		// console.log('After', this.posts);
	}
}
