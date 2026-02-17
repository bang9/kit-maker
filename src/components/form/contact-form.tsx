import { useRef, useState } from 'react';
import { Phone, Mail, Instagram, Linkedin } from 'lucide-react';
import { KakaoIcon } from '@/components/icons/KakaoIcon';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useProfileStore } from '@/store/useProfileStore';
import { log } from '@/lib/analytics';

function ContactField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  onBlur,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string | null;
  onBlur?: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="size-4" />
        </div>
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`pl-9 ${error ? 'border-destructive' : ''}`}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

type ContactFieldName = 'phone' | 'email' | 'kakao' | 'instagram' | 'linkedin';

function useContactLogger(field: ContactFieldName, value: string | null) {
  const prev = useRef(value);
  return () => {
    if (value && value !== prev.current) {
      log('contact_fill', { field });
    }
    prev.current = value;
  };
}

export function ContactForm() {
  const phone = useProfileStore((s) => s.phone);
  const email = useProfileStore((s) => s.email);
  const kakao = useProfileStore((s) => s.kakao);
  const instagram = useProfileStore((s) => s.instagram);
  const linkedin = useProfileStore((s) => s.linkedin);
  const setPhone = useProfileStore((s) => s.setPhone);
  const setEmail = useProfileStore((s) => s.setEmail);
  const setKakao = useProfileStore((s) => s.setKakao);
  const setInstagram = useProfileStore((s) => s.setInstagram);
  const setLinkedin = useProfileStore((s) => s.setLinkedin);

  const [emailError, setEmailError] = useState<string | null>(null);
  const emailTouched = useRef(false);

  const logPhone = useContactLogger('phone', phone);
  const logEmail = useContactLogger('email', email);
  const logKakao = useContactLogger('kakao', kakao);
  const logInstagram = useContactLogger('instagram', instagram);
  const logLinkedin = useContactLogger('linkedin', linkedin);

  const validateEmail = (value: string | null) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  };

  const handleEmailChange = (value: string) => {
    emailTouched.current = true;
    setEmail(value || null);
    setEmailError(validateEmail(value || null));
  };

  const handleEmailBlur = () => {
    emailTouched.current = true;
    setEmailError(validateEmail(email));
    logEmail();
  };

  return (
    <div className="space-y-3">
      <ContactField
        id="phone"
        label="Phone"
        icon={Phone}
        value={phone || ''}
        onChange={(v) => setPhone(v || null)}
        onBlur={logPhone}
        placeholder="Phone number"
      />
      <ContactField
        id="email"
        label="Email"
        icon={Mail}
        value={email || ''}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        placeholder="Email address"
        error={emailError}
      />
      <ContactField
        id="kakao"
        label="Kakao ID"
        icon={KakaoIcon}
        value={kakao || ''}
        onChange={(v) => setKakao(v || null)}
        onBlur={logKakao}
        placeholder="Kakao ID"
      />
      <ContactField
        id="instagram"
        label="Instagram"
        icon={Instagram}
        value={instagram || ''}
        onChange={(v) => setInstagram(v || null)}
        onBlur={logInstagram}
        placeholder="Instagram handle"
      />
      <ContactField
        id="linkedin"
        label="LinkedIn"
        icon={Linkedin}
        value={linkedin || ''}
        onChange={(v) => setLinkedin(v || null)}
        onBlur={logLinkedin}
        placeholder="LinkedIn profile URL"
      />
    </div>
  );
}
