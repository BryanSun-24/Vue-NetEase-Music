import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend.vue'
import Rank from 'components/rank/rank.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'
import Recommend_detail from 'components/recommend-detail/recommend-detail.vue'
import Rank_detail from 'components/rank-detail/rank-detail.vue'
import Search from "components/search/search.vue"
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: Recommend_detail
      }]
    },
    {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: Rank_detail
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children:[{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
    path: '/search',
    component: Search
    }
  ]
})
