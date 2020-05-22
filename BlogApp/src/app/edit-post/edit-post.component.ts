import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../BlogPost";
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"],
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  
  formSubmit() {
    this.postService
    .updatePostById(this.blogPost._id, {
      ...this.blogPost,
      tags: this.tags && this.tags.split(",").map((tag) => tag.trim()),
    })
    .subscribe(() => this.router.navigate([`/admin`]));
  }
  
  deletePost() {
    this.postService.deletePostById(this.blogPost._id).subscribe(() => this.router.navigate([`/admin`]));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.postService.getPostById(id).subscribe((post) => {
      this.blogPost = post;
      this.tags = post.tags.toString();
    });
  }
}
