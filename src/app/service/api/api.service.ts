import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiService {
  public static URL: string = 'http://localhost:8080';

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) {
  }

  get = <T>(url: string): Observable<T> => this.http.get<T>(url, {headers: this.headers});

  post = <T>(url: string, body: any): Observable<T> => this.http.post<T>(url, body, {headers: this.headers});

  put = <T>(url: string, body: any): Observable<T> => this.http.put<T>(url, body, {headers: this.headers});

  delete = <T>(url: string): Observable<T> => this.http.delete<T>(url, {headers: this.headers});
}
