export function Login(): JSX.Element {
  return(
    <div>
      <h1>Login page</h1>

      <form>
          <div className="class-container">
            <label>
               Username 
              <input type="text" name="uname" required/>
            </label>
          </div>

          <div>
            <label>
              Password 
              <input type="text" name="pword" required/>
            </label>
          </div>
        </form>
        
    </div>

  )
}