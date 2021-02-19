import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-languages',
  templateUrl: './setting-languages.page.html',
  styleUrls: ['./setting-languages.page.scss'],
})
export class SettingLanguagesPage implements OnInit {
  title = 'Ngôn ngữ'
  constructor() { }

  ngOnInit() {
  }

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

}
