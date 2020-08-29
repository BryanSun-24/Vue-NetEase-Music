<template>
  <div id="app">
    <MusicHeader></MusicHeader>
    <tab></tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MusicHeader from 'components/music-header/music-header.vue'
import tab from 'components/tab/tab.vue'
import Player from "components/player/player"

export default {
  name: 'App',
  components:{
    MusicHeader,
    tab,
    Player
  }
}
</script>

<style>
</style>
