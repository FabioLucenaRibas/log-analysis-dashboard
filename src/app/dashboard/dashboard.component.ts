import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogObject } from '../model/LogObject.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  logs: LogObject[] = [];

  constructor(
    private router: Router,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras?.state?.['data'];
  }

  ngOnInit(): void {
    this.carregarLogs();
  }

  carregarLogs(){
    this.logs = this.data.logs
  }

}
