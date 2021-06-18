import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  headerCustom = { title: 'Cộng đồng giáo dân' }
  
  post ={
    source: "OMAE CỐ TÌNH CHỬI WATASHI DESU KA? TỪ TANJOUBI ĐẾN KONNICHI, WATASHI ĐÃ ĐƯỢC OSOWARU NÊN HITO, WATASHI KHÔNG BAO GIỜ XÚC PHẠM DARE CẢ, OMAE LÀM VẬY LÀ TONDEMONAI DAYO.TUY WATASHI CÓ HƠI WIBU SUKOSHI, DEMO WATASHI LUÔN ĐẶT NIỀM TIN VÀO ANIME VÀ SỐNG ĐÚNG KIỂU TRONG ANIME, ANIME LÀ 1 THỨ GÌ ĐÓ CAO CẢ HƠN CẢ GENJITSU, WATASHI ĐÃ LÀM THEO VÀ HỌC TẬP THEO TỪ ANIME, WATASHI ĐÃ ĂN UỐNG NGỦ NGHĨ THEO ĐÚNG GIỜ CỦA ANIME MÀ KHÔNG LÀM PHIỀN DARE, ĐÔI LÚC WATASHI CÓ CHỬI VÀO OMAE NO KAO NHƯ INU, DEMO SAU ĐÓ BLOCK NÓ THÌ WATASHI KHÔNG LÀM VIỆC ĐÓ NỮA, MAIKAI MAIKAI WATASHI MUỐN CHỬI DARE WATASHI ĐỀU COI ANIME VÀ GHI NHỚ RẰNG KHÔNG NÊN CHỬI NGƯỜI ĐÓ NỮA !! WATASHI ĐÃ CỐ GẮNG HIỀN HẬU ĐẾN MỨC MUỐN THÀNH HOTOKE RỒI MÀ KARERA VẪN KHÔNG ĐỂ WATASHI YÊN LÀ SAO, YABAI WATASHI KHÔNG NÊN GHI RA NHỮNG TỪ NÀY DEMO THẰNG YAROU SÚC VẬT NÓ LÔI WATASHI NO NA RA ĐỂ CHỬI, THỨ AHO SHUKU SEIBUTSUGAKU KAGAKU BUNGAKU, VẬY LÀ ĐỦ, ĐỪNG ĐỂ WATASHI TRIGGERED VÀ WATASHI DẠY OMAE CÁCH ĐỂ HỌC TẬP VÀ LÀM THEO TẤM GƯƠNG CỦA ANIME NỮA!, THẾ NHÉ INU WA KUSO O TABERU",
    contentShort: "",
    showfullcontent: false,
    content: "",
    islike: false,
    likecount: 589,
    commentcount: 128,
    
    comments: [
      {
        avatar: "../../assets/testonly/avt1.jpg",
        username: "ngồi trong toa lét, gào thét tên em",
        content: "j wibu toxic??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt1.jpg",
        username: "wibu hạng 3",
        content: "ưatáhi no??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt1.jpg",
        username: "ngồi trong toa lét, gào thét tên em",
        content: "j wibu toxic??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt1.jpg",
        username: "wibu hạng 3",
        content: "ưatáhi no??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      }
    ],
    commentshort:[
      {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
      },
    {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
    },
    {
        avatar: "../../assets/testonly/avt2.jpg",
        username: "K0ng trúa's p0ng p0'nk",
        content: "j wibu trigger??",
        time: "10 phút trước",
    }
  ],
  showfullcomment: false
  }
  
  
  
  showfullcontenttext = "Xem thêm..."
  constructor() { }
  
  ngOnInit() {
    if(this.post.source.length > 300){
      this.post.contentShort = this.post.source.substring(0, 300) + "...";
      this.post.content = this.post.contentShort
    }
  }
  showAll(){
    if(this.post.showfullcontent) {
      this.post.content = this.post.source
      this.post.showfullcontent = false
      this.showfullcontenttext = "Thu gọn"
    }
    else {
      this.post.content = this.post.contentShort
      this.post.showfullcontent = true
      this.showfullcontenttext = "Xem thêm..."
    }
  }
  like(){
    if(this.post.islike){
      this.post.islike = false;
    }
    else this.post.islike = true;
  }
  showcomment(){
    // if(showfullcontent){
    //   for (let index = 0; index < 3; index++) {
    //     this.post.commentshort[index] = this.post.comments[index]
    //   }
    // }
  }
}
