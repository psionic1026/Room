import Konva from 'konva'
import { CanvasElement } from '@/types/Canvas'
import { Shape } from '@/tools/shapes/Shape'

export default class RulerCreator implements Shape {
  private line: Konva.Line
  private text: Konva.Text
  private circle: Konva.Circle
  private group: Konva.Group
  private readonly hitStroke: number = 10
  private readonly mapRatio: number
  constructor (public temporary: boolean,
               public size: number,
               public colour: string) {
    this.line = new Konva.Line()
    this.text = new Konva.Text()
    this.circle = new Konva.Circle()
    this.group = new Konva.Group()
    this.mapRatio = 1
  }

  create = (canvasElement: CanvasElement, layer: Konva.Layer): void => {
    this.group = new Konva.Group()
    this.group.attrs.temporary = this.temporary
    this.group.id(canvasElement.id).add(
      this.line = this.createLineElement(canvasElement),
      this.text = this.createTextElement(canvasElement),
      this.circle = this.createCircleElement(canvasElement)
    )
    layer.add(this.group)
  }

  move = (canvasElement: CanvasElement, layer: Konva.Layer, pos: Position): void => {
    this.circle.radius(this.calcRadius(canvasElement.data[0], canvasElement.data[1], pos.x, pos.y))
    this.text.text(this.getText(this.calcRadius(canvasElement.data[0], canvasElement.data[1], pos.x, pos.y)))
    const textPos = this.calcTextPosition(canvasElement.data[0], canvasElement.data[1], pos.x, pos.y)
    this.text.x(textPos.x).y(textPos.y)
    this.line.points([canvasElement.data[0], canvasElement.data[1], pos.x, pos.y])
  }

  createLineElement = (canvasElement: CanvasElement, colour?: string, size?: number): Konva.Shape & Konva.Line => {
    return new Konva.Line({
      globalCompositeOperation: 'source-over',
      points: canvasElement.data,
      stroke: colour || this.colour,
      strokeWidth: size || this.size,
      lineCap: 'mitter',
      id: canvasElement.id,
      hitStrokeWidth: this.hitStroke,
      dash: [15, 5]
    })
  }

  createTextElement = (canvasElement: CanvasElement, text?: string, colour?: string): Konva.Shape & Konva.Text => {
    return new Konva.Text({
      id: canvasElement.id,
      x: canvasElement.data[0],
      y: canvasElement.data[1],
      text: text || '0 m',
      fontSize: 20,
      fontFamily: 'Calibri',
      hitStrokeWidth: this.hitStroke,
      fill: colour || this.colour
    })
  }

  createCircleElement = (canvasElement: CanvasElement, colour?: string, stroke?: number, radius?: number): Konva.Shape & Konva.Circle => {
    return new Konva.Circle({
      id: canvasElement.id,
      globalCompositeOperation: 'source-over',
      stroke: colour || this.colour,
      strokeWidth: stroke || this.size,
      radius: radius || 0,
      hitStrokeWidth: this.hitStroke,
      x: canvasElement.data[0],
      y: canvasElement.data[1]
    })
  }

  calcTextPosition = (x1: number, y1: number, x2: number, y2: number): Position => {
    if ((x1 - x2) === 0 && (y1 - y2) === 0) {
      return {
        x: x1,
        y: y1
      }
    } else {
      const offset = 30
      const offsetX = (x1 - x2) / 2
      const offsetY = (y1 - y2) / 2
      const angleX = -(y1 - y2) / (this.calcRadius(x1, y1, x2, y2))
      const angleY = (x1 - x2) / (this.calcRadius(x1, y1, x2, y2))
      return {
        x: x2 + offsetX + (angleX * offset) - (this.text.getWidth() / 2),
        y: y2 + offsetY + (angleY * offset) - (this.text.getHeight() / 2)
      }
    }
  }

  calcRadius = (x1: number, y1: number, x2: number, y2: number): number => {
    const a = Math.pow((x2 - x1), 2)
    const b = Math.pow((y2 - y1), 2)
    return Math.sqrt(a + b)
  }

  getText = (radius: number): string => {
    return Math.floor(radius * this.mapRatio) + ' m'
  }

  // eslint-disable-next-line
  [key: string]: any;
}

export interface Position {
  x: number;
  y: number;
}
