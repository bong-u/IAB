const Login = () => {
  return (
    <div className="py-5 my-5">
      <header className="py-5 text-center">
        <h1>한눈에가계부</h1>
      </header>
      <section className="d-flex justify-content-center">
        <form id="loginForm" action="/">
          <div className="my-4 form-floating">
            <input type="email" className="form-control" id="floatingEmail" placeholder="email" />
            <label>Email</label>
          </div>
          <div className="my-4 form-floating">
            <input type="password" className="form-control" id="floatingPw" placeholder="password" />
            <label >Password</label>
          </div>

          <div className="d-flex justify-content-between gap-3">
            <span>
              <input type="button" className="w-100 px-5 py-2 btn btn-lg btn-dark" value="Signup" />
            </span>
            <span>
              <input type="submit" className="w-100 px-5 py-2 btn btn-lg btn-dark" value="Login" />
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
