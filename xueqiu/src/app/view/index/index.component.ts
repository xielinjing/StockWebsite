import { Component, OnInit } from '@angular/core';
import axios from 'axios'; 
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  quoteList = [];
  zhishuListPosition = {transform:'translate(0px)'};
  // zhishuListPosition = 'translate(0px)';
  tabIndex = 0;

  constructor(public router:Router, public route:ActivatedRoute) {
    this.getData();
   }

  ngOnInit() {
  }

  //最新的异步请求采取的方式，解决回调问题
  async getData(){
    let httpURL = 'http://localhost:8080/api/index/quote'
    let reuslt = await axios.get(httpURL);
    console.log(reuslt.data);
    this.quoteList = reuslt.data.data.items;
  }

  toggleZhishu(index){
    console.log(123);
    this.zhishuListPosition = {transform:`translate(-${index*640}px)`}
    // this.zhishuListPosition = `translate(-${index*640}px)`;
    console.log(this.zhishuListPosition)
  }

  tabEvent(index){
    let pathList = ['recommendation', 'dayinfo', 'hushen', 'innovation'];
    this.tabIndex = index;
    this.router.navigate(['',pathList[index]],{
      queryParams:{
        key:pathList[index]
      }
    })
  }

}
