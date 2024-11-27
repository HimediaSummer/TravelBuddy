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

// 얘가 잘 되는거(하드코딩 임시 데이터 버전)
// import React, { useEffect, useState } from 'react';

// function ScheduleMap({ scheduleData }) {
// 	const [mapInstance, setMapInstance] = useState(null);

// 	useEffect(() => {
// 		const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
// 		const scriptId = 'kakao-map-script';
// 		let script = document.getElementById(scriptId);

// 		if (!script) {
// 			script = document.createElement('script');
// 			script.id = scriptId;
// 			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
// 			script.type = 'text/javascript';
// 			document.head.appendChild(script);

// 			script.onload = () => {
// 				if (window.kakao && window.kakao.maps) {
// 					window.kakao.maps.load(() => {
// 						const container = document.getElementById('map');
// 						const options = {
// 							center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치
// 							level: 9,
// 						};
// 						const map = new window.kakao.maps.Map(container, options);
// 						setMapInstance(map);
// 					});
// 				}
// 			};
// 		} else {
// 			if (window.kakao && window.kakao.maps) {
// 				window.kakao.maps.load(() => {
// 					const container = document.getElementById('map');
// 					const options = {
// 						center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치
// 						level: 9,
// 					};
// 					const map = new window.kakao.maps.Map(container, options);
// 					setMapInstance(map);
// 				});
// 			}
// 		}

// 		return () => {
// 			if (script && document.head.contains(script)) {
// 				document.head.removeChild(script);
// 			}
// 		};
// 	}, []);

// 	useEffect(() => {
// 		if (!mapInstance) return;  // mapInstance가 없으면 실행하지 않음

// 		const dayOne = [
// 			{
// 				title: '제주공항',
// 				latlng: new window.kakao.maps.LatLng(33.507304, 126.493437),
// 			},
// 			{
// 				title: '[제주올레 16코스] 고내-광령 올레',
// 				latlng: new window.kakao.maps.LatLng(33.468182, 126.337868),
// 			},
// 			{
// 				title: '돈사돈 본점',
// 				latlng: new window.kakao.maps.LatLng(33.480072, 126.464067),
// 			},
// 			{
// 				title: '그랜드 하얏트 제주',
// 				latlng: new window.kakao.maps.LatLng(33.485559, 126.481593),
// 			},
// 		];

// 		const dayTwo = [
// 			{
// 				title: '그랜드 하얏트 제주',
// 				latlng: new window.kakao.maps.LatLng(33.485559, 126.481593),
// 			},
// 			{
// 				title: '애월 카페거리',
// 				latlng: new window.kakao.maps.LatLng(33.463987, 126.309958),
// 			},
// 			{
// 				title: '곽지해수욕장',
// 				latlng: new window.kakao.maps.LatLng(33.451905, 126.305708),
// 			},
// 			{
// 				title: '제주공항',
// 				latlng: new window.kakao.maps.LatLng(33.507304, 126.493437),
// 			},
// 		];

// 		const imageSrc =
// 			'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

// 		// 마커 추가
// 		const addMarkers = (locations) => {
// 			locations.forEach((location, index) => {
// 				const imageSize = new window.kakao.maps.Size(24, 35);
// 				const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
// 				const marker = new window.kakao.maps.Marker({
// 					map: mapInstance,
// 					position: location.latlng,
// 					title: location.title,
// 					image: markerImage,
// 				});

// 				// 첫 번째 마커 위치로 지도 이동
// 				if (index === 0) {
// 					mapInstance.setCenter(location.latlng);
// 				}
// 			});
// 		};

// 		// 첫날과 둘째날 마커 추가
// 		addMarkers(dayOne);
// 		addMarkers(dayTwo);


// 		// 선 구성 좌표
// 		const dayOneLinPath = [
// 			new window.kakao.maps.LatLng(33.507304, 126.493437),
// 			new window.kakao.maps.LatLng(33.468182, 126.337868),
// 			new window.kakao.maps.LatLng(33.480072, 126.464067),
// 			new window.kakao.maps.LatLng(33.485559, 126.481593),
// 		];

// 		const dayTwoLinePath = [
// 			new window.kakao.maps.LatLng(33.485559, 126.481593),
// 			new window.kakao.maps.LatLng(33.463987, 126.309958),
// 			new window.kakao.maps.LatLng(33.451905, 126.305708),
// 			new window.kakao.maps.LatLng(33.507304, 126.493437),
// 		];

