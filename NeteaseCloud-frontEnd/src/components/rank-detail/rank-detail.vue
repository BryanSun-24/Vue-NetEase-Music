<template>
    <transition>
        <app-music-list :songs="songs" :title="title" :bgImage = "bgImage"></app-music-list>
    </transition>
</template>

<script>
import {mapGettters, mapMutations, mapGetters} from 'vuex'
import MusicList from "../../components/music-list/music-list"
export default {
    data(){
        return {
            songs: []
        }
    },
    computed:{
        ...mapGetters([
            'rank'
        ]),
        title(){
            return this.rank.name
        },
        bgImage(){
            return this.rank.coverImgUrl
        }
    },
    created(){
        this._rankDetail(this.rank.tracks)
    },
    methods:{
        _rankDetail(list){
            if(!this.rank.id){
                this.$router.push('/rank')
                return
            }
            let result = []
            list.forEach((item) => {
                result.push(this._formatSong(item))
            });
            this.songs = result
        },
        _formatSong(musicData){
            return {
                id: musicData.id,
                singer: musicData.ar,
                name: musicData.name,
                album: musicData.name
            }
        }
    },
    components:{
        'app-music-list': MusicList
    }

}
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .v-enter-active,.v-leave-active{
        transition all 0.5s
    }
    .v-enter,.v-leave-to{
        transform translate3d(50%,0,0)
        opacity 0
    }
</style>