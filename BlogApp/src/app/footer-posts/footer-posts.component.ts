import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../BlogPost";
import { PostService } from "../post.service";

@Component({
  selector: "app-footer-posts",
  templateUrl: "./footer-posts.component.html",
  styleUrls: ["./footer-posts.component.css"]
})
export class FooterPostsComponent implements OnInit {
  posts: Array<BlogPost>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getPosts(1, null, null)
      .subscribe(posts => (this.posts = posts.splice(0, 3)));
  }
}
