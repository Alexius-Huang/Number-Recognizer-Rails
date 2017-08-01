// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Panel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="panel">
        This is the panel
      </div>
    )
  }
}

Panel.defaultProps = {
  name: 'Maxwell'
}

Panel.propTypes = {
  name: PropTypes.string
}
