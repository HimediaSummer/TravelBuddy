import React, { useEffect, useState } from 'react';

function RegionSchedule({ onNext }) {

	const [region, setRegion] = useState([]);
	const [regionDetails, setRegionDetails] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState(null);
	const [selectedRegionDetails, setSelectedRegionDetails] = useState(null);

	// 장소 전체
	useEffect(() => {
		// 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
		fetch('http://localhost:8080/schedule/region')
			.then(response => response.json())
			.then(data => {
				const regions = data.data.regions.map(region => ({
					regionCode: region.regionCode,
					regionName: region.regionName,
					regionDescription: region.regionDescription,
					regionImg: region.regionImg,
					regionThumbnailImg: region.regionThumbnailImg
				}));
				console.log("가져왓냐?", data);
				setRegion(regions);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	// 장소 상세
	// useEffect(() => {
	// 	// 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
	// 	fetch(`http://localhost:8080/schedule/region/101`)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			setRegionDetails(data.data);
	// 			console.log("상세 가져왓냐?", data);
	// 		})
	// 		.catch(error => console.error('Error fetching data:', error));
	// }, []);

	// 장소 버튼 누르면 밑에 상세 조회 뾰롱
	const handleRegionSelect = (region) => {
		setSelectedRegion(region);

		fetch(`http://localhost:8080/schedule/region/${region.regionCode}`)
			.then(response => response.json())
			.then(data => {
				setSelectedRegionDetails(data.data);
			})
			.catch(error => console.error('Error fetching data:', error));
		console.log("Selected Region:", region);
	};

	return (
		<div class="tema-title">
			<div class="chat-container">
				<form class="chat-form" action="post">
				<div id="chat-box2">
						<h2>장소 선택</h2>
					</div>
					<div class="tema-title">
						<legend>가고싶은 도시를 선택해주세요.</legend>
					</div>
					<div>
						{region.map((region) => (
							<div>
							<img key={region.regionCode} src={`/Img/${region.regionThumbnailImg}`} alt={region.regionName} width={'50px'} height={'50px'} style={{borderRadius: '15px'}}/>
							<button type='button' key={region.regionCode} onClick={() => handleRegionSelect(region)}>
								{region.regionName}
							</button>
							</div>
						))}
						{/* 선택된 지역 상세 정보 출력 */}
						{selectedRegionDetails ? (
							<div>
								<h3>지역 이름: {selectedRegionDetails.regionName}</h3>
								<p>지역 설명: {selectedRegionDetails.regionDescription}</p>
							</div>
						) : (
							<p>지역을 선택해주세요.</p>
						)}
						<button onClick={onNext}>다음</button>
					</div>
				</form>
			</div>
		</div>
	);
}
export default RegionSchedule;