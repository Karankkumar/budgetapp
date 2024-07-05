import React from 'react'
import BackspaceIcon  from '@mui/icons-material/Backspace';
// import { Stack } from '@mui/material';
import {Button} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// for the adding a new expensse
const Addexpense = ({name , cost, index, deleteItem}) => {
  

  if(name !== "" && cost !== "")
  return (
    <>
    
      <div className='flex w-[60%] m-auto justify-between items-center my-4 shadow p-2 bg-slate-500 rounded text-white'>
          <span>{name}</span>
          <span>{cost}</span>
          <Button variant="contained" color='error' onClick={() => deleteItem(index)} >
              <BackspaceIcon/>
          </Button>
          
      </div>
    </>
  );
}

export default Addexpense;
