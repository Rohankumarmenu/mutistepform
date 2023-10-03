import { useReducer } from "react";
import FormInputGroup from "./FormInputGroup";
import {
  FormActionTypes,
  FormInitialState,
  formReducer,
  FormSettings
} from "../hooks/formReducer";
import Button from "./Button";
import { validateInput } from '../utils/utils';

const MainForm = () => {
  const [state, dispatch] = useReducer(formReducer, FormInitialState);
  const { form, current_step, errors } = state;
  const { maxStep } = FormSettings;
  const showResetButton = Object.values(form).filter(v => v)[0];

  const handleInputChange = evt => {
    dispatch({
        type: FormActionTypes.ADD_DATA,
        payload: {
            [evt.target.name]: evt.target.value
        }
    })
  }

  const goToPreviousStep = () => {
    dispatch({
      type: FormActionTypes.FORM_PREV_STEP
    });
  }

  const handleErrors = () => {
    const errorsObj = {...errors};
    let fields = null;
  
    switch(current_step){
      case 1: fields = ['username', 'email', 'password'];
              break;
      case 2: fields = ['firstname', 'lastname', 'phone'];
              break;
      case 3: fields = ['cardnum', 'cvcnum', 'expdate'];
              break;
      default:
    }
  
    fields.map(field => {
      const result = validateInput(form[field], field);
      if(result.status) delete errorsObj[field];
      else errorsObj[field] = result.msg;
      return true;
    });
  
    dispatch({
      type: FormActionTypes.FORM_ERROR,
      payload: {
        ...errorsObj
      }
    });

    return Object.keys(errorsObj).length ? false : true;
  }

  const goToNextStep = operation => {
    if(!operation) return;
    const status = handleErrors();
    if(!status) return;

    dispatch({
        type: FormActionTypes.FORM_NEXT_STEP
    });
  }

  const handleSubmitForm = evt => {
    evt.preventDefault();
    const status = handleErrors();
    if(!status) return;
    alert('Form submit')
  }

  const renderCurrentStepJSX = () => {
    switch (current_step) {
      case 1:
        const {username = '', email = '', password = '', } = form;
        const { username: usernameError, email: emailError, password: passwordError } = errors;

        return (
          <>
            <FormInputGroup
              title="Username"
              type="text"
              name="username"
              id="username"
              value={username}
              inputCls="w-full"
              error={usernameError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              inputCls="w-full"
              error={emailError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              inputCls="w-full"
              error={passwordError}
              onChangeHandler={handleInputChange}
            />
          </>
        );

      case 2:
        const { firstname = '', lastname = '', phone = '' } = form;
        const { firstname: firstNameError, lastname: lastNameError, phone: phoneError } = errors;

        return (
          <>
            <FormInputGroup
              title="First Name"
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              inputCls="w-full"
              error={firstNameError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Last Name"
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              inputCls="w-full"
              error={lastNameError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Phone"
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              inputCls="w-full"
              error={phoneError}
              onChangeHandler={handleInputChange}
            />
          </>
        );

      case 3:
        const { cardnum = '', cvcnum = '', expdate = '' } = form;
        const { cardnum: cardNumError, cvcnum: cvcNumError, expdate: expdateError } = errors;

        return (
          <>
            <FormInputGroup
              title="Card Number" 
              type="text" 
              name="cardnum" 
              id="cardnum" 
              value={cardnum} 
              inputCls="w-full" 
              error={cardNumError} 
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="CVC Number"
              type="text"
              name="cvcnum"
              id="cvcdnum"
              value={cvcnum}
              inputCls="w-full" 
              error={cvcNumError} 
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Expiration Date"
              type="text"
              name="expdate"
              id="expdate"
              value={expdate}
              inputCls="w-full" 
              error={expdateError} 
              onChangeHandler={handleInputChange}
            />
          </>
        );

      default:
        return null;
    }
  };


  return (
    <>
    <h2 className="heading">React Multi Step Form</h2>
    <form>
      {renderCurrentStepJSX()}
      <div className="form-footer">
        <div className="step-info">
          {current_step} of {maxStep}
        </div>
        <div className="action-cta">
          {showResetButton && (
            <Button 
                type="button" 
                text="Reset" 
                clsName="btn btn-outline" 
                onClickHandler={() => dispatch({type: FormActionTypes.FORM_RESET})}
            />
          )}
          {current_step > 1 && (
            <Button 
                type="button" 
                text="Previous" 
                clsName="btn btn-outline" 
                onClickHandler={goToPreviousStep}
            />
          )}
          {current_step < maxStep && (
            <Button
                type="button"
                text="Next"
                clsName="btn" 
                onClickHandler={goToNextStep}
            />
          )}
          {current_step === maxStep && (
            <Button
                type="submit"
                text="Submit"
                clsName="btn" 
                onClickHandler={handleSubmitForm}
            />
          )}
        </div>
      </div>
    </form>
    </>
  );
};

export default MainForm;
