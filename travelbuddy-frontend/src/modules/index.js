import { combineReducers } from 'redux';
import mypageBuddyReducer from './MypageBuddyModule.js';
import memberReducer from './MemberModule.js'

const rootReducer = combineReducers({
	mypageBuddyReducer,
	memberReducer
});

export default rootReducer;
