import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

// 모달 body 태그에 붙이기
Modal.setAppElement('#root');
moment.locale('ko');

function DateSchedule({ onNext }) {

	const [currentStep, setCurrentStep] = useState(0); // z컴포넌트 바꾸기?
	//   const [message, setMessage] = useState('');
	const [accom, setAccom] = useState([]);
	const [region, setRegion] = useState([]);
	const [qTheme, setQTheme] = useState([]);

	// 모달
	const [isModalOpen, setIsModalOpen] = useState(false);
	//   const [selectedDate, setSelectedDate] = useState(new Date());

	// 날짜
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [selectedRange, setSelectedRange] = useState([null, null]);
	// 페이지 오면 모달 자동으로 열리게
	useEffect(
		() => { setIsModalOpen(true); },
		[]
	);

	// 모달 닫기
	const closeModal = () => {
		if (!startDate || !endDate) {
			alert('날짜를 선택해주세요.');
			return;
		}
		setIsModalOpen(false);
	};

	// 날짜 선택 최대 5일
	const diffdays = (start, end) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		return (endDate - startDate) / (1000 * 3600 * 24);
	};

	// 날짜 선택 핸들러
	const dateSelectedHandler = e => {

		const start = e[0];
		const end = e[1];

		if (start && end) {

			const daysDiff = diffdays(start, end);

			if (daysDiff > 5) {
				alert('최대 5일까지 선택 가능합니다.');
				setStartDate(null);
				setEndDate(null);
				setSelectedRange([null, null]);
				return;
			}

			const startDateFormat = moment(start).format("MM.DD(ddd)");
			const endDateFormat = moment(end).format("MM.DD(ddd)");

			setStartDate(startDateFormat);
			setEndDate(endDateFormat);
			setSelectedRange([start, end]);
		}
	};
	return (
		<div class="depart-airport">
			<h2>날짜 선택</h2>
			{/* 날짜 선택 UI 구현 */}
			{/* 날짜 선택 모달 */}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="날짜선택모달"
				style={{
					overlay: {
						backgroundColor: "rgba(0, 0, 0, 0.75)",
						zIndex: 20
					},
					content: {
						position: 'absolute',
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 20,
						width: "50%",
						height: "70%"
					}
				}}
			>
				<div style={{ textAlign: 'center' }}>
					<h4>행복한 여행기간을 선택해주세요!</h4>
					<p>최대 5일까지 선택 가능합니다.</p>
				</div>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Calendar
						onChange={dateSelectedHandler}
						value={selectedRange}
						minDate={new Date()}
						selectRange={true}
						formatDay={(locale, date) => moment(date).format("DD")}
					/>
				</div>
				<br />
				<div style={{ textAlign: 'right', paddingRight: '50px' }}>
					<button onClick={closeModal} disabled={!startDate || !endDate}>선택완료</button>
				</div>

			</Modal>

			<div class="chat-container">
				<form class="chat-form" action="post">
					<div class="user_input">
						<h2 class="chat-head" style={{ margin: 'auto' }}>장소를 입력해주세요.</h2>
						<h5 style={{ margin: 'auto' }}>{startDate || ""} ~ {endDate || ""}</h5>
						{/* 출발일, 도착일 */}
						<div class="travel-date">
							<div class="depart">
								<h3 id="depart-schedule">{startDate || ""}&nbsp;&nbsp;오전 10:00&nbsp;&nbsp;오후10:00</h3>
							</div>
							<div class="arrive">
								<h3 id="depart-schedule">{endDate || ""}&nbsp;&nbsp;오전 10:00&nbsp;&nbsp;오후 10:00</h3>
							</div>
						</div>
						<div class="location">
							<div class="depart-airport">
								{/* Region */}
							</div>
						</div>
						<div>
							{/* Accommodation */}
						</div>
						{/* Qestion */}
						{/* Schedule */}
					</div>
					{/* Loading */}
				</form>
			</div>
			<button onClick={onNext}>다음</button>
		</div>
	);
}

export default DateSchedule;