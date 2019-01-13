<template>
  <div class="row flex flex-center text-center">
  	<div class="col-xs-12" v-if="loading">
  		<q-spinner color="primary" size="32px" />
  	</div>
  	<div class="col-xs-12" v-else>
  		<div class="row justify-center">
  			<q-field label="Project name">
  				<q-input v-model="name" />
  			</q-field>
  		</div>
  		<div class="row justify-center" style="margin-top: 20px">
  			<q-btn :disabled="loading" color="primary" icon="add" @click="create" label="Create project" />
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
    	name: '',
    	loading: false
    }
  },
  methods: {
  	create () {

  		if (this.name.length === 0) {
  			return
  		}

  		this.loading = true

  		this.$http.post('/project/new', {name: this.name})
  		.then((res) => {
  			const projects = this.$store.state.user.projects || []
  			projects.push(res.body)
  			this.$store.commit('user/setObj', {projects})
  			this.name = ''
  		})
  		.catch((err) => {
  			console.error(err)
  			this.$q.notify({message: 'Error adding new project'})
  		})
  		.then(() => {
  			this.loading = false
  		})
  	}
  }
}
</script>

<style>
</style>
