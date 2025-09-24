import { getPreferences, updatePreferences } from "./state.js";

export function initPreferences({ animationToggle, soundToggle, root }) {
  const applyPreferencesToDom = (prefs) => {
    if (!root) return;
    root.dataset.animations = prefs.animations ? "on" : "off";
    root.dataset.sounds = prefs.sounds ? "on" : "off";
  };

  const syncToggles = () => {
    const prefs = getPreferences();
    if (animationToggle) {
      animationToggle.checked = Boolean(prefs.animations);
    }
    if (soundToggle) {
      soundToggle.checked = Boolean(prefs.sounds);
    }
    applyPreferencesToDom(prefs);
  };

  syncToggles();

  animationToggle?.addEventListener("change", (event) => {
    const checked = event.target.checked;
    const prefs = updatePreferences({ animations: checked });
    applyPreferencesToDom(prefs);
  });

  soundToggle?.addEventListener("change", (event) => {
    const checked = event.target.checked;
    const prefs = updatePreferences({ sounds: checked });
    applyPreferencesToDom(prefs);
  });

  return {
    shouldAnimate: () => Boolean(getPreferences().animations),
    shouldPlaySounds: () => Boolean(getPreferences().sounds),
    refresh: syncToggles
  };
}
