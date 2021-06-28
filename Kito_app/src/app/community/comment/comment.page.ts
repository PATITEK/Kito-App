import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  headerCustom = { title: 'Bình luận' }
  id
  commentData
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }
  
  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('commentsID'))
    this.postService.showAllComment(this.id).subscribe((data:any)=>{
      this.commentData = data.comments;
      console.log(this.commentData);
    });
  }
}