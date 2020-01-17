import React, { useEffect, useContext, useState } from 'react';
import { Form as FormikForm, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'semantic-ui-react'
import axios from 'axios'



const NewTransaction = (props) => {

    console.log(props)

    const { getReceived } = props

    const { errors, touched, values, handleSubmit, status } = props;

    const [submit_status, setSubmitStatus] = useState()

    useEffect(() => {
        getReceived(status)
        console.log(status)
    }, [status])
    
	return (
        <>
     
        <div className="login-panel">
        <div className="login-title">
        <h1>New Transaction Form</h1>
        </div>
			<FormikForm use="semantic-ui-react" className="login-form">
                <div>
                <Form.Field>
				<Field className="login-input one" type="text" name="sender" data-testid="sender" placeholder="Sender" />
                {touched.username && errors.username && <p className="error">{errors.username}</p>}
                </Form.Field>
                </div>
                <div>
                <Form.Field>
				<Field className="login-input" type="text" name="recipient" data-testid="recipient" placeholder="Recipient" />
				{/* {touched.password && errors.password && <p className="error">{errors.password}</p>} */}
                </Form.Field>
                </div>  <div>
                <Form.Field>
				<Field className="login-input" type="text" name="amount" data-testid="amount" placeholder="Amount" />
				{/* {touched.password && errors.password && <p className="error">{errors.password}</p>} */}
                </Form.Field>
                </div>
                

                <div>
				<button className="login-button" onClick={handleSubmit} type="submit">SUBMIT</button>
                </div>
			</FormikForm>
            
            
	
        </div>
        {/* <Footer /> */}
        </>
	);
};

const FormikLoginForm = withFormik({
	mapPropsToValues ({ sender, recipient, amount }) {
		return {
			sender     : sender || '',
            recipient : recipient || '',
            amount : amount
		};
	},

	validationSchema : Yup.object().shape({
		sender     : Yup.string().required('Please enter your name'),
        recipient: Yup.string().required('Please the recipient'),
        amount : Yup.string().required('Please enter an amount'),		
		
	}),

	handleSubmit (values, { props, setStatus, handleSubmit: e}) {
        // e.preventDefault()
        
        
        axios
			.post('http://localhost:5000/transactions/new', values)
			.then((res) => {
               setStatus(res.data.message)
               console.log(res.data)
               

			})
			.catch((err) => console.log(err.response));
    },
})(NewTransaction);

export default FormikLoginForm;





