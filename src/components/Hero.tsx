'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { px } from '@/lib/images';
import { useScrollVideo } from '@/hooks/useScrollVideo';

/**
 * Scroll-driven cinematic hero.
 *
 * The hero section is ~300vh tall; a 100vh sticky viewport pins the video while
 * the user scrolls through it. Scroll position maps 0→100% onto the video
 * timeline (scrubbed via requestAnimationFrame, never played). The existing
 * hero copy is overlaid and gently fades away as the journey begins.
 *
 * See src/hooks/useScrollVideo.ts for the scroll→timeline engine.
 */

// Provided hero video (Base44 media CDN).
const VIDEO_SRC =
  'https://media.base44.com/videos/public/6ac55f0fab13f37a92505166/4c7b72112_jygj4zmvmzz5tglqfgvuu264l4.mp4';
// Original hero image — shown immediately while the video buffers and kept as a
// fallback if the video fails to load.
const FALLBACK_IMAGE = px(4127641, 1600);
// Scroll distance dedicated to traversing the whole video. ~300vh gives a
// comfortable, cinematic pace without dragging.
const SCROLL_DISTANCE_VH = 300;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Respect prefers-reduced-motion: render a static hero instead.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Detect video readiness robustly. The canplaythrough event can fire before
  // React attaches its handler (cached / instant load), so we also poll
  // readyState: HAVE_FUTURE_DATA (3) is enough to begin scrubbing.
  useEffect(() => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    let done = false;
    const check = () => {
      if (done) return;
      if (v.readyState >= 3 && Number.isFinite(v.duration)) {
        done = true;
        setVideoReady(true);
        clearInterval(id);
      }
    };
    check();
    const id = window.setInterval(check, 200);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const useScroll = !reducedMotion && !videoFailed;

  useScrollVideo({
    sectionRef,
    videoRef,
    textRef,
    enabled: useScroll && videoReady,
  });

  // Static hero (reduced motion or video failure) — full-bleed image, no scroll pin.
  if (reducedMotion || videoFailed) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-ivory">
        <img
          src={FALLBACK_IMAGE}
          alt="A woman carrying a CarryClub handbag in soft natural light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        <HeroCopy className="text-white" />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${SCROLL_DISTANCE_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ivory">
        {/* Base image: always present so there's never a black rectangle. */}
        <img
          src={FALLBACK_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Scroll-driven video, faded in once enough has buffered. */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-elegant"
          style={{ opacity: videoReady ? 1 : 0 }}
          preload="auto"
          muted
          playsInline
          // No autoPlay, no loop — the timeline is scrubbed by scroll only.
          onLoadedMetadata={() => {
            // Ensure the first frame is rendered before we start scrubbing.
            const v = videoRef.current;
            if (v) {
              try {
                v.currentTime = 0;
              } catch {
                /* ignore — will be set on first scroll */
              }
            }
          }}
          onCanPlayThrough={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />

        {/* Very subtle readability gradient — keeps the video dominant. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30" />

        {/* Minimal loading treatment — a thin shimmer line, gone once ready. */}
        {!videoReady && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full overflow-hidden bg-white/15">
            <div className="h-full w-1/3 animate-[heroShimmer_1.4s_ease-in-out_infinite] bg-white/60" />
          </div>
        )}

        {/* Hero copy overlay — fades & lifts away as the journey begins. */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <HeroCopy className="text-white" animate />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero copy — kept identical to the original hero text, recoloured for        */
/* legibility over video. Rendered as an overlay in the cinematic hero and    */
/* inline in the static fallback.                                             */
/* -------------------------------------------------------------------------- */

function HeroCopy({ className = '', animate = false }: { className?: string; animate?: boolean }) {
  const delay = (s: string) => (animate ? { animationDelay: s } : undefined);
  const anim = animate ? 'animate-fadeUp' : '';
  return (
    <div className={className}>
      <p className="eyebrow mb-5 text-white/80" style={delay('0.1s')}>
        New Collection · Autumn 2026
      </p>
      <h1 className="font-serif text-hero">
        <span className={`block ${anim}`} style={delay('0.18s')}>
          CARRY
        </span>
        <span
          className={`block italic text-sage-200 ${anim}`}
          style={delay('0.3s')}
        >
          fashion in
        </span>
        <span className={`block ${anim}`} style={delay('0.42s')}>
          every step
        </span>
      </h1>
      <p
        className={`mx-auto mt-7 max-w-md text-[16px] leading-relaxed text-white/85 ${anim}`}
        style={delay('0.56s')}
      >
        Your bags aren&apos;t just accessories — they&apos;re an integral part of your style journey.
      </p>
      <div className={`mt-9 ${anim}`} style={delay('0.7s')}>
        <Link
          href="/shop"
          className="btn border border-white/80 text-white hover:bg-white hover:text-charcoal"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
