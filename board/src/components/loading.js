import React from 'react'

import Loader from './loader'

export default ({ message = 'loading', children = 'Just hang on...' }) => (
  <div>
    <div>{message}</div>
    <section>{children}</section>
  </div>
)
