import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.less']
})
export class SimpleListComponent implements OnInit {

  constructor() { }

  plugins = [
    { image: 'assets\\imgs\\digital.png', title: '滚动数字', desc: '滚动的数字，用于展示', ava: 'https://avatars.githubusercontent.com/u/62476270?s=60&v=4' }
  ];

  ngOnInit(): void {
  }
}
