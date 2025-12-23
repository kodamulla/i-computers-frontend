import { createClient } from "@supabase/supabase-js";

const url = "https://xhbkxuieotpcsbsracby.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYmt4dWllb3RwY3Nic3JhY2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MDgzOTEsImV4cCI6MjA4MTk4NDM5MX0.drq8fdk7hFKcOVe5a9GZk_Ao_lQtIn8WZElx27Leu0s";

const supabase = createClient(url, key);

export async function uploadFile(file) {
    // Promise එකක් ලෙස හෝ async/await ලෙස ලියාගත හැක
    const timeStamp = Date.now();
    const fileName = timeStamp + "-" + file.name;

    try {
        // 1. ගොනුව Upload කිරීම
        const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // 2. Upload කළ නිවැරදි fileName එක භාවිතා කර Public URL එක ලබා ගැනීම
        const { data: urlData } = supabase.storage
            .from("images")
            .getPublicUrl(fileName); // මෙතන file.name වෙනුවට fileName භාවිතා කළ යුතුයි

        console.log("Public URL:", urlData.publicUrl);
        return urlData.publicUrl; // URL එක return කිරීම අනිවාර්යයි

    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}