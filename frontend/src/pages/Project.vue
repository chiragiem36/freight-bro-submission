<template>
  <div class="row">
    <div class="col-xl-4 col-lg-4 col-md-5 col-sm-5 col-xs-12">
        <div class="row justify-center items-center" style="border-right: solid 1px rgb(210, 210, 210)" :style="{height: fullHeight - 50 + 'px'}">
        	<span v-if="fetching">
        		<q-spinner size="32px" color="primary" />
        	</span>
        	<span v-else class="col-xs-12 bg-grey-5 full-height list">
        		<menu-list :listData="listData" />
        	</span>
        </div>
      </div>
      <router-view name="api" class="col-xl-8 col-lg-8 col-md-7 col-sm-7 col-xs-12"></router-view>
  </div>
</template>

<script>

export default {
  // name: 'PageName',
  data () {
  	return {
  		fetching: false
  	}
  },
  components: {
  	'menu-list': () => import('./../components/MenuList.vue')
  },
  created () {
  	this.getProjectDetails()
  },
  watch: {
    '$route.params.projectId' () {
      this.getProjectDetails()
    }
  },
  computed: {
  	store () {
  		return this.$store.state.user
  	},
  	fullHeight () {
      return window.innerHeight
    },
  	listData () {

      const list = []

      if (this.store && this.store.project) {
        this.store.project.apis.forEach((api) => {

          let icon, color

          if (api.method === 'get') {
            icon = 'cloud_download'
            color = 'orange-7'
          } else if (api.method === 'post' || api.method === 'put') {
            icon = 'backup'
            color = 'primary'
          } else {
            icon = 'delete'
            color = 'red-5'
          }

          list.push({
            _id: api.path,
            icon: {
              name: icon,
              color: color
            },
            label: '<span class="uppercase text-bold text-' + color + '">' + api.method + '</span> | ' + api.path,
            sub: '/api/' + this.$store.state.user._id + '/' + this.$route.params.projectId + api.path,
            to: '/projects/id=' + this.$route.params.projectId + '/api=' + encodeURIComponent(api.path) + '/method=' + api.method
          })
        })

      }
      return {
            name: 'APIs',
            items : {
              action: () => {},
              class: ['bg-white'],
              style: {'border-bottom': 'solid 1px rgb(200, 200, 200)', 'padding-top': '15px', 'padding-bottom': '15px'},
              icon: {
                name: '',
                color: ''
              }
            },
            new: {label: 'New API', to: '/projects/id=' + this.$route.params.projectId + '/new'},
            list
          }
    },
  },
  methods: {
  	getProjectDetails () {

  		this.fetching = true

  		this.$http.get('/project/id=' + this.$route.params.projectId)
  		.then((res) => {
	        if (res.status === 200 || res.status === 304) {
	          
	          this.$store.commit('user/setObj', {
	            authenticated: true,
	          })

	          this.$store.commit('user/setObj', res.body)
	        }
	      })
	      .catch((err) => {
	        console.log(err)
	      })
	      .then(() => {
	      	this.fetching = false
	      })
  	}
  }
}
</script>

<style>
</style>
