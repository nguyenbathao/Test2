import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoute() {
  const [oke, setOke] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('/api/v1/auth/user-auth');
      if (res.data.oke) {
        setOke(true);
      } else {
        setOke(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return oke ? <Outlet /> : <Spinner />;
}
