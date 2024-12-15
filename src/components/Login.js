import React, { useState } from "react";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
    const [id, setId] = useState("");

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://3wriyc5qka.execute-api.ap-northeast-2.amazonaws.com/default/lambda_for_scoring", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true); // 로그인 성공 시 부모 컴포넌트에서 상태 변경
                localStorage.setItem("id", id);
            } else {
                setErrorMessage(data.message); // 에러 메시지 출력
            }
        } catch (error) {
            setErrorMessage("네트워크 오류가 발생했습니다.");
        }
    };

    return (
        <div className="login-container">
            <h1>로그인</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
