
import { AppLogo } from '@/components/shared/AppLogo';
import { format } from 'date-fns';
import Image from 'next/image'; // Import next/image

interface MemorialPageHeaderProps {
  deceasedName: string;
  birthDate: string;
  deathDate: string;
  lifeSummary?: string;
  profilePhotoUrl?: string; // Added profile photo URL
}

export function MemorialPageHeader({ deceasedName, birthDate, deathDate, lifeSummary, profilePhotoUrl }: MemorialPageHeaderProps) {
  const formatDate = (dateString: string) => {
    try {
      // Ensure the date string is treated as UTC to avoid timezone issues
      // HTML date inputs usually provide YYYY-MM-DD, which is timezone-agnostic
      // but new Date() can sometimes interpret it based on local timezone.
      // Adding 'T00:00:00Z' or splitting and using Date.UTC can help,
      // but for display, directly parsing YYYY-MM-DD should be fine with date-fns.
      // If dateString can be in other formats, more robust parsing might be needed.
      const date = new Date(dateString + 'T00:00:00'); // Treat as midnight UTC
      return format(date, 'dd MMM yyyy');
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return dateString; // fallback if date is invalid
    }
  };

  return (
    <header className="py-12 bg-gradient-to-b from-primary/20 to-background text-center border-b border-primary/30 shadow-sm">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-headline text-primary-foreground mb-3">{deceasedName}</h1>

        {profilePhotoUrl && (
          <div className="my-6 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-2 border-background/50">
              <Image
                src={profilePhotoUrl}
                alt={`Profile photo of ${deceasedName}`}
                width={128}
                height={128}
                className="object-cover w-full h-full filter grayscale"
                data-ai-hint="profile person"
              />
            </div>
          </div>
        )}

        <p className="text-xl text-foreground/80 font-body mt-3">
          {formatDate(birthDate)} &ndash; {formatDate(deathDate)}
        </p>
        {lifeSummary && (
          <p className="mt-4 text-lg font-body text-foreground/70 italic max-w-2xl mx-auto">
            {lifeSummary}
          </p>
        )}
        <p className="mt-6 text-2xl font-headline text-accent-foreground italic">Forever in our hearts</p>
      </div>
    </header>
  );
}
