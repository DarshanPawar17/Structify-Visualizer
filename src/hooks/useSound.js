import { useCallback, useRef } from 'react';

/**
 * A ultra-minimal tech sound hook for premium UI interactions.
 * Uses the native Web Audio API to avoid external asset loading latencies.
 */
export const useSound = () => {
  const audioCtx = useRef(null);

  const playSound = useCallback((type = 'click') => {
    // Initialize AudioContext on first interaction (required by browsers)
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioCtx.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const playChime = (freq, decay, vol, customHarmonics = null) => {
      // Additive synthesis for a richer "chime" sound
      const harmonics = customHarmonics || [1, 2, 3.5, 4.2]; // Non-integer harmonics for a metallic tech feel
      const masterGain = ctx.createGain();
      
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(vol, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);

      harmonics.forEach((h, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * h, ctx.currentTime);
        
        // Higher harmonics decay faster
        g.gain.setValueAtTime(1 / (i + 1), ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay / (i + 1));
        
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + decay);
      });
    };

    if (type === 'hover') {
      // Clean, professional, audible tactile "pop"
      playChime(400, 0.08, 0.06, [1, 1.5]);
    } else {
      // Crisp, clean, minimalistic "glass click"
      playChime(1200, 0.04, 0.02, [1, 1.2]);
      // Deeper underlying structural thud
      playChime(250, 0.1, 0.05, [1]);
    }
  }, []);

  return { playSound };
};
