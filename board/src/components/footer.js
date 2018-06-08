import React from 'react'

import coat from './coat-of-arms.svg'
import './footer.css'

export default props => (
  <footer role="contentinfo">
    <div className="wrapper">
      <section className="footer__content">
        <nav>
          <ul>
            {/* outside router; can't use <Link /> without reworking it all */}
            <li>
              <a href="/privacy-policy">Privacy policy</a>
            </li>
            <li>
              <a href="/todo/terms-and-conditions">Terms and conditions</a>
            </li>
            <li>
              <a href="/todo/contact">Contact us</a>
            </li>
            <li>
              <a href="/todo/help">Need help?</a>
            </li>
          </ul>
        </nav>
      </section>

      <hr />

      <section className="footer__aus">
        <img className="footer__coat" src={coat} alt="coat of arms" />
        <p>
          © Commonwealth of Australia, <a href="#">MIT licensed</a>
        </p>
      </section>
    </div>
  </footer>
)
