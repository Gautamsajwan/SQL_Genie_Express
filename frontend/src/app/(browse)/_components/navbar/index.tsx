import React from 'react'
import Logo from './logo'
import Actions from './actions'

type Props = {}

function Navbar({}: Props) {
  return (
    <nav className="fixed top-0 w-full h-16 z-[56] bg-[#1e1e20]/50 backdrop-blur-xs px-4 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Actions />
    </nav>
  )
}

export default Navbar