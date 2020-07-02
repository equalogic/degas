export interface ImageDimensions {
  width: number | null;
  height: number | null;
  algorithm?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export class ResizedImageDimensionsCalculator {
  public static calculate(
    naturalWidth: number,
    naturalHeight: number,
    requestedDimensions: ImageDimensions,
  ): ImageDimensions {
    switch (requestedDimensions.algorithm) {
      case 'cover':
        return this.cover(naturalWidth, naturalHeight, requestedDimensions.width, requestedDimensions.height);
      case 'contain':
        return this.contain(naturalWidth, naturalHeight, requestedDimensions.width, requestedDimensions.height);
      case 'fill':
        return this.fill(naturalWidth, naturalHeight, requestedDimensions.width, requestedDimensions.height);
      case 'inside':
        return this.inside(naturalWidth, naturalHeight, requestedDimensions.width, requestedDimensions.height);
      case 'outside':
        return this.outside(naturalWidth, naturalHeight, requestedDimensions.width, requestedDimensions.height);
      default:
        throw new Error(`Unrecognised resize algorithm '${requestedDimensions.algorithm}'.`);
    }
  }

  public static cover(
    naturalWidth: number,
    naturalHeight: number,
    width: number | null,
    height: number | null,
  ): ImageDimensions {
    if (width == null && height == null) {
      throw new Error('At least one of `width`, `height` must be specified.');
    }

    const aspectRatio = naturalWidth / naturalHeight;

    // 'cover' will scale/crop to fit if a dimension is provided, otherwise scale proportionally
    return {
      width: width != null ? width : Math.round(height! * aspectRatio),
      height: height != null ? height : Math.round(width! / aspectRatio),
    };
  }

  public static contain(
    naturalWidth: number,
    naturalHeight: number,
    width: number | null,
    height: number | null,
  ): ImageDimensions {
    // 'contain' will scale proportionally to fit inside the provided dimensions and fill any extra space with a
    // background colour, so the resulting size is the same as for 'cover'
    return this.cover(naturalWidth, naturalHeight, width, height);
  }

  public static fill(
    naturalWidth: number,
    naturalHeight: number,
    width: number | null,
    height: number | null,
  ): ImageDimensions {
    if (width == null || height == null) {
      throw new Error('Both `width` and `height` must be specified for `fill` algorithm.');
    }

    return {
      width,
      height,
    };
  }

  public static inside(
    naturalWidth: number,
    naturalHeight: number,
    width: number | null,
    height: number | null,
  ): ImageDimensions {
    if (width == null && height == null) {
      throw new Error('At least one of `width`, `height` must be specified.');
    }

    const aspectRatio = naturalWidth / naturalHeight;

    // auto height, scale proportionally
    if (width != null && height == null) {
      return {
        width: width,
        height: Math.round(width / aspectRatio),
      };
    }

    // auto width, scale proportionally
    if (width == null && height != null) {
      return {
        width: Math.round(height * aspectRatio),
        height: height,
      };
    }

    // scale proportionally to fit the largest natural dimension
    return {
      width: naturalWidth >= naturalHeight ? width : Math.round(height! * aspectRatio),
      height: naturalHeight > naturalWidth ? height : Math.round(width! / aspectRatio),
    };
  }

  public static outside(
    naturalWidth: number,
    naturalHeight: number,
    width: number | null,
    height: number | null,
  ): ImageDimensions {
    if (width == null && height == null) {
      throw new Error('At least one of `width`, `height` must be specified.');
    }

    const aspectRatio = naturalWidth / naturalHeight;

    // auto height, scale proportionally
    if (width != null && height == null) {
      return {
        width: width,
        height: Math.round(width / aspectRatio),
      };
    }

    // auto width, scale proportionally
    if (width == null && height != null) {
      return {
        width: Math.round(height * aspectRatio),
        height: height,
      };
    }

    // scale proportionally to fit the largest natural dimension
    return {
      width: naturalWidth >= naturalHeight ? Math.round(height! * aspectRatio) : width,
      height: naturalHeight > naturalWidth ? Math.round(width! / aspectRatio) : height,
    };
  }
}
