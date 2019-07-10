import * as path from 'path';
import { ImageProfile } from './ImageProfile';
import { ImageProfileManager } from './ImageProfileManager';
import { ImageMimeType } from '../ImageMimeType';

test('can add a profile and fetch it back', () => {
  const manager = new ImageProfileManager();
  manager.add({
    name: 'test',
    version: '1',
    width: 400,
    height: 400,
    resizeAlgorithm: 'cover',
    allowedTypes: [ImageMimeType.JPEG],
    jpegQuality: 80,
  });
  expect(manager.totalProfiles).toBe(1);

  const profile = manager.get('test');
  expect(profile).toBeInstanceOf(ImageProfile);
  expect(profile!.name).toBe('test');
});

test('can load profiles from an object', () => {
  const manager = new ImageProfileManager({
    profiles: [
      {
        name: 'example-thumbnail',
        version: '1a',
        width: 80,
        height: 80,
        resizeAlgorithm: 'cover',
        allowedTypes: [
          'image/jpeg',
        ],
      },
    ],
  });
  expect(manager.totalProfiles).toBe(1);

  const profile = manager.get('example-thumbnail');
  expect(profile).toBeInstanceOf(ImageProfile);
  expect(profile!.name).toBe('example-thumbnail');
});

test('can load profiles from a configuration file', () => {
  const manager = new ImageProfileManager(path.join(__dirname, 'test-config.yml'));
  expect(manager.totalProfiles).toBe(3);

  const profile = manager.get('example-thumbnail');
  expect(profile).toBeInstanceOf(ImageProfile);
  expect(profile!.name).toBe('example-thumbnail');
});
