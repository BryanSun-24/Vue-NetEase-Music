import jsonp from '../common/js/jsonp'
import {params, options } from "./config"

export function getSingerList(){
    const url = "http://c.y.qq.com/v8/fcg-bin/v8.fcg"
    const data = Object.assign({}, params,{
        g_tk: 1664029744,
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return jsonp(url,data,options)
}
