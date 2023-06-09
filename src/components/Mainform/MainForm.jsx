// import Button from "react-bootstrap/Button";
import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
// import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./formStyle.scss";

function MainForm() {
  // set initial state for title, designation, tech skills, and description
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [techSkills, setTechSkills] = useState("");
  const [description, setDescription] = useState("");
  const [t, setT] = useState(1);
  const [experience, setExperience] = useState("");

  // set initial state for project fields as an array of one empty object
  const [projects, setProjects] = useState([
    { title: "", techStack: "", shortDescription: "", duration: "" },
  ]);

  //for handling candidate name change
  const nameChangeHandler = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  //for handling candidate designation change..
  const designationChangeHandler = (e) => {
    setDesignation(e.target.value);
    console.log(designation);
  };
  //for handling skills change..
  const skillsChangeHandler = (e) => {
    setTechSkills(e.target.value);
    console.log(techSkills);
  };
  //forhandling description change..
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };
  const experienceChangeHandler = (e) => {
    setExperience(e.target.value);
    console.log(experience);
  };

  // function to add a new project field
  const handleAddProject = () => {
    console.log("project added", t + 1);
    setProjects([
      ...projects,
      { title: "", techStack: "", shortDescription: "" },
    ]);
  };

  //when a new project added.. via plus button
  const handleProjectChange = (event, index) => {
    const { name, value } = event.target;
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };
    setProjects(updatedProjects);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !experience || !designation || !techSkills || !description || !projects) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      // const response = await axios.post("https://03d3-49-249-44-114.in.ngrok.io/api/dev_profile_pdf", {
      //   name: name,
      //   experience: experience,
      //   designation: designation,
      //   techSkills: techSkills,
      //   description: description,
      //   projects: projects
      // })
      // console.log(response.data);

      var data = {
        name: name,
        designation: designation,
        experience: experience,
        techSKils: techSkills,
        description:
        description,
        projects: projects
      };

      //i just posted
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://5be3-49-249-44-114.in.ngrok.io/api/dev_profile_pdf",
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
        responseType: 'arraybuffer',
        data: data,
      };

      const response = await axios
        .request(config)

        console.log(response.data)
      const binaryString = String.fromCharCode.apply(null, new Uint8Array(response.data)); const base64String = btoa(binaryString); 
      let pdfWindow = window.open("")
      pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(base64String) + "'></iframe>")
    } catch (error) {
      console.log(error);
    }
  };

  const removeProject = (index) => {
    if (projects.length === 1) {
      console.log("No need to remove any project");
    } else if (projects.length > 1) {
      console.log("Remove button pressed of Project: ", index + 1);
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
      console.log(updatedProjects);
    }
  };

  return (
    <div>
      {/* //this is the div for user profile */}
      <div style={{ marginBottom: "9rem" }} className="mainFromdiv">
        <h2>Your Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* asking name of the candidate */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              onChange={nameChangeHandler}
              value={name}
              type="email"
              placeholder="Name"
              required
            />
            <Form.Text required className="text-muted"></Form.Text>
          </Form.Group>

          {/* asking designation of the candidate */}
          <Form.Group className="mb-3" controlId="formBasictext">
            <Form.Label>Designation: </Form.Label>
            <Form.Control
              required
              onChange={designationChangeHandler}
              value={designation}
              type="text"
              placeholder="Designation"
            />
          </Form.Group>

          {/* asking tech skills of the candidate */}
          <Form.Group className="mb-3" controlId="formBasictext">
            <Form.Label>TechSkills :</Form.Label>
            <Form.Control
              required
              onChange={skillsChangeHandler}
              value={techSkills}
              type="text"
              placeholder="TechSkills"
            />
          </Form.Group>

          {/* //EXPERINCE OF RHE CANDIATE */}
          <Form.Group className="mb-3" controlId="formBasictext">
            <Form.Label>Experience :</Form.Label>
            <Form.Control
              required
              onChange={experienceChangeHandler}
              value={experience}
              type="text"
              placeholder="Experience"
            />
          </Form.Group>

          {/* asking professional summary of the candidate */}
          <Form.Group className="mb-3" controlId="formBasictext">
            <Form.Label>Professional Summary : </Form.Label>
            <Form.Control
              required
              onChange={descriptionChangeHandler}
              description={description}
              type="text"
              placeholder="Professional Summary"
            />
          </Form.Group>

          {/* asking details about the project now    */}
          <div className="projectTitle">
            {/* heading about the project */}
            <h3 style={{ marginBottom: "2rem" }}>Project:-</h3>
            {/* detail about the project */}

            {projects.map((project, index) => (
              <div style={{ border: "1px" }} key={index}>
                <div>
                  <label>Project: </label>{" "}
                  <h6 style={{ display: "inline", margin: "2rem 0 2rem 0" }}>
                    {index + 1}
                  </h6>
                </div>

                <form>
                  <Form.Group className="mb-3" controlId="formBasictext">
                    {/* asking title of the project */}
                    <Form.Label>Title: </Form.Label>
                    <Form.Control
                      required
                      name="title"
                      value={project.title}
                      onChange={(event) => handleProjectChange(event, index)}
                      type="text"
                      placeholder="Title"
                    />
                  </Form.Group>

                  {/* asking duration of the candidate in the company */}
                  {/* not mandatory */}
                  <Form.Group className="mb-3" controlId="formBasictext">
                    <Form.Label>Duration: </Form.Label>
                    <Form.Control
                      required
                      name="duration"
                      value={project.duration}
                      onChange={(event) => handleProjectChange(event, index)}
                      type="text"
                      placeholder="Duration Here"
                    />
                  </Form.Group>

                  {/* asking technical skills of the candiate */}
                  <Form.Group className="mb-3" controlId="formBasictext">
                    <Form.Label>TechStack: </Form.Label>
                    <Form.Control
                      required
                      name="techStack"
                      value={project.techStack}
                      onChange={(event) => handleProjectChange(event, index)}
                      type="text"
                      placeholder="TechSkills"
                    />
                  </Form.Group>

                  {/* short description about the candidate */}
                  <Form.Group className="mb-3" controlId="formBasictext">
                    <Form.Label>ShortDescription: </Form.Label>
                    <Form.Control
                      required
                      name="shortDescription"
                      value={project.shortDescription}
                      onChange={(event) => handleProjectChange(event, index)}
                      type="text"
                      placeholder="Designation"
                    />
                  </Form.Group>
                </form>

                <div style={{ float: "right", cursor: "pointer" }}>
                  <button
                    onClick={() => removeProject(index)}
                    type="button"
                    class="btn btn-danger"
                  >
                    Remove Project
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "inline-block", cursor: "pointer" }}>
              <i onClick={handleAddProject} class="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <div>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="submitBtn"
            >
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default MainForm;
