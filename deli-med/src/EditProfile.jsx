import {  useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'


function EditProfile(){

    //get user id and other variables from the local storage for edit
    const id = localStorage.getItem('id')
    const navigate = useNavigate();

    //other variables editable


    const initialValues = {
        username : localStorage.getItem('username'),
        email : localStorage.getItem('email'),
        name : localStorage.getItem('name'),
        age : localStorage.getItem('age'),
        height : localStorage.getItem('height'),
    }

    // On submit patch method
    const onSubmit = (values) => {
        
        fetch( `http://127.0.0.1:5000/auth/signup/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then ((res) => {
            if (res.status == 200) {
                alert('Profile Edited Succefully')
                navigate('/ProfilePage');
            }
        });
       
    };

    //setting the rules for validation using formik
    const formSchema = yup.object().shape({
        username: yup.string(),
        email: yup.string().email('Invalid email'),
        name: yup.string().required('Enter name'),
        age: yup.number().integer(),
        height: yup.number(),
        
    })

    //formik
    const formik = useFormik({
        initialValues : initialValues,
        validationSchema: formSchema,
        onSubmit: onSubmit,
        });

        return (
            <>
              
              <div className='edit form'>
                <form onSubmit={formik.handleSubmit} style={{ margin: '30px' }}>
                  
                   
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
                        type = 'email'
                        onChange = {formik.handleChange}
                        value = {formik.values.email}
                    />
                    <p style = {{color: 'red'}}>{formik.errors.email}</p>

                   
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
     
                    <button type="submit" className="signup-btn">Submit</button>
      </form>
            </div>
        </>
    )

}

export default EditProfile;