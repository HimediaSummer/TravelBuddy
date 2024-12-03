import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callGetMemberAPI } from '../../../apis/MemberAPICalls';

import {
	callbuddyDetailForAccountAPI,
    // callBuddyDetailAPI,
	callBuddyUpdateAPI
} from "../../../apis/BuddyAPICalls";

function BuddyUpdate() {
	const dispatch = useDispatch();
	const params = useParams();
    const buddyCode = params.buddyCode;    


	const buddyDetail = useSelector((state) => state.buddiesReducer || {});


	const member = useSelector(state => state.memberReducer);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));


	useEffect(() => {
        if(token) {
            dispatch(callGetMemberAPI({ 
                memberName: token.sub 
            }));
        }
    }, []);

	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [modifyMode, setModifyMode] = useState(false);
	const imageInput = useRef();
	const navigate = useNavigate();


	const [form, setForm] = useState({});


    // const buddyCode = props.buddyCode || state.buddyCode;


	
	useEffect(() => {
		
		dispatch(
			callbuddyDetailForAccountAPI({
				buddyCode: params.buddyCode
			})
		);
	}, []);

	// const testDataList = buddyDetail;



	
	// useEffect(() => {
	// 	console.log(" if 문 들어가기전 :- -----------------------", buddyDetail.region, buddyDetail.buddyType);
	// 	if (buddyDetail ) {
	// 		console.log("if문 들어간 후 가져온데이터 :- -----------------------", buddyDetail.region, buddyDetail.buddyType);
	// 		setForm({
	// 			memberCode: member?.data?.memberCode || '',		
	// 			buddyCode: buddyDetail?.buddyCode  || '',
	// 			buddyTitle: buddyDetail?.buddyTitle || '',
	// 			buddyContents: buddyDetail?.buddyContents || '',
	// 			buddyStatus: buddyDetail?.buddyStatus || '',
	// 			regionCode: buddyDetail?.region?.regionCode || '',
	// 			buddyTypeCode: buddyDetail?.buddyType?.buddyTypeCode || '',
	// 			buddyCreate: buddyDetail?.buddyCreate || '',
	// 			buddyAt: buddyDetail?.buddyAt || '' 
	// 		});

	// 		console.log("초기폼데이터 :- -----------------------", form.regionCode, form.buddyTypeCode);
	// 	}
	// }, [buddyDetail]);
	// console.log("set from = ", form);


	useEffect(() => {
		/* 이미지 업로드시 미리보기 세팅 */
		if (image) {
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				const { result } = e.target;
				if (result) {
					setImageUrl(result);
				}
			};
			fileReader.readAsDataURL(image);
		}
	}, [image]);

	const onChangeImageUpload = (e) => {

		const image = e.target.files[0];

		setImage(image);
	};

	const onClickImageUpload = () => {
		if (modifyMode) {
			imageInput.current.click();
		}
	};

	const onClickModifyModeHandler = () => {
		// 수정모드
		if(buddyDetail) {
		setModifyMode(true);

		setForm({
				memberCode: member?.data?.memberCode,
				buddyCode: buddyDetail?.buddyCode ,
				buddyTitle: buddyDetail?.buddyTitle ,
				buddyContents: buddyDetail?.buddyContents ,
				buddyStatus: buddyDetail?.buddyStatus ,
				regionCode: buddyDetail?.region?.regionCode ,
				buddyTypeCode: buddyDetail?.buddyType?.buddyTypeCode ,
				buddyCreate: buddyDetail?.buddyCreate,
				buddyAt: buddyDetail?.buddyAt 
		})};

	};

	/* form 데이터 세팅 */
	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};



	useEffect(() => {

	}, [form]);

	const onClickBuddyUpdateHandler = () => {


		const formData = new FormData();
		formData.append("memberCode", member.data.memberCode);
		formData.append('buddyCode', form.buddyCode);
		formData.append('buddyTitle', form.buddyTitle);
		formData.append('buddyContents', form.buddyContents);
		formData.append('buddyStatus', form.buddyStatus);
		formData.append('regionCode', form.regionCode);
		formData.append('buddyTypeCode', form.buddyTypeCode);
		formData.append("buddyCreate", form.buddyCreate);
		formData.append('buddyAt', form.buddyAt);

		if (image) {
			formData.append('buddyImage', image);
		}


		dispatch(
			callBuddyUpdateAPI(
				// 상품 정보 업데이트
				// form: formData
				formData
			)
		);

		alert('상품을 수정했습니다.');
		navigate('/buddies', { replace: true});
        window.location.reload();
	};



	return (
		<div>
			<div >
				<button onClick={() => navigate(-1)}>돌아가기</button>
				{!modifyMode && (
					<button onClick={onClickModifyModeHandler}>수정모드</button>
				)}
				{modifyMode && (
					<button onClick={onClickBuddyUpdateHandler}>
						상품 수정 저장하기
					</button>
				)}
			</div>
			{buddyDetail && (
				<div >
					<div >
						<div >
							{buddyDetail && (
								<img
									src={
										imageUrl == null
											? buddyDetail.buddyImageUrl
											: imageUrl
									}
									alt="preview"
								/>
							)}
							<input
								style={{ display: 'none' }}
								type="file"
								name="buddyImage"
								accept="image/jpg,image/png,image/jpeg,image/gif"
								onChange={onChangeImageUpload}
								ref={imageInput}
							/>
							<button
								onClick={onClickImageUpload}
								style={
									!modifyMode
										? { backgroundColor: 'gray' }
										: null
								}
							>
								이미지 업로드
							</button>
						</div>
					</div>
					<div >
						<table>
							<tbody>
								<tr>
									<td>
										<label>제목</label>
									</td>
									<td>
										<input
											name="buddyTitle"
											placeholder="제목"
											value={
												(!modifyMode
													? buddyDetail.buddyTitle
													: form.buddyTitle) || ''
											}
											onChange={onChangeHandler}
											readOnly={modifyMode ? false : true}
											style={
												!modifyMode
													? {
															backgroundColor:
																'gray'
													  }
													: null
											}
										/>
									</td>
								</tr>
                                <tr>
									<td>
										<label>내용</label>
									</td>
									<td>
										<textarea
											name="buddyContents"
											onChange={onChangeHandler}
											readOnly={modifyMode ? false : true}
											value={
												(!modifyMode
													? buddyDetail.buddyContents
													: form.buddyContents) ||
												''
											}
											style={
												!modifyMode
													? {
															backgroundColor:
																'gray'
													  }
													: null
											}
										></textarea>
									</td>
								</tr>
								<tr>
									<td>
										<label>매칭 활성화 여부</label>
									</td>
									<td>
										<label>
											<input
												type="radio"
												name="buddyStatus"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.buddyStatus
														: form.buddyStatus) ===
													'Y'
														? true
														: false
												}
												value="Y"
											/>{' '}
											Y
										</label>{' '}
										&nbsp;
										<label>
											<input
												type="radio"
												name="buddyStatus"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.buddyStatus
														: form.buddyStatus) ===
													'N'
														? true
														: false
												}
												value="N"
											/>{' '}
											N
										</label>
									</td>
								</tr>
								<tr>
									<td>
										<label>지역</label>
									</td>
									<td>
										<label>
											<input
												type="radio"
												name="regionCode"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.region.regionCode
														: form.regionCode) ==
													'101'
														? true
														: false
												}
												value={101}
											/>{' '}
											서울
										</label>{' '}
										&nbsp;
										<label>
											<input
												type="radio"
												name="regionCode"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.region.regionCode
														: form.regionCode) ==
													'102'
														? true
														: false
												}
												value={102}
											/>{' '}
											경기도
										</label>{' '}
										&nbsp;
										<label>
											<input
												type="radio"
												name="regionCode"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.region.regionCode
														: form.regionCode) ==
													'103'
														? true
														: false
												}
												value={103}
											/>{' '}
											인천
										</label>
									</td>
								</tr>
                                <tr>
									<td>
										<label>버디타입</label>
									</td>
									<td>
										{/* buddyTypeCode = 1:버디, 2:여행객 */}
										<label>
											<input
												type="radio"
												name="buddyTypeCode"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.buddyType.buddyTypeCode
														: form.buddyTypeCode) ==
													'1'
														? true
														: false
												}
												value={1}
											/>{' '}
											버디
										</label>{' '}
										&nbsp;
										<label>
											<input
												type="radio"
												name="buddyTypeCode"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.buddyType.buddyTypeCode
														: form.buddyTypeCode) ==
													'2'
														? true
														: false
												}
												value={2}
											/>{' '}
											여행객
										</label>{' '}
									</td>
								</tr>
                                <tr>
									<td>
										<label>게시글 활성화 여부</label>
									</td>
									<td>
										<label>
											<input
												type="radio"
												name="buddyAt"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.buddyAt
														: form.buddyAt) ===
													'Y'
														? true
														: false
												}
												value="Y"
											/>{' '}
											Y
										</label>{' '}
										&nbsp;
										<label>
											<input
												type="radio"
												name="buddyAt"
												onChange={onChangeHandler}
												readOnly={
													modifyMode ? false : true
												}
												checked={
													(!modifyMode
														? buddyDetail.buddyAt
														: form.buddyAt) ===
													'N'
														? true
														: false
												}
												value="N"
											/>{' '}
											N
										</label>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}

export default BuddyUpdate;