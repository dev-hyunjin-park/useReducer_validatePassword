import * as React from 'react';
import { useState, useRef, useReducer, useEffect } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.black};
`;
const Form = styled.form`
  width: 100%;
  min-height: 40%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const InputContainer = styled.div`
  background-color: ${(props) => props.theme.lightGray};
  border-radius: 15px;
  padding: 2px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Input = styled.input`
  min-width: 180px;
  width: 100%;
  background-color: ${({ theme, active }) =>
    active ? theme.lightGray : theme.black};
  color: ${({ theme, active }) => (active ? theme.black : theme.lightGray)};
  font-weight: bold;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 15px;
`;
const ErrorMessageContainer = styled.div`
  color: ${({ theme }) => theme.pink};
  margin-bottom: 10px;
  font-weight: 600;
`;
const Button = styled.button`
  background-color: ${({ theme, active }) =>
    active ? theme.lightGray : theme.black};
  color: ${({ theme, active }) => (active ? theme.black : theme.lightGray)};
  font-weight: bold;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 15px;
`;
const VALIDATE_PASSWORD_CASES = {
  hasUppercase: 'HAS_UPPER_CASE',
  hasLowercase: 'HAS_LOWER_CASE',
  hasDigit: 'HAS_DIGIT',
  hasSpecialChar: 'HAS_SPECIAL_CHAR',
  isLongEnough: 'IS_LONG_ENOUGH',
  isNotCorrect: 'IS_NOT_CORRECT',
};
const initState = {
  error: false,
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case VALIDATE_PASSWORD_CASES.hasDigit:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case VALIDATE_PASSWORD_CASES.hasLowercase:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case VALIDATE_PASSWORD_CASES.hasSpecialChar:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case VALIDATE_PASSWORD_CASES.hasUppercase:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case VALIDATE_PASSWORD_CASES.isLongEnough:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case VALIDATE_PASSWORD_CASES.isNotCorrect:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    case 'SUCCESS':
      return {
        ...state,
        error: false,
        mesage: '',
      };
    default:
      return { ...state, error: null };
  }
};
const Join = () => {
  const emailRef = useRef(null);
  const [password, setPassword] = useState('');
  const confirmPasswordRef = useRef(null);
  const [activeInput, setActiveInput] = useState(null);
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (password !== '') {
      checkPasswordComplexity(password);
    }
  }, [password]);

  const checkPasswordComplexity = (password) => {
    if (password.length < 8) {
      dispatch({
        type: VALIDATE_PASSWORD_CASES.isLongEnough,
        payload: '비밀번호는 8자이상이어야 합니다.',
      });
      return;
    }
    if (!password.match(/[A-Z]/)) {
      dispatch({
        type: VALIDATE_PASSWORD_CASES.hasUppercase,
        payload: '대문자를 포함해주세요',
      });
    } else if (!password.match(/[a-z]/)) {
      dispatch({
        type: VALIDATE_PASSWORD_CASES.hasLowercase,
        payload: '소문자를 포함해주세요',
      });
    } else if (!password.match(/[0-9]/)) {
      dispatch({
        type: VALIDATE_PASSWORD_CASES.hasDigit,
        payload: '숫자를 포함해주세요.',
      });
    } else if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      dispatch({
        type: VALIDATE_PASSWORD_CASES.hasSpecialChar,
        payload: '특수문자를 포함해주세요',
      });
    }
    if (
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[!@#$%^&*(),.?":{}|<>]/)
    ) {
      dispatch({
        type: 'SUCCESS',
      });
    }
  };
  const checkConfirmPassword = () => {
    if (password === confirmPasswordRef.current.value) {
      console.log('===');
      return;
    }
    dispatch({
      type: VALIDATE_PASSWORD_CASES.isNotCorrect,
      payload: '비밀번호가 틀렸습니다',
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    checkConfirmPassword();
    // const email = emailRef.current.value;
    // const confirmPassword = confirmPasswordRef.current.value;
    // TO DO: FETCH
  };

  const handleInputClick = (inputId) => setActiveInput(inputId);
  return (
    <Background>
      <Form onSubmit={handleOnSubmit}>
        <InputContainer>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="이메일"
            ref={emailRef}
            active={activeInput === 1}
            onClick={() => handleInputClick(1)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
            password={password}
            onChange={(e) => setPassword(e.target.value)}
            active={activeInput === 2}
            onClick={() => handleInputClick(2)}
          />
        </InputContainer>
        {state.error && (
          <ErrorMessageContainer> {state.message}</ErrorMessageContainer>
        )}
        <InputContainer>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="비밀번호 확인"
            ref={confirmPasswordRef}
            active={activeInput === 3}
            onClick={() => handleInputClick(3)}
          />
        </InputContainer>
        <InputContainer>
          <Button type="submit">가입하기</Button>
        </InputContainer>
      </Form>
    </Background>
  );
};

export default Join;
