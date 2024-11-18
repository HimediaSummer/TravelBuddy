import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callBuddyDetailAPI } from '../../apis/BuddyAPICalls';

function BuddyDetail () {

    const dispatch = useDispatch();
    const params = useParams();
    const buddyData = useSelector((state) => state.qnaReducer);
    const {data} = buddyData;
	const{buddyDTO} = data || {};
	const currentUser = useSelector((state) => state.memberReducer.currentUser);
    // const {qnaDTO, qnaAnswerDTO} = data || {};
    console.log('data 가 가지고있는것',data);

 
    useEffect (
        () => {
            dispatch(callBuddyDetailAPI(params))
        } , []
    );

    // useEffect (
    //     () => {
    //         if (qna) {
    //             setQnaContents();
    //         }
    //     }, [qna]
    // );


    return (
        <div>
        <table>
            <thead>
                <tr>
                <th>버디매칭</th>
                </tr>
            </thead>
            <tbody>
                {buddyDTO ? (
                    <>
                <tr>
                <td>제목</td>
                <td>{buddyDTO.buddyTitle}</td>
                <td>유형</td>
                <td>{buddyDTO.buddyTypeCode}</td>
                <td><button>삭제</button></td>
                </tr>

                <tr>
                <td colSpan={4}>{buddyDTO.buddyContents}</td>
                </tr>

                {/* <tr>
                <td>답변 작성</td>
                <td>{qnaAnswerDTO.ansContents}</td>
                </tr> */}

                <tr>
                </tr>
                <tr>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    {/* <td><button>답변 등록</button></td> */}
					{currentUser && currentUser.memberCode === buddyDTO.memberCode && (//작성자동일시 버튼활성화
					<>
                    <td><button>답변 수정</button></td>
                    <td><button>답변 삭제</button></td>
					</>
					)}
                </tr>
                </>
                ) : (
                    <tr>
                            <td colSpan="2">로딩 중...</td> {/* 데이터가 없을 때 로딩 메시지 */}
                        </tr>
                )}
            </tbody>
        </table>
        </div>
    ) 
}

export default BuddyDetail