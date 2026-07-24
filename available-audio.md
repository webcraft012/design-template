---
name: available-audio
description: Curated CDN audio URLs for Remotion compositions (beats, sound effects, and opt-in special audio)
metadata:
  tags: audio, cdn, beats, sound-effects, remotion
---

# Available audio (reference)

Use these remote URLs with `<Audio>` from `@remotion/media`. Keep narration on its own track and lower sound-effect volume while somebody is speaking.

## Default beats (use freely)

| File | URL |
| --- | --- |
| beats | https://cdn.yuniqa.ai/audio/beats.mp3 |
| beats2 | https://cdn.yuniqa.ai/audio/beats2.mp3 |
| beats3 | https://cdn.yuniqa.ai/audio/beats3.mp3 |
| beats4 | https://cdn.yuniqa.ai/audio/beats4.mp3 |
| beats5 | https://cdn.yuniqa.ai/audio/beats5.mp3 |

## Video sound effects (use freely)

The same data is exported for code from [`remotion/sound-effects.ts`](./remotion/sound-effects.ts).

| Key | Best for | Duration | Starting volume | CDN URL |
| --- | --- | ---: | ---: | --- |
| `keyboard` | Typing, code, search, forms, terminals | 8.072s | 0.15 | https://cdn.yuniqa.ai/audio/sfx/keyboard.mp3 |
| `click` | Button presses and cursor actions | 1.032s | 0.25 | https://cdn.yuniqa.ai/audio/sfx/click.mp3 |
| `pop` | Text, cards, badges, and icons appearing | 1.019s | 0.30 | https://cdn.yuniqa.ai/audio/sfx/pop.mp3 |
| `notification` | Messages, alerts, and incoming events | 2.116s | 0.35 | https://cdn.yuniqa.ai/audio/sfx/notification.mp3 |
| `success` | Completed actions and positive results | 2.544s | 0.35 | https://cdn.yuniqa.ai/audio/sfx/success.mp3 |
| `error` | Failed actions and warning states | 0.528s | 0.30 | https://cdn.yuniqa.ai/audio/sfx/error.mp3 |
| `whoosh` | Fast cuts, slides, pans, and movement | 0.575s | 0.50 | https://cdn.yuniqa.ai/audio/sfx/whoosh.mp3 |
| `riser` | Build-up before a reveal or key claim | 4.075s | 0.35 | https://cdn.yuniqa.ai/audio/sfx/riser.mp3 |
| `glitch` | Tech transitions and corrupted visuals | 2.638s | 0.30 | https://cdn.yuniqa.ai/audio/sfx/glitch.mp3 |
| `magicReveal` | Product reveals and before/after moments | 2.038s | 0.45 | https://cdn.yuniqa.ai/audio/sfx/magic-reveal.mp3 |

The volume values are starting points for an isolated effect. During narration, try 40–60% of the listed value and adjust by ear.

### Remotion example

```tsx
import { Audio } from "@remotion/media";
import { Sequence } from "remotion";
import { VIDEO_SOUND_EFFECTS } from "./sound-effects";

const effect = VIDEO_SOUND_EFFECTS.keyboard;

<Sequence from={30} durationInFrames={90}>
  <Audio src={effect.src} volume={effect.defaultVolume} />
</Sequence>;
```

`from` and `durationInFrames` are frame counts. A `Sequence` can shorten the 8-second keyboard recording to match the visible typing animation.

### Storage, cache, and license

- Cloudflare R2 bucket: `assets`; object prefix: `audio/sfx/`.
- Public origin: `https://cdn.yuniqa.ai/audio/sfx/`.
- Objects use `Content-Type: audio/mpeg` and `Cache-Control: public, max-age=31536000, immutable`.
- Source: [Crafter Station Elements SFX](https://github.com/crafter-station/elements/tree/5ecc481d8187cbf47335d6aaadd86e948cd02a21/public/sfx), pinned to commit `5ecc481d8187cbf47335d6aaadd86e948cd02a21`.
- License: CC0/public domain; commercial use is allowed and attribution is not required. The [upstream SFX documentation](https://tryelements.dev/docs/sfx) records the license.
- Because the CDN responses are immutable, do not replace a file at the same key. Publish changed audio under a new filename such as `whoosh-v2.mp3`.

With Wrangler authenticated, publish a new version with:

```bash
npx wrangler r2 object put assets/audio/sfx/whoosh-v2.mp3 \
  --file ./path/to/whoosh-v2.mp3 \
  --content-type audio/mpeg \
  --cache-control "public, max-age=31536000, immutable" \
  --remote
```

## Special (explicit user request only)

Do **not** use unless the user clearly asks for it:

| File | URL |
| --- | --- |
| special_troll | https://cdn.yuniqa.ai/audio/special_troll.mp3 |
