//import express and axios
let express = require('express');
let axios = require('axios');

//instance express
let app = express();

//middle ware
app.use((req,res,next)=>{
    res.append('Access-Control-Allow-Origin',"*")
    res.append('Access-Control-Allow-Content-Type',"*")
    next()  //中间件的下一步
})

//request headers
let options = {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    'Host': 'stock.xueqiu.com',
    'Origin': 'https://xueqiu.com',
    'Referer':'https://xueqiu.com/',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    //must have cookie, otherwise error 400
    'Cookie': 'device_id=24700f9f1986800ab4fcc880530dd0ed; xq_a_token=328f8bbf7903261db206d83de7b85c58e4486dda; xqat=328f8bbf7903261db206d83de7b85c58e4486dda; xq_r_token=22ab4927b9acb2a02a4efefe14ccbbc589e007cb; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTU5MTg0Mjc0NiwiY3RtIjoxNTkwNzcyMjUzMjUxLCJjaWQiOiJkOWQwbjRBWnVwIn0.jLh94zg3k1OD06NaINjIsIyo4nYcamNBUMt70MUGJ-KUMWH6lup81M_wqTFKkNDGRuzaaeTMbSa5XMZCC69U26JW3xFtMY9Ij7SP-DZAv8NyEO5mKLgYsM4BzROBs0-pV9pGYAHGMd1kG-tM5S0oHD3eOsum34BQW8lWs7WDu3v-IISbmVwWjLchaJEno_oB2LVgh08sYpAL4W8H6N55FNZ7yN_3ih2yOyijP80B2PsL4-vTCTXTOBJioeUTQ9IEHpaKgtTQEL-vHU528Wn-dkULb--eWhzAr2n7fU_RdclVEb_GLsZ5UCoPwqddHmy8pOIchCb2Ty4X93LwBWv8Kg; u=821590772296247; Hm_lvt_1db88642e346389874251b5a1eded6e3=1588260673,1589559024,1590772301; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1590772301'},
}
let options2 = {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    'Host': 'xueqiu.com',
    'Referer':'https://xueqiu.com/?category=livenews',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    //must have cookie, otherwise error 400
    'Cookie': 'device_id=24700f9f1986800ab4fcc880530dd0ed; xq_a_token=328f8bbf7903261db206d83de7b85c58e4486dda; xqat=328f8bbf7903261db206d83de7b85c58e4486dda; xq_r_token=22ab4927b9acb2a02a4efefe14ccbbc589e007cb; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTU5MTg0Mjc0NiwiY3RtIjoxNTkwNzcyMjUzMjUxLCJjaWQiOiJkOWQwbjRBWnVwIn0.jLh94zg3k1OD06NaINjIsIyo4nYcamNBUMt70MUGJ-KUMWH6lup81M_wqTFKkNDGRuzaaeTMbSa5XMZCC69U26JW3xFtMY9Ij7SP-DZAv8NyEO5mKLgYsM4BzROBs0-pV9pGYAHGMd1kG-tM5S0oHD3eOsum34BQW8lWs7WDu3v-IISbmVwWjLchaJEno_oB2LVgh08sYpAL4W8H6N55FNZ7yN_3ih2yOyijP80B2PsL4-vTCTXTOBJioeUTQ9IEHpaKgtTQEL-vHU528Wn-dkULb--eWhzAr2n7fU_RdclVEb_GLsZ5UCoPwqddHmy8pOIchCb2Ty4X93LwBWv8Kg; u=821590772296247; Hm_lvt_1db88642e346389874251b5a1eded6e3=1588260673,1589559024,1590772301; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1590772301'},
    //new information
    'elastic-apm-traceparent': '00-8d27931c3ebab25140ef1890c017c3a0-5db8435d5173b54e-01',
}

//homepage
app.get('/', (req,res)=>{
    res.send('api server')
})

//指数数据 quote data
app.get('/api/index/quote', async (req, res)=>{
    let httpURL = 'https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX'
    let result = await axios.get(httpURL,options);
    res.json(result.data);
})

//热股榜 hot stock
app.get('/api/index/hotStock', async (req, res)=>{
    //10 - 全球、12 - 沪深、13 - 港股、 11 - 美股
    let index = req.query.index ? req.query.index:12;
    let httpURL = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`
    let result = await axios.get(httpURL,options);
    res.json(result.data);
})

//财经新闻 financial new
app.get('/api/index/news', async (req, res)=>{
    //category: -1 推荐、6 7x24、105 沪深、115 科创板
    let category = req.query.category ? req.query.category:-1;
    let httpURL = `https://xueqiu.com/v4/statuses/public_timeline_by_category.json?since_id=-1&max_id=-1&count=15&category=${category}`
    let result = await axios.get(httpURL,options2);
    res.json(result.data);
})

//股票筛选的数据
app.get('/api/choose/tools', async(req,res)=>{
    //获取首页
    let httpUrl = 'https://xueqiu.com/hq/screener';
    let result = await axios.get(httpUrl);
    //res.send(result.data);
    //设置正则
    let reg = /SNB.data.condition = (.*?);/igs
    //匹配内容
    let content = reg.exec(result.data)[1];
    res.send(content);
})

//获取股票
//关注人数 follow7d（本周新增关注人数） follow
//讨论条数 tweet7d 
//分享交易 deal7d
app.get('/api/choose/stocks', async(req, res)=>{
    let order_by = req.query.order_by?req.query.order_by:'follow7d';
    let page = req.query.page ? req.query.page:1;
    let time = new Date().getTime();
    let order = req.query.order ? req.query.order:'desc';
    let httpUrl = `https://xueqiu.com/service/screener/screen?category=CN&size=10&order=desc&order_by=${order_by}&only_count=0&page=${page}&_=${time}`;
    let result = await axios.get(httpUrl);
    res.json(result.data);
})

app.get('/api/choose/industries', async(req,res)=>{
    let time = new Date().getTime();
    let httpUrl = `https://xueqiu.com/service/screener/industries?category=CN&_=${time}`;
    let result = await axios.get(httpUrl);
    res.json(result.data);
})

app.get('/api/choose/areas', async(req,res)=>{
    let time = new Date().getTime();
    let httpUrl = `https://xueqiu.com/service/screener/areas?_=${time}`;
    let result = await axios.get(httpUrl);
    res.json(result.data);
})

//listen to the port
app.listen(8080, ()=>{
    console.log('server start:', 'http://localhost:8080')
})