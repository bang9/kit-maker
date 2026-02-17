import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { useProfileStore } from '@/store/useProfileStore';
import { log } from '@/lib/analytics';

const CURRENT_YEAR = new Date().getFullYear();

export function DateRangePicker() {
  const dateRange = useProfileStore((s) => s.dateRange);
  const setDateRange = useProfileStore((s) => s.setDateRange);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range ?? { from: undefined, to: undefined });
    if (range?.from && range?.to) {
      log('date_select');
    }
  };

  const hasValue = dateRange.from || dateRange.to;

  return (
    <div className="space-y-2">
      <Label>Date Range</Label>
      <Popover>
        <div className="relative">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                hasValue && 'pr-9',
                !dateRange.from && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              {dateRange.from ? (
                dateRange.to ? (
                  <span className="truncate">
                    {format(dateRange.from, 'yyyy.MM.dd')} – {format(dateRange.to, 'yyyy.MM.dd')}
                  </span>
                ) : (
                  format(dateRange.from, 'yyyy.MM.dd')
                )
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>

          {hasValue && (
            <button
              type="button"
              onClick={() => {
                setDateRange({ from: undefined, to: undefined });
                log('date_clear');
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            fromYear={1990}
            toYear={CURRENT_YEAR + 5}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
