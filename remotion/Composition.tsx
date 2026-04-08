import { Audio } from "@remotion/media";
import type { FC } from "react";
import { AbsoluteFill } from "remotion";

/** See `.agents/skills/remotion-best-practices/rules/available-audio.md` */
const BEAT_AUDIO_URL = "https://cdn.yuniqa.ai/audio/beats.mp3?v=1.0.0";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const MyComposition: FC = () => {
  return (
    <AbsoluteFill
      className="flex items-center justify-center bg-slate-950"
      style={{ fontFamily: SYSTEM_FONT }}
    >
      <Audio src={BEAT_AUDIO_URL} />
      <p className="text-5xl font-semibold tracking-tight text-white">
        Remotion
      </p>
    </AbsoluteFill>
  );
};
