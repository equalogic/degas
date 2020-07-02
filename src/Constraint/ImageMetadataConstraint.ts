import { ImageMetadata } from '../ImageMetadata';
import { Constraint } from './Constraint';
import { ConstraintViolation } from './ConstraintViolation';

export interface ImageMetadataConstraint extends Constraint {
  violations: ConstraintViolation[];

  isValid(metadata: ImageMetadata): boolean;
}
