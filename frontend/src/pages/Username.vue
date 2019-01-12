<template>
  <div>
    <div id="header" class="row text-center justify-center" style="padding-top: 30px; padding-bottom: 40px">
      <span class="col-xs-11 text-grey-10" style="font-size: 28px">Sign in</span>
      <span class="col-xs-11 text-grey-10" style="font-size: 16px">to continue to Oniv</span>
    </div>
    <div id="input-box" class="row justify-center">
      <span class="col-xs-10">
        <q-field icon="account circle" :error="error" :error-label="errorLabel" :helper="helperText[level]">
          <q-input v-model="username" @keyup.enter="check" type="email" stack-label="Mobile number or E-mail" color="blue" />
        </q-field>
      </span>
      <div class="col-xs-12" style="margin-top: 40px">
        <div class="row">
          <div class="col-xs-5 offset-xs-1 text-primary" style="font-size: 14px; cursor: pointer" @click="forgot">
            Forgot Password ?
          </div>
          <div class="text-center col-xs-6">
            <q-btn color="primary" @click="check"><span style="color:white; font-size: 14px">Next</span></q-btn>
          </div>
        </div>
      </div>
      <div class="col-xs-12" style="margin-top: 10px; padding-bottom: 60px">
        <div class="row">
          <div class="col-xs-5 offset-xs-1 text-primary text-left" style="font-size: 14px; cursor: pointer" @click="$router.push('/register')">
            Create account
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      level: 'staff',
      errorLabel: '',
      helperText: {
        'staff': 'eg - ssharma@gmail.com',
        'student': 'eg - 0101cs14d09@iit-k'
      },
      error: false
    }
  },
  created () {
    if (this.$route.path === "/demo") {
      this.username = "admin@oniv"
      this.check()
    }
  },
  methods: {
    alert (o) {

      if (!o.position) {
        o.position = 'top-right'
      }

      o.timeout = 5000
      this.$q.notify(o)
    },
    check () {
      if (this.username.length < 5 ) {
        this.error = true
        this.errorLabel = 'Invalid Username'
      }
      else {

        this.$q.loading.show()
        this.error = false

        let level = 'student'

        if (this.username.indexOf('.staff') === this.username.length - 6 || this.username.indexOf('admin@') === 0) {
          level = 'staff'
        }

        this.$http.post('/login', {
          body: {
            name: this.username,
            level: level,
            type: 'username'
          }
        }).then((res) => {
          if (res.status === 200) {
            const username = this.username
            const level = this.level
            this.$emit('user', {
              username, level
            })

            if (res.body.message === 'OTP_SENT') {

              this.alert({message: "We've sent you an OTP to login to your account", color: 'positive'})

            } else if (res.body.message === 'OTP_EXIST') {

              this.alert({message: "You have not set your password yet. Use OTP to login.", color: 'positive'})

            }

          } else if (res.status === 203) {
            if (res.body.message === 'VERIFICATION_EMAIL_SENT') {
              this.error = true
              this.errorLabel = "Verify your account first. We've sent you a new email verification link"
            } else if (res.body.message === 'PENDING_EMAIL_VERIFICATION') {
              this.error = true
              this.errorLabel = 'E-mail verification pending. Check out your Email inbox for verification link'
            }
          }
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
    },
    forgot () {
      if (this.username.length === 0) {
        this.alert({message: 'Enter login id first', icon: 'report problem', color: 'warning'})
        return
      }

      this.$q.loading.show()

      this.$http.get("/coaching/external/forgotpassword/user=" + encodeURIComponent(this.username)).then((res) => {
        if (res.status === 200) {

          if (res.body.message === 'VERIFICATION_MAIL_SENT') {
            this.alert({message: 'Account found. We have sent a verification link to your registered Email-ID', icon: 'check', color: 'green'})
          } else if (res.body.message === 'OTP_SENT') {
            this.alert({message: 'Account found. We have sent an OTP to your mobile number', icon: 'check', color: 'green'})
          }

        }
      }).catch((err) => {
        
        if (err.status === 404) {
          this.alert({message: 'No Account found. Please verify your login ID / Mobile Number / Email-ID', icon: 'error', color: 'warning'})

        } else {
          this.alert({message: 'Internal Server Error', icon: 'error', color: 'negative'})
        }

      }).then(() => {
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style scoped>
  
  #radio-box {
    margin-top: 50px;
  }

  #next {
    margin-top: 30px;
  }

</style>
