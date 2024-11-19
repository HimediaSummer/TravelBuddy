import React, { useEffect, useState } from 'react';

function AccomSchedule({ onNext }) {

	const [accom, setAccom] = useState([]);
	const [accomDetails, setAccomDetails] = useState([]);
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

	// 숙소 상세
	// useEffect(() => {
	// 	// 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
	// 	fetch(`http://localhost:8080/schedule/accom/1`)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			setSelectedAccomDetails(data.data);
	// 			console.log("상세 가져왓냐?", data);
	// 		})
	// 		.catch(error => console.error('Error fetching data:', error));
	// }, []);

	// 버튼 누르면 상세 조회 뾰로롱
	const handleAccomSelect = (accom) => {
		setSelectedAccom(accom);

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
									<img key={accom.accomCode} src={`/Img/${accom.accomThumbnailImg}`} alt={accom.accomName} width={'150px'} height={'150px'} style={{borderRadius: '15px'}}/>
								</div>
								{accom.accomName} ({accom.accomType})
							<button type='button' className='accom-button' key={accom.accomCode} onClick={() => handleAccomSelect(accom)}></button>
							</div>
						))}
						</div>
					</div>
				</form>
					<div id='chat-box3'>
						{selectedAccomDetails ? (
							<div>
								{/* <img src={`/Img/${selectedAccomDetails.accomThumbnailImg}`} alt={selectedAccomDetails.accomName} width={'50px'} height={'50px'}/>  */}
								<p>
								<img src={`/Img/${selectedAccomDetails.accomThumbnailImg}`} alt={selectedAccomDetails.accomName} width={'50px'} height={'50px'} style={{borderRadius: '15px'}}/>
									숙소 타입 : {selectedAccomDetails.accomType}</p>
								<p>숙소 이름 : {selectedAccomDetails.accomName}</p>
								<p>숙소 주소 : {selectedAccomDetails.accomAddres}</p>
							</div>
						) : (
							''
						)}
						<button className='accom-button2' onClick={onNext}>다음</button>
					</div>
			</div>
		</div>
	);
};

export default AccomSchedule;