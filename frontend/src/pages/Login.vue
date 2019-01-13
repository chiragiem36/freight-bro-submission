<template>
  <div id="login-box" class="row justify-center items-center" :class="xx">
    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 bg-white">
      <div id="input-box" class="row justify-center">
        <span class="col-xs-10">
          <q-field icon="account circle" :error="errorUsername" :error-label="errorLabel">
            <q-input v-model="username" @keyup.enter="check" type="email" stack-label="Username" color="blue" autofocus />
          </q-field>
        </span>
        <span class="col-xs-10" style="margin-top: 20px">
          <q-field icon="https" :error="errorPassowrd" :error-label="errorLabel">
            <q-input v-model="password" @keyup.enter="check" type="password" stack-label="Password" color="blue" autofocus />
          </q-field>
        </span>
        <div class="col-xs-12" style="margin-top: 20px; padding-bottom: 60px">
          <div class="row justify-around">
              <q-btn color="negative" @click="check('new-user')"><span style="color:white; font-size: 14px">Create Account</span></q-btn>
              <q-btn color="primary" @click="check('login')"><span style="color:white; font-size: 14px">Log in</span></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const crypto = require('crypto')

export default {
  methods: {
    alert (o) {
      this.$q.notify(o)
    },
    check (path) {
      if (this.username.length < 5 ) {
        this.error = true
        this.errorLabel = 'Invalid Username'
      }
      else {

        this.$q.loading.show()
        this.error = false

        let level = 'admin'

        this.$http.post('/accounts/' + path, {
            level: level,
            _id: this.username,
            hash: crypto.createHash('md5').update(this.password).digest('hex')
        })
        .then((res) => {
          if (path === 'login') {
            if (res.status === 200) {
              document.cookie = res.body.cookie
              this.$store.commit('user/setObj', {
                authenticated: true
              })
            }
          } else {
            if (res.status === 200) {
              this.username = ""
              this.password = ""
            }
          }
        })
        .catch((err) => {

          if (path === 'new-user') {
            if (err.status === 401) {
              this.errorUsername = true
              this.errorLabel = 'Account already exist'
            } else if (err.status === 404) {
              this.errorPassowrd = true
              this.errorLabel = 'User not found'
            } else {
              this.alert({message: "Internal Server Error", icon: 'error', position: 'top-right'})
            }
          } else {
            if (err.status === 401) {
              this.errorUsername = true
              this.errorLabel = 'Account already exist'
            } else if (err.status === 404) {
              this.errorUsername = true
              this.errorLabel = 'User not found'
            } else {
              this.alert({message: "Internal Server Error", icon: 'error', position: 'top-right'})
            }
          }
        })
        .then(() => {
          this.$q.loading.hide()
        })
      }
    }
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
      username: 'chiragiem36',
      password: 'eenomoto',
      errorLabel: '',
      errorUsername: false,
      errorPassowrd: false
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
