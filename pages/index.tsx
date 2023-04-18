import Image from 'next/image'

export default function Home() {
    return (
        <div className='bg-[#04081a] min-h-screen'>
            <div className="flex justify-center pr-14">
                <h1 className="title-gradient text-6xl md:text-8xl font-bold text-center italic px-1">
                    Andrew 
                </h1>
            </div>
            <div className ="flex justify-center pl-14">  
                <h1 className="title-gradient text-6xl md:text-8xl font-bold text-center italic px-1">
                    Schmitz
                </h1>
            </div>
            <div className="max-w-4xl mx-auto pt-10">
                <div className = "text-slate-300 font-semibold text-xl">
                    <p className=" ">I&apos;m a software developer creating &nbsp;
                        <a href= "https://www.promptgallery.app/" target ="_blank" className= "underline ">promptgallery.app</a>. 
                        I'm also studying Data Science at UCSD, but honestly, I hate it. I'm terrified of the idea 
                        of growing up and becoming a spreadsheet monkey or spending my life developing an algorithm to get
                        people to click on ads more. 
                    </p>
                    <p className = "pt-4">
                        Instead, I&apos;m working towards becoming some sort of entrepreneur. The process of creating a product,
                        getting told said product sucks, and iterating on it has a much better chance of getting me out of bed
                        in the morning. 
                    </p>
                </div>
            </div>
        </div>
    );
}


