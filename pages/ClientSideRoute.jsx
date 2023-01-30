'use client'
import Link from 'next/link'
import React from 'react'




const ClientSideRoute = ({ children, route }) => {
  return (
    <Link id="RouterNavLink" href={route}>{ children }</Link>
  )
}

export default ClientSideRoute