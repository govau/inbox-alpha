import React from 'react'
import { Redirect } from 'react-router-dom'

export default ({ client, ...props }) => {
  client && client.resetStore()
  return <Redirect {...props} />
}
