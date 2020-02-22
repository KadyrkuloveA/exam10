import axiosNews from "../../axiosNews";


export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});

export const fetchComments = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosNews.get('/comments/' + id);
            dispatch(fetchCommentsSuccess(response.data));
        } catch (e) {
            console.error(e);
        }
    };
};

export const postComment = postData => {
    return async (dispatch) => {
        try {
            await axiosNews.post('/news', postData);
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