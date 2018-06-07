import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const generic = (
  <Fragment>
    <p>We lost what you were looking for.</p>
    <p>
      Why not <Link to="/">start over</Link> and let us try again?
    </p>
  </Fragment>
)

const Error = ({ message = 'bugger.', children = generic }) => (
  <div>
    <div>{message}</div>
    <section>{children}</section>
  </div>
)

const ErrorPage = props => (
  <Fragment>
    <div>
      <header>
        <h1>error </h1>
      </header>
    </div>
    <Error {...props} />
  </Fragment>
)

export { ErrorPage as default, Error, ErrorPage }
