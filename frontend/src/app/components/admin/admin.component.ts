import { AdminService } from './../../Services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  test

  constructor(
    private admin: AdminService
  ) { }

  ngOnInit(): void {
    this.admin.testAdmin().subscribe(
      data => console.log('DDDDDD', data)
    )
  }

}
