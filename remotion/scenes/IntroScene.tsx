import type { FC } from "react";
import { AbsoluteFill } from "remotion";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const IntroScene: FC = () => {
  return (
    <AbsoluteFill
      className="items-center justify-center bg-slate-950"
      style={{ fontFamily: SYSTEM_FONT }}
    >
      <div className="text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-slate-400">
          Intro Scene
        </p>
        <p className="text-6xl font-semibold tracking-tight text-white">
          Start Here
        </p>
      </div>
    </AbsoluteFill>
  );
};
