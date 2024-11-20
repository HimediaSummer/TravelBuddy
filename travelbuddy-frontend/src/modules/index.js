import { combineReducers } from 'redux';
import myBuddyReducer from './mypage/MyBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import myProfileReducer from './mypage/MyProfileModule.js';

const rootReducer = combineReducers({
	myBuddyReducer,
	myProfileReducer,
	memberReducer,
	qnaReducer
});

export default rootReducer;
