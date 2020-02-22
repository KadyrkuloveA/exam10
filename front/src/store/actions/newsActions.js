import axiosNews from "../../axiosNews";


export const FETCH_NEWS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const CREATE_NEWS_SUCCESS = 'CREATE_POST_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const createNewsSuccess = () => ({type: CREATE_NEWS_SUCCESS});

export const fetchNews = () => {
    return async (dispatch) => {
        try {
            const response = await axiosNews.get('/news');
            dispatch(fetchNewsSuccess(response.data));
        } catch (e) {
            console.error(e);
        }
    };
};

export const createNews = postData => {
    return async (dispatch) => {
        try {
            await axiosNews.post('/posts', postData);
            dispatch(createNewsSuccess());
            dispatch(fetchNews());
        } catch (e) {
            console.error(e);
        }
    };
};