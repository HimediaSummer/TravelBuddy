import { combineReducers } from 'redux';
import myBuddyReducer from './mypage/MyBuddyModule.js';
import myBuddyDetailReducer from './mypage/MyBuddyDetailModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import myProfileReducer from './mypage/MyProfileModule.js';
import myScheduleReducer from './mypage/MyScheduleModule.js';
import myScheDetailReducer from './mypage/MyScheduleDetailModule.js';
const rootReducer = combineReducers({
	myBuddyReducer,
	myProfileReducer,
	myBuddyDetailReducer,
	myScheduleReducer,
	myScheDetailReducer,
	memberReducer,
	qnaReducer
});

export default rootReducer;
