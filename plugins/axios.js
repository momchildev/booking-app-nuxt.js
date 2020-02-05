export default ({ $axios, redirect, app, store }) => {

  /*
  $axios.onRequest((config) => {
    var token = store.getters['users/token'];
    if (token) {
      config.headers.common['x-access-token'] = token;
    }
  });
  */

  /*
  $axios.onResponseError((error) => {
    const request = error.config;
    if (store.getters['users/token'] && error.response && error.response.status === 401 && !request.retry) {
      request.retry = true;
      $axios.get(`https://baseurl.com/umbraco/api/auth/refreshtoken?token=${store.getters['users/token']}`).then((response) => {
        store.state.userToken = response.data;
        return $axios(request);
      }).catch(async () => {
        await store.dispatch('logout');
        redirect('/');
      });
    }
  });
  */
};