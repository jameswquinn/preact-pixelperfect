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
