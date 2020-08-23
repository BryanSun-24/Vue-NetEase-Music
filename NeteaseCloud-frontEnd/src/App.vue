<template>
  <div id="app">
    <MusicHeader></MusicHeader>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MusicHeader from 'components/music-header/music-header.vue'
import tab from 'components/tab/tab.vue'

export default {
  name: 'App',
  components:{
    MusicHeader,
    tab
  }
}
</script>

<style>
</style>
