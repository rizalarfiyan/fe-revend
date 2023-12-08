import * as React from 'react'

import { cn } from '@/utils/classes'

import {
  HorizontalLineProps,
  OnlyHorizontalLineProps,
} from './HorizontalLine.types'

const OnlyHorizontalLine: React.FC<OnlyHorizontalLineProps> = ({
  lineHeight = '1.5px',
  lineClassName,
}) => {
  return (
    <div
      className={cn(
        'w-full flex-grow rounded-md bg-secondary-200',
        lineClassName,
      )}
      style={{
        height: lineHeight,
      }}
    />
  )
}

const HorizontalLine = React.forwardRef<HTMLDivElement, HorizontalLineProps>(
  (props, ref) => {
    const {
      className,
      title,
      lineHeight,
      lineClassName,
      rightOnly,
      leftOnly,
      children,
      ...rest
    } = props

    const content = title || children
    if (rightOnly && leftOnly) return
    const isAll = !rightOnly && !leftOnly

    return (
      <div
        ref={ref}
        className={cn('relative flex items-center py-5 text-center', className)}
        {...rest}
      >
        {(isAll || leftOnly) && (
          <OnlyHorizontalLine {...{ lineHeight, lineClassName }} />
        )}
        <div
          className={cn(
            'flex-shrink',
            isAll && 'px-3',
            rightOnly && 'pr-3',
            leftOnly && 'pl-3',
          )}
        >
          {content}
        </div>
        {(isAll || rightOnly) && (
          <OnlyHorizontalLine {...{ lineHeight, lineClassName }} />
        )}
      </div>
    )
  },
)

HorizontalLine.displayName = 'HorizontalLine'

export default HorizontalLine
