// register and save the cookie in cache
import { FormEvent, useState } from "react"


const SERVER_URL: string = "http://localhost:8080/users/create"

function Register() {
  const [response, setResponse] = useState("")
  async function MakeRegisterRequest(event:any) {
    event.preventDefault()
    const formdata = new FormData(event.target)
    const request = await fetch(`${SERVER_URL}`, {
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
    window.location.href="/"
  }

  return (
    <>
      <h1 className="label">REGISTER</h1>
      <form onSubmit={MakeRegisterRequest}>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Username" name="username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" placeholder="Password" name="password"/>
        </label>
        <input type="submit" className="btn" value="Submit" />
      </form>
    </>
  )
}

export default Register
