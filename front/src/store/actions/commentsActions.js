import axiosNews from "../../axiosNews";


export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});

export const fetchComments = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosNews.get('/comments?news_id=' + id);
            dispatch(fetchCommentsSuccess(response.data));
        } catch (e) {
            console.error(e);
        }
    };
};

export const postComment = commentData => {
    return async (dispatch) => {
        try {
            await axiosNews.post('/comments', commentData);
        } catch (e) {
            console.error(e);
        }
    };
};

export const deleteComment = (id) => {
    return async (dispatch) => {
        try {
            await axiosNews.delete('/comments/' + id);
        } catch (e) {
            console.error(e);
        }
    }
};