import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { BlogPost } from "./BlogPost";
import { HttpClient, HttpParams } from "@angular/common/http";
import { isNullOrUndefined } from "util";


const perPage: number = 6;
export interface Category {
  cat: string;
  num: number;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string = "https://immense-brook-17183.herokuapp.com";
  
  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]> {
    let params = new HttpParams().append("page", page);
    params = params.append("perPage", perPage.toString());

    if (!isNullOrUndefined(tag)) params = params.append("tag", tag.toString());

    if (!isNullOrUndefined(category))
      params = params.append("category", category.toString());

    return this.http.get<BlogPost[]>(`${this.baseUrl}/api/posts`, { params });
  }

  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/api/posts/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/tags`);
  }

  getAllPosts(): Observable<BlogPost[]> {
    let params = new HttpParams().append("page", "1");
    params = params.append("perPage", Number.MAX_SAFE_INTEGER.toString());

    return this.http.get<BlogPost[]>(`${this.baseUrl}/api/posts`, { params });
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/posts/${id}`);
  }
}
