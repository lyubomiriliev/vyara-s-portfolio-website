# Video Optimization Plan

## Problem
890MB of MP4 files in `/public/work` (70 files). Browser fetches all video `src` attributes
upfront even for off-screen cards, causing lag on the /work page.

## Step 1 — Move videos to CDN

Recommended: **Bunny.net** (~$0.01/GB storage, free egress after setup, great for video)
Alternative: **Cloudflare R2** (free egress, S3-compatible)

After uploading, update `videoSrc` paths in `data/projects.ts` from:
```
/work/REELS/web/filename.mp4
```
to:
```
https://your-cdn-zone.b-cdn.net/work/REELS/web/filename.mp4
```

## Step 2 — Apply lazy-src fix in WorkPage

Currently all `<video src={project.videoSrc}>` elements have their src set from the start,
so the browser pre-fetches all 70 videos simultaneously even when off-screen.

**Fix:** set `src` via state only after `IntersectionObserver` fires on that card.

In `FeedCard` inside `components/pages/WorkPage.tsx`, change the video element like this:

```tsx
// Add lazySrc state alongside existing state
const [lazySrc, setLazySrc] = useState<string | undefined>(undefined);

// Replace the existing autoplay IntersectionObserver useEffect with this:
useEffect(() => {
  const el = videoRef.current;
  if (!el || !isVideo) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setLazySrc(project.videoSrc);   // only NOW set the src
        setInView(true);
      }
    },
    { rootMargin: "200px" }, // start loading slightly before visible
  );
  observer.observe(el);
  return () => observer.disconnect();
}, [isVideo, project.videoSrc]);

// Use lazySrc instead of project.videoSrc on the <video> element:
<video
  ref={videoRef}
  src={lazySrc}           // undefined until in view — no prefetch
  muted
  loop
  playsInline
  preload="none"
  className="absolute inset-0 w-full h-full object-cover"
  onLoadedData={() => setVideoLoaded(true)}
/>
```

## Result after both steps
- Zero network cost for off-screen videos
- Only the ~4-8 cards visible in the viewport load and autoplay at any time
- CDN handles fast delivery when user scrolls and new cards enter view
- Build size drops from ~890MB to near zero
