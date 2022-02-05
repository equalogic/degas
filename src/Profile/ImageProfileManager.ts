import { ImageProfile, ImageProfileOptions } from './ImageProfile';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export class ImageProfileManager {
  private profiles: Map<string, ImageProfile>;

  public constructor(config?: any) {
    this.profiles = new Map();

    if (typeof config === 'string') {
      this.loadConfigFromFile(config);
    } else if (config != null) {
      this.applyConfig(config);
    }
  }

  public add(profile: ImageProfile | ImageProfileOptions): this {
    if (profile instanceof ImageProfile) {
      this.profiles.set(profile.name, profile);
    } else {
      this.profiles.set(profile.name, new ImageProfile(profile));
    }

    return this;
  }

  public has(name: string): boolean {
    return this.profiles.has(name);
  }

  public get(name: string): ImageProfile | undefined {
    return this.profiles.get(name);
  }

  public all(): IterableIterator<ImageProfile> {
    return this.profiles.values();
  }

  public entries(): IterableIterator<[string, ImageProfile]> {
    return this.profiles.entries();
  }

  public get totalProfiles(): number {
    return this.profiles.size;
  }

  public reset(): this {
    this.profiles = new Map();

    return this;
  }

  private loadConfigFromFile(configFile: string): this {
    const config = yaml.load(fs.readFileSync(configFile, 'utf8'));

    return this.applyConfig(config);
  }

  private applyConfig(config: any): this {
    config = this.validateConfig(config);

    (config.profiles as ImageProfileOptions[]).forEach(profile => {
      this.add(profile);
    });

    return this;
  }

  private validateConfig(config: any): any {
    const configSchema: Joi.ObjectSchema = Joi.object({
      profiles: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          version: Joi.alternatives([Joi.string(), Joi.number().integer()]).required(),
          width: Joi.alternatives(Joi.number().integer().greater(0), Joi.string().valid('auto')).required(),
          height: Joi.alternatives(Joi.number().integer().greater(0), Joi.string().valid('auto')).required(),
          minWidth: Joi.number().integer().greater(0).optional().allow(null),
          minHeight: Joi.number().integer().greater(0).optional().allow(null),
          maxWidth: Joi.number().integer().greater(0).optional().allow(null),
          maxHeight: Joi.number().integer().greater(0).optional().allow(null),
          resizeAlgorithm: Joi.string().valid('cover', 'contain', 'fill', 'inside', 'outside').required(),
          allowedTypes: Joi.array()
            .items(Joi.string().valid('image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'))
            .required(),
          jpegQuality: Joi.number().integer().greater(0).less(101).optional().allow(null),
          effects: Joi.object({
            blur: Joi.alternatives([Joi.number(), Joi.boolean()]).optional().allow(null),
          })
            .optional()
            .allow(null),
        }),
      ),
    });

    const { error, value: validatedConfig } = configSchema.validate(config);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedConfig;
  }
}
