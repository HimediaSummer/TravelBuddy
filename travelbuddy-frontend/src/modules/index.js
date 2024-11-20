import { combineReducers } from 'redux';
import myBuddyReducer from './mypage/MyBuddyModule.js';
import myBuddyDetailReducer from './mypage/MyBuddyDetailModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import myProfileReducer from './mypage/MyProfileModule.js';
import myScheduleReducer from './mypage/MyScheduleModule.js';
const rootReducer = combineReducers({
	myBuddyReducer,
	myProfileReducer,
	myBuddyDetailReducer,
	myScheduleReducer,
	memberReducer,
	qnaReducer
});

export default rootReducer;
