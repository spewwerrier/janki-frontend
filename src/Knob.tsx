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


  function ConvertObjToArray(obj: any) {
    return Array.isArray(obj) ? obj : [];
  }

  // this is to change knob details (knobing the knob lol)
  async function KnobUpdate(event: any) {
    await MakeUpdateRequest(event, knobid)
    await KnobRetrieve()
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


      {/* this is a description modal */}
      <h1 className="block badge badge-info content-center" onClick={() => {
        const modal = document.getElementById("desc") as HTMLDialogElement;
        if (modal) {
          modal.showModal()
        }
      }}>Description</h1>

      <dialog id="desc">
        <form onSubmit={KnobUpdate}>
          <input name="description" />
          <button type="submit">Submit</button>
        </form>
      </dialog>

      {knob?.Description}


      {/* this is a question modal */}
      <h1 className="badge badge-info" onClick={() => {
        const modal = document.getElementById("ques") as HTMLDialogElement;
        if (modal) {
          modal.showModal()
        }
      }}>Questions</h1>
      {
        ConvertObjToArray(knob?.Ques["Elements"])
          .map((x, index) => (
            <p key={index}>{x}</p>
          ))
      }

      <dialog id="ques">
        <form onSubmit={KnobUpdate}>
          <input name="ques" />
          <button type="submit">Submit</button>
        </form>
      </dialog>

      {/* this is a references modal */}
      <h1 className="badge badge-info" onClick={() => {
        const modal = document.getElementById("refs") as HTMLDialogElement;
        if (modal) {
          modal.showModal()
        }
      }}>References</h1>
      {
        ConvertObjToArray(knob?.Refs["Elements"])
          .map((x, index) => (
            <p key={index}>{x}</p>
          ))
      }

      <dialog id="refs">
        <form onSubmit={KnobUpdate}>
          <input name="refs" />
          <button type="submit">Submit</button>
        </form>
      </dialog>

      <br />

      {/* this is things to read modal */}
      <h1 className="badge badge-info">Tor</h1>
      {
        ConvertObjToArray(knob?.Tor["Elements"])
          .map((x, index) => (
            <p key={index}>{x}</p>
          ))
      }
      <br />
      <h1 className="badge badge-info">Todo</h1>
      {
        ConvertObjToArray(knob?.Todo["Elements"])
          .map((x, index) => (
            <p key={index}>{x}</p>
          ))
      }
      <br />

      Editor

    </div>
  );
}


export async function knobLoader({ params }: { params: { knobId: string } }) {
  return params.knobId;
}
