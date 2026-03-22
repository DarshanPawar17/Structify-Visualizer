import React, { useState, useEffect } from "react";

const ChatCard = () => {
  const chats = [
    {
      id: 1,
      question: "What makes hash tables so fast?",
      tag: "Hash Table",
      answer:
        "Hash functions map keys to array indices directly, providing O(1) average access time. Good hash functions minimize collisions.",
    },
    {
      id: 2,
      question: "Why are binary search trees efficient?",
      tag: "Binary Tree",
      answer:
        "BSTs allow O(log n) average search, insert, and delete operations when balanced, making them efficient for ordered data.",
    },
    {
      id: 3,
      question: "What is the advantage of linked lists?",
      tag: "Linked List",
      answer:
        "Linked lists allow dynamic memory allocation and efficient insert/delete operations compared to arrays.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // First show the question
    setShowAnswer(false);

    // Show the answer after 1s
    const showTimer = setTimeout(() => setShowAnswer(true), 1000);

    // Hide the answer after 3s
    const hideTimer = setTimeout(() => setShowAnswer(false), 3000);

    // Switch question after 4s
    const nextTimer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % chats.length);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [current, chats.length]);

  return (
    <div className="h-full w-full min-h-[400px] flex flex-col justify-between p-8 bg-surface-container-lowest shadow-[0_20px_60px_rgba(45,52,53,0.15)] rounded-md border-2 border-primary/20 relative overflow-hidden text-on-surface font-sans transition-all duration-300 hover:border-primary/50 hover:shadow-[0_30px_70px_rgba(45,52,53,0.2)]">
      {/* Decorative Top Highlight */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-outline-variant mt-2">
        <div className="flex gap-4 items-center">
          <div className="bg-surface-container-low p-3 rounded-sm">
            <span className="bi bi-robot text-primary flex"></span>
          </div>
          <div>
            <div className="title-md">Structify AI</div>
            <p className="label-sm text-on-surface opacity-60">
              Diagnostic Assistant
            </p>
          </div>
        </div>
        <span className="label-sm text-primary flex items-center gap-1">
          <span className="bi bi-circle-fill text-[8px] animate-pulse"></span> Active
        </span>
      </div>

      {/* Chat Content */}
      <div className="relative flex-1 my-8 overflow-hidden flex flex-col justify-center">
        {/* Question */}
        <div className="flex flex-col items-start gap-2 mb-6 w-full">
          <span className="label-sm text-on-surface opacity-60">Query System</span>
          <div className="bg-surface-container-low px-6 py-4 rounded-sm w-full border-l-2 border-primary">
            <p className="body-md">{chats[current].question}</p>
            <span className="label-sm text-primary mt-2 block tracking-widest">
              TARGET: {chats[current].tag}
            </span>
          </div>
        </div>

        {/* Answer (fade/slide in & out) */}
        <div
          className={`flex flex-col items-start gap-2 transform transition-all duration-700 w-full ${
            showAnswer
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="label-sm text-on-surface opacity-60 text-right w-full">Response</span>
          <div className="bg-surface px-6 py-4 rounded-sm w-full border border-outline-variant">
            <p className="body-md">{chats[current].answer}</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-6 border-t border-outline-variant">
        <button className="w-full bg-primary hover:bg-primary-dim px-4 py-3 rounded-sm text-on-primary title-md transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-ambient">
          <span className="bi bi-arrow-right"></span>
          Test AI Simulator
        </button>
      </div>
    </div>
  );
};

export default ChatCard;