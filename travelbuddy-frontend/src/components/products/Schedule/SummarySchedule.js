import React, { useEffect, useState } from 'react';
import OpenAI from "openai";

function SummarySchedule({ travelData }) {
	const [schedule, setSchedule] = useState('');
	const [loading, setLoading] = useState(false);

	const openai = new OpenAI();
	const handleGenerateSchedule = async () => {
		setLoading(true);
		try {
			// const response = await fetch('http://localhost:8080/schedule/summaryschedule', {
			const response = await fetch(openai.chat.completions.create, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`
				},
				// body: JSON.stringify(travelData), // travelData는 날짜, 숙소, 지역, 질문지 정보를 포함해야 함
				body: JSON.stringify({
					travelData,
					model: "gpt-4o-mini",
					messages: [
					  { role: "user", content: "travelData를 사용해서 여행계획 짜줘" },
					],
					temperature: 1.0,
					max_tokens: 20,
				  }),
			});
			const data = await response.json();
			setSchedule(data.schedule); // API에서 받은 일정 설정
			console.log('response' , response);
			console.log('data');
			console.log(data);
			console.log('data.schedule');
			console.log(data.schedule);
			console.log('data.data');
			console.log(data.data.schedule);
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
							<div id="loading-gif">
								{loading && <p>로딩 중...</p>}
							</div>
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