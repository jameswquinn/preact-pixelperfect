# PreactPixelPerfect Advanced Usage Examples

These examples demonstrate advanced usage of the PreactPixelPerfect component, showcasing its various features and capabilities.

## 1. Responsive Image with srcset and sizes

This example shows how to use `srcset` and `sizes` for responsive images, along with the blur-up effect and performance logging.

```jsx
import { h } from 'preact';
import { PixelPerfectImage } from 'preact-pixelperfect';

const ResponsiveImage = () => (
  <PixelPerfectImage
    src="image-1000w.jpg"
    srcset="image-300w.jpg 300w, image-600w.jpg 600w, image-1000w.jpg 1000w"
    sizes="(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw"
    alt="Responsive image example"
    blurUp={{ enabled: true, size: 30, blur: 10 }}
    onPerformanceLog={(metrics) => console.log('Image performance:', metrics)}
  />
);
```

## 2. Background Image with Adaptive Quality

This example demonstrates using PreactPixelPerfect for a background image with adaptive quality based on network conditions.

```jsx
import { h } from 'preact';
import { PixelPerfectImage } from 'preact-pixelperfect';

const AdaptiveBackgroundImage = () => (
  <PixelPerfectImage
    bg="background-high-quality.jpg"
    bgset="background-low-quality.jpg 1x, background-high-quality.jpg 2x"
    style={{ width: '100%', height: '300px' }}
    adaptiveQuality={true}
    parentFit="cover"
    aspectRatio={16/9}
  />
);
```

## 3. Critical Image with Error Fallback

This example shows how to load a critical image immediately and provide a fallback in case of an error.

```jsx
import { h } from 'preact';
import { PixelPerfectImage } from 'preact-pixelperfect';

const CriticalImage = () => (
  <PixelPerfectImage
    src="critical-image.jpg"
    srcset="critical-image-300w.jpg 300w, critical-image-600w.jpg 600w"
    sizes="(max-width: 300px) 100vw, 50vw"
    alt="Critical content"
    isCritical={true}
    errorFallback="error-fallback.jpg"
    onError={() => console.log('Image failed to load')}
  />
);
```

## 4. Lazy-Loaded iframe with Custom Placeholder

This example demonstrates lazy-loading an iframe with a custom placeholder.

```jsx
import { h } from 'preact';
import { PixelPerfectImage } from 'preact-pixelperfect';

const LazyIframe = () => (
  <PixelPerfectImage
    iframeSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
    style={{ width: '560px', height: '315px' }}
    placeholder={<div>Loading video...</div>}
    threshold={0.1}
    rootMargin="20px"
  />
);
```

## 5. Art Direction with `<picture>` Element

This example shows how to use PreactPixelPerfect within a `<picture>` element for art direction.

```jsx
import { h } from 'preact';
import { PixelPerfectImage } from 'preact-pixelperfect';

const ArtDirectionImage = () => (
  <picture>
    <source 
      media="(max-width: 799px)"
      srcset="image-480w.jpg 480w, image-800w.jpg 800w"
      sizes="(max-width: 799px) 100vw, 50vw"
    />
    <source 
      media="(min-width: 800px)"
      srcset="image-800w.jpg 800w, image-1600w.jpg 1600w"
      sizes="(min-width: 800px) 50vw, 100vw"
    />
    <PixelPerfectImage
      src="image-800w.jpg"
      alt="Art direction example"
      blurUp={true}
      adaptiveQuality={true}
    />
  </picture>
);
```

## 6. Combining Multiple Features

This example combines multiple features of PreactPixelPerfect, including responsive images, blur-up effect, adaptive quality, and performance logging.

```jsx
import { h } from 'preact';
import { PixelPerfectImage } from 'preact-pixelperfect';

const AdvancedImage = () => (
  <PixelPerfectImage
    src="image-1000w.jpg"
    srcset="image-300w.jpg 300w, image-600w.jpg 600w, image-1000w.jpg 1000w"
    sizes="(max-width: 300px) 100vw, (max-width: 600px) 50vw, 33vw"
    alt="Advanced example"
    blurUp={{ enabled: true, size: 40, blur: 15 }}
    adaptiveQuality={true}
    aspectRatio={4/3}
    onPerformanceLog={(metrics) => console.log('Image performance:', metrics)}
    onLoad={() => console.log('Image loaded')}
    onError={() => console.log('Image failed to load')}
    errorFallback="fallback-image.jpg"
    style={{ maxWidth: '100%' }}
  />
);
```

These examples showcase the versatility and power of the PreactPixelPerfect component. By leveraging features like `srcset`, adaptive quality, blur-up effects, and performance logging, you can create highly optimized and responsive image loading solutions for your Preact applications.
