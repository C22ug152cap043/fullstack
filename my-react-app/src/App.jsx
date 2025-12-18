import { useState } from "react";

function App(){

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // CREATE POST
  async function sendName() {
    const res = await fetch("http://127.0.0.1:8000/save",{
      method: "POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify({name}),
    });
    setMsg("Saved successfully");
    setName("");
    loadUsers()
  }

  // READ (GET)
  async function loadUsers() {
    const res = await fetch("http://127.0.0.1:8000/user");
    const data = await res.json();
    setUsers(data.user);
  }

  // UPDATE (PUT)
  async function updateUser() {
    await fetch (`http://127.0.0.1:8000/user/${editId}`,{
    method: "PUT",
    headers: {"Content-type":"application/json"},
    body: JSON.stringify({name}),
    });
    setMsg("Updated successfully");
    setEditId(null);
    setName("");
    loadUsers();
  }

  // DELETE
  async function deleteUser(id) {
    await fetch (`http://127.0.0.1:8000/user/${id}` ,{
    method: "DELETE"

    });
    setMsg("deleted successfully");
    loadUsers();
  }

  
  return (
    <div style={{padding: "20px"}}>
    <h2>React + Fastapi + Supabase</h2>

    <input type="text" 
    placeholder="Enter name" 
    value={name} 
    onChange={(e) => setName(e.target.value)}
    />
    {editId ? (
      <button onClick={updateUser}>Update</button>
    ) : (
      <button onClick={sendName}>Save</button>
    )}
    <button onClick={loadUsers}>Load</button>
    <h3>{msg}</h3>
    {user.map((u) => (
      <div key={u.id}>
        <h3>{u.name}</h3>

        {/*EDIT -> PUT */}
        <button onClick={() =>{
          setEditId(u.id);
          setName(u.name);
        }}>
          Edit
        </button>
        
        {/*DELETE*/}
        <button onClick={() => deleteUser(u.id)}> Delete</button>
      </div>
    ))}
  </div>
  );
}
export default App;