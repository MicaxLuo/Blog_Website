import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../BlogPost";
import { Router } from "@angular/router";
import { PostService } from "../post.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"],
})
export class NewPostComponent implements OnInit {
  blogPost = new BlogPost();
  tags: string;

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {}

  formSubmit() {
    this.postService
      .newPost({
        ...this.blogPost,
        ...{
          isPrivate: false,
          postDate: new Date().toLocaleDateString(),
          postedBy: "WEB422 Student",
          views: 0,
          tags: this.tags && this.tags.split(",").map((tag) => tag.trim()),
        },
      })
      .subscribe(() => this.router.navigate([`/admin`]));
  }
}
