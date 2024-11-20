import { combineReducers } from 'redux';
import mypageBuddyReducer from './MypageBuddyModule.js';
import memberReducer from './MemberModule.js'
import qnaReducer from './QnaModule.js';
// import getRegionReducer from './SelectedRegionModule.js';

const rootReducer = combineReducers({
	mypageBuddyReducer,
	memberReducer,
	qnaReducer
	// ,getRegionReducer
});

export default rootReducer;
