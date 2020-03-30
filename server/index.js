//import express and axios
let express = require('express');
let axios = require('axios');

//instance express
let app = express();

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
    'Cookie': 'xq_a_token=2ee68b782d6ac072e2a24d81406dd950aacaebe3; xqat=2ee68b782d6ac072e2a24d81406dd950aacaebe3; xq_r_token=f9a2c4e43ce1340d624c8b28e3634941c48f1052; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTU4NzUyMjY2MSwiY3RtIjoxNTg1NTE5MDk5OTg2LCJjaWQiOiJkOWQwbjRBWnVwIn0.bZv0zax2RUSConMKvor6jm7v4GLSq_GhOrCh8dZFsdSjtra5TsTxFTthCy7yHoBZF8_daq6CBs30GiU-KHJE72SHsS-S9xmW_XEbmPMqjCVUDO04R11PkIuVQW3O9iLEGQEc9a6H4OP6hUOQUSlvatUF4hvK2tmpsiyOo-XjD2kdpAv08_1GwtWWQdqc9FxYcJMCaZqzVEF2JbBvxJkzSOh5x6qXzbRQYi_sZo0XPqSr8Hx-BuBV6I0vF4vjCh8Qgv_kKW4-rgDFWt6Br7PIDKeFM05PqOVrAT5Khfd7z50fOdc2cufwVu6DPeEPwlCumkrXEruPJDeC6scjIG5YrQ; u=551585519146390; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1585519149; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1585519149'},
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
    'Cookie': 'xq_a_token=2ee68b782d6ac072e2a24d81406dd950aacaebe3; xqat=2ee68b782d6ac072e2a24d81406dd950aacaebe3; xq_r_token=f9a2c4e43ce1340d624c8b28e3634941c48f1052; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTU4NzUyMjY2MSwiY3RtIjoxNTg1NTE5MDk5OTg2LCJjaWQiOiJkOWQwbjRBWnVwIn0.bZv0zax2RUSConMKvor6jm7v4GLSq_GhOrCh8dZFsdSjtra5TsTxFTthCy7yHoBZF8_daq6CBs30GiU-KHJE72SHsS-S9xmW_XEbmPMqjCVUDO04R11PkIuVQW3O9iLEGQEc9a6H4OP6hUOQUSlvatUF4hvK2tmpsiyOo-XjD2kdpAv08_1GwtWWQdqc9FxYcJMCaZqzVEF2JbBvxJkzSOh5x6qXzbRQYi_sZo0XPqSr8Hx-BuBV6I0vF4vjCh8Qgv_kKW4-rgDFWt6Br7PIDKeFM05PqOVrAT5Khfd7z50fOdc2cufwVu6DPeEPwlCumkrXEruPJDeC6scjIG5YrQ; u=551585519146390; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1585519149; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1585519149'},
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

//listen to the port
app.listen(8080, ()=>{
    console.log('server start:', 'http://localhost:8080')
})