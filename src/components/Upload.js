import React, { Component } from 'react'


export default class Upload extends Component {
    render() {
        return (
            <div>
                <h1>Upload</h1>
                <form onSubmit={this.props.handleUpload}>
                    <input type="file" accept="image/*" capture="camera" onChange={this.props.handleChange}/>
                    <input type="string" placeholder="caption" onChange={this.props.handleCaption}/>
                    <button>Upload</button>
                </form>
            </div>
        )
    }
}
