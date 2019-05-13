import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
user = {name:'',surname:'',email:''};
  constructor() {  this.user = JSON.parse(localStorage.getItem('user'));
  console.log(this.user)}
this
  ngOnInit() {
   
  }

}
