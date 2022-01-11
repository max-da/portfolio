/*     axios.get("/api/user").then((res)=> {console.log(res)}) */import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const send = useCallback(async () => {
    await axios.get("/api/user").then((res) => {
      
      setIsLoggedIn(res.data.user);
    });
  }, [isLoggedIn]);
  useEffect(() => {
    send();
  }, []);
  return { isLoggedIn };
};

export default useAuth;
