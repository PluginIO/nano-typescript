import {Stage} from './Stage'
import {EventType} from 'Events/EventType'
import {EventDispatcher} from 'Events/EventDispatcher'

export class Texture extends EventDispatcher {
    private readonly _image: HTMLImageElement

    public get image(): HTMLImageElement {
        return this._image
    }

    public constructor(image: HTMLImageElement = null) {
        super()

        if (image) {
            this._image = image
        } else {
            this._image = document.createElement('img')
        }

        this._image.onload = (e): void => this.onImageLoad(e)
        this._image.onerror = (e): void => this.onImageError(e)
    }

    public get width(): number {
        return this._image.width
    }

    public get height(): number {
        return this._image.height
    }

    public set path(value: string | null) {
        if (value == null) {
            value = ''
        }
        this._image.src = value
    }

    public get path(): string {
        return this._image.src
    }

    private onImageLoad(e: Event): void {
        this.dispatchEvent(new Event(EventType.LOADED))
    }

    private onImageError(e: Event | string): void {
        this._image.src = ''
        this.dispatchEvent(new CustomEvent(EventType.ERROR))
    }

    public draw(
        x: number,
        y: number,
        width?: number,
        height?: number,
        sX?: number,
        sY?: number,
        sWidth?: number,
        sHeight?: number
    ): void {
        if (
            sX != null &&
            sY != null &&
            sWidth != null &&
            sHeight != null &&
            width != null &&
            height != null
        ) {
            Stage.context.drawImage(
                this._image,
                sX,
                sY,
                sWidth,
                sHeight,
                x,
                y,
                width,
                height
            )
        } else if (width != null && height != null) {
            Stage.context.drawImage(this._image, x, y, width, height)
        } else {
            Stage.context.drawImage(this._image, x, y)
        }
    }
}
