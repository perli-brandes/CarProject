
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAvailable, deleteAvailable, getAvailable } from "../../features/reducer/availableSlice";
import { useEffect } from "react";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';










const Availabilitys=()=>{
  const navigate=useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();
    const {car} =  location.state ||null;
    console.log("car from Availabilitys",car);
    const [availability, setAvailability] = useState({
        startDate: "",
        endDate: "",
        car:car,
        
      });
      const [availList,setAvailList]=useState( [] )
      const [deleteAvailList,setDeleteAvailList]=useState( [] )
      
      const status=useSelector((state)=>state.available.status)
      let avails=useSelector((state)=>state.available.available)
      avails=avails.filter(a=>a.car.carId===car.carId)
      avails=avails.filter(a=>a.status==="active")
      const[existAvail,setExistAvail]=useState(avails)
      console.log("exist avail list:",existAvail)

      
      useEffect(() => {
        if (status === 'idle' && (!avails || avails.length === 0)) {
          console.log("bring avails from API")
          dispatch(getAvailable());
         
         
        }
       
        
      }, [dispatch, status, avails]);
    

    const handleAvailabilityChange=(e)=>{
        setAvailability({
            ...availability,
            [e.target.name]:e.target.value,
        })
    }

    
 const isDateRangeOverlap = (newStartDate, newEndDate) => {
  const list=[...availList, ...existAvail]
  return list.some(({ startDate, endDate }) => {
    const existingStart = new Date(startDate);
    const existingEnd = new Date(endDate);
    const newStart = new Date(newStartDate);
    const newEnd = new Date(newEndDate);

    return (
      (newStart >= existingStart && newStart <= existingEnd) || 
      (newEnd >= existingStart && newEnd <= existingEnd) || 
      (newStart <= existingStart && newEnd >= existingEnd) 
    );
  });
};

     const handleAddAvailability=()=>{
      const { startDate, endDate } = availability;
        if (availability.startDate && availability.endDate) {
          if (new Date(availability.startDate) > new Date(availability.endDate)) {
            alert("The end date must be after the start date!");
            return;
          }
          if (isDateRangeOverlap(startDate, endDate)) {
            alert("The dates overlap with existing availability. Please select other dates.");
            return;
          }
            setAvailList((prevList) => [...prevList, availability]);
            setAvailability({ startDate: "", endDate: "" ,car:car});
          }
     }

     const handleRemoveAvailability = (index) => {
        setAvailList((prevList) => prevList.filter((_, i) => i !== index));
      };
    
       const HandleRemoveExistAvailability=(index)=>{
        
        setDeleteAvailList((prevList)=>[...prevList,existAvail[index]])
        
        setExistAvail((prevList) => prevList.filter((_, i) => i !== index))
       }

       const handleSubmit=async(e)=>{
        e.preventDefault();
         try{
            
            console.log("avails",availList);
            if(availList!==null){
            for (const availability of availList) {
                console.log("new avail to API:",availability,"the car:",availability.car.carId);
              
               const newAvail= await dispatch(addAvailable(availability));
            
               console.log("newAvail",newAvail.payload);
               
               
              }}
             
             if(deleteAvailList!==null){
        for (const availability of deleteAvailList) {

            await dispatch(deleteAvailable(availability.id));
            setExistAvail(existAvail.filter(e=>e.id!==availability.id))
          

           
          }}
         
          alert("Changes saved successfully!");
        
         }catch (error) {
           
            alert("Error editing reservations:");
          }
       };
       const today = new Date().toISOString().split("T")[0];
      return(
      <form onSubmit={handleSubmit}>
    <div>
      
    <h3> Existing dates</h3>
    <ul>
        {existAvail.map((avail,index)=>(
            <li key={index}>
               from:  {avail.startDate}   to: {avail.endDate}
               <IconButton
      color="default"
      onClick={() => HandleRemoveExistAvailability(index)}
      aria-label="delete"
      sx={{
        color: 'black', 
        transition: 'transform 0.2s', 
        '&:hover': {
          transform: 'scale(1.2)', 
          backgroundColor: 'transparent', 
        },
      }}
    >
      <DeleteIcon />
    </IconButton>
            </li>
        ))
        }
    </ul>

      <h3>הוספת זמינות</h3>
      <label>start Date: </label>
        <input type="date" name="startDate" value={availability.startDate} onChange={handleAvailabilityChange}  min={today} />
        <label>end Date: </label>
        <input type="date" name="endDate" value={availability.endDate} onChange={handleAvailabilityChange}  min={today||availability.startDate}/>
        <button type="button" onClick={handleAddAvailability}> add date</button>
        <ul>
          {availList.map((avail, index) => (
            <li key={index}>
             from: {avail.startDate} to: {avail.endDate}
             <IconButton
      color="default"
      onClick={() => handleRemoveAvailability(index)}
      aria-label="delete"
      sx={{
        color: 'black', 
        transition: 'transform 0.2s', 
        '&:hover': {
          transform: 'scale(1.2)', 
          backgroundColor: 'transparent', 
        },
      }}
    >
      <DeleteIcon />
    </IconButton>
            </li>
          ))}
        </ul>
        <button type="submit">confirmation</button>
        </div>
      </form>

      )

};
export default Availabilitys