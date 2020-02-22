import {FETCH_NEWS_SUCCESS, FETCH_SELECTED_NEWS_SUCCESS} from "../actions/newsActions";

const initialState = {
    news: [],
    selectedNews: []
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_SUCCESS:
            return {...state, news: action.news};
        case FETCH_SELECTED_NEWS_SUCCESS:
            return {...state, selectedNews: action.selectedNews};
        default:
            return state;
    }
};

export default newsReducer;