import { ImageMetadata } from '../ImageMetadata';
import { ImageMetadataConstraint } from './ImageMetadataConstraint';
import { ConstraintViolation } from './ConstraintViolation';

export class ImageFileSizeConstraint implements ImageMetadataConstraint {
  private _violations: ConstraintViolation[] = [];

  public constructor(private readonly maxKilobytes: number) {}

  public isValid(metadata: ImageMetadata): boolean {
    this._violations = [];

    if (metadata.size == null) {
      this._violations.push(
        new ConstraintViolation(
          'Could not determine a file size for the image. (Possibly corrupt or invalid image data.)',
        ),
      );

      return false;
    }

    if (metadata.size > this.maxKilobytes * 1024) {
      this._violations.push(new ConstraintViolation(`Images must be less than ${this.maxKilobytes} kB in size.`));

      return false;
    }

    return true;
  }

  public get violations(): ConstraintViolation[] {
    return this._violations;
  }
}
