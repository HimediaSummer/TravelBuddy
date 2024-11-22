import React, { useEffect } from 'react';

function ScheduleMap() {

	useEffect(() => {
		const apikey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
		const scriptId = 'kakao-map-script';
		let script = document.getElementById(scriptId);

		if(!script) {
			script = document.createElement('script');
			script.id = scriptId;
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
			script.type = 'text/javascript';
			document.head.appendChild(script);

			// script.onload = () => {
			// 	if(window.kakao && window.kakao.maps) {
			// 		window.kakao.maps.load(());
			// 	}
			// };
		}
	}, []);

	return (
		<>
			<div id="map" style={{width: '800px', height: '800px'}}/>
		</>
	);
}

export default ScheduleMap;