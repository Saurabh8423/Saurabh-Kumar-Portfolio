"use client";

import useTilt from "@/app/hooks/useTilt";

/**
 * A .card that tilts toward the cursor in 3D with a sheen that follows it.
 *
 * Note: `clip` adds overflow-hidden, which flattens the 3D context — use it
 * for image cards and skip the depth-* utilities inside those.
 */
export default function TiltCard({
  as: Tag = "div",
  className = "",
  /**
   * Classes for the .scene wrapper. Needed for equal-height cards: the scene
   * sits between the grid item and the card, so `h-full` on the card alone
   * resolves against the scene's auto height and never stretches. Pass
   * sceneClassName="h-full" together with className="h-full".
   */
  sceneClassName = "",
  max = 7,
  lift = 14,
  glare = true,
  clip = false,
  children,
  ...rest
}) {
  const ref = useTilt({ max, lift });

  return (
    <div className={`scene ${sceneClassName}`}>
      <Tag
        ref={ref}
        className={`card tilt ${clip ? "overflow-hidden" : ""} ${className}`}
        {...rest}
      >
        {glare && <span className="tilt-glare" aria-hidden="true" />}
        {children}
      </Tag>
    </div>
  );
}
