/**
 * Advanced design mathematics and fluid layout utilities
 * Implements golden-ratio scaling, neuroaesthetic principles and procedural variations
 */

// The golden ratio constant (φ)
export const PHI = 1.618033988749895;

/**
 * Golden ratio-based scaling calculator
 * Applies the divine proportion to any dimension based on the base value
 */
export function goldenScale(baseValue: number, level: number = 1): number {
  return level > 0
    ? baseValue * Math.pow(PHI, level)
    : baseValue / Math.pow(PHI, Math.abs(level));
}

/**
 * Creates golden section coordinates for layout composition
 * Returns points that divide space according to the golden ratio
 */
export function createGoldenGrid(
  width: number,
  height: number
): {
  points: { x: number; y: number }[];
  sections: { width: number; height: number }[];
} {
  // Golden section points
  const xPhi = width / PHI;
  const yPhi = height / PHI;

  // Create golden ratio grid points
  const points = [
    { x: 0, y: 0 },
    { x: width - xPhi, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height - yPhi },
    { x: width - xPhi, y: height - yPhi },
    { x: width, y: height - yPhi },
    { x: 0, y: height },
    { x: width - xPhi, y: height },
    { x: width, y: height },
  ];

  // Golden ratio sections (rectangles)
  const sections = [
    // Major sections
    { width: width - xPhi, height: height - yPhi }, // Top-left large section
    { width: xPhi, height: height - yPhi }, // Top-right section
    { width: width - xPhi, height: yPhi }, // Bottom-left section
    { width: xPhi, height: yPhi }, // Bottom-right small section

    // Secondary sections (further divisions)
    { width: (width - xPhi) / PHI, height: (height - yPhi) / PHI },
    { width: xPhi / PHI, height: yPhi / PHI },
  ];

  return { points, sections };
}

/**
 * Dynamic fluid movement calculator
 * Creates natural-looking motion based on cursor position
 */
export function calculateFluidMovement(
  cursorX: number,
  cursorY: number,
  elementX: number,
  elementY: number,
  intensity: number = 0.05,
  maxDistance: number = 500,
  dampening: number = 2.5
): { x: number; y: number } {
  // Calculate distance between cursor and element
  const deltaX = cursorX - elementX;
  const deltaY = cursorY - elementY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Apply inverse square law with dampening for natural falloff
  const force = Math.min(maxDistance, distance) / maxDistance;
  const decay = 1 / (Math.pow(force * dampening, 2) + 1);

  // Calculate movement with natural easing
  const moveX = deltaX * intensity * decay;
  const moveY = deltaY * intensity * decay;

  return { x: moveX, y: moveY };
}

/**
 * Generate a procedural variation value based on a seed
 * Creates subtle uniqueness for layouts
 */
export function proceduralVariation(
  seed: string,
  min: number = -5,
  max: number = 5
): number {
  // Simple hash function to convert string to number
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Map the hash to a value between min and max
  const normalizedHash = (hash % 1000) / 1000; // Value between 0 and 1
  return min + normalizedHash * (max - min);
}

/**
 * Silk-like animation curve
 * Mimics the natural movement of silk fabric
 */
export const silkEasing = [0.22, 0.61, 0.36, 1] as const;

/**
 * Calculate a natural, silk-like motion path
 * @param progress Animation progress from 0 to 1
 * @returns An array of [x, y] coordinates representing the position
 */
export function silkMotionPath(progress: number): [number, number] {
  // Bezier curve calculation for silk-like movement
  const p0 = { x: 0, y: 0 };
  const p1 = { x: 0.1, y: -0.25 };
  const p2 = { x: 0.4, y: 1.25 };
  const p3 = { x: 1, y: 1 };

  // Cubic Bezier formula
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;

  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;

  // Calculate the x and y values at time t
  const t = progress;
  const t2 = t * t;
  const t3 = t2 * t;

  const x = ax * t3 + bx * t2 + cx * t + p0.x;
  const y = ay * t3 + by * t2 + cy * t + p0.y;

  return [x, y];
}

/**
 * Creates a unique identifier for the user based on available information
 * Used to generate consistent but unique procedural variations
 */
export function generateClientId(): string {
  // Try to get a consistent identifier based on user agent, screen size, etc.
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const screenInfo =
    typeof screen !== "undefined"
      ? `${screen.width}x${screen.height}x${screen.colorDepth}`
      : "";
  const timeInfo = new Date().getTimezoneOffset();

  // Combine information
  return `${userAgent}|${screenInfo}|${timeInfo}`;
}

/**
 * Calculates a neuroaesthetically pleasing spacing value
 * Based on research about visual perception and cognitive load
 */
export function neuroSpacing(
  baseSize: number,
  importance: number = 1,
  tension: number = 0.5
): number {
  // Higher importance = more breathing space
  // Higher tension = more compact
  const spacingRatio = ((PHI - 1) * importance) / tension;
  return baseSize * spacingRatio;
}
