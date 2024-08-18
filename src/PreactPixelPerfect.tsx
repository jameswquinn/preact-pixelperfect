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
