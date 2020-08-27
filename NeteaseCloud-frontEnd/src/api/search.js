import jsonp from "../common/js/jsonp"
import {params, options} from "../api/config"
import axios from 'axios'

export function getHotKey(){
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
	
	const data = Object.assign({},params,{
		notice: 0,
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
		uin: 0
	})
	return jsonp(url,data,options)
}


export function getSearchResult(query,page,zhida,perpage){ //因为不能直接通过这个url获取数据，所以我们在build/webpack.dev.config里 手动设置了一下(before)，凡是遇到api/search， 我们就会借用qq的端口，
	const url = '/api/search'
	
	const data = Object.assign({},params,{
		uin: 0,
		format: 'json',
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
		w: query,
		zhidaqu: 1,
		catZhida: zhida? 1 : 0,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage: perpage,
		n: perpage,
		p: page,
		remoteplace: 'txt.mqq.all',
	})
	return axios.get(url,{
		params: data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}