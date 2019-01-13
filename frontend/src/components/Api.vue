<template>
  <div class="row justify-center">
  	<div class="col-xs-12" v-if="fetching">
  		<q-spinner size="36px" color="primary" style="margin-top: 100px" />
  	</div>
  	<div class="col-xs-12" style="overflow-y: auto" :style="{'max-height': height - 60 + 'px'}" v-else>
      <div class="row justify-center" style="margin-top: 10px;">
        <span>REQEUST</span>
      </div>
  		<div v-if="$route.name === 'info'" class="row justify-center" style="margin-top: 10px;">
  			<span class="text-bold">Full Path - </span><span class="text-primary">{{'/api/' + $store.state.user._id + '/' + $route.params.projectId + values.path}}</span>
  		</div>
  		<div class="row justify-center" style="margin-top: 20px;">
  			<q-select v-model="values.method" :options="options" />
  			<q-input v-model="values.path" placeholder="Path | example - /get/users/list" />
  		</div>
  		<div class="row justify-center" style="margin-top: 20px">
  			<span>Required Headers</span>
  		</div>
  		<div class="row justify-center" style="margin-top: 20px;">
  			<div class="col-xl-8 col-lg-8 col-sm-10 col-xs-12">
  				<div class="row justify-around">
  					<span class="col-xs-6 text-center">Key</span>
  					<span class="col-xs-6 text-center">Allowed Value</span>
  				</div>
  			</div>
  		</div>
  		<div class="row justify-center" style="margin-top: 5px;">
  			<div class="col-xl-9 col-lg-9 col-sm-10 col-xs-12" v-for="(header, i) in values.headers" :key="i.toString()" style="margin-top: 5px">
  				<div class="row justify-around">
  					<q-input :readonly="header.req" label="key" v-model="header.key" />
  					<q-input placeholder="comma seperated" label="value" v-model="header.value" />
  				</div>
  			</div>
  		</div>
  		<div class="row justify-center" style="margin-top: 10px">
  			<q-btn label="new" icon="add" @click="values.headers.push({key: '', value: ''})" color="orange-6" />
  		</div>
  		<template v-if="values.method === 'get'">
  			<div class="row justify-center" style="margin-top: 20px">
	  			<span>Response</span>
	  		</div>
	  		<div class="row justify-center" style="margin-top: 20px;">
	  			<q-select v-model="values.response.type" stack-label="Response Type" :options="resType" />
	  		</div>
	  		<div class="row justify-center" style="margin-top: 5px;">
	  			<q-input type="textarea" class="col-xs-10" placeholder="Response body" v-model="values.response.value" />
	  		</div>
  		</template>
  		<div class="row justify-center" style="margin-top: 50px">
  			<q-btn :label="$route.name === 'new' ? 'add api' : 'save changes'" :icon="$route.name === 'new' ? 'add' : 'save'" @click="add" color="primary" />
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  created () {
  	if (this.$route.name === 'info') {
  		this.fetchApiDetails()
  	}
  },
  data () {
    return {
    	fetching: false,
    	values: {
    		method: 'get',
    		path: '/',
    		// params: [{key: '', value: ''}],
    		response: {
    			type: 'application/json',
    			value: ''
    		},
    		headers: [{key: 'authkey', value: '*', req: true}, {key: 'username', value: '*', req: true}, {key: 'document_id', value: '*', req: true}]
    	},
    	options: [
    		{label: 'GET', value: 'get'},
    		{label: 'POST', value: 'post'},
    		{label: 'PUT', value: 'put'},
    		{label: 'DELETE', value: 'delete'}
    	],
    	resType: [
    		{label: 'JSON', value: 'application/json'},
    		{label: 'Text', value: 'text/plain'},
    		{label: 'HTML', value: 'text/html'}
    	]
    }
  },
  watch: {
  	'$route.path' () {
  		if (this.$route.name === 'info') {
  			this.fetchApiDetails()
  		} else if (this.$route.nam === 'new') {
  			this.values = {
	    		method: 'get',
	    		path: '/',
	    		// params: [{key: '', value: ''}],
	    		response: {
	    			type: 'application/json',
	    			value: ''
	    		},
	    		headers: [{key: 'authkey', value: '*', req: true}, {key: 'username', value: '*', req: true}, {key: 'document_id', value: '*', req: true}]
	    	}
  		}
  	},
    'values.path' () {
      if (this.values.path[0] !== '/') {
        this.values.path = '/' + this.values.path
      }
    }
  },
  computed: {
    height () {
      return window.innerHeight
    }
  },
  methods: {
  	alert (o) {
  		o.position = 'top-right'
  		this.$q.notify(o)
  	},
  	fetchApiDetails () {
  		this.fetching = true
  		this.$http.get('/project/id=' + this.$route.params.projectId + '/api/method=' + encodeURIComponent(this.$route.params.method) + '&path=' + encodeURIComponent(this.$route.params.api))
  		.then((res) => {
  			const o = {}
  			Object.assign(o, res.body.api)

  			const H = []
  			Object.keys(res.body.api.headers).forEach((header) => {
  				H.push({key: header, value: res.body.api.headers[header].join(',')})
  			})
  			o.headers = H

  			this.values = o
  		})
  		.catch((err) => {
  			console.error(err)
  			this.alert({message: 'API not found', icon: 'error', color: 'negative'})
  		})
  		.then(() => {
  			this.fetching = false
  		})
  	},
  	add () {

  		const H = {}, o = {}

  		this.values.headers.forEach((header) => {
  			H[header.key] = header.value.split(',')
  		})

  		Object.assign(o, this.values)
  		o.headers = H

      this.fetching = true

  		this.$http.put('/project/id=' + this.$route.params.projectId + '/new-api', o)
  		.then((res) => {
  			this.alert({message: 'API created', color: 'positive', icon: 'check_circle'})
  			const project = this.$store.state.user.project || {apis: []}
  			project.apis.push({path: o.path, method: o.method})
  			this.$store.commit('user/setObj', {
  				project
  			})
  		})
  		.catch((err) => {
  			console.error(err)
  			if (err.code === 'API_EXIST') {
  				this.alert({message: 'API with this path already exist', color: 'negative', icon: 'error'})
  			}
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
