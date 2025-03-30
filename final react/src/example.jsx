
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers,addUsers } from './assets/features/reducer/usersSlice';
import { getCars } from './assets/features/reducer/carSlice';


export default function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); // הנתונים מה-state
  const status = useSelector((state) => state.user.status); // סטטוס הבקשה
  const error = useSelector((state) => state.user.error);   // הודעת שגיאה במידת הצורך

  const dispatchCar = useDispatch();
  const cars = useSelector((state) => state.car.cars); // הנתונים מה-state
  const statusCar = useSelector((state) => state.car.status); // סטטוס הבקשה
  const errorCar = useSelector((state) => state.car.error);   // הודעת שגיאה במידת הצורך

    

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (statusCar === 'idle') {
      dispatchCar(getCars());
    }
  }, [statusCar, dispatchCar]);

  

  return (
    <div>
      <h2>Users List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li> // התאימי לפי השדות הקיימים
          ))}
       
      
        {cars.map((car)=>(
          <li key={car.carId}>{car.model}</li>
        ))}
      </ul>

       

      )}
    </div>
  );
}
