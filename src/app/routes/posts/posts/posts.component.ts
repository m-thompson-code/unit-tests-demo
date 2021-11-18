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
	// posts!: Post[];

	posts$: Observable<Post[]> = this.postService.getPosts().pipe(share());

	// blogs$: Observable<Blog[]> = this.posts$.pipe(
	// 	map(posts => {
	// 		return posts.map(post => {
	// 			return {
	// 				title: post.title,
	// 				paragraphs: this.getParagraphs(post.body),
	// 			};
	// 		})
	// 	})
	// );

	userIds$ = this.posts$.pipe(map((posts) => posts.map((post) => post.userId)));

	users$ = this.userIds$.pipe(switchMap((userIds) => forkJoin(userIds.map((userId) => this.userService.getUser(userId)))));

	// blogs$: Observable<Blog[]> = forkJoin([
	// 	this.posts$,
	// 	this.users$,
	// ]).pipe(
	// 	map(([posts, users]) => {
	// 		return posts.map(post => {
	// 			return {
	// 				title: post.title,
	// 				paragraphs: this.getParagraphs(post.body),
	// 				authorName: this.getAuthorName(post.userId, users),
	// 			};
	// 		})
	// 	})
	// );

	comments$ = this.commentService.getAllComments();

	blogs$: Observable<Blog[]> = forkJoin([this.posts$, this.users$, this.comments$]).pipe(
		map(([posts, users, comments]) => {
			return posts.map((post) => {
				return {
					title: post.title,
					paragraphs: this.getParagraphs(post.body),
					authorName: this.getAuthorName(post.userId, users),
					comments: this.getPostComments(post.id, comments),
				};
			});
		}),
	);

	constructor(
		private readonly postService: PostService,
		private readonly commentService: CommentService,
		private readonly userService: UserService,
	) {}

	// getPosts(): void {
	// 	console.log('Before', this.posts);
	// 	this.postService.getPosts().subscribe((posts) => {
	// 		this.posts = posts; //.map(post => ({...post, body: post.body.replace('\n', 'moocow')}));
	// 		console.log('Inside subscribe', this.posts);
	// 	});
	// 	console.log('After', this.posts);
	// }

	getParagraphs(source: string): string[] {
		return source.split('\n');
	}

	getAuthorName(userId: number, users: User[]): string {
		return users.find((user) => user.id === userId)?.name ?? 'Unknown';
	}

	getPostComments(postId: number, comments: Comment[]): Blog['comments'] {
		return comments
			.filter((comment) => comment.postId === postId)
			.map((comment) => {
				return {
					email: comment.email,
					paragraphs: this.getParagraphs(comment.body),
				};
			});
	}
}
