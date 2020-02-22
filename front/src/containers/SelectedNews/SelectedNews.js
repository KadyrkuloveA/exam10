import React, {useEffect} from 'react';
import {fetchSelectedNews} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import {apiURL} from "../../constans";

const SelectedNews = (props) => {
    const fetchSelectedPost = async() => {
      await props.fetchSelectedNews(props.match.params.id);
    };

    useEffect(() => {
        fetchSelectedPost().catch(error => {
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

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    selectedNews: state.news.selectedNews
});

const mapDispatchToProps = dispatch => ({
    fetchSelectedNews: (id) => dispatch(fetchSelectedNews(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedNews);