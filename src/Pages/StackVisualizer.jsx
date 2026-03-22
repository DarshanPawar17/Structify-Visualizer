import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import ErrorBoundary from '../components/ui/ErrorBoundary';

// Constants for the chatbot API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL;

const systemInstructionText = `You are Structify-AI, a highly specialized AI assistant for a data structure visualization tool. Your primary role is to act as a coding instructor for a single, specific data structure. Your knowledge is strictly limited to this data structure. Always use headings and avoid nested lists. For lists, write each item as a single paragraph. Do not use sub-items or indentation. The response must be easy for my program to render.

1. Core Identity & Scope:
You are a coding instructor dedicated to teaching Stack. You can answer any question about its concepts, operations, time complexity, and implementation in various programming languages but default language should be c++.

2. Behavior for On-Topic Questions:
When a user asks a question related to Stack, its operations, or coding problems that use it, you must respond in a detailed and helpful manner. Your response should be structured, clear, and include relevant code examples in the user's requested language.

3. Behavior for Off-Topic Questions:
If a user asks a question that is not about Stack, its related coding problems, or computer science fundamentals, you must respond with a terse and dismissive tone. Your goal is to redirect the user to your purpose as a specialized tool. Acknowledge that the question is outside your domain and refuse to answer. Do not get pulled into a conversation about irrelevant topics.

Example Response for Irrelevant Questions:
"Are you serious? My purpose is to teach you about Stack. This is a waste of my time."

"Your question is not related to Stack. I don't have time for this nonsense."

"That's a question for a general search engine, not a specialized Stack tool. Don't be so obtuse."

"I am a Stack expert, not an oracle for every dumb question. Stick to the topic."`;

