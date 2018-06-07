import React from 'react'

export default ({ message = 'loading', children = 'Just hang on...' }) => (
  <div>
    <div>{message}</div>
    <section>{children}</section>
  </div>
)
