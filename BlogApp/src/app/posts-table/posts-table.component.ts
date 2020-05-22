import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "../post.service";
import { BlogPost } from "../BlogPost";

@Component({
  selector: "app-posts-table",
  templateUrl: "./posts-table.component.html",
  styleUrls: ["./posts-table.component.css"],
})
export class PostsTableComponent implements OnInit {
  blogPosts: Array<BlogPost>=[];

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getAllPosts()
      .subscribe((posts) => (this.blogPosts = posts));
  }

  rowClicked(e: MouseEvent, id: string) {
    this.router.navigate([`/admin/post/`, id]);
  }
}
