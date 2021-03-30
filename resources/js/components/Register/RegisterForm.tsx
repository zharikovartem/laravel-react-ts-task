import React, { ReactNode } from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntCheckbox, AntInput, AntInputPassword, AntSelect } from './../../utils/CreateAntField'
import { validateEmail, validateRequired } from './../../utils/ValidateFields'

const RegisterForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntInput}
                name="email"
                type="email"
                label="Email"
                validate={validateEmail}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntInputPassword}
                name="password"
                type="password"
                label="Password"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />

            <Field
                component={AntInputPassword}
                name="password_confirmation"
                type="password"
                label="Confirm"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />

            <Field
                component={AntCheckbox}
                name="remember"
                label="Remember Me"
                submitCount={props.submitCount}
            />

            <Field
                component={AntSelect}
                selectOptions={statusOptions}
                name="status"
                type="select"
                label="User Status"
                submitCount={props.submitCount}
            />

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Register
                </button>
            </div>

        </Form>
    )
}

export default RegisterForm

type StatusOptionItemType = {
    name: string,
    value: string,
    isSubform: boolean,
}

type StatusOptionsType = Array<StatusOptionItemType>

const statusOptions: StatusOptionsType = [
    {
        name: 'Guest',
        value: 'guest',
        isSubform: false,
    },
    {
        name: 'Admin',
        value: 'admin',
        isSubform: false,
    },
]