import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.less']
})
export class SimpleListComponent implements OnInit {

  constructor(
    private router: Router,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_2811272_e885efmcr68.js'
    });
  }

  plugins = [
    {
      image: 'assets\\imgs\\digital.png', title: '滚动数字', desc: '滚动的数字，用于展示', ava: 'https://avatars.githubusercontent.com/u/62476270?s=60&v=4',
      github: 'https://github.com/JackYumg/ng-digital/tree/main/projects/ng-digital',
      target: 'self',
      route: '/plugins/index/appear/digital',
      npm: 'https://www.npmjs.com/package/ng-digital'
    },
    {
      image: 'assets\\imgs\\markdown.png', title: 'Markdown编辑器', desc: '适用于angular的Markdown编辑器', ava: 'https://avatars.githubusercontent.com/u/62476270?s=60&v=4',
      github: 'https://github.com/JackYumg/ng-digital/tree/main/projects/ng-editor-markdown',
      target: 'self',
      route: '/plugins/index/appear/markdown'
    },
  ];

  ngOnInit(): void {
  }

  gotoPreview(item: any): void {
    if (item.target === 'self') {
      this.router.navigate([item.route]);
    } else {
      window.open(item.route, '__target');
    }
  }
}
