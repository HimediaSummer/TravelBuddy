import React, { useEffect, useState } from 'react';
import Map from './Map';

function AccomSchedule({ onNext, setTravelData }) {

	const [accom, setAccom] = useState([]);
	const [selectedAccom, setSelectedAccom] = useState(null);
	const [selectedAccomDetails, setSelectedAccomDetails] = useState(null);

	// 숙소
	useEffect(() => {
		fetch('http://localhost:8080/schedule/accom')
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

		fetch(`http://localhost:8080/schedule/accom/${accom.accomCode}`)
			.then(response => response.json())
			.then(data => {
				setSelectedAccomDetails(data.data);
			})
			.catch(error => console.error('Error fetching data:', error));
		console.log("Selected Accommodation:", accom);
	};

	return (
		<div class="tema-title">
			<div class="chat-container">
				<form class="chat-form" action="post">
					<div id="chat-box2">
						<h2>숙소 선택</h2>
					</div>
					<div class="tema-title">
						<legend>선호하는 숙소형태를 선택해주세요.</legend>
					</div>
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
				</form>
				<div id='chat-box3'>
					{selectedAccomDetails ? (
						<div>
							<img src={`/Img/${selectedAccomDetails.accomThumbnailImg}`} alt={selectedAccomDetails.accomName} width={'500px'} height={'300px'} />
							<p>
								{/* <img src={`/Img/${selectedAccomDetails.accomThumbnailImg}`} alt={selectedAccomDetails.accomName} width={'50px'} height={'50px'}/> */}
								{selectedAccomDetails.accomType}</p>
							<p>{selectedAccomDetails.accomName}</p>
							<p>{selectedAccomDetails.accomAddres}</p>
							<div style={{display: 'flex', justifyContent: 'flex-end'}}>
								<button className='accom-button2' onClick={onNext}>다음</button>
							</div>
						</div>
					) : (
						''
					)}
				</div>
				<div style={{marginTop: '100px'}}>
							<Map />
							</div>
				{/* 테스트 잔디확인용 */}
			</div>
		</div>
	);
};

export default AccomSchedule;