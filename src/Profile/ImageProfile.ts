import { Initializable } from '@madsci/ts-class-initializable';
import { ImageMimeType } from '../ImageMimeType';
import { ImageManipulator } from '../ImageManipulator';
import { ImageDimensions } from '../ImageDimensions';

export interface ImageEffects {
  blur?: boolean | number;
}

export interface ImageProfileOptions {
  name: string;
  version: string;
  width: number | 'auto';
  height: number | 'auto';
  minWidth?: number | null;
  minHeight?: number | null;
  maxWidth?: number | null;
  maxHeight?: number | null;
  resizeAlgorithm: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  allowedTypes: ImageMimeType[];
  jpegQuality?: number | null;
  effects?: ImageEffects;
}

export class ImageProfile extends Initializable<ImageProfileOptions> implements ImageProfileOptions {
  public name: string;
  public version: string;
  public width: number | 'auto';
  public height: number | 'auto';
  public minWidth?: number | null;
  public minHeight?: number | null;
  public maxWidth?: number | null;
  public maxHeight?: number | null;
  public resizeAlgorithm: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  public allowedTypes: ImageMimeType[];
  public jpegQuality?: number | null;
  public effects?: ImageEffects;

  public get dimensions(): ImageDimensions {
    return {
      width: this.width === 'auto' ? null : this.width,
      height: this.height === 'auto' ? null : this.height,
      algorithm: this.resizeAlgorithm,
    };
  }

  public applyTo(manipulator: ImageManipulator): void {
    manipulator.resize(this.dimensions);

    if (this.effects != null) {
      if (this.effects.blur) {
        manipulator.blur(typeof this.effects.blur === 'number' ? this.effects.blur : null);
      }
    }
  }
}
