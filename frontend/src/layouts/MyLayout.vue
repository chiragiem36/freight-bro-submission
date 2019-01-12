<template>
  <q-layout class="text-center">
    <template v-if="!authenticating">
      <q-page-container v-if="authenticated && loaded">
        <div class="row bg-white items-center justify-around" style="height: 50px; border-bottom: solid 1px rgb(190, 190, 190)">
          <span class="col-xs-1 text-left" style="padding-left: 5px">
            <q-btn icon="add" label="new" color="orange-7" inverted @click="addNew" />
          </span>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6 text-left">
            Freight Bro | {{ 'Admin' }}
          </div>
        </div>
        <div class="row" style="overflow-y: auto" :style="{height}">
          <div class="col-xs-12">
            <router-view></router-view>
          </div>
        </div>
      </q-page-container>
      <q-page-container v-else>
        <login class="full-height text-left" style="position: absolute; top: 0px"></login>
      </q-page-container>
    </template>
    <template v-else>
      <div class="row items-center justify-center" :style="{height}">
        <q-spinner color="primary" size="48" />
      </div>
    </template>
  </q-layout>
</template>

<script>
/*
 * Root component
 */

 import Login from './../pages/Login.vue'


const socketServer = window.location.hostname + ":8888"

// import Username from './../components/Username.vue'
// import Password from './../components/Password.vue'

import io from 'socket.io-client'

function checkTests(socket) {
  socket.on('test live', (res) => {
    console.log(res)
    console.log('etest ' + res.name + ' (ID - ' + res.id + ' )' + ' is live')
    const batches = res.batches
    if (batches.indexOf(decodeURIComponent(this.$route.params.batchId)) && window.location.href.indexOf('etests') > -1) {
      const S = this.store.scheduled
      let L
      if (this.store.live.length > 0) {
        L = this.store.live
      } else {
        L = []
      }

      let n

      S.forEach((x, i) => {
        if (x._id === res.id) {
          n = i
        }
      })

      S.pop(i)

      // delete S[res.id]
      delete res.batch
      L.push(res)
      this.$store.commit('admin/setKey', {
        live: L
      })
    }

    if (window.location.href.indexOf(res.id) > -1) {
      window.location.reload()
    }

    Toast.create({
      html: 'Test - ' + res.id + ', batch - ' + batch + ' is now live',
      icon: 'check circle',
      bgColor: 'green',
      timeout: 2500
    })
  })
}

export default {
  components: {
    'login': Login
  },
  data () {
    return {
      authenticating: false,
      left: true,
      FSR: true,
      mini: false,
      socket: null,
      isConnected: false,
      popovers: {
        notif: false
      },
      loaded: true,
      modal: {
        newFaculty: true
      },
      popover: {
        'addNew': false
      }
    }
  },
  computed: {
    is () {
      if (this.store && this.store.is) {
        return this.store.is
      }
    },
    staff () {
      const staff = this.store.staffData

      if (staff) {
        return staff
      }

      return null
    },
    width () {
      return window.innerWidth
    },
    fsr () {
      return this.FSR
    },
    isMini () {
      return this.mini
    },
    comp () {
      return this.store.comp
    },
    authenticated () {
      return this.store.authenticated || true
    },
    updates () {
      if (this.store.updates && Object.keys(this.store.updates).length > 0) {
        return this.store.updates
      } else {
        return null
      }
    },
    height () {
      return window.innerHeight - 50 + 'px'
    },
    load () {
      return this.loaded
    },
    store () {
      return this.$store.state.user
    }
  },
  watch: {
    '$route.path' (to, from) {
      if (to === "/") {
        // this.getDepartmentData()
      }
    },
    'store' () {
      if (this.store.level) {
        this.loaded = true
      }
    }
  },
  created () {

    // this.$q.loading.show()
  },
  methods: {}
}
</script>

<style>

  ::-webkit-scrollbar {
        display: none;
    }

  * {
    font-family: Roboto;
    font-size: 13px;
  }

  .layout-aside-left {
    width: 230px;
    box-shadow: 1px 5px 5px rgb(200,200,200);
  }

  #logo {
    padding-bottom:20px;
    padding-top:15px;
  }

  #logo:first-child {
    padding-top: 30px;
    padding-left:30px;
    padding-right:30px;
  }

  #school_name {
    margin-top:5px;
    color:rgba(40,40,40,1);
    font-weight:bold;
  }

  #navigation > div > div {
    margin-bottom: 5px;
  }

  #navigation > div > div:first-child {
    margin-bottom: 15px;
  }

  .nav-btn {
    padding-top: 5px;
    padding-bottom: 5px;
    cursor: pointer;
    border-radius: 2px;
  }

  .nav-btn > span:last-child {
     font-size: 15px
  }

  .nav-btn:hover {
    background-color: rgba(190,190,190, .2);
  }

  a {
    color: rgb(110,110,110);
  }

  .router-link-exact-active {
    color: rgb(54, 120, 226);
    font-weight: bold;
  }

  #login-box {
    position: relative;
    top: 100px;
    width: 100%;
  }

  @media screen and (min-width: 720px) {

    body {
      background-color: rgb(230,230,230);
    }

    #login-box > div {
      border: solid 1px rgb(205,205,205);
      box-shadow: 1px 2px 10px 1px rgb(200,200,200)
    }
  }

  .field {
    margin-top: 30px;
  }

  .q-input, .q-select, .q-toggle {
    padding: 10px 10px 10px 10px;
    border: solid 1px rgb(180, 180, 180);
    border-radius: 3px;
    background-color: white;
  }

</style>
