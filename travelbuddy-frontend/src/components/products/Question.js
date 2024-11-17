import React, { useEffect, useState } from 'react';

function Question({ onNext }) {

	const [qTheme, setQTheme] = useState([]);
	const [questionDetails, setQuestionDetails] = useState([]);
	const [selectedQuestionTheme, setSelectedQuestionTheme] = useState(null);
	const [selectedQuestions, setSelectedQuestions] = useState([]);

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

	const handleQuestionThemeSelect = qTheme => {

		console.log('선택된테마코드?', qTheme);
		console.log('야있냐???', qTheme.themeCode);
		
		setSelectedQuestionTheme(qTheme);

		fetch(`http://localhost:8080/schedule/question/${qTheme.themeCode}`)
			.then(response => response.json())
			.then(data => {
				console.log('뭐가져왔냐?', data);
				const questionDetails = data.data.map(questions => ({
					questCode: questions.questCode,
					question: questions.question,
					themeCode: questions.themeCode
				}))
				setSelectedQuestions(questionDetails);
			})
			.catch(error => console.error('Error fetching data:', error));
		console.log("Selected QuestionTheme:", qTheme);
	};

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
				<div>
					{selectedQuestions && selectedQuestions.length > 0 ? (
						selectedQuestions.map(questions => {
							return (
								<div key={questions.questCode}>
									<p>질문 : {questions.question}</p>
								</div>
							)
						})
					) : (
						<p>테마를 선택해주세요.</p>
					)}
				</div>
			</fieldset>
		</>
	);
}

export default Question;