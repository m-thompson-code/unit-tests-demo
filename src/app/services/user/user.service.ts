import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private httpClient: HttpClient) {}

	getUser(userId: number): Observable<User> {
		return this.httpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
	}
}
