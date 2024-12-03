// import React, { useEffect, useRef, useState } from 'react';

// function Map({ regionName, style }) {
// 	// mapRef를 카카오 지도 객체를 관리할 용도로 사용
// 	const mapRef = useRef(null);
// 	const [mapInstance, setMapInstance] = useState(null); // 지도 객체 상태로 관리

// 	useEffect(() => {
// 		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
// 		const script = document.createElement('script');
// 		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
// 		script.type = 'text/javascript';

// 		script.onload = () => {
// 			if (window.kakao && window.kakao.maps) {
// 				window.kakao.maps.load(() => {
// 					const container = document.getElementById('map');

// 					// 기존 지도 객체가 없으면 새로 만들어준다.
// 					if (!mapInstance) {
// 						const options = {
// 							center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 중심 좌표
// 							level: 5,
// 						};

// 						const map = new window.kakao.maps.Map(container, options);
// 						setMapInstance(map); // 지도 객체 상태로 저장

// 						// 주소로 좌표 변환
// 						const geocoder = new window.kakao.maps.services.Geocoder();
// 						geocoder.addressSearch(regionName, function (result, status) {
// 							if (status === window.kakao.maps.services.Status.OK) {
// 								const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
// 								const marker = new window.kakao.maps.Marker({
// 									map: map,
// 									position: coords,
// 								});
// 								map.setCenter(coords);
// 							} else {
// 								console.error('주소 검색 실패:', status);
// 							}
// 						});
// 					} else {
// 						// 지도 객체가 이미 있으면, 주소 변환만 처리
// 						const geocoder = new window.kakao.maps.services.Geocoder();
// 						geocoder.addressSearch(regionName, function (result, status) {
// 							if (status === window.kakao.maps.services.Status.OK) {
// 								const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
// 								const marker = new window.kakao.maps.Marker({
// 									map: mapInstance,
// 									position: coords,
// 								});
// 								mapInstance.setCenter(coords);
// 							} else {
// 								console.error('주소 검색 실패:', status);
// 							}
// 						});
// 					}
// 				});
// 			} else {
// 				console.error('카카오 지도 API 로드 안 됨');
// 			}
// 		};
// 		document.head.appendChild(script);

// 		return () => {
// 			document.head.removeChild(script);
// 			// 컴포넌트가 unmount될 때 카카오 지도 인스턴스를 제거
// 			if (mapInstance) {
// 				// 지도 객체를 더 이상 사용하지 않도록 null 처리
// 				setMapInstance(null);
// 			}
// 		};
// 	}, [regionName, mapInstance]); // regionName이나 mapInstance가 변경될 때마다 실행

// 	// 지도 크기 변경 처리
// 	useEffect(() => {
// 		if (mapInstance) {
// 			// 지도 크기 변경 후에 resize 이벤트를 강제로 발생시켜야 지도에 반영됨
// 			window.kakao.maps.event.trigger(mapInstance, 'resize');
// 		}
// 	}, [style, mapInstance]); // style이 변경될 때마다 지도 크기 업데이트

// 	return (
// 		<div id="map" style={style} />
// 	);
// }

// export default Map;

// 잘 되는거  
// import React, { useEffect, useRef, useState } from 'react';

// function Map({ regionName, style }) {
// 	const mapRef = useRef(null);
// 	const [mapInstance, setMapInstance] = useState(null); // 지도 객체 상태로 관리

// 	useEffect(() => {
// 		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
// 		const scriptId = 'kakao-map-script';
// 		let script = document.getElementById(scriptId);

// 		if (!script) {
// 			script = document.createElement('script');
// 			script.id = scriptId;
// 			script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
// 			script.type = 'text/javascript';
// 			document.head.appendChild(script);

// 			script.onload = () => {
// 				if (window.kakao && window.kakao.maps) {
// 					window.kakao.maps.load(() => {
// 						const container = document.getElementById('map');

// 						if (!mapInstance) {
// 							const options = {
// 								center: new window.kakao.maps.LatLng(37.5665, 126.9780),
// 								level: 5,
// 							};

// 							const map = new window.kakao.maps.Map(container, options);
// 							setMapInstance(map); // 지도 객체 상태로 저장
// 						}
// 					});
// 				}
// 			};
// 		}

// 		return () => {
// 			document.head.removeChild(script);
// 		};
// 	}, [mapInstance]);

// 	// regionName 변경시 마커 업데이트
// 	useEffect(() => {
// 		if (mapInstance && regionName) {
// 			const geocoder = new window.kakao.maps.services.Geocoder();

// 			// 주소로 좌표 변환
// 			geocoder.addressSearch(regionName, function (result, status) {
// 				if (status === window.kakao.maps.services.Status.OK) {
// 					const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
// 					const marker = new window.kakao.maps.Marker({
// 						map: mapInstance,
// 						position: coords,
// 					});
// 					mapInstance.setCenter(coords);
// 				} else {
// 					console.error('주소 검색 실패:', status);
// 				}
// 			});
// 		}
// 	}, [regionName, mapInstance]);

// 	return <div id="map" style={style} />;
// }

// export default Map;

// 리무브가어쩌구에러
// import React, { useEffect, useRef, useState } from 'react';

// function Map({ regionName, style }) {
// 	const mapRef = useRef(null);
// 	const [mapInstance, setMapInstance] = useState(null); // 지도 객체 상태로 관리
// 	const [currentMarker, setCurrentMarker] = useState(null); // 현재 마커 상태로 관리

