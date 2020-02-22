import React, {useEffect, useState} from 'react';
import {fetchSelectedNews} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import {apiURL} from "../../constans";
import {fetchComments, postComment} from "../../store/actions/commentsActions";


const SelectedNews = (props) => {
    const commentInf = {
        newsId: props.match.params.id,
        author: '',
        text: ''
    };

    const [comment, setComment] = useState(commentInf);

    const addComment = async e => {
        e.preventDefault();
        await props.postComment(comment);
        fetchComments().catch(error => {
            console.error(error);
        })
    };

    const Changer = (event) => {
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        });
    };

    const fetchSelectedPost = async() => {
      await props.fetchSelectedNews(props.match.params.id);
    };

    const fetchComments = async() => {
        await props.fetchComments(props.match.params.id);
    };

    useEffect(() => {
        fetchSelectedPost().catch(error => {
            console.error(error);
        });
        fetchComments().catch(error => {
            console.error(error);
        })
        //eslint-disable-next-line
    }, []);


    return (
        <div className="card shadow-sm bg-white rounded" style={{maxWidth: '1000px', margin: '0 auto'}}>
            <div className="card-body">
                <div className='text-center mb-3'>
                    <h4>{props.selectedNews.title}</h4>
                </div>
                <div className="pt-3 row justify-content-around">
                    {props.selectedNews.image ?
                        <img src={apiURL + '/uploads/' + props.selectedNews.image} className='rounded mb-3' style={{maxWidth: '300px', display: 'block'}}/>
                        : null}
                    <p className='card-text'>
                        {props.selectedNews.content}
                    </p>
                </div>
                <div>
                    {
                        props.comments.map(comment => (
                            <div className='card mt-1 mb-1' key={comment.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{comment.author ? comment.author : 'Anonymous'}</h5>
                                    <p className='card-text'>{comment.text} <span onClick={}>X</span></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h5 className='text-center mt-3 pb-3'>Add Comment</h5>
                    <form onSubmit={addComment}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" value={comment.author} onChange={Changer} className="form-control" id="name" name='author' placeholder="Anonymous"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="comment" className="col-sm-2 col-form-label">Comment</label>
                            <div className="col-sm-10">
                                <input type="text" value={comment.text} onChange={Changer} className="form-control" id="comment" name='text' required/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    selectedNews: state.news.selectedNews,
    comments: state.comments.comments
});

const mapDispatchToProps = dispatch => ({
    fetchSelectedNews: (id) => dispatch(fetchSelectedNews(id)),
    fetchComments: (id) => dispatch(fetchComments(id)),
    postComment: (commentData) => dispatch(postComment(commentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedNews);