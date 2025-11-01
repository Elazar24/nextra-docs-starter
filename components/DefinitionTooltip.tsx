import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DefinitionTooltipProps {
  children: React.ReactNode;
  definition: string;
}

export function DefinitionTooltip({ children, definition }: DefinitionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='underline underline-offset-2 decoration-dotted decoration-muted-foreground cursor-pointer'>
            {children}
          </span>
        </TooltipTrigger>

        <TooltipContent className='max-w-xs bg-muted text-muted-foreground'>
          <p>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
