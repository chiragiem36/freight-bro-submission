<template>
  <div class="row">
    <div v-if="!$q.platform.is.mobile || ($q.platform.is.mobile && $route.path === '/settings')" class=" col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
        <div class="row justify-center items-center" :style="{height: fullHeight - 50 + 'px'}">
          <span v-if="fetching">
            <q-spinner size="32px" color="primary" />
          </span>
          <span v-else class="col-xs-12 bg-grey-9 full-height" style="border-right: solid 1px rgb(210, 210, 210)" :style="{height: fullHeight - 50 + 'px'}">
            <menu-list :listData="listData" />
          </span>
        </div>
      </div>
      <router-view class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-12"></router-view>
  </div>
</template>

<script>

import MenuList from './../components/MenuList.vue'

export default {
  data () {
    return {
      fetching: false
    }
  },
  components: {
    'menu-list': MenuList
  },
  created () {
    // this.getProjects()
  },
  computed: {
    store () {
      return this.$store.state.user
    },
    listData () {

      const list = []

      if (this.store && this.store.projects) {
        this.store.projects.forEach((project) => {
          list.push({
            _id: project._id,
            label: project.name,
            icon: {
              name: 'work'
            },
            to: '/projects/id=' + project._id
          })
        })

      }
      return {
            name: 'Projects',
            items : {
              action: () => {},
              class: ['bg-grey-3'],
              style: {'border-bottom': 'solid 1px rgb(200, 200, 200)', 'padding-top': '15px', 'padding-bottom': '15px'},
              icon: {
                name: '',
                color: ''
              }
            },
            list
          }
    },
    fullHeight () {
      return window.innerHeight
    }
  },
  methods: {
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
