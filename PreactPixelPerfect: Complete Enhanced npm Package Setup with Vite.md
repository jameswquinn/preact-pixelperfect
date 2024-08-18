# PreactPixelPerfect: Final Complete npm Package Setup with Vite (Part 1)

This document contains the first part of the necessary code and configuration files to set up the final version of PreactPixelPerfect as an npm package using Vite.

## Directory Structure

```
preact-pixelperfect/
├── src/
│   ├── index.ts
│   └── PreactPixelPerfect.tsx
├── example/
│   ├── index.html
│   └── index.tsx
├── vite.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── .gitignore
└── .npmignore
```

## Configuration Files

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    preact(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PreactPixelPerfect',
      fileName: (format) => `preact-pixelperfect.${format}.js`
    },
    rollupOptions: {
      external: ['preact'],
      output: {
        globals: {
          preact: 'preact'
        }
      }
    }
  }
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationDir": "dist",
    "emitDeclarationOnly": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### package.json

```json
{
  "name": "preact-pixelperfect",
  "version": "1.2.0",
  "description": "Advanced image loading library for Preact applications with enhanced features",
  "main": "./dist/preact-pixelperfect.umd.js",
  "module": "./dist/preact-pixelperfect.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/preact-pixelperfect.es.js",
      "require": "./dist/preact-pixelperfect.umd.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "preact": "^10.0.0"
  },
  "devDependencies": {
    "@preact/preset-vite": "^2.5.0",
    "@types/node": "^18.15.11",
    "typescript": "^5.0.2",
    "vite": "^4.3.0",
    "vite-plugin-dts": "^2.3.0"
  },
  "keywords": ["preact", "image", "lazy-loading", "performance", "blur-up", "adaptive-quality"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/preact-pixelperfect.git"
  }
}
```

### .gitignore

```
node_modules
dist
```

### .npmignore

```
src/
example/
vite.config.ts
tsconfig.json
tsconfig.node.json
.gitignore
```

## Source Code

### src/index.ts

```typescript
export { PixelPerfectImage, PreactPixelPerfect } from './PreactPixelPerfect';
```

### src/PreactPixelPerfect.tsx (Part 1)

```typescript
import { h, Component } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

interface BlurUpOptions {
  enabled: boolean;
  size?: number;
  blur?: number;
}

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
}

interface PixelPerfectImageProps {
  src?: string;
  srcset?: string;
  sizes?: string;
  bg?: string;
  bgset?: string;
  parentFit?: 'contain' | 'cover' | 'fill' | 'none';
  blurUp?: boolean | BlurUpOptions;
  iframeSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: h.JSX.Element;
  threshold?: number;
  rootMargin?: string;
  isCritical?: boolean;
  alt?: string;
  style?: h.JSX.CSSProperties;
  adaptiveQuality?: boolean;
  preload?: boolean;
  errorFallback?: string;
  aspectRatio?: number;
  onPerformanceLog?: (metrics: PerformanceMetrics) => void;
}

const defaultConfig = {
  lazyClass: 'pixelperfect-lazy',
  loadedClass: 'pixelperfect-loaded',
  loadingClass: 'pixelperfect-loading',
  errorClass: 'pixelperfect-error',
  srcAttr: 'data-pixelperfect-src',
  srcsetAttr: 'data-pixelperfect-srcset',
  sizesAttr: 'data-pixelperfect-sizes',
};

let config = { ...defaultConfig };

// ... [The rest of the PreactPixelPerfect.tsx file will be in Part 2]
```

This concludes Part 1 of the PreactPixelPerfect final setup. Part 2 will continue with the rest of the `PreactPixelPerfect.tsx` file and include the example usage and build instructions.

# PreactPixelPerfect: Final Complete npm Package Setup with Vite (Part 2)

Continuing from Part 1, here's the rest of the setup for PreactPixelPerfect.

## Source Code (continued)

### src/PreactPixelPerfect.tsx (Part 2)

