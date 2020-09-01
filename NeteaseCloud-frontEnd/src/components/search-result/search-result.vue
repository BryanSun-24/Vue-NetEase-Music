<template>
    <app-scroll :data="result" class="search-result"
    :pullup = "pullup" @scrollToEnd = "searchMore">
        <ul class="search-list">
            <li v-for="(item,index) of result" class="search-item" @click="selectItem(item, index)">
                <div class="icon">
                    <i class="icon-music"></i>
                </div>
                <div class="name">
                    <p class="song">{{item.songname}}</p>
                    <div class="singer">{{item.singer[0].name}}</div>
                </div>
            </li>
            <app-loading v-show="hasMore"></app-loading>
        </ul>
    </app-scroll>
</template>

<script>
import {mapActions} from 'vuex'
import {getSearchResult} from '../../api/search'
import Scroll from "../../base/scroll/scroll"
import Loading from "../../base/loading/loading"
const perpage = 30

export default {
    data(){
        return {
            page: 1,
            result: [],
            pullup:true,
            hasMore: true
        }
    },
    props:{
        query:{
            type: String,
            default: ''
        },
        showSinger:{
            type: Boolean,
            default: true
        }
    },
    methods:{
        _getSearchResult(){
            getSearchResult(this.query, this.page, this.showSinger, perpage).then((res) => {
                if(res.code === 0){
                    this.result = this._searchSetting(res.data)
                    console.log("rersadawd")
                    console.log(this.result)
                    this._checkResult(res.data)
                }
            })
        },
        _searchSetting(data){
            let ret = []
            if(data.song){
                ret = ret.concat(data.song.list)
            }
            return ret
        },
        searchMore(){
            if(!this.hasMore){ return }
            this.page ++ //搜索下一页的数据
            getSearchResult(this.query, this.page, this.showSinger, perpage).then((res) => {
                if(res.code === 0){
                    this.result = this.result.concat(this._searchSetting(res.data))
                    this._checkResult(res.data)
                }
            })
        },
        _checkResult(data){
            const song = data.song
            if(!song.list.length){
                this.hasMore = false
            }
        },
         ...mapActions([
            'clickPlay'
        ]),
        selectItem(item, index){
            this.clickPlay({
                list: this.result,
                index: index
            })
        }
    }, 
    watch:{
        query(){
            this._getSearchResult()
        }
    },
    components:{
        'app-scroll':Scroll,
        'app-loading': Loading
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
    .search-result{
        height 100%
        overflow hidden
    }
    .search-list{
        padding-bottom 30px
    }
    .search-item{
        display flex
        align-items center
        padding 3px 20px
        height 50px
        border-bottom 1px solid rgb(228,228,228)
    }
    .icon {
        flex: 0 0 30px
        width 30px
    }
    .icon-music{
        font-size 14px
        color $color-text-d
    }
    .name{
        flex 1
        font-size $font-size-medium
        color $color-text-d
        overflow hidden
    }
    .song{
        font-size $font-size-media-x
        color $color-text
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        padding-bottom 5px
    }
    .singer{
        font-size 12px
        color $color-text-g
    }
</style>