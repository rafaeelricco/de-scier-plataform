import { theme } from '@/styles/colors'
import styled from 'styled-components'

export const InputPagination = styled.input`
   all: unset;
   box-sizing: border-box;
   display: flex;
   flex-direction: row;
   align-items: center;

   height: 1.6rem;
   width: 2rem;

   background: transparent;
   border-radius: 4px;
   text-align: center;

   border: 1px solid ${theme.white};
   caret-color: ${theme.white};

   &:hover {
      border: 1px solid ${theme.white};
   }

   &::placeholder {
      font-size: clamp(14px, 5vw, 16px);
      color: ${theme.white};
   }

   &:not(:placeholder-shown) {
      color: ${theme.white};
   }

   &:focus {
      border: 1px solid ${theme.white};
   }
`
