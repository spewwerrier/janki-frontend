import config from "../config";

export default async function MakeUpdateRequest(event: any, knobid: any) {
  event.preventDefault()
  const formdata = new FormData(event.target)
  let params = new URLSearchParams({
    "api_key": localStorage.getItem("API_KEY") as string,
    "knob_id": knobid,
  })

  // a helper function to assign parameters to main URLSearchParams
  const appendParam = (append: string) => {
    const x = formdata.get(append)
    if (x) {
      params.append(append, x as string)
    }
  }

  // there are 2 different params we want to support
  // description is not array based so we create 1 for description
  // and reuse remaining for others

  // api params
  // ques, refs, tor, todo, suggestions, topics, urls
  // description

  // TODO: after server supports archiving/deleteing support them
  appendParam("ques");
  appendParam("refs");
  appendParam("tor");
  appendParam("todo");
  appendParam("suggestion");
  appendParam("topics");
  appendParam("description");
  appendParam("urls");

  const request = await fetch(`${config.SERVER_URL}/knob/update`, {
    method: "POST",
    body: params
  })

  if (!request.ok) {
    console.log("failed to make knob update request")
    return
  }

  const data = await request.text()
  console.log(data)

}


