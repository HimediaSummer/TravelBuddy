// import React, { useEffect, useState } from 'react';

// function ScheduleMap() {
// 	const [mapInstance, setMapInstance] = useState(null);

// 	useEffect(() => {
// 		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
// 		const scriptId = 'kakao-map-script';
// 		let script = document.getElementById(scriptId);

// 		if(!script) {
// 			script = document.createElement('script');
// 			script.id = scriptId;
// 			script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
// 			script.type = 'text/javascript';
// 			document.head.appendChild(script);

// 			script.onload = () => {
// 				if(window.kakao && window.kakao.maps) {
// 					window.kakao.maps.load(() => {
// 						const container = document.getElementById('map');
// 							const options = {
// 								center: new window.kakao.maps.LatLng(37.5665, 126.9780),
// 								level: 7
// 							};
// 							const map = new window.kakao.maps.Map(container, options);
// 							setMapInstance(map);
// 					});
// 				}
// 			};
// 		} else {
// 			if(window.kakao && window.kakao.maps) {
// 				window.kakao.maps.load(() => {
// 					const container = document.getElementById('map');
// 					if(!mapInstance) {
// 						const options = {
// 							center: new window.kakao.maps.LatLng(37.5665, 126.9780),
// 							level: 7
// 						};
// 						const map = new window.kakao.maps.Map(container,options);
// 						setMapInstance(map);
// 					}
// 				});
// 			}
// 		}
// 		return () => {
// 			if(script && document.head.contains(script)) {
// 				document.head.removeChild(script);
// 			}
// 		};
// 	}, []);

// 	useEffect(() => {
// 		if(!mapInstance) return;

// 		const dayOne = [
// 			{
// 				title: '제주공항',
// 				latlng: new window.kakao.maps.LatLng(33.507304, 126.493437)
// 			},
// 			{
// 				title: '[제주올레 16코스] 고내-광령 올레',
// 				latlng: new window.kakao.maps.LatLng(33.468182, 126.337868)
// 			},
// 			{
// 				title: '돈사돈 본점',
// 				latlng: new window.kakao.maps.LatLng(33.480072, 126.464067)
// 			},
// 			{
// 				title: '그랜드 하얏트 제주',
// 				latlng: new window.kakao.maps.LatLng(33.485559, 126.481593)
// 			}
// 		];

// 		const dayTwo = [
// 			{
// 				title: '그랜드 하얏트 제주',
// 				latlng: new window.kakao.maps.LatLng(33.485559, 126.481593)
// 			},
// 			{
// 				title: '애월 카페거리',
// 				latlng: new window.kakao.maps.LatLng(33.463987, 126.309958)
// 			},
// 			{
// 				title: '곽지해수욕장',
// 				latlng: new window.kakao.maps.LatLng(33.451905, 126.305708)
// 			},
// 			{
// 				title: '제주공항',
// 				latlng: new window.kakao.maps.LatLng(33.507304, 126.493437)
// 			}
// 		];

// 		const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

// 		for(var i = 0; i < dayOne.length; i++) {
// 			const imageSize = new window.kakao.maps.Size(24, 35);

// 			const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

// 			const marker = new window.kakao.maps.Marker({
// 				map: mapInstance,
// 				position: dayOne[i].latlng,
// 				title: dayOne[i].title,
// 				image: markerImage
// 			});
// 		}

// 		for(var i = 0; i < dayTwo.length; i++) {
// 			const imageSize = new window.kakao.maps.Size(24, 35);

// 			const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

// 			const marker = new window.kakao.maps.Marker({
// 				map: mapInstance,
//                 position: dayTwo[i].latlng,
//                 title: dayTwo[i].title,
//                 image: markerImage
// 			});
// 		}

// 		// 선 구성 좌표
// 		const dayOneLinPath = [
// 			new window.kakao.maps.LatLng(33.507304, 126.493437),
// 			new window.kakao.maps.LatLng(33.468182, 126.337868),
// 			new window.kakao.maps.LatLng(33.480072, 126.464067),
// 			new window.kakao.maps.LatLng(33.485559, 126.481593)
// 		];

// 		// 선 생성
// 		const dayOnePolyLine = new window.kakao.maps.Polyline({
// 			path: dayOneLinPath,	// 선 구성하는 좌표 배열
// 			strokeWeight: 2,		// 선 두께
// 			strokeColor: '#8CC8EA',	// 선 색깔
// 			strokeOpacity: 0.7,		// 선 불투명도
// 			strokeStyle: 'solid'	// 선 스타일
// 		});

// 		const dayTwoLinePath = [
// 			new window.kakao.maps.LatLng(33.485559, 126.481593),
// 			new window.kakao.maps.LatLng(33.463987, 126.309958),
// 			new window.kakao.maps.LatLng(33.451905, 126.305708),
// 			new window.kakao.maps.LatLng(33.507304, 126.493437)
// 		];

// 		const dayTwoPolyLine = new window.kakao.maps.PolyLine({
// 			path: dayTwoLinePath,
// 			strokeWeight: 2,
// 			strokeColor: '#1F709E',
// 			strokeOpacity: 0.7,
// 			strokeStyle: 'solid'
// 		});

