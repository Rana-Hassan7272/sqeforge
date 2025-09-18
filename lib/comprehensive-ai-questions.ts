import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface ComprehensiveQuestion {
  id: string
  module: "FLK1" | "FLK2"
  topic: string
  subtopic: string
  difficulty: "Foundation" | "Intermediate" | "Advanced" | "Expert"
  scenario: string
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
    E: string
  }
  correctAnswer: "A" | "B" | "C" | "D" | "E"
  explanation: string
  legalPrinciple: string
  caseReferences: string[]
  statuteReferences: string[]
  timeLimit: number
  marks: number
}

// SQE Topic Structure for AI Generation
export const SQE_TOPIC_STRUCTURE = {
  FLK1: {
    "Contract Law": [
      "Formation of Contract",
      "Terms of Contract",
      "Vitiating Factors",
      "Discharge and Remedies",
      "Privity and Third Party Rights",
    ],
    "Tort Law": ["Negligence", "Occupiers' Liability", "Nuisance", "Defamation", "Economic Torts"],
    "Business Law and Practice": [
      "Starting a Business",
      "Company Formation",
      "Directors' Duties",
      "Corporate Governance",
      "Insolvency",
      "Employment Law",
    ],
    "Dispute Resolution": ["Civil Procedure", "Evidence", "Costs", "Appeals", "Alternative Dispute Resolution"],
    "Legal System": ["Courts and Judiciary", "Precedent", "Statutory Interpretation", "EU Law"],
    "Constitutional Law": ["Parliamentary Sovereignty", "Separation of Powers", "Judicial Review", "Human Rights"],
  },
  FLK2: {
    "Land Law": [
      "Registered Land",
      "Unregistered Land",
      "Freehold Estates",
      "Leasehold Estates",
      "Easements and Covenants",
      "Mortgages",
      "Co-ownership",
    ],
    Trusts: [
      "Express Trusts",
      "Resulting Trusts",
      "Constructive Trusts",
      "Trustees' Duties",
      "Breach of Trust",
      "Remedies",
    ],
    "Criminal Law": [
      "Actus Reus",
      "Mens Rea",
      "Homicide",
      "Non-fatal Offences",
      "Property Offences",
      "Defences",
      "Criminal Procedure",
    ],
    "Property Practice": [
      "Conveyancing Process",
      "Searches and Enquiries",
      "Exchange and Completion",
      "Leases",
      "Taxation",
    ],
    "Wills and Probate": ["Testamentary Capacity", "Formalities", "Intestacy", "Probate Process", "Inheritance Tax"],
    "Solicitors Accounts": ["Client Money Rules", "Accounting Records", "Interest", "Breaches"],
  },
}

// AI Question Generation Function
export async function generateComprehensiveQuestions(
  module: "FLK1" | "FLK2",
  topic: string,
  subtopic: string,
  count = 50,
): Promise<ComprehensiveQuestion[]> {
  try {
    const prompt = `Generate ${count} comprehensive SQE1 multiple choice questions for ${module} - ${topic} - ${subtopic}.

Each question should:
1. Have a realistic 100-200 word scenario based on current UK law
2. Test practical application of legal principles
3. Include 5 options (A-E) with plausible distractors
4. Have detailed explanations with case law and statute references
5. Vary in difficulty from Foundation to Expert level
6. Be suitable for SQE1 assessment standards

Format as JSON array with this structure:
{
  "id": "unique-id",
  "module": "${module}",
  "topic": "${topic}",
  "subtopic": "${subtopic}",
  "difficulty": "Foundation|Intermediate|Advanced|Expert",
  "scenario": "detailed scenario",
  "question": "clear question",
  "options": {
    "A": "option A",
    "B": "option B", 
    "C": "option C",
    "D": "option D",
    "E": "option E"
  },
  "correctAnswer": "A|B|C|D|E",
  "explanation": "detailed explanation with legal reasoning",
  "legalPrinciple": "key legal principle tested",
  "caseReferences": ["case1", "case2"],
  "statuteReferences": ["statute1", "statute2"],
  "timeLimit": 90-180,
  "marks": 1
}

Focus on current UK law, recent cases, and practical scenarios that test understanding rather than memorization.`

    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: prompt,
      maxTokens: 4000,
    })

    // Parse the AI response and return structured questions
    const questions = JSON.parse(text) as ComprehensiveQuestion[]
    return questions
  } catch (error) {
    console.error("Error generating AI questions:", error)
    return []
  }
}

// Generate questions for all topics
export async function generateAllSQEQuestions(): Promise<ComprehensiveQuestion[]> {
  const allQuestions: ComprehensiveQuestion[] = []

  for (const [module, topics] of Object.entries(SQE_TOPIC_STRUCTURE)) {
    for (const [topic, subtopics] of Object.entries(topics)) {
      for (const subtopic of subtopics) {
        try {
          const questions = await generateComprehensiveQuestions(
            module as "FLK1" | "FLK2",
            topic,
            subtopic,
            25, // 25 questions per subtopic
          )
          allQuestions.push(...questions)

          // Add delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 1000))
        } catch (error) {
          console.error(`Error generating questions for ${module} - ${topic} - ${subtopic}:`, error)
        }
      }
    }
  }

  return allQuestions
}

// Flashcard Generation
export async function generateFlashcards(module: "FLK1" | "FLK2", topic: string, count = 20) {
  const prompt = `Generate ${count} comprehensive flashcards for ${module} - ${topic}.

Each flashcard should:
1. Test key legal principles, cases, and statutes
2. Have clear, concise questions on the front
3. Provide detailed answers with case law and statutory references
4. Cover different difficulty levels
5. Focus on practical application

Format as JSON array:
{
  "id": "unique-id",
  "front": "question or concept",
  "back": "detailed answer with cases/statutes",
  "category": "subcategory",
  "difficulty": "Basic|Intermediate|Advanced",
  "module": "${module}",
  "topic": "${topic}"
}`

  try {
    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: prompt,
      maxTokens: 3000,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating flashcards:", error)
    return []
  }
}

// Mind Map Generation
export async function generateMindMap(module: "FLK1" | "FLK2", topic: string) {
  const prompt = `Generate a comprehensive mind map structure for ${module} - ${topic}.

Create nodes showing:
1. Central concept
2. Main branches (level 1)
3. Sub-branches (level 2)
4. Key connections between concepts
5. Visual positioning (x, y coordinates)

Format as JSON array of nodes:
{
  "id": "unique-id",
  "title": "concept title",
  "description": "brief description",
  "x": number,
  "y": number,
  "level": 0|1|2,
  "connections": ["connected-node-ids"],
  "color": "bg-color-class",
  "module": "${module}",
  "topic": "${topic}"
}`

  try {
    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: prompt,
      maxTokens: 2000,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating mind map:", error)
    return []
  }
}
