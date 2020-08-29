<template>
    <transition>
        <app-music-list :songs="songs" :title="title" :bgImage="bgImage"></app-music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from "../../api/singer"
import {settingSong} from "../../common/js/song"
import musicList from "../music-list/music-list"
export default {
    data(){
        return {
            songs: []
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ]),
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        }
    },
    created(){
        this._getSingerDetail()
    },
    methods:{
        _getSingerDetail(){
            if(!this.singer.id){
                this.$router.push('/singer')
            }
            getSingerDetail(this.singer.id).then((res)=>{
                if(res.status === 200){
                    this.songs = this._singerDetailSettings(res.data.hotSongs)
                    console.log(this.songs)
                }
            })
        },
        _singerDetailSettings(list){
            let result = []
            list.forEach((item) => {
                result.push(settingSong(item))
            });
            return result
        }
    },
    components:{
        'app-music-list' : musicList
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .v-enter-active,v-leave-active {
        transition all 0.3s
    }
    .v-enter,v-leave-to{
        transform translate3d(100%,0,0)
    }
</style>