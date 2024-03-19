import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signUp = true;

  constructor() { }

  ngOnInit(): void {
  }

  trocarClasse() {
    this.signUp = !this.signUp;
  }
}
