import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Counter = Component => styled(Component)`
  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    z-index: -1;
    border-radius: 1em;
    background-color: #ff5d81;
    background-color: #e23b3b;
    font-weight: bold;
    color: #fff;
    font-size: 0.65em;
    top: 0;
    right: -2.2rem;
    min-width: 2rem;
    text-align: center;
    content: attr(data-count);
  }
`

const CounterLink = Counter(Link)

export { Counter as default, CounterLink }
