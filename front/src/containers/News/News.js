import React, {Component} from 'react';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {fetchNews} from "../../store/actions/newsActions";
import './News.css';
import PostThumbnail from "../../components/PostThumbnail/PostThumbnail";

class News extends Component {
    componentDidMount() {
        this.props.fetchNews();
    }

    render() {
        return (
            <div className='container'>
                <div className="card-columns">
                    {this.props.news.map(post => (
                        <div className="card" key={post.id}>
                            {post.image ?
                                <PostThumbnail image={post.image}/>
                                : null}
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    <NavLink className="text-dark" to='/'><u>Read Full Post >></u></NavLink>
                                </p>
                                <p className="card-text"><small className="text-muted">
                                    {moment(post.datetime).format('MMMM Do YYYY, h:mm:ss a')}
                                </small></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    news: state.news.news
});

const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(News);