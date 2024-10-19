import { useEffect, useState } from "react";
import { TodoForm, TodoItem, PopUp, Navbar } from "./components";
import { TodoProvider, AuthProvider } from "./contexts";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase/FirebaseConfig";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth"

function App() {
  const isClose = true;
  const [openPopup, setOpenPopup] = useState(false);
  const HandleRemovePopUp = () => setOpenPopup(false);
  
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const auth = getAuth();
  useEffect(()=>{
    const auth=getAuth();
    const unsubscribe= onAuthStateChanged(auth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    });

    return ()=> unsubscribe();
  },[]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addTodo=(todo)=>{
    setTodos((prev)=> [{id: Date.now(), ...todo},...prev])
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=>
      prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
  }

  const deleteTodo=/*async*/(id)=>{
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
    // await deleteDoc(doc(db, "todos", id));
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=> 
      prev.map((prevTodo)=> 
        (prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
  }

  useEffect(()=>{
    const todos= JSON.parse(localStorage.getItem("todo"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(/*async*/()=>{
    
    // await addDoc(collection(db, "todos"), todos);
    user?(async ()=>{
      if(todos.length)
        addDoc(collection(db, user.email), todos[0]);
    })(): localStorage.setItem("todo", JSON.stringify(todos));
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <AuthProvider value={{user}}>
      <div className="bg-gray-800 min-w-full min-h-screen pb-8 align-top">
        {/* <Navbar user={user} /> */}
        <div className="flex flex-row justify-end min-w-full">
        {user? <p className="text-white text-center text-lg py-2">Welcome {user.email}</p> : null}
        <div className="flex py-2 px-5 gap-2">
          { (!isOnline || !user) ?
            (<>
            {/* <NavLink to="/todo_app/login"> */}
            <button onClick={() => !isClose?setOpenPopup(true): alert("underworking")} className="text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900">SignIn/SignUp</button>
            <div>
              <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
            </div>
            {/* </NavLink> */}
            {/* <NavLink to="/todo_app/signup"><button className="text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900">SignUp</button></NavLink> */}
            </>) :

            (<button className="text-white bg-blue-800 border-black rounded-lg px-3 py-1 hover:bg-blue-900"
              onClick={() => {
                signOut(auth).then(() => {
                  // Sign-out successful.
                  console.log("Sign-out successful.");
                }).catch((error) => {
                  // An error happened.
                  console.log("An error happened.", error);
                });
              }}
            >SignOut</button>)
          }
        </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-4 w-4/5 md:w-9/12 lg:w-3/5">
            <h1 className="text-white text-2xl font-bold text-center mb-8 mt-2">Manage Todos</h1>
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3 w-4/5 md:w-9/12 lg:w-3/5 ">
            {todos.map((todo)=>(
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      </AuthProvider>
    </TodoProvider>
  );
}

export default App;
