<template>
    <transition>
        <div class="rank">
            <app-scroll class="topList">
                <div>
                    <ul>
                        <li v-for="item of rankList" :key="item.id" class="item" @click="selectItem(item)">
                            <div class="icon">
                                <img :src="item.coverImgUrl" alt="" width="100" height="100">
                            </div>
                            <ul class="song-list">
                                <li class="song" v-for="(song,index) of item.rank" :key="index">
                                    <span>{{index+1}}</span>
                                    <span>{{song.name}} - {{song.ar[0].name}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <router-view></router-view>
                </div>
            </app-scroll>
        </div>
    </transition>
</template>

<script>
import {getRank} from "../../api/rank"
import {ERR_OK} from "../../common/js/config"
import scroll from "../../base/scroll/scroll.vue"
import {mapMutations} from 'vuex'

const RANK_NUMBER = [0,1,2,3,4,22,23]
export default {
    name: "rank",
    data(){
        return{
            rankList: []
        }
    },
    created: function(){
        this._getRank()
    },
    methods:{
        _getRank(){
            for( let i = 0;i < RANK_NUMBER.length; i++){
                getRank(RANK_NUMBER[i]).then((res) => {
                    let list = res.data.playlist
                    this.rankList.push(list)
                    list.rank = res.data.playlist.tracks.slice(0,3)
                })
            }
        },
        ...mapMutations({
            setRank: 'SET_RANK'
        }),
        selectItem(item){
            this.$router.push({
                path: `/rank/${item.id}`
            })
            this.setRank(item)
        }
    },
    components:{
        'app-scroll': scroll
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .v-enter-active, .v-leave-active {
        transition  all 0.2s
    }
    .v-enter,.v-leave-to {
        transform translate3d(50%, 0,0)
        opacity 0
    }
    .rank{
        position fixed
        top 88px
        bottom 0
        width 100%
    }
    .topList{
        height 100%
        padding-top 5px
        overflow hidden
    }
    .item{
        display flex
        margin 0 10px
        padding 3px 0
        border-bottom 1px solid #e4e4e4
    }
    .icon{
        flex 0 0 100px
        height 100%
        width 100%
    }
    .song-list{
        flex 1
        display flex
        flex-direction column
        flex-content center
        padding 0 20px
        height 100px
        color $color-text
        font-size $font-size-small-x
    }
    .song{
        line-height 30px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
    }
</style>