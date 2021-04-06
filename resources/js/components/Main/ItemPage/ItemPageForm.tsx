import React, { ReactNode, useReducer } from 'react'
import { Form, Field, FormikProps, FormikValues } from "formik"
import { AntCheckbox, AntInput, AntDatePicker, AntTextArea } from './../../../utils/CreateAntField'
import { validateEmail, validateRequired } from './../../../utils/ValidateFields'
import { AnnouncementType } from '../../../api/parserAPI'
import { initialValuesType } from './ItemPage'
import authReducer, {initialState} from "./.../../../../../redux/authReducer"
import { useStore } from 'react-redux'


const ItemPageForm: ((props: initialValuesType & FormikProps<FormikValues>) => ReactNode) = (props) => {
    // const [state, dispatch] = useReducer(authReducer, initialState);
    const auth = useStore().getState().auth
    console.log('state:', auth)
    return (
        <Form
            className="form-container mt-3"
            onSubmit={props.handleSubmit}
        >
            {auth.isAuthChecked && auth.isAuth ? 
            <Field
                component={AntTextArea}
                name="desriptions"
                type="textArea"
                label="Descriptions"
                // disabled= {true}
                // hasFeedback
            />
            :
            <p>{props.initialValues.desriptions}</p>
            }
            

            <Field
                component={AntInput}
                name="price"
                type="number"
                label="Price"
                // validate={validateRequired}
                submitCount={props.submitCount}
                // hasFeedback
            />

            <Field
                component={AntDatePicker}
                name="public_date"
                type="date"
                label="public_date"
                validate={validateRequired}
                submitCount={props.submitCount}
                // disabled= {disabled}
            />

            <Field
                component={AntInput}
                name="adress"
                type="text"
                label="adress"
                // validate={validateRequired}
                submitCount={props.submitCount}
                // hasFeedback
            />
            <Field
                component={AntInput}
                name="region"
                type="text"
                label="region"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="locality"
                type="text"
                label="locality"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="city_area"
                type="text"
                label="city_area"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="metro"
                type="text"
                label="metro"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="rooms"
                type="text"
                label="rooms"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="number_of_berths"
                type="text"
                label="number_of_berths"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="floor"
                type="text"
                label="floor"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="square"
                type="text"
                label="square"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="furniture"
                type="text"
                label="furniture"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="isPhone"
                type="text"
                label="isPhone"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="renovation"
                type="text"
                label="renovation"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntTextArea}
                name="appliances"
                type="text"
                label="appliances"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="additionally"
                type="text"
                label="additionally"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="notes"
                type="text"
                label="notes"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <Field
                component={AntInput}
                name="phone"
                type="text"
                label="phone"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />

            <div className="submit-container mb-3">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}

export default ItemPageForm