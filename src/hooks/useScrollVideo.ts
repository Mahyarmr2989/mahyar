import { useEffect, useRef, type RefObject } from 'react';

interface UseScrollVideoOptions {
  /** The tall scroll container (e.g. 300vh). Scroll progress is measured against it. */
  sectionRef: RefObject<HTMLElement>;
  /** The <video> element whose timeline is scrubbed by scroll. */
  videoRef: RefObject<HTMLVideoElement>;
  /** Optional overlay element (hero text) that fades/moves as the user scrolls. */
  textRef?: RefObject<HTMLElement>;
  /** Interpolation factor (0–1). Higher = snappier, lower = smoother. ~0.2 is premium. */
  smoothing?: number;
  /** Master switch — disables the whole system (e.g. reduced-motion / fallback). */
  enabled?: boolean;
}

/**
 * Scroll-driven video scrubbing.
 *
 * The scroll handler ONLY records a target progress (cheap, passive). All
 * `video.currentTime` writes happen inside a single requestAnimationFrame loop
 * that eases the rendered time toward the target, preventing seek floods and
 * harsh frame jumps while staying tightly coupled to the scroll position.
 *
 * The video is never played — we scrub its timeline, never call play() for the
 * main experience. (A one-time muted play()+pause() unlock is applied on touch
 * devices only, because iOS blocks currentTime changes on an un-activated
 * <video> until a user gesture occurs — scrolling is that gesture.)
 *
 * Encoding note: for buttery random-access seeking the source video should be
 * H.264 MP4 (or VP9/AV1 WebM) with frequent keyframes (~1–2s), a web-optimized
 * `moov` atom (faststart), moderate bitrate, and no oversized resolution.
 */
export function useScrollVideo({
  sectionRef,
  videoRef,
  textRef,
  smoothing = 0.2,
  enabled = true,
}: UseScrollVideoOptions) {
  const targetProgress = useRef(0);
  const renderedTime = useRef(0);
  const rafRef = useRef(0);
  const unlockedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0);

    const measure = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetProgress.current = 0;
        return;
      }
      const top = section.getBoundingClientRect().top;
      targetProgress.current = Math.min(1, Math.max(0, -top / scrollable));
    };

    // One-time iOS unlock: a muted play() then immediate pause() "activates"
    // the element so subsequent currentTime writes are honoured. Desktop never
    // reaches this branch, so play() is never called there.
    const unlock = () => {
      if (unlockedRef.current || !isTouch) return;
      unlockedRef.current = true;
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => {});
      }
    };

    const onScroll = () => {
      measure();
      unlock();
    };

    const loop = () => {
      if (video && video.duration && Number.isFinite(video.duration)) {
        const target = targetProgress.current * video.duration;
        // Snap to the exact ends so the first/last frame always line up.
        if (targetProgress.current >= 0.999) {
          renderedTime.current = video.duration;
        } else if (targetProgress.current <= 0.001) {
          renderedTime.current = 0;
        } else {
          renderedTime.current += (target - renderedTime.current) * smoothing;
        }
        // Only seek when the change is meaningful — avoids seek flooding.
        if (Math.abs(renderedTime.current - video.currentTime) > 0.008) {
          video.currentTime = renderedTime.current;
        }
      }
      if (textRef.current) {
        const p = targetProgress.current;
        // Text fully visible at the start, gone by ~30% scroll.
        textRef.current.style.opacity = String(Math.max(0, 1 - p * 3.2));
        textRef.current.style.transform = `translate3d(0, ${p * -50}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(loop);
    measure();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
    // Re-run if the video src/duration becomes known (readyState change handled
    // by the component via `enabled` toggling once metadata is loaded).
  }, [enabled, smoothing, sectionRef, videoRef, textRef]);
}
