import * as Tooltip from '@radix-ui/react-tooltip'
import '@styles/tooltip.css'
import HelpIcon from 'public/svgs/common/help.svg'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { TooltipInformationProps } from './Typing'

/**
 * @title Tooltip Provider Component
 * @notice This component provides context for the tooltip.
 * @dev Wrapper around the Radix UI's Tooltip.Provider component.
 * @param children {ReactNode} Children nodes to be rendered inside the tooltip provider.
 * @param props {Tooltip.TooltipProviderProps} Properties passed to the tooltip provider.
 */
const Provider: React.FC<Tooltip.TooltipProviderProps> = ({ children, ...props }) => {
   return <Tooltip.Provider {...props}>{children}</Tooltip.Provider>
}

/**
 * @title Tooltip Root Component
 * @notice This component provides the main structure for a custom tooltip.
 * @dev Wrapper around the Radix UI's Tooltip.Root component.
 * @param children {ReactNode} Children nodes to be rendered inside the tooltip root.
 * @param props {Tooltip.TooltipProps} Properties passed to the tooltip root.
 */
const Root: React.FC<Tooltip.TooltipProps> = ({ children, ...props }) => {
   return <Tooltip.Root {...props}>{children}</Tooltip.Root>
}

/**
 * @title Tooltip Trigger Component
 * @notice This component triggers the appearance of the tooltip content.
 * @dev Wrapper around the Radix UI's Tooltip.Trigger component.
 * @param children {ReactNode} Children nodes to act as the trigger for the tooltip.
 * @param props {Tooltip.TooltipTriggerProps} Properties passed to the tooltip trigger.
 */
const Trigger: React.FC<Tooltip.TooltipTriggerProps> = ({ children, ...props }) => {
   return <Tooltip.Trigger {...props}>{children}</Tooltip.Trigger>
}

/**
 * @title Tooltip Portal Component
 * @notice This component provides a portal for the tooltip to be attached to the DOM.
 * @dev Wrapper around the Radix UI's Tooltip.Portal component.
 * @param children {ReactNode} Children nodes to be rendered inside the tooltip portal.
 * @param props {Tooltip.TooltipPortalProps} Properties passed to the tooltip portal.
 */
const Portal: React.FC<Tooltip.TooltipPortalProps> = ({ children, ...props }) => {
   return <Tooltip.Portal {...props}>{children}</Tooltip.Portal>
}

/**
 * @title Tooltip Content Component
 * @notice This component displays the content of the tooltip.
 * @dev Provides additional styling and incorporates the Tooltip Arrow.
 * @param children {ReactNode} The content to be displayed inside the tooltip.
 * @param props {Tooltip.TooltipContentProps} Properties passed to the tooltip content.
 */
const Content: React.FC<Tooltip.TooltipContentProps> = ({ className, children, ...props }) => {
   return (
      <Tooltip.Content className={twMerge('tooltip-content', className)} sideOffset={5} {...props}>
         {children}
         <Tooltip.Arrow width={16} height={8} className="TooltipArrow" />
      </Tooltip.Content>
   )
}

/**
 * @title Tooltip Information Component
 * @notice This component aggregates the structure for tooltip information.
 * @dev It's a combined use of Root, Trigger, Portal, and Content components to show information on hover.
 * @param content {ReactNode} The main content of the tooltip.
 */
const Information: React.FC<TooltipInformationProps> = ({ content }) => {
   return (
      <React.Fragment>
         <Root delayDuration={50}>
            <Trigger>
               <HelpIcon className="fill-neutral-gray w-5 cursor-pointer" />
            </Trigger>
            <Portal>
               <Content>{content}</Content>
            </Portal>
         </Root>
      </React.Fragment>
   )
}

export { Content, Information, Portal, Provider, Root, Trigger }
