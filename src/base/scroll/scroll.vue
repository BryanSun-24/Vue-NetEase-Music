<template>
    <div ref="wrapper"> <!-- 这个ref wrapper 也是必须要设置的为了better-scroll能运行-->
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "scroll",
    props:{
        probeType:{
            type: Number,
            default: 1 //当probeType 为1的时候，它就不是实时跟踪滚动状态
        },
        click:{
            type:Boolean,
            default: true
        },
        data:{
            type:Array,
            default: null
        },
        listenScroll:{
            type: Boolean,
            default: false
        }
    },
    mounted:function(){
        setTimeout(()=>{
            this._initScroll()
        }, 20)
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if(this.listenScroll){
                let _this = this
                this.scroll.on('scroll', (place) =>{
                    _this.$emit('scroll', place)
                })
            }
        },
        enable(){
            this.scroll && this.scroll.enable()
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        scrollTo(){
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement(){
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    components:{
        BScroll
    },
    watch:{
        data(){
            setTimeout(()=>{
                this.refresh()
            }, 20)
        }
    }
}
</script>

