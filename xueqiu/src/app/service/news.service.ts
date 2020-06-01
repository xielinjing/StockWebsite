import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  host = 'http://localhost:8080'
  constructor() { }

  async getNews(category){
    let httpUrl = this.host + `/api/index/news?category=${category}`;
    let result = await axios.get(httpUrl);
    return result.data;
  }

  //获取行业
  async getIndustries(){
    let httpUrl = this.host + '/api/choose/industries';
    let result = await axios.get(httpUrl);

    return result.data;
  }

  //获取地区
  async getAreas(){
    let httpUrl = this.host + '/api/choose/areas';
    let result = await axios.get(httpUrl);

    return result.data;
  }

  //获取条件股票
  async getCstock(options){
    let httpUrl = this.host + '/api/choose/stocks';
    // let result = await axios.get(httpUrl,{
    //   params:{
    //     order_by:'follow',
    //     page:1,
    //     order:'desc'
    //   }
    // });
    let result = await axios.get(httpUrl, {params: options});

    return result.data;
  }

  //获取筛选工具内容
  async getTools(){
    let httpUrl = this.host + '/api/choose/tools';
    let result = await axios.get(httpUrl);

    return result.data;
  }
}
