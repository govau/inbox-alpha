import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const style = css`
  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    background-color: #ff5d81;
    color: #fff;
    font-size: 0.65em;
    top: -1em;
    right: -2.5rem;
    height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    padding-top: 0.3rem;
    content: attr(data-count);
  }
`

const Counter = Component => styled(Component)`
  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    background-color: #ff5d81;
    color: #fff;
    font-size: 0.65em;
    top: -1em;
    right: -2.5rem;
    height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    padding-top: 0.3rem;
    content: attr(data-count);
  }
`

const CounterLink = Counter(Link)

export { Counter as default, style, CounterLink }
