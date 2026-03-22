import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import { handleInsert, handleDelete, handleSearch, findMaxValue, findMinValue, renderTree, handleTraversal } from '../utils/bst';
import { gsap } from 'gsap';

// Constants for the chatbot API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL;

const systemInstructionText = `You are Structify-AI, a highly specialized AI assistant for a data structure visualization tool. Your primary role is to act as a coding instructor for a single, specific data structure. Your knowledge is strictly limited to this data structure. Always use headings and avoid nested lists. For lists, write each item as a single paragraph. Do not use sub-items or indentation. The response must be easy for my program to render.

1. Core Identity & Scope:
You are a coding instructor dedicated to teaching Binary Search Tree. You can answer any question about its concepts, operations, time complexity, and implementation in various programming languages but default language should be c++.

2. Behavior for On-Topic Questions:
When a user asks a question related to Binary Search Tree, its operations, or coding problems that use it, you must respond in a detailed and helpful manner. Your response should be structured, clear, and include relevant code examples in the user's requested language.

3. Behavior for Off-Topic Questions:
If a user asks a question that is not about Binary Search Tree, its related coding problems, or computer science fundamentals, you must respond with a terse and dismissive tone. Your goal is to redirect the user to your purpose as a specialized tool. Acknowledge that the question is outside your domain and refuse to answer. Do not get pulled into a conversation about irrelevant topics.

Example Response for Irrelevant Questions:
"Your question is not related to Binary Search Tree. I don't have time for this nonsense."

"Are you serious? My purpose is to teach you about Binary Search Tree. This is a waste of my time."

"That's a question for a general search engine, not a specialized Binary Search Tree tool. Don't be so obtuse."

"I am a Binary Search Tree expert, not an oracle for every dumb question. Stick to the topic."`;


