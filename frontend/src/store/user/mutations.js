import Vue from 'vue'

/*
export const someMutation = (state) => {}
 */


export const setObj = (state, o) => {
  for (const p in o) {
    Vue.set(state, p, o[p])
  }
}

export const set = (state, o) => {
    state[o.el] = o.value
  }

export const setKey = (state, o) => {
    state[o.el][o.key] = o.value
  }

export const unsetKey = (state, o) => {
    if(o.all === true) {
      state[o.el] = {}
    } else {
      delete state[o.el][o.key]
    }
  }
export const removeElement = (state, indexes) => {
    indexes.forEach((index) => {
      state.students.splice(index,1)
    })
  }

export const insertEl = (state, o) => {
    state[o.el].unshift(o.value)
  }
