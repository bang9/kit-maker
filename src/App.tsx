import { useRef, useState, useEffect, useCallback } from 'react';
import { Eye, X, Github } from 'lucide-react';
import { ProfilePreview, PreviewCard, DownloadButton } from '@/components/ProfilePreview';
import { ProfileForm } from '@/components/form/ProfileForm';

function PreviewOverlay({ onClose }: { onClose: () => void }) {
  const overlayCardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative mx-4 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <PreviewCard ref={overlayCardRef} className="w-80 rounded-2xl shadow-2xl ring-1 ring-white/10" />
        <DownloadButton targetRef={overlayCardRef} />
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 size-8 rounded-full bg-card shadow-lg ring-1 ring-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default function ProfileGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewHidden, setPreviewHidden] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setPreviewHidden(!entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openOverlay = useCallback(() => setOverlayOpen(true), []);
  const closeOverlay = useCallback(() => setOverlayOpen(false), []);

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-3 flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
            K
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">Kit Maker</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Create your keep-in-touch card</p>
          </div>

          {/* Mini preview thumbnail - appears when full preview is scrolled away (mobile/tablet only) */}
          <button
            type="button"
            onClick={openOverlay}
            className={`lg:hidden ml-auto flex items-center gap-2.5 transition-all duration-300 ${
              previewHidden ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
          >
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <Eye className="size-3.5" />
              Preview
            </span>
            {/* Render full 320px card, scale down to 40px via transform */}
            <div className="size-10 rounded-lg ring-1 ring-black/10 shadow-sm overflow-hidden shrink-0">
              <div style={{ width: 320, height: 320, transform: 'scale(0.125)', transformOrigin: 'top left' }}>
                <PreviewCard className="w-80 aspect-square" />
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 md:px-8 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-[420px] shrink-0 order-2 lg:order-1">
            <ProfileForm />
          </div>
          <div className="w-full lg:flex-1 flex justify-center order-1 lg:order-2 lg:sticky lg:top-20">
            <ProfilePreview ref={previewRef} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Kit Maker</span>
          <a
            href="https://github.com/bang9/kit-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="size-3.5" />
            GitHub
          </a>
        </div>
      </footer>

      {/* Full preview overlay */}
      {overlayOpen && <PreviewOverlay onClose={closeOverlay} />}
    </div>
  );
}
