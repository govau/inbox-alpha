import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Err from '../components/error'
import Header, { LoggedOutHeader } from '../components/header'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'
import Loader from '../components/loader'
import { theme } from '../components/mygov'
import { AuthenticatedRoute } from '../components/auth'

import Home from './messages'
import Login, { Logout, StandaloneLogin } from './login'

const IndexPage = props => (
  <Router>
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/login" component={StandaloneLogin} />
          <Route
            render={() => (
              <Fragment>
                <AuthenticatedRoute
                  component={Header}
                  alternative={LoggedOutHeader}
                />
                <main role="main">
                  <Switch>
                    <AuthenticatedRoute exact path="/" component={Home} />
                    <AuthenticatedRoute path="/messages" component={Home} />
                    <Route exact path="/loginx" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/profile" component={Err} />
                    <Route exact path="/permissions" component={Err} />
                    <Route exact path="/activity" component={Err} />
                    <Route
                      exact
                      path="/loader"
                      render={() => (
                        <Loader icon="lock">
                          <h2>hold on.</h2>
                          <p>this might take a while.</p>
                        </Loader>
                      )}
                    />
                    <Route component={Err} />
                  </Switch>
                </main>
                <Footer />
              </Fragment>
            )}
          />
        </Switch>
      </ScrollToTop>
    </ThemeProvider>
  </Router>
)

export { IndexPage as default, IndexPage }
