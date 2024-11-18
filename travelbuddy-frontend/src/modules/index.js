import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import mypageBuddyReducer from './MypageBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';

const rootReducer = combineReducers({
	mypageBuddyReducer,
	memberReducer,
	qnaReducer
});

export default rootReducer;
