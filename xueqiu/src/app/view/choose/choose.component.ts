import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.less']
})
export class ChooseComponent implements OnInit {

  industriesList = [];
  areaList = [];
  areas = {};

  constructor(public newSer:NewsService) { }

  async ngOnInit() {
    let resutlt = await this.newSer.getIndustries();
    this.industriesList = resutlt.data.industries;

    let resultArea = await this.newSer.getAreas();
    
    this.areas = resultArea.data.areas;
    //console.log(this.areas);
    this.areaList = Object.keys(this.areas);
    //console.log(this.areaList);

    let resultTools = this.newSer.getTools();
    let resultStocks = this.newSer.getCstock({
          order_by:'follow',
          page:1,
          order:'desc'
        });

  }

}
