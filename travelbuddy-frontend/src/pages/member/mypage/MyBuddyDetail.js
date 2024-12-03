import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./MyBuddyDetail.css";

function MyBuddyDetail() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { buddyCode } = useParams();
	const [buddyDetail, setBuddyDetail] = useState({ buddyImg: [] });
	const [regionName, setRegionName] = useState(""); // 지역명
	const [buddyTypeName, setBuddyTypeName] = useState(""); // 버디 유형
	const [memberName, setMemberName] = useState(""); // 작성자 이름
	const [buddyMatch, setBuddyMatch] = useState([]);
	const [selectedBuddyMatches, setSelectedBuddyMatches] = useState([]);
	const [isAllSelected, setIsAllSelected] = useState(false);

	console.log("Buddy Code:", buddyCode);

	useEffect(() => {
		fetch(`/mypage/mybuddy/${buddyCode}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Fetched Data:", data);

				// buddyImg를 쉼표로 나눠 배열로 변환
				const images = data.data.getBuddyDetail.buddyImg
					? data.data.getBuddyDetail.buddyImg.split(",")
					: [];

				setBuddyDetail({
					...data.data.getBuddyDetail,
					buddyImg: images, // buddyImg를 배열로 저장
				});

				// setBuddyDetail(data.data.getBuddyDetail);
				setRegionName(data.data.regionName);
				setBuddyTypeName(data.data.buddyTypeName);
				setMemberName(data.data.memberName);
				setBuddyMatch(data.data.getBuddyMatchList);
				console.log("setBuddyDetail 발동", data);
			})
			.catch((error) => {
				console.error("Error fetching buddy:", error);
			});
	}, [buddyCode]);

	// 헤더 체크박스
	const handleSelectAll = () => {
		if (isAllSelected) {
			// 전체 선택 해제
			setSelectedBuddyMatches([]);
		} else {
			// 모든 buddyMatchCode 추가
			const allMatches = buddyMatch.map((match) => match.buddyMatchCode);
			setSelectedBuddyMatches(allMatches);
		}
		setIsAllSelected(!isAllSelected);
	};

	// 개별선택
	const handleCheckboxChange = (buddyMatchCode) => {
		setSelectedBuddyMatches(
			(prev) =>
				prev.includes(buddyMatchCode)
					? prev.filter((code) => code !== buddyMatchCode) // 이미 선택된 경우 제거
					: [...prev, buddyMatchCode] // 선택된 경우 추가
		);
	};

	// 헤더 체크박스 상태 동기화
	useEffect(() => {
		setIsAllSelected(
			buddyMatch.length > 0 &&
				buddyMatch.length === selectedBuddyMatches.length
		);
	}, [buddyMatch, selectedBuddyMatches]);

	// 상태 업데이트 공통 함수
	const updateStatus = async (applyStatus) => {
		if (selectedBuddyMatches.length === 0) {
			alert(
				applyStatus === 2
					? "수락할 회원을 선택해주세요."
					: "거절할 회원을 선택해주세요."
			);
			return;
		}

		if (applyStatus === 2) {
			// 이미 수락된 회원이 있는지 확인
			const alreadyAccepted = buddyMatch.filter(
				(match) => match.applyStatus === 2
			).length;

			// 이미 수락된 회원이 있는 경우
			if (alreadyAccepted > 0) {
				alert(
					"이미 수락된 회원이 있습니다. 추가로 수락할 수 없습니다."
				);
				return;
			}

			// 새로 선택된 회원이 2명 이상인 경우
			if (alreadyAccepted + selectedBuddyMatches.length > 1) {
				alert("수락 회원은 1명만 선택할 수 있습니다.");
				return;
			}
		}

		try {
			for (const buddyMatchCode of selectedBuddyMatches) {
				const response = await fetch(`/mypage/mybuddy/${buddyCode}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						buddyMatchCode,
						applyStatus,
					}),
				});

				if (!response.ok) {
					throw new Error(
						`Failed to update buddyMatchCode ${buddyMatchCode}: ${response.statusText}`
					);
				}
			}

			alert(applyStatus === 2 ? "수락되었습니다." : "거절되었습니다.");

			// 상태 업데이트
			setBuddyMatch((prev) =>
				prev.map((match) =>
					selectedBuddyMatches.includes(match.buddyMatchCode)
						? { ...match, applyStatus }
						: match
				)
			);
			setSelectedBuddyMatches([]); // 선택 초기화
		} catch (error) {
			console.error("Error updating status:", error);
			alert("상태 업데이트 중 오류가 발생했습니다.");
		}
	};

	return (
		<div className="page-container">
			<h2 className="buddy-title">MY게시글</h2>
			<table className="main-table">
				<thead>
					<tr>
						<td>제목</td>
						<td>
							<div className="buddyDetail-title">
								<p>
									{buddyDetail.buddyTitle &&
									buddyDetail.buddyTitle.length > 20
										? `${buddyDetail.buddyTitle.slice(
												0,
												20
										  )}...`
										: buddyDetail.buddyTitle}
								</p>
							</div>
						</td>
						<td>버디 유형</td>
						<td>
							<div className="buddy-typeName">
								<p>{buddyTypeName || "버디 유형 없음"}</p>
							</div>
						</td>
						<td>지역</td>
						<td>
							<div className="buddy-regionName">
								<p>{regionName}</p>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>

							{/* 왼쪽 콘텐츠 */}
                            <td class="left-cell" colspan="3">
								<div className="buddy-img">
									{buddyDetail.buddyImg &&
									buddyDetail.buddyImg.length > 0 ? (
										buddyDetail.buddyImg.map(
											(img, index) => (
												<img
													key={index}
													src={img}
													alt={`Buddy Image ${
														index + 1
													}`}
												/>
											)
										)
									) : (
										null // 빈칸으로 설정
									)}
								</div>
								<div className="buddy-contents">
									<p>{buddyDetail.buddyContents}</p>
								</div>
							</td>
                            {/* 오른쪽 콘텐츠 */}
                            <td class="right-cell" colspan="3">
								<h2>신청 회원 리스트</h2>
								<table className="application-table">
									<thead>
										<tr>
											<th>
												<input
													type="checkbox"
													checked={isAllSelected}
													onChange={handleSelectAll}
												/>
											</th>
											<th>번호</th>
											<th>회원 ID</th>
											<th>상태</th>
										</tr>
									</thead>
									<tbody>
										{buddyMatch.length > 0 ? (
											buddyMatch.map((match, index) => (
												<tr key={match.buddyMatchCode}>
													<td>
														<input
															type="checkbox"
															checked={selectedBuddyMatches.includes(
																match.buddyMatchCode
															)}
															onChange={() =>
																handleCheckboxChange(
																	match.buddyMatchCode
																)
															}
														/>
													</td>
													<td>{index + 1}</td>
													<td>
                                                        {match.applyId.length > 8
                                                            ? `${match.applyId.slice(0, 8)}...`
                                                            : match.applyId}
                                                    </td>
													<td>
														{match.applyStatus === 1
															? "대기중"
															: match.applyStatus ===
															  2
															? "수락"
															: "거절"}
													</td>
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan="4"
													style={{
														textAlign: "center",
													}}
												>
													신청 회원이 없습니다.
												</td>
											</tr>
										)}
									</tbody>
								</table>
								<div className="button-group">
									<button onClick={() => updateStatus(2)}>
										수락
									</button>
									<button onClick={() => updateStatus(3)}>
										거절
									</button>
								</div>
							</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default MyBuddyDetail;
