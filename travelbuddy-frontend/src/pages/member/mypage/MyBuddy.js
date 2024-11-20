import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBuddy } from "../../../modules/mypage/MyBuddyModule.js"

function MyBuddy() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [buddy, setBuddy] = useState("");
    useEffect(
        () => {
            fetch('/mypage/mybuddy')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setBuddy(data.data || []); 
                console.log('setBuddy 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, []);

    useEffect(() => {
        console.log('Buddy State:', buddy);
    }, [buddy]);

    if (buddy.length === 0) {
        return <p>게시글을 작성 해 주세요</p>;
    }

    return (
        <div>
            <table>
                    <thead>
                        <th>
                            <input type="checkbox" id="selectAll" onclick="selectAllRows(this)" />
                        </th>
                        <th>버디</th>
                        <th>지역</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </thead>
                    <tbody>
                        {buddy.map((item, index) => (
                            <tr 
                                key={index} 
                                onClick={() => navigate(`/mypage/mybuddy/${item.buddyCode}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    <input type="checkbox" id={`select-${index}`} onClick={() => {}} />
                                </td>
                                <td>{item.buddyTypeName}</td>
                                <td>{item.regionName}</td>
                                <td>{item.buddyTitle}</td>
                                <td>{item.buddyCreate}</td>
                                <td>{item.buddyStatus}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
}

export default MyBuddy;

