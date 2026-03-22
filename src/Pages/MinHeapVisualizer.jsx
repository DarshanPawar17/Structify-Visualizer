import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import { handleInsert, handleExtractMin, heapArray, renderTree } from '../utils/minHeap';
import { gsap } from 'gsap';

// Constants for the chatbot API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL;

const systemInstructionText = `You are Structify-AI, a highly specialized AI assistant for a data structure visualization tool. Your primary role is to act as a coding instructor for a single, specific data structure. Your knowledge is strictly limited to this data structure. Always use headings and avoid nested lists. For lists, write each item as a single paragraph. Do not use sub-items or indentation. The response must be easy for my program to render.

1. Core Identity & Scope:
You are a coding instructor dedicated to teaching Min Heap. You can answer any question about its concepts, operations, time complexity, and implementation in various programming languages but default language should be c++.

2. Behavior for On-Topic Questions:
When a user asks a question related to Min Heap, its operations, or coding problems that use it, you must respond in a detailed and helpful manner. Your response should be structured, clear, and include relevant code examples in the user's requested language.

3. Behavior for Off-Topic Questions:
If a user asks a question that is not about Min Heap, its related coding problems, or computer science fundamentals, you must respond with a terse and dismissive tone. Your goal is to redirect the user to your purpose as a specialized tool. Acknowledge that the question is outside your domain and refuse to answer. Do not get pulled into a conversation about irrelevant topics.

Example Response for Irrelevant Questions:
"Your question is not related to Min Heap. I don't have time for this nonsense."

"Are you serious? My purpose is to teach you about Min Heap. This is a waste of my time."

"That's a question for a general search engine, not a specialized Min Heap tool. Don't be so obtuse."

"I am a Min Heap expert, not an oracle for every dumb question. Stick to the topic."`;


