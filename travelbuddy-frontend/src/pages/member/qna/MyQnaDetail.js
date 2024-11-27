import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callQnaDetailAPI } from "../../../apis/QnaAPICalls";
import { deleteQnaAPI } from "../../../apis/QnaAPICalls";

function MyQnaDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { qnaCode } = params;
    const qnaData = useSelector((state) => state.qnaReducer);
    const fqType = useSelector((state) => state.fqTypeReducer) || {};
    const { data } = qnaData;
    const { qnaDTO, qnaAnswerDTO } = data || {};
    const fqTypeList = fqType.data || {};
    console.log("data 가 가지고있는것", data);

    useEffect(() => {
        dispatch(callQnaDetailAPI(qnaCode));
    }, []);

    const onClickQnaDelete = () => {
        if(qnaAnswerDTO.ansContents !== null && qnaAnswerDTO.ansContents !== "") {
            alert('답변이 존재하여 삭제가 불가능합니다.');
            return null;
        }
        dispatch(deleteQnaAPI(qnaCode));
        alert("문의가 삭제되었습니다.");
        navigate(`/cs/MyQnas`);
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
                                <td>{fqTypeList.find(f => f.fqTypeCode === qnaDTO.fqTypeCode)?.fqTypeName || "알수없음"}</td>
                                <td>
                                    <button onClick={onClickQnaDelete}>
                                        삭제
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td>문의 내용</td>
                                <td colSpan={5}>
                                    <input
                                        type="text"
                                        style={{
                                            width: "500px",
                                            height: "100px",
                                        }}
                                        readOnly
                                        value={qnaDTO.qnaContents}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>답변</td>
                                <td><input
                    type="text"
                    name='ansContents'
                    style={{width: '500px', height: '100px'}}
                    readOnly
                    value={qnaAnswerDTO.ansContents}/></td>
                            </tr>
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