// 	useEffect(() => {
// 		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
// 		const scriptId = 'kakao-map-script';
// 		let script = document.getElementById(scriptId);

// 		if (!script) {
// 			script = document.createElement('script');
// 			script.id = scriptId;
// 			script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
// 			script.type = 'text/javascript';
// 			document.head.appendChild(script);

// 			script.onload = () => {
// 				if (window.kakao && window.kakao.maps) {
// 					window.kakao.maps.load(() => {
// 						const container = document.getElementById('map');
// 						if (!mapInstance) {
// 							const options = {
// 								center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 좌표 설정
// 								level: 5,
// 							};

// 							const map = new window.kakao.maps.Map(container, options);
// 							setMapInstance(map); // 지도 객체 상태로 저장
// 						}
// 					});
// 				}
// 			};
// 		}

// 		return () => {
// 			document.head.removeChild(script);
// 		};
// 	}, [mapInstance]);

// 	// regionName 변경 시 마커 업데이트
// 	useEffect(() => {
// 		if (mapInstance && regionName) {
// 			const geocoder = new window.kakao.maps.services.Geocoder();

// 			// 새로운 검색어가 있을 때 이전 마커를 삭제
// 			if (currentMarker) {
// 				currentMarker.setMap(null); // 이전 마커 제거
// 			}

// 			// 주소로 좌표 변환
// 			geocoder.addressSearch(regionName, function (result, status) {
// 				if (status === window.kakao.maps.services.Status.OK) {
// 					const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

// 					// 새 마커 생성
// 					const marker = new window.kakao.maps.Marker({
// 						map: mapInstance,
// 						position: coords,
// 					});

// 					// 새 마커를 currentMarker 상태로 관리
// 					setCurrentMarker(marker);

// 					// 지도 중심을 해당 좌표로 이동
// 					mapInstance.setCenter(coords);
// 				} else {
// 					console.error('주소 검색 실패:', status);
// 				}
// 			});
// 		}
// 	}, [regionName, mapInstance]); // regionName이 변경될 때마다 실행

// 	return <div id="map" style={style} />;
// }

// export default Map;

import React, { useEffect, useRef, useState } from 'react';

function Map({ regionName, style }) {
	const mapRef = useRef(null);
	const [mapInstance, setMapInstance] = useState(null); // 지도 객체 상태로 관리
	const [currentMarker, setCurrentMarker] = useState(null); // 현재 마커 상태로 관리

	useEffect(() => {
		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
		const scriptId = 'kakao-map-script';
		let script = document.getElementById(scriptId);

		// 스크립트가 이미 존재하면 로드된 상태라고 판단
		if (!script) {
			// 스크립트가 없다면 새로 생성
			script = document.createElement('script');
			script.id = scriptId;
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
			script.type = 'text/javascript';
			document.head.appendChild(script);
			
			// 스크립트 로딩 후 온로드 이벤트 설정
		script.onload = () => {
			if (window.kakao && window.kakao.maps) {
				window.kakao.maps.load(() => {
					const container = document.getElementById('map');
					if (!mapInstance) {
						const options = {
							center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 좌표 설정
							level: 5,
						};
						const map = new window.kakao.maps.Map(container, options);
						setMapInstance(map); // 지도 객체 상태로 저장
					}
				});
			}
		};
	} else {

		// 스크립트가 이미 존재하면 온로드를 바로 실행
		if(window.kakao && window.kakao.maps) {

			window.kakao.maps.load(() => {
				const container = document.getElementById('map');
				if(!mapInstance) {
					const options = {
						center: new window.kakao.maps.LatLng(37.5665, 126.9780),
						level: 5
					};
					const map = new window.kakao.maps.Map(container, options);
					setMapInstance(map); // 지도 객체 상태로 저장

				}
			});
		}
	}
		// cleanup: 스크립트가 제거될 때 중복 제거
		return () => {
			if (script && document.head.contains(script)) {
				document.head.removeChild(script);
			}
		};
	}, [mapInstance]); // mapInstance가 변경될 때마다 실행

	// regionName 변경 시 마커 업데이트
	useEffect(() => {

		if (mapInstance && regionName) {
			const geocoder = new window.kakao.maps.services.Geocoder();

			// 새로운 검색어가 있을 때 이전 마커 삭제
			if (currentMarker) {
				currentMarker.setMap(null); // 이전 마커 제거
			}

			// 주소로 좌표 변환
			geocoder.addressSearch(regionName, function (result, status) {
				if (status === window.kakao.maps.services.Status.OK) {
					const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

					// 새 마커 생성
					const marker = new window.kakao.maps.Marker({
						map: mapInstance,
						position: coords,
					});

					// 새 마커를 currentMarker 상태로 관리
					setCurrentMarker(marker);

					// 지도 중심을 해당 좌표로 이동
					mapInstance.setCenter(coords);
				} else {
					console.error('주소 검색 실패:', status);
				}
			});
		}
	}, [regionName, mapInstance]); // regionName이 변경될 때마다 실행

	 useEffect(() => {
        if (mapInstance) {
            setTimeout(() => {
                mapInstance.relayout();
                if (currentMarker) {
                    mapInstance.setCenter(currentMarker.getPosition());
                }
            }, 100);
        }
    }, [style, mapInstance]);

	console.log(
		mapInstance,
		regionName,
		currentMarker
	);

	return <div id="map" style={style} />;
}

export default Map;


