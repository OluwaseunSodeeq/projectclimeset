"use client";
import { useState, useEffect, useRef } from "react";

function Cursor({ started }) {
  return (
    <span className="ml-1 animate-pulse text-dark-green">
      {started ? "|" : " Alyika is searching…"}
    </span>
  );
}

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Welcome 👋 What would you like to ask me today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false); // 👈 NEW
  const [userCity, setUserCity] = useState(null);

  const messagesEndRef = useRef(null);

  // User location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`,
        );
        const data = await res.json();
        setUserCity(data.city || data.locality);
      } catch {
        setUserCity(null);
      }
    });
  }, []);

  // Auto-scroll Effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===============================
  // ✨ STREAM + TYPEWRITER EFFECT
  // ===============================
  const streamResponse = async (res) => {
    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let fullText = "";
    let displayedText = "";

    const typingSpeed = 35;

    const typeWriter = async () => {
      while (true) {
        if (displayedText.length < fullText.length) {
          const char = fullText[displayedText.length];

          if (!hasStartedTyping) {
            setHasStartedTyping(true);
          }

          displayedText += char;

          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;

            if (updated[lastIndex]?.role === "bot") {
              updated[lastIndex].content = displayedText;
            }

            return updated;
          });

          let delay = typingSpeed;
          if ([".", ",", "!", "?", ":"].includes(char)) {
            delay += 120;
          }

          await new Promise((r) => setTimeout(r, delay));
        } else {
          await new Promise((r) => setTimeout(r, 10));
        }
      }
    };

    typeWriter();

    // 🔁 stream reader
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullText += chunk;
    }
  };

  // ===============================
  // 🚀 SEND MESSAGE
  // ===============================
  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");

    // reset typing state
    setHasStartedTyping(false);
    setIsTyping(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "bot", content: "" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          userCity,
        }),
      });

      await streamResponse(res);
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = "⚠️ Something went wrong.";
        return updated;
      });
    }

    setIsTyping(false);
  };

  return (
    <>
      {/* 💬 Messages */}
      <div className="flex-1 font-satoshi overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto bg-[#012f25] text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none shadow"
            }`}
          >
            {msg.content}

            {isTyping && i === messages.length - 1 && msg.role === "bot" && (
              <Cursor started={hasStartedTyping} />
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t-dark-green flex gap-2 bg-main-bg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about weather, climate and ..."
          className="flex-1 px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-[#012f25]"
        />
        <button
          onClick={sendMessage}
          disabled={isTyping}
          className="px-5 rounded-full bg-[#012f25] text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </>
  );
}
