import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/@app-core/http';
import { UploadPhotoService } from 'src/app/@app-core/utils/upload-photo.service';
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
    private postService: PostService,
    private uploadService: UploadPhotoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      console.log('post data', this.posts);
    });
  }
  showAll() {

  }
  like(id) {
    this.postService.addLike(id).subscribe(() => {
    });
    console.log(this.posts[0]);
  }
  showcomment(id) {
    localStorage.setItem('commentsID', id);
    this.router.navigate(['/community/comment']);
  }
  comment(id) {
    this.CommentIDSelected = id;
    console.log(this.CommentIDSelected)
    if (this.clickComment) this.clickComment = false
    else this.clickComment = true;
  }
  sendComment() {
    console.log(this.commentContent);

    this.postService.addComment(this.CommentIDSelected, this.commentContent, this.imageurl).subscribe(() => {
      this.postService.getAllPosts().subscribe(data => {
        this.posts = data.posts;
        console.log(this.posts);
        this.clickComment = false
      });
    })
  }

  replyComment(id) {
    this.postService.repplycomment(this.CommentIDSelected, this.commentContent, this.imageurl, id).subscribe(() => {
      this.postService.getAllPosts().subscribe(data => {
        this.posts = data.posts;
        this.clickComment = false
        console.log(this.posts);
      });
    })
  }

  loadImg() {
    this.imageurl = this.uploadService.uploadPhoto();
  }

}