import { useEffect, useState } from "react";
import { TodoForm, TodoItem, PopUp, Navbar } from "./components";
import { TodoProvider, AuthProvider } from "./contexts";
import { collection, query, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, limit } from "firebase/firestore";
import { db } from "./Firebase/FirebaseConfig";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth"

function App() {
  const isClose = false;
  const [openPopup, setOpenPopup] = useState(false);
  const HandleRemovePopUp = () => setOpenPopup(false);
  
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // const [isDeleting, setIsDeleting] = useState(false);
  
  const [latestTodo, setLatestTodo] = useState({});
  const [latestTodoId, setLatestTodoId] = useState(null);

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

  useEffect(()=>{
    if(!isOnline) setUser(null);
  },[isOnline])

  const addTodo=(todo)=>{
    const newTodo = {id: Date.now(), ...todo}
    setLatestTodo(newTodo);
    console.log("addTodo called");
    setTodos((prev)=> [newTodo,...prev])
  }

  const updateTodo=async(id,todo)=>{
    if(user && isOnline){
      try {
        const querySnapshot = await getDocs(collection(db, user.email));

        querySnapshot.forEach(async (docSnapshot) => {
        const docData = docSnapshot.data();

        if (docData.id === id) { 
          console.log(`Found document with ID: ${docSnapshot.id}`);
          console.log("Document data:", docData);
          const todoRef = doc(db, user.email, docSnapshot.id);

          await updateDoc(todoRef, { ...todo });
          console.log(`Todo updated successfully from Firestore.`);
        }
      });
      (async ()=>{
        try {
          const q = query(collection(db, user.email), orderBy("id", "desc"));
          const querySnapshot = await getDocs(q);
          const dataList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTodos(dataList);
          if(dataList.length>0) setLatestTodoId(dataList[0].id);
          console.log(dataList)
        } 
        catch (error) {
          console.error("Error fetching data: ", error);
        }
      })();
       
      } catch (error) {
        console.error("Error updating todo from Firestore: ", error);
      }
    }
    else{
      setTodos((prev)=>
        prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
    }
  }

  const deleteTodo=async(id)=>{

    // setIsDeleting(true);
    if (user && isOnline) {
      try {
        const querySnapshot = await getDocs(collection(db, user.email));

        querySnapshot.forEach(async (docSnapshot) => {
        const docData = docSnapshot.data();

          if (docData.id === id) { 
            console.log(`Found document with ID: ${docSnapshot.id}`);
            console.log("Document data:", docData);
            const todoRef = doc(db, user.email, docSnapshot.id);

            await deleteDoc(todoRef);
            console.log(`Todo deleted successfully from Firestore.`);
          }
        });
        (async ()=>{
          try {
            const q = query(collection(db, user.email), orderBy("id", "desc"));
            const querySnapshot = await getDocs(q);
            const dataList = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setTodos(dataList);
            if(dataList.length>0) setLatestTodoId(dataList[0].id);
            console.log(dataList)
          } 
          catch (error) {
            console.error("Error fetching data: ", error);
          }
        })();
       
      } catch (error) {
        console.error("Error deleting todo from Firestore: ", error);
      }
    }
    else{
      setTodos((prev)=> prev.filter((todo)=> todo.id !== id));
    }
  }

  const toggleComplete=async(id)=>{
    if(user && isOnline){
      try {
        const querySnapshot = await getDocs(collection(db, user.email));

        querySnapshot.forEach(async (docSnapshot) => {
        const docData = docSnapshot.data();

        if (docData.id === id) { 
          console.log(`Found document with ID: ${docSnapshot.id}`);
          console.log("Document data:", docData);
          const todoRef = doc(db, user.email, docSnapshot.id);

          await updateDoc(todoRef, { completed: !docData.completed });
          console.log(`Todo marked successfully from Firestore.`);
        }
      });

      (async ()=>{
        try {
          const q = query(collection(db, user.email), orderBy("id", "desc"));
          const querySnapshot = await getDocs(q);
          const dataList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTodos(dataList);
          if(dataList.length>0) setLatestTodoId(dataList[0].id);
          console.log(dataList)
        } 
        catch (error) {
          console.error("Error fetching data: ", error);
        }
      })();
       
      } catch (error) {
        console.error("Error marking todo from Firestore: ", error);
      }
    }
    else{
      setTodos((prev)=> 
        prev.map((prevTodo)=> 
          (prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
    }
  }

  useEffect(()=>{
    if(user && isOnline){
      (async ()=>{
        try {
          const q = query(collection(db, user.email), orderBy("id", "desc"));
          const querySnapshot = await getDocs(q);
          const dataList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTodos(dataList);
          if(dataList.length>0) setLatestTodoId(dataList[0].id);
          console.log(dataList)
        } 
        catch (error) {
          console.error("Error fetching data: ", error);
        }
      })();
    }
    else{
      const todos= JSON.parse(localStorage.getItem("todo"))

      if(todos && todos.length>0){
        setTodos(todos)
      }
    }
  },[user,isOnline])

  useEffect(()=>{
    if(user && isOnline ){
      (async ()=>{
        try {
          const currTodo = todos[0];
          const currTodoId = currTodo?.id;
          
          if(latestTodo.id && latestTodo.id !== latestTodoId){
            await addDoc(collection(db, user.email), latestTodo);
            latestTodo({});
            console.log("Todo added successfully to Firestore.");
          }
          else{
            console.log("No new todos to add to Firestore.");
          }

        } catch (error) {
          console.error("Error saving todo to Firestore: ", error);
        }
      })();
    }
    else{ 
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  },[todos,isOnline,user,latestTodo])

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