// 		// 선 생성
// 		const dayOnePolyLine = new window.kakao.maps.Polyline({
// 			path: dayOneLinPath,
// 			strokeWeight: 2,
// 			strokeColor: '#8CC8EA',
// 			strokeOpacity: 0.7,
// 			strokeStyle: 'solid',
// 		});

// 		const dayTwoPolyLine = new window.kakao.maps.Polyline({
// 			path: dayTwoLinePath,
// 			strokeWeight: 2,
// 			strokeColor: '#1F709E',
// 			strokeOpacity: 0.7,
// 			strokeStyle: 'solid',
// 		});

// 		// 지도에 선 표시
// 		dayOnePolyLine.setMap(mapInstance);
// 		dayTwoPolyLine.setMap(mapInstance);
// 	}, [mapInstance]);  // mapInstance가 업데이트될 때마다 실행

// 	return <div id="map" style={{ width: '600px', height: '600px' }} />;
// }

// export default ScheduleMap;

// 주소로 찍어라
// import React, { useEffect, useState } from 'react';

// function ScheduleMap({ scheduleData }) {
//   const [mapInstance, setMapInstance] = useState(null);
//   const [geocoder, setGeocoder] = useState(null);

//   // 날짜별 색상 배열 유지
//   const colors = ['#FF6347', '#32CD32', '#1E90FF', '#FFD700', '#FF4500'];

//   const getColorForDate = (date) => {
//     const dateIndex = new Date(date).getDate();
//     return colors[dateIndex % colors.length];
//   };

//   // 지도와 geocoder 초기화
//   useEffect(() => {
//     const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
//     const scriptId = 'kakao-map-script';
//     let script = document.getElementById(scriptId);

//     if (!script) {
//       script = document.createElement('script');
//       script.id = scriptId;
//       // services 라이브러리 추가 (geocoder 사용을 위해)
//       script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
//       script.type = 'text/javascript';
//       document.head.appendChild(script);

//       script.onload = () => {
//         if (window.kakao && window.kakao.maps) {
//           window.kakao.maps.load(() => {
//             const container = document.getElementById('map');
//             const options = {
//               center: new window.kakao.maps.LatLng(37.5665, 126.9780),
//               level: 9,
//             };
//             const map = new window.kakao.maps.Map(container, options);
//             setMapInstance(map);
//             // Geocoder 서비스 초기화
//             setGeocoder(new window.kakao.maps.services.Geocoder());
//           });
//         }
//       };
//     }

//     return () => {
//       if (script && document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   // 주소로 좌표 변환하는 함수
//   const getCoordinatesFromAddress = (address) => {
//     return new Promise((resolve, reject) => {
//       if (!geocoder) {
//         reject(new Error('Geocoder not initialized'));
//         return;
//       }

//       geocoder.addressSearch(address, (result, status) => {
//         if (status === window.kakao.maps.services.Status.OK) {
//           resolve(new window.kakao.maps.LatLng(result[0].y, result[0].x));
//         } else {
//           reject(new Error('Address not found'));
//         }
//       });
//     });
//   };

//   // 마커와 선 그리기
//   useEffect(() => {
//     if (!mapInstance || !scheduleData.length || !geocoder) return;

//     // 모든 주소의 좌표 변환을 기다림
//     const processScheduleData = async () => {
//       try {
//         // 날짜별로 일정 그룹화하고 좌표 변환
//         const groupedByDate = {};
        
//         for (const item of scheduleData) {
//           try {
//             const coords = await getCoordinatesFromAddress(item.addres);
//             if (!groupedByDate[item.scheduledate]) {
//               groupedByDate[item.scheduledate] = [];
//             }
//             groupedByDate[item.scheduledate].push({
//               ...item,
//               latlng: coords
//             });
//           } catch (error) {
//             console.error(`Error converting address: ${item.addres}`, error);
//           }
//         }

//         // 마커 추가
//         const addMarkers = (locations) => {
//           locations.forEach((location, index) => {
//             const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
//             const imageSize = new window.kakao.maps.Size(24, 35);
//             const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
            
//             const marker = new window.kakao.maps.Marker({
//               map: mapInstance,
//               position: location.latlng,
//               title: location.title,
//               image: markerImage,
//             });

//             // 첫 번째 마커 위치로 지도 이동
//             if (index === 0) {
//               mapInstance.setCenter(location.latlng);
//             }
//           });
//         };

