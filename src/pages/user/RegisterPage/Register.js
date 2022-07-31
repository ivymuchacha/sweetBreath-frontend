import {
  RegisterForm,
  RegisterInput,
  RegisterButton,
  ErrorMessage,
  SubmitLoading,
} from "./style";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../../../webAPI/userAPI";
import { setAuthToken } from "../../../utils";
import { LoadingContext } from "../../../contexts";

export default function Register() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    register(fullname, username, email, password).then((data) => {
      if (data.ok !== 1) {
        setIsLoading(false);
        setFullname("");
        setUsername("");
        setEmail("");
        setPassword("");
        return setErrorMessage(data.message);
      }
      setIsLoading(false);
      setAuthToken(data.token);
      history.push("/");
      window.location.reload();
    });
  };
  const handleEmail = (value) => {
    if (
      !/^\w+((-\w+)|(\.\w+))*[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
        value
      )
    ) {
      // console.log("請輸入正確 Email");
      return setErrorMessage(
        "@ 前後接受英文、數字與「-」、「.」組合"
        // "@ 前後可以是英文、數字與「-」、「.」組合，但「-」、「.」不能連續出現，@ 之後必須是英文、數字與「.」組合，最末個「.」之後為英文"
      );
    }
    return setErrorMessage(null);
  };
  const handleInputFocus = () => {
    setErrorMessage(null);
  };
  return (
    <>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ErrorMessage></ErrorMessage>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="全名"
        />
        <RegisterInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="帳號"
        />
        <RegisterInput
          value={email}
          onChange={(e) => {
            handleEmail(e.target.value);
            setEmail(e.target.value);
          }}
          onFocus={handleInputFocus}
          type="email"
          placeholder="電子郵件"
        />
        <RegisterInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handleInputFocus}
          type="password"
          placeholder="密碼"
        />
        {isLoading ? (
          <SubmitLoading>資料驗證中...</SubmitLoading>
        ) : (
          <>
            <RegisterButton>註冊</RegisterButton>
          </>
        )}
      </RegisterForm>
    </>
  );
}
