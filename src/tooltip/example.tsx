import { Tooltip, TooltipContent, Trigger } from '.';
import { Button } from '../button';

export default function TooltipExample() {
  return (
    <div className="flex items-start justify-center">
      <Tooltip>
        <Trigger asChild>
          <Button onClick={() => alert('Test')}>Hover me</Button>
        </Trigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
