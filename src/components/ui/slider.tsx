"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../lib/utils";

if (typeof globalThis !== "undefined" && !globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-md bg-slate-200">
      <SliderPrimitive.Range className="absolute h-full rounded-md bg-blue-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-4 w-4 rounded-md border-2 border-blue-600 bg-white shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
      aria-label={props["aria-label"]}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

const SliderTrack = SliderPrimitive.Track;
const SliderRange = SliderPrimitive.Range;
const SliderThumb = SliderPrimitive.Thumb;

export { Slider, SliderTrack, SliderRange, SliderThumb };

