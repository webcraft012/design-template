import type { FC } from "react";
import { AbsoluteFill } from "remotion";

export const MyComposition: FC = () => {
  return (
    <AbsoluteFill className="flex items-center justify-center bg-slate-950">
      <p className="text-5xl font-semibold tracking-tight text-white">
        Remotion
      </p>
    </AbsoluteFill>
  );
};
