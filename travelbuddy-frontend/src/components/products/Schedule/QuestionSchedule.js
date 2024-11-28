import React, { useEffect, useState } from 'react';

function QuestionSchedule({ onNext, setTravelData }) {

	const [qTheme, setQTheme] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [selectedQuestionTheme, setSelectedQuestionTheme] = useState(null);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [isDone, setIsDone] = useState(false);

	// 질문지 테마
	useEffect(() => {
		fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/question`)
			.then(response => response.json())
			.then(data => {
				console.log('가져온거', data);
				const questionThemes = data.data.qThemes.map(qTheme => ({
					themeCode: qTheme.themeCode,
					questionTheme: qTheme.questionTheme
				}));
				console.log("가져왓냐?", data);
				setQTheme(questionThemes);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	// 테마별 질문과 답변 가져오기
		const handleQuestionThemeSelect = (qTheme) => {
		setSelectedQuestionTheme(qTheme);
		setSelectedQuestions([]);  // 이전 질문, 답변 초기화
		setSelectedAnswer([]); // 답변 초기화
		setCurrentQuestionIndex(0); // 질문 인덱스 초기화

		// 테마에 맞는 질문 가져오기
		fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/question/${qTheme.themeCode}`)
			.then(response => response.json())
			.then(data => {
				const questionDetails = data.data.map(questions => ({
					questCode: questions.questCode,
					question: questions.question,
					themeCode: questions.themeCode
				}));
				setSelectedQuestions(questionDetails);

				// 각 질문에 대한 답변을 가져오기
				const allAnswersPromises = questionDetails.map(question =>
					fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/answer/${question.questCode}`)
						.then(response => response.json())
						.then(data => {
							return data.data.map(answers => ({
								answerCode: answers.answerCode,
								answer: answers.answer,
								questCode: answers.questCode
							}));
						})
						.catch(error => console.error('Error fetching answers:', error))
				);

				// 모든 답변을 가져온 후 상태에 업데이트
				Promise.all(allAnswersPromises)
					.then(allAnswers => {
						const flatAnswers = allAnswers.flat(); // 여러 배열을 하나로 합침
						setSelectedAnswer(flatAnswers);
					})
					.catch(error => console.error('Error fetching answers:', error));
			})
			.catch(error => console.error('Error fetching questions:', error));
	};

	// 답변 선택 후 다음 질문으로 넘어가기
	const handleAnswerSelect = (answer) => {
		// 답변을 selectedAnswers에 저장 (현재 질문에 대한 답변)
		setSelectedAnswer(prevAnswers => [
			...prevAnswers,
			{
				questCode: selectedQuestions[currentQuestionIndex].questCode,
				answerCode: answer.answerCode,
				answer: answer.answer
			}
		]);

		setTravelData(prevData => ({
			...prevData,
			questions: [
				...prevData.questions,
				{
					questCode: selectedQuestions[currentQuestionIndex].questCode,
					answerCode: answer.answerCode,
					answer: answer.answer
				}
			]
		}));

		// 답변을 선택한 후 다음 질문으로 넘어가기
		setCurrentQuestionIndex(prevIndex => {
			const nextIndex = prevIndex + 1;

			// 모든 질문을 끝냈는지 확인
			if (nextIndex >= selectedQuestions.length) {
				setIsDone(true); // 질문 끝!
			}

			return nextIndex;
		});
	};

	// 현재 질문을 가져오기
	const currentQuestion = selectedQuestions[currentQuestionIndex];
	return (
		<div class="tema-title">
			<div class="chat-container-q">
				<form class="chat-form" action="post">
					<div id="chat-box2">
						<h2>질문 선택</h2>
					</div>
					<div class="tema-title">
						<legend>선호하는 여행테마를 선택해주세요</legend>
					</div>
					<div className="answer-container">
					{/* <div> */}
						{!selectedQuestionTheme && qTheme.map((qTheme) => (
							<div className="answer-box" key={qTheme.questionTheme} onClick={() => handleQuestionThemeSelect(qTheme)}>
								{qTheme.questionTheme}
							</div>
						))}
					</div>
					<div>
						{selectedQuestions.length > 0 && currentQuestionIndex < selectedQuestions.length ? (
							<div key={currentQuestion.questCode}>
								<p>질문: {currentQuestion.question}</p>
								{/* 해당 질문에 맞는 답변 필터링 */}
								{selectedAnswer
									.filter((answer) => answer.questCode === currentQuestion.questCode)
									.map((answer) => (
										<div className="answer-box2" key={`${answer.questCode}-${answer.answerCode}`} onClick={() => handleAnswerSelect(answer)}>
											{answer.answer}
										</div>
									))}
							</div>
							) : ('')
						}
					</div>
					<br />
					{/* 모든 질문을 끝냈을 때 다음 버튼 표시하기 */}
					{isDone && (
						<div>
							<p>응답이 완료되었습니다.</p>
						</div>
					)}
					{isDone && (
						<div>
							<button className='quest-button2' onClick={onNext}>다음</button>
						</div>
					)}
				</form>
			</div >
		</div >
	);
}

export default QuestionSchedule;