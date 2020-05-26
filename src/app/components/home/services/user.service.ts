import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UserProfile } from '../../../common/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userProfileUrl = `https://jsonplaceholder.typicode.com/users`;

  constructor(private http: HttpClient) {}

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http
      .get<UserProfile[]>(this.userProfileUrl)
      .pipe(tap(), catchError(this.handleError('getUserProfiles', [])));
  }

  // Error Handler.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
