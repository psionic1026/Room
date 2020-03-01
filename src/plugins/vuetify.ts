import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import Vuetify, {
  VApp,
  VRow,
  VImg,
  VDivider,
  VToolbar,
  VSpacer,
  VBtn,
  VIcon,
  VCol,
  VBtnToggle,
  VMenu,
  VList,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemContent,
  VListItemTitle,
  VContent,
  VCard,
  VCardActions,
  VSheet,
  VColorPicker,
  VSlider,
  VNavigationDrawer
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VApp,
    VRow,
    VImg,
    VDivider,
    VToolbar,
    VSpacer,
    VBtn,
    VIcon,
    VCol,
    VBtnToggle,
    VMenu,
    VList,
    VListItem,
    VListItemAction,
    VListItemAvatar,
    VListItemContent,
    VListItemTitle,
    VContent,
    VCard,
    VCardActions,
    VSheet,
    VColorPicker,
    VSlider,
    VNavigationDrawer
  },
  directives: { }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const opts: Record<string, any> = {
  icons: {
    iconfont: 'fa' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  }
}

export default new Vuetify(opts)
