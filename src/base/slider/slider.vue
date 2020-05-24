<template>
    <div class="slider"></div>
</template>
<script>
import {getBanner} from "../../api/recommend"
import {ERR_OK} from "../../common/js/config"
export default {
    name:"slider",
    data(){
        return {
            bannerList: []
        }
    },
    created(){
        this._getBanner();
    },
    methods:{
        _getBanner(){
            getBanner().then((res) => {
                if (res.status == ERR_OK){
                    this.bannerList = res.data.banners;
                }
            }) 
        }
    }
}
</script>
<style scoped>

</style>