// 		dayOnePolyLine.setMap(mapInstance);
// 		dayTwoPolyLine.setMap(mapInstance);

// 	}, [mapInstance]);

// 	return (
// 		<>
// 			<div id="map" style={{width: '800px', height: '800px'}}/>
// 		</>
// 	);
// }

// export default ScheduleMap;

// 얘가 잘 되는거
import React, { useEffect, useState } from 'react';

function ScheduleMap() {
	const [mapInstance, setMapInstance] = useState(null);

	useEffect(() => {
		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
		const scriptId = 'kakao-map-script';
		let script = document.getElementById(scriptId);

		if (!script) {
			script = document.createElement('script');
			script.id = scriptId;
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
			script.type = 'text/javascript';
			document.head.appendChild(script);

			script.onload = () => {
				if (window.kakao && window.kakao.maps) {
					window.kakao.maps.load(() => {
						const container = document.getElementById('map');
						const options = {
							center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치
							level: 9,
						};
						const map = new window.kakao.maps.Map(container, options);
						setMapInstance(map);
					});
				}
			};
		} else {
			if (window.kakao && window.kakao.maps) {
				window.kakao.maps.load(() => {
					const container = document.getElementById('map');
					const options = {
						center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치
						level: 9,
					};
					const map = new window.kakao.maps.Map(container, options);
					setMapInstance(map);
				});
			}
		}

		return () => {
			if (script && document.head.contains(script)) {
				document.head.removeChild(script);
			}
		};
	}, []);

	useEffect(() => {
		if (!mapInstance) return;  // mapInstance가 없으면 실행하지 않음

		const dayOne = [
			{
				title: '제주공항',
				latlng: new window.kakao.maps.LatLng(33.507304, 126.493437),
			},
			{
				title: '[제주올레 16코스] 고내-광령 올레',
				latlng: new window.kakao.maps.LatLng(33.468182, 126.337868),
			},
			{
				title: '돈사돈 본점',
				latlng: new window.kakao.maps.LatLng(33.480072, 126.464067),
			},
			{
				title: '그랜드 하얏트 제주',
				latlng: new window.kakao.maps.LatLng(33.485559, 126.481593),
			},
		];

		const dayTwo = [
			{
				title: '그랜드 하얏트 제주',
				latlng: new window.kakao.maps.LatLng(33.485559, 126.481593),
			},
			{
				title: '애월 카페거리',
				latlng: new window.kakao.maps.LatLng(33.463987, 126.309958),
			},
			{
				title: '곽지해수욕장',
				latlng: new window.kakao.maps.LatLng(33.451905, 126.305708),
			},
			{
				title: '제주공항',
				latlng: new window.kakao.maps.LatLng(33.507304, 126.493437),
			},
		];

		const imageSrc =
			'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

		// 마커 추가
		const addMarkers = (locations) => {
			locations.forEach((location, index) => {
				const imageSize = new window.kakao.maps.Size(24, 35);
				const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
				const marker = new window.kakao.maps.Marker({
					map: mapInstance,
					position: location.latlng,
					title: location.title,
					image: markerImage,
				});

				// 첫 번째 마커 위치로 지도 이동
				if (index === 0) {
					mapInstance.setCenter(location.latlng);
				}
			});
		};

		// 첫날과 둘째날 마커 추가
		addMarkers(dayOne);
		addMarkers(dayTwo);


		// 선 구성 좌표
		const dayOneLinPath = [
			new window.kakao.maps.LatLng(33.507304, 126.493437),
			new window.kakao.maps.LatLng(33.468182, 126.337868),
			new window.kakao.maps.LatLng(33.480072, 126.464067),
			new window.kakao.maps.LatLng(33.485559, 126.481593),
		];

		const dayTwoLinePath = [
			new window.kakao.maps.LatLng(33.485559, 126.481593),
			new window.kakao.maps.LatLng(33.463987, 126.309958),
			new window.kakao.maps.LatLng(33.451905, 126.305708),
			new window.kakao.maps.LatLng(33.507304, 126.493437),
		];

		// 선 생성
		const dayOnePolyLine = new window.kakao.maps.Polyline({
			path: dayOneLinPath,
			strokeWeight: 2,
			strokeColor: '#8CC8EA',
			strokeOpacity: 0.7,
			strokeStyle: 'solid',
		});

		const dayTwoPolyLine = new window.kakao.maps.Polyline({
			path: dayTwoLinePath,
			strokeWeight: 2,
			strokeColor: '#1F709E',
			strokeOpacity: 0.7,
			strokeStyle: 'solid',
		});

		// 지도에 선 표시
		dayOnePolyLine.setMap(mapInstance);
		dayTwoPolyLine.setMap(mapInstance);
	}, [mapInstance]);  // mapInstance가 업데이트될 때마다 실행

	return <div id="map" style={{ width: '600px', height: '600px' }} />;
}

export default ScheduleMap;
