const SERVER_URL: string = "http://localhost:8080/knob/create"

export default function CreateKnob() {
  async function MakeKnobRequest(event: any) {
    event.preventDefault()
    const formdata = new FormData(event.target)
    const request = await fetch(`${SERVER_URL}`, {
      method: "POST",
      body: new URLSearchParams({
        "knob_name": formdata.get("knobname") as string,
        "api_key": localStorage.getItem("API_KEY")!,
      })
    })
    if (!request.ok) {
      console.log("failed to make knob request")
      return
    }
    console.log("successfully saved")
    window.location.href="/"
  }

  return (
    <>
      <form onSubmit={MakeKnobRequest}>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Knob Name" name="knobname" />
        </label>
        <textarea className="w-96 textarea textarea-primary" placeholder="Knob Description" name="knobdesc"></textarea><br />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>
  )
}
