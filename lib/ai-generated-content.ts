export interface AIGeneratedQuestion {
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
  caseReferences?: string[]
  statuteReferences?: string[]
  timeLimit: number
  marks: number
}

export interface AIFlashcard {
  id: string
  front: string
  back: string
  category: string
  difficulty: "Basic" | "Intermediate" | "Advanced"
  module: "FLK1" | "FLK2"
  topic: string
}

export interface AIMindMapNode {
  id: string
  title: string
  description: string
  x: number
  y: number
  level: number
  connections: string[]
  color: string
  module: "FLK1" | "FLK2"
  topic: string
}

// Comprehensive AI-Generated MCQ Questions for all SQE Topics
export const aiGeneratedQuestions: AIGeneratedQuestion[] = [
  // FLK1 - Contract Law - Formation
  {
    id: "flk1-contract-ai-001",
    module: "FLK1",
    topic: "Contract Law",
    subtopic: "Formation - Offer and Acceptance",
    difficulty: "Foundation",
    scenario:
      "TechCorp Ltd places an advertisement in a trade magazine stating 'We will pay £10,000 for any software that can process 1 million transactions per second.' DevSoft Ltd develops such software and delivers it to TechCorp's offices. TechCorp refuses to pay, arguing the advertisement was merely an invitation to treat, not a binding offer.",
    question: "Is TechCorp legally obligated to pay DevSoft the £10,000?",
    options: {
      A: "No, because advertisements are always invitations to treat under English law",
      B: "Yes, because this is a unilateral contract offer that was accepted by performance",
      C: "No, because there was no direct communication between the parties",
      D: "Yes, but only if DevSoft can prove they relied on the advertisement",
      E: "No, because the terms were too vague to constitute a valid offer",
    },
    correctAnswer: "B",
    explanation:
      "Following Carlill v Carbolic Smoke Ball Co [1893], advertisements can constitute unilateral offers when they contain clear, definite terms and indicate an intention to be bound. The specific performance requirement (1 million transactions per second) and definite reward (£10,000) distinguish this from a mere invitation to treat. DevSoft accepted by performing the required act.",
    legalPrinciple:
      "Unilateral contracts can be formed through advertisements containing specific terms and performance requirements",
    caseReferences: [
      "Carlill v Carbolic Smoke Ball Co [1893]",
      "Bowerman v Association of British Travel Agents [1996]",
    ],
    timeLimit: 90,
    marks: 1,
  },

  {
    id: "flk1-contract-ai-002",
    module: "FLK1",
    topic: "Contract Law",
    subtopic: "Consideration - Past Consideration",
    difficulty: "Intermediate",
    scenario:
      "Sarah helps her neighbor John move house over a weekend without any prior agreement about payment. The following week, John is so grateful that he promises to pay Sarah £500 for her help. When Sarah asks for the money a month later, John refuses to pay, claiming there was no valid consideration for his promise as Sarah's help was given before the promise was made.",
    question: "Can Sarah successfully claim the £500 from John?",
    options: {
      A: "Yes, because John's promise creates a binding moral obligation",
      B: "No, because past consideration is not valid consideration under English law",
      C: "Yes, if Sarah can prove she expected payment when helping",
      D: "No, unless the help was given at John's request",
      E: "Yes, because the promise was made in writing",
    },
    correctAnswer: "B",
    explanation:
      "Under the rule in Re McArdle [1951], past consideration (acts done before a promise is made) is generally not valid consideration. Sarah's help was completed before John's promise, so there is no valid consideration to support his promise. The exceptions in Lampleigh v Brathwait [1615] require the act to be done at the promisor's request and with expectation of payment.",
    legalPrinciple:
      "Past consideration is generally invalid unless it falls within the Lampleigh v Brathwait exception",
    caseReferences: ["Re McArdle [1951]", "Lampleigh v Brathwait [1615]", "Pao On v Lau Yiu Long [1980]"],
    timeLimit: 120,
    marks: 1,
  },

  // FLK1 - Tort Law - Negligence
  {
    id: "flk1-tort-ai-001",
    module: "FLK1",
    topic: "Tort Law",
    subtopic: "Negligence - Duty of Care",
    difficulty: "Advanced",
    scenario:
      "Dr. Williams, a consultant psychiatrist, is asked by the police to assess whether a suspect, David, poses a risk to public safety. Dr. Williams conducts a brief interview and concludes David is not dangerous. David is released and two days later attacks a stranger, Emma, causing serious injuries. Emma sues Dr. Williams for negligence, claiming he owed her a duty of care as a member of the public who might be harmed by David.",
    question: "Does Dr. Williams owe a duty of care to Emma under the Caparo test?",
    options: {
      A: "Yes, because harm to the public was clearly foreseeable",
      B: "No, because there was insufficient proximity between Dr. Williams and Emma",
      C: "Yes, because professionals always owe duties to those affected by their advice",
      D: "No, because it would not be fair, just and reasonable to impose liability",
      E: "Yes, because Dr. Williams assumed responsibility for public safety",
    },
    correctAnswer: "D",
    explanation:
      "While harm may be foreseeable (stage 1 of Caparo), and there may be some proximity through the police referral system (stage 2), the third stage requires it to be fair, just and reasonable to impose a duty. Following cases like Hill v Chief Constable of West Yorkshire [1989] and Palmer v Tees Health Authority [1999], courts are reluctant to impose duties on professionals toward unidentified members of the public, particularly where this might conflict with their primary professional duties or create indeterminate liability.",
    legalPrinciple:
      "The third stage of Caparo considers policy factors including the risk of indeterminate liability and conflicts with primary professional duties",
    caseReferences: [
      "Caparo Industries v Dickman [1990]",
      "Hill v Chief Constable of West Yorkshire [1989]",
      "Palmer v Tees Health Authority [1999]",
    ],
    timeLimit: 150,
    marks: 1,
  },

  // FLK1 - Business Law - Directors' Duties
  {
    id: "flk1-business-ai-001",
    module: "FLK1",
    topic: "Business Law and Practice",
    subtopic: "Directors' Duties - Conflicts of Interest",
    difficulty: "Expert",
    scenario:
      "Marcus is a director of both GreenEnergy Ltd and PowerTech Ltd, two competing renewable energy companies. GreenEnergy is considering acquiring a wind farm, and Marcus learns through his position that the seller is in financial difficulty and willing to accept a lower price. Marcus arranges for PowerTech to make a competing bid at the lower price, which is accepted. GreenEnergy's shareholders discover this and claim Marcus breached his duties. Marcus argues he was acting in PowerTech's best interests and disclosed his position to both boards.",
    question: "What is the most likely outcome of the shareholders' claim against Marcus?",
    options: {
      A: "No breach because Marcus disclosed his dual directorship to both companies",
      B: "Breach of s.175 Companies Act 2006 - duty to avoid conflicts of interest",
      C: "No breach because Marcus was acting in PowerTech's best interests",
      D: "Breach only if GreenEnergy can prove it suffered financial loss",
      E: "No breach because the information was publicly available",
    },
    correctAnswer: "B",
    explanation:
      "Under s.175 Companies Act 2006, directors must avoid situations where their personal interests or duties to another person conflict with their duties to the company. Marcus's position as director of both companies creates an inherent conflict - he cannot properly serve both companies' interests when they are competing for the same asset. The duty is strict and applies regardless of disclosure, good faith, or whether the company suffers loss. Authorization from disinterested directors might provide a defense, but mere disclosure is insufficient.",
    legalPrinciple: "Directors must avoid conflicts between their duties to different companies, even with disclosure",
    caseReferences: [
      "Aberdeen Railway Co v Blaikie Bros [1854]",
      "Boardman v Phipps [1967]",
      "Item Software (UK) Ltd v Fassihi [2004]",
    ],
    statuteReferences: ["Companies Act 2006, s.175"],
    timeLimit: 180,
    marks: 1,
  },

  // FLK2 - Land Law - Registered Land
  {
    id: "flk2-land-ai-001",
    module: "FLK2",
    topic: "Land Law",
    subtopic: "Registered Land - Overriding Interests",
    difficulty: "Advanced",
    scenario:
      "Alice owns registered land and grants her brother Ben a 10-year lease, but fails to register it. Ben moves in immediately and lives there openly. Two years later, Alice fraudulently sells the land to Carol, an innocent purchaser who inspects the property but finds it empty (Ben was on holiday). Carol registers the transfer. When Ben returns, he finds Carol has changed the locks and claims ownership. Ben argues his lease is an overriding interest under Schedule 3 para 1 of the Land Registration Act 2002.",
    question: "Can Ben successfully claim his lease as an overriding interest against Carol?",
    options: {
      A: "Yes, because leases over 7 years are automatically overriding interests",
      B: "No, because Ben was not in actual occupation when Carol inspected",
      C: "Yes, because Ben was in actual occupation at the time of the disposition",
      D: "No, because the lease should have been registered as a registrable disposition",
      E: "Yes, because Carol had constructive notice of Ben's rights",
    },
    correctAnswer: "D",
    explanation:
      "Under LRA 2002 s.27(2)(b), leases for more than 7 years are registrable dispositions that must be registered to take effect at law. Ben's 10-year lease should have been registered. While Schedule 3 para 1 protects interests of persons in actual occupation, this doesn't apply to interests that should have been registered as registrable dispositions. The policy is that major interests should be on the register for transparency. Ben may have an equitable lease, but it won't bind Carol as a registered proprietor for value.",
    legalPrinciple:
      "Registrable dispositions must be registered to gain priority, even if the holder is in actual occupation",
    caseReferences: ["Abbey National Building Society v Cann [1991]", "Link Lending Ltd v Bustard [2010]"],
    statuteReferences: ["Land Registration Act 2002, s.27, Schedule 3"],
    timeLimit: 150,
    marks: 1,
  },

  // FLK2 - Criminal Law - Mens Rea
  {
    id: "flk2-criminal-ai-001",
    module: "FLK2",
    topic: "Criminal Law and Practice",
    subtopic: "Mens Rea - Intention",
    difficulty: "Intermediate",
    scenario:
      "Tom throws a brick at a window to break it as a prank, knowing there are people inside the building but not intending to hurt anyone. The brick hits Sarah, causing serious head injuries. Tom is charged with causing grievous bodily harm with intent under s.18 Offences Against the Person Act 1861. Tom argues he only intended to break the window, not to cause harm to any person.",
    question: "Does Tom have the required mens rea for s.18 GBH?",
    options: {
      A: "Yes, because he intended to cause some harm by throwing the brick",
      B: "No, because he did not intend to cause grievous bodily harm specifically",
      C: "Yes, if the jury finds he foresaw serious harm as virtually certain",
      D: "No, because his primary intention was to break the window",
      E: "Yes, because he was reckless as to whether harm would result",
    },
    correctAnswer: "C",
    explanation:
      "Section 18 OAPA 1861 requires specific intent to cause grievous bodily harm or intent to resist arrest. Direct intent is absent here as Tom didn't want to harm anyone. However, under R v Woollin [1999], oblique intent can be found where the defendant foresaw the consequence as virtually certain and the jury considers it appropriate to find intent. If Tom foresaw serious harm as virtually certain from throwing a brick at people, the jury may infer intent. Mere recklessness is insufficient for s.18 (that would be s.20).",
    legalPrinciple:
      "Oblique intent under Woollin can satisfy the intent requirement for s.18 GBH where serious harm is foreseen as virtually certain",
    caseReferences: ["R v Woollin [1999]", "R v Nedrick [1986]", "R v Matthews and Alleyne [2003]"],
    statuteReferences: ["Offences Against the Person Act 1861, s.18"],
    timeLimit: 120,
    marks: 1,
  },
]

