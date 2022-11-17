import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const sessionStorage = window.sessionStorage;
  const [id, setId] = useState();
  const [pw, setPw] = useState();  
  const navigate = useNavigate();

  const handleId = ({ target: { value } }) => setId(value);
  const handlePw = ({ target: { value } }) => setPw(value);

  useEffect(() => {
    if (sessionStorage.getItem('user') !== null)
      navigate('/');
  }, [sessionStorage, navigate]);

  const validate = () => {
    const idRegex =  /^[a-z0-9_-]{3,16}$/;
    const pwRegex = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$/;

    if (!idRegex.test(id)) {
      alert('3-16자리의 사용자 이름을 입력해주시기 바랍니다.');
      return false;
    }
    if (!pwRegex.test(pw)) {
      alert('8-16자리이고 문자, 숫자, 특수문자 조합의 비밀번호를 입력해주시기 바랍니다.');
      return false;
    }
    return true;
  }

  const handleSignup = () => {
    if (validate()) {
      fetch('http://localhost:8001/signup', {
        method: 'POST',
        headers: { 'accept':'application/json', 'Content-type': 'application/json'},
        body: JSON.stringify({ username: id, password: pw})
      })
        .then(async res => {
          const data = await res.json();
          if (res.status === 200) {
            alert('회원가입이 완료되었습니다');
          } else {
            console.log(data);
            alert ('회원가입에 실패했습니다');
          }
        });
    }
  };

  const handleLogin = () => {
    fetch('http://localhost:8001/login', {
      method: 'POST',
      headers: { 'accept':'application/json', 'Content-type': 'application/json'},
      body: JSON.stringify({ username: id, password: pw})
    })
      .then(async res => {
        const data = await res.json();
        if (res.status === 200) {
          sessionStorage.setItem('token', data.token);
          navigate('/');
        } else {
          alert (data.detail);
        }
      });
  };

  return (
    <div className="py-5 my-5">
      <header className="py-5 text-center">
        <h1>한눈에가계부</h1>
      </header>
      <section className="d-flex justify-content-center">
        <form> 
          <div className="my-4 form-floating">
            <input type="text" className="form-control" onChange={handleId} placeholder="username" />
            <label>Username</label>
          </div>
          <div className="my-4 form-floating">
            <input type="password" className="form-control" onChange={handlePw} placeholder="password" autoComplete="on"/>
            <label >Password</label>
          </div>

          <div className="d-flex justify-content-between gap-3">
            <span>
              <input onClick= {handleSignup} type="button" className="w-100 px-5 py-2 btn btn-lg btn-dark" value="Signup" />
            </span>
            <span>
              <input onClick= {handleLogin} type="button" className="w-100 px-5 py-2 btn btn-lg btn-dark" value="Login" />
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
