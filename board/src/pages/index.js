import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Home from './home'
import Err from '../components/error'
import Loading from '../components/loading'
import Header from '../components/header'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'
import { theme } from '../components/mygov'

const IndexPage = props => (
  <Router>
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <Header />
        <main role="main">
          <Switch>
            <Route exact path="/" component={Home} />
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
