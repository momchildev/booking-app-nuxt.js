import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  return new VuexPersistence({
    key: 'silvermirror'
  }).plugin(store)
}
