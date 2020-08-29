<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="max">
            <div class="max-player" v-show="fullScreen">
                <div class="background">
                    <div class="filter-box"></div>
                    <img :src="currentSong.image" alt="" width="100%" height="100%">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <span> &lt; </span>
                    </div>
                    <h1 class="title">{{currentSong.name}}</h1>
                    <h2 class="subtitle">{{currentSong.singer}}</h2>
                </div>
                <div class="middle">
                    <div class="middle-left">
                        <div class="cd-box">
                            <div class="cd" :class="cdRotate">
                                <img class="image" :src="currentSong.image" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="progress-box">
                        <span class="time time-left">{{format(currentTime)}}</span>
                        <div class="progress-bar"></div>
                        <span class="time time-right">{{format(duration)}}</span>
                    </div>
                    <div class="settings">
                        <div class="icon i-left">
                            <i class="iconfont icon-sequence"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="iconfont icon-prev" @click="prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="iconfont" :class="playIcon" @click="togglePlay"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="iconfont icon-next" @click="next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="iconfont icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="min">
            <div class="min-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img :src="currentSong.image" :class="cdRotate" alt="" width="40" height="40">
                </div>
                <div class="text">
                    <h2 class="name">{{currentSong.name}}</h2>
                    <p class="desc">{{currentSong.singer}}</p>
                </div>
                <div class="control" @click.stop = "togglePlay"> <!--这里加 click.stop 是为了让这个点击事件和mini-player那的大点击事件区分开来-->
                    <i class="iconfont" :class="minIcon"></i>
                </div>
                <div class="control">
                    <i class="iconfont icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {getSong} from "../../api/song"
export default {
    data(){
        return {
            url: '',
            currentTime: 0,
            duration: 0
        }
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playlist',
            'currentSong',
            'playing',
            'currentIndex'
        ]),
        playIcon(){
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        minIcon(){
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        cdRotate(){
            return this.playing ? 'play' : 'play pause'
        }
    },
    methods:{
        back(){
            this.setFullScreen(false)
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlaying: 'SET_PLAYING',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
        _getSong(id){
            getSong(id).then((res) => {
                this.url = res.data.data[0].url
            })
        },
        togglePlay(){
            const audio = this.$refs.audio
            this.setPlaying(!this.playing)
            this.playing ? audio.play() : audio.pause()
        },
        open(){
            this.setFullScreen(true)
        },
        prev(){
            let index = this.currentIndex - 1
            if(index == -1){
                index = this.playlist.length - 1
            }
            this.setCurrentIndex(index)
        },
        next(){
            let index = this.currentIndex + 1
            if(index == this.playlist.length){
                index = 0
            }
            this.setCurrentIndex(index)
        },
        updateTime(e){
            this.currentTime = e.target.currentTime     // audio标签里面有currentTime
        },
        format(time){
            time = time | 0
            let minute = time / 60 | 0
            let second = time % 60
            if(second < 10) { second = '0' + second}
            return minute + ':' + second
        }
    },
    watch:{
        currentSong(newValue){
            this._getSong(newValue.id)
        },
        url(newUrl){
            this.$refs.audio.src = newUrl
            this.$refs.audio.play()
            this.setPlaying(true)
            setTimeout(()=>{
                this.duration = this.$refs.audio.duration
            }, 100)
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
    .max-player{
        position fixed
        left 0
        right 0 
        top 0
        bottom 0
        z-index 150
        background $color-background
    }
    .min-player{
        height 60px
        width 100%
        display flex
        align-items center
        position fixed
        left 0
        bottom 0
        z-index 180
        background rgba(255,255,255,0.85)
    }
    .background{
        position absolute
        left -50%
        top -50%
        width 300%
        height 300%
        z-index -1
        opacity 0.6
        filter blur(30px)
    }
    .filter-box{
        position absolute
        width 100%
        height 100%
        background black 
        opacity 0.6
    }
    .top{
        position relative
        margin-bottom 25px
    }
    .back{
        position absolute
        top 0
        left 6px
        z-index 50
        padding 10px
        font-size $font-size-large-x
        color #fff
    }
    .title{
        width 70%
        margin 0 auto
        padding-top 13px
        line-height 20px
        text-align center
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size $font-size-large
        font-weight bold
        color $color-text-l
    }
    .subtitle{
        width 70%
        margin 0 auto
        line-height 20px
        text-align center
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size $font-size-small-x
        color $color-text-l
    }
    .middle{
        display flex
        align-items center
        position fixed
        width 100%
        top 80px
        bottom 170px
    }
    .middle-left{
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-top 80%
    }
    .cd-box{
        position absolute
        left 10%
        top 0
        width 80%
        height 100%
    }
    .cd {
        width 100%
        height 100%
        box-sizing border-box
        border-radius 50%
        border 15px solid rgba(255,255,255,0.1) 
    }
    .play{
        animation: rotate 20s linear infinite 
    }
    .pause{
        animation-play-state: paused
    }
    .image{
        border-radius 50%
        position absolute
        left 0
        top 0
        width 100%
        height 100%
    }
    .bottom{
        position absolute
        bottom 50px
        width 100%
    }
    .progress-box{
        display flex
        align-items center
        width 80%
        margin 0 auto
        padding 10px 0 
    }
    .time{
        color $color-text-l
        font-size $font-size-small
        flex 0 0 30px
        line-height 30px
        width 30px
    }
    .time-left{
        text-align left
    }
    .time-right{
        text-align right
    }
    .progress-bar{
        flex 1
    }
    .settings{
        display flex
        align-items center
    }
    .icon
        flex 1
        color $color-theme-l
        i
            font-size 30px
        &.i-left
            text-align right
        &.i-center
            padding 0 20px
            text-align center
            i 
                font-size 40px
        &.i-right
            text-align left
    .min-player .icon{
        flex 0 0 40px
        width 40px
        padding 0 10px 0 20px
    }
    .min-player .icon img{
        border-radius 50%
    }
    .text{
        display flex
        flex-direction column
        justify-content center
        flex 1
        overflow hidden
    }
    .name{
        margin-bottom 2px
        line-height 14px
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size $font-size-medium
        color $color-text
    }
    .desc{
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size $font-size-small
        color $color-text
    }
    .control 
        flex 0 0 30px
        width 30px
        padding 0 10px
        .iconfont
            position relative
            left -5px
            top -3px
            font-size 30px
    .max-enter-active, .max-leave-active {
        transition 0.4s
    }
    .max-enter,.max-leave-to {
        opacity 0
    }
    .min-enter-active, .min-leave-active {
        transition 0.4s
    }
    .min-enter,.min-leave-to {
        opacity 0
    }

@keyframes rotate 
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>