# PreactPixelPerfect

PreactPixelPerfect is an advanced image loading library for Preact applications, offering lazy loading, responsive images, background image handling, and more, with enhanced features for optimal performance.

## Features

- 🖼️ Lazy loading of images and iframes
- 📱 Responsive image loading with `srcset` and `sizes` support
- 🌄 Background image lazy loading with `bgset` support
- 🌫️ Advanced blur-up effect for smoother loading
- 📡 Adaptive quality loading based on network conditions
- 🏎️ Preloading support for critical images
- 🛟 Error fallback for graceful error handling
- 📊 Basic performance metrics tracking
- 📐 Aspect ratio preservation during lazy loading
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
      alt="Responsive image"
      blurUp={true}
      adaptiveQuality={true}
      aspectRatio={16/9}
    />
  );
}
```

## Advanced Usage

### Adaptive Quality and Preloading

```jsx
<PixelPerfectImage
  src="large-image.jpg"
  alt="High quality image"
  blurUp={{ enabled: true, size: 60, blur: 30 }}
  adaptiveQuality={true}
  preload={true}
  errorFallback="fallback-image.jpg"
  onPerformanceLog={(metrics) => console.log(metrics)}
/>
```

### Background Image with Aspect Ratio

```jsx
<PixelPerfectImage
  bg="background-image.jpg"
  bgset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
  style={{ width: '100%' }}
  aspectRatio={16/9}
/>
```

### Critical Image (Loads Immediately)

```jsx
<PixelPerfectImage
  src="critical-image.jpg"
  alt="Above-the-fold content"
  isCritical={true}
  preload={true}
/>
```

### With `<picture>` Element

```jsx
<picture>
  <source type="image/webp" srcset="image.webp" />
  <source type="image/jpeg" srcset="image.jpg" />
  <PixelPerfectImage 
    src="image.jpg" 
    alt="Fallback" 
    blurUp={true}
    adaptiveQuality={true}
  />
</picture>
```

## API Reference

### PixelPerfectImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | The image source URL |
| `srcset` | string | - | The image srcset attribute |
| `sizes` | string | - | The image sizes attribute |
| `bg` | string | - | Background image URL |
| `bgset` | string | - | Background image srcset |
| `alt` | string | - | Alternative text for the image |
| `blurUp` | boolean \| BlurUpOptions | false | Enable and configure blur-up effect |
| `isCritical` | boolean | false | Load image immediately if true |
| `parentFit` | 'contain' \| 'cover' \| 'fill' \| 'none' | 'contain' | Background image fit |
| `threshold` | number | 0 | IntersectionObserver threshold |
| `rootMargin` | string | '200px' | IntersectionObserver root margin |
| `onLoad` | function | - | Callback when image loads |
| `onError` | function | - | Callback on load error |
| `placeholder` | JSX.Element | - | Custom placeholder element |
| `style` | CSSProperties | - | Additional styles for the element |
| `adaptiveQuality` | boolean | false | Enable adaptive quality loading |
| `preload` | boolean | false | Preload the image |
| `errorFallback` | string | - | Fallback image URL for error cases |
| `aspectRatio` | number | - | Aspect ratio to maintain (e.g., 16/9) |
| `onPerformanceLog` | function | - | Callback for performance metrics |

### BlurUpOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | boolean | true | Enable blur-up effect |
| `size` | number | 40 | Size of the blurred placeholder |
| `blur` | number | 20 | Blur intensity (in pixels) |

### PreactPixelPerfect.setConfig(config)

Allows global configuration of the library.

```javascript
import { PreactPixelPerfect } from 'preact-pixelperfect';

PreactPixelPerfect.setConfig({
  lazyClass: 'my-lazy-class',
  loadedClass: 'my-loaded-class',
  // ... other configuration options
});
```

## Best Practices

1. Always provide `alt` text for accessibility.
2. Use `srcset` and `sizes` for responsive images when possible.
3. Implement blur-up effect for larger images to improve perceived loading speed.
4. Use `adaptiveQuality` for images that can have varying quality based on network conditions.
5. Set `isCritical` and `preload` for above-the-fold images that should load immediately.
6. Utilize `aspectRatio` to prevent layout shifts during lazy loading.
7. Implement `errorFallback` for a better user experience when images fail to load.
8. Use `onPerformanceLog` to track and optimize image loading performance.
9. Optimize your images before using them with PreactPixelPerfect for best performance.

## Browser Support

PreactPixelPerfect uses the Intersection Observer API with a polyfill fallback, ensuring broad browser support. The blur-up effect uses the Canvas API, which is widely supported in modern browsers.

## Performance Considerations

- Use appropriately sized images for different device sizes.
- Implement proper caching strategies on your server.
- Consider using WebP format for smaller file sizes where supported.
- Adjust blur-up size and intensity based on your specific use case.
- Use `adaptiveQuality` in conjunction with server-side solutions for optimal results.
- Monitor performance metrics to identify and address bottlenecks.

## TypeScript Support

PreactPixelPerfect includes TypeScript definitions out of the box. You can import types as follows:

```typescript
import { PixelPerfectImage, PixelPerfectImageProps } from 'preact-pixelperfect';
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

PreactPixelPerfect is [MIT licensed](LICENSE).

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/yourusername/preact-pixelperfect/issues).

## Changelog

### 1.2.0

- Added adaptive quality loading based on network conditions
- Implemented preloading support for critical images
- Added error fallback functionality
- Introduced basic performance metrics tracking
- Added support for aspect ratio preservation

### 1.1.0

- Enhanced blur-up/LQIP implementation with customizable options
- Improved TypeScript support
- Performance optimizations

### 1.0.0

- Initial release
