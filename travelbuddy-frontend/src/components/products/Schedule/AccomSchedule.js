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
                    <h2>숙소 선택</h2>
                    <div class="tema-title">
                        <legend>선호하는 숙소형태를 선택해주세요</legend>
                    </div>
                    <div>
                        {accom.map((accom) => (
                            <button type='button' key={accom.accomCode} onClick={() => handleAccomSelect(accom)}>
                                {accom.accomName} ({accom.accomType})
                            </button>
                        ))}
                    </div>
                    <div>
                        {selectedAccomDetails ? (
                            <div>
                                <p>숙소 타입 : {selectedAccomDetails.accomType}</p>
                                <p>숙소 이름 : {selectedAccomDetails.accomName}</p>
                                <p>숙소 주소 : {selectedAccomDetails.accomAddres}</p>
                            </div>
                        ) : (
                            <p>숙소를 선택해주세요.</p>
                        )}
                        <button onClick={onNext}>다음</button>
                    </div>
                </form>
            </div>
        </div>
	);
};

export default AccomSchedule;