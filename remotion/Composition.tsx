import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { FC } from "react";
import { ClosingScene } from "./scenes/ClosingScene";
import { IntroScene } from "./scenes/IntroScene";

/** See `.agents/skills/remotion-best-practices/rules/available-audio.md` */
const DEFAULT_AUDIO_SRC =
  "https://cdn.yuniqa.ai/audio/DO_NOT_USE_THIS_AUDIO.mp3?v=1.0.0";
export const DEFAULT_SCENE_AUDIO = [DEFAULT_AUDIO_SRC, DEFAULT_AUDIO_SRC];
export const SCENE_TRANSITION_DURATION_IN_FRAMES = 15;

export type MyCompositionProps = {
  sceneAudio?: string[];
  sceneDurations?: number[];
};

/** Compute `sceneDurations` in `Root.tsx` with `./audio-duration.ts`, then keep scene files focused on visuals. */
export const MyComposition: FC<MyCompositionProps> = ({
  sceneAudio = DEFAULT_SCENE_AUDIO,
  sceneDurations = [90, 90],
}) => {
  const firstSceneDuration = sceneDurations[0] ?? 90;
  const secondSceneDuration = sceneDurations[1] ?? 90;

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={firstSceneDuration}>
        <Audio src={sceneAudio[0] ?? DEFAULT_SCENE_AUDIO[0]} />
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({
          durationInFrames: SCENE_TRANSITION_DURATION_IN_FRAMES,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={secondSceneDuration}>
        <Audio src={sceneAudio[1] ?? DEFAULT_SCENE_AUDIO[1]} />
        <ClosingScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
