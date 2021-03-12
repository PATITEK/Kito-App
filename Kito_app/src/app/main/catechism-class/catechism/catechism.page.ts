import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonSlides } from '@ionic/angular';
import { CourseService } from 'src/app/@app-core/http/course';
import { IPageCourse } from 'src/app/@app-core/http/course/course.DTO';

@Component({
  selector: 'app-catechism',
  templateUrl: './catechism.page.html',
  styleUrls: ['./catechism.page.scss'],
})
export class CatechismPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;

  headerCustom = {title: 'Giáo lý Hồng Ân'};
  menuItems;
  currentMenuItemId
  listClass;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };
  public pageResult: IPageCourse = {
    page: 1,
    per_page: 10,
    total_objects: 0,
    course_group_id:''
  };
  constructor(
    private coursesService: CourseService

  ) { }

  ngOnInit() {
    
    this.getData();
    
    
  }
  // ionViewWillEnter(){
    
  //   this.pageResult.course_group_id = this.currentMenuItemId;
  //   this.getClass();
  //   // console.log(this.listClass);
    
  //   // this.foramatTime(this.listClass[0]);
   
  // }
  ngOnChanges()
  {
    this.currentMenuItemId = this.menuItems[0]?.id || 1;

  }
  getClass(){
    this.coursesService.getAll(this.pageResult).subscribe((data) => {
      this.listClass = data.courses;

    })
  }
  getData(){
    
    this.coursesService.getGroup().subscribe((data:any)=>{
      this.menuItems = data.course_groups;
      this.currentMenuItemId=this.menuItems[0].id;
      this.pageResult.course_group_id = this.currentMenuItemId;
      this.getClass();
    })
    

    
  }
  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(id) {
    
    
    this.slides.lockSwipes(false).then(() => {
      this.slides.slideTo(id).then(() => {
        this.changeSlide(id);
        this.slides.lockSwipes(true);
       this.getClass();
      });
    })
  }

  changeSlide(id) {
    this.currentMenuItemId = id;
    this.pageResult.course_group_id = this.currentMenuItemId;

  }

  disableSwipe() {
    this.slides.lockSwipes(true);
  }
  foramatTime(date){
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours +'h'+ ':' + minutes
    return strTime
    
  }
}
