import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../../Api/base_url';
import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"
import { SelectBox } from "../../Components/CustomSelect";

const Register = () => {
    const [accountType, setAccountType] = useState("1");
    const navigate = useNavigate()
    const ACCOUNT_TYPE_OPTIONS = [
 
        { id: "2", name: "Moderater" },
        { id: "3", name: "Member" }
    ];
    const [formData, setFormData] = useState();





    useEffect(() => {
        document.title = 'Trello | Register';
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();


        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }
        if (accountType === "1") {
            formDataMethod.append('role', "admin");
        }
        else if (accountType === "2") {
            formDataMethod.append('role', "moderator");
        }

        else if (accountType === "3") {
            formDataMethod.append('role', "member");
        }



        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");

        const apiUrl = `${base_url}/api/auth/register`;

        const LogoutData = localStorage.getItem('login');
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${LogoutData}`,
                },
                body: formDataMethod,

            }
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log("signup", responseData)
                localStorage.setItem('login', responseData.token);
                console.log('Login Response:', responseData);
                document.querySelector('.loaderBox').classList.add("d-none");
                navigate('/dashboard')

            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                alert('Invalid Credentials')

                console.error('Login failed');
            }
        } catch (error) {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
        }
    };


    console.log("accountType", accountType)

    return (
        <>
            <AuthLayout authTitle='Login' authPara='Login into your Account'>
                <form onSubmit={handleSubmit}>

                    <CustomInput
                        label='First Name  '
                        required
                        id='userEmail'
                        type='text'
                        placeholder='Enter Your First Name'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, username: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <CustomInput
                        label='Email Address'
                        required
                        id='userEmail'
                        type='email'
                        placeholder='Enter Your Email Address'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, email: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <CustomInput
                        label='Password'
                        required
                        id='pass'
                        type='password'
                        placeholder='Enter Password'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <CustomInput

                        type="password"
                        placeholder="Re-Enter Your Password"
                        name="password_confirmation"
                        label="Re-Enter Password"
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        required
                        onChange={(event) => {
                            setFormData({ ...formData, password_confirmation: event.target.value });
                            console.log(event.target.value);
                        }}
                    />

                    <SelectBox
                        option={ACCOUNT_TYPE_OPTIONS}
                        value={accountType}
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        keepSelected
                        //   selectClass="select"

                        onChange={(e) => {
                            console.log(e.target.value);
                            setAccountType(e.target.value);
                        }}
                        selectClass="mainInput"
                        label="Account Type"
                    //   labelClass="pass"
                    />
                    {/* <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold'>Remember Me</label>
                        </div>
                        <Link to={'/forget-password'} className='text-dark text-decoration-underline'>Forget Password?</Link>
                    </div>
                   */}



                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Sign-up' type='submit' />
                        {/* <div className='accountRegister mt-3'>
                            <p className='text-light text-black-50'> If you have already account? <Link to={'/'} className='text-black-50  text-light text-decoration-underline'>Sign in </Link></p>
                        </div> */}

                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default Register
