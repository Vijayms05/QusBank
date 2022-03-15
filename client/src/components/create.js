import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    op1: "",
    op2: "",
    op3: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ name: "", op1: "", op2: "", op3: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Question</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Question</label>
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
        <div className="form-group">
          <input
            type="submit"
            value="Create Question"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
