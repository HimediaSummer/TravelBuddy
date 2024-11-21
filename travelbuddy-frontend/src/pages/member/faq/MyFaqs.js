import MyFaqsCSS from './MyFaqsCSS.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callFaqListAPI } from '../../../apis/FaqAPICalls';


function MyFaqs() {
    const dispatch = useDispatch();
    const faq = useSelector((state) => state.faqReducer) || {};
    const { data } = faq;
    
    const [openIndex, setOpenIndex] = useState(null);


    useEffect(
        () => {
            dispatch(callFaqListAPI());
        }, [dispatch]
    );

    const toggleAnswer = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="faq-container">
        {Array.isArray(data) &&
        data.map((f, index) => (
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
        // <>
        // <div className="faq-container">
        // {Array.isArray(data) &&
        // data.map((f, index) => {
        // return (  
        // <div>
        // <ul className="faq-list-Q">
        // <li>{f.faqTitle}</li>
        // </ul>
        // <ul className="faq-list-A">
        // <li>{f.faqContents}</li>
        // </ul>
        // </div>
        // );
        // })}
        // </div>
        // </>
    );
}

export default MyFaqs;