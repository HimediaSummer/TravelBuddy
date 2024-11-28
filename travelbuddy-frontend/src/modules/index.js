import { combineReducers } from 'redux';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import faqReducer from './FaqModule.js';
import noticeReducer from './NoticeModule.js';
import useinfoReducer from './UseinfoModule.js';
import fqTypeReducer from './FqTypeModule.js';
import buddiesReducer from './BuddyModule.js';
import {myBuddyReducer, myProfileReducer, myScheduleReducer, myMatchReducer} from './MypageModule.js';
import regionBuddyTypeReducer from './RegionBuddyTypeModule.js'

const rootReducer = combineReducers({
	myBuddyReducer,
	myProfileReducer,
	myScheduleReducer,
	myMatchReducer,
	memberReducer,
	qnaReducer,
	faqReducer,
	noticeReducer,
	useinfoReducer,
	buddiesReducer,
	regionBuddyTypeReducer,
	fqTypeReducer
});

export default rootReducer;
