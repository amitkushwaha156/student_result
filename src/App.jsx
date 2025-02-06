import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DeleteStudent, EditStudent, StudentData } from "./RTK/StudentSlice";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [edit, SetEdit] = useState(null);

  const dispatch = useDispatch();
  const GetData = useSelector((state) => state.Student.studentD);
  console.log(GetData);

  // const [students,setStudents]=useState([])

  const NameEle = useRef(null);
  const MathNum = useRef(null);
  const PhyNum = useRef(null);
  const CheNum = useRef(null);

  const formSubmit = (e) => {
    e.preventDefault();
    // get the form data
    const name = NameEle.current.value;
    const math = Number(MathNum.current.value);
    const physics = Number(PhyNum.current.value);
    const chemistry = Number(CheNum.current.value);
    const percentage = ((math + physics + chemistry) * 100) / 300;
    // console.log(Percentage.toFixed(2))

    if (name === "") {
      toast.error("Name is required");
      return;
    }
    if (math === 0  ) {
      toast.error("math number are required");
      return;
    }
    if (physics === 0) {
      toast.error("physics number are required");
      return;
    }
    if (chemistry === 0) {
      toast.error("chemistry number are required");
      return;
    }
    if (math >100  ) {
      toast.error("math number are Less or Equal 100");
      return;
    }
    if (physics >100) {
      toast.error("physics number are Less or Equal 100");
      return;
    }
    if (chemistry >100) {
      toast.error("chemistry number are Less or Equal 100");
      return;
    }

    const student = {
      id: Math.floor(Math.random() * 1000),
      name,
      math,
      physics,
      chemistry,
      percentage: percentage.toFixed(2),
    };
    if (edit !== null) {
      dispatch(EditStudent({ ...student, id: edit.id }));
      toast.success("Update student data");

      SetEdit(null);
    } else {
      dispatch(StudentData(student));
      toast.success("Add student data");
    }

    // setStudents([...students, student]);

    NameEle.current.value = "";
    MathNum.current.value = "";
    PhyNum.current.value = "";
    CheNum.current.value = "";
  };

  const handleEdit = (id) => {
    const EditStuData = GetData.find((item) => item.id === id);
    NameEle.current.value = EditStuData.name;
    MathNum.current.value = EditStuData.math;
    PhyNum.current.value = EditStuData.physics;
    CheNum.current.value = EditStuData.chemistry;

    SetEdit(EditStuData);
  };

  const handleDel = (id) => {
    // const restData=(GetData.filter((item)=>item._id!==key))
    // console.log(restData)
    dispatch(DeleteStudent(id));
    toast.error("Delete student data");

  };
  //  console.log(GetData)

  const sortedData = [...GetData].sort((a, b) => b.percentage - a.percentage);
  const top3 = sortedData.slice(0, 3);

  // console.log(top3)

  return (
    <>
      <div className="container mt-5">
        <ToastContainer />
        <div className="row">
          <div className="col-md-3">
            <h5>Student Information</h5>
            <hr></hr>
            <form onSubmit={formSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="Name"
                  ref={NameEle}
                  placeholder="Enter Name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Math</label>
                <input
                  type="number"
                  ref={MathNum}
                 
                  placeholder="Max Number 100"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Physics</label>
                <input
                  type="number"
                  ref={PhyNum}
                 
                  placeholder="Max Number 100"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Chemistry </label>
                <input
                  type="number"
                  ref={CheNum}
                 
                  placeholder="Max Number 100"
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-5">
            <h5>All Student Data</h5>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">SN</th>
                  <th scope="col">Name</th>
                  <th scope="col">Math</th>
                  <th scope="col">Physics</th>
                  <th scope="col">Chemistry</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {GetData.length > 0 ? (
                  GetData.map((item, index) => (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <th>{item.name}</th>
                      <th>{item.math}</th>
                      <th>{item.physics}</th>
                      <th>{item.chemistry}</th>
                      <th>
                        <button
                          type="button"
                          className="btn btn-danger mx-1"
                          onClick={() => handleDel(item.id)}
                        >
                          Del
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h5>Top 3 Result</h5>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">SN</th>
                  <th scope="col">Name</th>
                  <th scope="col">Percentage ( % )</th>
                  <th scope="col">Rank</th>
                </tr>
              </thead>
              <tbody>
                { top3.length>0? top3.map((item, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <th>{item.name}</th>
                    <th>{item.percentage} %</th>
                    <th>
                      {index + 1 === 1 ? (
                        <span>1st</span>
                      ) : index + 1 === 2 ? (
                        <span>2nd</span>
                      ) : (
                        <span>3rd</span>
                      )}
                    </th>
                  </tr>
                )):
                <tr>
                  <td colSpan="4" className="text-center">
                    No Data Found
                  </td>
                </tr>
              
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
