import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const SCROLL_HEIGHT_MULTIPLIER = 18; // px per frame for smooth scrub

// Build frame paths
const frameUrls = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/headphone_frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

const HeadphoneScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = [];

    // Render a frame to canvas with "object-fit: cover"
    const renderFrame = (index) => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
      const img = images[idx];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cAspect = canvas.width / canvas.height;
      const iAspect = img.naturalWidth / img.naturalHeight;
      let dw, dh, dx, dy;

      if (iAspect > cAspect) {
        dh = canvas.height;
        dw = dh * iAspect;
        dx = (canvas.width - dw) / 2;
        dy = 0;
      } else {
        dw = canvas.width;
        dh = dw / iAspect;
        dx = 0;
        dy = (canvas.height - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Resize canvas to window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndexRef.current.value);
    };

    // Preload images
    let loaded = 0;
    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        if (i === 0 || loaded === FRAME_COUNT) {
          resize();
          renderFrame(0);
        }
      };
      images[i] = img;
    });
    imagesRef.current = images;

    // GSAP ScrollTrigger: scrub frame index
    const tween = gsap.to(frameIndexRef.current, {
      value: FRAME_COUNT - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.15,
        onUpdate: () => {
          renderFrame(frameIndexRef.current.value);
        },
      },
    });

    // Overlay animations: compute progress as % of scroll container
    const overlays = [
      { id: 'hp-hero',  startPct: 0,    endPct: 0.15  },
      { id: 'hp-eng',   startPct: 0.12, endPct: 0.40  },
      { id: 'hp-nc',    startPct: 0.38, endPct: 0.65  },
      { id: 'hp-sound', startPct: 0.63, endPct: 0.85  },
      { id: 'hp-cta',   startPct: 0.83, endPct: 1.0   },
    ];

    overlays.forEach(({ id, startPct, endPct }) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const fadeInEnd = startPct + (endPct - startPct) * 0.2;
          const fadeOutStart = startPct + (endPct - startPct) * 0.8;

          let opacity = 0;
          if (p >= startPct && p <= endPct) {
            if (p < fadeInEnd) {
              opacity = (p - startPct) / (fadeInEnd - startPct);
            } else if (p > fadeOutStart) {
              opacity = 1 - (p - fadeOutStart) / (endPct - fadeOutStart);
            } else {
              opacity = 1;
            }
          }
          el.style.opacity = Math.max(0, Math.min(1, opacity));
        },
      });
    });

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hp-scroll-container"
      style={{ height: `${FRAME_COUNT * SCROLL_HEIGHT_MULTIPLIER}px` }}
    >
      <div className="hp-sticky-viewport">
        {/* Canvas */}
        <canvas ref={canvasRef} className="hp-canvas" />

        {/* Stage 1: Hero (0–15%) */}
        <div className="hp-overlay hp-stage-hero" id="hp-hero">
          <div className="hp-hero-pill">✦ Interactive Learning Platform</div>
          <h1 className="hp-hero-title">
            Structify
          </h1>
          <p className="hp-hero-subtitle">Visualize Data Structures Like Never Before.</p>
          <p className="hp-hero-tagline">
            Interactive DSA visualization, re‑engineered for a world that never stops learning.
          </p>
        </div>

        {/* Stage 2: Visualization (15–40%) */}
        <div className="hp-overlay hp-stage-eng" id="hp-eng">
          <div className="hp-card">
            <span className="hp-card-label">Visualization</span>
            <h2 className="hp-card-title">See how data<br />structures work.</h2>
            <p className="hp-card-text">
              <ul>
                <li>Step-by-step animations for every insert, delete, and search operation.</li>
                <li>Support for 8+ data structures: Stacks, Queues, Trees, Heaps, and more.</li>
                <li>Real code examples alongside every visual to bridge theory and practice.</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Stage 3: AI Learning (40–65%) */}
        <div className="hp-overlay hp-stage-nc" id="hp-nc">
          <div className="hp-card">
            <span className="hp-card-label">AI-Powered</span>
            <h2 className="hp-card-title">Learn smarter<br />with Structify AI.</h2>
            <p className="hp-card-text">
              <ul>
                <li>Each visualizer has a specialized AI assistant for instant explanations.</li>
                <li>Ask questions and get step-by-step solutions in real time.</li>
                <li>Master complex concepts with personalized, contextual guidance.</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Stage 4: Mastery (65–85%) */}
        <div className="hp-overlay hp-stage-sound" id="hp-sound">
          <div className="hp-card">
            <span className="hp-card-label">Mastery</span>
            <h2 className="hp-card-title">From understanding<br />to mastery.</h2>
            <p className="hp-card-text">
              <ul>
                <li>65% better retention through visual learning over traditional methods.</li>
                <li>3x faster concept comprehension with interactive animations.</li>
                <li>Perfect for interview prep, coursework, and competitive programming.</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Stage 5: CTA (85–100%) */}
        <div className="hp-overlay hp-stage-cta" id="hp-cta">
          <h2 className="hp-cta-title">
            See it. Understand it.<br />Master it.
          </h2>
          <p className="hp-cta-subtitle">
            Structify. Designed for understanding, crafted for mastery.
          </p>
          <div className="hp-cta-buttons">
            <HashLink smooth to="/#DataStructure" className="hp-btn-primary">
              Start Visualizing
            </HashLink>
            <Link to="/documentation" className="hp-btn-secondary">
              See full docs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadphoneScroll;
