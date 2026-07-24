const SOUND_EFFECTS_BASE_URL = "https://cdn.yuniqa.ai/audio/sfx";

export const VIDEO_SOUND_EFFECTS = {
  keyboard: {
    src: `${SOUND_EFFECTS_BASE_URL}/keyboard.mp3`,
    durationInSeconds: 8.072,
    defaultVolume: 0.15,
    category: "ui",
    use: "Mechanical typing for code, search, form, and terminal scenes.",
  },
  click: {
    src: `${SOUND_EFFECTS_BASE_URL}/click.mp3`,
    durationInSeconds: 1.032,
    defaultVolume: 0.25,
    category: "ui",
    use: "Button presses, cursor actions, and small interface beats.",
  },
  pop: {
    src: `${SOUND_EFFECTS_BASE_URL}/pop.mp3`,
    durationInSeconds: 1.019,
    defaultVolume: 0.3,
    category: "ui",
    use: "Text, badges, cards, and icons appearing on screen.",
  },
  notification: {
    src: `${SOUND_EFFECTS_BASE_URL}/notification.mp3`,
    durationInSeconds: 2.116,
    defaultVolume: 0.35,
    category: "ui",
    use: "Messages, alerts, and incoming events.",
  },
  success: {
    src: `${SOUND_EFFECTS_BASE_URL}/success.mp3`,
    durationInSeconds: 2.544,
    defaultVolume: 0.35,
    category: "ui",
    use: "Completed actions, deploys, purchases, and positive results.",
  },
  error: {
    src: `${SOUND_EFFECTS_BASE_URL}/error.mp3`,
    durationInSeconds: 0.528,
    defaultVolume: 0.3,
    category: "ui",
    use: "Failed actions, validation errors, and warning states.",
  },
  whoosh: {
    src: `${SOUND_EFFECTS_BASE_URL}/whoosh.mp3`,
    durationInSeconds: 0.575,
    defaultVolume: 0.5,
    category: "transition",
    use: "Fast scene cuts, slides, pans, and object movement.",
  },
  riser: {
    src: `${SOUND_EFFECTS_BASE_URL}/riser.mp3`,
    durationInSeconds: 4.075,
    defaultVolume: 0.35,
    category: "cinematic",
    use: "Build-up before a reveal, key claim, or scene change.",
  },
  glitch: {
    src: `${SOUND_EFFECTS_BASE_URL}/glitch.mp3`,
    durationInSeconds: 2.638,
    defaultVolume: 0.3,
    category: "cinematic",
    use: "Tech transitions, corrupted visuals, and intentional disruption.",
  },
  magicReveal: {
    src: `${SOUND_EFFECTS_BASE_URL}/magic-reveal.mp3`,
    durationInSeconds: 2.038,
    defaultVolume: 0.45,
    category: "transition",
    use: "Product reveals, before-and-after moments, and polished unveils.",
  },
} as const;

export type VideoSoundEffectName = keyof typeof VIDEO_SOUND_EFFECTS;
