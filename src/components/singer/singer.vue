<template>
    <div class="singer">
        <app-singer-list :data="singerList">

        </app-singer-list>
    </div>
</template>
<script>
import {getSingerList} from "../../api/singer"
import Singer from "../../common/js/singer"
import SingerList from "../../base/singer-list/singer-list"
const HOT_NAME = "hot"
const HOT_NAME_LENGTH = 10
export default {
    name: "singer",
    data(){
        return {
            singerList: []
        }
    },
    created(){
        this._getSingerList()
    },
    methods:{
        _getSingerList(){
            getSingerList().then((res) => {
                if(res.code == 0){
                    this.singerList = this._singerListSettings(res.data.list)
                    //console.log(this.singerList)
                }
            })
        },
        _singerListSettings(list){
            let page = {
                hot:{
                    title: HOT_NAME,
                    lists: []
                }
            }
            list.forEach((item,index) => {
                if (index < HOT_NAME_LENGTH){
                    page.hot.lists.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }))
                }
                const key = item.Findex
                if(!page[key]){
                    page[key] = {
                        title: key,
                        lists: []
                    }
                }
                page[key].lists.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                }))
            })
            //console.log(page)
            let hot = []
            let nohot = []
            for(let k in page){
                let value = page[k] 
                if(value.title === HOT_NAME){
                    hot.push(value)
                } else if(value.title.match(/[a-zA-Z]/)){
                nohot.push(value)
                }
            }
            nohot.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0) // a > b 的时候true, a < b 的时候false 然后排序
            })
            return hot.concat(nohot)
        }
    },
    components:{
        'app-singer-list' : SingerList
    }
}
</script>
<style lang="stylus">
    .singer{
        position fixed
        top 88px
        bottom 0
        width 100%
    }
</style>

