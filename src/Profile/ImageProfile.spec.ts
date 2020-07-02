import * as fs from 'fs';
import * as path from 'path';
import { ImageProfile } from './ImageProfile';
import { ImageManipulator } from '../ImageManipulator';
import { ImageMimeType } from '../ImageMimeType';

test('can apply profile to an image', async () => {
  const profile = new ImageProfile({
    name: 'test',
    version: '1',
    width: 400,
    height: 400,
    resizeAlgorithm: 'cover',
    allowedTypes: [ImageMimeType.JPEG],
    jpegQuality: 80,
  });

  const manipulator = new ImageManipulator(fs.readFileSync(path.join(__dirname, '..', 'test-image.png')));
  profile.applyTo(manipulator);
  const resultImage = await manipulator.toBuffer();
  const metadata = await new ImageManipulator(resultImage).readMetadata();

  // TODO: Should be changing image format to JPEG
  expect(metadata.mimeType).toBe('image/png');
  expect(metadata.format).toBe('png');
  expect(metadata.width).toBe(400);
  expect(metadata.height).toBe(400);
});
