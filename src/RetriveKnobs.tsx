import { useState, useEffect } from "react";

const SERVER_URL: string = "http://localhost:8080/knob/read";

interface Knob {
  Creation: string;
  KnobName: string;
  ForkOf: number;
  IsPublic: boolean;
  Identifier: string;
}

export default function RetriveKnobs() {
  const [knobs, setKnobs] = useState<Knob[]>([]);

  async function MakeRetriveKnobRequest() {
    try {
      const request = await fetch(`${SERVER_URL}`, {
        method: "POST",
        body: new URLSearchParams({
          api_key: localStorage.getItem("API_KEY")!,
        }),
      });
      if (!request.ok) {
        console.log("failed to make knob request");
        return;
      }
      const data = await request.json();
      setKnobs(data);
    } catch (error) {
      console.error("Error fetching knobs:", error);
    }
  }

  useEffect(() => {
    MakeRetriveKnobRequest();
  }, []);

  return (
    <div>
      {knobs.map((knob, index) => (
        <KnobComponent key={index} knob={knob} />
      ))}
    </div>
  );
}

function KnobComponent({ knob }: { knob: Knob }) {
  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <a href={`/knob/${knob.Identifier}`} className="card-title">{knob.KnobName}</a>
        <p>Created on: {new Date(knob.Creation).toLocaleString()}</p>
      </div>
    </div>
  );
}
