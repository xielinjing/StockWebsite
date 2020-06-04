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
  tabList=[];
  toolsObj = {'基本指标':[]};
  currentTab = '基本指标';
  sxList=[];
  exchange = 'sh_sz';
  areacode = "";
  incode = "";
  sxStockList=[];

  constructor(public newSer:NewsService) { }

  async ngOnInit() {
    this.getHy();
    this.getArea();
    this.getTools();
    this.getStocks();
  }
  
  //获取行业
  async getHy(){
    let resutlt = await this.newSer.getIndustries();
    this.industriesList = resutlt.data.industries;
  }

  //获取地区
  async getArea(){
    let resultArea = await this.newSer.getAreas();
    
    this.areas = resultArea.data.areas;
    //console.log(this.areas);
    this.areaList = Object.keys(this.areas);
    //console.log(this.areaList);
  }

  //获取工具
  async getTools(){
    let resultTools = await this.newSer.getTools();
    
    this.toolsObj = resultTools;
    this.tabList = Object.keys(resultTools);

    this.currentTab = this.tabList[0];
  }

  //获取股票
  async getStocks(){
    let resultStocks = this.newSer.getCstock({
      order_by:'follow',
      page:1,
      order:'desc'
    });
  }

  toggleTabs(key){
    this.currentTab = key;
  }

  async checkEvent(item){
    let isContinuous = true;

    this.sxList.forEach((sxObj, index)=>{
      if (sxObj.field == item.field){
        this.sxList.splice(index,1);
        isContinuous=false;
      }

    })

    if(!isContinuous){
      return;
    }

    if(item.adj !== 0 ){
      item.field = item.field+'.20191231'
    }
    let result = await this.newSer.getFieldRange(item.field);
    item.min = result.data.min;
    item.max = result.data.max;
    item.cmin = result.data.min;
    item.cmax = result.data.max;
    this.sxList.push(item);
  }


  async getSg(){
    let options = {
      category: "CN",
      exchange: this.exchange,
      areacode: this.areacode,
      indcode: this.incode,
      order_by: "symbol",
      order: "desc",
      page: 1,
      size: 30,
      only_count: 0,
      current: "",
      pct: "",
      // pettm: -285527.37_19843.11
      _: new Date().getTime()
    }

    this.sxList.forEach((item, index)=>{
      if(parseFloat(item.cmax) > parseFloat(item.cmin)){
        options[item.field] = item.cmin + "_" + item.cmax;
      }else{
        options[item.field] = item.cmax + "_" + item.cmin;
      }
    })

    let result = await this.newSer.getSxStock(options)

    this.sxStockList = result.data.list;
    console.log(this.sxStockList)
  }

}