function StackVisualizer() {
    const [stackArr, setStackArr] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [historyList, setHistoryList] = useState([]);
    const [historyNum, setHistoryNum] = useState(1);
    const [chatHistory, setChatHistory] = useState([]);
    const [questionInput, setQuestionInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Refs for GSAP animations and state tracking
    const messageBoxRef = useRef(null);
    const historyBoxRef = useRef(null);
    const stackVisRef = useRef(null);
    const prevStackLengthRef = useRef(0);
    
    // Custom message display function
    const displayMessage = (msg) => {
        setMessage(msg);
    };

    // GSAP animation for message box
    useEffect(() => {
        if (message) {
            if (window.gsap) {
                window.gsap.killTweensOf(messageBoxRef.current);
                window.gsap.fromTo(messageBoxRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
                window.gsap.to(messageBoxRef.current, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    delay: 2,
                    ease: 'power1.in',
                    onComplete: () => {
                        setMessage('');
                    }
                });
            }
        }
    }, [message]);

    // GSAP animation for history panel visibility
    useEffect(() => {
        if (window.gsap) {
            if (historyList.length > 0) {
                window.gsap.to(historyBoxRef.current, { opacity: 1, duration: 0.3, onStart: () => historyBoxRef.current.style.display = 'block' });
            } else {
                window.gsap.to(historyBoxRef.current, { opacity: 0, duration: 0.3, onComplete: () => historyBoxRef.current.style.display = 'none' });
            }
        }
    }, [historyList]);

    // Push function with animation logic
    const pushValue = () => {
        if (inputValue.trim() === '') {
            displayMessage("Please enter a number!");
            return;
        }
        if (stackArr.length >= 7) {
            displayMessage("Stack is full!");
            return;
        }
        
        const newValue = inputValue;
        setStackArr(prev => [...prev, { value: newValue, id: historyNum }]);
        setHistoryList(prev => [...prev, { id: historyNum, text: `Pushed value ${newValue} into the stack` }]);
        setHistoryNum(prev => prev + 1);
        setInputValue('');
    };

    // Corrected GSAP animation for newly pushed element
    useEffect(() => {
        if (window.gsap && stackArr.length > prevStackLengthRef.current) {
            const newElement = stackVisRef.current.lastElementChild;
            if (newElement) {
                window.gsap.from(newElement, {
                    x: -200,
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.out',
                });
            }
        }
        prevStackLengthRef.current = stackArr.length;
    }, [stackArr.length]);

    // Pop function with animation logic
    const popValue = () => {
        if (stackArr.length === 0) {
            displayMessage("Stack is empty!");
            return;
        }
        
        const poppedValue = stackArr[stackArr.length - 1].value;
        const poppedEle = stackVisRef.current.lastElementChild;
        
        if (window.gsap) {
            window.gsap.to(poppedEle, {
                x: 200,
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power1.in',
                rotate: 360,
                onComplete: () => {
                    setStackArr(prev => prev.slice(0, -1));
                    setHistoryList(prev => [...prev, { id: historyNum, text: `Popped value ${poppedValue} from the stack` }]);
                    setHistoryNum(prev => prev + 1);
                }
            });
        }
    };

    // Chatbot logic
    const handleAsk = async () => {
        if (!questionInput.trim()) {
            setChatHistory([{ role: 'error', text: 'Please enter a question first!' }]);
            return;
        }
        
        setIsLoading(true);
        setChatHistory([]); // Clear previous chat
        
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
        const requestBody = {
            contents: [{ role: "user", parts: [{ text: questionInput }] }],
            systemInstruction: { parts: [{ text: systemInstructionText }] }
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error?.message || `API Error: ${response.status}`;
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response. Please try again.";
            
            setChatHistory([
                { role: "user", text: questionInput || "" },
                { role: "model", text: String(answerText || "") }
            ]);
            
        } catch (error) {
            setChatHistory([{ role: 'error', text: `Failed to get answer: ${error.message}` }]);
        } finally {
            setIsLoading(false);
            setQuestionInput('');
        }
    };

    return (
        <div className='bg-surface min-h-screen text-on-surface font-sans'>
            <Navbar />
            
            {/* Title Section */}
            <section className="pt-24 pb-12 px-8 text-center">
                <div className="mb-6">
                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Structure Architecture</span>
                </div>
                <h1 className="text-[#2A2D2E] text-5xl sm:text-6xl lg:text-[4rem] tracking-tight mb-4" style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.1' }}>
                    Stack Visualizer
                </h1>
                <p className="text-[#717171] text-[1rem] italic max-w-2xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    A "Last-In, First-Out" (LIFO) protocol for depth-first operations and undo hierarchies.
                </p>
            </section>

            <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-8">
                <main className="flex flex-col gap-12">
                    
                    {/* Main Simulation Area */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Left Column: Operations (4 Cols) */}
                        <div className="lg:col-span-4 bg-surface-container-lowest p-10 border border-[#EBEBEB] shadow-ambient premium-hover">
                            <div ref={messageBoxRef} className="w-full h-8 text-center text-[0.65rem] font-bold tracking-widest uppercase text-primary opacity-0 pt-2 mb-4">
                                {message}
                            </div>
                            
                            <div className="flex flex-col gap-10">
                                <h3 className="text-[#2A2D2E] text-[0.7rem] font-bold tracking-[0.2em] uppercase border-b border-[#EBEBEB] pb-4">Control Interface</h3>
                                
                                <div className="relative group">
                                    <label htmlFor="stack-input" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-4 block">Numerical Value</label>
                                    <input
                                        id="stack-input"
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Enter value..."
                                        className="w-full bg-transparent border-b border-[#EBEBEB] py-3 text-[1.1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0]"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-focus-within:w-full"></div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={pushValue} 
                                        className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm"
                                    >
                                        Push (Insert)
                                    </button>
                                    <button 
                                        onClick={popValue} 
                                        className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm"
                                    >
                                        Pop (Remove)
                                    </button>
                                    <p className="text-[0.7rem] text-[#717171] mt-2 italic font-serif">
                                        Push a value onto the top or Pop the uppermost element (LIFO).
                                    </p>
                                </div>

                                <div ref={historyBoxRef} className="mt-4 opacity-0 hidden">
                                    <h3 className="text-[#2A2D2E] text-[0.7rem] font-bold tracking-[0.2em] uppercase border-b border-[#EBEBEB] pb-4 mb-4">Chronology</h3>
                                    <ul className="list-none flex flex-col gap-3 h-[180px] overflow-y-auto px-1 custom-scrollbar">
                                        {historyList.map((item, index) => (
                                            <li key={index} className="text-[0.75rem] text-[#717171] leading-relaxed flex gap-3 italic font-serif">
                                                <span className="text-primary not-italic font-sans font-bold">{item.id}.</span> {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Visualization (8 Cols) */}
                        <div className="lg:col-span-8 bg-white min-h-[500px] border border-[#EBEBEB] p-12 relative flex flex-col items-center">
                            <div className="mb-10 w-full">
                                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Live Simulation Area</span>
                                <div className="w-12 h-[1px] bg-[#EBEBEB] mt-4"></div>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-end w-full max-w-[400px]">
                                {stackArr.length === 0 && (
                                    <div className="flex flex-col items-center gap-4 text-[#B0B0B0] pb-20 text-center">
                                        <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase">Empty Stack</span>
                                        <p className="text-[0.8rem] italic font-serif">Awaiting initial sequence...</p>
                                    </div>
                                )}
                                
                                <div ref={stackVisRef} className="flex flex-col-reverse justify-start items-center gap-2 mb-10">
                                    {stackArr.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="w-full max-w-[300px] h-14 flex items-center justify-center text-[#2A2D2E] border border-[#EBEBEB] bg-[#F7F9F9] shadow-sm premium-hover relative transition-all"
                                        >
                                            <span className="text-xl font-medium tracking-tight">{item.value}</span>
                                            <div className="absolute top-0 right-0 p-1">
                                                <span className="text-[0.5rem] font-bold text-[#CCCCCC]">{item.id}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full h-2 bg-on-surface/5 border-t border-[#EBEBEB]"></div>
                            </div>

                            {/* Decorative Corner Brackets */}
                            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#EBEBEB]"></div>
                            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#EBEBEB]"></div>
                        </div>
                    </section>

                    {/* --- Chatbot Section: Mirroring ChatCard Architecture --- */}
                    <section className="mt-20 flex flex-col gap-12 w-full max-w-[1200px] mx-auto pb-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                            
                            {/* Chatbot Input: The "Inquiry" side */}
                            <div className="bg-white p-10 lg:p-14 border border-[#EBEBEB] shadow-ambient flex flex-col premium-hover">
                                <div className="mb-10">
                                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Intelligent Support</span>
                                    <h2 className="text-[#2A2D2E] text-3xl mt-4" style={{ fontFamily: '"Playfair Display", serif' }}>Ask Structify AI</h2>
                                </div>
                                
                                <div className="flex-1 flex flex-col gap-8">
                                    <div className="bg-[#F7F9F9] p-6 border-l-2 border-primary">
                                        <p className="text-[0.75rem] text-[#717171] leading-relaxed italic font-serif">
                                            "I am specialized in Stack architecture. Ask regarding depth-first traversals or LIFO logic."
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="questionInput" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.15em] uppercase">Technical Inquiry</label>
                                        <textarea
                                            id="questionInput"
                                            value={questionInput}
                                            onChange={(e) => setQuestionInput(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#EBEBEB] py-3 text-[0.95rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0] resize-none"
                                            placeholder="e.g., How does Push affect time complexity?"
                                            rows={4}
                                        ></textarea>
                                    </div>

                                    <button 
                                        onClick={handleAsk} 
                                        disabled={isLoading} 
                                        className="mt-6 w-full bg-[#2A2D2E] text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase py-5 hover:bg-[#5f5e5e] transition-all disabled:opacity-50 rounded-sm shadow-sm"
                                    >
                                            {isLoading ? 'Processing Query...' : 'Submit Inquiry'}
                                    </button>
                                </div>
                            </div>

                            {/* Chatbot Output: The "Response" side */}
                            <div className="bg-[#F7F9F9] p-10 lg:p-14 border border-[#EBEBEB] flex flex-col relative overflow-hidden">
                                <div className="mb-8">
                                    <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">AI Response Terminal</span>
                                    <div className="w-12 h-[1px] bg-[#EBEBEB] mt-4"></div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar min-h-[300px]">
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center h-full gap-6 animate-pulse">
                                            <div className="w-8 h-8 border-2 border-[#EBEBEB] border-t-primary rounded-full animate-spin"></div>
                                            <div className="text-[#B0B0B0] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Synthesizing Logic...</div>
                                        </div>
                                    ) : (
                                        <div id="outputArea" className="flex flex-col gap-6">
                                            {chatHistory.length === 0 && (
                                                <div className="h-full flex items-center justify-center opacity-30 select-none">
                                                    <span className="text-[5rem] font-serif" style={{ color: '#EBEBEB' }}>?</span>
                                                </div>
                                            )}
                                            {chatHistory.map((msg, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`p-6 rounded-sm text-[0.9rem] leading-relaxed ${msg.role === 'user' ? 'bg-white border border-[#EBEBEB] self-end max-w-[90%] font-serif italic' : 'bg-surface-container-lowest shadow-ambient self-start max-w-[95%] border-l-2 border-primary'}`}
                                                >
                                                    {msg.text ? (
                                                        msg.role === 'error' ? (
                                                            <p className="text-red-500 font-sans">{msg.text}</p>
                                                        ) : (
                                                            <ErrorBoundary fallbackText={msg.text || "Error loading message."}>
                                                                <div className="prose prose-sm font-serif text-[#2A2D2E] leading-relaxed tracking-tight">
                                                                    <ReactMarkdown 
                                                                        components={{
                                                                            p: ({node, ...props}) => <p className="mb-4 last:mb-0 italic" {...props} />,
                                                                            code: ({node, inline, ...props}) => 
                                                                                inline 
                                                                                ? <code className="bg-[#EBEBEB] px-1 py-0.5 rounded text-[0.85rem] font-mono non-italic" {...props} />
                                                                                : <code className="block bg-[#2A2D2E] text-[#F7F9F9] p-4 rounded-sm my-4 text-[0.85rem] font-mono non-italic overflow-x-auto" {...props} />,
                                                                            strong: ({node, ...props}) => <strong className="font-bold text-primary not-italic" {...props} />,
                                                                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                                                                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />
                                                                        }}
                                                                    >
                                                                        {String(msg.text || "")}
                                                                    </ReactMarkdown>
                                                                </div>
                                                            </ErrorBoundary>
                                                        )
                                                    ) : (
                                                        <p className="text-[#B0B0B0] italic">No content available...</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <span className="text-[6rem] font-serif">“</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default StackVisualizer;