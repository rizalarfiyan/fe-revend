import { forwardRef } from 'react'

import { cn } from '@/utils/classes'

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))

TableHeader.displayName = 'TableHeader'

export default TableHeader
