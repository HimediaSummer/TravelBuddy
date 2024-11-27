import React, { useEffect, useState } from 'react';
import ScheduleMap from './ScheduleMap';
import { decodeJwt } from '../../../utils/tokenUtils';
import { json, useNavigate } from 'react-router-dom';
import Schedule from '../Schedule';

function SummarySchedule({ travelData }) {
	const [schedule, setSchedule] = useState('');
	const [loading, setLoading] = useState(false);
	const [scheduleCreateButton, setScheduleCreateButton] = useState(false); // 일정 생성 버튼 숨기기
	// 지도 표시 테스트중
	const [scheduleData, setScheduleData] = useState([]); // 일정 데이터를 위한 state 추가
	const navigate = useNavigate();
	const [testScheduleData, setTestScheduleData] = useState([]); // 테스트
	const [scheduleDetails, setScheduleDetails] = useState({}); // 새로 추가된 상태


	const message = `: ${JSON.stringify(travelData)} 이 데이터를 바탕으로 여행일정을 만들어 출력해 줘. 형식은 json 배열 형태로 예시를 알려줄게, 날짜(date), 시간(time), 장소(list), 장소타입(type), 주소(adress), 경도/위도(latlng)는 꼭 있어야해, 스케줄은 지역내에서만 이뤄져야해 일정은 식사일정 포함해서 하루에 3개 이하, 1개이상으로 짜줘,
	sche_start_date,
	sche_end_date,
	sche_start_time,
	sche_end_time,
	region,
	accom
	이 여섯가지 데이터는 0번인덱스에만 나오면 돼. 그 후로는 나올필요없어.

	[{
	sche_start_date: YYYY-MM-DD,
	sche_end_date: YYYY-MM-DD,
	sche_start_time: 10:00,
	sche_end_time: 22:00,
	region: 지역,
	accom: 펜션
	}
	{
	scheduledate: YYYY-MM-DD,
	travel_time: 3hour,
	sche_time: 13:00 ~ 14:00,
	sche_list: N서울타워,
	scheduletype: 명소,
	addres: 용산동2가 산1-3,
	latlng: 37.5665, 126.9780
	}
	{
	scheduledate: YYYY-MM-DD,
	travel_time: 1hour20min,
	sche_time: 15:20 ~ 16:00,
	sche_list: 싸다김밥 종로관철점,
	scheduletype: 식당,
	addres: 관철동 7-1,
	latlng: 37.5665, 126.9780
	}]`;


	console.log('OpenAI API Key:', process.env.REACT_APP_OPENAI_API_KEY);
	console.log('앞에서 가져온 데이터 : ', travelData);
	console.log('데이터 로그 : ', process.env.REACT_APP_LOG);

	const handleGenerateSchedule = async () => {
		setLoading(true);
		try {
			// const response = await fetch('http://localhost:8080/schedule/summaryschedule', {
			// const response = await fetch(openai.chat.completions.create, {
			const response = await fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
				},
				// body: JSON.stringify(travelData), // travelData는 날짜, 숙소, 지역, 질문지 정보를 포함해야 함
				body: JSON.stringify({
					model: "gpt-4o-mini",
					// model: "gpt-4-turbo",
					messages: [
					  { 
						role: "user", 
						// content: `다음 정보를 바탕으로 여행 일정을 만들어 주세요: ${JSON.stringify(travelData)}`
						// content: `: ${JSON.stringify(travelData)} 이 데이터를 바탕으로 여행일정을 만들어 출력해 주세요. 일정은 식사장소를 포함해서 하루에 다섯곳 정해줘. 일정 중간중간에 이동하는시간도 알려주고, 일정 시작시간은 오전10시, 끝나는시간은 오후10시야, 주소 지번도 나왔으면 좋겠어 일정을 알려준 다음에는 그 일정을 객체배열화 해서 알려주면 좋겠어 양식을 알려줄게 양식은 참고만해줘, 장소의 위도, 경도도 알려줘 { sche_start_date: 12.12(목), sche_end_date: 12.14(금), sche_start_time : 10:00, sche_end_time: 22:00, region : 서울, accom : 펜션}{  scheduledate : 12.12(목),  travel_time : 3hour,  sche_time :  13:00 ~ 14:00,  sche_list : N서울타워,  scheduletype : 명소,  addres : 용산동2가 산1-3}{  scheduledate : 12.12(목),  travel_time : 1hour20min  sche_time :  15:20 ~ 16:00,  sche_list : 싸다김밥 종로관철점,  scheduletype : 식당,  addres : 관철동 7-1}{  scheduledate : 12.12(목),  travel_time : 30min,  sche_time :  16:30 ~ 20:00,  sche_list : 롤파크,  scheduletype : 명소,  addres : 청진동 70}{  scheduledate : 12.13(금),  travel_time : 3hour,  sche_time :  13:00 ~ 14:00,  sche_list : N서울타워,  scheduletype : 명소, addres : 용산동2가 산1-3 } { scheduledate : 12.13(금), travel_time : 1hour20min sche_time :  15:20 ~ 16:00, sche_list : 싸다김밥 종로관철점, scheduletype : 식당, addres : 관철동 7-1 } { scheduledate : 12.13(금), travel_time : 30min, sche_time :  16:30 ~ 20:00, sche_list : 롤파크, scheduletype : 명소, addres : 청진동 70 }`
						// content: `: ${JSON.stringify(travelData)} 이 데이터를 바탕으로 여행일정을 만들어 출력해 주세요. 꼭 데이터를 바탕으로만 만들어줘야해. 데이터에 없는 정보는 들어가선 안 돼. 예를 들어 지역을 강원도로 선택했는데 일정장소에 서울이나 부산이 들어가있으면 안되겠지? 또 데이터에 있는 숙소 타입에 맞춰서 숙소도 일정에 넣어줘 단, 실제로 영업중인 실제 숙박업소여야해. 만약에 데이터에 들어있는 값이 지번 주소라면 그건 사용자가 원하는 숙소주소니까 그걸 숙소로 사용하면 될거야. 데이터에 들어있는 날짜별로 꼭 다 일정을 생성해서 출력해줘야해. 하루도 빠지면 안 돼. 일정은 식사장소를 포함해서 하루에 다섯곳 정해줘. 일정 중간중간에 이동하는시간도 알려주고, 일정 시작시간은 오전10시, 끝나는시간은 오후10시야, 일정 사이사이에 이동시간은 실제 기반이어야해. 예를 들어 제주시에서 서귀포시로 넘어가는데 막 30분밖에 안 걸리고 그러면 안 되겠지? 일정 자체도 너무 말이 안 되는 일정은 삼가해줘 또 예를 들면 오전에 제주도 성산일출봉 갔다가 바로 애월읍 해변으로 간다거나 하는 일정같은거 말이야 너무 끝과 끝의 이동시간만 긴 현실적으로 불가능한 그런 일정들은 삼가해달라고 알겠지? 장소의 주소 지번도 나왔으면 좋겠어. 그런데 가상의 주소는 안 돼 실제로 존재하는 가게/식당/장소여야하고 그 장소/식당/가게와 주소가 맞아야 해. 또 해당 장소의 위도/경도를 꼭 포함해서 알려줘, 일정을 알려준 다음에는 그 일정을 객체배열화 해서 알려주면 좋겠어 양식을 알려줄게 양식은 참고만해줘 { sche_start_date: 12.12(목), sche_end_date: 12.14(금), sche_start_time : 10:00, sche_end_time: 22:00, region : 서울, accom : 펜션}{  scheduledate : 12.12(목),  travel_time : 3hour,  sche_time :  13:00 ~ 14:00,  sche_list : N서울타워,  scheduletype : 명소,  addres : 용산동2가 산1-3, latlng: 37.5665, 126.9780 }{  scheduledate : 12.12(목),  travel_time : 1hour20min  sche_time :  15:20 ~ 16:00,  sche_list : 싸다김밥 종로관철점,  scheduletype : 식당,  addres : 관철동 7-1, latlng: 37.5665, 126.9780 }{  scheduledate : 12.12(목),  travel_time : 30min,  sche_time :  16:30 ~ 20:00,  sche_list : 롤파크,  scheduletype : 명소,  addres : 청진동 70, latlng: 37.5665, 126.9780 }{  scheduledate : 12.13(금),  travel_time : 3hour,  sche_time :  13:00 ~ 14:00,  sche_list : N서울타워,  scheduletype : 명소, addres : 용산동2가 산1-3, latlng: 37.5665, 126.9780 } { scheduledate : 12.13(금), travel_time : 1hour20min sche_time :  15:20 ~ 16:00, sche_list : 싸다김밥 종로관철점, scheduletype : 식당, addres : 관철동 7-1, latlng: 37.5665, 126.9780 } { scheduledate : 12.13(금), travel_time : 30min, sche_time :  16:30 ~ 20:00, sche_list : 롤파크, scheduletype : 명소, addres : 청진동 70, latlng: 37.5665, 126.9780 }. 다시 한 번 말하지만 임의로 만들어진 가상의 주소나 숙소나 가게나 장소는 절대 안 돼. 실제로 존재하고 영업중인 가게 장소 숙소여야하고 주소도 맞춰서 실제로 있는 주소여야 해. 해당 장소 가게 숙소에 맞는 위도/경도도 잊지마. 만들어낸 가상의 정보는 절대 안 돼.`
						content: message
					  },
					],
					temperature: 1.0,
					max_tokens: 4000
				}),
			});
			const data = await response.json();
			const content = data.choices[0].message.content;
			console.log("content : ", content);

			// 문자열에서 JSON 배열 부분만 추출
			const jsonString = content.slice(content.indexOf('['), content.lastIndexOf(']') + 1);
			console.log('jsonString : ', jsonString);

			// JSON 형식으로 변환
			const jsonData = JSON.parse(jsonString);
			console.log("jsonData summarySchedule에서 사용할 데이터 json.parse 한 형태 : ", jsonData);
			setTestScheduleData(jsonData);

			// 필요한 부분만 추출
			// const scheduleArray = jsonData.schedule;

			// scheduleArray를 사용하여 필요한 작업 수행
			// console.log('추출된 일정:', scheduleArray);
			
			console.log('data.choices[0]' , data.choices[0]);
			console.log('data.choices[0].message' , data.choices[0].message);
			console.log('data.choices[0].message.content : ' , data.choices[0].message.content);
			console.log('data 타입 : ' , typeof data.choices[0].message.content);
			// 지도 표시 테스트중
			// setSchedule(content); // 상태에 저장하거나 다른 작업 수행

			// 첫 번째 항목에서 원하는 속성들만 추출하여 저장
			if (jsonData && jsonData[0]) {
				const firstSchedule = jsonData[0];
				const extractedDetails = {
				sche_start_date: firstSchedule.sche_start_date,
				sche_end_date: firstSchedule.sche_end_date,
				sche_start_time: firstSchedule.sche_start_time,
				sche_end_time: firstSchedule.sche_end_time,
				region: firstSchedule.region,
				accom: firstSchedule.accom,
				};
				setScheduleDetails(extractedDetails); // 새로 추출된 값 저장
			}

			// 위도, 경도만 뽑아서 scheduleData에 저장
			const extractedData = jsonData
				.filter(item => item && item.scheduledate) // 유효한 데이터만 필터링
				.map(item => {
					console.log('Processing item:', item); // 각 항목 로깅

					// latlng 문자열에서 위도, 경도 추출 (예: "37.5665, 126.9780")
					let latitude, longitude;
					if (item.latlng) {
						const [lat, lng] = item.latlng.split(',').map(coord => parseFloat(coord.trim()));
						latitude = lat;
						longitude = lng;
					}

					return {
						latitude: latitude,
						longitude: longitude,
						title: item.sche_list,
						scheduledate: item.scheduledate,
						addres: item.addres
					};
				});

			console.log('Extracted data:', extractedData); // 최종 데이터 로깅
			setScheduleData(extractedData);
			
			setSchedule(content);
			setScheduleCreateButton(true); // 일정이 생성되면 상태 업데이트
		} catch (error) {
			console.error('Error generating schedule:', error);
		} finally {
			setLoading(false);
		}
	};

	// 날짜별로 데이터를 그룹화하는 함수
	const groupByDate = (data) => {
	return data.reduce((acc, item) => {
		const date = item.scheduledate;
		if (!acc[date]) {
		acc[date] = []; // 해당 날짜가 처음 등장하면 빈 배열 생성
		}
		acc[date].push(item); // 해당 날짜에 데이터를 추가
		return acc;
	}, {});
	};


	useEffect(() => {
		// 초기화 또는 다른 로직이 필요할 경우 여기에 추가
	}, []);

	// 일정 저장
	const handleSaveSchedule = async () => {
		// 로그인 확인
		const token = decodeJwt(window.localStorage.getItem("accessToken"));
		console.log("scheduleDetails12 : " , scheduleDetails)

		console.log('token:????', token);
		const memberCode = token.memberCode;
		console.log('memberCode:????', memberCode);

		if(!token) {
			alert('로그인이 필요한 서비스입니다.');
			navigate('/login');
			return;
		}

		// 토큰 만료 확인
		if(token.exp * 1000 < Date.now()) {
			alert('로그인 시간이 만료 되었습니다. 다시 로그인해주세요.');
			navigate('/login');
			return;
		}

		try {

			        // schedule의 내용을 확인
					console.log('schedule 내용:', schedule);
					console.log('schedule 타입:', typeof schedule);
					// console.log('아진짜짱나네', testScheduleData);

			// // OpenAI가 생성한 일정 데이터를 JSON 형식으로 변환
			// const jsonData = JSON.parse(testScheduleData);	// schedule이 JSON 문자열이라면 파싱s

			// travelData에서 필요한 정보 추출
			const regionCode = travelData.regions[0].regionCode;
			console.log('regionCode:', regionCode);
			const accomCode = travelData.accommodations[0].accomCode;
			console.log('accomCode:', accomCode);



			const memberCode = window.localStorage.getItem('memberCode');
			console.log('회원번호 잘 왔냐?????????', memberCode);


			const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/save`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${window.localStorage.getItem("accessToken")}`
				},
				body: JSON.stringify({
					regionCode: regionCode,
					accomCode: accomCode,
					scheList: schedule,
					scheStartDate: scheduleDetails.sche_start_date,
					scheEndDate: scheduleDetails.sche_end_date,
					scheStartTime: scheduleDetails.sche_start_time,
					scheEndTime: scheduleDetails.sche_end_time
				})
			});

			if(!response.ok) {
				throw new Error('일정 저장에 실패했습니다.');
			}

			const result = await response.json();
			alert('일정 저장에 성공했습니다.');
		} catch(error) {
			console.error('일정 저장 중 오류 발생쉬먀', error);
			alert('일정 저장에 실패했습니다.');
		}
	};

	return (
		<div className="tema-title">

			<div className="chat-container">
				<form className="chat-form2" action="post">
					<div className="schedule">
						{testScheduleData && testScheduleData.length > 0 ? (
							Object.entries(groupByDate(testScheduleData.slice(1))).map(([date, items], dayIndex) => (
							<div className="day" key={dayIndex}>
								<div className="day-header">
								<h3>{dayIndex + 1}일차</h3> {/* 1일차, 2일차 등의 표시 */}
								<span className="date">{date}</span>
								{/* <h3>{date}</h3> 날짜 표시 */}
								</div>
								{items.map((item, index) => (
								<div className="scheduleitem" key={index}>
									<span className="schedulecircle">{index + 1}</span> {/* 일정 번호 */}
									<p>
									<strong>{item.sche_list}</strong> {/* 장소 이름 */}
									<br />
									{item.addres} {/* 주소 */}
									<br />
									<span className="time">{item.sche_time}</span> {/* 시간 */}
									</p>
								</div>
								))}
							</div>
							))
						) : (
							<p>일정 생성 버튼을 눌러주세요.</p>
						)}
					</div>
					<div className="button-edit">
						<div className="create-schedule">
							{/* <button
								className="submit-button"
								type="button"
								id="button"
								onClick={handleGenerateSchedule}
							>
								일정 생성
							</button> */}
							{scheduleCreateButton ? (
								<button
								className="submit-button"
								type="button"
								id="button"
								onClick={handleSaveSchedule}
								>
								저장
								</button>
								) : (
								<button
								className="submit-button"
								type="button"
								id="button"
								onClick={handleGenerateSchedule}
								>
								일정 생성
								</button>
							)}
						</div>
						<div id="loading-gif">
							{loading && <img src="./Img/spin.gif" alt="로딩이미지" />}
						</div>
						<div className="reset-travel">
							<button id="button" type="reset" onClick={() => window.location.replace("http://localhost:3000/schedule")}>
								다시하기
							</button>
						</div>
					</div>
				</form>
			<div className="chat-box3" style={{marginTop: '100px'}}>
				<ScheduleMap scheduleData={scheduleData} />
			</div>
			</div>
		</div>
	);
}

export default SummarySchedule;