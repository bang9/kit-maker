import { forwardRef, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useProfileStore } from '@/store/useProfileStore';
import { format } from 'date-fns';
import { Phone, Mail, Instagram, Linkedin, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KakaoIcon } from '@/components/icons/KakaoIcon';
import { log } from '@/lib/analytics';

function usePreviewData() {
  const backgroundImage = useProfileStore((s) => s.backgroundImage);
  const overlayColor = useProfileStore((s) => s.overlayColor);
  const overlayOpacity = useProfileStore((s) => s.overlayOpacity);
  const dateRange = useProfileStore((s) => s.dateRange);
  const title = useProfileStore((s) => s.title);
  const emoji = useProfileStore((s) => s.emoji);
  const phone = useProfileStore((s) => s.phone);
  const email = useProfileStore((s) => s.email);
  const kakao = useProfileStore((s) => s.kakao);
  const instagram = useProfileStore((s) => s.instagram);
  const linkedin = useProfileStore((s) => s.linkedin);

  const formattedDateRange = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, 'yyyy.MM.dd')} - ${format(dateRange.to, 'yyyy.MM.dd')}`
      : format(dateRange.from, 'yyyy.MM.dd')
    : undefined;

  const contacts = [
    { icon: Phone, value: phone, label: phone },
    { icon: Mail, value: email, label: email },
    { icon: KakaoIcon, value: kakao, label: kakao },
    { icon: Instagram, value: instagram, label: `@${instagram}` },
    { icon: Linkedin, value: linkedin, label: linkedin },
  ].filter((c) => c.value);

  return { backgroundImage, overlayColor, overlayOpacity, formattedDateRange, title, emoji, contacts };
}

/** The card visual itself - reused across full preview, mini thumbnail, and overlay */
export const PreviewCard = forwardRef<HTMLDivElement, { className?: string }>(function PreviewCard(
  { className },
  ref,
) {
  const { backgroundImage, overlayColor, overlayOpacity, formattedDateRange, title, emoji, contacts } =
    usePreviewData();

  return (
    <div ref={ref} className={`relative aspect-square overflow-hidden ${className ?? ''}`}>
      {backgroundImage ? (
        <img src={backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900" />
      )}

      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }}
      />

      <div className="relative flex flex-col items-center justify-center h-full text-white px-5 py-6">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
          {formattedDateRange && (
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-80">{formattedDateRange}</p>
          )}
          {title && <h2 className="text-2xl font-bold tracking-tight leading-tight drop-shadow-md">{title}</h2>}
          {emoji && <span className="text-3xl drop-shadow-sm">{emoji}</span>}
        </div>

        {contacts.length > 0 && (
          <div className="w-full mt-auto pt-4 space-y-1.5">
            {contacts.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] opacity-90">
                <Icon className="size-3 shrink-0 opacity-70" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export function DownloadButton({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const el = targetRef.current;
    if (!el) return;

    setDownloading(true);
    try {
      const dataUrl = await toPng(el, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'keep-in-touch.png';
      link.href = dataUrl;
      link.click();
      log('download');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDownload} disabled={downloading}>
      {downloading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
      Download
    </Button>
  );
}

/** Full preview with download button - used in the main layout */
export const ProfilePreview = forwardRef<HTMLDivElement>(function ProfilePreview(_, ref) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <PreviewCard ref={cardRef} className="w-80 rounded-2xl shadow-xl ring-1 ring-black/5" />
      <div className="flex items-center justify-center mt-4">
        <DownloadButton targetRef={cardRef} />
      </div>
    </div>
  );
});
