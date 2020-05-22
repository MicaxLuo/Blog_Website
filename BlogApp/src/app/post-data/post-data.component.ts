import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-data",
  templateUrl: "./post-data.component.html",
  styleUrls: ["./post-data.component.css"],
})
export class PostDataComponent implements OnInit, OnDestroy {
  querySub: any = [];
  post: BlogPost;
  commentName: string;
  commentText: string;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.activatedRoute.params.subscribe((params) => {
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.postService.getPostById(params["id"]).subscribe((post) => {
        this.post = post;
        this.post.views += 1;
        this.postService.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

  submitComment(addCommentForm: NgForm) {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    });

    this.postService
      .updatePostById(this.post._id, this.post)
      .subscribe(() => addCommentForm.resetForm());
  }
}
