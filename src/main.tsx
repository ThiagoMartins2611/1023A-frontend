import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import Container from './container.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Container nome='Header' />
    <Container nome='Body' />
    <Container nome='Footer'/>

  </StrictMode>,
)
