import { useState } from 'react'
import axios from 'axios'
import uploadIcon from '/src/assets/images/upload.png'

const ChatbotContainer = () => {

    const [prompt, setPrompt] = useState(null);
    const [response, setResponse] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;



    function handleSubmit(event) {
        event.preventDefault();
        event.target.elements['userPrompt'].blur();
        const message = event.target.elements.userPrompt.value;
        setPrompt(message);
        setResponse(null);
        setLoading(true);
        event.target.elements.userPrompt.value = '';

        const customPrompt = `You are a professional AI medical assistant. Respond only to health-related questions. Format your response as HTML using <h2> for headings and <p> for short, clear paragraphs. Do NOT include <html> or <body> tags — only content. Be concise and sound like a professional doctor.

If the message is not health-related, respond with:
<p>I can only assist with health-related questions.</p>

Here is the user’s message: "${message}"`;

        async function fetchAIResponse() {
            try {
                const res = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
                    {
                        contents: [
                            {
                                parts: [
                                    {
                                        text: customPrompt
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!text) {
                    setResponse("Something went wrong. Please try again.");
                    return;
                }

                let i = 0;
                let currentText = "";

                const interval = setInterval(() => {
                    currentText += text[i];
                    setResponse(currentText);
                    i++;
                    if (i >= text.length) clearInterval(interval);
                }, 15);

            } catch (err) {
                console.error("Fetch error:", err);
                setResponse("Error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchAIResponse();
        setAnimationKey(prev => prev + 1);
    }

    return (
        <div className='chatbot-container animate'>
            <div className='chat-section'>
                {prompt ?
                    <div className='text-container' key={animationKey}>
                        <div className="user-text animate">{prompt}</div>
                        <div className="response-text animate">
                            {loading && <p className="loading-text">Generating response </p>}
                            {!loading && response && <div dangerouslySetInnerHTML={{ __html: response }} />}
                        </div>
                    </div>
                    : <h1 className='initial-text'>How may I help you?</h1>}
            </div>
            <form onSubmit={handleSubmit} className="control-section">
                <input name='userPrompt' id="expanding-input" placeholder="Type something..."></input>
                <button type='submit'><img className='send-button' src={uploadIcon} alt='send button' /></button>
            </form>
        </div>
    )
}

export default ChatbotContainer
