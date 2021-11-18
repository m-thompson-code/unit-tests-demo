import { Component, OnInit } from '@angular/core';

import { Post } from '../../../services/post/post.model';
import { User } from '../../../services/user/user.model';
import { Comment } from '../../../services/comment/comment.model';
import { PostService } from '../../../services/post/post.service';
import { CommentService } from '../../../services/comment/comment.service';
import { UserService } from '../../../services/user/user.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
	posts!: Post[];

	constructor(private postService: PostService, private commentService: CommentService, private userService: UserService) {}

	ngOnInit(): void {}

	getPosts(): void {
		console.log('Before', this.posts);
		this.postService.getPosts().subscribe((posts) => {
			this.posts = posts; //.map(post => ({...post, body: post.body.replace('\n', 'moocow')}));
			console.log('Inside subscribe', this.posts);
		});
		console.log('After', this.posts);
	}
}
