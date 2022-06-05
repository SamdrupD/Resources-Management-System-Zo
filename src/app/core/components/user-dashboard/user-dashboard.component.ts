import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  drawer = false;
  currentUser: any;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
  this.api.getUser().subscribe( (res: any) => {
       localStorage.setItem('user_id', res.id);
       localStorage.setItem('current user', JSON.stringify(res));
  })
    this.api.getWorkerlists()
      .subscribe((res: any) => {
        res.forEach((res: any) => {
          //DYNAMIC USER
          if (res.id === "jntWRNUzw5tIItzzuafl") {
            this.currentUser = res;
          }
        });
      });
  }

  signOut() {
    this.api.signOut().subscribe();
    localStorage.removeItem('User Role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('current user');
    location.href = "";
  }

}
