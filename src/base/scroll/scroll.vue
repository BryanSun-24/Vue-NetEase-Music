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
            default: 1
        },
        click:{
            type:Boolean,
            default: true
        },
        data:{
            type:Array,
            default: null
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
        },
        enable(){
            this.scroll && this.scroll.enable()
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
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