function MinHeapVisualizer() {
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");
    const [historyList, setHistoryList] = useState([]);
    const [historyNum, setHistoryNum] = useState(1);
    const [chatHistory, setChatHistory] = useState([]);
    const [questionInput, setQuestionInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [updateKey, setUpdateKey] = useState(0);


    // refs
    const messageBoxRef = useRef(null);
    const historyBoxRef = useRef(null);
    const heapVisAreaRef = useRef(null);

    // This effect ensures the tree is rendered initially and on subsequent state changes
    useEffect(() => {
        if (heapVisAreaRef.current) {
            renderTree(heapVisAreaRef.current);
        }
    }, [updateKey]);

    // display helper
    const displayMessage = (msg) => {
        setMessage(msg);
    };

    // message animation
    useEffect(() => {
        if (!message || !messageBoxRef.current) return;
        gsap.killTweensOf(messageBoxRef.current);
        const tl = gsap.timeline();
        tl.fromTo(
            messageBoxRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power1.out" }
        );
        tl.to(messageBoxRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.28,
            delay: 2,
            ease: "power1.in",
            onComplete: () => setMessage(""),
        });
        return () => tl.kill();
    }, [message]);

    // history panel animation (show/hide)
    useEffect(() => {
        if (!historyBoxRef.current) return;
        try {
            if (historyList.length > 0) {
                historyBoxRef.current.style.display = "flex";
                gsap.to(historyBoxRef.current, { opacity: 1, duration: 0.25 });
            } else {
                gsap.to(historyBoxRef.current, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => (historyBoxRef.current.style.display = "none"),
                });
            }
        } catch (e) {
            /* ignore */
        }
    }, [historyList]);
    
    // Centralized function to call the visualization logic
    const handleAction = async (actionType) => {
        const value = String(inputValue).trim();
        const hisNum = historyNum;
        setHistoryNum(prev => prev + 1);

        switch (actionType) {
            case 'insert':
                if (!value || isNaN(value)) {
                    displayMessage("Please enter a valid number!");
                    return;
                }
                await handleInsert(heapVisAreaRef.current, Number(value), setHistoryList, hisNum, displayMessage);
                setUpdateKey(prev => prev + 1);
                break;
            case 'delete':
                if (heapArray.length === 0) {
                    displayMessage("Heap is empty!");
                    return;
                }
                await handleExtractMin(heapVisAreaRef.current, setHistoryList, hisNum, displayMessage);
                setUpdateKey(prev => prev + 1);
                break;
            default:
                return;
        }
        setInputValue("");
    };

    // Chatbot logic
    const handleAsk = async () => {
        if (!questionInput.trim()) {
            setChatHistory([{ role: 'error', text: 'Please enter a question first!' }]);
            return;
        }
        
        setIsLoading(true);
        setChatHistory([]);
        
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
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
            
            setChatHistory([
                { role: "user", text: questionInput },
                { role: "model", text: answerText }
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
            <style>
                {`
                .heap-node {
                    width: 50px;
                    height: 50px;
                    background-color: #FFFFFF;
                    border: 1px solid #EBEBEB;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(45, 52, 53, 0.04);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #2A2D2E;
                    font-size: 1.1rem;
                    position: absolute;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    z-index: 10;
                }
                .heap-node:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(45, 52, 53, 0.08);
                }
                .heap-node.highlight {
                    border-color: #5f5e5e !important;
                    background-color: #f2f4f4 !important;
                    color: #5f5e5e !important;
                }
                .heap-node.temporary {
                    border-color: #886d52;
                    box-shadow: 0 20px 40px rgba(136, 109, 82, 0.15);
                }
                `}
            </style>
            <Navbar />
            
            {/* Title Section */}
            <section className="pt-24 pb-12 px-8 text-center">
                <div className="mb-6">
                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Structure Architecture</span>
                </div>
                <h1 className="text-[#2A2D2E] text-5xl sm:text-6xl lg:text-[4rem] tracking-tight mb-4" style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.1' }}>
                    Min Heap
                </h1>
                <p className="text-[#717171] text-[1rem] italic max-w-2xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    A complete recursive order where every origin is the point of minimum magnitude in its domain.
                </p>
            </section>

            <div className="w-full max-w-[1440px] mx-auto p-4 sm:p-8">
                <main className="flex flex-col gap-12">
                    
                    {/* Main Simulation Area */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Left Column: Operations (4 Cols) */}
                        <div className="lg:col-span-4 bg-surface-container-lowest p-10 border border-[#EBEBEB] shadow-ambient premium-hover flex flex-col">
                            <div ref={messageBoxRef} className="w-full h-8 text-center text-[0.65rem] font-bold tracking-widest uppercase text-primary opacity-0 pt-2 mb-4">
                                {message}
                            </div>
                            
                            <div className="flex flex-col gap-10">
                                <h3 className="text-[#2A2D2E] text-[0.7rem] font-bold tracking-[0.2em] uppercase border-b border-[#EBEBEB] pb-4">Control Interface</h3>
                                
                                <div className="flex flex-col gap-8">
                                    <div className="relative group">
                                        <label className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-4 block">Node Value</label>
                                        <input
                                            type="number"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Enter value..."
                                            className="w-full bg-transparent border-b border-[#EBEBEB] py-3 text-[1.1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3 pt-4">
                                        <button onClick={() => handleAction('insert')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Insert Node</button>
                                        <button onClick={() => handleAction('delete')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Extract Min</button>
                                        <p className="text-[0.7rem] text-[#717171] mt-2 italic font-serif">Add a value and bubble it up to maintain the Min-priority property.</p>
                                    </div>
                                </div>

                                <div ref={historyBoxRef} className="mt-8 opacity-0 hidden flex flex-col pt-8 border-t border-[#EBEBEB]">
                                    <h3 className="text-[#2A2D2E] text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-6">Chronology</h3>
                                    <ul className="list-none flex flex-col gap-4 h-[180px] overflow-y-auto custom-scrollbar">
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
                        <div className="lg:col-span-8 bg-white min-h-[650px] border border-[#EBEBEB] p-12 relative flex flex-col">
                            <div className="mb-10">
                                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Live Simulation Area</span>
                                <div className="w-12 h-[1px] bg-[#EBEBEB] mt-4"></div>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
                                <div ref={heapVisAreaRef} id="heap-visualization-area" className="relative w-full h-[550px] flex justify-center items-start pt-[50px]">
                                    <div className="text-center opacity-30 select-none flex flex-col gap-4 mt-20">
                                        <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Empty State</span>
                                        <p className="text-[0.8rem] italic font-serif text-[#B0B0B0]">Awaiting initial insertion...</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Corner Brackets */}
                            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#EBEBEB]"></div>
                            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#EBEBEB]"></div>
                        </div>
                    </section>

                    {/* --- Chatbot Section --- */}
                    <section className="mt-20 flex flex-col gap-12 w-full max-w-[1200px] mx-auto pb-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                            
                            {/* Chatbot Input */}
                            <div className="bg-white p-10 lg:p-14 border border-[#EBEBEB] shadow-ambient flex flex-col premium-hover">
                                <div className="mb-10">
                                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Intelligent Support</span>
                                    <h2 className="text-[#2A2D2E] text-3xl mt-4" style={{ fontFamily: '"Playfair Display", serif' }}>Ask Structify AI</h2>
                                </div>
                                
                                <div className="flex-1 flex flex-col gap-8">
                                    <div className="bg-[#F7F9F9] p-6 border-l-2 border-primary">
                                        <p className="text-[0.75rem] text-[#717171] leading-relaxed italic font-serif">
                                            "I am specialized in Min Heap architecture. Ask regarding priority queue management or node shifting algorithms."
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="questionInput" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.15em] uppercase">Technical Inquiry</label>
                                        <textarea
                                            id="questionInput"
                                            value={questionInput}
                                            onChange={(e) => setQuestionInput(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#EBEBEB] py-3 text-[0.95rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0] resize-none"
                                            placeholder="e.g., How does sift-down work in a Min Heap?"
                                            rows={4}
                                        ></textarea>
                                    </div>

                                    <button 
                                        onClick={handleAsk} 
                                        disabled={isLoading} 
                                        className="mt-4 bg-primary text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase py-5 hover:bg-on-surface transition-all disabled:opacity-50 rounded-sm"
                                    >
                                            {isLoading ? 'Processing Query...' : 'Submit Inquiry'}
                                    </button>
                                </div>
                            </div>

                            {/* Chatbot Output */}
                            <div className="bg-[#F7F9F9] p-10 lg:p-14 border border-[#EBEBEB] flex flex-col relative overflow-hidden">
                                <div className="mb-8">
                                    <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">AI Response Terminal</span>
                                    <div className="w-12 h-[1px] bg-[#EBEBEB] mt-4"></div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar min-h-[400px]">
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center h-full gap-6 animate-pulse">
                                            <div className="w-8 h-8 border-2 border-[#EBEBEB] border-t-primary rounded-full animate-spin"></div>
                                            <div className="text-[#B0B0B0] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Synthesizing Logic...</div>
                                        </div>
                                    ) : (
                                        <div id="outputArea" className="flex flex-col gap-6">
                                            {chatHistory.length === 0 && (
                                                <div className="h-full flex items-center justify-center opacity-10 select-none">
                                                    <span className="text-[6rem] font-serif">?</span>
                                                </div>
                                            )}
                                            {chatHistory.map((msg, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`p-6 rounded-sm text-[0.9rem] leading-relaxed ${msg.role === 'user' ? 'bg-white border border-[#EBEBEB] self-end max-w-[90%] font-serif italic' : 'bg-surface-container-lowest shadow-ambient self-start max-w-[95%] border-l-2 border-primary'}`}
                                                >
                                                    <ReactMarkdown className="prose prose-sm font-sans">{msg.text}</ReactMarkdown>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MinHeapVisualizer;