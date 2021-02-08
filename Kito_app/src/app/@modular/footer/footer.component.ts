import { Component,  ElementRef,  OnInit, Renderer2,  } from '@angular/core';
import { Gesture, GestureConfig, GestureController } from '@ionic/angular';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private gestureCtrl: GestureController,
    public element: ElementRef,
    public renderer: Renderer2
  ){}
    
    
  async ngOnInit() {

    const options: GestureConfig = {
      el: this.element.nativeElement,
      direction: "y",
      gestureName: "swipe-drawer",
      onStart: () => {
        // do something as the gesture begins
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "none"
        );
      },
      onMove: (ev) => {
        // do something in response to movement
        
        if (ev.deltaY < 0 && ev.deltaY> 80) {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(${ev.deltaY}px)`
          );
          document.querySelector<HTMLElement>('.footer-main').style.height="90px";
        }
      },
      onEnd: (ev) => {
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "0.5s linear"
        );
        if (ev.deltaY < -40) {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(-50px)`,
           
            
          );
          document.querySelector<HTMLElement>('.footer-main').style.height="70px";
          document.querySelector<HTMLElement>('.footer-main').style.transform="translateY(20px)";
          document.querySelector<HTMLElement>('.menu-bottom').style.opacity="1";
         
          
        } else {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(0px)`
          );
          document.querySelector<HTMLElement>('.footer-main').style.height="50px";
          document.querySelector<HTMLElement>('.footer-main').style.transform="translateY(-12px)";
          document.querySelector<HTMLElement>('.menu-bottom').style.opacity="0";
          
        }
      },
    };

    const gesture: Gesture = await this.gestureCtrl.create(options);

    gesture.enable();
  }
  // ngOnInit() {
    
  // }
  swipeUp(event: any): any {
    console.log('Swipe Up', event);
}

}
