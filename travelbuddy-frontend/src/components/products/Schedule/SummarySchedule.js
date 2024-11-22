import React, { useEffect, useState } from 'react';

function SummarySchedule({ travelData }) {
	const [schedule, setSchedule] = useState('');
	const [loading, setLoading] = useState(false);

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
					messages: [
					  { 
						role: "user", 
						// content: `다음 정보를 바탕으로 여행 일정을 만들어 주세요: ${JSON.stringify(travelData)}`
						content: `: ${JSON.stringify(travelData)} 이 데이터를 바탕으로 여행일정을 만들어 출력해 주세요. 일정은 식사장소를 포함해서 하루에 다섯곳 정해줘. 일정 중간중간에 이동하는시간도 알려주고, 일정 시작시간은 오전10시, 끝나는시간은 오후10시야, 주소 지번도 나왔으면 좋겠어 일정을 알려준 다음에는 그 일정을 객체배열화 해서 알려주면 좋겠어 양식을 알려줄게 양식은 참고만해줘, 장소의 위도, 경도도 알려줘 { sche_start_date: 12.12(목), sche_end_date: 12.14(금), sche_start_time : 10:00, sche_end_time: 22:00, region : 서울, accom : 펜션}{  scheduledate : 12.12(목),  travel_time : 3hour,  sche_time :  13:00 ~ 14:00,  sche_list : N서울타워,  scheduletype : 명소,  addres : 용산동2가 산1-3}{  scheduledate : 12.12(목),  travel_time : 1hour20min  sche_time :  15:20 ~ 16:00,  sche_list : 싸다김밥 종로관철점,  scheduletype : 식당,  addres : 관철동 7-1}{  scheduledate : 12.12(목),  travel_time : 30min,  sche_time :  16:30 ~ 20:00,  sche_list : 롤파크,  scheduletype : 명소,  addres : 청진동 70}{  scheduledate : 12.13(금),  travel_time : 3hour,  sche_time :  13:00 ~ 14:00,  sche_list : N서울타워,  scheduletype : 명소, addres : 용산동2가 산1-3 } { scheduledate : 12.13(금), travel_time : 1hour20min sche_time :  15:20 ~ 16:00, sche_list : 싸다김밥 종로관철점, scheduletype : 식당, addres : 관철동 7-1 } { scheduledate : 12.13(금), travel_time : 30min, sche_time :  16:30 ~ 20:00, sche_list : 롤파크, scheduletype : 명소, addres : 청진동 70 }`
					  },
					],
					temperature: 1.0,
					max_tokens: 3000,
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
			console.log("jsonData : ", jsonData);

			// 필요한 부분만 추출
			// const scheduleArray = jsonData.schedule;

			// scheduleArray를 사용하여 필요한 작업 수행
			// console.log('추출된 일정:', scheduleArray);
			
			console.log('data.choices[0]' , data.choices[0]);
			console.log('data.choices[0].message' , data.choices[0].message);
			console.log('data.choices[0].message.content : ' , data.choices[0].message.content);
			console.log('data 타입 : ' , typeof data.choices[0].message.content);
			setSchedule(content); // 상태에 저장하거나 다른 작업 수행
		} catch (error) {
			console.error('Error generating schedule:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// 초기화 또는 다른 로직이 필요할 경우 여기에 추가
	}, []);

	return (
		<div className="tema-title">
			<div className="chat-container">
				<form className="chat-form2" action="post">
					<div id="chat-box2">
						<h2>전체 일정</h2>
					</div>
					<div className="button-edit">
						<div className="create-schedule">
							<button
								className="submit-button"
								type="button"
								id="button"
								onClick={handleGenerateSchedule}
							>
								일정 생성
							</button>
						</div>
						<div id="loading-gif">
							{loading && <img src="./Img/spin.gif" alt="로딩이미지" />}
						</div>
						<div className="reset-travel">
							<button id="button" type="reset" onClick={() => window.location.reload()}>
								초기화
							</button>
						</div>
					</div>
					<div className="chat-answer">
						<div id="answer">
							<textarea
								name="content"
								id="chat-content"
								placeholder="여행 일정이 완성되고 있습니다. 잠시만 기다려주세요 :)"
								value={schedule}
								readOnly
							></textarea>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SummarySchedule;