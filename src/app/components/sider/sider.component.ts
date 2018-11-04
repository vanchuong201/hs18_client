import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SiderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto(path: string) {
    this.router.navigate([path]);
  }

}
