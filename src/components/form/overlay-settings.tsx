import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useProfileStore } from '@/store/useProfileStore';
import { log } from '@/lib/analytics';

export function OverlaySettings() {
  const overlayColor = useProfileStore((s) => s.overlayColor);
  const overlayOpacity = useProfileStore((s) => s.overlayOpacity);
  const setOverlayColor = useProfileStore((s) => s.setOverlayColor);
  const setOverlayOpacity = useProfileStore((s) => s.setOverlayOpacity);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="overlay-color">Overlay Color</Label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="overlay-color"
            className="relative size-9 rounded-lg border border-border cursor-pointer overflow-hidden shrink-0 shadow-sm"
          >
            <input
              id="overlay-color"
              type="color"
              value={overlayColor}
              onChange={(e) => setOverlayColor(e.target.value)}
              onBlur={() => log('overlay_color_change', { color: overlayColor })}
              className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer"
            />
          </label>
          <span className="text-sm text-muted-foreground font-mono">{overlayColor}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="overlay-opacity">Overlay Opacity</Label>
          <span className="text-sm tabular-nums text-muted-foreground">{overlayOpacity}%</span>
        </div>
        <Slider
          id="overlay-opacity"
          min={0}
          max={100}
          step={1}
          value={[overlayOpacity]}
          onValueChange={(value) => setOverlayOpacity(value[0])}
          onValueCommit={(value) => log('overlay_opacity_change', { opacity: value[0] })}
        />
      </div>
    </div>
  );
}
