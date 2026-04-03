import type { FC } from "react";
import { AbsoluteFill } from "remotion";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const MyComposition: FC = () => {
  return (
    <AbsoluteFill
      className="flex items-center justify-center bg-slate-950"
      style={{ fontFamily: SYSTEM_FONT }}
    >
      <p className="text-5xl font-semibold tracking-tight text-white">Remotion</p>
    </AbsoluteFill>
  );
};
