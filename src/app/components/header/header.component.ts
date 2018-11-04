import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  user: any = {
    id: '',
    avatar: 'U',
    name: 'Vu Duc Dung'
  }

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getUserProfile().subscribe(({ id, name }) => {
      this.user = {
        id,
        avatar: 'U',
        name
      };
    });
  }

  search(q: string) {
    console.log('search');
  }

}
