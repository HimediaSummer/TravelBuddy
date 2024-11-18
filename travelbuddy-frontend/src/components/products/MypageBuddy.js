import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBuddy } from "../../modules/MypageBuddyModule.js"

function MypageBuddy() {

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
                setBuddy(data.data); 
                console.log('setBuddy 발동', data);
                console.log('buddy 잘 뜨나',buddy);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, [dispatch]);

    if (buddy.length === 0) {
        return <p>게시글을 작성 해 주세요</p>;
    }

    return (
        <div>
            <ul>
                <li key={buddy}>
                    <h3>{buddy.buddyTitle}</h3>  {/* buddyTitle 출력 */}
                    <p>{buddy.buddyContents}</p> {/* buddyContents 출력 */}
                    <p>{buddy.buddyCreate}</p>  {/* buddyCount 출력 */}
                </li>
            </ul>
        </div>
    );
}

export default MypageBuddy;

