import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/@app-core/http';
@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  headerCustom = { title: 'Cộng đồng giáo dân' }
  
  posts: any
  clickComment = false
  CommentIDSelected
  commentContent
  imageurl
  repplyCommentID
  showfullcontenttext = "Xem thêm..."
  constructor(
    private postService: PostService
  ) { }
  
  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {  
      this.posts = data.posts;
      console.log(this.posts);
    });
  }
  showAll(){
    
  }
  like(id){
    this.postService.addLike(id).subscribe(()=>{
    });
    console.log(this.posts[0]);
  }
  showcomment(){
    // if(showfullcontent){
    //   for (let index = 0; index < 3; index++) {
    //     this.post.commentshort[index] = this.post.comments[index]
    //   }
    // }
  }
  comment(id){
    this.CommentIDSelected = id;
    console.log(this.CommentIDSelected)
    if(this.clickComment) this.clickComment = false
    else this.clickComment = true;
  }
  sendComment(){
    console.log(this.commentContent);
    
    this.postService.addComment(this.CommentIDSelected, this.commentContent, this.imageurl).subscribe(() => {
      this.postService.getAllPosts().subscribe(data => {  
        this.posts = data.posts;
        console.log(this.posts);
        this.clickComment = false
      });
    })
  }

  replyComment(id){
    this.postService.repplycomment(this.CommentIDSelected, this.commentContent, this.imageurl, id).subscribe(() => {
      this.postService.getAllPosts().subscribe(data => {  
        this.posts = data.posts;
        this.clickComment = false
        console.log(this.posts);
      });
    })
  }
}
