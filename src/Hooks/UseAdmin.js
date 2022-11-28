import { useEffect, useState } from "react";

const UseAdmin = (email) => {
  const [isadmin, setIsAdmin] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://my-app-server.vercel.app/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.role);
        setLoading(false);
      });
  }, [email]);
  return [isadmin, loading];
};

export default UseAdmin;
