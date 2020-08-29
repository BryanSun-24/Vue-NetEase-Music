import axios from 'axios'

import {HOST} from "../common/js/config"

export function getSong(id){
    const url = HOST + `/song/url?id=${id}`
    return axios.get(url)
}