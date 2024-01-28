import {  useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'


function EditProfile(){

    //get user id and other variables from the local storage for edit
    const id = localStorage.getItem('id')

    //other variables editable


    const initialValues = {
        username : '',
        email : '',
        name : '',
        age : 0,
        height : 0,
        blood_type : '',
        previous_illnesses : ''
    }

    // On submit patch method
    const onSubmit = (values) => {
        const navigate = useNavigate();
        fetch( `http://127.0.0.1:5000/auth/signup/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then ((res) => {
            if (res.status == 200) {
                navigate('/ProfilePage');
            }
        });
       
    };

}

    //setting the rules for validation using formik
    const formSchema = yup.object().shape({
        username: yup.string(),
        email: yup.string().email('Invalid email'),
        name: yup.string().required('Enter name'),
        age: yup.number().integer(),
        height: yup.number(),
        blood_type: yup.string(),
        previous_illnesses: yup.string(),
    })