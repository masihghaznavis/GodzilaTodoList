import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import MainLayout from "../layouts/MainLayout"
import { getAllMembers } from "../api/MemberAPI"
import config from "../config";

function Home() {
  const [User, setUser] = useState({ name: 'Selcted User', avatar: '' });
  const [Users, setUsers] = useState([]);
  const [taskData, setTaskData] = useState({
    task: "",
    user: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

  };
  const AvatarSet = () => {
    if (User.avatar) {
      return (
        <div className="avatar">
          <div className="w-8 mask mask-squircle">
            <img src={`${config.FILES_ENDPOINT}${User.avatar}`} alt={`User ${User.avatar} Photo`} />
          </div>
        </div>
      )
    }
  }

  useEffect(() => {
    getAllMembers()
      .then(({ data }) => {
        setUsers(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return (
    <MainLayout>
      <div className="card bg-base-300 shadow-xl p-8 ">
        <section className="card-actions mx-auto pb-4">
          <label htmlFor="modal-create-task" className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> Create New Task</label>
        </section>

        <input type="checkbox" id="modal-create-task" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative bg-base-200 h-full">
            <label htmlFor="modal-create-task" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Create Task</h3>
            <div className="py-4">
              <form onSubmit={handleSubmit}>
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text">Task</span>
                  </label>
                  <input onChange={(e) => setTaskData({ ...taskData, task: e.target.value })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text">User Asign</span>
                  </label>
                  <div className="dropdown">
                    <label tabindex="0" className="btn m-1 px-12">
                      {AvatarSet()}
                      <p className="font-bold ml-3">{User.name}</p>
                    </label>
                    <ul tabindex="0" className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                      {Users && Users.map((user, index) => {
                        return (
                          <li key={index} onClick={(e) => {
                            setUser({ name: user.name, avatar: user.avatar })
                            setTaskData({ ...taskData, user: user.id })
                          }}>
                            <div>
                              <div className="avatar">
                                <div className="w-8 mask mask-squircle">
                                  <img src={`${config.FILES_ENDPOINT}${user.avatar}`} alt={`User ${user.avatar} Photo`} />
                                </div>
                              </div>
                              <p className="font-bold">{user.name}</p>
                            </div>
                          </li>)
                      })}

                      <li onClick={(e) => {
                        setUser({ name: 'Select User' })
                        setTaskData({ ...taskData, user: "" })
                      }}>
                        <div>
                          <div className="avatar placeholder">
                            <div className="bg-error-content text-neutral-content w-8 mask mask-squircle">
                              <span className="text-xs">X</span>
                            </div>

                          </div>
                          <p className="font-bold">Clear</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
                <div className="form-control mb-4">
                  <button className="btn btn-secondary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Title value={122} title="Tasks" />
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Users</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="https://daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  <section className="tasks">

                    <div className="task">
                      <div className="task-body">
                        <h2 className="card-title">My Task Here!</h2>

                        <div className="card-actions mt-3">
                          <button className="btn btn-sm btn-primary">Complete</button>
                          <button className="btn btn-sm btn-success"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /> </svg></button>
                          <button className="btn btn-sm btn-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg></button>
                        </div>
                      </div>
                    </div>
                    <div className="task">
                      <div className="task-body">
                        <h2 className="card-title">My Task Here!</h2>

                        <div className="card-actions mt-3">
                          <button className="btn btn-sm btn-primary">Complete</button>
                          <button className="btn btn-sm btn-success"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /> </svg></button>
                          <button className="btn btn-sm btn-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg></button>
                        </div>
                      </div>
                    </div>
                    <div className="task">
                      <div className="task-body">
                        <h2 className="card-title">My Task Here!</h2>

                        <div className="card-actions mt-3">
                          <button className="btn btn-sm btn-primary">Complete</button>
                          <button className="btn btn-sm btn-success"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /> </svg></button>
                          <button className="btn btn-sm btn-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg></button>
                        </div>
                      </div>
                    </div>
                    <div className="task">
                      <div className="task-body">
                        <h2 className="card-title">My Task Here!</h2>

                        <div className="card-actions mt-3">
                          <button className="btn btn-sm btn-primary">Complete</button>
                          <button className="btn btn-sm btn-success"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /> </svg></button>
                          <button className="btn btn-sm btn-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg></button>
                        </div>
                      </div>
                    </div>
                  </section>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

    </MainLayout>
  )
}

export default Home
