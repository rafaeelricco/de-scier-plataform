import { TriggerProps } from '@components/common/Select/Typing'
import * as Select from '@radix-ui/react-select'
import '@styles/select.css'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

/**
 * @notice Defines style variants for the select component using the `tv` function from `tailwind-variants`.
 *
 * Variants:
 * - `small`: Compact design with specific styles for placeholders and general text.
 * - `input`: Similar to `small` but taller and full-width, with different placeholder and text styles.
 *
 * @returns {object} An object of Tailwind CSS style variants.
 */
const select = tv({
   variants: {
      type: {
         small: 'rounded-md bg-transparent shadow-sm py-1 px-4 border border-gray-stroke inline-flex items-center gap-2 data-[placeholder]:font-regular data-[placeholder]:text-sm focus:outline-none select-none text-sm font-regular text-gray-main',
         input: 'bg-transparent text-base shadow-sm border-b-[1px] p-2 pt-0 border-neutral-light_gray inline-flex items-center justify-between gap-2 data-[placeholder]:text-gray-light data-[placeholder]:text-base data-[placeholder]:text-base data-[placeholder]:text-start focus:outline-none focus:text-neutral-black select-none text-base font-regular text-black-primary w-full'
      }
   }
})

/**
 * @notice The root component of the Select module.
 * @param {ReactNode} children - The children components or nodes.
 * @returns JSX.Element - A Root Select component.
 */
const Root: React.FC<Select.SelectProps> = ({ children, ...props }: Select.SelectProps) => {
   return <Select.Root {...props}>{children}</Select.Root>
}

/**
 * @notice Icon component for the Select dropdown.
 * @param {ReactNode} children - The children components or nodes.
 * @param {string} [className] - Additional classes for styling the component.
 * @returns JSX.Element - A Select Icon component.
 */
const Icon: React.FC<Select.SelectIconProps> = ({ children, className }: Select.SelectIconProps) => {
   return <Select.Icon className={twMerge('text-black-primary', className)}>{children}</Select.Icon>
}

/**
 * @notice Trigger component that toggles the Select dropdown.
 * @param {ReactNode} children - The children components or nodes.
 * @param {string} [className] - Additional classes for styling the component.
 * @param {string} [variant='small'] - Defines the visual variant of the trigger. Available options: 'small', 'input'.
 * @returns JSX.Element - A Trigger component for the Select dropdown.
 */
const Trigger: React.FC<TriggerProps> = ({ children, className, variant = 'small', ...props }: TriggerProps) => {
   return (
      <Select.Trigger
         className={twMerge(
            select({ type: variant }),
            className,
            'data-[placeholder]:text-neutral-light_gray data-[placeholder]:font-regular data-[placeholder]:text-base'
         )}
         {...props}
      >
         {children}
      </Select.Trigger>
   )
}

/**
 * @notice Content component for displaying select options.
 * @param {ReactNode} children - The children components or nodes.
 * @param {string} [className] - Additional classes for styling the component.
 * @returns JSX.Element - A Content container for Select options.
 */
const Content: React.FC<Select.SelectContentProps> = ({ children, className, ...props }: Select.SelectContentProps) => {
   return (
      <Select.Content
         position="popper"
         className={twMerge('bg-neutral-white rounded-sm shadow-content overflow-hidden p-1 z-[9998] absolute', className)}
         {...props}
      >
         {children}
      </Select.Content>
   )
}

/**
 * @notice Individual select item component.
 * @param {ReactNode} props.children The children components or nodes.
 * @param {string} [props.className] Additional classes for styling the component.
 */
const Item: React.FC<Select.SelectItemProps> = ({ children, className, ...props }: Select.SelectItemProps) => {
   return (
      <Select.Item
         className={twMerge(
            'text-black-primary select-none font-regular hover:text-white px-4 py-1 rounded-sm hover:outline-none focus:outline-none text-sm w-full relative cursor-pointer hover:bg-primary-main',
            className
         )}
         {...props}
      >
         {children}
      </Select.Item>
   )
}

/**
 * @notice Text component for select items.
 * @param {ReactNode} props.children The children components or nodes.
 * @param {string} [props.className] Additional classes for styling the component.
 */
const ItemText: React.FC<Select.SelectItemTextProps> = ({ children, className, ...props }: Select.SelectItemTextProps) => {
   return (
      <Select.ItemText {...props} className={twMerge('text-sm text-black-primary select-none font-regular hover:bg-white-hover', className)}>
         {children}
      </Select.ItemText>
   )
}

/**
 * @notice Value component to display selected value.
 * @param {ReactNode} props.children The children components or nodes.
 * @param {string} [props.className] Additional classes for styling the component.
 */
const Value: React.FC<Select.SelectValueProps> = ({ children, className, ...props }: Select.SelectValueProps) => {
   return (
      <Select.Value className={twMerge('text-black-primary select-none font-regular text-sm', className)} {...props}>
         {children}
      </Select.Value>
   )
}

/**
 * @notice The viewport component of the Select module.
 * @param {ReactNode} props.children The children components or nodes.
 * @param {string} [props.className] Additional classes for styling the component.
 */
const Viewport: React.FC<Select.SelectViewportProps> = ({ children, className, ...props }: Select.SelectViewportProps) => {
   return (
      <Select.Viewport className={twMerge(className)} {...props}>
         {children}
      </Select.Viewport>
   )
}

/**
 * @notice The portal component of the Select module, for rendering children outside the DOM hierarchy.
 * @param {ReactNode} props.children The children components or nodes.
 */
const Portal: React.FC<Select.SelectPortalProps> = ({ children, ...props }: Select.SelectPortalProps) => {
   return (
      <Select.Portal className="w-full relative" {...props}>
         {children}
      </Select.Portal>
   )
}

/**
 * @notice Group component to group related select items.
 * @param {ReactNode} props.children The children components or nodes.
 * @param {string} [props.className] Additional classes for styling the component.
 */
const Group: React.FC<Select.SelectGroupProps> = ({ children, className, ...props }) => {
   return (
      <Select.Group className={twMerge(className)} {...props}>
         {children}
      </Select.Group>
   )
}

export { Content, Group, Icon, Item, ItemText, Portal, Root, Trigger, Value, Viewport, select }
