import { ImageMimeType } from '../ImageMimeType';
import { ImageMetadata } from '../ImageMetadata';
import { ImageMetadataConstraint } from './ImageMetadataConstraint';
import { ConstraintViolation } from './ConstraintViolation';

export class ImageMimeTypeConstraint implements ImageMetadataConstraint {
  private _violations: ConstraintViolation[] = [];

  public constructor(
    private readonly allowedTypes: ImageMimeType[],
  ) {}

  public isValid(metadata: ImageMetadata): boolean {
    this._violations = [];

    if (metadata.mimeType == null) {
      this._violations.push(new ConstraintViolation('Could not determine a MIME Type for the image. (Possibly corrupt or invalid image data.)'));

      return false;
    }

    if (this.allowedTypes.indexOf(metadata.mimeType) === -1) {
      this._violations.push(new ConstraintViolation(`Images of type ${metadata.mimeType} are not allowed.`));

      return false;
    }

    return true;
  }

  public get violations(): ConstraintViolation[] {
    return this._violations;
  }
}
