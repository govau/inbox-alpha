import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Counter = Component => styled(Component)`
  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    border-radius: 1em;
    background-color: #ff5d81;
    background-color: #e23b3b;
    font-weight: bold;
    color: #fff;
    font-size: 1.2rem;
    padding: 0 0.4rem;
    top: 0;

    ${props =>
      props.reversed
        ? css`
            left: -1rem;
          `
        : css`
            right: -2.2rem;
          `};

    min-width: 2rem;
    text-align: center;
    content: attr(data-count);
  }
`

const CounterLink = Counter(Link)

export { Counter as default, CounterLink }
