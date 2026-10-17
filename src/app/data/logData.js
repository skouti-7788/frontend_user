import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { setNotification,setMessage} from "../redux/logSlice";
import api from '../../api/axios';
// import {jwtDecode} from "jwt-decode";
export  function useLog(){
  
    const dispatch = useDispatch()
    useEffect(() => {
    const fetchUsers = async () => {
      try {
        await api.get("users");
        // const mapped = res.data.map(b => ({
        //   id: b.id,
        //   username: b.username ?? "",
        //   email: b.email ?? "",
        // }));
        // dispatch(setUsers(mapped)) ;
        
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
     fetchUsers();
    
    }, []);
    
    useEffect(()=>{ },[]);
    const addUsers = async (users) => {
    try{
      const res = await api.post(
      "/register",{
            username: users.username ?? "",
            email: users.email ?? "",
            password: users.password ?? "",
            password_confirmation: users.password_confirmation ?? ""
      }
      );
      
      console.log(res.data)
      // dispatch(addUser(res.data)); 
      dispatch(setMessage(res.data.message))
      dispatch(setNotification(true))
    }catch(err){
      console.log(err)
    }
    
    try{
       const res = api.post('/adherents',
          {
          nom:users.username,
          email:  users.email,
          phone: '--', 
          datadahestion: new Date().toISOString().slice(0,10), 
          status:'inactive',
          // user_id:users.id,

          }
      )
          console.log(res.data)
    }catch(err){
          console.log(err)
    }
  };
  // const checkAdherents = async (users)=>{

  // try{
  //     console.log('users',users)
  //      const res = await api.put(
  //     `/adherents/${users.id}`,{
  //         nom: users.username,
  //         email: users.email,
  //         phone: '--', 
  //         datadahestion: new Date().toISOString().slice(0,10), 
  //         status:'inactive',
  //         user_id:users.id,

  //     }
  //     );
  //   }catch(err){console.log(err)}
  // }
  const verUser = async (user) => {
    // console.log(email,password)
     try {
    const res = await api.post("/login",
       { email:user.email ,password:user.password },
      );
      // console.log(res.data)
      if(res.data.user && res.data.token){
       localStorage.setItem('token', res.data.token);
       localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      dispatch(setMessage(res.data.message))
      // const token = localStorage.getItem("token");
      // if(res.data.token){
      // const data = jwtDecode(res.data.token);
      // console.log(data);
      // }
       
       
      // return res.data; 
  } catch (err) {
    console.error(err.response?.data);
  }
   
  }; 
  return { addUsers,verUser}
}

