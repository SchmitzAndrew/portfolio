import Head from 'next/head'
import Image from 'next/image'
import React from 'react';

import ReactCompareImage from 'react-compare-image';


export default function Qr() {
    return (
        <>
        <Head>
                <title>Andrew Schmitz</title>
                <meta name="description" content="Andrew Schmitz's portfolio." />
                <meta property="og:title" content="Andrew Schmitz" />
                <meta property="og:description" content="Andrew Schmitz's portfolio." />
        </Head>
        <div className='bg-[#04081a] min-h-screen'>
        <div className = "pt-4">
                    <div className="flex justify-center ">
                        <h1 className="title-gradient text-6xl md:text-8xl  text-center px-4 ">
                            Andrew Schmitz
                        </h1>
                    </div>
                </div>
            <div className = "p-6 pt-10 ">
                <ReactCompareImage 
                leftImage="images/qr_code.png " 
                leftImageCss={{ borderRadius: '1rem'}}
                rightImage='images/mountain_qr.jpg' 
                rightImageCss={{ borderRadius: '1rem' }}
                hover = {true}
                handleSize= {30}
                sliderLineWidth= {1}
                sliderPositionPercentage={.99}
                />;
            </div>
        </div>
        </>
    )
}