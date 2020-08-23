<template>
    <div class="music-list">
        <div class="back" @click="back">
            <span class="iconback"> &lt; </span>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image" :style="bgStyle"></div>
    </div>    
</template>

<script>
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
        }
    },
    computed:{
        bgStyle(){
            return `background-image:url(${this.bgImage})`
        }
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
    
</style>