import {createClient} from "@supabase/supabase-js";

const url = "https://xhbkxuieotpcsbsracby.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYmt4dWllb3RwY3Nic3JhY2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MDgzOTEsImV4cCI6MjA4MTk4NDM5MX0.drq8fdk7hFKcOVe5a9GZk_Ao_lQtIn8WZElx27Leu0s";

const supabase = createClient(url, key);

export default function uploadFile(file) {
    return new Promise(
        (resolve , reject) => {
            const timeStamp = Date.now();
            const fileName = timeStamp + "-" + file.name;
            supabase.storage.from("images").upload(fileName, file,{
                cacheControl: '3600',
                upsert: false,
                 }).then(
             () => {
                 const publicURL = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
                 console.log(publicURL);
                
             }
            ).catch((error)=>{
                reject(error);

        }
    )
}
);}

// console.log(file);
//         supabase.storage.from("images").upload(file.name, file,{
//             cacheControl: '3600',
//             upsert: false,
