import { FormEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MakeUpdateRequest from "./UpdateKnob";
import { RetrieveSingleKnob } from './RetriveSingleKnob.tsx';

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
      const data = await RetrieveSingleKnob(knobid as string)
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
  async function KnobUpdate(event: FormEvent) {
    await MakeUpdateRequest(event, knobid)
    // the changes are done in server and we need to refetch the knob from server
    // to change the ui without requiring a refersh
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

        <ExtractKnobElements knobInfo={props.KnobInfo} />

        <dialog id={props.param}>
          <form className="join" onSubmit={KnobUpdate}>
            <input className="input input-bordered join-item" name={props.param} />
            <button className="btn join-item btn-primary" type="submit">Submit</button>
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

      <PrintKnob KnobInfo={knob?.Ques} param="ques" />
      <PrintKnob KnobInfo={knob?.Refs} param="refs" />
      <PrintKnob KnobInfo={knob?.Suggestions} param="suggestions" />
      <PrintKnob KnobInfo={knob?.Todo} param="todo" />
      <PrintKnob KnobInfo={knob?.Topics} param="topics" />
      <PrintKnob KnobInfo={knob?.Tor} param="tor" />
      <PrintKnob KnobInfo={knob?.Urls} param="urls" />

    </div>
  );
}


// our url http://localhost:9999/knob/{id}. It returns id
export async function knobLoader({ params }: { params: { knobId: string } }) {
  return params.knobId;
}

// knobInfo?.Elements was complaining and I have to do this. SMH
// our elements are array containing strings. Should work on other
// similar types cuz js
interface KnobElements {
  Elements: Array<string>
}

// loops over Element of an object. This element includes all of our information
// of our KnobDescription
function ExtractKnobElements({ knobInfo }: { knobInfo: KnobElements }) {
  if (!knobInfo?.Elements) {
    return null;
  }

  return (
    <div>
      {knobInfo.Elements.map((element: string, index: number) => {
        console.log(element);
        return <div key={index}>{element}</div>;
      })}
    </div>
  );
}
