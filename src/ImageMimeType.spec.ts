import { getFileExtensionFromMimeType, getShortFileExtensionFromMimeType, ImageMimeType } from './ImageMimeType';

describe('image/gif', () => {
  test('file extension is .gif', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.GIF)).toEqual('gif');
  });
  test('short file extension is .gif', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.GIF)).toEqual('gif');
  });
});

describe('image/jpeg', () => {
  test('file extension is .jpeg', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.JPEG)).toEqual('jpeg');
  });
  test('short file extension is .jpg', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.JPEG)).toEqual('jpg');
  });
});

describe('image/png', () => {
  test('file extension is .png', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.PNG)).toEqual('png');
  });
  test('short file extension is .png', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.PNG)).toEqual('png');
  });
});

describe('image/svg+xml', () => {
  test('file extension is .svg', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.SVG)).toEqual('svg');
  });
  test('short file extension is .svg', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.SVG)).toEqual('svg');
  });
});

describe('image/webp', () => {
  test('file extension is .webp', () => {
    expect(getFileExtensionFromMimeType(ImageMimeType.WEBP)).toEqual('webp');
  });
  test('short file extension is .wbp', () => {
    expect(getShortFileExtensionFromMimeType(ImageMimeType.WEBP)).toEqual('wbp');
  });
});
