import type { FC } from "react";
import type { CalculateMetadataFunction } from "remotion";
import { Composition } from "remotion";
import {
  DEFAULT_SCENE_AUDIO,
  MyComposition,
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
  const { sceneDurations, totalDurationInFrames } = await getTotalDurationInFrames({
    audioFiles: sceneAudio,
    fps: FPS,
    overlapFrames: SCENE_TRANSITION_DURATION_IN_FRAMES,
  });

  return {
    durationInFrames: totalDurationInFrames,
    props: {
      ...props,
      sceneAudio,
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
      }}
      durationInFrames={150}
      fps={FPS}
      width={1366}
      height={768}
    />
  );
};
