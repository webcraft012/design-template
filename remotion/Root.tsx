import type { FC } from "react";
import type { CalculateMetadataFunction } from "remotion";
import { Composition } from "remotion";
import {
  AUDIO_FADE_IN_DURATION_IN_FRAMES,
  AUDIO_FADE_OUT_DURATION_IN_FRAMES,
  DEFAULT_SCENE_AUDIO,
  MyComposition,
  SCENE_VOICE_GAP_IN_FRAMES,
  SCENE_TRANSITION_DURATION_IN_FRAMES,
  type MyCompositionProps,
} from "./Composition";
import { getTotalDurationInFrames } from "./audio-duration";
import "./remotion.css";

const FPS = 30;

const calculateMetadata: CalculateMetadataFunction<MyCompositionProps> = async ({
  props,
}) => {
  const sceneAudio = props.sceneAudio ?? DEFAULT_SCENE_AUDIO;
  const {
    audioDurationsInFrames,
    sceneDurations,
    totalDurationInFrames,
  } = await getTotalDurationInFrames({
    audioFiles: sceneAudio,
    fps: FPS,
    sceneStartOffsetsInFrames: [0, SCENE_VOICE_GAP_IN_FRAMES],
    overlapFrames: SCENE_TRANSITION_DURATION_IN_FRAMES,
  });

  return {
    durationInFrames: totalDurationInFrames,
    props: {
      ...props,
      sceneAudio,
      audioDurationsInFrames,
      sceneDurations,
    },
  };
};

export const RemotionRoot: FC = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      calculateMetadata={calculateMetadata}
      defaultProps={{
        sceneAudio: DEFAULT_SCENE_AUDIO,
        audioDurationsInFrames: [90, 90],
        sceneDurations: [
          90,
          90 +
            SCENE_VOICE_GAP_IN_FRAMES +
            AUDIO_FADE_IN_DURATION_IN_FRAMES +
            AUDIO_FADE_OUT_DURATION_IN_FRAMES,
        ],
      }}
      durationInFrames={150}
      fps={FPS}
      width={1366}
      height={768}
    />
  );
};
