import { cn } from '@/utils/classes'

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
)

AlertDialogFooter.displayName = 'AlertDialogFooter'

export default AlertDialogFooter
