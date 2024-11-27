import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callFaqDetailForAdminAPI } from '../../../apis/FaqAPICalls';
import { updateFaqAPI } from '../../../apis/FaqAPICalls';
import { deleteFaqAPI } from '../../../apis/FaqAPICalls';

function FaqDetail() {

    const [faqContents, setFaqContents] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {faqCode} = params;
    const faqData = useSelector((state) => state.faqReducer) || {};
    const faq = faqData.data;

    useEffect (
        () => {
            dispatch(callFaqDetailForAdminAPI(faqCode))
        } , []
    );

    useEffect(() => {
        if (faq) {
            setFaqContents(faq.faqContents || ""); // API 데이터 로드 후 상태 초기화
        }
    }, [faq]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setFaqContents((state) => (value));
    }

    const onClickChangeHandlerUpdate = () => {
        const updateData = { faqContents };
        dispatch(updateFaqAPI(faqCode, updateData));
        alert('FAQ 수정되었습니다.');
        navigate(`/admin/faqs`);
    };

    const onClickChangeHandlerDelete = () => {
        dispatch(deleteFaqAPI(faqCode));
        alert('FAQ 삭제되었습니다.');
        navigate(`/admin/faqs`);
    };

    return (
        <div>
        <table>
            <thead>
                <tr>
                <th>FAQ</th>
                </tr>
            </thead>
            <tbody>
                {faq ? (
                    <>
                <tr>
                <td>제목</td>
                <td>{faq.faqTitle}</td>
                <td>유형</td>
                <td>{faq.fqTypeCode}</td>
                </tr>

                <tr>
                    <td>FAQ 내용</td>
                <td colSpan={5}>
                <input
                    type="text"
                    style={{width: '500px', height: '100px'}}
                    onChange={handleInputChange}
                    name='faqContents'
                    value={ faqContents || faq.faqContents } />
                    </td>
                </tr>
                
                <tr>
                    <td></td>
                    <td></td>
                    <td><button onClick={onClickChangeHandlerUpdate}>수정</button></td>
                    <td><button onClick={onClickChangeHandlerDelete}>삭제</button></td>
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

export default FaqDetail;