import { Duplex, Readable } from 'stream';
import sharp, { Metadata, Sharp } from 'sharp';
import { ImageMetadata } from './ImageMetadata';
import { ImageDimensions } from './ImageDimensions';

export class ImageManipulator {
  private readonly image: Sharp;
  private readonly isStream: boolean;

  public constructor(input: Readable | Buffer) {
    if (input instanceof Readable) {
      this.isStream = true;
      this.image = sharp();

      input.pipe(this.image);
    } else {
      this.image = sharp(input);
    }
  }

  public async readMetadata(): Promise<ImageMetadata> {
    return this.image.metadata().then((metadata: Metadata): ImageMetadata => {
      return ImageMetadata.createFromSharpMetadata(metadata);
    });
  }

  public getStream(): Duplex {
    if (!this.isStream) {
      throw new Error('May only call getStream() when instantiated with an input stream');
    }

    return this.image;
  }

  public async toBuffer(): Promise<Buffer> {
    return this.image.toBuffer();
  }

  public resize(dimensions: ImageDimensions): this {
    if (dimensions.width == null && dimensions.height == null) {
      throw new Error('At least one of "width" or "height" must be specified when resizing.');
    }

    this.image.resize(null, null, {
      width: dimensions.width != null ? dimensions.width : undefined,
      height: dimensions.height != null ? dimensions.height : undefined,
      fit: dimensions.algorithm,
    });

    return this;
  }

  public blur(sigma: number | null): this {
    this.image.blur(sigma != null ? sigma : undefined);

    return this;
  }
}
