import React, { useEffect, useState } from 'react';
import Map from './Map';

function AccomSchedule({ onNext, startDate, setStartDate, endDate, setEndDate, selectedRegion, setTravelData }) {
// function AccomSchedule({ onNext, setTravelData }) {

	const [accom, setAccom] = useState([]);
	const [selectedAccom, setSelectedAccom] = useState(null);
	const [selectedAccomDetails, setSelectedAccomDetails] = useState(null);
	const [isToggleOpen, setIsToggleOpen] = useState(true);
	const [accomTab, setAccomTab] = useState('select');

	// 카카오지도 검색
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] =  useState([]);
	const [searchAddress, setSearchAddress] = useState('');

	console.log('지역 가져왓냐!!!!!!!', selectedRegion);
	console.log('이름이머에여!!!!!!!!!!!!', selectedRegion.regionName);
	// 숙소
	useEffect(() => {
		fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/accom`)
			.then(response => response.json())
			.then(data => {
				const accommodations = data.data.Accommodations.map(accom => ({
					accomCode: accom.accomCode,
					accomType: accom.accomType,
					accomName: accom.accomName,
					accomAddres: accom.accomAddres,
					accomImg: accom.accomImg,
					accomThumbnailImg: accom.accomThumbnailImg
				}));
				console.log("가져왓냐?", data);
				setAccom(accommodations);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	// 버튼 누르면 상세 조회 뾰로롱
	const handleAccomSelect = (accom) => {
		setSelectedAccom(accom);
		setTravelData(prevData => ({
			...prevData,
			accommodations: [...prevData.accommodations, accom]
		}));

		fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/accom/${accom.accomCode}`)
			.then(response => response.json())
			.then(data => {
				setSelectedAccomDetails(data.data);
			})
			.catch(error => console.error('Error fetching data:', error));
		console.log("Selected Accommodation:", accom);
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
		setAccomTab(tab);
	};

	// 검색어 입력 처리
	const handleSearchChange  = e => {
		setSearchQuery(e.target.value);
	};

	// // 검색 처리
	// const handleSearchSubmit = () => {
	// 	if(searchQuery.trim()) {
	// 		setSearchAddress(searchQuery);
	// 		setSelectedAccom({
	// 			regionName: searchQuery
	// 		});
	// 	}
	// };

	// 검색 처리
const handleSearchSubmit = () => {
    if(searchQuery.trim()) {
        setSearchAddress(searchQuery);
        const searchedAccom = {
            // accomType: '검색',  // 또는 적절한 타입
            accomName: '사용자 지정 숙소',
            accomAddres: searchQuery  // 검색한 주소를 저장
        };
        
        setSelectedAccom(searchedAccom);
        // travelData에 검색한 숙소 정보 추가
        setTravelData(prevData => ({
            ...prevData,
            accommodations: [...prevData.accommodations, searchedAccom]
        }));
    }
};


	return (
		<div class="tema-title">
			<div class="chat-container">
				<form class="chat-form" action="post">
				<div class='chat-container-r'>
					<div id="chat-box2-r">
						<button type='button' onClick={() => tabChange('select')}>숙소 선택</button>
						<button type='button' onClick={() => tabChange('search')}>숙소 검색</button>
					</div>
					</div>
					<div class="tema-title">
						<legend>선호하는 숙소형태를 선택해주세요.</legend>
					</div>
					{ accomTab === 'select' && (
					<div className='accom-scroll'>
						<div className='accoms'>
							{accom.map((accom) => (
								<div className='accom-item2' key={accom.accomCode}>
									<div className='accom-item'>
										<img key={accom.accomCode} src={`/Img/${accom.accomThumbnailImg}`} alt={accom.accomName} width={'150px'} height={'150px'} style={{ borderRadius: '15px' }} />
									</div>
									<div className='accom-wordMargin'>
										{accom.accomName} ({accom.accomType})
									</div>
									<button type='button' className={`accom-button ${selectedAccom && selectedAccom.accomCode === accom.accomCode ? 'selected' : ''}`} onClick={() => handleAccomSelect(accom)}></button>
								</div>
							))}
						</div>
					</div>
					)}
					{ accomTab === 'search' && (
					<div className='region-search'>
						<div>
						<input type='search' placeholder='주소만 검색해주세요.' value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyDown} style={{width: '400px'}}/>
						<img src='/Img/search-icon.png' width={'35px'} height={'35px'} style={{cursor: 'pointer'}} onClick={handleSearchSubmit}/>
						</div>
						<button className='accom-button2' onClick={onNext} disabled={!searchQuery}>다음</button>
					</div>
					)}
				</form>
				{/* <div>
					<button onClick={toggle} style={{display: accomTab === 'search' ? 'none' : 'block'}}>
						{isToggleOpen ? '<' : '>'}
					</button>
				</div> */}
				<div style={{position: 'relative', display: 'flex'}}>
				<div id='chat-box3' style={{display: selectedAccomDetails && isToggleOpen && accomTab === 'select' ? 'block' : 'none'}}>
					{selectedAccomDetails ? (
						<div>
							<img src={`/Img/${selectedAccomDetails.accomThumbnailImg}`} alt={selectedAccomDetails.accomName} width={'300px'} height={'200px'} />
							<p>
								{/* <img src={`/Img/${selectedAccomDetails.accomThumbnailImg}`} alt={selectedAccomDetails.accomName} width={'50px'} height={'50px'}/> */}
								{selectedAccomDetails.accomType}</p>
							<p>{selectedAccomDetails.accomName}</p>
							<p>{selectedAccomDetails.accomAddres}</p>
							<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<button className='accom-button2' onClick={onNext}>다음</button>
							</div>
						</div>
					) : (
						''
					)}
				</div>
				<div>
					<button className='toggle-button2' onClick={toggle} style={{display: accomTab === 'search' ? 'none' : 'block'}}>
						{isToggleOpen ? '<' : '>'}
					</button>
				</div>
				</div>
				{/* <div style={{marginTop: '100px'}}>
					{selectedRegion ?
							(<Map regionName={selectedRegion.regionName}/>) : (<Map />)
					}
							</div> */}
				{/* <div style={{ marginTop: '100px' }}>
					{selectedAccomDetails && selectedRegion && isToggleOpen && accomTab === 'select' ? (
						// <Map latitude={selectedRegion.lat} longitude={selectedRegion.lng}/>
						<Map regionName={selectedRegion.regionName} style={{ width: '500px', height: '800px' }} />
					) : (<Map regionName={selectedRegion.regionName} style={{ width: '800px', height: '800px' }} />)}
					{accomTab === 'search' && (
						<Map regionName={searchQuery} style={{ width: '800px', height: '800px' }} />
					)}
				</div> */}
				<div style={{marginTop: '100px'}}>
					{accomTab === 'search' ? (
						// 검색 탭일 때
						<Map regionName={searchAddress} style={{width: '1100px', height: '800px'}}/>
					) : (
						// 선택 탭일 때
						selectedAccomDetails && selectedRegion ? (
							<Map regionName={selectedRegion.regionName} style={{width: isToggleOpen ? '800px' : '800px', height: '800px'}}/>
						) : (
							<Map regionName={null} style={{width: '1100px', height: '800px'}}/>
						)
					)}
				</div>
				{/* 테스트 잔디확인용 */}
			</div>
		</div>
	);
};

export default AccomSchedule;