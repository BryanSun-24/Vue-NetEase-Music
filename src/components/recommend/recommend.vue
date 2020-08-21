<template>
    <div class="recommend">
        <app-scroll class="recommend-content">
           <div> <!-- 这个大div就是为了scroll这个tag能运行，因为better-scroll只会对tag下面第一个有作用，所以我们要用一个大的div包裹下面所有内容 -->
                <div class="slider-wrapper">
                    <app-slider></app-slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">Recommend List</h1>
                    <ul>
                        <li class="item" v-for="item of recommendList" :key="item.id">
                            <div class="icon">
                                <img :src="item.picUrl" alt="">
                            </div>
                            <p class="count">
                                <i class="iconfont icon-search"></i>
                                {{Math.floor(item.playCount /10000)}}W
                            </p>
                            <div class="text">
                                <p class="name">{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recommend-music">
                    <h1 class="list-title">Recommend Music</h1>
                    <ul>
                        <li class="item" v-for="item of recommendMusic" :key="item.id">
                            <div class="icon">
                                <img :src="item.song.album.picUrl" alt="">
                            </div>
                            <p class="text">{{item.name}}</p>
                            <p class="singer">{{item.song.artists[0].name}}</p>
                        </li>
                    </ul>
                </div>
           </div>
        </app-scroll>
    </div>    
</template>

<script>
import slider from "../../base/slider/slider.vue"
import {getRecommendList, getRecommendMusic} from "../../api/recommend"
import {ERR_OK} from "../../common/js/config"
import scroll from "../../base/scroll/scroll.vue"
export default {
    data:function(){
        return {
            recommendList: [],
            recommendMusic: []
        }
    },
    components:{
        'app-slider': slider,
        'app-scroll': scroll
    },
    created(){
        this._getRecommendList();
        this._getRecommendMusic();
    },
    methods:{
        _getRecommendList(){
                getRecommendList().then((res) => {
                if(res.status == ERR_OK){
                    this.recommendList = res.data.result
                }
            })
        },
        _getRecommendMusic(){
            getRecommendMusic().then((res) => {
                if(res.status == ERR_OK){
                    this.recommendMusic = res.data.result.splice(1)
                }
            })
        }
    }
}
</script>
<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .recommend {
        position: fixed
        width : 100%
        top: 88px
        bottom : 0
        z-index: 100
    }
    .recommend-content{
        width : 100%
        height : 100%
        overflow : hidden
    }
    .slider-wrapper{
        width : 100%
        margin : 0 auto
        border-radius: 5px
        overflow : hidden
        background-color : $co$color-background
    }
    .recommend-list{
        position : relative
        box-sizing : border-box
        width : 100%
        text-align : center
    }
    .recommend-music{
        margin-top -20px
        width : 100%
        text-align : center
        box-sizing border-box
    }
    .list-title{
        height: 65px
        line-height : 65px
        padding-left : 1.5%
        text-align : left 
        font-size: $font-size-medium
        font-weight: bold
        color : $color-text
    }
    .item{
        display : inline-block
        position : relative
        box-sizing : border-box
        width : 33%
        padding : 0 1%
    }
    .icon{
        position : relative
        display : inline-block
        width : 100%
        margin-bottom : 5px
    }
    img{
        width : 100%
        height : 100%
        border-radius : 3px
    }
    .count{
        position absolute
        top 5px
        font-size $font-size-small-s
        color white
        opacity 0.8
        right 8px
    }
    .text{
        line-height 16px
        text-align left 
        margin-bottom  10px
        font-size $font-size-small
        float left
        overflow hidden
    }
    .singer{
        line-height 16px
        text-align left 
        margin-bottom  10px
        font-size $font-size-small
        white-space nowrap
        color $color-text-g
        overflow hidden
        text-overflow ellipsis
    }
</style>

