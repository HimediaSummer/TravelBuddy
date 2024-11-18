import { combineReducers } from 'redux';
import mypageBuddyReducer from './MypageBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
import buddiesReducer from './BuddyModule.js';

const rootReducer = combineReducers({
	mypageBuddyReducer,
	memberReducer,
	qnaReducer,
	buddiesReducer
});

export default rootReducer;
