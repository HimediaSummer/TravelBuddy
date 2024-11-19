import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callQnaDetailAPI } from "../../../apis/QnaAPICalls";
import { deleteQnaAPI } from "../../../apis/QnaAPICalls";

function MyQnaDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {qnaCode} = params;
    const qnaData = useSelector((state) => state.qnaReducer);
    const { data } = qnaData;
    const { qnaDTO, qnaAnswerDTO } = data || {};
    console.log("data 가 가지고있는것", data);

    useEffect(() => {
        dispatch(callQnaDetailAPI(qnaCode));
    }, []);

    const onClickQnaDelete = () => {
        dispatch(deleteQnaAPI(qnaCode));
        alert("문의가 삭제되었습니다.");
        navigate(`/MyQnas`);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>문의(Q&A)</th>
                    </tr>
                </thead>
                <tbody>
                    {qnaDTO ? (
                        <>
                            <tr>
                                <td>제목</td>
                                <td>{qnaDTO.qnaTitle}</td>
                                <td>문의유형</td>
                                <td>{qnaDTO.fqTypeCode}</td>
                                <td>
                                    <button onClick={onClickQnaDelete}>
                                        삭제
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={4}>{qnaDTO.qnaContents}</td>
                            </tr>

                            <tr>
                                <td>답변</td>
                                <td>{qnaAnswerDTO.ansContents}</td>
                            </tr>

                            <tr></tr>
                            <tr></tr>
                        </>
                    ) : (
                        <tr>
                            <td colSpan="2">로딩 중...</td>{" "}
                            {/* 데이터가 없을 때 로딩 메시지 */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MyQnaDetail;