// Comprehensive AI-Generated Flashcards
export const aiGeneratedFlashcards: AIFlashcard[] = [
  // Contract Law Flashcards
  {
    id: "ai-contract-001",
    front: "What is the modern test for remoteness of damage in contract law?",
    back: "The test from Hadley v Baxendale (1854) as refined in The Heron II [1969]:\n\n1. Damage arising naturally from the breach (first limb)\n2. Damage reasonably in contemplation of parties at time of contract as probable result of breach (second limb)\n\nThe damage must be not unlikely to occur, not merely possible. More generous than tort remoteness test.",
    category: "Remedies",
    difficulty: "Intermediate",
    module: "FLK1",
    topic: "Contract Law",
  },

  {
    id: "ai-contract-002",
    front: "Explain the doctrine of economic duress and its requirements",
    back: "Economic duress makes contracts voidable where illegitimate pressure is applied.\n\nRequirements (Universe Tankships v ITWF [1983]):\n1. Illegitimate pressure\n2. Pressure was significant cause of entering contract\n3. No practical alternative but to submit\n4. Protest at time or shortly after\n\nMere commercial pressure insufficient - must be illegitimate threats.",
    category: "Vitiating Factors",
    difficulty: "Advanced",
    module: "FLK1",
    topic: "Contract Law",
  },

  // Tort Law Flashcards
  {
    id: "ai-tort-001",
    front: "What is the test for factual causation in negligence?",
    back: "The 'but for' test: 'But for the defendant's breach of duty, would the claimant have suffered the damage?'\n\nIf damage would have occurred anyway, causation fails (Barnett v Chelsea Hospital [1969]).\n\nExceptions for multiple sufficient causes (Fairchild v Glenhaven [2002]) and material contribution to risk in mesothelioma cases.",
    category: "Causation",
    difficulty: "Basic",
    module: "FLK1",
    topic: "Tort Law",
  },

  {
    id: "ai-tort-002",
    front: "Explain the principle of vicarious liability and when it applies",
    back: "Employer liable for employee's torts committed in course of employment.\n\nRequirements:\n1. Relationship of employment (not independent contractor)\n2. Tort committed in course of employment\n\nCourse of employment includes authorized acts and unauthorized modes of authorized acts, but not independent ventures (Salmond test). Extended to 'close connection' test for intentional wrongs (Lister v Hesley Hall [2001]).",
    category: "Vicarious Liability",
    difficulty: "Intermediate",
    module: "FLK1",
    topic: "Tort Law",
  },

  // Business Law Flashcards
  {
    id: "ai-business-001",
    front: "What are the seven statutory duties of directors under Companies Act 2006?",
    back: "1. Act within powers (s.171)\n2. Promote success of company (s.172)\n3. Exercise independent judgment (s.173)\n4. Exercise reasonable care, skill and diligence (s.174)\n5. Avoid conflicts of interest (s.175)\n6. Not accept benefits from third parties (s.176)\n7. Declare interest in proposed transactions (s.177)\n\nThese codify and extend common law fiduciary duties.",
    category: "Directors' Duties",
    difficulty: "Basic",
    module: "FLK1",
    topic: "Business Law and Practice",
  },

  // Property Law Flashcards
  {
    id: "ai-property-001",
    front: "What is the difference between legal and equitable interests in land?",
    back: "Legal interests:\n- Capable of existing at law (LPA 1925 s.1)\n- Must be created by deed (except short leases)\n- Bind the world\n- Enforceable against all successors\n\nEquitable interests:\n- All other interests in land\n- Can be created informally\n- Binding depends on registration/notice\n- Subject to doctrine of notice in unregistered land",
    category: "Legal vs Equitable",
    difficulty: "Basic",
    module: "FLK2",
    topic: "Land Law",
  },

  // Criminal Law Flashcards
  {
    id: "ai-criminal-001",
    front: "What is the difference between specific and basic intent crimes?",
    back: "Specific intent crimes:\n- Require intention as to consequence\n- Voluntary intoxication can negate mens rea\n- Examples: murder, theft, s.18 GBH\n\nBasic intent crimes:\n- Satisfied by recklessness\n- Voluntary intoxication no defense\n- Examples: manslaughter, assault, s.20 GBH\n\nDistinction important for intoxication defense (DPP v Majewski [1977]).",
    category: "Mens Rea",
    difficulty: "Intermediate",
    module: "FLK2",
    topic: "Criminal Law and Practice",
  },
]

