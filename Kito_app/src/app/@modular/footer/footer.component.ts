import { Component,  ElementRef,  OnInit, Renderer2,  } from '@angular/core';
import { Gesture, GestureConfig, GestureController } from '@ionic/angular';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
 active_footer :boolean=false;
  constructor(
    private gestureCtrl: GestureController,
    public element: ElementRef,
    public renderer: Renderer2
  ){}
  async ngAfterContentInit() {
    const options: GestureConfig = {
      el: this.element.nativeElement,
      direction: "y",
      gestureName: "swipe-drawer",
      onStart: () => {
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "none",
        );
        
      },
      onMove: (ev) => {
        if (ev.deltaY < 0 && ev.deltaY> 80) {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(${ev.deltaY}px)`
          );
          document.querySelector<HTMLElement>('.footer-main').style.height="90px";
          // this.active_footer=true;
        }
      },
      onEnd: (ev) => {
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "0.3s linear"
        );
        if (ev.deltaY < -40) {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(-50px)`,
          );
          this.active_footer=true;
          document.querySelector<HTMLElement>('.footer-main').style.height="70px";
          document.querySelector<HTMLElement>('.footer-main').style.transform="translateY(20px)";
          document.querySelector<HTMLElement>('.menu-bottom').style.opacity="1";
        } else {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(0px)`
          );
          this.active_footer=false;
          document.querySelector<HTMLElement>('.footer-main').style.height="50px";
          document.querySelector<HTMLElement>('.footer-main').style.transform="translateY(-12px)";
          document.querySelector<HTMLElement>('.menu-bottom').style.opacity="0";
        }
      },
    };

    const gesture: Gesture = await this.gestureCtrl.create(options);

    gesture.enable();
  }
  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
 

}
