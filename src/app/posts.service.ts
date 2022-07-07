import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            name: post.name,
            price: post.price,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postUpdated.next([...this.posts]);
      });
  }


  addPost(name: string, price: string) {
    const post: Post = { id: null, name: name, price: price };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log("Deleted");
        
      });
  }

  getPost(postId: string) {
    
    // this.http.get<{message:string, postId: string}>("http://localhost:3000/api/posts/" + postId)
    //   .subscribe((responseData) => {
    //     console.log(responseData);
        
    //   });
    this.http.get<{message:string, byIdPost: string}>("http://localhost:3000/api/posts/" + postId)
        .subscribe((responseData) => {
          console.log(responseData + " Found ")

            
        });
  }


  getPostUpdateListenetr() {
    return this.postUpdated.asObservable();
  }

  
}  