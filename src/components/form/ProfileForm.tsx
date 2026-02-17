import { BackgroundImageUploader } from '@/components/form/background-image-uploader';
import { OverlaySettings } from '@/components/form/overlay-settings';
import { DateRangePicker } from '@/components/form/date-range-picker';
import { TitleInput } from '@/components/form/title-input';
import { EmojiPicker } from '@/components/form/emoji-picker';
import { ContactForm } from '@/components/form/contact-form';

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
      {children}
    </section>
  );
}

export function ProfileForm() {
  return (
    <div className="space-y-1">
      <div className="rounded-xl border bg-card p-5 md:p-6 shadow-sm space-y-6">
        <FormSection title="Background">
          <BackgroundImageUploader />
          <OverlaySettings />
        </FormSection>

        <hr className="border-border" />

        <FormSection title="Content">
          <TitleInput />
          <DateRangePicker />
          <EmojiPicker />
        </FormSection>

        <hr className="border-border" />

        <FormSection title="Contact">
          <ContactForm />
        </FormSection>
      </div>
    </div>
  );
}
