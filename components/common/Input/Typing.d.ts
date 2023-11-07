import React from 'react'
import { TriggerProps } from '../Select/Typing'

interface WrapperInputProps {
   children: React.ReactNode
}
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
   optional?: boolean
   icon?: React.ReactNode
   tooltip_message?: string | React.ReactNode
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   start?: React.ReactNode
   end?: React.ReactNode
   icon?: React.ReactNode
   visible?: boolean
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   start?: React.ReactNode
   end?: React.ReactNode
   icon?: React.ReactNode
}

interface ErrorProps {
   children: React.ReactNode
}

export type Option = {
   id?: number
   label: string
   value: string
}

interface SelectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   start?: React.ReactNode
   end?: React.ReactNode
   icon?: React.ReactNode
   options: Option[]
   label?: strings
   value?: string
   defaultValue?: string
   variant?: TriggerProps['variant']
   onValueChange?: (value: string) => void
}

interface LabelWithTrashIconProps extends React.HTMLAttributes<HTMLDivElement> {
   text: string
   optional?: boolean
   onDelete: () => void
}

interface ComboboxProps {
   placeholder?: string
   options: Option[]
   onSelect?: ((value: string) => void) | undefined
   className?: string
}

export { ComboboxProps, ErrorProps, InputProps, LabelProps, LabelWithTrashIconProps, Option, SelectInputProps, TextAreaProps, WrapperInputProps }
