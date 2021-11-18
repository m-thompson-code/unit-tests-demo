import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, asyncScheduler, scheduled } from 'rxjs';

import { PostsComponent } from './posts.component';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../services/post/post.model';

import * as mockPosts from '../../../services/post/get-mock-posts.json';

import * as mockUser1 from '../../../services/user/get-mock-user-1.json';
import * as mockUser2 from '../../../services/user/get-mock-user-2.json';
import * as mockUser3 from '../../../services/user/get-mock-user-3.json';

import * as mockComments from '../../../services/comment/get-mock-comments.json';

const mockPostService = {
	// getPosts: () => scheduled(of(mockPosts), asyncScheduler),
	getPosts: () => of(mockPosts),
} as PostService;

describe('PostsComponent', () => {
	let component: PostsComponent;
	let fixture: ComponentFixture<PostsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostsComponent],
			providers: [
				{
					provide: PostService,
					useValue: mockPostService,
				},
			],
			imports: [HttpClientTestingModule],
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

	describe('getPosts()', () => {
		it('get posts', () => {
			expect(component.posts).toBe(undefined);
			component.getPosts();
			expect(component.posts).toBe(mockPosts);
		});
	});
});
