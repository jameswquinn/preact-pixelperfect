# PreactPixelPerfect: Complete npm Package Setup with Vite

This document contains all the necessary configuration files and instructions to set up PreactPixelPerfect as an npm package using Vite.

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
└── .gitignore
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

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "jsxImportSource": "preact",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Declaration */
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
  "version": "1.0.0",
  "description": "Advanced image loading library for Preact applications",
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
  "keywords": ["preact", "image", "lazy-loading", "performance"],
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

## Setup Instructions

1. Create the project structure as shown in the directory structure above.

2. Copy the configuration files (`vite.config.ts`, `tsconfig.json`, `package.json`, `.gitignore`) into their respective locations.

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Implement your `PreactPixelPerfect.tsx` and `index.ts` files in the `src` directory.

5. Create an example in the `example` directory to showcase and test your component.

6. Build the package:
   ```bash
   npm run build
   ```

7. Test the package locally:
   ```bash
   npm link
   cd /path/to/test-project
   npm link preact-pixelperfect
   ```

8. When ready to publish:
   ```bash
   npm login
   npm publish
   ```

## Additional Notes

- Make sure to update the `"author"`, `"repository"`, and other relevant fields in `package.json` with your information.
- Create a comprehensive README.md file with usage instructions and examples.
- Consider setting up ESLint and Prettier for code quality and consistency.
- Set up a CI/CD pipeline for automated testing and deployment.

This setup provides a solid foundation for building and publishing PreactPixelPerfect as an npm package. It uses Vite for fast building, TypeScript for type safety, and includes configurations for proper packaging and distribution.
