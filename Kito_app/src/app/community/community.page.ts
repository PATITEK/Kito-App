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
  
  
  showfullcontenttext = "Xem thêm..."
  constructor(
    private postService: PostService
  ) { }
  
  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {  
      this.posts = data.posts;
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
  comment(){
    if(this.clickComment) this.clickComment = false
    else this.clickComment = true;
  }
}
