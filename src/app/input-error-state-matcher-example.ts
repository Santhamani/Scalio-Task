import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from './user-service,';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'input-error-state-matcher-example',
  templateUrl: './input-error-state-matcher-example.html',
  styleUrls: ['./input-error-state-matcher-example.css'],
})
export class InputErrorStateMatcherExample implements OnInit {
  myForm: FormGroup;
  myinput: any;
  userData :PeriodicElement[] = [];
  ELEMENT_DATA: PeriodicElement[] = []

  displayedColumns: string[] = ['id', 'avatar_url', 'login', 'type'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.userData);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  // }

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  matcher = new MyErrorStateMatcher();

  onSubmit(form: FormGroup) {
    this.myinput = form.value.email;
    this.userService.getUser(this.myinput).subscribe((res: any) => {
      this.userData = res.items;
      this.ELEMENT_DATA = this.userData
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.userData)
    this.dataSource.paginator = this.paginator;

    });
    console.log(form);
  }

  // inputChange(event: any) {
  //   this.myinput = event;
  //   console.log(event);
  // }
}
export interface PeriodicElement {
  id: string;
  avatarUrl: string;
  login: string;
  type: string;
}