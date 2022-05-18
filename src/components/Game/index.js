import * as React from 'react'
import './styles.css'

class App extends React.Component {
  outerContainerEl

  constructor(props) {
    super(props)
    this.state = {
      outerContainerEl: null,
    }
  }

  async componentDidMount() {
    const config = {
      id: 'runner',
      width: this.outerContainerEl.offsetWidth,
    }
    const { Runner } = await import('../Runner')
    const runner = new Runner(this.outerContainerEl, config, this.props);
    runner.init()
  }

  render() {
    return (
      <div
        ref={node => (this.outerContainerEl = node)}
        className='runner-wrapper'
      />
    )
  }
}

export default App