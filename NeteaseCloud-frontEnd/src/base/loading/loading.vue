<template>
    <div class="loading">
        <img src="./loading.gif" width="24" height="24" alt="">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
export default {
    name: "loading",
    props:{
        title:{
            type:String,
            default: 'loading...'
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
    .loading{
        width: 100%;
        text-align: center;
    }
    .desc{
        line-height 20px
        font-size $font-size-small
        color $color-text-l
    }
</style>