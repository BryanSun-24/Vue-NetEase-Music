<template>
    <div class="search">
        <div class="search-wrapper">
            <div class="back-btn">
                <i class="back" @click="back"> &lt; </i>
            </div>
            <app-search-box @query="queryChange" ref="searchBox"></app-search-box>
        </div>
        <div class="hot-wrapper" v-show="!query">
            <div class="hot-box">
                <div class="hot-key">
                    <h1 class="title">Hot Search</h1>
                    <ul>
                        <li v-for="item of hotKey" :key="item.n" class="item" @click="addQuery(item.k)">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query">
            <app-search-result :query="query"></app-search-result>
        </div>
    </div>
</template>

<script>
import SearchBox from "../../base/search-box/search-box"
import {getHotKey} from "../../api/search"
import SearchResult from "../../components/search-result/search-result"
export default {
    data(){
        return {
            hotKey: [],
            query: ''
        }
    },
    created(){
        this._getHotKey()
    },
    methods:{
        back(){
            this.$router.back()
        },
        _getHotKey(){
            getHotKey().then((res) => {
                if(res.code == 0){
                    this.hotKey = res.data.hotkey.slice(0,10)
                    console.log(this.hotKey)
                }
            })
        },
        queryChange(query){
            this.query = query
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        }
    },
    components:{
        'app-search-box': SearchBox,
        'app-search-result': SearchResult
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .search{
        position fixed
        z-index 100
        top 0
        bottom 0
        width 100%
        background $color-background
    }
    .search-wrapper{
        padding 10px 40px
        background $color-theme
    }
    .back-btn{
        position absolute
        top 3px
        left 6px
        z-index 50
    }
    .back{
        display block
        padding 9px
        font-size $font-size-large-x
        color #fff
    }
    .hot-wrapper{
        position relative
        margin 0 auto
    }
    .hot-box{
        height 100%
        overflow hidden
    }
    .hot-key{
        margin 0 20px 20px 20px
    }
    .title{
        margin 20px 0
        font-size $font-size-medium
        color $color-text
    }
    .item{
        padding 5px 10px 
        margin 0 20px 10px 0
        border-radius 5px
        border 0.8px solid #c7c7c7
        font-size $font-size-medium
        color $color-text
        display inline-block
    }
    .search-result{
        position fixed
        top 45px
        bottom 0
        width 100%
    }
</style>