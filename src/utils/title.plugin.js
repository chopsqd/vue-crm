import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function (key) {
      const appName = process.env.VUE_APP_TITLE

      return `${localizeFilter(key)} | ${appName}`
    }
  }
}
