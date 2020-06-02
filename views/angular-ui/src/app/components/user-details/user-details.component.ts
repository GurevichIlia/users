import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';
import { GeneralFacade } from './../../general.facade';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails$: Observable<User>;
  constructor(
    private facade: GeneralFacade,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserDetailsById()
  }

  getUserDetailsById() {
    const userId = +this.route.snapshot.paramMap.get('id');

    this.userDetails$ = this.facade.getUserById(userId);
  }

  back() {
    this.router.navigate(['user-list']);
  }
}
