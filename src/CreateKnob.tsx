import config from "../config"

export default function CreateKnob() {
  async function CreateNewKnob(event: any) {
    event.preventDefault()
    const formdata = new FormData(event.target)
    const request = await fetch(`${config.SERVER_URL}/knob/create`, {
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
      <form onSubmit={CreateNewKnob}>
        <textarea className="w-96 textarea textarea-primary" placeholder="Knob Title" name="knobname"></textarea><br />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>
  )
}
