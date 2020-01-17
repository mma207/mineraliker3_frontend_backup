import React, { Component } from 'react';

export default class Post extends Component {

    state = {
        comment: "",
        comments: []
    }

    componentDidMount(){
        this.setState({
            comments: this.props.post.comments
        })
    }

    handleComment = (event) => {
        this.setState({
            comment: event.target.value,
        })
    }

    handleSubmitComment = (event) => {
        event.preventDefault()

        fetch(`http://localhost:3000/comments`, {
          method:'POST',
          headers: { 
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
          text: this.state.comment,
          post_id: this.props.post.id
          })
        })
        .then(r => r.json())
        .then(newComment => { 
            let allComments = [...this.state.comments, newComment]
            this.setState({
                comments: allComments
            })
        })
        event.target.reset()
    }

	render() {
		return (
			<div align="center">
				<div className="ui card" align="left">
					<div className="content">
						<img className="ui avatar image" src="/images/wireframe/square-image.png"/> 
                        <span>Username</span>
					</div>
					<div className="image">
						<img src={this.props.img} />
						<p>{this.props.caption}</p>
					</div>
					<div className="content">
						<span className="right floated">
							<button>
								<i className="heart outline like icon" onClick={() => this.props.handleLike(this.props.post)}/>
							</button>
							{this.props.likes}
						</span>
						<i className="comment icon" />
                            {this.state.comments.length} comments
					</div>
					<div className="extra content">
						<div className="ui large transparent input">
                            <form onSubmit={this.handleSubmitComment}>
							    <input type="text" placeholder="Add Comment..." onChange={this.handleComment}/>
                            </form>
						</div>
					</div>
				</div>
				<br />
			</div>
		);
	}
}
