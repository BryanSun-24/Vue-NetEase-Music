<template>
    <div class="song-list">
        <ul>
            <li class="item" v-for="(song, index) of songs" @click="selectItem(song, index)">
                <div class="list">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        songs:{
            type: Array,
            default: []
        }
    },
    methods:{
        getDesc(song){
            return `${song.singer} . ${song.album}`
        },
        selectItem(item, index){
            this.$emit('select', item, index)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .item{
        display flex
        align-items center
        box-sizing border-box
        height 64px
        font-size $font-size-medium
        border-bottom 1px solid #ccc
    }
    .list{
        display 1
        line-height 20px
        overflow hidden
    }
    .name{
        color $color-text
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
    }
    .desc{
        color $color-text-d
        margin-top 4px
    }
</style>