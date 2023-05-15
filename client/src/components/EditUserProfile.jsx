import { update } from "@/http/userAPI";
import { apiUrl } from "@/vars";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const EditUserProfile = ({ userInf }) => {
    const [phoneCount, setPhoneCount] = useState([
        { id: 1 },
    ]);
    const [usingName, setUsingName] = useState("lfp");

    const addPhone = (e) => {
        e.preventDefault()
        console.log(phoneCount)
        let newPhoneCount = phoneCount;
        newPhoneCount = [...phoneCount, { id: phoneCount.length + 1 }]
        setPhoneCount(newPhoneCount)
    }

    useEffect(() => {
        if (phoneCount.length === 5) {
            let newPhoneCount = phoneCount;
            newPhoneCount.pop()
            setPhoneCount(newPhoneCount)
        }
    }, [phoneCount])

    useEffect(() => {
        if (userInf.lfpOrNick) {
            setUsingName(userInf.lfpOrNick)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formDat = new FormData(e.target)
        formDat.append("img", imageUpload.current.files[0])
        formDat.append("lfpOrNick", usingName)
        formDat.delete("dataDisplay")
        formDat.append("id", 1)
        for (var pair of formDat.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        axios({
            method: "post",
            url: "http://localhost:3005/api/user/update",
            data: formDat,
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }).then(() => { })
    }

    const imageUpload = useRef()
    const form = useRef()
    const useLfp = useRef()
    const useNick = useRef()

    return (
        <form className="editUserProfile" ref={form} onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="addImage">
                        <input ref={imageUpload} type="file" size={"md"} id="addImage" className="newAdForm__addImageForNewAd" />
                        <div className="editUserProfile__newAdForm__addImageForNewAdWrapper newAdForm__addImageForNewAdWrapper">
                            <div className="editUserProfile__newAdForm__addImageForNewAdWrapper newAdForm__addImageForNewAdWrapper-content">
                                <img src={userInf?.logo != "defaultUserLogo.png" ? apiUrl + userInf.logo : "/addPhoto.svg"} alt="" />
                                <p>Фото профиля</p>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div className="editUserProfile__inputs">
                <div className="editUserProfile__phones">
                    <label htmlFor="" className="editUserProfile__label">Мои телефоны</label>
                    {phoneCount.map((el, i) => {
                        return <input
                            key={el.id}
                            type="text"
                            name={`phone${i + 1}`}
                            placeholder="Номер телефона"
                            defaultValue={userInf?.phone}
                            className="editUserProfile__input editUserProfile__input-phone"
                        />
                    })}
                    <button
                        className="editUserProfile__btn"
                        onClick={addPhone}
                    >
                        + номер
                    </button>
                </div>
                <div className="editUserProfile__personalData">
                    <label htmlFor="" className="editUserProfile__label">Личные данные</label>
                    <input type="text" name="nick" placeholder="Ник" defaultValue={userInf?.nick} className="editUserProfile__input" />
                    <input type="text" name="lfp" placeholder="ФИО" className="editUserProfile__input" defaultValue={userInf?.lfp} />
                    <div className="editUserProfile__radioWrapper">
                        <div className="editUserProfile__radioWrapper-itemWrapper">
                            <input defaultChecked={usingName == "lfp" ? "checked" : ""} id="lfp" type="radio" name="dataDisplay" className="editUserProfile__input" ref={useLfp} onChange={(e) => { setUsingName(e.target.id) }} />
                            <label htmlFor="lfp" className="editUserProfile__label">Отображать ФИО в профиле</label>
                        </div>
                        <div className="editUserProfile__radioWrapper-itemWrapper">
                            <input defaultChecked={usingName == "nick" ? "checked" : ""} id="nick" type="radio" name="dataDisplay" className="editUserProfile__input" ref={useNick} onChange={(e) => { setUsingName(e.target.id) }} />
                            <label htmlFor="nick" className="editUserProfile__label">Отображать только ник</label>
                        </div>
                    </div>
                    <textarea placeholder="О себе" name="about" cols="10" rows="5" defaultValue={userInf?.about} className="editUserProfile__input" />
                </div>
                <button className="editUserProfile__btn-secondary" type="submit">Сохранить изменения</button>
            </div>
        </form>
    );
};

export default EditUserProfile;