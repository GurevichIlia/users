import { GeneralFacade } from './../../general.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions$ = new Subject();
  today = new Date();
  constructor(
    private fb: FormBuilder,
    private facade: GeneralFacade,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      gender: ['', Validators.required],
      id: [''],
      last_name: ['', Validators.required],
      location: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postcode: ['', Validators.required],
      }),
      password: ['', Validators.required],
      phone_number: ['', Validators.required],
      title: ['', Validators.required],
      username: ['', Validators.required],
    });
  }


  saveUser() {
    if (this.form.valid) {
      this.facade.addNewUser(this.form.value)
        .pipe(
          takeUntil(this.subscriptions$)
        )
        .subscribe(res => res, err => console.log(err));
    }
  }

  back() {
    this.router.navigate(['user-list']);
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
