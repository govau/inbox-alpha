import React from 'react'
import { Query as ApolloQuery } from 'react-apollo'

import Loading from './loading'
import Err from './error'

export const Query = ({ children, selector = data => data, ...props }) => (
  <ApolloQuery {...props}>
    {({ loading, error, data, client }) =>
      loading ? (
        <Loading />
      ) : error ? (
        <Err>{error.message}</Err>
      ) : !selector(data) ? (
        <Err message="oof." />
      ) : (
        children(selector(data))
      )
    }
  </ApolloQuery>
)

export default (Component, selector = data => data) => ({
  data: { loading, error, ...data },
  ...props
}) => {
  return loading ? (
    <Loading />
  ) : error ? (
    <Err>{error.message}</Err>
  ) : !selector(data) ? (
    <Err message="oof." />
  ) : (
    <Component {...props} {...selector(data)} />
  )
}
