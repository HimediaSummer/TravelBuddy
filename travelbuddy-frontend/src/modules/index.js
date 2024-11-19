import { combineReducers } from 'redux';
import mypageBuddyReducer from './MypageBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import faqReducer from './FaqModule.js';


const rootReducer = combineReducers({
	mypageBuddyReducer,
	memberReducer,
	qnaReducer,
	faqReducer
});

export default rootReducer;
