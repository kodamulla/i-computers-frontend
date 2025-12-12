
import {useState} from "react";
export default function test(){


    const [count, setCount] = useState(0);
    const[status,setStatus]= useState("🌞");
    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
           <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center ">
                <button className="w-[100px] h-[50px] bg-red-600 text-white"
                onClick={() => {
                     setCount(count - 1);
                }}>
                 Decrement

                </button>

                <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>
                <button className="w-[100px] h-[50px] bg-blue-600 text-white"
                onClick={() => {
                        setCount(count + 1);
                }}>
                 Increment

                </button>
            </div>
             <div className="w-[400px] h-[300px] shadow-2xl flex flex-col justify-center items-center ">
                <span className="h-[30px] text-2xl font-bold"
                >{status}</span>
                <div className="w-full h-[50px]border flex justify-center">
                    <button className="w-[100px] h-full text-white bg-red-600" 
                    onClick={
                        () => {
                            setStatus("🌚");
                    }

                    }>off</button> 
                    <button className="w-[100px] h-full text-white bg-green-600"
                    onClick={
                        ()=>{
                            setStatus("🌞")
                        }
                    }>on</button>

                    </div>
                
            </div>

        </div>
    )
}