import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'

function Signup(){
    //refresh age on submit
    const[refreshPage, setRefreshPage] = useState(false);
    const optionsBloodGroups = ['A', 'B', 'AB', 'O'];
    //Values before form filling
    const initialValues = {
        username : '',
        email : '',
        password : '',
        name : '',
        age : 0,
        height : 0,
        blood_type : '',
        previous_illnesses : ''
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
        age: yup.number().integer().required('Enter age. Must be a positive number'),
        height: yup.number().required('Enter height in meters'),
        blood_type: yup.string().required('choose one of the options'),
        previous_illnesses: yup.string(),
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
                        value = {formik.values.username}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.username}</p>

                   

                    <label htmlFor = 'email'> Email </label>
                    <input
                        id = 'email'
                        name = 'email'
                        onChange = {formik.handleChange}
                        value = {formik.values.email}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.email}</p>

                   
                    <label htmlFor = 'password'> Password </label>                    
                    <input
                        id = 'password'
                        name = 'password'
                        onChange = {formik.handleChange}
                        value = {formik.values.password}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.password}</p>


                    <label htmlFor = 'name'> Name </label>                    
                    <input
                        id = 'name'
                        name = 'name'
                        onChange = {formik.handleChange}
                        value = {formik.values.name}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.name}</p>


                    <label htmlFor = 'age'> Age </label>                    
                    <input
                        id = 'age'
                        name = 'age'
                        onChange = {formik.handleChange}
                        value = {formik.values.age}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.age}</p>

                    <label htmlFor = 'height'> Height </label>                    
                    <input
                        id = 'height'
                        name = 'height'
                        onChange = {formik.handleChange}
                        value = {formik.values.height}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.height}</p>

                   
                    <label htmlFor="bloodType">Blood Type:</label>
                    <select
                        id="blood_type"
                        name="blood_type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.blood_type}
                    >
                        <option value="" label="Select type" />
                        {optionsBloodGroups.map((option) => (
                            <option key={option} value={option} label={option} />
                        ))}
                    </select>
                    {formik.touched.blood_type && formik.errors.blood_type && (
                        <div>{formik.errors.blood_type}</div>
                    )}
            
                                    
                                       
                    <label htmlFor = 'previousIllnesses'> Previous Illness </label>                    
                    <input
                        id = 'previous_illnesses'
                        name = 'previous_illnesses'
                        onChange = {formik.handleChange}
                        value = {formik.values.previous_illnesses}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.previous_illnesses}</p>

                    
                    <button type="submit">Signup</button>
                </form>
            </div>
        </>
    )
}
export default Signup;