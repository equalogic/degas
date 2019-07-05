import { Metadata, Channels } from 'sharp';
import { Initializable } from '@madsci/ts-class-initializable';
import { ImageMimeType } from './ImageMimeType';

export class ImageMetadata extends Initializable<ImageMetadata> implements Metadata {
  /** MIME Type of the image format, e.g. image/jpeg */
  public mimeType: ImageMimeType;

  /*
   * Following properties are inherited from sharp.Metadata
   */

  /** Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg */
  public format?: string;
  /** Total size of image in bytes, for Stream and Buffer input only */
  public size?: number;
  /** Number of pixels wide (EXIF orientation is not taken into consideration) */
  public width?: number;
  /** Number of pixels high (EXIF orientation is not taken into consideration) */
  public height?: number;
  /** Name of colour space interpretation e.g. srgb, rgb, cmyk, lab, b-w ... */
  public space?: string;
  /** Number of bands e.g. 3 for sRGB, 4 for CMYK */
  public channels?: Channels;
  /** Name of pixel depth format e.g. uchar, char, ushort, float ... */
  public depth?: string;
  /** Number of pixels per inch (DPI), if present */
  public density?: number;
  /** String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK */
  public chromaSubsampling: string;
  /** Boolean indicating whether the image is interlaced using a progressive scan */
  public isProgressive?: boolean;
  /** Boolean indicating the presence of an embedded ICC profile */
  public hasProfile?: boolean;
  /** Boolean indicating the presence of an alpha transparency channel */
  public hasAlpha?: boolean;
  /** Buffer containing raw EXIF data, if present */
  public exif?: Buffer;
  /** Buffer containing raw ICC profile data, if present */
  public icc?: Buffer;
  /** Buffer containing raw IPTC data, if present */
  public iptc?: Buffer;
  /** Buffer containing raw XMP data, if present */
  public xmp?: Buffer;

  public static createFromSharpMetadata(metadata: Metadata): ImageMetadata {
    return new ImageMetadata({
      ...metadata,
      mimeType: ImageMetadata.translateMetadataFormatToMimeType(metadata.format!),
    });
  }

  private static translateMetadataFormatToMimeType(format: string): ImageMimeType {
    switch (format) {
      case 'gif':
        return ImageMimeType.GIF;
      case 'jpeg':
        return ImageMimeType.JPEG;
      case 'png':
        return ImageMimeType.PNG;
      case 'svg':
        return ImageMimeType.SVG;
      case 'webp':
        return ImageMimeType.WEBP;
      default:
        throw new Error(`Unrecognised sharp.Metadata image format: ${format}`);
    }
  }
}
