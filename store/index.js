export const strict = false

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}


export const actions = {
  nuxtServerInit ({ commit, dispatch }, {app, req, redirect}) {
    console.log("RUNNING GLOBAL SERVER INIT.")
  },

  nuxtClientInit ({ commit, dispatch }, {app, req, redirect, route}) {
    console.log("RUNNING GLOBAL CLIENT INIT.");

    dispatch('locations/init')
    dispatch('services/init')
    dispatch('staff/init')
    
    /*
    dispatch('getUserStatus', { commit, dispatch }).then((user) => {
     
    }).catch(() => {
      if (route.path != "/" && route.path.indexOf("/manage")>=0) {
        return redirect('/')
      }
    })
    */  

  },

  getUserStatus({ commit, dispatch }) {
    return new Promise(function (resolve, reject) {
       dispatch('users/status').then((user) => {
          if (user) {
            setTimeout(()=>{
              resolve(user)
            }, 0);
            
          } else reject()
       })
    });
  }
}
