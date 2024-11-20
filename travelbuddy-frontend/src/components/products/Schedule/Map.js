import React, { useEffect } from 'react';

function Map({ regionName }) {

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

	// 위도 / 경도로 찾기
	// useEffect(() => {

	// 	console.log('Latitude:', latitude, 'Longitude:', longitude);

	//     const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim(); // 공백 제거
	//     const script = document.createElement('script');
	//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
	//     script.type = 'text/javascript';
	//     script.onload = () => {
	//         window.kakao.maps.load(() => {
	//             const container = document.getElementById('map');
	//             const options = {
	//                 center: new window.kakao.maps.LatLng(latitude, longitude),
	//                 level: 7
	//             };
	//             new window.kakao.maps.Map(container, options);
	//         });
	//     };
	//     document.head.appendChild(script);

	//     return () => {
	//         document.head.removeChild(script);
	//     };
	// }, [latitude, longitude]);

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

	// regionName 활용해 지역 이름으로 찾기 
	useEffect(() => {

		console.log('지역이름왓냐?????????', regionName);
		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
		const script = document.createElement('script');
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
		script.type = 'text/javascript';
		script.onload = () => {
			if (window.kakao && window.kakao.maps) {
				window.kakao.maps.load(() => {
					const container = document.getElementById('map');
					const options = {
						center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 중심 좌표
						level: 5
					};
					const map = new window.kakao.maps.Map(container, options);

					// 주소-좌표 변환 객체를 생성합니다
					const geocoder = new window.kakao.maps.services.Geocoder();

					// 주소로 좌표를 검색합니다
					geocoder.addressSearch(regionName, function (result, status) {
						if (status === window.kakao.maps.services.Status.OK) {
							const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

							// 결과값으로 받은 위치를 마커로 표시합니다
							const marker = new window.kakao.maps.Marker({
								map: map,
								position: coords
							});

							// 인포윈도우로 장소에 대한 설명을 표시합니다
							// const infowindow = new window.kakao.maps.InfoWindow({
							// 	content: `<div style="width:150px;text-align:center;padding:6px 0;">${regionName}</div>`
							// });
							// infowindow.open(map, marker);

							// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
							map.setCenter(coords);
						} else {
							console.error('주소 검색 실패:', status);
						}
					});
				});
			} else {
				console.error('카카오 지도 API 로드 안 됨 이슈');
			}
		};
		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, [regionName]); // regionName이 변경될 때마다 지도 업데이트

	return (
		<>
			<div id='map' style={{ width: '500px', height: '800px' }} />
		</>
	);
}

export default Map;

