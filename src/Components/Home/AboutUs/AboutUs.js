import React from 'react';

const AboutUs = () => {
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <h1 style={{textAlign:'center', marginTop:'70px'}}>About Us</h1>
            <p style={{textAlign:'center', fontSize:'1.3rem', lineHeight:'30px', marginTop:'10px', width:'75%'}}>
                We are <span style={{border:'1px solid black', padding:'3px'}}>Game Zone</span> , an official game seller of Bangladesh. We have been providing with games since 2012. We are currently working with a lots of official game company like EA sports, Valve Corporation and many more. Why prefer us? We provide original games at the cheapest price in Banjgladesh and also worldwide. Happy Gaming !
            </p>
        </div>
    );
};

export default AboutUs;