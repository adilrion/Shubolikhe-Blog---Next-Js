'use client'
import Link from 'next/link'
import React from 'react'
const ClientSideRoute = ({ children, route }) => {
  return (
    <div id="RouterNavLink" href={route}>{ children }</div>
  )
}

export default ClientSideRoute