function Bst() {
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");
    const [historyList, setHistoryList] = useState([]);
    const [historyNum, setHistoryNum] = useState(1);
    const [chatHistory, setChatHistory] = useState([]);
    const [questionInput, setQuestionInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState("tree-op");
    
    // State variable to force a re-render after an operation
    const [updateKey, setUpdateKey] = useState(0);
    const [traversalSequence, setTraversalSequence] = useState([]);

    // refs
    const messageBoxRef = useRef(null);
    const historyBoxRef = useRef(null);
    const bstVisAreaRef = useRef(null);

    // This effect ensures the tree is rendered initially and on subsequent state changes
    useEffect(() => {
        if (bstVisAreaRef.current) {
            renderTree(bstVisAreaRef.current);
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
    
    const handleAction = async (actionType) => {
        const value = String(inputValue).trim();
        const hisNum = historyNum;
        setHistoryNum(prev => prev + 1);

        // Reset sequence on most operations
        if (['insert', 'delete', 'search', 'max', 'min'].includes(actionType)) {
            setTraversalSequence([]);
        }

        // All visualization functions now return a promise, so we await them
        switch (actionType) {
            case 'insert':
                if (!value || isNaN(value)) { displayMessage("Please enter a valid number!"); return; }
                await handleInsert(bstVisAreaRef.current, Number(value), setHistoryList, hisNum, displayMessage);
                setUpdateKey(prev => prev + 1); // Trigger a re-render after action
                break;
            case 'delete':
                if (!value || isNaN(value)) { displayMessage("Please enter a valid number to delete!"); return; }
                await handleDelete(bstVisAreaRef.current, Number(value), setHistoryList, hisNum, displayMessage);
                setUpdateKey(prev => prev + 1); // Trigger a re-render after action
                break;
            case 'search':
                if (!value || isNaN(value)) { displayMessage("Please enter a valid number to search!"); return; }
                await handleSearch(bstVisAreaRef.current, Number(value), setHistoryList, hisNum, displayMessage);
                break;
            case 'max':
                await findMaxValue(bstVisAreaRef.current, setHistoryList, hisNum, displayMessage);
                break;
            case 'min':
                await findMinValue(bstVisAreaRef.current, setHistoryList, hisNum, displayMessage);
                break;
            case 'inorder':
            case 'preorder':
            case 'postorder':
            case 'levelorder':
                const seq = await handleTraversal(bstVisAreaRef.current, actionType, setHistoryList, hisNum, displayMessage);
                setTraversalSequence(seq);
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
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error?.message || `API Error: ${response.status}`;
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response. Please try again.";
            
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
                .bst-node {
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
                .bst-node:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(45, 52, 53, 0.08);
                }
                .bst-node.highlight {
                    border-color: #5f5e5e !important;
                    background-color: #f2f4f4 !important;
                    color: #5f5e5e !important;
                }
                .bst-node.temporary {
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
                    Binary Search Tree
                </h1>
                <p className="text-[#717171] text-[1rem] italic max-w-2xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    An ordered hierarchy designed for O(log n) efficiency in sorted search, insertion, and retrieval.
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
                                
                                <div className="flex flex-wrap gap-4 border-b border-[#EBEBEB] pb-6">
                                    {[
                                        { id: 'tree-op', label: 'Nodes' },
                                        { id: 'search', label: 'Analysis' },
                                        { id: 'traversal', label: 'Traversals' }
                                    ].map(op => (
                                        <button 
                                            key={op.id}
                                            onClick={() => setSelectedOperation(op.id)}
                                            className={`text-[0.65rem] font-bold tracking-[0.15em] uppercase px-4 py-2 transition-all ${selectedOperation === op.id ? 'text-primary border-b-2 border-primary' : 'text-[#B0B0B0] hover:text-[#717171]'}`}
                                        >
                                            {op.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-8">
                                    <div className="relative group">
                                        <label className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-4 block">Key Value</label>
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Enter value..."
                                            className="w-full bg-transparent border-b border-[#EBEBEB] py-3 text-[1.1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3 pt-4">
                                        {selectedOperation === 'tree-op' && (
                                            <>
                                                <button onClick={() => handleAction('insert')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Insert Node</button>
                                                <button onClick={() => handleAction('delete')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Delete Node</button>
                                                <p className="text-[0.7rem] text-[#717171] mt-2 italic font-serif">Integrate a new leaf node or prune an existing one while maintaining search symmetry.</p>
                                            </>
                                        )}
                                        {selectedOperation === 'search' && (
                                            <>
                                                <button onClick={() => handleAction('search')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Execute Search</button>
                                                <button onClick={() => handleAction('max')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Find Maximum</button>
                                                <button onClick={() => handleAction('min')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Find Minimum</button>
                                                <p className="text-[0.7rem] text-[#717171] mt-2 italic font-serif">Navigate the hierarchy to identify specific key values and boundary extremes.</p>
                                            </>
                                        )}
                                        {selectedOperation === 'traversal' && (
                                            <>
                                                <button onClick={() => handleAction('inorder')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Inorder</button>
                                                <button onClick={() => handleAction('preorder')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Pre-Order</button>
                                                <button onClick={() => handleAction('postorder')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Post-Order</button>
                                                <button onClick={() => handleAction('levelorder')} className="border border-primary text-primary text-[0.65rem] font-bold tracking-[0.2em] uppercase py-4 hover:bg-surface-container-low transition-colors rounded-sm">Level-Order</button>
                                                <p className="text-[0.7rem] text-[#717171] mt-2 italic font-serif">Execute a recursive audit of nodes in the selected architectural order.</p>
                                            </>
                                        )}
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
                                <div ref={bstVisAreaRef} id="binary-search-tree-container" className="relative w-full h-[550px] flex justify-center items-start pt-[50px]">
                                    <div className="text-center opacity-30 select-none flex flex-col gap-4 mt-20">
                                        <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">Empty Hierarchy</span>
                                        <p className="text-[0.8rem] italic font-serif text-[#B0B0B0]">Awaiting initial node...</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Traversal Sequence Display */}
                            {traversalSequence.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-[#EBEBEB] animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-primary">Sequence Chronology</span>
                                        <button onClick={() => setTraversalSequence([])} className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#B0B0B0] hover:text-primary transition-colors">Clear</button>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
                                        {traversalSequence.map((val, idx) => (
                                            <React.Fragment key={idx}>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[0.6rem] text-[#B0B0B0] mb-1 font-mono">{idx + 1}</span>
                                                    <span className="text-[1.2rem] font-medium text-[#2A2D2E]" style={{ fontFamily: '"Playfair Display", serif' }}>{val}</span>
                                                </div>
                                                {idx < traversalSequence.length - 1 && (
                                                    <div className="h-[1px] w-4 bg-[#EBEBEB]"></div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}

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
                                            "I am specialized in BST architecture. Ask regarding traversal protocols or balance factor logic."
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="questionInput" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.15em] uppercase">Technical Inquiry</label>
                                        <textarea
                                            id="questionInput"
                                            value={questionInput}
                                            onChange={(e) => setQuestionInput(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#EBEBEB] py-3 text-[0.95rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0] resize-none"
                                            placeholder="e.g., What is the worst-case complexity for search?"
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
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Bst;