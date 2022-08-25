import { Component, OnInit } from '@angular/core';
import { AppService } from '../../_services/app.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private appservice : AppService,
  ) { }

  ngOnInit(): void {
    var url = '/api/users';
    this.appservice.getMethod(url)
    .subscribe((data) => {
        console.warn("data",data);
    });
  }

}
