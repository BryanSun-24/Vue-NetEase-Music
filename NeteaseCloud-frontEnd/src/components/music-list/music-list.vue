<template>
    <div class="music-list">
        <div class="back" @click="back">
            <span class="iconback"> &lt; </span>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
        <app-scroll class="list" ref="list">
            <div class="song-list-wrapper">
                <app-song-list @select = "selectItem" :songs="songs"></app-song-list>
            </div>
            <div class="loading-container" v-show="!songs.length">
                <app-loading></app-loading>
            </div>
        </app-scroll>
    </div>    
</template>

<script>
import SongList from "../../base/song-list/song-list"
import Scroll from "../../base/scroll/scroll"
import loading from "../../base/loading/loading"
import {mapActions} from 'vuex'
export default {
    props:{
        title: {
            type: String,
            default: ''
        },
        bgImage: {
            type: String,
            default: ''
        },
        songs:{
            type: Array,
            default: []
        }
    },
    methods:{
        back(){
            this.$router.back() // go back to last level
        },
        selectItem(item,index){
            this.clickPlay({
                list: this.songs,
                index: index
            })
        },
        ...mapActions([
            'clickPlay'
        ])
    },
    computed:{
        bgStyle(){
            return `background-image:url(${this.bgImage})`
        }
    },
    components:{
        'app-song-list': SongList,
        'app-scroll': Scroll,
        'app-loading': loading
    },
    mounted(){
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .music-list{
        position fixed
        z-index 100
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
    }
    .back{
        position absolute
        top 0
        left 6px
        z-index 50
    }
    .iconback{
        display block
        padding 10px
        font-size: $font-size-large-x
        color #fff
    }
    .title{
        position absolute
        top 2px
        left 10%
        z-index 40
        width 80%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        text-align center
        line-height 40px
        font-size $font-size-large
        color #fff
    }
    .bg-image{   
        position relative
        width 100%
        height 0
        padding-top 70%
        background-size cover
        transform-origin top
    }
    .list{
        position fixed
        top 0
        bottom 0
        width 100%
        background $color-background
        overflow hidden
    }
    .song-list-wrapper{
        padding 20px 30px
    }
    .loading-container{
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
    }
</style>