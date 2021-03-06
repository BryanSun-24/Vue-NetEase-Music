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
                <div class="middle" @click="changeMiddle">
                    <div class="middle-left" v-show="currentShow === 'cd'">
                        <div class="cd-box">
                            <div class="cd" :class="cdRotate">
                                <img class="image" :src="currentSong.image" alt="">
                            </div>
                        </div>
                    </div>
                    <app-scroll class="middle-right" v-show="currentShow === 'lyric'" :data="lyricList.lines" ref="lyricList">
                        <div class="lyric-wrapper">
                            <div class="currentLyric">
                                <p class="text" ref="lyricLine" v-for="(line, index) of lyricList.lines" :class="{'current': currentLineNum === index}">
                                {{line.txt}}
                                </p>
                            </div>
                        </div>
                    </app-scroll>
                </div>
                <div class="bottom">
                    <div class="progress-box">
                        <span class="time time-left">{{format(currentTime)}}</span>
                        <div class="progress-bar">
                            <app-progress-bar :percent="percent" @percentChange="percentChange"></app-progress-bar>
                        </div>
                        <span class="time time-right">{{format(duration)}}</span>
                    </div>
                    <div class="settings">
                        <div class="icon i-left" @click="changeMode">
                            <i class="iconfont" :class="iconMode"></i>
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
                    <app-progress-circle :radius="32" :percent="percent">
                        <i class="iconfont iconMin" :class="minIcon"></i>
                    </app-progress-circle>
                </div>
                <div class="control">
                    <i class="iconfont icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio" @timeupdate="updateTime" @ended="end"></audio>
    </div>
</template>

<script>
import {playMode} from "../../common/js/config"
import ProgressCircle from "../../base/progress-circle/progress-circle"
import progressBar from "../../base/progress-bar/progress-bar"
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {getSong} from "../../api/song"
import {shuffle} from "../../common/js/util"
import {getLyric} from "../../api/song"
import Lyric from 'lyric-parser'
import Scroll from '../../base/scroll/scroll'

export default {
    data(){
        return {
            url: '',
            currentTime: 0,
            duration: 0,
            percent: 0,
            lyricList: '',
            currentLineNum: 0,
            currentShow: 'cd'
        }
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playlist',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ]),
        playIcon(){
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        minIcon(){
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        cdRotate(){
            return this.playing ? 'play' : 'play pause'
        },
        iconMode(){
            if(this.mode === playMode.sequence){
                return 'icon-sequence'
            } else if(this.mode === playMode.loop){
                return 'icon-loop'
            } else {
                return 'icon-random'
            }
        }
    },
    methods:{
        back(){
            this.setFullScreen(false)
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlaying: 'SET_PLAYING',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST'
        }),
        _getLyric(id){
            getLyric(id).then((res) => {
                this.lyricList = new Lyric(res.data.lrc.lyric, this.handleLyric)
                if(this.playing){
                    this.lyricList.play()
                }
                console.log(this.lyricList)
            })
        },
        handleLyric({lineNum, txt}){
            this.currentLineNum = lineNum
            console.log(lineNum)
            if(lineNum > 5){
                let lineTarget = this.$refs.lyricLine[lineNum - 5]
                this.$refs.lyricList.scrollToElement(lineTarget, 1000)
            } else {
                this.$refs.lyricList.scrollTo(0,0,1000)
            }
        },
        changeMiddle(){
            if(this.currentShow === 'cd'){
                this.currentShow = 'lyric'
            } else {
                this.currentShow = 'cd'
            }
        },
        _getSong(id){
            console.log(id)
            getSong(id).then((res) => {
                this.url = res.data.data[0].url
            })
        },
        togglePlay(){
            const audio = this.$refs.audio
            this.setPlaying(!this.playing)
            this.playing ? audio.play() : audio.pause()
            if(this.lyricList){
                this.lyricList.togglePlay()
            }
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
        },
        percentChange(percent){
            const Time = this.duration * percent
            this.$refs.audio.currentTime = Time.toFixed(2)
            if(!this.playing){
                this.togglePlay()
            }
            if(this.lyricList){
                this.lyricList.seek(currentTime * 1000) //当我们拖拽进度条，重制歌词的位置在time * 1000因为动画时间是1000毫秒
            }
        },
        changeMode(){
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if(mode === playMode.random){
                list = shuffle(this.sequenceList)
            } else{
                list = this.sequenceList
            }
            this._currentSetting(list)
            this.setPlaylist(list)
        },
        _currentSetting(list){
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        end(){
            if(this.mode === playMode.loop){
                this.loop()
            } else {
                this.next()
            }
        },
        loop(){
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
            if(this.lyricList){
                this.lyricList.seek() // seek() means reset lyric
            }
        }
    },
    watch:{
        currentSong(newValue){
            this._getSong(newValue.id)
            if(this.lyricList){
                this.lyricList.stop()
            }
        },
        url(newUrl){
            this._getLyric(this.currentSong.id)
            this.$refs.audio.src = newUrl
            this.$refs.audio.play()
            this.setPlaying(true)
            setTimeout(()=>{
                this.duration = this.$refs.audio.duration
            }, 150)
        },
        currentTime(){
            this.percent = this.currentTime / this.duration
        }
    },
    components:{
        'app-progress-bar': progressBar,
        'app-progress-circle': ProgressCircle,
        'app-scroll': Scroll
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
    .middle-right{
        display inline-block
        position absolute
        top 0
        vertical-align top
        width 100%
        height 100%
        overflow hidden
    }
    .lyric-wrapper{
        width 80%
        margin 0 auto
        overflow hidden
        text-align center
    }
    p.text{
        line-height 40px
        color $color-text-ggg
        font-size $font-size-medium
    }
    p.current{
        color #FFFFFF
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
        .iconMin
            font-size 32px
            position absolute
            left 0
            top 0
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