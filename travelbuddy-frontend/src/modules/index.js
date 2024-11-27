import { combineReducers } from 'redux';
import myBuddyReducer from './mypage/MyBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import faqReducer from './FaqModule.js';
import noticeReducer from './NoticeModule.js';
import useinfoReducer from './UseinfoModule.js';
import fqTypeReducer from './FqTypeModule.js';

import myProfileReducer from './mypage/MyProfileModule.js';
import myScheduleReducer from './mypage/MyScheduleModule.js';
import buddiesReducer from './BuddyModule.js';

const rootReducer = combineReducers({
	myBuddyReducer,
	myProfileReducer,
	myScheduleReducer,
	memberReducer,
	qnaReducer,
	faqReducer,
	noticeReducer,
	useinfoReducer,
	buddiesReducer,
	fqTypeReducer
});

export default rootReducer;
