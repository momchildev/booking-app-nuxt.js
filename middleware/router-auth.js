export default function({ store, redirect, route }) {

  if (route.path.indexOf("fonts")>=0) return true;
  
  if (route.path.indexOf("testing")>=0) {

  } else if (route.path.indexOf("administration")>=0) {
    if (!store.getters['auth/state'] && route.path.indexOf("administration/login")==-1) {
      console.log("AUTH",  store.getters['auth/state'])
      console.log("Test3");
    }
  } else {

    if (route.query.session) {
      store.commit('appointment/session', route.query.session)
      if (!store.state.appointment.session) {
        console.log("Test1");
      } 
    } else {
      if (!store.state.appointment.session) {
        console.log("Test2");
      } 
      /*
      store.dispatch('appointment/session').then((session)=>{
        if (!session) {
        }
      })
      */
    }
    //console.log("SESSION IN ROUTEER ", store.state.appointment.session, route.query.session)
  }
}
