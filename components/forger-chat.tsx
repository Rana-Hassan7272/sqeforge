"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, Minimize2, Maximize2, Bot, User, Lightbulb, BookOpen, HelpCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "explanation" | "question" | "general"
}

interface ForgerChatProps {
  isOpen: boolean
  onToggle: () => void
  initialContext?: string
  initialQuestion?: string
}

const quickPrompts = [
  {
    icon: <Lightbulb className="w-4 h-4" />,
    text: "Explain this in simple terms",
    prompt: "Can you explain this legal concept in very simple, everyday language that anyone can understand?",
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    text: "Give me an example",
    prompt: "Can you give me a practical, real-world example to help me understand this better?",
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    text: "Why is this important?",
    prompt: "Why is this legal principle important and how does it apply in practice?",
  },
]

// Sample AI responses for demonstration
const sampleResponses = {
  "contract formation": `Great question! Let me break down contract formation in really simple terms:

Think of a contract like making a deal with a friend. For it to be a proper, legally binding deal, you need these ingredients:

🤝 **Offer**: One person says "I'll do X for you"
✅ **Acceptance**: The other person says "Yes, I agree!"
💰 **Consideration**: Both people give something (money, services, promises)
📋 **Intention**: Both people actually mean to make a legal agreement

**Real example**: You offer to wash your neighbor's car for £20. They say "yes!" You both intend this to be a real deal, not just a joke. That's a contract!

The law just makes sure people keep their promises when they've made a proper agreement. Does this help clarify it?`,

  negligence: `Let me explain negligence like you're explaining it to a friend over coffee:

**Negligence** is basically when someone doesn't take reasonable care and someone else gets hurt because of it.

Think of it like this:
1. **Duty of Care**: You have a responsibility to be careful (like a driver should drive safely)
2. **Breach**: You don't meet that standard (like texting while driving)
3. **Causation**: Your carelessness directly causes harm (you crash into someone)
4. **Damage**: Someone actually gets hurt or loses something

**Simple example**: A shop owner doesn't clean up a spill. A customer slips and breaks their leg. The shop owner was negligent because they should have cleaned it up (duty), they didn't (breach), which caused the fall (causation), and the customer got injured (damage).

It's about taking reasonable care for others' safety. Make sense?`,

  consideration: `Let me make "consideration" super simple - it's one of those legal words that sounds scary but isn't!

**Consideration** = "What am I getting in return?"

For any contract to work, both sides need to give something. It doesn't have to be money - it can be:
- A promise ("I promise to paint your fence")
- An action ("I'll walk your dog")
- Not doing something ("I won't compete with your business")

**Easy example**: 
- You: "I'll give you £10"
- Friend: "I'll give you my old textbook"
- Both of you are giving something = consideration ✅

**Weird but true**: Even chocolate bar wrappers can be consideration! (This actually happened in a famous case - Chappell v Nestlé)

The law doesn't care if it's a fair trade, just that both people are giving *something*. Think of it as "no free lunches" - everyone has to bring something to the table!

Does that make it clearer?`,
}

export default function ForgerChat({ isOpen, onToggle, initialContext, initialQuestion }: ForgerChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hi! I'm Forger, your AI study assistant! 🤖

I'm here to help explain legal concepts in simple, everyday language. Whether you're stuck on a tricky question, need clarification on a topic, or want to understand why something matters - just ask!

I specialize in breaking down complex legal ideas into plain English that anyone can understand. What would you like to learn about today?`,
        timestamp: new Date(),
        type: "general",
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  // Handle initial question if provided
  useEffect(() => {
    if (initialQuestion && isOpen && messages.length === 1) {
      handleSendMessage(initialQuestion)
    }
  }, [initialQuestion, isOpen, messages.length])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for specific topics
    if (lowerMessage.includes("contract") && lowerMessage.includes("formation")) {
      return sampleResponses["contract formation"]
    }
    if (lowerMessage.includes("negligence")) {
      return sampleResponses["negligence"]
    }
    if (lowerMessage.includes("consideration")) {
      return sampleResponses["consideration"]
    }

    // Generic helpful responses
    if (lowerMessage.includes("explain") || lowerMessage.includes("what is")) {
      return `I'd be happy to explain that! Let me break it down in simple terms:

This is a key legal concept that comes up frequently in SQE exams. The basic idea is that the law tries to balance different interests and provide fair outcomes.

Could you tell me which specific legal topic or case you'd like me to explain? That way I can give you a more detailed, tailored explanation with practical examples that will help it stick in your memory!`
    }

    if (lowerMessage.includes("example")) {
      return `Great question! Examples are the best way to understand legal concepts. Let me give you a practical scenario:

Imagine you're dealing with an everyday situation - like buying something online, renting a flat, or even just parking your car. The law applies to all these situations in ways that make sense once you understand the principles.

Which specific legal area would you like an example for? I can create scenarios that show exactly how the law works in practice!`
    }

    // Default response
    return `That's a great question! I'm here to help explain legal concepts in the simplest way possible.

I can help you with:
📚 Breaking down complex legal principles
🔍 Explaining case law and why it matters  
💡 Giving practical examples
🎯 Clarifying SQE exam topics
❓ Answering "why" questions about the law

What specific topic would you like me to explain? The more specific you can be, the better I can tailor my explanation to help you understand!`
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(text),
        timestamp: new Date(),
        type: "explanation",
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card
        className={`border-border shadow-lg transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm">Forger AI</CardTitle>
                <p className="text-xs text-muted-foreground">Your study assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-card border border-border"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.role === "assistant" && (
                            <Bot className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          )}
                          {message.role === "user" && (
                            <User className="w-4 h-4 text-secondary-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-card border border-border rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-secondary" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(prompt.prompt)}
                      className="text-xs bg-transparent"
                    >
                      {prompt.icon}
                      <span className="ml-1">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about SQE topics..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send • Forger explains legal concepts in simple terms
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
