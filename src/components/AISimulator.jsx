import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ErrorBoundary from "./ui/ErrorBoundary";

const AISimulator = () => {
    const [isActive, setIsActive] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { 
            role: "assistant", 
            text: "Welcome to the Structify Engineering Console. I am the architectural assistant for your data structure simulations. How can I assist your learning today?" 
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current && isActive) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading, isActive]);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            const model = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";
            
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `You are an expert AI assistant for "Structify", an advanced data structure visualizer. Explain the following concept clearly and concisely for an architecture/engineering student: ${userMessage}` }] }],
                    }),
                }
            );

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I encountered a diagnostic error. Please try again.";
            
            setMessages(prev => [...prev, { role: "assistant", text: aiResponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "error", text: "Connection to the diagnostic core failed. Please check your network." }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isActive) {
        return (
            <div className="h-full w-full min-h-[400px] flex flex-col justify-between p-8 bg-white relative overflow-hidden text-[#2A2D2E] font-sans">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-[#EBEBEB]">
                    <div className="flex gap-4 items-center">
                        <div className="bg-[#F7F9F9] p-3 rounded-sm border border-[#EBEBEB]">
                            <span className="bi bi-robot text-primary flex"></span>
                        </div>
                        <div>
                            <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">Structify AI</div>
                            <p className="text-[0.6rem] text-[#8C8C8C] tracking-widest uppercase mt-1">
                                Diagnostic Assistant
                            </p>
                        </div>
                    </div>
                    <span className="text-[0.6rem] text-primary flex items-center gap-1 font-bold tracking-widest uppercase">
                        <span className="bi bi-circle-fill text-[6px] animate-pulse"></span> Active
                    </span>
                </div>

                {/* Dummy Content for Visual Appeal */}
                <div className="my-10 flex flex-col gap-6 opacity-40">
                    <div className="flex flex-col gap-2">
                         <div className="h-2 w-24 bg-[#EBEBEB] rounded-full"></div>
                         <div className="h-12 w-full border border-[#EBEBEB] border-l-2 border-l-primary bg-[#F7F9F9] rounded-sm"></div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                         <div className="h-2 w-24 bg-[#EBEBEB] rounded-full"></div>
                         <div className="h-12 w-[80%] border border-[#EBEBEB] bg-white rounded-sm"></div>
                    </div>
                </div>

                {/* The Functional Button */}
                <div className="mt-auto pt-8 border-t border-[#EBEBEB]">
                    <button 
                        onClick={() => setIsActive(true)}
                        className="w-full flex items-center justify-center gap-3 text-[#2A2D2E] hover:text-primary transition-colors py-4 group cursor-pointer"
                    >
                        <span className="bi bi-arrow-right text-xl group-hover:translate-x-2 transition-transform"></span>
                        <span className="text-[0.85rem] font-bold tracking-[0.15em] uppercase" style={{ fontFamily: '"Manrope", sans-serif' }}>Test AI Simulator</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full min-h-[500px] flex flex-col bg-surface-container-lowest shadow-[0_20px_60px_rgba(45,52,53,0.12)] rounded-sm border-[0.5px] border-[#EBEBEB] relative overflow-hidden font-sans">
            {/* Terminal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#EBEBEB] bg-[#F7F9F9]">
                <div className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[0.65rem] font-bold text-[#2A2D2E] tracking-[0.2em] uppercase">AI Simulator Console</span>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setIsActive(false)} className="text-[0.6rem] font-bold text-[#B0B0B0] hover:text-primary tracking-widest uppercase transition-colors">Reset</button>
                    <div className="flex gap-1.5 items-center">
                        <div className="w-2 h-2 rounded-full bg-[#EBEBEB]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#EBEBEB]"></div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
                {messages.map((msg, index) => (
                    <div 
                        key={index}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <span className="text-[0.6rem] font-bold text-[#B0B0B0] tracking-widest uppercase mb-2">
                            {msg.role === 'user' ? 'ENGINEER_INPUT' : 'SYSTEM_RESPONSE'}
                        </span>
                        <div 
                            className={`p-5 rounded-sm max-w-[90%] text-[0.9rem] leading-relaxed shadow-sm
                                ${msg.role === 'user' 
                                    ? 'bg-white border border-[#EBEBEB] italic font-serif' 
                                    : msg.role === 'error'
                                        ? 'bg-red-50 text-red-600 border border-red-100'
                                        : 'bg-surface-container-low border-l-2 border-primary'
                                }`}
                        >
                            {msg.role === 'user' ? (
                                <p>{msg.text}</p>
                            ) : (
                                <ErrorBoundary fallbackText={msg.text}>
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
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex flex-col items-start animate-pulse">
                        <span className="text-[0.6rem] font-bold text-[#B0B0B0] tracking-widest uppercase mb-2 text-primary">Synthesizing...</span>
                        <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-primary animate-shimmer"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form 
                onSubmit={handleAsk}
                className="p-6 border-t border-[#EBEBEB] bg-white flex gap-4"
            >
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter architectural query..."
                    className="flex-1 bg-[#F7F9F9] border border-[#EBEBEB] px-6 py-3 text-[0.9rem] italic font-serif focus:outline-none focus:border-primary transition-colors text-[#2A2D2E]"
                />
                <button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-[#2A2D2E] text-white px-8 py-3 text-[0.65rem] font-bold tracking-[0.2em] uppercase hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    Inquire
                </button>
            </form>
        </div>
    );
};

export default AISimulator;
