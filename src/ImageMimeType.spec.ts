import {
  getFileExtensionFromMimeType,
  getMimeTypeFromFileExtension,
  getShortFileExtensionFromMimeType,
  ImageMimeType,
} from './ImageMimeType';

describe('image/gif', () => {
  test('file extension is .gif', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.GIF)).toEqual('gif');
  });
  test('short file extension is .gif', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.GIF)).toEqual('gif');
  });
  test('MIME type of .gif is image/gif', () => {
    expect(getMimeTypeFromFileExtension('gif')).toEqual(ImageMimeType.GIF);
  });
});

describe('image/jpeg', () => {
  test('file extension is .jpeg', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.JPEG)).toEqual('jpeg');
  });
  test('short file extension is .jpg', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.JPEG)).toEqual('jpg');
  });
  test('MIME type of .jpeg is image/jpeg', () => {
    expect(getMimeTypeFromFileExtension('jpeg')).toEqual(ImageMimeType.JPEG);
  });
  test('MIME type of .jpg is image/jpeg', () => {
    expect(getMimeTypeFromFileExtension('jpg')).toEqual(ImageMimeType.JPEG);
  });
});

describe('image/png', () => {
  test('file extension is .png', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.PNG)).toEqual('png');
  });
  test('short file extension is .png', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.PNG)).toEqual('png');
  });
  test('MIME type of .png is image/png', () => {
    expect(getMimeTypeFromFileExtension('png')).toEqual(ImageMimeType.PNG);
  });
});

describe('image/svg+xml', () => {
  test('file extension is .svg', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.SVG)).toEqual('svg');
  });
  test('short file extension is .svg', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.SVG)).toEqual('svg');
  });
  test('MIME type of .svg is image/svg+xml', () => {
    expect(getMimeTypeFromFileExtension('svg')).toEqual(ImageMimeType.SVG);
  });
});

describe('image/webp', () => {
  test('file extension is .webp', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.WEBP)).toEqual('webp');
  });
  test('short file extension is .wbp', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.WEBP)).toEqual('wbp');
  });
  test('MIME type of .webp is image/webp', () => {
    expect(getMimeTypeFromFileExtension('webp')).toEqual(ImageMimeType.WEBP);
  });
  test('MIME type of .wbp is image/webp', () => {
    expect(getMimeTypeFromFileExtension('wbp')).toEqual(ImageMimeType.WEBP);
  });
});
