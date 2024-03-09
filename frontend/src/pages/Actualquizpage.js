import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PageVisibility from 'react-page-visibility'
import { useNavigate } from 'react-router'
const Actualquizpage = () => {
    const[visibility,setVisibility]=useState(true);
    const[timer,setTimer]=useState(2);
    const navigate=useNavigate();
    const handleVisibilityChange = isVisible=> {
        setVisibility(!isVisible);
    }
    useEffect(()=>{
        let intervalid
        if(visibility==false){
            // alert(timer);
            intervalid=setInterval(() => {
                let temp=timer-1;
                setTimer(temp);
            }, 1000);

        }
        else{
            setVisibility(true);
            clearInterval(intervalid);
                setTimer(2);
        }
    },[visibility])
    useEffect(()=>{
        if(timer===0){
            navigate('/quiz');
        }
    },[timer,navigate])
  return (
    <PageVisibility onChange={handleVisibilityChange}>
        <div>

    {/* <RotatingCarousel rotate={this.state.rotate} /> */}
    {
        visibility==false && 
        <div>
            {timer}
        </div>
        }
        {
            visibility==true && 
            <div>hello</div>
        }

        </div>
    </PageVisibility>
  )
}

export default Actualquizpage