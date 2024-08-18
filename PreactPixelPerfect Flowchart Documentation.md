# PreactPixelPerfect Component Flowchart

The following flowchart illustrates the main processes and decision points in the PreactPixelPerfect component. This visual representation helps in understanding the component's flow and functionality at a glance.

```mermaid
graph TD
    A[Start] --> B{Is IntersectionObserver supported?}
    B -->|Yes| C[Initialize with native IntersectionObserver]
    B -->|No| D[Load IntersectionObserver polyfill]
    D --> E{Polyfill loaded successfully?}
    E -->|Yes| C
    E -->|No| F[Fallback to immediate loading]
    
    C --> G{Is image critical?}
    F --> G
    G -->|Yes| H[Load content immediately]
    G -->|No| I[Set up IntersectionObserver]
    
    I --> J{Image in viewport?}
    J -->|No| K[Wait for image to enter viewport]
    J -->|Yes| L[Trigger content loading]
    K --> J
    
    L --> M{Is adaptive quality enabled?}
    M -->|Yes| N[Check network conditions]
    N --> O{Slow connection?}
    O -->|Yes| P[Set low quality]
    O -->|No| Q[Set high quality]
    M -->|No| Q
    
    P --> R[Load content]
    Q --> R
    H --> R
    
    R --> S{Is blur-up enabled?}
    S -->|Yes| T[Generate and display blurred placeholder]
    S -->|No| U[Display placeholder or nothing]
    
    T --> V[Load full image]
    U --> V
    
    V --> W{Image loaded successfully?}
    W -->|Yes| X[Display full image]
    W -->|No| Y{Error fallback provided?}
    Y -->|Yes| Z[Display fallback image]
    Y -->|No| AA[Display error state]
    
    X --> AB[Apply parent fit if applicable]
    Z --> AB
    AA --> AB
    
    AB --> AC[Log performance metrics if enabled]
    
    AC --> AD[End]
```

## Flowchart Explanation

1. **Initialization**: 
   - The component first checks if the browser supports IntersectionObserver.
   - If not supported, it attempts to load a polyfill.
   - If the polyfill fails to load, it falls back to immediate loading.

2. **Critical Image Handling**:
   - If the image is marked as critical, it's loaded immediately.
   - Otherwise, it sets up lazy loading using IntersectionObserver.

3. **Lazy Loading**:
   - The component waits for the image to enter the viewport before loading.

4. **Adaptive Quality**:
   - If enabled, the component checks network conditions.
   - For slow connections, it loads a lower quality image.

5. **Blur-up Effect**:
   - If enabled, a blurred placeholder is generated and displayed while the full image loads.

6. **Image Loading**:
   - The full image is loaded.
   - If loading fails, it checks for a fallback image or displays an error state.

7. **Final Steps**:
   - Applies parent fit for background images if applicable.
   - Logs performance metrics if enabled.

This flowchart provides a high-level overview of how PreactPixelPerfect works, including its key features like lazy loading, adaptive quality, blur-up effect, and error handling. It's a useful visual aid for understanding the component's logic and can be helpful for both developers working on the component and those integrating it into their projects.
