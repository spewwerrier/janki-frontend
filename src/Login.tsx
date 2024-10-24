import { useState } from "react"
import config from "../config"

export function HasLoggedIn() :boolean{
  return localStorage.getItem("API_KEY") !== null
 
}


function Login() {
  const [response, setResponse] = useState("")
  async function MakeLoginRequest(event:any) {
    event.preventDefault()
    const formdata = new FormData(event.target)
    const request = await fetch(`${config.SERVER_URL}/users/read`, {
      method: "POST",
      body: new URLSearchParams({
        "username": formdata.get("username") as string,
        "password": formdata.get("password") as string,
      })
    })
    if(!request.ok){
      console.log("failed to make login request")
      return
    }
    const data = await request.text()
    setResponse(data)
    console.log("resp", data)
    localStorage.setItem("API_KEY", data)
    window.location.href = "/"
  }

  return (
    <>
      <form onSubmit={MakeLoginRequest}>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Username" name="username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" placeholder="Password" name="password"/>
        </label>
        <input type="submit" className="btn" value="Submit" />
        {response && <div>Response: {response}</div>}
      </form>
    </>
  )
}

export default Login
