import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import mypageBuddyReducer from './MypageBuddyModule.js';

const rootReducer = combineReducers({
	memberReducer,
	mypageBuddyReducer
});

export default rootReducer;
