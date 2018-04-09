import React from 'react'
import PropTypes from 'prop-types'

import Icons from './icons.js'

const Icon = ({ name, filled, ...rest }) => {
  const IconComponent = filled ? Icons.filled[name] : Icons[name]
  return <IconComponent {...rest} />
}

Icon.propTypes = {
  filled: PropTypes.bool,
  name: PropTypes.oneOf(Object.keys(Icons)),
}

export default Icon
