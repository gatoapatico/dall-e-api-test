import OpenAI from "openai";
import { OPENAI_API_KEY } from "./env";

const outputImg = document.getElementById("output-img");

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

document.getElementById("submit-btn").addEventListener("click", () => {
    const prompt = document.getElementById("instruction").value
    generateImage(prompt)
})

async function generateImage(prompt) {

    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        style: 'vivid', //Only availble for DALL-E 3
        response_format: 'b64_json'
    });

    console.log(response);
    outputImg.innerHTML = `<img src="data:image/png;base64,${response.data[0].b64_json}">`;
}