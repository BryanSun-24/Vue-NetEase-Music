<template>
    <div class="search-box">
        <input type="text" class="box" :placeholder="placeholder" v-model="query">
        <i class="icon-delete" v-show="query" @click="clear"></i>
    </div>
</template>

<script>
export default {
    data(){
        return {
            query: ''
        }
    },
    props:{
        placeholder:{
            type: String,
            default: "Search Song or Singer"
        }
    },
    methods:{
        clear(){
            this.query = ''
        },
        setQuery(query){
            this.query = query
        }
    },
    created(){
        this.$watch('query', (newvalue) =>{
            this.$emit('query', newvalue)
        })
    }
}
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"
    .search-box{
        display flex
        align-items center
        box-sizing border-box
        width 100%
        height 25px 
    }
    .box{
        flex 1
        line-height 25px
        background $color-theme
        color #fff
        font-size $font-size-medium
        border: none 
        outline none
        border-bottom  1px solid rgb(235,235,235)
    }
    &::placeholder{
        color rgba(255,255,255,0.6)
    }
    .icon-delete{
        position absolute
        right 12px
        font-size 14px
        color rgba(255,255,255,0.8)
    }
</style>