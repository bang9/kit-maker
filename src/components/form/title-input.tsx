import { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useProfileStore } from '@/store/useProfileStore';

export function TitleInput() {
  const title = useProfileStore((s) => s.title);
  const setTitle = useProfileStore((s) => s.setTitle);
  const [error, setError] = useState<string | null>(null);
  const touched = useRef(false);

  const handleChange = (value: string) => {
    touched.current = true;
    setTitle(value);
    setError(value ? null : 'Title is required');
  };

  const handleBlur = () => {
    touched.current = true;
    if (!title) setError('Title is required');
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="title">
        Title <span className="text-destructive">*</span>
      </Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="KEEP IN TOUCH"
        className={error ? 'border-destructive' : ''}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
