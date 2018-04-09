import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SVGBase = styled.svg.attrs({
  fill: 'currentColor',
  viewBox: '0 0 20 20',
})`
  vertical-align: middle;
  ${'' /* color: ${({ theme }) => color}; */};
`

const IconBase = ({ width, height, ...props }) => {
  return (
    <SVGBase
      width={width || height || '20px'}
      height={width || height || '20px'}
      {...props}
    />
  )
}

IconBase.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default IconBase
