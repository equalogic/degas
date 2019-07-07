export enum ImageMimeType {
  GIF = 'image/gif',
  JPEG = 'image/jpeg',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  WEBP = 'image/webp',
  WBP = 'image/webp',
}

export enum ImageFileExtension {
  'image/gif' = 'gif',
  'image/jpeg' = 'jpeg',
  'image/png' = 'png',
  'image/svg+xml' = 'svg',
  'image/webp' = 'webp',
}

export enum ImageFileExtensionShort {
  'image/gif' = 'gif',
  'image/jpeg' = 'jpg',
  'image/png' = 'png',
  'image/svg+xml' = 'svg',
  'image/webp' = 'wbp',
}

export function getFileExtensionFromMimeType(mimeType: ImageMimeType): string {
  if (ImageFileExtension[mimeType] == null) {
    throw new Error(`Could not determine a file extension for unsupported MIME type ${mimeType}.`);
  }

  return ImageFileExtension[mimeType];
}

export function getShortFileExtensionFromMimeType(mimeType: ImageMimeType): string {
  if (ImageFileExtensionShort[mimeType] == null) {
    throw new Error(`Could not determine a file extension for unsupported MIME type ${mimeType}.`);
  }

  return ImageFileExtensionShort[mimeType];
}

export function getMimeTypeFromFileExtension(fileExtension: string): ImageMimeType | undefined {
  return ImageMimeType[fileExtension.toUpperCase()];
}
