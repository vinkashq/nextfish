import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const rtf = new Intl.RelativeTimeFormat("en", { style: "short" })

export function relativeTime(date: Date): string {
  const now = Date.now();

  const diffInSeconds = Math.floor((date.getTime() - now) / 1000);
  if (diffInSeconds < 60 && diffInSeconds > -60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60 && diffInMinutes > -60) {
    return rtf.format(diffInMinutes, "minute");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24 && diffInHours > -24) {
    return rtf.format(diffInHours, "hour");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7 && diffInDays > -7) {
    return rtf.format(diffInDays, "day");
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4 && diffInWeeks > -4) {
    return rtf.format(diffInWeeks, "week");
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12 && diffInMonths > -12) {
    return rtf.format(diffInMonths, "month");
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(diffInYears, "year");
}

type RelativeTimeProps = {
  date: Date;
} & React.ComponentPropsWithoutRef<typeof TooltipTrigger>;

export function RelativeTime(props: RelativeTimeProps) {
  const text = relativeTime(props.date)
  const localeString = props.date.toLocaleString()

  return (
    <Tooltip>
      <TooltipTrigger {...props}>
        {text}
      </TooltipTrigger>
      <TooltipContent>
        {localeString}
      </TooltipContent>
    </Tooltip>
  )
}