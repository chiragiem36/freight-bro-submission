<template>
  <div id="login-box" class="row justify-center items-center" :class="xx">
    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 bg-white">
      <div id="input-box" class="row justify-center">
        <span class="col-xs-10">
          <q-field icon="account circle" :error="error" :error-label="errorLabel">
            <q-input v-model="username" @keyup.enter="check" type="email" stack-label="Username" color="blue" autofocus />
          </q-field>
        </span>
        <span class="col-xs-10" style="margin-top: 20px">
          <q-field icon="https" :error="error" :error-label="errorLabel">
            <q-input v-model="password" @keyup.enter="check" type="email" stack-label="Password" color="blue" autofocus />
          </q-field>
        </span>
        <div class="col-xs-12" style="margin-top: 20px; padding-bottom: 60px">
          <div class="row">
            <div class="col-xs-5 offset-xs-1 text-primary text-left" style="font-size: 14px; cursor: pointer" @click="$router.push('/register')">
              Create account
            </div>
            <div class="text-center col-xs-6">
              <q-btn color="primary" @click="check"><span style="color:white; font-size: 14px">Next</span></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Username from './Username.vue'

export default {
  methods: {
    check () {
      if (this.username.length < 5 ) {
        this.error = true
        this.errorLabel = 'Invalid Username'
      }
      else {

        this.$q.loading.show()
        this.error = false

        let level = 'admin'

        this.$http.post('/login', {
          body: {
            name: this.username,
            level: level,
            username: this.username,
            password: this.password
          }
        }).then((res) => {
          this.$store.commit('user/setObj', {
            authenticated: true
          })
        }).catch((err) => {

          if (err.status === 404) {
            this.error = true
            this.errorLabel = 'Couldnot find account with this username'
            this.$q.loading.hide()
          } else {
            this.alert({message: "Internal Server Error", icon: 'error', position: 'top-right'})
          }
        }).then(() => {
          this.$q.loading.hide()
        })
      }
    }
  },
  components: {
    Username
  },
  computed: {
    xx () {
      if (this.isDesktop) {
        return 'bg-grey-3'
      }

      return 'bg-white'
    },
    isDesktop () {
      if (!this.$q.platform.is.desktop) {
        return false
      }

      return true
    },
    height () {
      return window.innerHeight + 'px'
    }
  },
  data () {
    return {
      comp: 'Username',
      errorLabel: '',
      error: false
    }
  }
}
</script>

<style scoped>

 * {
   font-family: Roboto;
   color: rgb(30,30,30);
 }

  #login-box {
    width: 100%;
  }

  @media screen and (min-width: 720px) {

    /*body {
      background-color: rgb(240,240,240);
    }*/

    #login-box > div {
      padding-top: 30px;
      padding-bottom: 10px;
      border: solid 1px rgb(205,205,205);
      box-shadow: 1px 1px 2px 1px rgb(210,210,210)
    }
  }

  #header > span:first-child {
    font-size: 24px;
  }

  #header > span:last-child {
    font-size: 14px;
    color: rgb(30,30,30);
  }

  #radio-box {
    margin-top: 50px;
  }

  #input-box {
    margin-top: 10px;
  }

  #next {
    margin-top: 30px;
  }

</style>
