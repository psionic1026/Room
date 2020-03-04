import { Tool } from '@/tools/Tool'
import Konva from 'konva'
import { CanvasElement } from '@/types/Canvas'
import uuid from 'uuid'
import throttle from 'lodash.throttle'
import CircleCreator from '@/tools/shapes/CircleCreator'

export default class Circle implements Tool {
  private circle: Konva.Circle;
  private line?: Konva.Line;
  private circleCreator: CircleCreator
  constructor (public readonly name: string,
               public size: number,
               public colour: string,
               public temporary: boolean,
               public showRadius: boolean,
               public outlineColour: string,
               public strokeStyle: number
  ) {
    this.circle = new Konva.Circle()
    this.line = new Konva.Line()
    this.circleCreator = new CircleCreator()
  }

  // eslint-disable-next-line
  mouseDownAction = (e: Konva.KonvaPointerEvent, canvasElement: CanvasElement, layer: Konva.Layer, _socket: WebSocket): void => {
    canvasElement.data = [e.evt.x, e.evt.y]
    canvasElement.id = uuid()
    canvasElement.tool.strokeStyle = this.strokeStyle
    canvasElement.tool.showRadius = this.showRadius
    canvasElement.tool.outlineColour = this.outlineColour
    this.circleCreator = new CircleCreator(this.size, this.colour, this.outlineColour, this.strokeStyle, this.temporary, this.showRadius)
    const result = this.circleCreator.create(canvasElement, layer)
    this.line = result.line
    this.circle = result.circle
  }

  // eslint-disable-next-line
  mouseMoveAction = throttle((e: Konva.KonvaPointerEvent, canvasElement: CanvasElement, layer: Konva.Layer, _socket: WebSocket): void => {
    const pos = {
      x: e.evt.x,
      y: e.evt.y
    }
    this.circleCreator.move(canvasElement, layer, pos, this.circle, this.line)
    layer.batchDraw()
  }, 10)

  mouseUpAction = (e: Konva.KonvaPointerEvent, canvasElement: CanvasElement, layer: Konva.Layer, socket: WebSocket): void => {
    canvasElement.data = canvasElement.data.concat([e.evt.x, e.evt.y])
    this.sendToWebsockets(socket, canvasElement)
  }

  renderCanvas = (canvasElement: CanvasElement, layer: Konva.Layer): void => {
    this.circleCreator = new CircleCreator(
      canvasElement.tool.size || this.size,
      canvasElement.tool.colour || this.colour,
      canvasElement.tool.outlineColour || this.outlineColour,
      canvasElement.tool.strokeStyle || this.strokeStyle,
      canvasElement.temporary || this.temporary,
      canvasElement.tool.showRadius || this.showRadius
    )
    const result = this.circleCreator.create(canvasElement, layer)
    const pos = {
      x: canvasElement.data[2],
      y: canvasElement.data[3]
    }
    this.circleCreator.move(canvasElement, layer, pos, result.circle, result.line)
    layer.batchDraw()
  }

  sendToWebsockets = (socket: WebSocket, canvasElement: CanvasElement) => {
    const data: CanvasElement = {
      jti: 'SAM',
      id: canvasElement.id,
      layerId: canvasElement.layerId,
      tool: {
        name: 'circle',
        colour: this.colour,
        size: this.size,
        showRadius: this.showRadius,
        strokeStyle: this.strokeStyle,
        outlineColour: this.outlineColour
      },
      temporary: this.temporary,
      data: canvasElement.data
    }
    socket.send(JSON.stringify(data))
  }
}