//         // 선 그리기
//         const drawLine = (locations, color) => {
//           const linePath = locations.map(location => location.latlng);
//           const polyLine = new window.kakao.maps.Polyline({
//             path: linePath,
//             strokeWeight: 3,
//             strokeColor: color,
//             strokeOpacity: 0.7,
//             strokeStyle: 'solid',
//           });
//           polyLine.setMap(mapInstance);
//         };

//         // 각 날짜별로 마커와 선 그리기
//         Object.keys(groupedByDate).forEach((date) => {
//           const locations = groupedByDate[date];
//           const color = getColorForDate(date);
//           addMarkers(locations);
//           drawLine(locations, color);
//         });

//       } catch (error) {
//         console.error('Error processing schedule data:', error);
//       }
//     };

//     processScheduleData();
//   }, [mapInstance, scheduleData, geocoder]);

//   return <div id="map" style={{ width: '600px', height: '600px' }} />;
// }

// export default ScheduleMap;

// 위도/경도 가보자고
import React, { useEffect, useState } from 'react';

function ScheduleMap({ scheduleData }) {
  const [mapInstance, setMapInstance] = useState(null);
  // geocoder는 더 이상 필요하지 않으므로 제거

  const colors = ['#FF6347', '#32CD32', '#1E90FF', '#FFD700', '#FF4500'];

  const getColorForDate = (date) => {
    const dateIndex = new Date(date).getDate();
    return colors[dateIndex % colors.length];
  };

  // 지도 초기화 (geocoder 관련 부분 제거)
  useEffect(() => {
    const apiKey = process.env.REACT_APP_KAKAOMAP_KEY.trim();
    const scriptId = 'kakao-map-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.type = 'text/javascript';
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(37.5665, 126.9780),
              level: 9,
            };
            const map = new window.kakao.maps.Map(container, options);
            setMapInstance(map);
          });
        }
      };
    }

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

// 마커와 선 그리기
useEffect(() => {
  if (!mapInstance || !scheduleData.length) return;

  const processScheduleData = () => {
    // 데이터 확인을 위한 로그
    console.log('Received scheduleData:', scheduleData);

    // 날짜별로 데이터 그룹화
    const groupedByDate = scheduleData.reduce((acc, item) => {
      // 필수 데이터 유효성 검사
      if (!item || !item.scheduledate) {
        console.warn('Invalid item:', item);
        return acc;
      }

      const date = item.scheduledate.split('T')[0];
      if (!acc[date]) {
          acc[date] = [];
      }

      // 위도/경도가 유효한 경우에만 추가
      if (item.latitude && item.longitude) {
          const lat = parseFloat(item.latitude);
          const lng = parseFloat(item.longitude);

          // 유효한 숫자인지 확인
          if (!isNaN(lat) && !isNaN(lng)) {
              acc[date].push({
                  ...item,
                  latlng: new window.kakao.maps.LatLng(lat, lng)
              });
          } else {
              console.warn('Invalid coordinates:', item);
          }
      } else {
          console.warn('Missing coordinates:', item);
      }
      return acc;
    }, {});

    // 그룹화된 데이터 확인
    console.log('Grouped data:', groupedByDate);

    // 유효한 데이터가 있는 경우에만 처리
    if (Object.keys(groupedByDate).length > 0) {
      // 각 날짜별로 마커와 선 그리기
      Object.entries(groupedByDate).forEach(([date, locations]) => {
        if (locations.length > 0) {
          const color = getColorForDate(date);

          // 마커 추가
          locations.forEach((location, index) => {
            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
            const imageSize = new window.kakao.maps.Size(24, 35);
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
            
            const marker = new window.kakao.maps.Marker({
              map: mapInstance,
              position: location.latlng,
              title: location.title || `Location ${index + 1}`,
              image: markerImage,
            });

            // 첫 번째 날짜의 첫 번째 위치로 지도 중심 이동
            if (index === 0 && date === Object.keys(groupedByDate)[0]) {
              mapInstance.setCenter(location.latlng);
            }
          });

          // 선 그리기
          if (locations.length > 1) {
            const linePath = locations.map(location => location.latlng);
            const polyLine = new window.kakao.maps.Polyline({
              path: linePath,
              strokeWeight: 3,
              strokeColor: color,
              strokeOpacity: 0.7,
              strokeStyle: 'solid',
            });
            polyLine.setMap(mapInstance);
          }
        }
      });
    } else {
      console.warn('No valid data to display on map');
    }
  };

  processScheduleData();
}, [mapInstance, scheduleData]);

  return <div id="map" style={{ width: '600px', height: '600px' }} />;
}

export default ScheduleMap;





