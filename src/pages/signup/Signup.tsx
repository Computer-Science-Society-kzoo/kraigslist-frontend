export function Signup(): JSX.Element {
    return(
      <div>
        <h1>Signup page</h1>
        <form>
          <div className="class-container">
            <label>
               Email 
              <input type="text" name="email" required/>
            </label>
          </div>

          <div>
            <label>
              First Name 
              <input type="text" name="fName" required/>
            </label>
          </div>

          <div>
            <label>
              Last Name 
              <input type="text" name="lName" required/>
            </label>
          </div>

          <div>
            <label>
              Prefered Name 
              <input type="text" name="pName" required/>
            </label>
          </div>

          <div>
            <label>
              Year 
              <input type="text" name="fName" required/>
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
  