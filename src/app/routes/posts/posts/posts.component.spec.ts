import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, asyncScheduler, scheduled } from 'rxjs';

import { PostsComponent } from './posts.component';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../services/post/post.model';

import mockPosts from '../../../services/post/get-mock-posts.json';

import mockUser1 from '../../../services/user/get-mock-user-1.json';
import mockUser2 from '../../../services/user/get-mock-user-2.json';

import mockComments from '../../../services/comment/get-mock-comments.json';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.model';
import { CommentService } from '../../../services/comment/comment.service';

describe('PostsComponent', () => {
	let component: PostsComponent;
	let fixture: ComponentFixture<PostsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PostsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
