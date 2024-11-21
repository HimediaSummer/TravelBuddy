import { combineReducers } from 'redux';
import mypageBuddyReducer from './MypageBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import faqReducer from './FaqModule.js';
import noticeReducer from './NoticeModule.js';
import useinfoReducer from './UseinfoModule.js';


const rootReducer = combineReducers({
	mypageBuddyReducer,
	memberReducer,
	qnaReducer,
	faqReducer,
	noticeReducer,
	useinfoReducer
});

export default rootReducer;
