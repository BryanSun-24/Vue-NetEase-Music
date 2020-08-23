<template>
    <div class="slider">
        <swiper ref="mySwiper" :options="swiperOptions" v-if="bannerList.length">
        <swiper-slide v-for="item of bannerList" :key="item.id">
            <img :src="item.imageUrl" class = "slider-img">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import {getBanner} from "../../api/recommend"
import {ERR_OK} from "../../common/js/config"
export default {
    name:"slider",
    data(){
        return {
            bannerList: [],
            swiperOptions:{
                loop: true,
                autoplay:{
                    delay: 3000,
                },
                pagination:{
                    el: '.swiper-pagination'
                }
            }
        }
    },
    created(){
        this._getBanner();
    },
    methods:{
        _getBanner(){
            getBanner().then((res) => {
                if (res.status == ERR_OK){
                    this.bannerList = res.data.banners.slice(4);
                    //console.log(this.bannerList);
                }
            }) 
        }
    }
}
</script>
<style scoped lang="stylus">
    @import "~common/stylus/variable"
    div span .swiper-pagination-bullet {
        opacity: 0.8
    }
    div span .swiper-pagination-bullet-active{
        width : 8px
        border-radius: 5px
        background-color : $color-theme
    }
    .slider-img {
        width: 100%
    }

</style>