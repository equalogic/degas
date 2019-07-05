import * as fs from 'fs';
import * as path from 'path';
import { ImageManipulator } from './ImageManipulator';

test('can read metadata from an image', async () => {
  const manipulator = new ImageManipulator(fs.readFileSync(path.join(__dirname, 'test-image.png')));
  const metadata = await manipulator.readMetadata();

  expect(metadata.mimeType).toBe('image/png');
  expect(metadata.format).toBe('png');
  expect(metadata.width).toBe(1280);
  expect(metadata.height).toBe(800);
});

test('can resize an image', async () => {
  const manipulator = new ImageManipulator(fs.readFileSync(path.join(__dirname, 'test-image.png')));
  const resizedImage = await manipulator.resize({ width: 400, height: 400, algorithm: 'cover' }).toBuffer();
  const metadata = await (new ImageManipulator(resizedImage)).readMetadata();

  expect(metadata.mimeType).toBe('image/png');
  expect(metadata.format).toBe('png');
  expect(metadata.width).toBe(400);
  expect(metadata.height).toBe(400);
});

test('can apply blur effect to an image', async () => {
  const manipulator = new ImageManipulator(fs.readFileSync(path.join(__dirname, 'test-image.png')));
  const blurredImage = await manipulator.blur(20).toBuffer();
  const metadata = await (new ImageManipulator(blurredImage)).readMetadata();

  // not really any way for us to test it actually blurred, but at least we can be sure it ran without errors
  expect(metadata.mimeType).toBe('image/png');
});
