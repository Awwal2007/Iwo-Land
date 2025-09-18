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
            <form onSubmit={handleSubmit} id="demo">
                <FormControl>
                    <Input
                    sx={{ '--Input-decoratorChildHeight': '45px' }}
                    placeholder="search"
                    type="search"
                    required
                    value={data.email}
                    onChange={(event) =>
                        setData({ email: event.target.value, status: 'initial' })
                    }
                    error={data.status === 'failure'}
                    endDecorator={
                        <Button
                        variant="solid"
                        color="primary"
                        loading={data.status === 'loading'}
                        type="submit"
                        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        >
                        Search
                        </Button>
                    }
                    />
                    {data.status === 'failure' && (
                    <FormHelperText
                        sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                    >
                        Oops! something went wrong, please try again later.
                    </FormHelperText>
                    )}
                    {data.status === 'sent' && (
                    <FormHelperText
                        sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
                    >
                        You are all set!
                    </FormHelperText>
                    )}
                </FormControl>
            </form>
        </div>
        <div>
            <p>Upcoming Events</p>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{justifyContent: "center"}}><SlCalender size={25}/></div>
            <div><span style={{marginLeft: "10px", fontSize: "12px"}}>There are no upcoming events</span></div>
            
        </div>
        <div>
            <CategorySidebar />
        </div>
        <div>
            <FacebookWidget />
            {/* <FacebookWidget /> */}
        </div>
    </div>
  )
}

export default SideBar