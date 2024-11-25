import React, { useEffect, useState } from 'react';
import Map from './Map';

function RegionSchedule({ onNext, selectedRegion, setSelectedRegion, setTravelData }) {

	const [region, setRegion] = useState([]);
	const [selectedRegionDetails, setSelectedRegionDetails] = useState(null);
	const [isToggleOpen, setIsToggleOpen] = useState(true);
	const [regionTab, setRegionTab] = useState('select');

	// 카카오지도 검색
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] =  useState([]);

	// 지역 위도/경도 하드코딩 
	// const regionCoordinates = {
	// 	101: { lat: 37.5665, lng: 126.9780 },	// 서울
	// 	102: { lat: 37.4138, lng: 127.5183 },	// 경기도
	// 	103: { lat: 37.4563, lng: 126.7052 },	// 인천
	// 	104: { lat: 37.8228, lng: 128.1555 },	// 강원도
	// 	105: { lat: 36.6357, lng: 127.4917 },	// 충북
	// 	106: { lat: 36.5184, lng: 126.8000 },	// 충남
	// 	107: { lat: 36.3504, lng: 127.3845 },	// 대전
	// 	108: { lat: 36.4800, lng: 127.2890 },	// 세종
	// 	109: { lat: 35.7175, lng: 127.1530 },	// 전북
	// 	110: { lat: 34.8679, lng: 126.9910 },	// 전남
	// 	111: { lat: 35.1595, lng: 126.8526 },	// 광주
	// 	112: { lat: 36.4919, lng: 128.8889 },	// 경북
	// 	113: { lat: 35.4606, lng: 128.2132 },	// 경남
	// 	114: { lat: 35.1796, lng: 129.0756 },	// 부산
	// 	115: { lat: 35.8722, lng: 128.6014 },	// 대구
	// 	116: { lat: 35.5384, lng: 129.3114 },	// 울산
	// 	117: { lat: 33.4996, lng: 126.5312 },	// 제주도
	// };

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

	// 장소 버튼 누르면 밑에 상세 조회 뾰롱
	const handleRegionSelect = (region) => {
		setSelectedRegion(region);
		setTravelData(prevData => ({
			...prevData,
			regions: [...prevData.regions, region]
		}));

		fetch(`http://localhost:8080/schedule/region/${region.regionCode}`)
			.then(response => response.json())
			.then(data => {
				setSelectedRegionDetails(data.data);
			})
			.catch(error => console.error('Error fetching data:', error));
		console.log("Selected Region:", region);
	};

	// 엔터키 처리 이벤트
	const handleKeyDown = e => {
		if(e.key === 'Enter') {
			e.preventDefault();
			handleSearchSubmit();
		}
	};

	// 토글토글
	const toggle = () => {
		setIsToggleOpen(prevState => !prevState);
	};

	const tabChange = (tab) => {
		setRegionTab(tab);
	};

	// 검색어 입력 처리
	const handleSearchChange  = e => {
		setSearchQuery(e.target.value);
	};

	// 검색 처리
	const handleSearchSubmit = () => {
		setSelectedRegion({
			regionName: searchQuery
		});
	};

	return (
		<div class="tema-title">
			<div class="chat-container">
				<form class="chat-form" action="post">
					<div class='chat-container-r'>
					<div id="chat-box2-r">
						<button type='button' onClick={() => tabChange('select')}>장소 선택</button>
						<button type='button' onClick={() => tabChange('search')}>장소 검색</button>
					</div>
					</div>
					<div class="tema-title">
						<legend>가고싶은 도시를 선택해주세요.</legend>
					</div>
					{ regionTab === 'select' &&  (
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
					)}
					{ regionTab === 'search' && (
					<div className='region-search'>
						<input type='search' placeholder='주소만 검색해주세요.' value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyDown} style={{width: '400px'}}/>
						<button className="region-button2" onClick={onNext} disabled={!searchQuery}>다음</button>
					</div>
					)}
				</form>
				<div>
					<button onClick={toggle} style={{display: regionTab === 'search' ? 'none' : 'block'}}>
						{isToggleOpen ? '<' : '>'}
					</button>
				</div>
				{/* 선택된 지역 상세 정보 출력 */}
				<div id="chat-box3" style={{display: selectedRegionDetails && isToggleOpen && regionTab === 'select' ? 'block':'none'}}>
					{selectedRegionDetails ? (
						<div>
							<img src={`/Img/${selectedRegionDetails.regionImg}`} alt={selectedRegionDetails.regionName} width={'300px'} height={'200px'} />
							<h3>{selectedRegionDetails.regionName}</h3>
							<p>{selectedRegionDetails.regionDescription}</p>
							<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<button className="region-button2" onClick={onNext}>다음</button>
							</div>
						</div>
					) : ('')}
				</div>
							{/* <div style={{marginTop: '100px'}}>
								{selectedRegion && isToggleOpen && regionTab === 'select' ? (
							// <Map latitude={selectedRegion.lat} longitude={selectedRegion.lng}/>
							<Map regionName={selectedRegion.regionName} style={{width: '500px', height: '800px'}}/>
								) : (<Map regionName={selectedRegionDetails? (selectedRegion.regionName) : (null)} style={{width: '800px', height: '800px'}} />)}
							</div> */}
							<div style={{marginTop: '100px'}}>
								{regionTab === 'search' ? (
									// 검색 탭일 때
									<Map regionName={searchQuery} style={{width: '800px', height: '800px'}}/>
								) : (
									// 선택 탭일 때
									selectedRegion ? (
										<Map regionName={selectedRegion.regionName} style={{width: isToggleOpen ? '500px' : '800px', height: '800px'}}/>
									) : (
										<Map regionName={null} style={{width: '800px', height: '800px'}}/>
									)
								)}
							</div>
			</div>
		</div>
	);
}
export default RegionSchedule;