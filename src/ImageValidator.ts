import { ConstraintViolation } from './Constraint/ConstraintViolation';
import { ImageMetadataConstraint } from './Constraint/ImageMetadataConstraint';
import { ImageMetadata } from './ImageMetadata';

export class ImageValidator {
  public _violations: ConstraintViolation[] = [];

  public constructor(private readonly constraints: ImageMetadataConstraint[]) {}

  public isValid(metadata: ImageMetadata): boolean {
    const violations: ConstraintViolation[] = [];
    let valid = true;

    this.constraints.forEach((constraint: ImageMetadataConstraint) => {
      if (!constraint.isValid(metadata)) {
        valid = false;
        violations.push(...constraint.violations);
      }
    });

    this._violations = violations;

    return valid;
  }

  public get violations(): ConstraintViolation[] {
    return this._violations;
  }
}
