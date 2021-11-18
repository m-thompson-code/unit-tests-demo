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

const mockPostService = {
	// getPosts: () => scheduled(of(mockPosts), asyncScheduler),
	getPosts: () => of(mockPosts),
} as PostService;

const mockUserService = {
	getUser: (userId: number) => {
		if (userId === 1) {
			return of(mockUser1);
		}

		if (userId === 2) {
			return of(mockUser2);
		}

		throw new Error('Unexpected error');
	},
} as UserService;

const mockCommentService = {
	getAllComments: () => of(mockComments),
} as CommentService;

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
				{
					provide: UserService,
					useValue: mockUserService,
				},
				{
					provide: CommentService,
					useValue: mockCommentService,
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

	// describe('getPosts()', () => {
	// 	it('get posts', () => {
	// 		expect(component.posts).toBe(undefined);
	// 		component.getPosts();
	// 		expect(component.posts).toBe(mockPosts);
	// 	});
	// });

	describe('posts$', () => {
		it('get posts', (done) => {
			expect.assertions(1);

			component.posts$.subscribe((posts) => {
				expect(posts).toStrictEqual(mockPosts);
				done();
			});
		});
	});

	// describe('blogs$', () => {
	// 	it('get blogs', (done) => {
	// 		expect.assertions(1);

	// 		component.blogs$.subscribe((blogs) => {
	// 			expect(blogs).toStrictEqual([
	// 				{
	// 					title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
	// 					paragraphs: [
	// 						'quia et suscipit',
	// 						'suscipit recusandae consequuntur expedita et cum',
	// 						'reprehenderit molestiae ut ut quas totam',
	// 						'nostrum rerum est autem sunt rem eveniet architecto',
	// 					],
	// 				},
	// 				{
	// 					title: 'et ea vero quia laudantium autem',
	// 					paragraphs: [
	// 						'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus',
	// 						'accusamus in eum beatae sit',
	// 						'vel qui neque voluptates ut commodi qui incidunt',
	// 						'ut animi commodi',
	// 					],
	// 				},
	// 			]);
	// 			done();
	// 		});
	// 	});
	// });

	describe('userIds$', () => {
		it('should get userIds', (done) => {
			expect.assertions(1);

			component.userIds$.subscribe((userIds) => {
				expect(userIds).toStrictEqual([1, 2]);
				done();
			});
		});
	});

	describe('users$', () => {
		it('should get users', (done) => {
			expect.assertions(1);

			component.users$.subscribe((users) => {
				expect(users).toStrictEqual([
					{
						id: 1,
						name: 'Leanne Graham',
						username: 'Bret',
						email: 'Sincere@april.biz',
					},
					{
						id: 2,
						name: 'Ervin Howell',
						username: 'Antonette',
						email: 'Shanna@melissa.tv',
					},
				]);
				done();
			});
		});
	});

	// describe('blogs$', () => {
	// 	it('get blogs', (done) => {
	// 		expect.assertions(1);

	// 		component.blogs$.subscribe((blogs) => {
	// 			expect(blogs).toStrictEqual([
	// 				{
	// 					title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
	// 					paragraphs: [
	// 						'quia et suscipit',
	// 						'suscipit recusandae consequuntur expedita et cum',
	// 						'reprehenderit molestiae ut ut quas totam',
	// 						'nostrum rerum est autem sunt rem eveniet architecto',
	// 					],
	// 					authorName: 'Leanne Graham',
	// 				},
	// 				{
	// 					title: 'et ea vero quia laudantium autem',
	// 					paragraphs: [
	// 						'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus',
	// 						'accusamus in eum beatae sit',
	// 						'vel qui neque voluptates ut commodi qui incidunt',
	// 						'ut animi commodi',
	// 					],
	// 					authorName: 'Ervin Howell',
	// 				},
	// 			]);
	// 			done();
	// 		});
	// 	});
	// });

	describe('blogs$', () => {
		it('get blogs', (done) => {
			expect.assertions(1);

			component.blogs$.subscribe((blogs) => {
				expect(blogs).toStrictEqual([
					{
						title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
						paragraphs: [
							'quia et suscipit',
							'suscipit recusandae consequuntur expedita et cum',
							'reprehenderit molestiae ut ut quas totam',
							'nostrum rerum est autem sunt rem eveniet architecto',
						],
						authorName: 'Leanne Graham',
						comments: [
							{
								email: 'Eliseo@gardner.biz',
								paragraphs: [
									'laudantium enim quasi est quidem magnam voluptate ipsam eos',
									'tempora quo necessitatibus',
									'dolor quam autem quasi',
									'reiciendis et nam sapiente accusantium',
								],
							},
							{
								email: 'Jayne_Kuhic@sydney.com',
								paragraphs: [
									'est natus enim nihil est dolore omnis voluptatem numquam',
									'et omnis occaecati quod ullam at',
									'voluptatem error expedita pariatur',
									'nihil sint nostrum voluptatem reiciendis et',
								],
							},
						],
					},
					{
						title: 'et ea vero quia laudantium autem',
						paragraphs: [
							'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus',
							'accusamus in eum beatae sit',
							'vel qui neque voluptates ut commodi qui incidunt',
							'ut animi commodi',
						],
						authorName: 'Ervin Howell',
						comments: [],
					},
				]);
				done();
			});
		});
	});

	describe('getParagraphs()', () => {
		it('should split string at its newlines', () => {
			expect(component.getParagraphs('first\nsecond\nthird')).toStrictEqual(['first', 'second', 'third']);
		});
	});

	describe('getAuthorName()', () => {
		it("should find author's name from array of Users", () => {
			const users = [{ id: 10, name: 'bob guy' } as User, { id: 20, name: 'moocow' } as User];
			expect(component.getAuthorName(20, users)).toBe('moocow');
		});

		it("should return 'Unknown' if no author with userId is found", () => {
			const users = [{ id: 10, name: 'bob guy' } as User, { id: 20, name: 'moocow' } as User];
			expect(component.getAuthorName(-1, users)).toBe('Unknown');
		});
	});

	describe('getPostComments()', () => {
		it('should filter comments by postId', () => {
			expect(component.getPostComments(2, mockComments)).toStrictEqual([
				{
					email: 'Presley.Mueller@myrl.com',
					paragraphs: [
						'doloribus at sed quis culpa deserunt consectetur qui praesentium',
						'accusamus fugiat dicta',
						'voluptatem rerum ut voluptate autem',
						'voluptatem repellendus aspernatur dolorem in',
					],
				},
				{
					email: 'Dallas@ole.me',
					paragraphs: [
						'maiores sed dolores similique labore et inventore et',
						'quasi temporibus esse sunt id et',
						'eos voluptatem aliquam',
						'aliquid ratione corporis molestiae mollitia quia et magnam dolor',
					],
				},
			]);
		});
	});
});
