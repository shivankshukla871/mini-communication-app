import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000'; // Your JSON server base URL

  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.base}${url}`);
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.base}${url}`, body)
      .pipe(
        catchError(err => {
          if (err.status === 404 || err.status === 0) {
            console.warn(`Collection missing for POST ${url}. Creating collection...`);
            return this.createCollection(url).pipe(
              switchMap(() => this.http.post<T>(`${this.base}${url}`, body))
            );
          }
          return throwError(() => err);
        })
      );
  }

  private createCollection(url: string) {
    const collectionName = url.replace('/', '');
    const patchBody = { [collectionName]: [] };
    return this.http.patch(`${this.base}`, patchBody);
  }
}
