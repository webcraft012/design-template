import { ALL_FORMATS, Input, UrlSource } from "mediabunny";

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
    audioFiles.map((src) => getAudioDurationInFrames({ src, fps }))
  );
};

export const getTotalDurationInFrames = async ({
  audioFiles,
  fps,
}: {
  audioFiles: string[];
  fps: number;
}) => {
  const sceneDurations = await getSceneDurationsInFrames({ audioFiles, fps });

  return {
    sceneDurations,
    totalDurationInFrames: sceneDurations.reduce(
      (sum, duration) => sum + duration,
      0
    ),
  };
};
