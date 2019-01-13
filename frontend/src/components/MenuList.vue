<template>
  <div class="row items-center">
    <template v-if="!listData">
      <div class="col-xs-12">
        <div class="row justify-center items-center">
          <q-spinner color="primary" size="28px" />
        </div>
      </div>
    </template>
  	<template v-else>
     <template v-if="listData && listData.list && listData.list.length > 0">
       <q-list style="padding-top: 0px; padding-bottom: 0px; border: none; cursor: pointer" class="col-xs-12" :class="listData.classes ? listData.classes : null" :style="listData.style ? listData.style : null">
          <q-list-header v-if="listData && listData.name && listData.name.length > 0">{{ listData.name }}</q-list-header>
          <q-item style="padding: 0px;" v-if="newBtn && !newBtn.float">
            <q-item-main>
              <q-btn @click="$router.push(newBtn.to)" :icon="newBtn.icon ? newBtn.icon : ''" class="full-width" :label="newBtn.label" :color="newBtn.color ? newBtn.color : 'blue'" :flat="newBtn.flat ? newBtn.flat : false" :style="newBtn.style ? newBtn.style : ''">
              </q-btn>
            </q-item-main>

          </q-item>
          <q-item @click.native="items.action(item._id)" :class="items.class" :style="items.style" v-for="(item, n) in listData.list" :key="n" :to="item.to" exact>
            <q-item-side v-if="items.hasOwnProperty('icon') || item.hasOwnProperty('icon')" :icon="item.icon ? item.icon.name : items.icon.name" :color="item.icon ? item.icon.color : items.icon.color" />
            <q-item-main v-if="!item.sub" v-html="item.label" :class="item.classes ? item.classes : null" />
            <q-item-main class="lowercase" :class="item.classes ? item.classes : null" v-else :label="item.label" color="text-grey-1" :sublabel="item.sub" />
          </q-item>
        </q-list>
      </template>
      <template v-else>
        <div class="col-xs-12">
          <div class="row items-center justify-center text-grey-7" style="font-family: Lato" :style="{height: height - 100 + 'px'}">
            Empty
          </div>
        </div>
      </template>
      <q-btn v-if="newBtn && newBtn.float" fab-mini rounded icon="add" :icon="newBtn.icon.name" color="primary" style="z-index: 5 ;position: fixed; bottom: 15px; right: 15px" @click="$router.push(newBtn.to)" :style="newBtn.style">
        <q-tooltip v-model="isTooltip">
          {{ newBtn.tooltip }}
        </q-tooltip>
      </q-btn>
    </template>
  </div>
</template>

<script>

export default {
  // name: 'ComponentName',
  props: ["listData"],
  data () {
    return {
    }
  },
  computed: {
  	menuList () {
  		this.listData
  	},
    items () {
      return this.listData.items
    },
    newBtn () {
      if (this.listData) {
        return this.listData.new
      } else {
        return null
      }
    },
    isTooltip () {
      if (this.newBtn.tooltip && this.newBtn.tooltip.length > 0) {
        return true
      }

      return false
    },
    height () {
      return window.innerHeight
    }
  }
}
</script>

<style>

  .q-item-label {
    font-size: 14px
  }

  .q-item-sublabel {
    font-size: 11px
  }

</style>
