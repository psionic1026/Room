<template>
  <div class="btn-toggle-box ma-0 pa-0">
    <v-btn-toggle class="flex-column">
      <tool-container :id="id" icon="fa-map-pin" toolname="ping" :popout="false" />
      <tool-container :id="id" icon="fa-pen" toolname="freedraw" :popout="true"><freedraw-template /></tool-container>
      <tool-container :id="id" icon="fa-eraser" toolname="erase" :popout="false"></tool-container>
      <tool-container :id="id" icon="fa-slash" toolname="line" :popout="true"><line-template /></tool-container>
      <tool-container :id="id" icon="far fa-circle" toolname="circle" :popout="true"><circle-template /></tool-container>
      <tool-container :id="id" icon="fa-ruler" toolname="ruler" :popout="false"></tool-container>
      <undo-container :id="id" icon="fa-undo" toolname="undo"></undo-container>
      <redo-container :id="id" icon="fa-redo" toolname="redo"></redo-container>
    </v-btn-toggle>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ToolContainer from './canvas-tools/ToolContainer.vue'
import UndoContainer from './canvas-tools/UndoContainer.vue'
import RedoContainer from './canvas-tools/RedoContainer.vue'
import FreedrawTemplate from './canvas-tools/templates/Freedraw.vue'
import LineTemplate from './canvas-tools/templates/Line.vue'
import { Tool } from '@/tools/Tool'
import CircleTemplate from './canvas-tools/templates/Circle.vue'

@Component({
  name: 'TheToolPanel',
  components: {
    ToolContainer,
    UndoContainer,
    RedoContainer,
    FreedrawTemplate,
    LineTemplate,
    CircleTemplate
  }
})
export default class TheToolPanel extends Vue {
  @Prop() private id!: string;

  tools: Tool[] = []
}
</script>
<style scoped lang="scss">
.btn-toggle-box{
  margin-top: 0.25rem;
  position: fixed;
}
</style>
