# PreactPixelPerfect

PreactPixelPerfect is an advanced image loading and optimization library for Preact applications. It provides lazy loading, responsive images, background image handling, and more, all with a focus on delivering pixel-perfect results.

## Features

- 🖼️ Lazy loading of images and iframes
- 📱 Responsive image loading with `srcset` and `sizes` support
- 🌄 Background image lazy loading with `bgset` support
- 🌫️ Blur-up effect for smoother loading
- 📡 Device and network-aware image loading
- 🖼️ Support for `<picture>` element and multiple image formats
- ⚡ Critical image handling for above-the-fold content
- 🛠️ Customizable configuration

## Installation

```bash
npm install preact-pixelperfect
```

## Basic Usage

```jsx
import { PixelPerfectImage } from 'preact-pixelperfect';

function MyComponent() {
  return (
    <PixelPerfectImage
      src="image.jpg"
      srcset="image-small.jpg 300w, image-medium.jpg 600w, image-large.jpg 1200w"
      sizes="(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw"
      alt="Pixel perfect image"
      blurUp={true}
      parentFit="cover"
    />
  );
}
```

## Advanced Usage

### With `<picture>` Element

```jsx
import { PixelPerfectImage } from 'preact-pixelperfect';

function MyPictureComponent() {
  return (
    <picture>
      <source
        type="image/webp"
        srcset="image-small.webp 300w, image-medium.webp 600w, image-large.webp 1200w"
        sizes="(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw"
      />
      <source
        type="image/png"
        srcset="image-small.png 300w, image-medium.png 600w, image-large.png 1200w"
        sizes="(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw"
      />
      <PixelPerfectImage
        src="image-fallback.jpg"
        srcset="image-small.jpg 300w, image-medium.jpg 600w, image-large.jpg 1200w"
        sizes="(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw"
        alt="Pixel perfect image with format fallbacks"
        blurUp={true}
      />
    </picture>
  );
}
```

### Background Image

```jsx
import { PixelPerfectImage } from 'preact-pixelperfect';

function BackgroundImageComponent() {
  return (
    <PixelPerfectImage
      bg="background-image.jpg"
      bgset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
      parentFit="cover"
      style={{ width: '100%', height: '300px' }}
    />
  );
}
```

### Critical Image (Loads Immediately)

```jsx
import { PixelPerfectImage } from 'preact-pixelperfect';

function CriticalImageComponent() {
  return (
    <PixelPerfectImage
      src="critical-image.jpg"
      alt="Critical content"
      isCritical={true}
    />
  );
}
```

## API

### PixelPerfectImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | The image source URL |
| `srcset` | string | - | The image srcset attribute |
| `sizes` | string | - | The image sizes attribute |
| `bg` | string | - | Background image URL |
| `bgset` | string | - | Background image srcset |
| `parentFit` | 'contain' \| 'cover' \| 'fill' \| 'none' | 'contain' | How the image should fit within its container |
| `blurUp` | boolean | false | Whether to use the blur-up effect |
| `blurUpSize` | number | 40 | The size of the blurred placeholder image |
| `iframeSrc` | string | - | The iframe source URL |
| `onLoad` | function | - | Callback function when the image is loaded |
| `onError` | function | - | Callback function when the image fails to load |
| `placeholder` | JSX.Element | - | Custom placeholder while the image is loading |
| `threshold` | number | 0 | IntersectionObserver threshold |
| `rootMargin` | string | '200px' | IntersectionObserver root margin |
| `isCritical` | boolean | false | Whether the image should load immediately |

### PreactPixelPerfect Configuration

You can customize the global configuration using the `setConfig` method:

```javascript
import { PreactPixelPerfect } from 'preact-pixelperfect';

PreactPixelPerfect.setConfig({
  lazyClass: 'my-lazy-class',
  loadedClass: 'my-loaded-class',
  // ... other configuration options
});
```

## Browser Support

PreactPixelPerfect uses the Intersection Observer API for efficient lazy loading. For browsers that don't support this API, a polyfill is automatically loaded. In case the polyfill fails to load, images will be loaded immediately to ensure content visibility.

## Performance Considerations

- PreactPixelPerfect uses modern browser APIs like Intersection Observer for efficient lazy loading.
- The blur-up effect and responsive image loading help improve perceived performance.
- Device and network awareness allows for optimized image loading based on the user's context.

## Comparison with lazysizes

While both PreactPixelPerfect and lazysizes aim to optimize image loading, they have different strengths:

### PreactPixelPerfect:
- Optimized for Preact applications
- Built-in device and network awareness
- Uses Intersection Observer API for modern browsers
- All-in-one solution with less configuration needed

### lazysizes:
- Framework-agnostic
- Extensive plugin system for customization
- Broader browser support out-of-the-box
- Smaller core library size

Choose PreactPixelPerfect if you're building a Preact application and want a feature-rich, easy-to-use solution. Consider lazysizes if you need a more customizable, framework-agnostic option with broader browser support.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

PreactPixelPerfect is [MIT licensed](LICENSE).

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/yourusername/preact-pixelperfect/issues).
