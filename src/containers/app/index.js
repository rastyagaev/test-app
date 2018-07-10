import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Button, Theme, Items, Spacing, Navbar, Footer} from 'test-app-components'
import {signIn, signOut, checkSession} from '../../state/session'
import Post from '../post'
import './App.css'

class App extends Component {
  renderNewUserButtons() {
    return (
      <Button modifier="primary">
        <button type="button" onClick={this.props.signIn}>Sign in</button>
      </Button>
    )
  }

  renderSignedInButtons() {
    return (
      <Items spaceBetween>
        <Button modifier="transparent">
          <a href="/settings">
            <span role="img" aria-label="user profile">👤</span>
          </a>
        </Button>

        <Button modifier="primary">
          <button type="button" onClick={this.props.signOut}>Sign out</button>
        </Button>
      </Items>
    )
  }

  componentDidMount() {
    this.props.checkSession()
  }

  render() {
    return (
      <Theme className="App">
        <Items spaceBetween direction="column">
          <Navbar logoText="Example application 💕">
            <Spacing />
            {
              this.props.signedIn ? this.renderSignedInButtons() : this.renderNewUserButtons()
            }
          </Navbar>

          <main className="App-content">
            <Post id="main-post" />
          </main>

          <Footer motto="Test app">
            <Spacing />
            <a href="/about">About</a>
          </Footer>
        </Items>
      </Theme>
    )
  }
}

const mapStateToProps = (state, props) => ({ signedIn: state.session.signedIn })
const mapDispatchToProps = {signIn, signOut, checkSession}
export default connect(mapStateToProps, mapDispatchToProps)(App)
