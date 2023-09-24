import { cn } from '@/lib/utils'
import { ComboboxProps, ErrorProps, InputProps, LabelProps, SelectInputProps, TextAreaProps, WrapperInputProps } from '@components/common/Input/Typing'
import * as S from '@components/common/Select/Select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Check } from 'lucide-react'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { CaretDown, Eye, EyeSlash, Search as SearchIcon } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const input = tv({
   base: 'flex border-b-[1px] border-neutral-light_gray p-2 pt-0 placeholder:text-gray-light placeholder:text-base  focus:outline-none focus:text-neutral-black w-full placeholder-shown:text-neutral-black bg-transparent focus:border-neutral-black',
   variants: {
      hasIcon: {
         start: 'data-[start=true]:px-11',
         end: 'data-[end=true]:px-11',
         none: ''
      },
      disabled: {
         true: 'bg-[#ededed] text-[#6c6c6c] cursor-not-allowed',
         false: ''
      }
   }
})

const textArea = tv({
   base: 'flex border-b-[1px] border-neutral-light_gray p-2 pt-0 placeholder:text-gray-light placeholder:text-base  focus:outline-none focus:text-neutral-black w-full placeholder-shown:text-neutral-black bg-transparent focus:border-neutral-black',
   variants: {
      hasIcon: {
         start: 'data-[start=true]:px-11',
         end: 'data-[end=true]:px-11',
         none: ''
      }
   }
})

const password = tv({
   base: 'flex border-b-[1px] border-neutral-light_gray p-2 pt-0 placeholder:text-gray-light placeholder:text-base  focus:outline-none focus:text-neutral-black w-full placeholder-shown:text-neutral-black bg-transparent focus:border-neutral-black'
})

/**
 * @notice This component is used to render a container (div) with its children.
 * @dev This is a top-level component that accepts its children as props.
 * @param {ReactNode} props.children The child nodes this component will render.
 */
const Root: React.FC<WrapperInputProps> = ({ children }: WrapperInputProps) => {
   return <div className="grid items-end gap-2 w-full relative">{children}</div>
}

/**
 * @notice This component is used to render a label with an optional tag if the 'optional' prop is provided.
 * @dev This is a functional component that extends the basic HTML label element properties.
 * @param {Object} props The properties provided to the component
 * @param {ReactNode} props.children The text of the label
 * @param {boolean} [props.optional] If set to true, an optional tag will be displayed
 */
const Label: React.FC<LabelProps> = ({ children, optional, ...props }: LabelProps) => {
   return (
      <label className="text-sm text-black-primary font-semibold pl-2" {...props}>
         {children} {optional && <span className="text-gray-main font-regular">(Opcional)</span>}
      </label>
   )
}

/**
 * @notice This component is used to render error messages.
 * @dev This is a functional component that accepts 'children' as props.
 * @param {ReactNode} props.children The error message to display
 */
const Error: React.FC<ErrorProps> = ({ children }: ErrorProps) => {
   return <React.Fragment>{children && <p className="text-red-500 text-sm">{children}</p>} </React.Fragment>
}

/**
 * @notice This component is used to render a textarea input field.
 * @dev This is a functional component that extends the basic HTML textarea element properties.
 * @param {Object} props The properties provided to the component. These properties are extensions of the basic HTML textarea attributes.
 */
const TextArea = React.forwardRef<HTMLInputElement, TextAreaProps>(({ icon, start = icon ? true : false, end, className, ...props }, ref) => {
   /** @dev define if has icon */
   const hasIcon = icon !== undefined
   const iconPosition = start ? 'start' : end ? 'end' : 'none'

   return (
      <React.Fragment>
         <div className="relative h-fit">
            {hasIcon && (
               <div data-end={end} className="absolute left-0 top-3 bottom-0 flex items-start px-3 data-[end=true]:left-auto data-[end=true]:right-0">
                  {icon}
               </div>
            )}
            <textarea ref={ref as LegacyRef<HTMLTextAreaElement>} className={twMerge(textArea({ hasIcon: iconPosition }), className)} {...props} />
         </div>
      </React.Fragment>
   )
})

