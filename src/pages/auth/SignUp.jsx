import React, {useState} from 'react';
import '../../styles/Auth.css'
import Divider from "@mui/material/Divider";
import {Button, FormControl, InputLabel, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import PopupLoading from "../../components/PopupLoading";
import axios from "axios";
import authHeader, {URL_getAccess} from "../../util/api";

function SignUp() {

    let navigate = useNavigate();

    function goBack() {
        let path = "/login"
        navigate(path);
    }

    const [lastName, setLastName] = useState("")

    function handleLastName(event) {
        setLastName(event.target.value)
    }

    const [firstName, setFirstName] = useState("")

    function handleFirstName(event) {
        setFirstName(event.target.value)
    }

    const [patronymic, setPatronymic] = useState("")

    function handlePatronymic(event) {
        setPatronymic(event.target.value)
    }

    const [email, setEmail] = useState("")

    function handleEmail(event) {
        setEmail(event.target.value)
    }

    const [department, setDepartment] = useState("")

    function handleDepartment(event) {
        setDepartment(event.target.value)
    }

    const [highSchool, setHighSchool] = useState("")

    function handleHighSchool(event) {
        setHighSchool(event.target.value)
    }

    const [correctLastName, setCorrectLastName] = useState(true)
    const [correctFirstName, setCorrectFirstName] = useState(true)
    const [correctPatronymic, setCorrectPatronymic] = useState(true)
    const [correctEmail, setCorrectEmail] = useState(true)
    const [correctDepartment, setCorrectDepartment] = useState(true)
    const [correctHighSchool, setCorrectHighSchool] = useState(true)

    const [loading, setLoading] = useState(false)

    async function getAccess() {
        setLoading(true)
        if (
            lastName.length === 0 ||
            firstName.length === 0 ||
            patronymic.length === 0 ||
            email.length === 0 ||
            department.length === 0 ||
            highSchool.length === 0
        ) {
            if (lastName.length === 0) setCorrectLastName(false)
            if (firstName.length === 0) setCorrectFirstName(false)
            if (patronymic.length === 0) setCorrectPatronymic(false)
            if (email.length === 0) setCorrectEmail(false)
            if (department.length === 0) setCorrectDepartment(false)
            if (highSchool.length === 0) setCorrectHighSchool(false)
        } else {
            const data = {
                lastName: lastName,
                firstName: firstName,
                patronymic: patronymic,
                email: email,
                department: department,
                highSchool: highSchool
            }
            await axios.post(URL_getAccess, data)
            goBack()
        }
        setLoading(false)
    }

    return (
        <div className="page">
            <div className="signup background__auth">
                <p className="auth__header">Poly Sender</p>
                <Divider/>
                <p className="label__block">Личные данные</p>
                <div className="signup__textfield">
                    <TextField
                        focused={!correctLastName}
                        color={!correctLastName ? "error" : null}
                        onChange={handleLastName}
                        sx={{width: "190px"}}
                        label="Введите Фамилию"
                    />
                    <TextField
                        focused={!correctFirstName}
                        color={!correctFirstName ? "error" : null}
                        onChange={handleFirstName}
                        sx={{width: "190px", marginLeft: " 10px"}}
                        label="Введите Имя"
                    />
                    <TextField
                        focused={!correctPatronymic}
                        color={!correctPatronymic ? "error" : null}
                        onChange={handlePatronymic}
                        sx={{width: "190px", marginLeft: " 10px"}}
                        label="Введите Отчество"
                    />
                </div>
                <Divider/>
                <p className="label__block">Корпоративная почта</p>
                <div className="signup__textfield">
                    <TextField
                        focused={!correctEmail}
                        color={!correctEmail ? "error" : null}
                        onChange={handleEmail}
                        sx={{width: "390px"}}
                        label="Введите почту"
                    />
                </div>
                <Divider/>
                <p className="label__block">Направление</p>
                <div className="signup__textfield">
                    <FormControl sx={{width: "290px"}} focused={!correctDepartment}>
                        <InputLabel color={!correctDepartment ? "error" : null}>Выберите институт</InputLabel>
                        <Select
                            value={department}
                            color={!correctDepartment ? "error" : null}
                            label="Выберите институт"
                            onChange={handleDepartment}
                        >
                            <MenuItem value="ИКНТ">ИКНТ</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: "290px", marginLeft: "20px"}} focused={!correctHighSchool}>
                        <InputLabel color={!correctHighSchool ? "error" : null}>Выберите высшую школу</InputLabel>
                        <Select
                            value={highSchool}
                            color={!correctHighSchool ? "error" : null}
                            label="Выберите высшую школу"
                            onChange={handleHighSchool}
                        >
                            <MenuItem value="ВШИСиСТ">ВШИСиСТ</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Divider/>
                <div className="access__button">
                    <Button
                        sx={{
                            width: "100%",
                            background: "#366ac3",
                            color: "white",
                            borderRadius: "5px",
                            ":hover": {
                                color: "#ffffff",
                                backgroundColor: "#739ee8"
                            }
                        }}
                        onClick={() => getAccess()}
                    >
                        Запросить доступ
                    </Button>
                </div>
            </div>
            <PopupLoading active={loading}/>
        </div>
    );
}

export default SignUp;