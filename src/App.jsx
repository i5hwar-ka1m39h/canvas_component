import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MaskDrawingApp from './Component/MaskDrawingApp'
import { CanvasEl } from './Component/CanvasEl'
import Last from './Component/Last'

function App() {
  

  return (
    <>
    <div>
      <h1 className='text-3xl'>React App</h1>
     <MaskDrawingApp/>
    </div>
    </>
  )
}

export default App