/**
 * @notice The Password component is a password input field with an option to toggle the visibility of the entered text.
 * @dev This component extends the basic HTML input element properties and includes additional properties for icon visibility.
 * @param {Object} props Contains the properties provided to the component. These properties are extensions of the basic HTML input attributes.
 * @param {ReactNode} [props.icon] The icon to be displayed
 * @param {boolean} [props.start] If true, the icon is positioned at the start of the input field
 * @param {boolean} [props.end] If true, the icon is positioned at the end of the input field
 * @param {boolean} [props.visible] If true, the entered text in the input field is visible
 */
const Password = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
   const [isVisible, setIsVisible] = useState(false)

   return (
      <React.Fragment>
         <div className="relative">
            <input ref={ref} className={password()} type={isVisible ? 'text' : 'password'} {...props} />
            <div className="absolute right-0 top-0 bottom-0 flex items-center px-3">
               {isVisible ? (
                  <Eye className="w-full cursor-pointer fill-neutral-gray" onClick={() => setIsVisible(!isVisible)} />
               ) : (
                  <EyeSlash className="w-full cursor-pointer fill-neutral-gray" onClick={() => setIsVisible(!isVisible)} />
               )}
            </div>
         </div>
      </React.Fragment>
   )
})

/**
 * @notice This component is used to render an input field, which can optionally have an icon at its start or end.
 * @dev This is a functional component that extends the basic HTML input element properties and includes additional properties for icon positioning.
 * @param {Object} props The properties provided to the component. These properties are extensions of the basic HTML input attributes.
 * @param {ReactNode} [props.icon] The icon to be displayed
 * @param {boolean} [props.start] If true, the icon is positioned at the start of the input field
 * @param {boolean} [props.end] If true, the icon is positioned at the end of the input field
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, start = icon ? true : false, end, disabled = false, className, ...props }, ref) => {
   /** @dev define if has icon */
   const hasIcon = icon !== undefined
   const iconPosition = start ? 'start' : end ? 'end' : 'none'
   const disabledStatus = disabled ? true : false

   return (
      <React.Fragment>
         <div className="relative h-fit">
            {hasIcon && (
               <div data-end={end} className="absolute left-0 top-0 bottom-0 flex items-center px-3 data-[end=true]:left-auto data-[end=true]:right-0">
                  {icon}
               </div>
            )}
            <input
               ref={ref}
               disabled={disabled}
               data-start={hasIcon && !end}
               className={twMerge(
                  input({
                     hasIcon: iconPosition,
                     disabled: disabledStatus
                  }),
                  className
               )}
               {...props}
            />
         </div>
      </React.Fragment>
   )
})

/**
 * @notice This component renders an input field specialized for search functionalities. It includes an embedded search icon on the left side of the input.
 * @dev The `Search` component is a forward-ref React component that accepts `InputProps`. The component renders an input field with an embedded search icon and additional styles and configurations are possible through provided props.
 *
 * @param {boolean} [disabled=false] - Determines whether the search input should be disabled.
 * @param {string} [className] - An optional additional CSS class that can be applied to the input.
 * @param {...InputProps} props - Other properties passed to the input component.
 *
 * @return JSX.Element - A search input field.
 */
const Search = React.forwardRef<HTMLInputElement, InputProps>(({ disabled = false, className, ...props }, ref) => {
   return (
      <Root>
         <Input ref={ref} disabled={disabled} className={twMerge('px-4 py-2 h-10', className)} {...props} icon={<SearchIcon className="w-[1.125rem] h-[1.125rem] text-gray-400" />} />
      </Root>
   )
})

/**
 * @notice A custom select input component. It can display a list of options and supports custom styling, labels, and placeholders.
 *
 * @property {Array<Object>} options - An array of option objects. Each object should contain an `id`, `value`, and `title`.
 * @property {string} placeholder - A text that will be shown when no option is selected.
 * @property {string} [label] - Optional label for the select input.
 * @property {string} [className] - Additional classes to apply custom styles.
 *
 * @returns {ReactElement} A styled select input component.
 */
