
import config from '../config.ts';


// retrieves single knob using knobid and api taken from localstorage
export async function RetrieveSingleKnob(knobid: string) {
  const request = await fetch(`${config.SERVER_URL}/knob/read`, {
    method: "POST",
    body: new URLSearchParams({
      api_key: localStorage.getItem("API_KEY")!,
      knob_id: knobid,
    }),
  });
  const data = await request.json();
  console.log(data)

  return data;
}
