import React from 'react'
import {connect} from 'react-redux'
import marked from 'marked'
import {getPost} from '../../state/posts'
import {Items} from 'test-app-components'

class PostPage extends React.Component {
  static defaultProps = {
    post: ''
  }

  componentDidMount() {
    if (!this.props.post) this.props.getPost(this.props.id)
  }

  render() {
    return (
      <Items spaceAround>
        <article dangerouslySetInnerHTML={{__html: marked(this.props.post)}}></article>
      </Items>
    )
  }
}

const mapStateToProps = (state, props) => ({ post: state.posts.posts[props.id] })
const mapDispatchToProps = { getPost }

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
