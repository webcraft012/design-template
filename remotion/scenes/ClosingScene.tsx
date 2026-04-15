import type { FC } from "react";
import { AbsoluteFill } from "remotion";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const ClosingScene: FC = () => {
  return (
    <AbsoluteFill
      className="items-center justify-center bg-white"
      style={{ fontFamily: SYSTEM_FONT }}
    >
      <div className="text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-slate-500">
          Closing Scene
        </p>
        <p className="text-6xl font-semibold tracking-tight text-slate-950">
          End Here
        </p>
      </div>
    </AbsoluteFill>
  );
};
