import React, { useEffect, useState } from 'react';

function Question({ onNext }) {

	const [qTheme, setQTheme] = useState([]);
	const [questionDetails, setQuestionDetails] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [selectedQuestionTheme, setSelectedQuestionTheme] = useState(null);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// 질문지 테마
	useEffect(() => {
		fetch('http://localhost:8080/schedule/question')
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

	// 테마별 질문
	// useEffect(() => {
	// 	fetch('http://localhost:8080/schedule/question/1')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log('가져온거', data);
	// 			const questionDetails = data.data.map(questions => ({
	// 				questCode: questions.questCode,
	// 				question: questions.question,
	// 				themeCode: questions.themeCode
	// 			}));
	// 			console.log("가져왓냐?", data);
	// 			setSelectedQuestions(questionDetails);
	// 		})
	// 		.catch(error => console.error('Error fetching data:', error));
	// }, []);

	// 질문별 대답
	// useEffect(() => {
	// 	fetch('http://localhost:8080/schedule/answer/1')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log('답변 가져온거', data);
	// 			const answers = data.data.map(answers => ({
	// 				answerCode: answers.answerCode,
	// 				answer: answers.answer,
	// 				questCode: answers.questCode
	// 			}));
	// 			console.log("답변 가져왓냐?", data);
	// 			setSelectedQuestions(answers);
	// 		})
	// 		.catch(error => console.error('Error fetching data:', error));
	// }, []);

	// const handleQuestionThemeSelect = qTheme => {

	// 	console.log('선택된테마코드?', qTheme);
	// 	console.log('야있냐???', qTheme.themeCode);

	// 	setSelectedQuestionTheme(qTheme);

	// 	fetch(`http://localhost:8080/schedule/question/${qTheme.themeCode}`)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log('뭐가져왔냐?', data);
	// 			const questionDetails = data.data.map(questions => ({
	// 				questCode: questions.questCode,
	// 				question: questions.question,
	// 				themeCode: questions.themeCode
	// 			}))
	// 			setSelectedQuestions(questionDetails);

	// 			qTheme.questions.forEach(question => {			
	// 				fetch(`http://localhost:8080/schedule/answer/${question.questCode}`)
	// 					.then(response => response.json())
	// 					.then(data => {
	// 						console.log('뭐가져왓냐', data);
	// 						const answers = data.data.map(answers => ({
	// 							answerCode: answers.answerCode,
	// 							answer: answers.answer,
	// 							questCode: answers.questCode
	// 						}))
	// 						setSelectedAnswer(prevAnswers => [...prevAnswers, answers]);
	// 					})
	// 					.catch(error => console.error('Error fetching data:', error));
	// 				console.log("Selected Answer:", answers);
	// 			});
	// 		})
	// 		.catch(error => console.error('Error fetching data:', error));
	// 	console.log("Selected QuestionTheme:", qTheme);
	// };

	// 답변 핸들러
	// 	const handleAnswerSelect = answers => {

	// 		console.log('선택된답변코드는?', answers);
	// 		console.log('코드잇냐고~!???', answers.questCode);

	// 	qTheme.questions.forEach(question => {			
	// 		fetch(`http://localhost:8080/schedule/answer/${question.questCode}`)
	// 			.then(response => response.json())
	// 			.then(data => {
	// 				console.log('뭐가져왓냐', data);
	// 				const answers = data.data.map(answers => ({
	// 					answerCode: answers.answerCode,
	// 					answer: answers.answer,
	// 					questCode: answers.questCode
	// 				}))
	// 				setSelectedAnswer(prevAnswers => [...prevAnswers, answers]);
	// 			})
	// 			.catch(error => console.error('Error fetching data:', error));
	// 		console.log("Selected Answer:", answers);
	// 	});
	// };

	// 테마별 질문과 답변 가져오기
	const handleQuestionThemeSelect = (qTheme) => {
		console.log('선택된 테마 코드:', qTheme.themeCode);

		setSelectedQuestionTheme(qTheme);
		setSelectedQuestions([]);  // 이전 질문, 답변 초기화
		setSelectedAnswer([]); // 답변 초기화
		setCurrentQuestionIndex(0); // 질문 인덱스 초기화

		// 테마에 맞는 질문 가져오기
		fetch(`http://localhost:8080/schedule/question/${qTheme.themeCode}`)
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
					fetch(`http://localhost:8080/schedule/answer/${question.questCode}`)
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

	// 답변 선택 핸들러
	// const handleAnswerSelect = (selectedAnswer) => {
	// 	console.log('선택된 답변:', selectedAnswer);
	// 	setSelectedAnswer(prevAnswers =>
	// 		prevAnswers.map(answer =>
	// 			answer.answerCode === selectedAnswer.answerCode
	// 				? { ...answer, selected: true } // 선택된 답변에 selected 속성 추가
	// 				: answer
	// 		)
	// 	);
	// };

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

		// 답변을 선택한 후 다음 질문으로 넘어가기
		setCurrentQuestionIndex(prevIndex => prevIndex + 1);
	};

	// 현재 질문을 가져오기
	const currentQuestion = selectedQuestions[currentQuestionIndex];

	return (
		<>
			<fieldset class="select">
				<div class="tema-title">
					<legend>선호하는 여행테마를 선택해주세요</legend>
				</div>
				<div>
					{qTheme.map((qTheme) => {
						return (<button type='button' key={qTheme.questionTheme} onClick={() => handleQuestionThemeSelect(qTheme)}>
							{qTheme.questionTheme}
						</button>);
					})}
				</div>
				{/* <div>
					{selectedQuestions.length > 0 ? (
						selectedQuestions.map(questions => {
							const questionAnswer = selectedAnswer.filter(answer => answer.questCode === questions.questCode);
							return (
								<div key={questions.questCode}>
									<p>질문: {questions.question}</p>
									{questionAnswer.length > 0 ? (
										questionAnswer.map(answers => {
											return (
												<button type='button' key={`${answers.questCode}-${answers.answerCode}`} onClick={() => handleAnswerSelect(answers)}>
													{answers.answer}
												</button>
											)
										})
									) : (
										<p>답이 왜 안 나오냐?</p>
									)}
								</div>
							)
						})
					) : (
						<p>테마를 선택해주세요.</p>
					)}
				</div> */}
				<div>
					{selectedQuestions.length > 0 && currentQuestionIndex < selectedQuestions.length ? (
						// 현재 질문만 표시
						<div key={currentQuestion.questCode}>
							<p>질문: {currentQuestion.question}</p>

							{/* 해당 질문에 맞는 답변 필터링 */}
							{selectedAnswer
								.filter((answer) => answer.questCode === currentQuestion.questCode)
								.map((answer) => (
									<button
										type="button"
										key={`${answer.questCode}-${answer.answerCode}`} // questCode + answerCode 조합으로 key 설정
										onClick={() => handleAnswerSelect(answer)} // 답변 선택 시 다음 질문으로 이동
									>
										{answer.answer}
									</button>
								))}
						</div>
					) : (
						''
					)}
				</div>
				{/* <div>
					{selectedAnswer && selectedAnswer.length > 0 ? (
						selectedAnswer.map(answers => {
							return (
								<button key={answers.answerCode} onClick={() => handleAnswerSelect(answers)}>
									답 : {answers.answer}
								</button>
							)
						})
					) : (
						<p>답이 왜 안 나오냐?</p>
					)}
				</div> */}
			</fieldset>
		</>
	);
}

export default Question;