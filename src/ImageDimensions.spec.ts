import { ResizedImageDimensionsCalculator } from './ImageDimensions';

describe('calculate resized image dimensions using "cover" algorithm', () => {
  test('with null width and height -> should throw exception', () => {
    expect(() => {
      ResizedImageDimensionsCalculator.calculate(1024, 768, {
        width: null,
        height: null,
        algorithm: 'cover',
      });
    }).toThrow();
  });

  test('with explicit width and height', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: 400,
      algorithm: 'cover',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(400);
  });

  test('with auto height', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: null,
      algorithm: 'cover',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(300);
  });

  test('with auto width', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: null,
      height: 400,
      algorithm: 'cover',
    });

    expect(dimensions.width).toBe(533);
    expect(dimensions.height).toBe(400);
  });
});

describe('calculate resized image dimensions using "contain" algorithm', () => {
  test('with null width and height -> should throw exception', () => {
    expect(() => {
      ResizedImageDimensionsCalculator.calculate(1024, 768, {
        width: null,
        height: null,
        algorithm: 'contain',
      });
    }).toThrow();
  });

  test('with explicit width and height', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: 400,
      algorithm: 'contain',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(400);
  });

  test('with auto height', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: null,
      algorithm: 'contain',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(300);
  });

  test('with auto width', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: null,
      height: 400,
      algorithm: 'contain',
    });

    expect(dimensions.width).toBe(533);
    expect(dimensions.height).toBe(400);
  });
});

describe('calculate resized image dimensions using "fill" algorithm', () => {
  test('with null width -> should throw exception', () => {
    expect(() => {
      ResizedImageDimensionsCalculator.calculate(1024, 768, {
        width: null,
        height: 400,
        algorithm: 'fill',
      });
    }).toThrow();
  });

  test('with null height -> should throw exception', () => {
    expect(() => {
      ResizedImageDimensionsCalculator.calculate(1024, 768, {
        width: 400,
        height: null,
        algorithm: 'fill',
      });
    }).toThrow();
  });

  test('with explicit width and height', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: 400,
      algorithm: 'fill',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(400);
  });
});

describe('calculate resized image dimensions using "inside" algorithm', () => {
  test('with null width and height -> should throw exception', () => {
    expect(() => {
      ResizedImageDimensionsCalculator.calculate(1024, 768, {
        width: null,
        height: null,
        algorithm: 'inside',
      });
    }).toThrow();
  });

  test('with explicit width and height, landscape orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: 400,
      algorithm: 'inside',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(300);
  });

  test('with explicit width and height, portrait orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(768, 1024, {
      width: 400,
      height: 400,
      algorithm: 'inside',
    });

    expect(dimensions.width).toBe(300);
    expect(dimensions.height).toBe(400);
  });

  test('with auto height, landscape orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: null,
      algorithm: 'inside',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(300);
  });

  test('with auto height, portrait orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(768, 1024, {
      width: 400,
      height: null,
      algorithm: 'inside',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(533);
  });

  test('with auto width, landscape orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: null,
      height: 400,
      algorithm: 'inside',
    });

    expect(dimensions.width).toBe(533);
    expect(dimensions.height).toBe(400);
  });

  test('with auto width, portrait orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(768, 1024, {
      width: null,
      height: 400,
      algorithm: 'inside',
    });

    expect(dimensions.width).toBe(300);
    expect(dimensions.height).toBe(400);
  });
});

describe('calculate resized image dimensions using "outside" algorithm', () => {
  test('with null width and height -> should throw exception', () => {
    expect(() => {
      ResizedImageDimensionsCalculator.calculate(1024, 768, {
        width: null,
        height: null,
        algorithm: 'outside',
      });
    }).toThrow();
  });

  test('with explicit width and height, landscape orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: 400,
      algorithm: 'outside',
    });

    expect(dimensions.width).toBe(533);
    expect(dimensions.height).toBe(400);
  });

  test('with explicit width and height, portrait orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(768, 1024, {
      width: 400,
      height: 400,
      algorithm: 'outside',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(533);
  });

  test('with auto height, landscape orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: 400,
      height: null,
      algorithm: 'outside',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(300);
  });

  test('with auto height, portrait orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(768, 1024, {
      width: 400,
      height: null,
      algorithm: 'outside',
    });

    expect(dimensions.width).toBe(400);
    expect(dimensions.height).toBe(533);
  });

  test('with auto width, landscape orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(1024, 768, {
      width: null,
      height: 400,
      algorithm: 'outside',
    });

    expect(dimensions.width).toBe(533);
    expect(dimensions.height).toBe(400);
  });

  test('with auto width, portrait orientation', () => {
    const dimensions = ResizedImageDimensionsCalculator.calculate(768, 1024, {
      width: null,
      height: 400,
      algorithm: 'outside',
    });

    expect(dimensions.width).toBe(300);
    expect(dimensions.height).toBe(400);
  });
});
