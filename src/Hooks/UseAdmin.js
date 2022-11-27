import { useEffect, useState } from "react";

const UseAdmin = (email) => {
  const [isadmin, setIsAdmin] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.role);
        setLoading(false);
      });
  }, [email]);
  return [isadmin, loading];
};

export default UseAdmin;
