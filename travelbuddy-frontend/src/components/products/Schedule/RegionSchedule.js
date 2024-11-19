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
	//    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
	//    fetch(`http://localhost:8080/schedule/region/101`)
	//       .then(response => response.json())
	//       .then(data => {
	//          setRegionDetails(data.data);
	//          console.log("상세 가져왓냐?", data);
	//       })
	//       .catch(error => console.error('Error fetching data:', error));
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
					<div className="region-scroll">
						<div className='regions'>
						{region.map((region) => (
							<div className="region-item2" key={region.regionCode}>
								<div className="region-item">
									<img src={`/Img/${region.regionThumbnailImg}`} alt={region.regionName} width={'150px'} height={'150px'} style={{ borderRadius: '15px' }} />
								</div>
								<div className='region-wordMargin'>
									{region.regionName}
								</div>
								<button 
                           type='button' 
                           className={`region-button ${selectedRegion && selectedRegion.regionCode === region.regionCode ? 'selected' : ''}`} 
                           onClick={() => handleRegionSelect(region)}></button>
							</div>
						))}
						</div>
					</div>
				</form>
				{/* 선택된 지역 상세 정보 출력 */}
				<div id="chat-box3">
					{selectedRegionDetails ? (
						<div>
							<img src={`/Img/${selectedRegionDetails.regionImg}`} alt={selectedRegionDetails.regionName} width={'500px'} height={'300px'} />
							<h3>{selectedRegionDetails.regionName}</h3>
							<p>{selectedRegionDetails.regionDescription}</p>
							<div style={{display: 'flex', justifyContent: 'flex-end'}}>
							<button className="region-button2" onClick={onNext}>다음</button>
							</div>
						</div>
					) : ('')}
				</div>
			</div>
		</div>
	);
}
export default RegionSchedule;