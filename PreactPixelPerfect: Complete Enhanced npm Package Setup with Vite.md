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
