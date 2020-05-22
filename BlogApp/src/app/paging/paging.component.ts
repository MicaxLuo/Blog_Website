import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-paging",
  templateUrl: "./paging.component.html",
  styleUrls: ["./paging.component.css"]
})
export class PagingComponent implements OnInit {
  @Input() page: number;
  @Output() newPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  increment() {
    this.page++;
    this.newPage.emit(this.page);
  }

  decrement() {
    if (this.page > 1) {
      this.page--;
      this.newPage.emit(this.page);
    }
  }
}
