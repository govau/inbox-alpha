import React from 'react'
import Loading from './loading'
import Err from './error'

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

