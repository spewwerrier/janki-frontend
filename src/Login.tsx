import { FormEvent, useEffect, useState } from "react"

function HasLoggedIn() :boolean{
  return localStorage.getItem("API_KEY") !== null
 
}

const SERVER_URL: string = "http://192.168.101.13:8080/users/read"

function Login() {
  const [response, setResponse] = useState("")
  async function MakeLoginRequest(event:any) {
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
  }

  if(HasLoggedIn()){
   return <>
   </> 
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
