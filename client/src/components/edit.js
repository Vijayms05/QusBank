import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    op1: "",
    op2: "",
    op3: ""
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      op1: form.op1,
      op2: form.op2,
      op3: form.op3,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Question</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Question: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="op1">Option 1: </label>
          <input
            type="text"
            className="form-control"
            id="op1"
            value={form.op1}
            onChange={(e) => updateForm({ op1: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="op2">Option 2: </label>
          <input
            type="text"
            className="form-control"
            id="op2"
            value={form.op2}
            onChange={(e) => updateForm({ op2: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="op3">Option 3: </label>
          <input
            type="text"
            className="form-control"
            id="op3"
            value={form.op3}
            onChange={(e) => updateForm({ op3: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Question"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
