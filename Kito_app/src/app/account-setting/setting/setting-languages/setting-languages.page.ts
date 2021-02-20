import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-languages',
  templateUrl: './setting-languages.page.html',
  styleUrls: ['./setting-languages.page.scss'],
})
export class SettingLanguagesPage implements OnInit {
  title = 'Ngôn ngữ';
  public checkeds = 0;
  public limit = 1;
  public podecheck = true;
  constructor() { }

  ngOnInit() {
  }

  check(language) {
    if (!language.isChecked){
      this.checkeds++;
      console.log(language.val);
      localStorage.setItem('language', language.val);
    } else {
      this.checkeds--;
      // console.log(this.checkeds);
    }
  }

  languages = [
    { val: 'Tiếng Việt', isChecked: false },
    { val: 'English', isChecked: false },
    { val: 'עִברִית', isChecked: false },
    { val: '中國人', isChecked: false},
  ];

}
