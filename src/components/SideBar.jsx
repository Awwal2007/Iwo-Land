import React from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

import { SlCalender } from "react-icons/sl";
import CategorySidebar from './CategoryContent';
import FacebookWidget from './FacebookWidget';
import useMediaQuery from './MediaQuery';
import FacebookPosts from './FacebookPosts';

const SideBar = () => {
    const [data, setData] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: '', status: 'sent' });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
      console.log(error);
      
    }
  };
  const isMobile = useMediaQuery('(maxWidth: 175px)')
  if(isMobile) return null
  return (
    <div style={{width: "100%",gap: "30px", display: "flex", flexDirection: "column"}}>
        <div>
            {/* <FacebookWidget /> */}
            <FacebookPosts />
        </div>
    </div>
  )
}

export default SideBar