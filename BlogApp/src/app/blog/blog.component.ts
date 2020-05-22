import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPosts: Array<BlogPost> = [];
  
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params["tag"]) {
        this.tag = params["tag"];
        this.category = null;
      } else {
        this.tag = null;
      }

      if (params["category"]) {
        this.category = params["category"];
        this.tag = null;
      } else {
        this.category = null;
      }

      this.getPage(+params["page"] || 1);
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }

  getPage(num: number) {
    this.page = num;
    this.postService
      .getPosts(this.page, this.tag, this.category)
      .subscribe(blogPosts => {
        if (blogPosts.length > 0) {
          this.blogPosts = blogPosts;
        }
      });
  }
}
