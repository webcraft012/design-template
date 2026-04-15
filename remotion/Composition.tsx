import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { FC } from "react";
import { interpolate, Sequence } from "remotion";
import { ClosingScene } from "./scenes/ClosingScene";
import { IntroScene } from "./scenes/IntroScene";

/** See `.agents/skills/remotion-best-practices/rules/available-audio.md` */
const DEFAULT_AUDIO_SRC =
  "https://cdn.yuniqa.ai/audio/DO_NOT_USE_THIS_AUDIO.mp3?v=1.0.0";
export const DEFAULT_SCENE_AUDIO = [DEFAULT_AUDIO_SRC, DEFAULT_AUDIO_SRC];
export const SCENE_TRANSITION_DURATION_IN_FRAMES = 15;
export const SCENE_VOICE_GAP_IN_FRAMES = 10;
export const AUDIO_FADE_IN_DURATION_IN_FRAMES = 5;
export const AUDIO_FADE_OUT_DURATION_IN_FRAMES = 5;

export type MyCompositionProps = {
  sceneAudio?: string[];
  audioDurationsInFrames?: number[];
  sceneDurations?: number[];
};

/** CRITICAL: Compute `sceneDurations` in `Root.tsx` with `./audio-duration.ts`, then keep scene files focused on visuals. */
export const MyComposition: FC<MyCompositionProps> = ({
  sceneAudio = DEFAULT_SCENE_AUDIO,
  audioDurationsInFrames = [90, 90],
  sceneDurations = [90, 90],
}) => {
  const firstSceneAudioDuration = audioDurationsInFrames[0] ?? 90;
  const secondSceneAudioDuration = audioDurationsInFrames[1] ?? 90;
  const firstSceneDuration = sceneDurations[0] ?? 90;
  const secondSceneDuration = sceneDurations[1] ?? 90;

  const getNarrationVolume = ({
    frame,
    clipDurationInFrames,
  }: {
    frame: number;
    clipDurationInFrames: number;
  }) => {
    return interpolate(
      frame,
      [
        0,
        AUDIO_FADE_IN_DURATION_IN_FRAMES,
        Math.max(
          AUDIO_FADE_IN_DURATION_IN_FRAMES,
          clipDurationInFrames - AUDIO_FADE_OUT_DURATION_IN_FRAMES
        ),
        clipDurationInFrames,
      ],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  };

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={firstSceneDuration}>
        <Audio
          src={sceneAudio[0] ?? DEFAULT_SCENE_AUDIO[0]}
          volume={(frame) =>
            getNarrationVolume({
              frame,
              clipDurationInFrames: firstSceneAudioDuration,
            })
          }
        />
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({
          durationInFrames: SCENE_TRANSITION_DURATION_IN_FRAMES,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={secondSceneDuration}>
        <ClosingScene />

        <Sequence
          from={SCENE_VOICE_GAP_IN_FRAMES}
          durationInFrames={secondSceneAudioDuration}
        >
          <Audio
            src={sceneAudio[1] ?? DEFAULT_SCENE_AUDIO[1]}
            volume={(frame) =>
              getNarrationVolume({
                frame,
                clipDurationInFrames: secondSceneAudioDuration,
              })
            }
          />
        </Sequence>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
