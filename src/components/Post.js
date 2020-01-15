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
				<div class="ui card" align="left">
					<div class="content">
						<img class="ui avatar image" src="/images/avatar/large/elliot.jpg" /> User
					</div>
					<div class="image">
						<img src={this.props.img} onClick={() => this.props.handleLike(this.props.post)} />
						<p>{this.props.caption}</p>
					</div>
					<div class="content">
						<span class="right floated">
							<button>
								<i class="heart outline like icon" />
							</button>
							{this.props.likes}
						</span>
						<i class="comment icon" />
                            {this.state.comments.length} comments
					</div>
					<div class="extra content">
						<div class="ui large transparent input">
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
