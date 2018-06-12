import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Err from '../components/error'
import Loading from '../components/loading'
//import Header from '../components/header/mygov'
import Header from '../components/header'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'
import { theme } from '../components/mygov'
import { AuthenticatedRoute } from '../components/auth'

import Home from './messages'
import Login, { Logout } from './login'

const IndexPage = props => (
  <Router>
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <Header />
        <main role="main">
          <Switch>
            <AuthenticatedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/loading" component={Loading} />
            <Route component={Err} />
          </Switch>
        </main>
        <Footer />
      </ScrollToTop>
    </ThemeProvider>
  </Router>
)

export { IndexPage as default, IndexPage }
