import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Url } from '../url';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-url-details',
  templateUrl: './url-details.component.html',
  styleUrls: ['./url-details.component.scss']
})
export class UrlDetailsComponent implements OnInit {
  public uuid: any;
  public url: Url | undefined;

  public timeOut: any;
  public seconds = 60;
  public countTime = this.seconds;
  constructor(private activatedRoute: ActivatedRoute, private urlService: UrlService) {
    this.timeOut = setInterval(() => {
      this.countTime--;
      if(this.countTime <= 0){
        this.countTime = this.seconds;
        this.get();
      }
    }, 1100);
  }

  ngOnInit(): void {

    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    this.get();
  }

  get(){
    this.urlService.getByUuid(this.uuid).subscribe((response: Url) => {
      this.url = response;
    });
  }

}
