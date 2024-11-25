import MyFaqsCSS from './MyFaqsCSS.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callFaqListAPI } from '../../../apis/FaqAPICalls';


function MyFaqs() {
    const dispatch = useDispatch();
    const faq = useSelector((state) => state.faqReducer) || {};
    const { data } = faq;
    
    console.log('FAQ 데이터:', data);

    const [openIndex, setOpenIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // 필터링된 데이터를 계산
    const filteredData = Array.isArray(data)
        ? selectedCategory 
            ? data.filter(d => d.fqTypeCode === selectedCategory && d.faqAt ==='N')
            : data.filter(d => d.faqAt === 'N')
        : [];

         // 카테고리 선택 핸들러
    const handleCategorySelect = (category) => {
        console.log('선택된 카테고리:', category);
        setSelectedCategory(category);
    };

    console.log('필터링된 데이터:', filteredData);


    useEffect(
        () => {
            dispatch(callFaqListAPI());
            if (data == undefined) {
                return <>
                <h2>로딩중</h2>
                </>
            }
        }, []
    );

    const toggleAnswer = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
         {/* 카테고리 필터 버튼 추가 */}
         <div className={MyFaqsCSS.categoryButtons}>
                <button 
                    onClick={() => handleCategorySelect(null)}
                    className={selectedCategory === null ? MyFaqsCSS.activeCategory : ''}
                >
                    전체보기
                </button>
                <button 
                    onClick={() => handleCategorySelect(1)}
                    className={selectedCategory === 1 ? MyFaqsCSS.activeCategory : ''}
                >
                    일정
                </button>
                <button 
                    onClick={() => handleCategorySelect(2)}
                    className={selectedCategory === 2 ? MyFaqsCSS.activeCategory : ''}
                >
                    숙소
                </button>
                <button 
                    onClick={() => handleCategorySelect(3)}
                    className={selectedCategory === 3 ? MyFaqsCSS.activeCategory : ''}
                >
                    지역
                </button>
                <button 
                    onClick={() => handleCategorySelect(4)}
                    className={selectedCategory === 4 ? MyFaqsCSS.activeCategory : ''}
                >
                    보안
                </button>
                {/* 필요한 만큼 카테고리 버튼 추가 */}
            </div>
        <div className="faq-container">
        {Array.isArray(filteredData) &&
        filteredData.map((f, index) => (
            <div key={index} className="faq-item">
            <button
                className={`faq-question ${openIndex === index ? "active" : ""}`}
                onClick={() => toggleAnswer(index)}
            >
                Q. {f.faqTitle}
            </button>
            {openIndex === index && (
                <div className="faq-answer">
                A. {f.faqContents}
                </div>
            )}
            </div>
        ))}
    </div>
    </>);
}

export default MyFaqs;