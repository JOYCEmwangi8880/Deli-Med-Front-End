import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-modal';

function EditProfile() {
    const navigate = useNavigate();

    const initialValues = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        age: localStorage.getItem('age'),
        height: localStorage.getItem('height'),
    };

    const onSubmit = (values) => {
            const id = localStorage.getItem('id')
            if (id ) {

                const apiUrl = `http://127.0.0.1:5000/users/${id}`;
                fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            alert('Profile Edited Successfully');
                            navigate('/login');
                        }
                    });
            } else {
                alert(`user id ${id} not found`)
            }
                           
        } 
    

    const formSchema = yup.object().shape({
        username: yup.string(),
        email: yup.string(),
        name: yup.string(),
        age: yup.number().integer(),
        height: yup.number(),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: onSubmit,
    });

    return (
        <div className='editform'>
            <div>
                <form onSubmit={formik.handleSubmit} style={{ margin: '30px' }}>
                    <label htmlFor='username'>User Name</label>
                    <input
                        id='username'
                        name='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p style={{ color: 'red' }}>{formik.errors.username}</p>

                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <p style={{ color: 'red' }}>{formik.errors.email}</p>

                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <p style={{ color: 'red' }}>{formik.errors.name}</p>

                    <label htmlFor='age'>Age</label>
                    <input
                        id='age'
                        name='age'
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    <p style={{ color: 'red' }}>{formik.errors.age}</p>

                    <label htmlFor='height'>Height</label>
                    <input
                        id='height'
                        name='height'
                        onChange={formik.handleChange}
                        value={formik.values.height}
                    />
                    <p style={{ color: 'red' }}>{formik.errors.height}</p>

                    <button type="submit" className="edit-profile-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;