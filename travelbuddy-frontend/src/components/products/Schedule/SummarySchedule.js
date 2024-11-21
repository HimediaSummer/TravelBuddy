import React, { useEffect, useState } from 'react';

function SummarySchedule({ travelData }) {
	const [schedule, setSchedule] = useState('');
	const [loading, setLoading] = useState(false);

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