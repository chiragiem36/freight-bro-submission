<template>
  <div class="row">
    <div v-if="!$q.platform.is.mobile || ($q.platform.is.mobile && $route.path === '/settings')" class=" col-xl-3 col-lg-4 col-md-4 col-sm-5 col-xs-12">
        <div class="row" :style="{height: fullHeight - 50 + 'px'}">
          <div class="col-xs-12 bg-grey-9 full-height list">
            <menu-list :listData="listData" />
          </div>
        </div>
      </div>
      <router-view class="col-xl-9 col-lg-8 col-md-8 col-sm-7 col-xs-12"></router-view>
  </div>
</template>

<script>

import MenuList from './../components/MenuList.vue'

export default {
  data () {
    return {}
  },
  components: {
    'menu-list': MenuList
  },
  computed: {
    listData () {
      return {
            name: 'Projects',
            items : {
              class: ['bg-white'],
              style: {'border-bottom': 'solid 1px rgb(200, 200, 200)', 'padding-top': '15px', 'padding-bottom': '15px'},
              icon: {
                name: '',
                color: ''
              }
            },
            list: []
          }
    },
    fullHeight () {
      return window.innerHeight
    }
  }
}
</script>

<style scoped>

  * {
    font-size: 13px;
  }

  .navigation > div {
    margin-top: 10px;
  }

  .router-link-exact-active > .q-btn {
    background-color: white;
    border: solid 1px rgb(150,150,150);
  }

</style>
