import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const IntroScene: FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const scene = {
    label: "Inspire from this scene",
    headline: "Inspire from this scene",
    body: "Inspire from this scene",
    accent: "Inspire from this scene",
    listItems: ["Inspire from this scene"],
  };
  const containerReveal = spring({
    fps,
    frame,
    config: {
      damping: 24,
      stiffness: 120,
      mass: 0.9,
    },
  });

  const progressWidth = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-white px-16 py-20"
      style={{ fontFamily: SYSTEM_FONT, color: "#0f172a" }}
    >
      <div className="mb-14 h-1.5 w-full rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div
        className="flex h-full flex-col justify-between"
        style={{
          opacity: containerReveal,
          transform: `translateY(${(1 - containerReveal) * 28}px)`,
        }}
      >
        <div>
          <p className="mb-6 text-[30px] font-medium uppercase tracking-[0.28em] text-slate-500">
            {scene.label}
          </p>
          <h1 className="max-w-[820px] text-[112px] font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950">
            {scene.headline}
          </h1>
          <p className="mt-8 max-w-[760px] text-[40px] leading-[1.25] text-slate-600">
            {scene.body}
          </p>
        </div>

        <div className="space-y-5">
          {scene.listItems?.map((item, index) => {
            const reveal = spring({
              fps,
              frame: frame - 8 - index * 18,
              config: {
                damping: 20,
                stiffness: 110,
              },
            });

            return (
              <div
                key={item}
                className="flex items-center gap-5 rounded-[32px] border border-slate-200 bg-slate-50 px-8 py-7"
                style={{
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 24}px)`,
                }}
              >
                <div className="h-4 w-4 rounded-full bg-slate-900" />
                <p className="text-[48px] font-medium tracking-[-0.04em] text-slate-900">
                  {item}
                </p>
              </div>
            );
          })}
        </div>

        <p className="max-w-[760px] text-[34px] leading-[1.3] text-slate-500">
          {scene.accent}
        </p>
      </div>
    </AbsoluteFill>
  );
};
