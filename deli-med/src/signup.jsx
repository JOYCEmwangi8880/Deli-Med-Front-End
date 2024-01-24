import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'

function Signup(){
    //refresh age on submit
    const[refreshPage, setRefreshPage] = useState(false);
    const optionsBloodGroups = ['A', 'B', 'AB', 'O'];
    //Values before form filling
    const initialValues = {
        username= '',
        email= '',
        password= '',
        name= '',
        age= 0,
        height= 0,
        bloodType= ''
        previousIllnesses= ''
    }
    // On submit post method
    const onSubmit = (values) => {
        fetch('http://127.0.0.1:5000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then ((res) => {
            if (res.status == 200) {
                setRefreshPage(!refreshPage);
            }
        });
        console.log(values)
    };
    //setting the rules for validation using formik
    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter username'),
        email: yup.string().email('Invalid email').required('Must enter email'),
        password: yup.string().required('Must enter password'),
        name: yup.string().required('Enter name'),
        age: yup.integer().required('Enter age. Must be a positive number'),
        height: yup.float().required('Enter height in meters'),
        bloodType: yup.string().required('choose one of the options'),
        previousIllnesses: yup.string(),
    })
     //including the variables into the useFormik hook
    const formik = useFormik({
        initialValues : initialValues,
        validationSchema: formSchema,
        onSubmit: onSubmit,
        });

    return(
        <>
            <h1>New User enrollment</h1>
            <div className = 'studentRegistrationForm'>
                <form onSubmit = {formik.handleSubmit} style = {{margin : '30px'}}>
                  
                   
                    <label htmlFor = 'username'> User Name </label>
                    <input
                        id = 'username'
                        name = 'username'
                        onChange = {formik.handleChange}
                        value = {formik.values.firstName}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.firstName}</p>

                   

                    <label htmlFor = 'email'> Email </label>
                    <input
                        id = 'email'
                        name = 'email'
                        onChange = {formik.handleChange}
                        value = {formik.values.secondName}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.secondName}</p>

                   
                    <label htmlFor = 'password'> Phone-Number </label>                    
                    <input
                        id = 'password'
                        name = 'password'
                        onChange = {formik.handleChange}
                        value = {formik.values.phoneNumber}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.phoneNumber}</p>


                    <label htmlFor = 'name'> Phone-Number </label>                    
                    <input
                        id = 'name'
                        name = 'name'
                        onChange = {formik.handleChange}
                        value = {formik.values.phoneNumber}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.phoneNumber}</p>


                    <label htmlFor = 'age'> Phone-Number </label>                    
                    <input
                        id = 'age'
                        name = 'age'
                        onChange = {formik.handleChange}
                        value = {formik.values.phoneNumber}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.phoneNumber}</p>

                    <label htmlFor = 'height'> Phone-Number </label>                    
                    <input
                        id = 'height'
                        name = 'height'
                        onChange = {formik.handleChange}
                        value = {formik.values.phoneNumber}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.phoneNumber}</p>

                   
                    <label htmlFor="bloodType">Blood Type:</label>
                    <select
                        id="bloodType"
                        name="bloodType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.grade}
                    >
                        <option value="" label="Select type" />
                        {optionsGrade.map((option) => (
                            <option key={option} value={option} label={option} />
                        ))}
                    </select>
                    {formik.touched.grade && formik.errors.grade && (
                        <div>{formik.errors.grade}</div>
                    )}
            
                                    
                                       
                    <label htmlFor = 'previousIllnesses'> Previous Illness </label>                    
                    <input
                        id = 'previousIllnesses'
                        name = 'previousIllnesses'
                        onChange = {formik.handleChange}
                        value = {formik.values.email}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.email}</p>

                    
                    <button type="submit">Signup</button>
                </form>
            </div>
        </>
    )
}
export default Signup;
