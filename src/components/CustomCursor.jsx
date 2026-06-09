import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX  = useMotionValue(-100);
  const cursorY  = useMotionValue(-100);
  const trailX   = useMotionValue(-100);
  const trailY   = useMotionValue(-100);

  // Spring config for the trailing ring
  const springX = useSpring(trailX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(trailY, { stiffness: 120, damping: 20, mass: 0.5 });

  const isHovering = useRef(false);
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const onEnter = (e) => {
      if (e.target.closest('a,button,[role=button]')) {
        isHovering.current = true;
        dotRef.current?.classList.add('cursor-hover');
        ringRef.current?.classList.add('ring-hover');
      }
    };
    const onLeave = () => {
      isHovering.current = false;
      dotRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('ring-hover');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout',  onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout',  onLeave);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Inner dot — snaps instantly */}
      <motion.div ref={dotRef}
        className="cursor-dot"
        style={{ translateX: cursorX, translateY: cursorY }}
      />
      {/* Outer ring — lags behind with spring */}
      <motion.div ref={ringRef}
        className="cursor-ring"
        style={{ translateX: springX, translateY: springY }}
      />
    </>
  );
}
