"use client";

import { motion, useReducedMotion } from "motion/react";

import type { MascotVariant } from "@/lib/team";
import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TadadoMascotSvgProps {
  variant: MascotVariant;
  className?: string;
}

const CREAM = "#FFF9E1";
const STROKE = "#1a0a1e";
const STROKE_W = 3.5;

function CardBody({ children }: { children?: React.ReactNode }) {
  return (
    <g>
      <rect
        x="42"
        y="28"
        width="76"
        height="108"
        rx="14"
        fill={CREAM}
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {children}
    </g>
  );
}

function RectGlasses() {
  return (
    <g stroke={STROKE} strokeWidth={STROKE_W} fill="none">
      <rect x="52" y="58" width="22" height="16" rx="2" />
      <rect x="86" y="58" width="22" height="16" rx="2" />
      <line x1="74" y1="66" x2="86" y2="66" strokeWidth={STROKE_W} />
    </g>
  );
}

function RoundGlasses() {
  return (
    <g stroke={STROKE} strokeWidth={STROKE_W} fill="none">
      <circle cx="63" cy="66" r="11" />
      <circle cx="97" cy="66" r="11" />
      <line x1="74" y1="66" x2="86" y2="66" strokeWidth={STROKE_W} />
    </g>
  );
}

function HappyEyes() {
  return (
    <g stroke={STROKE} strokeWidth={STROKE_W} fill="none" strokeLinecap="round">
      <path d="M56 72 Q63 78 70 72" />
      <path d="M90 72 Q97 78 104 72" />
    </g>
  );
}

function Nose() {
  return (
    <path
      d="M78 82 Q80 86 78 90"
      stroke={STROKE}
      strokeWidth={STROKE_W}
      fill="none"
      strokeLinecap="round"
    />
  );
}

function Stubble() {
  return (
    <g stroke={STROKE} strokeWidth={2} strokeLinecap="round" opacity={0.55}>
      <line x1="62" y1="98" x2="64" y2="100" />
      <line x1="70" y1="100" x2="72" y2="102" />
      <line x1="78" y1="101" x2="80" y2="103" />
      <line x1="86" y1="100" x2="88" y2="102" />
      <line x1="94" y1="98" x2="96" y2="100" />
    </g>
  );
}

function Hair() {
  return (
    <path
      d="M44 42 Q52 18 80 22 Q108 18 116 42 Q112 36 80 34 Q48 36 44 42"
      fill={STROKE}
      stroke={STROKE}
      strokeWidth={STROKE_W}
      strokeLinejoin="round"
    />
  );
}

function Glove({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="10" ry="8" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <line x1="-6" y1="4" x2="-6" y2="10" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <line x1="-2" y1="5" x2="-2" y2="11" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <line x1="2" y1="5" x2="2" y2="11" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <line x1="6" y1="4" x2="6" y2="9" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

function Shoe({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx="12" ry="7" fill={STROKE} />
      <ellipse cx={x - 3} cy={y} rx="4" ry="2" fill="white" opacity={0.9} />
    </g>
  );
}

function Laptop() {
  return (
    <g transform="translate(18 108) rotate(-12)">
      <rect x="0" y="0" width="34" height="24" rx="3" fill="#2E004B" stroke={STROKE} strokeWidth={2.5} />
      <rect x="3" y="3" width="28" height="16" rx="1" fill="#6B4C9A" />
      <rect x="-2" y="22" width="38" height="4" rx="1" fill={CREAM} stroke={STROKE} strokeWidth={2} />
    </g>
  );
}

function Stylus() {
  return (
    <g transform="translate(128 96) rotate(24)">
      <rect x="0" y="0" width="4" height="28" rx="2" fill="#F5B942" stroke={STROKE} strokeWidth={2} />
      <polygon points="2,28 0,36 4,36" fill={STROKE} />
    </g>
  );
}

function ErenFace() {
  return (
    <>
      <RectGlasses />
      <HappyEyes />
      <Nose />
      <Stubble />
    </>
  );
}

function NurFace() {
  return (
    <>
      <Hair />
      <RoundGlasses />
      <HappyEyes />
      <Nose />
    </>
  );
}

function BaseFace() {
  return (
    <>
      <RectGlasses />
      <HappyEyes />
      <Nose />
    </>
  );
}

export function TadadoMascotSvg({ variant, className }: TadadoMascotSvgProps) {
  const reduceMotion = useReducedMotion();

  const armMotion = reduceMotion
    ? {}
    : {
        whileHover: { rotate: [0, -10, 10, -6, 0] },
        transition: { ...springSnappy, duration: 0.6 },
      };

  const bodyMotion = reduceMotion
    ? {}
    : {
        whileHover: { y: [0, -4, 0] },
        transition: springSnappy,
      };

  return (
    <motion.svg
      viewBox="0 0 160 220"
      className={cn("h-auto w-full max-w-[180px]", className)}
      aria-hidden
      {...bodyMotion}
    >
      {/* Left leg */}
      <path
        d="M68 136 Q62 168 58 188"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        fill="none"
        strokeLinecap="round"
      />
      <Shoe x={58} y={188} />

      {/* Right leg */}
      <path
        d="M92 136 Q98 168 102 188"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        fill="none"
        strokeLinecap="round"
      />
      <Shoe x={102} y={188} />

      {/* Left arm — points up */}
      <motion.g style={{ originX: "68px", originY: "132px" }} {...armMotion}>
        <path
          d="M42 120 Q22 100 18 72"
          stroke={STROKE}
          strokeWidth={STROKE_W}
          fill="none"
          strokeLinecap="round"
        />
        <Glove cx={18} cy={68} />
        {variant === "eren" ? <Laptop /> : null}
        {variant === "nur" ? <Stylus /> : null}
      </motion.g>

      {/* Right arm — hand to face */}
      <path
        d="M118 120 Q132 108 128 88"
        stroke={STROKE}
        strokeWidth={STROKE_W}
        fill="none"
        strokeLinecap="round"
      />
      <Glove cx={128} cy={84} scale={0.9} />

      <CardBody>
        {variant === "eren" ? <ErenFace /> : null}
        {variant === "nur" ? <NurFace /> : null}
        {variant === "base" ? <BaseFace /> : null}
      </CardBody>
    </motion.svg>
  );
}
