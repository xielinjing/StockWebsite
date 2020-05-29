import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dayinfo',
  templateUrl: './dayinfo.component.html',
  styleUrls: ['./dayinfo.component.less']
})
export class DayinfoComponent implements OnInit {
  newsList = [];
  currentTime = new Date();

  constructor(public route:ActivatedRoute, public newsSer:NewsService) { }

  ngOnInit() {
    this.newsSer.getNews(6).then((res)=>{
      console.log(res)
      res.list.forEach((item, index)=>{
        item.data = JSON.parse(item.data);
      })
      this.newsList = res.list
    })
  }

}