```typescript
// ... [Continuing from Part 1]

const parentFit = {
  contain: (element: HTMLElement, width: number, height: number) => {
    const ratio = width / height;
    const parentRatio = element.clientWidth / element.clientHeight;
    element.style.backgroundSize = ratio > parentRatio ? '100% auto' : 'auto 100%';
  },
  cover: (element: HTMLElement, width: number, height: number) => {
    const ratio = width / height;
    const parentRatio = element.clientWidth / element.clientHeight;
    element.style.backgroundSize = ratio > parentRatio ? 'auto 100%' : '100% auto';
  },
  fill: (element: HTMLElement) => {
    element.style.backgroundSize = '100% 100%';
  },
  none: (element: HTMLElement) => {
    element.style.backgroundSize = 'auto';
  },
};

const loadIntersectionObserver = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ('IntersectionObserver' in window) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
};

const createBlurredImage = (src: string, size: number = 40, blur: number = 20): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = (size * img.height) / img.width;

      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.filter = `blur(${blur}px)`;
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
      }

      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const PixelPerfectImage: Component<PixelPerfectImageProps> = ({
  src,
  srcset,
  sizes,
  bg,
  bgset,
  parentFit: parentFitProp = 'contain',
  blurUp = false,
  iframeSrc,
  onLoad,
  onError,
  placeholder,
  threshold = 0,
  rootMargin = '200px',
  isCritical = false,
  alt,
  style,
  adaptiveQuality = false,
  preload = false,
  errorFallback,
  aspectRatio,
  onPerformanceLog,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [blurredSrc, setBlurredSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState<'high' | 'low'>('high');
  const elementRef = useRef<HTMLElement>(null);
  const [intersectionObserverLoaded, setIntersectionObserverLoaded] = useState('IntersectionObserver' in window);
  const startLoadTime = useRef<number>(0);

  const loadContent = useCallback(() => {
    if (elementRef.current) {
      startLoadTime.current = performance.now();
      if (src) {
        (elementRef.current as HTMLImageElement).src = src;
        if (srcset) (elementRef.current as HTMLImageElement).srcset = srcset;
        if (sizes) (elementRef.current as HTMLImageElement).sizes = sizes;
      } else if (bg) {
        elementRef.current.style.backgroundImage = `url('${bg}')`;
      } else if (iframeSrc) {
        (elementRef.current as HTMLIFrameElement).src = iframeSrc;
      }
      if (adaptiveQuality) {
        const connection = (navigator as any).connection;
        if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
          setQuality('low');
        }
      }
      setLoaded(true);
      if (onLoad) onLoad();
    }
  }, [src, srcset, sizes, bg, iframeSrc, onLoad, adaptiveQuality]);

  const handleError = useCallback(() => {
    setError(true);
    if (onError) onError();
    if (errorFallback && elementRef.current) {
      (elementRef.current as HTMLImageElement).src = errorFallback;
    }
  }, [onError, errorFallback]);

  useEffect(() => {
    if (!intersectionObserverLoaded && !isCritical) {
      loadIntersectionObserver()
        .then(() => setIntersectionObserverLoaded(true))
        .catch((error) => {
          console.error('Failed to load IntersectionObserver polyfill:', error);
          loadContent();
        });
    }
  }, [intersectionObserverLoaded, isCritical, loadContent]);

  useEffect(() => {
    if (blurUp && (src || bg)) {
      const blurUpOptions: BlurUpOptions = typeof blurUp === 'boolean' ? { enabled: true } : blurUp;
      const { size = 40, blur = 20 } = blurUpOptions;
      createBlurredImage(src || bg!, size, blur).then(setBlurredSrc);
    }
  }, [src, bg, blurUp]);

  useEffect(() => {
    if (preload && (src || bg)) {
      const img = new Image();
      img.src = src || bg!;
    }
  }, [preload, src, bg]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isCritical) return;

    if (intersectionObserverLoaded) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadContent();
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin, threshold }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    } else {
      loadContent();
    }
  }, [loadContent, rootMargin, threshold, isCritical, intersectionObserverLoaded]);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
    if (onPerformanceLog) {
      const loadTime = performance.now() - startLoadTime.current;
      onPerformanceLog({ loadTime, renderTime: performance.now() });
    }
  };

  const classNames = [
    config.lazyClass,
    loaded ? config.loadedClass : config.loadingClass,
    error ? config.errorClass : '',
  ].filter(Boolean).join(' ');

  const elementStyle: h.JSX.CSSProperties = {
    ...style,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    transition: 'filter 0.3s ease-out',
    filter: loaded ? 'none' : 'blur(20px)',
  };

  if (aspectRatio) {
    elementStyle.aspectRatio = `${aspectRatio}`;
  }

  if (blurredSrc && !loaded) {
    elementStyle.backgroundImage = `url(${blurredSrc})`;
  }

  const elementProps = {
    ...props,
    ref: elementRef,
    class: classNames,
    onError: handleError,
    onLoad: handleLoad,
    alt,
    style: elementStyle,
  };

  if (src) {
    elementProps[config.srcAttr] = src;
    elementProps[config.srcsetAttr] = srcset;
    elementProps[config.sizesAttr] = sizes;
  }

  let ElementType: string = 'div';
  if (src) {
    ElementType = 'img';
  } else if (iframeSrc) {
    ElementType = 'iframe';
  }

  return h(ElementType, elementProps, 
    loaded ? null : (placeholder || null)
  );
};

export const PreactPixelPerfect = {
  setConfig: (newConfig: Partial<typeof defaultConfig>) => {
    config = { ...config, ...newConfig };
  },
  PixelPerfectImage,
};
```

## Example Usage

### example/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PreactPixelPerfect Example</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/index.tsx"></script>
</body>
</html>
```

### example/index.tsx

```typescript
import { h, render } from 'preact';
import { PixelPerfectImage } from '../src/PreactPixelPerfect';

const App = () => (
  <div>
    <h1>PreactPixelPerfect Example</h1>
    <PixelPerfectImage
      src="https://picsum.photos/800/600"
      srcset="https://picsum.photos/400/300 400w, https://picsum.photos/800/600 800w"
      sizes="(max-width: 400px) 100vw, 800px"
      alt="Example image"
      blurUp={{ enabled: true, size: 60, blur: 30 }}
      adaptiveQuality={true}
      aspectRatio={4/3}
      onPerformanceLog={(metrics) => console.log('Image performance:', metrics)}
    />
  </div>
);

render(<App />, document.getElementById('app')!);
```

## Build and Publish Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Build the package:
   ```
   npm run build
   ```

3. Test the package locally:
   ```
   npm link
   cd /path/to/test-project
   npm link preact-pixelperfect
   ```

4. Publish to npm:
   ```
   npm login
   npm publish
   ```

Make sure to update the `package.json` with your information before publishing.

This concludes the complete setup for PreactPixelPerfect as an npm package using Vite. The package now includes all the enhanced features such as adaptive quality, preloading, error fallback, aspect ratio preservation, and performance logging.
