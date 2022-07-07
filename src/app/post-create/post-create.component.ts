import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { Post } from '../post.model';  
import { PostService } from '../posts.service';  

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  categories$;
  categoriesCollection: AngularFirestoreCollection<any>;
  categs: Observable<any[]>;
  enteredName = ""; 
  enteredPrice = "";
  
  constructor(public postsService: PostService, categoryService: CategoryService){
    this.categoriesCollection = categoryService.getCategories();
    this.categs = this.categoriesCollection.valueChanges();

    this.categories$ = categoryService.getCategories();
  }  
  onAddPost(form: NgForm){  
    if(form.invalid){  
      return;  
    }  
    this.postsService.addPost(form.value.enteredName, form.value.enteredPrice )  
  }  
}    
