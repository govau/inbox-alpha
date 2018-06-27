import React from 'react'
import { Redirect } from 'react-router-dom'

export default ({ client, ...props }) => {
  if (!client) {
    console.warn('cache-busting-redirect was provided no client. cannot bust')
  }

  client && client.resetStore()
  return <Redirect {...props} />
}
