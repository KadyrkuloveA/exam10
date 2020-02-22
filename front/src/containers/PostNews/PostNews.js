import React, {Component} from 'react';
import {connect} from "react-redux";
import {postNews} from "../../store/actions/newsActions";

class PostNews extends Component {
    state = {
        title: '',
        content: '',
        image: ''
    };

    submitFormHandler = async event => {
        event.preventDefault();

        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        await this.props.postNews(formData);
        this.props.history.push('/');
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <div className="card shadow-sm bg-white rounded" style={{maxWidth: '1000px', margin: '0 auto'}}>
                <div className="card-body">
                    <form onSubmit={this.submitFormHandler}>
                        <div className='text-center'>
                            <h4>Post News</h4>
                        </div>
                        <div className="form-group row justify-content-center pt-2">
                            <label htmlFor="title" className="col-1 col-form-label">Title</label>
                            <div className="col-4">
                                <input
                                    type="text"
                                    className="form-control shadow-sm rounded"
                                    id="title"
                                    name="title"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center pt-2">
                            <label htmlFor="content" className="col-1 col-form-label">Content</label>
                            <div className="col-4">
                                <textarea
                                    className="form-control shadow-sm rounded"
                                    id="content"
                                    name="content"
                                    rows="3"
                                    onChange={this.inputChangeHandler}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center pt-2">
                            <label htmlFor="image" className="col-1 col-form-label">Image</label>
                            <div className="col-4">
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="image"
                                    name="image"
                                    onChange={this.fileChangeHandler}
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center pt-2'>
                            <div className='col-5'>
                                <button type="submit" className="btn btn-success shadow-sm rounded">Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postNews: postData => dispatch(postNews(postData))
});

export default connect(null, mapDispatchToProps)(PostNews);