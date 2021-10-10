import React, {FC, ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { TodoProvider } from '../contexts/TodoContext/useTodoContext'


const AllTheProviders: FC = ({children}) => {
  return (
    <TodoProvider>
      {children}
    </TodoProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}