import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { callBuddyRegistAPI } from "../../../apis/BuddyAPICalls";

function BuddyRegist() {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const naviget = useNavigate();

    const [form, setForm] = useState({
        buddyTitle: "",
        buddyContent: "",
        buddyTypeName: "",
        buddyImage: "",
        RegionName: "", 
    });

    useEffect(() => {
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
        imageInput.current.click();
    };

    const onChangeHandler = (e) => {
        setForm({
           ...form,
            [e.target.name]: e.target.value,
        });
    };
};