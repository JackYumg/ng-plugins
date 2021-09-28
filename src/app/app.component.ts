import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  data = 0;
  title = '1212';
  constructor(
    private cdk: ChangeDetectorRef
  ) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.data += Math.random() * 100;
    }, 2000);
  }
}
