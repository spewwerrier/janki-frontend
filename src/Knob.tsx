import config from '../config.ts'

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MakeUpdateRequest from "./UpateKnob";

interface Knob {
  Creation: Date;
  ForkOf: string;
  Identifier: string;
  IsPublic: boolean;
  KnobName: string;
}

interface KnobDescription {
  Knob: Knob;
  Description: string;
  Ques: string[];
  Refs: string[];
  Suggestions: string[];
  Todo: string[];
  Topics: string[];
  Tor: string[];
  Urls: string[];
}


export default function KnobPage() {
  const [knob, setKnob] = useState<KnobDescription>();
  const knobid = useLoaderData();

  // we retrive all details of a single knob
  async function KnobRetrieve() {
    try {
      const request = await fetch(`${config.SERVER_URL}/knob/read`, {
        method: "POST",
        body: new URLSearchParams({
          api_key: localStorage.getItem("API_KEY")!,
          knob_id: knobid as string,
        }),
      });
      const data = await request.json();
      setKnob(data);
    } catch (error) {
      console.error("Error fetching knob data:", error);
    }
  }

  // we update the knob once
  useEffect(() => {
    KnobRetrieve();
  }, []);


  // this is to change knob details (knobing the knob lol)
  async function KnobUpdate(event: any) {
    await MakeUpdateRequest(event, knobid)
    await KnobRetrieve()
  }

  function PrintKnob(props: any) {
    return (
      <>
        <h1 className="badge badge-info" onClick={() => {
          const modal = document.getElementById(props.param) as HTMLDialogElement;
          if (modal) {
            modal.showModal()
          }
        }}>{props.param}</h1>

        {props.KnobInfo}

        <dialog id={props.param}>
          <form onSubmit={KnobUpdate}>
            <input name={props.param} />
            <button type="submit">Submit</button>
          </form>
        </dialog>
      </>
    )

  }


  return (
    <div className="flex justify-end flex-col items-center">

      <h1 className="block badge badge-info">Title</h1>
      <label>
        {knob?.Knob.KnobName}
      </label>
      <h1 className="badge badge-info">Creation Date</h1>
      {knob?.Knob.Creation.toString()}
      <br />

      <PrintKnob knobInfo={knob?.Description} param="description" />
      {knob?.Description}

      <PrintKnob KnobInfo={knob?.Ques["Elements"]} param="ques" />
      <PrintKnob KnobInfo={knob?.Refs["Elements"]} param="refs" />
      <PrintKnob KnobInfo={knob?.Suggestions["Elements"]} param="suggestions" />
      <PrintKnob KnobInfo={knob?.Todo["Elements"]} param="todo" />
      <PrintKnob KnobInfo={knob?.Topics["Elements"]} param="topics" />
      <PrintKnob KnobInfo={knob?.Tor["Elements"]} param="tor" />
      <PrintKnob KnobInfo={knob?.Urls["Elements"]} param="urls" />

    </div>
  );
}


export async function knobLoader({ params }: { params: { knobId: string } }) {
  return params.knobId;
}

