<template>
  <div>
    <colour-picker :value.sync="penColour" />
    <size-picker :value.sync="penSize"></size-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tool } from '@/tools/Tool'
import { namespace } from 'vuex-class'
import { Namespaces } from '@/store'
import { ToolGetters, ToolsAction } from '@/store/modules/tools'
import ColourPicker from '@/components/canvas-tools/templates/template-tools/ColourPicker.vue'
import SizePicker from '@/components/canvas-tools/templates/template-tools/SizePicker.vue'

const Tools = namespace(Namespaces.TOOLS)

@Component({
  name: 'Freedraw',
  computed: {},
  components: { SizePicker, ColourPicker }
})
export default class PopoutButton extends Vue {
  @Tools.Getter(ToolGetters.TOOL) findTool!: (name: string) => Tool
  @Tools.Action(ToolsAction.SET_COLOUR) setColour!: (colour: string) => void
  @Tools.Action(ToolsAction.SET_SIZE) setSize!: (size: number) => void

  get penSize () {
    return this.findTool('freedraw').size || 3
  }

  set penSize (newValue: number) {
    this.setSize(newValue)
  }

  get penColour (): string {
    return this.findTool('freedraw').colour || '#FF0000FF'
  }

  set penColour (newValue: string) {
    this.setColour(newValue)
  }
}

</script>
<style scoped lang="scss">

</style>
<style lang="scss">
.v-color-picker__controls {
  display: none;
}
</style>