const Select = React.forwardRef<HTMLInputElement, SelectInputProps>(
   ({ options, placeholder, label, className, value, defaultValue, onValueChange, variant = 'input', icon, start = icon ? true : false, end, required }: SelectInputProps, ref) => {
      /** @dev define if has icon */
      const hasIcon = icon !== undefined

      /** @dev Get ref object to set width of content */
      const triggerRef = useRef<HTMLDivElement>(null)
      const [triggerWidth, setTriggerWidth] = useState<number>(0)

      /** @dev Set width of content when trigger width is changed */
      useEffect(() => {
         if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth)
         }
      }, [triggerWidth])

      return (
         <S.Root
            value={value}
            defaultValue={defaultValue}
            required={required}
            onValueChange={(value: string) => {
               onValueChange?.(value)
            }}
         >
            <div className="grid gap-2">
               {label && <label className="text-base font-semibold">{label}</label>}
               <div className="relative h-fit">
                  {hasIcon && (
                     <div data-end={end} className="absolute left-0 top-0 bottom-0 flex items-center px-3 data-[end=true]:left-auto data-[end=true]:right-0">
                        {icon}
                     </div>
                  )}
                  <div ref={triggerRef} className="w-full">
                     <S.Trigger variant={variant} aria-controls="select-trigger">
                        <S.Value placeholder={placeholder} />
                        <S.Icon>{hasIcon ? <CaretDown className="fill-black-primary mr-[5.5rem]" width={18} /> : <CaretDown className="fill-black-primary" width={18} />}</S.Icon>
                     </S.Trigger>
                  </div>
               </div>
            </div>
            <S.Portal>
               <S.Content sideOffset={5} position="item-aligned" className={twMerge(className)} style={{ width: triggerWidth }}>
                  <S.Viewport>
                     <S.Group>
                        {options?.map((option) => (
                           <S.Item className="text-md font-regular" key={option.id || option.value} value={option.value}>
                              <S.ItemText>{option.label}</S.ItemText>
                           </S.Item>
                        ))}
                     </S.Group>
                  </S.Viewport>
               </S.Content>
            </S.Portal>
         </S.Root>
      )
   }
)

/**
 * @notice The Combobox component provides an interactive dropdown list of options.
 * @dev This component leverages the Popover component for rendering. It has controlled states for openness and the currently selected value.
 *
 * @param {Object[]} options - An array of options where each option is an object with `value` and `label` properties.
 * @param {string} [className] - Optional classes for additional styling.
 * @param {(value: string) => void} [onSelect] - Callback function that is triggered when an option is selected.
 * @param {string} [placeholder] - A placeholder text displayed when no value is selected.
 *
 * @return {JSX.Element} The rendered Combobox component.
 */
const Combobox: React.FC<ComboboxProps> = ({ options, className, onSelect, placeholder }: ComboboxProps) => {
   /** @dev States to controll when is opened and values */
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState('')

   /** @dev Constants to define define values until render */
   const valueOrPlaceholder = value ? options.find((opt) => opt.value === value)?.label : placeholder

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <button type="button" className={twMerge(S.select({ type: 'small' }), 'items-center justify-between w-52 py-2', className)}>
               <span className="text-gray-main text-sm">{valueOrPlaceholder}</span>
               <CaretDown className="fill-black-primary" width={18} />
            </button>
         </PopoverTrigger>
         <PopoverContent className="pb-1 w-52">
            <Command>
               <CommandInput placeholder={`Digite para pesquisar`} />
               <CommandEmpty>Não há resultados</CommandEmpty>
               <CommandGroup>
                  {options.map((opt) => (
                     <CommandItem
                        key={opt.value}
                        onSelect={() => {
                           if (opt.value === value) {
                              setValue('')
                              onSelect?.('')
                              setOpen(false)
                           } else {
                              setValue(opt.value)
                              onSelect?.(opt.value)
                              setOpen(false)
                           }
                        }}
                     >
                        <Check className={cn('mr-2 h-4 w-4', value === opt.value ? 'opacity-100' : 'opacity-0')} />
                        {opt.label}
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

/** @dev Set display name for each component */
TextArea.displayName = 'TextArea'
Password.displayName = 'Password'
Input.displayName = 'Input'
Search.displayName = 'Search'
Select.displayName = 'Select'

export { Combobox, Error, Input, Label, Password, Root, Search, Select, TextArea }
