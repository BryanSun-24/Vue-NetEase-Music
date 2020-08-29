<template>
    <transition>
        <app-music-list :songs="songs" :title="title" :bgImage = "bgImage"></app-music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getRecommendDetail} from '../../api/recommend'
import {ERR_OK} from '../../common/js/config'
import MusicList from "../../components/music-list/music-list"
import { settingSong } from '../../common/js/song'
export default {
    data(){
        return {
            songs:[]
        }
    },
    computed:{
        ...mapGetters([
            'recommend'
        ]),
        title(){
            return this.recommend.name
        },
        bgImage(){
            return this.recommend.picUrl
        }
    },
    created(){
        this._getRecommendDetail()
    },
    methods:{
        _getRecommendDetail(){
            if(!this.recommend.id) { this.$router.push('/recommend'); return}
            getRecommendDetail(this.recommend.id).then((res) => {
                if(res.status === ERR_OK){
                    this.songs = this._recommendDetailSetting(res.data.playlist.tracks)
                    console.log(this.songs)
                }
            })
        },
        _recommendDetailSetting(list){
            let result = []
            list.forEach(musicData => {
                result.push(settingSong(musicData))
            });
            return result
        },
        // _formatSong(musicData){
        //     return {
        //         id: musicData.id,
        //         singer: musicData.ar[0].name,
        //         name: musicData.name,
        //         album: musicData.name
        //     }
        // }
    },
    components:{
        'app-music-list': MusicList
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .v-enter-active,.v-leave-active{
        transition all 0.5s
    }
    .v-enter,.v-leave-to{
        transform translate3d(50%,0,0)
        opacity 0
    }

</style>