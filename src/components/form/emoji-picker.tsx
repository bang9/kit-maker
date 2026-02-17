import { lazy, Suspense, useState } from 'react';
import { Smile, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useProfileStore } from '@/store/useProfileStore';

const EmojiMartPicker = lazy(() =>
  Promise.all([import('@emoji-mart/data'), import('@emoji-mart/react')]).then(([dataModule, pickerModule]) => ({
    default: (props: { onEmojiSelect: (emoji: { native: string }) => void }) => {
      const Picker = pickerModule.default;
      return <Picker data={dataModule.default} theme="light" {...props} />;
    },
  })),
);

export function EmojiPicker() {
  const emoji = useProfileStore((s) => s.emoji);
  const setEmoji = useProfileStore((s) => s.setEmoji);
  const [open, setOpen] = useState(false);

  const handleEmojiSelect = (selected: { native: string }) => {
    setEmoji(selected.native);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label>Emoji</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start font-normal ${emoji ? 'pr-9' : ''}`}
            >
              <Smile className="mr-2 size-4 shrink-0 text-muted-foreground" />
              <span>{emoji || 'Select an emoji'}</span>
            </Button>
          </PopoverTrigger>

          {emoji && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEmoji(null);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <PopoverContent className="p-0 w-full" align="start">
          <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading...</div>}>
            <EmojiMartPicker onEmojiSelect={handleEmojiSelect} />
          </Suspense>
        </PopoverContent>
      </Popover>
    </div>
  );
}
