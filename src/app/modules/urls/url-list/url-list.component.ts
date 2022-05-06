import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Urls, Url } from '../url';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.scss']
})
export class UrlListComponent implements AfterViewInit {
  public urls: Urls | undefined;
  public loading = true;
  public timeOut: any;
  public seconds = 60;
  public countTime = this.seconds;

  displayedColumns: string[] = ['id', 'description', 'action'];
  dataSource = new MatTableDataSource<Url>([]);

  constructor(private urlService: UrlService, private route: Router) {
    this.timeOut = setInterval(() => {
      this.countTime--;
      if(this.countTime <= 0){
        this.countTime = this.seconds;
        this.get();
      }
    }, 1000);

  }

  ngOnInit() {
    this.get();
  }
  ngAfterViewInit() {
  }

  get() {
    this.urlService.list().subscribe((response: any) => {
      this.urls = response.data ?? response;
      this.dataSource = new MatTableDataSource(this.urls);
      this.loading = false;
    });
  }

  create() {
    this.route.navigate(['/urls/create']);
  }
}



