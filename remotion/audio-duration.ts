import { ALL_FORMATS, Input, UrlSource } from "mediabunny";

const TOTAL_DURATION_BUFFER_IN_SECONDS = 0.5;

export const getAudioDurationInSeconds = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  return input.computeDuration();
};

export const getAudioDurationInFrames = async ({
  src,
  fps,
}: {
  src: string;
  fps: number;
}) => {
  const durationInSeconds = await getAudioDurationInSeconds(src);
  return Math.ceil(durationInSeconds * fps);
};

export const getSceneDurationsInFrames = async ({
  audioFiles,
  fps,
}: {
  audioFiles: string[];
  fps: number;
}) => {
  return Promise.all(
    audioFiles.map((src) => getAudioDurationInFrames({ src, fps })),
  );
};

export const getTotalDurationInFrames = async ({
  audioFiles,
  fps,
  sceneStartOffsetsInFrames = [],
  overlapFrames = 0,
}: {
  audioFiles: string[];
  fps: number;
  sceneStartOffsetsInFrames?: number[];
  overlapFrames?: number;
}) => {
  const audioDurationsInFrames = await getSceneDurationsInFrames({
    audioFiles,
    fps,
  });
  const sceneDurations = audioDurationsInFrames.map((duration, index) => {
    return duration + (sceneStartOffsetsInFrames[index] ?? 0);
  });
  const totalSceneFrames = sceneDurations.reduce((sum, duration) => {
    return sum + duration;
  }, 0);
  const totalOverlapFrames = Math.max(0, audioFiles.length - 1) * overlapFrames;
  const totalBufferFrames = Math.ceil(TOTAL_DURATION_BUFFER_IN_SECONDS * fps);

  return {
    audioDurationsInFrames,
    sceneDurations,
    totalDurationInFrames:
      totalSceneFrames - totalOverlapFrames + totalBufferFrames,
  };
};
