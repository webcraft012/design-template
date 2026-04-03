import type { FC } from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import "./remotion.css";

export const RemotionRoot: FC = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={150}
      fps={30}
      width={1366}
      height={768}
    />
  );
};
