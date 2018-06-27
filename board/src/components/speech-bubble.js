import styled, { css } from 'styled-components'

const Content = styled.div`
  padding: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  background-color: #f3f5f5;
  box-shadow: 0 0 5px 0 #7e9dff;
  border: 6px solid #6085ff;
  border-radius: 2rem;
  position: relative;

  box-shadow: none;
  border: none;

  ${props =>
    props.reversed
      ? css`
          background-color: #f1f3d6;
        `
      : css``};

  &:before {
    content: '';
    content: none;
    position: absolute;
    bottom: 1rem;
    border-style: solid;
    border-color: transparent #6085ff;
    display: block;
    width: 0;

    ${props =>
      props.reversed
        ? css`
            right: -2rem;
            border-width: 2rem 0 2rem 2rem;
          `
        : css`
            border-width: 2rem 2rem 2rem 0;
            left: -2rem;
          `};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 2rem;
    border-style: solid;
    border-color: transparent #f3f5f5;
    display: block;
    width: 0;

    ${props =>
      props.reversed
        ? css`
            border-color: transparent #f1f3d6;
            border-width: 1rem 0 1rem 1rem;
            right: -1rem;
          `
        : css`
            border-width: 1rem 1rem 1rem 0;
            left: -1rem;
          `};
  }
`

export default Content
