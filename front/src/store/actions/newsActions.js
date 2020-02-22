import axiosNews from "../../axiosNews";


export const FETCH_NEWS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_SELECTED_NEWS_SUCCESS = 'FETCH_SELECTED_NEWS_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const fetchSelectedNewsSuccess = selectedNews => ({type: FETCH_SELECTED_NEWS_SUCCESS, selectedNews});

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

export const fetchSelectedNews = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosNews.get('/news/' + id);
            dispatch(fetchSelectedNewsSuccess(response.data));
        } catch (e) {
            console.error(e);
        }
    };
};

export const postNews = postData => {
    return async (dispatch) => {
        try {
            await axiosNews.post('/news', postData);
            dispatch(fetchNews());
        } catch (e) {
            console.error(e);
        }
    };
};

export const deleteNews = (id) => {
  return async (dispatch) => {
      try {
          await axiosNews.delete('/news/' + id);
          dispatch(fetchNews());
      } catch (e) {
          console.error(e);
      }
  }
};