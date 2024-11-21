import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callUseinfoDetailForAdminAPI
} from '../../../apis/UseinfoAPICalls';
import { updateUseinfoAPI } from '../../../apis/UseinfoAPICalls';
import { deleteUseinfoAPI } from '../../../apis/UseinfoAPICalls';

function UseinfoDetail () {

    const [useinfoContents, setUseinfoContents] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {useinfoCode} = params;
    const useinfoData = useSelector((state) => state.useinfoReducer) || {};
    const useinfo = useinfoData.data;

    useEffect (
        () => {
            dispatch(callUseinfoDetailForAdminAPI(useinfoCode))
        } , []
    );

    useEffect(() => {
        if (useinfo) {
            setUseinfoContents(useinfo.useinfoContents || ""); // API 데이터 로드 후 상태 초기화
        }
    }, [useinfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setUseinfoContents((state) => (value));
    }

    const onClickChangeHandlerUpdate = () => {
        const updateData = { useinfoContents };
        dispatch(updateUseinfoAPI(useinfoCode, updateData));
        alert('내용을 수정하였습니다.');
        navigate(`/Useinfos`);
    };

    const onClickChangeHandlerDelete = () => {
        dispatch(deleteUseinfoAPI(useinfoCode));
        alert('사용설명서를 삭제하였습니다.');
        navigate(`/Useinfos`);
    };

    return (
        <div>
        <table>
            <thead>
                <tr>
                <th>사용설명서</th>
                </tr>
            </thead>
            <tbody>
                {useinfo ? (
                    <>
                <tr>
                <td>제목</td>
                <td>{useinfo.useinfoTitle}</td>
                <td>게시글번호</td>
                <td>{useinfo.useinfoCode}</td>
                </tr>123

                <tr>
                    <td>내용</td>
                <td colSpan={5}>
                <input
                    type="text"
                    style={{width: '500px', height: '100px'}}
                    onChange={handleInputChange}
                    name='useinfoContents'
                    value={ useinfoContents || useinfo.useinfoContents } />
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
    );
}

export default UseinfoDetail;