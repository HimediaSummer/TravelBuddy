import React, { useEffect } from 'react';

function Map() {

	// useEffect(
	// 	() => {
	// 		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY;
	// 		const script = document.createElement('script');
	// 		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
	// 		script.type = 'text/javascript';
	// 		// script.async = true;	// 비동기 로딩
	// 		script.onload = () => {
	// 			if(window.kakao && window.kakao.maps) {
	// 				console.log('ㅈㅣ도 왓냐???');
	// 				window.kakao.maps.load(() => {
	// 					console.log('지도 초기화중임');
	// 					const container = document.getElementById('map');
	// 					const options = {
	// 						center: new window.kakao.maps.LatLng(37.566826, 126.978656),
	// 						level: 3
	// 					};
	// 					new window.kakao.maps.Map(container, options);
	// 				});
	// 			} else {
	// 				console.error('카카오 지도 API 로드 안 됨 이슈');
	// 			}
	// 		};
	// 		document.head.appendChild(script);

	// 		return() => {
	// 			document.head.removeChild(script);
	// 		};
	// 	},
	// 	[]
	// );

	useEffect(() => {
        const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim(); // 공백 제거
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.type = 'text/javascript';
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.566826, 126.978656),
                    level: 3
                };
                new window.kakao.maps.Map(container, options);
            });
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

	// useEffect(() => {
	// 	const script = document.createElement('script');
	// 	script.async = true;
	// 	script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false`;
	// 	document.head.appendChild(script);

	// 	script.addEventListener("load", () => {
	// 		window.kakao.maps.load(() => {
	// 			const container = document.getElementById('map');
	// 			const options = {
	// 				center: new window.kakao.maps.LatLng(37.566826, 126.978656),
	// 				level: 3
	// 			};
	// 			new window.kakao.maps.Map(container, options);
	// 		});
	// 	});
	// }, []);

	return (
		<>
			<div id='map' style={{ width: '500px', height: '1200px' }} />
		</>
	);
}

export default Map;