// Comprehensive AI-Generated Mind Map Nodes
export const aiGeneratedMindMaps: Record<string, AIMindMapNode[]> = {
  "contract-formation": [
    {
      id: "center",
      title: "Contract Formation",
      description: "Essential elements for valid contract under English law",
      x: 400,
      y: 300,
      level: 0,
      connections: ["offer", "acceptance", "consideration", "intention", "certainty"],
      color: "bg-blue-600",
      module: "FLK1",
      topic: "Contract Law",
    },
    {
      id: "offer",
      title: "Offer",
      description: "Definite promise to be bound on specific terms",
      x: 200,
      y: 150,
      level: 1,
      connections: ["invitation", "communication", "termination"],
      color: "bg-green-500",
      module: "FLK1",
      topic: "Contract Law",
    },
    {
      id: "acceptance",
      title: "Acceptance",
      description: "Unqualified agreement to offer terms",
      x: 600,
      y: 150,
      level: 1,
      connections: ["mirror-rule", "communication", "postal-rule"],
      color: "bg-purple-500",
      module: "FLK1",
      topic: "Contract Law",
    },
    {
      id: "consideration",
      title: "Consideration",
      description: "Something of value exchanged by each party",
      x: 200,
      y: 450,
      level: 1,
      connections: ["adequacy", "sufficiency", "past-consideration"],
      color: "bg-orange-500",
      module: "FLK1",
      topic: "Contract Law",
    },
    {
      id: "intention",
      title: "Intention to Create Legal Relations",
      description: "Parties must intend legal consequences",
      x: 600,
      y: 450,
      level: 1,
      connections: ["commercial", "domestic", "presumptions"],
      color: "bg-red-500",
      module: "FLK1",
      topic: "Contract Law",
    },
    {
      id: "certainty",
      title: "Certainty of Terms",
      description: "Terms must be sufficiently certain",
      x: 400,
      y: 100,
      level: 1,
      connections: ["essential-terms", "machinery"],
      color: "bg-indigo-500",
      module: "FLK1",
      topic: "Contract Law",
    },
  ],

  "negligence-elements": [
    {
      id: "center",
      title: "Negligence",
      description: "Tort requiring four essential elements",
      x: 400,
      y: 300,
      level: 0,
      connections: ["duty", "breach", "causation", "damage"],
      color: "bg-red-600",
      module: "FLK1",
      topic: "Tort Law",
    },
    {
      id: "duty",
      title: "Duty of Care",
      description: "Legal obligation to take reasonable care",
      x: 200,
      y: 150,
      level: 1,
      connections: ["caparo", "proximity", "policy"],
      color: "bg-blue-500",
      module: "FLK1",
      topic: "Tort Law",
    },
    {
      id: "breach",
      title: "Breach of Duty",
      description: "Falling below reasonable standard of care",
      x: 600,
      y: 150,
      level: 1,
      connections: ["reasonable-person", "professional", "risk-factors"],
      color: "bg-green-500",
      module: "FLK1",
      topic: "Tort Law",
    },
    {
      id: "causation",
      title: "Causation",
      description: "Link between breach and damage",
      x: 200,
      y: 450,
      level: 1,
      connections: ["factual", "legal", "remoteness"],
      color: "bg-purple-500",
      module: "FLK1",
      topic: "Tort Law",
    },
    {
      id: "damage",
      title: "Damage",
      description: "Recoverable loss or harm suffered",
      x: 600,
      y: 450,
      level: 1,
      connections: ["economic-loss", "physical-harm", "psychiatric"],
      color: "bg-orange-500",
      module: "FLK1",
      topic: "Tort Law",
    },
  ],

  "directors-duties": [
    {
      id: "center",
      title: "Directors' Duties",
      description: "Seven statutory duties under Companies Act 2006",
      x: 400,
      y: 300,
      level: 0,
      connections: ["powers", "success", "judgment", "care", "conflicts", "benefits", "interests"],
      color: "bg-indigo-600",
      module: "FLK1",
      topic: "Business Law and Practice",
    },
    {
      id: "powers",
      title: "Act Within Powers (s.171)",
      description: "Act in accordance with constitution and exercise powers for proper purposes",
      x: 200,
      y: 100,
      level: 1,
      connections: ["constitution", "proper-purpose"],
      color: "bg-blue-500",
      module: "FLK1",
      topic: "Business Law and Practice",
    },
    {
      id: "success",
      title: "Promote Success (s.172)",
      description: "Act in way most likely to promote success of company",
      x: 600,
      y: 100,
      level: 1,
      connections: ["stakeholders", "long-term", "enlightened"],
      color: "bg-green-500",
      module: "FLK1",
      topic: "Business Law and Practice",
    },
    {
      id: "conflicts",
      title: "Avoid Conflicts (s.175)",
      description: "Avoid situations where interests conflict with company duties",
      x: 200,
      y: 500,
      level: 1,
      connections: ["authorization", "disclosure", "strict-liability"],
      color: "bg-red-500",
      module: "FLK1",
      topic: "Business Law and Practice",
    },
  ],

  "land-registration": [
    {
      id: "center",
      title: "Land Registration",
      description: "System for recording interests in land",
      x: 400,
      y: 300,
      level: 0,
      connections: ["registered", "unregistered", "priority", "overriding"],
      color: "bg-green-600",
      module: "FLK2",
      topic: "Land Law",
    },
    {
      id: "registered",
      title: "Registered Land",
      description: "Land with title registered at Land Registry",
      x: 200,
      y: 150,
      level: 1,
      connections: ["title-register", "dispositions", "protection"],
      color: "bg-blue-500",
      module: "FLK2",
      topic: "Land Law",
    },
    {
      id: "priority",
      title: "Priority Rules",
      description: "Rules determining which interests take precedence",
      x: 600,
      y: 150,
      level: 1,
      connections: ["registration-order", "overriding-interests", "notice"],
      color: "bg-purple-500",
      module: "FLK2",
      topic: "Land Law",
    },
    {
      id: "overriding",
      title: "Overriding Interests",
      description: "Interests that bind despite non-registration",
      x: 400,
      y: 500,
      level: 1,
      connections: ["actual-occupation", "easements", "leases"],
      color: "bg-orange-500",
      module: "FLK2",
      topic: "Land Law",
    },
  ],
}

// Helper functions to get AI-generated content
export const getAIQuestionsByModule = (module: "FLK1" | "FLK2") => {
  return aiGeneratedQuestions.filter((q) => q.module === module)
}

export const getAIFlashcardsByTopic = (topic: string) => {
  return aiGeneratedFlashcards.filter((f) => f.topic.toLowerCase().includes(topic.toLowerCase()))
}

export const getAIMindMapByTopic = (topic: string) => {
  const topicKey = topic.toLowerCase().replace(/\s+/g, "-")
  return aiGeneratedMindMaps[topicKey] || []
}

export const getAllAIContent = () => {
  return {
    questions: aiGeneratedQuestions,
    flashcards: aiGeneratedFlashcards,
    mindMaps: aiGeneratedMindMaps,
  }
}
