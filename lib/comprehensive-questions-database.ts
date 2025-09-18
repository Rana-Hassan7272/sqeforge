export interface LegalQuestion {
  id: string
  module: "FLK1" | "FLK2"
  topic: string
  subtopic: string
  difficulty: "Foundation" | "Intermediate" | "Advanced" | "Expert"
  type: "MCQ" | "Mock" | "MiniMock"
  scenario: string // 100-200 words detailed factual scenario
  question: string // Clear legal question
  options: {
    A: string
    B: string
    C: string
    D: string
    E: string
  }
  correctAnswer: "A" | "B" | "C" | "D" | "E"
  explanation: string // Detailed explanation with legal reasoning
  legalPrinciple: string
  caseReferences?: string[]
  statuteReferences?: string[]
  timeLimit: number // seconds per question
  marks: number // always 1 for SQE1
}

export const comprehensiveLegalQuestions: LegalQuestion[] = [
  // FLK1 - Contract Law Questions
  {
    id: "flk1-contract-001",
    module: "FLK1",
    topic: "Contract Law",
    subtopic: "Formation of Contract",
    difficulty: "Foundation",
    type: "MCQ",
    scenario:
      "Sarah visits a local electronics store and sees a laptop advertised in the window for £500. She enters the store and tells the shop assistant she wants to buy the laptop at the advertised price. The shop assistant informs her that the laptop is actually £800 and the window display was an error. Sarah insists she has a right to buy the laptop for £500 as advertised. The shop assistant refuses to sell at that price. Sarah argues that the advertisement constitutes a binding offer which she has accepted by entering the store and expressing her willingness to purchase.",
    question: "What is the legal position regarding Sarah's claim to purchase the laptop for £500?",
    options: {
      A: "Sarah has a valid contract as the advertisement constitutes an offer which she accepted",
      B: "The advertisement is an invitation to treat and no contract exists until the shop accepts Sarah's offer",
      C: "Sarah can enforce the advertised price under the principle of promissory estoppel",
      D: "The shop is bound by the advertised price under consumer protection legislation",
      E: "A unilateral contract was formed when Sarah saw the advertisement",
    },
    correctAnswer: "B",
    explanation:
      "Under English contract law, shop window displays and advertisements are generally considered invitations to treat, not offers. The customer makes an offer to purchase, which the shop can accept or reject. This principle was established in Fisher v Bell [1961] and Pharmaceutical Society of Great Britain v Boots Cash Chemists [1953]. The advertisement invites customers to make offers, but does not constitute a binding offer itself.",
    legalPrinciple: "Invitation to treat vs offer distinction in contract formation",
    caseReferences: ["Fisher v Bell [1961]", "Pharmaceutical Society of Great Britain v Boots Cash Chemists [1953]"],
    timeLimit: 90,
    marks: 1,
  },

  {
    id: "flk1-contract-002",
    module: "FLK1",
    topic: "Contract Law",
    subtopic: "Consideration",
    difficulty: "Intermediate",
    type: "MCQ",
    scenario:
      "James owes £10,000 to his creditor, Bank Corp, under a loan agreement. Due to financial difficulties, James negotiates with Bank Corp to accept £7,000 in full settlement of the debt. Bank Corp agrees in writing and James pays the £7,000. Six months later, Bank Corp demands the remaining £3,000, arguing that the agreement to accept less was not binding as James provided no fresh consideration for the variation. James had been making regular payments before the agreement and his financial situation had deteriorated due to redundancy.",
    question: "Can Bank Corp successfully claim the remaining £3,000?",
    options: {
      A: "Yes, under the rule in Pinnel's Case, payment of a lesser sum cannot discharge a greater debt",
      B: "No, the written agreement creates a binding variation supported by consideration",
      C: "No, Bank Corp is estopped from claiming the balance under the doctrine of promissory estoppel",
      D: "Yes, unless James can prove he provided additional consideration for the variation",
      E: "No, the agreement constitutes a binding accord and satisfaction",
    },
    correctAnswer: "C",
    explanation:
      "Under the doctrine of promissory estoppel established in Central London Property Trust Ltd v High Trees House Ltd [1947], where a creditor makes a clear promise to accept less and the debtor relies on this promise, the creditor may be estopped from going back on their word. The written agreement and James's reliance by paying the reduced amount would likely prevent Bank Corp from claiming the balance. The rule in Pinnel's Case is subject to exceptions including promissory estoppel.",
    legalPrinciple: "Promissory estoppel and the rule in Pinnel's Case",
    caseReferences: [
      "Pinnel's Case (1602)",
      "Central London Property Trust Ltd v High Trees House Ltd [1947]",
      "Williams v Roffey Bros & Nicholls (Contractors) Ltd [1991]",
    ],
    timeLimit: 120,
    marks: 1,
  },

  {
    id: "flk1-tort-001",
    module: "FLK1",
    topic: "Tort Law",
    subtopic: "Negligence - Duty of Care",
    difficulty: "Intermediate",
    type: "MCQ",
    scenario:
      "Dr. Williams, a hospital consultant, provides medical advice to his neighbor John at a social gathering. John mentions he has been experiencing chest pains, and Dr. Williams casually suggests it's probably just stress and recommends rest. John relies on this advice and doesn't seek proper medical attention. Two weeks later, John suffers a heart attack that could have been prevented with timely medical intervention. John's family argues that Dr. Williams owed a duty of care despite the informal setting. Dr. Williams maintains he was simply being neighborly and not acting in a professional capacity.",
    question: "Does Dr. Williams owe a duty of care to John in these circumstances?",
    options: {
      A: "Yes, as a medical professional he always owes a duty of care when giving medical advice",
      B: "No, as the advice was given socially without establishing a doctor-patient relationship",
      C: "Yes, because John reasonably relied on Dr. Williams' professional expertise",
      D: "No, because there was no payment for the medical advice",
      E: "Yes, under the principle of assumption of responsibility established in Hedley Byrne",
    },
    correctAnswer: "B",
    explanation:
      "Following the Caparo test and cases like Hedley Byrne v Heller, a duty of care in negligence requires foreseeability, proximity, and that it be fair, just and reasonable to impose a duty. Casual social advice, even from professionals, typically doesn't create the necessary proximity or assumption of responsibility required for a duty of care. The context and manner of giving advice is crucial in determining whether a professional relationship exists.",
    legalPrinciple: "Duty of care in professional advice given in social contexts",
    caseReferences: ["Caparo Industries plc v Dickman [1990]", "Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964]"],
    timeLimit: 120,
    marks: 1,
  },

  {
    id: "flk2-property-001",
    module: "FLK2",
    topic: "Land Law",
    subtopic: "Registered Land",
    difficulty: "Foundation",
    type: "MCQ",
    scenario:
      "Marcus purchases a house from Elena for £300,000. The sale completes and Marcus moves in immediately. However, due to an administrative error by his solicitor, the transfer is not registered at the Land Registry for six months. During this period, Elena fraudulently sells the same property to an innocent purchaser, Priya, for £280,000. Priya's solicitor immediately registers the transfer. Both Marcus and Priya claim to be the rightful owner of the property. Marcus argues he has the better claim as he completed first and took possession.",
    question: "Who has the better claim to the property under the Land Registration Act 2002?",
    options: {
      A: "Marcus, as he completed the purchase first and took possession",
      B: "Priya, as she is the first registered proprietor and an innocent purchaser",
      C: "Marcus, as he paid the higher price and has a superior equitable interest",
      D: "Priya, but she must compensate Marcus for his losses",
      E: "The property must be sold and proceeds divided between Marcus and Priya",
    },
    correctAnswer: "B",
    explanation:
      "Under the Land Registration Act 2002, registration is crucial for legal title to registered land. Priya, as the first to register and being an innocent purchaser for value, would typically gain priority. The 'first registration' principle applies, and Marcus's failure to register timeously may result in loss of priority, though he may have a claim for indemnity from the Land Registry under Schedule 4 of the Act.",
    legalPrinciple: "Priority of interests in registered land and the importance of registration",
    statuteReferences: ["Land Registration Act 2002"],
    timeLimit: 90,
    marks: 1,
  },

  {
    id: "flk2-criminal-001",
    module: "FLK2",
    topic: "Criminal Law and Practice",
    subtopic: "Mens Rea",
    difficulty: "Intermediate",
    type: "MCQ",
    scenario:
      "Alex throws a brick at what he believes is an empty building to break a window as a practical joke. Unknown to Alex, there are people inside the building, and the brick strikes and seriously injures Ben, who was standing near the window. Alex is charged with causing grievous bodily harm under s.20 Offences Against the Person Act 1861, which requires that the defendant 'unlawfully and maliciously wound or inflict grievous bodily harm.' Alex argues he had no intention to harm anyone and believed the building was empty.",
    question: "Does Alex have the required mens rea for the s.20 offence?",
    options: {
      A: "No, because Alex did not intend to harm Ben specifically",
      B: "Yes, because Alex intended to break the window and harm resulted",
      C: "No, because Alex believed the building was empty",
      D: "Yes, if Alex foresaw that some harm might result from his actions",
      E: "No, because the harm to Ben was purely accidental",
    },
    correctAnswer: "D",
    explanation:
      "Under R v Cunningham [1957] and R v Savage; R v Parmenter [1992], 'maliciously' in s.20 OAPA 1861 requires either intention to cause some harm or recklessness as to whether some harm might result. Recklessness is satisfied if the defendant foresees the risk of some harm occurring and unreasonably takes that risk. Alex's act of throwing a brick at a building could satisfy this test if he foresaw some risk of harm, regardless of his belief about occupancy.",
    legalPrinciple: "Cunningham recklessness and the meaning of 'maliciously' in s.20 OAPA 1861",
    caseReferences: ["R v Cunningham [1957]", "R v Savage; R v Parmenter [1992]"],
    statuteReferences: ["Offences Against the Person Act 1861, s.20"],
    timeLimit: 120,
    marks: 1,
  },

  {
    id: "flk1-business-001",
    module: "FLK1",
    topic: "Business Law and Practice",
    subtopic: "Directors Duties",
    difficulty: "Advanced",
    type: "Mock",
    scenario:
      "Sarah is a director of GreenTech Ltd, a renewable energy company. She learns through her position that the company is about to announce a major breakthrough in solar technology that will significantly increase the share price. Before the announcement, Sarah purchases 10,000 shares in the company at the current market price of £2 per share. After the announcement, the shares rise to £8 per share. Sarah sells her shares, making a profit of £60,000. The company's shareholders discover Sarah's transactions and claim she has breached her fiduciary duties. Sarah argues she used her own money and took personal risk.",
    question: "What is the most likely outcome of the shareholders' claim against Sarah?",
    options: {
      A: "Sarah has breached her duty to avoid conflicts of interest and must account for her profit",
      B: "Sarah's actions are permissible as she used her own money and took personal risk",
      C: "Sarah is only liable if she can be proved to have acted dishonestly",
      D: "The shareholders must prove the company suffered loss as a result of Sarah's actions",
      E: "Sarah's liability depends on whether the company's articles of association permit such transactions",
    },
    correctAnswer: "A",
    explanation:
      "Under s.175 Companies Act 2006 and the principle in Boardman v Phipps [1967], directors must avoid situations where their personal interests conflict with their duties to the company. Using confidential information obtained through their position for personal profit constitutes a breach of fiduciary duty. Sarah must account to the company for any profit made, regardless of whether the company suffered loss. The 'no profit' rule applies strictly to fiduciaries.",
    legalPrinciple: "Directors' duty to avoid conflicts of interest and account for secret profits",
    caseReferences: ["Boardman v Phipps [1967]", "Regal (Hastings) Ltd v Gulliver [1967]"],
    statuteReferences: ["Companies Act 2006, s.175"],
    timeLimit: 150,
    marks: 1,
  },

  {
    id: "flk1-contract-003",
    module: "FLK1",
    topic: "Contract Law",
    subtopic: "Force Majeure",
    difficulty: "Advanced",
    type: "MiniMock",
    scenario:
      "RTI Ltd contracts with MUR Shipping BV to transport goods from London to Rotterdam. The contract contains a force majeure clause stating that parties are excused from performance if prevented by 'acts of God, war, strikes, or other circumstances beyond reasonable control.' A major storm causes port closures for three days. MUR Shipping claims force majeure and seeks additional time for delivery. RTI argues that MUR should have made reasonable endeavours to find alternative arrangements.",
    question: "What standard of endeavours is required to overcome a force majeure event?",
    options: {
      A: "Best endeavours - the party must do everything possible regardless of cost",
      B: "Reasonable endeavours - what a reasonable person in the same position would do",
      C: "All reasonable endeavours - more than reasonable but less than best endeavours",
      D: "No endeavours required if the event clearly falls within the force majeure clause",
      E: "Commercial endeavours - what would be commercially sensible in the circumstances",
    },
    correctAnswer: "B",
    explanation:
      "In RTI Ltd v MUR Shipping BV [2024], the Supreme Court clarified that 'reasonable endeavours' in force majeure clauses requires the party to take steps that a reasonable person in the same position would take, considering the commercial context and proportionality of the measures required.",
    legalPrinciple: "Standard of endeavours required in force majeure clauses",
    caseReferences: ["RTI Ltd v MUR Shipping BV [2024]"],
    timeLimit: 0,
    marks: 0,
  },

  // FLK1 - Constitutional Law & Administrative Law
  {
    id: "flk1-public-001",
    module: "FLK1",
    topic: "Public Law",
    subtopic: "Constitutional Principles",
    difficulty: "Foundation",
    type: "MCQ",
    scenario:
      "Parliament passes the Emergency Powers Act 2025, which grants the Prime Minister authority to make regulations with the force of law during national emergencies, without requiring parliamentary approval. The Act states that such regulations cannot be challenged in any court. Opposition MPs argue this violates fundamental constitutional principles. A judicial review claim is brought challenging the validity of regulations made under this Act.",
    question: "What is the most likely outcome of the judicial review challenge?",
    options: {
      A: "The court cannot review the regulations as Parliament has expressly excluded judicial review",
      B: "The court can review the regulations as parliamentary sovereignty cannot exclude judicial review entirely",
      C: "The court can only review procedural aspects but not the substance of the regulations",
      D: "The regulations are valid as they were made under statutory authority",
      E: "The court will apply the principle in Anisminic and find ways to review despite the ouster clause",
    },
    correctAnswer: "E",
    explanation:
      "Following Anisminic Ltd v Foreign Compensation Commission [1969] and recent cases, courts are reluctant to accept complete ouster clauses. The principle of the rule of law requires that executive action be subject to legal scrutiny. Courts will interpret ouster clauses narrowly and find ways to maintain judicial oversight, particularly where fundamental rights or constitutional principles are at stake.",
    legalPrinciple: "Rule of law and limits on parliamentary sovereignty regarding ouster clauses",
    caseReferences: [
      "Anisminic Ltd v Foreign Compensation Commission [1969]",
      "R (Privacy International) v Investigatory Powers Tribunal [2019]",
    ],
    timeLimit: 0,
    marks: 0,
  },

  // FLK1 - Contract Law - Consideration
  {
    id: "flk1-contract-004",
    module: "FLK1",
    topic: "Contract Law",
    subtopic: "Consideration",
    difficulty: "Intermediate",
    type: "MCQ",
    scenario:
      "James owes £10,000 to his creditor, Bank Corp, under a loan agreement. Due to financial difficulties, James negotiates with Bank Corp to accept £7,000 in full settlement of the debt. Bank Corp agrees in writing and James pays the £7,000. Six months later, Bank Corp demands the remaining £3,000, arguing that the agreement to accept less was not binding as James provided no fresh consideration for the variation.",
    question: "Can Bank Corp successfully claim the remaining £3,000?",
    options: {
      A: "Yes, under the rule in Pinnel's Case, payment of a lesser sum cannot discharge a greater debt",
      B: "No, the written agreement creates a binding variation supported by consideration",
      C: "No, Bank Corp is estopped from claiming the balance under the doctrine of promissory estoppel",
      D: "Yes, unless James can prove he provided additional consideration for the variation",
      E: "No, the agreement constitutes a binding accord and satisfaction",
    },
    correctAnswer: "C",
    explanation:
      "Under the doctrine of promissory estoppel established in Central London Property Trust Ltd v High Trees House Ltd [1947], where a creditor makes a clear promise to accept less and the debtor relies on this promise, the creditor may be estopped from going back on their word. The written agreement and James's reliance by paying the reduced amount would likely prevent Bank Corp from claiming the balance.",
    legalPrinciple: "Promissory estoppel and the rule in Pinnel's Case",
    caseReferences: [
      "Pinnel's Case (1602)",
      "Central London Property Trust Ltd v High Trees House Ltd [1947]",
      "Williams v Roffey Bros & Nicholls (Contractors) Ltd [1991]",
    ],
    timeLimit: 0,
    marks: 0,
  },

  // FLK1 - Tort Law - Economic Loss
  {
    id: "flk1-tort-003",
    module: "FLK1",
    topic: "Tort Law",
    subtopic: "Economic Loss",
    difficulty: "Advanced",
    type: "Mock",
    scenario:
      "Precision Auditors Ltd conducts an audit of TechStart Ltd's accounts, knowing that the accounts will be shown to potential investors. The audit report contains negligent misstatements that overstate TechStart's profitability. Venture Capital Fund relies on these accounts and invests £2 million in TechStart. When the true financial position is discovered, TechStart collapses and Venture Capital Fund loses its entire investment. Venture Capital Fund was not specifically identified to Precision Auditors, but was part of a known class of potential investors.",
    question: "Can Venture Capital Fund successfully claim for pure economic loss against Precision Auditors?",
    options: {
      A: "No, as there was no contractual relationship between the parties",
      B: "Yes, under the principle in Hedley Byrne v Heller for negligent misstatement",
      C: "No, as Venture Capital Fund was not specifically identified as a recipient",
      D: "Yes, but only if Precision Auditors knew the specific amount of the investment",
      E: "No, as auditors owe duties only to the company being audited",
    },
    correctAnswer: "B",
    explanation:
      "Under Hedley Byrne v Heller [1964] and Caparo Industries v Dickman [1990], liability for pure economic loss arising from negligent misstatement requires: (1) a special relationship based on assumption of responsibility, (2) reasonable reliance, and (3) that it be fair, just and reasonable. Where auditors know their report will be shown to a specific class of potential investors for investment decisions, this can establish the necessary proximity.",
    legalPrinciple: "Liability for pure economic loss in negligent misstatement cases",
    caseReferences: [
      "Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964]",
      "Caparo Industries plc v Dickman [1990]",
      "Royal Bank of Scotland v Bannerman Johnstone Maclay [2005]",
    ],
    timeLimit: 0,
    marks: 0,
  },

  // FLK2 - Land Law - Adverse Possession
  {
    id: "flk2-land-002",
    module: "FLK2",
    topic: "Land Law",
    subtopic: "Adverse Possession",
    difficulty: "Advanced",
    type: "MCQ",
    scenario:
      "In 2010, Robert began occupying a strip of registered land belonging to his neighbor, Susan, believing it was part of his own property due to unclear boundary markings. Robert erected a fence, maintained a garden, and used the land openly and exclusively. In 2020, Susan discovered the encroachment and demanded Robert vacate the land. Robert claims he has acquired title through adverse possession under the Land Registration Act 2002.",
    question: "What is Robert's position regarding his claim for adverse possession?",
    options: {
      A: "Robert has automatically acquired title after 12 years of adverse possession",
      B: "Robert must apply to be registered as proprietor and Susan can object within 65 business days",
      C: "Robert cannot claim adverse possession as the land is registered",
      D: "Robert has acquired an overriding interest that binds Susan",
      E: "Robert must prove his possession was with Susan's permission to succeed",
    },
    correctAnswer: "B",
    explanation:
      "Under the Land Registration Act 2002, adverse possession of registered land requires a two-stage process. After 10 years of adverse possession, the squatter can apply to be registered as proprietor. The registered proprietor then has 65 business days to object. If they object and serve a counter-notice, the application will normally be rejected unless specific circumstances apply (such as boundary disputes or estoppel).",
    legalPrinciple: "Adverse possession procedure for registered land under LRA 2002",
    statuteReferences: ["Land Registration Act 2002, Schedule 6"],
    caseReferences: ["Pye v Graham [2002]", "Zarb v Parry [2011]"],
    timeLimit: 0,
    marks: 0,
  },

  // FLK2 - Trusts - Breach of Trust
  {
    id: "flk2-trusts-001",
    module: "FLK2",
    topic: "Trusts",
    subtopic: "Breach of Trust",
    difficulty: "Expert",
    type: "Mock",
    scenario:
      "David and Emma are trustees of a family trust worth £500,000. Without consulting Emma, David invests £200,000 of trust funds in high-risk cryptocurrency, believing it will generate better returns for the beneficiaries. The investment loses 80% of its value within six months. Emma discovers the unauthorized investment and the beneficiaries seek to hold both trustees liable for the loss. David argues he acted in good faith to benefit the trust, while Emma claims she had no knowledge of the investment.",
    question: "What is the extent of the trustees' liability for the breach of trust?",
    options: {
      A: "Only David is liable as he made the unauthorized investment without Emma's consent",
      B: "Both trustees are jointly and severally liable for the full loss regardless of fault",
      C: "David is liable for the loss but Emma may seek contribution from him",
      D: "Neither trustee is liable if they can prove they acted honestly and reasonably",
      E: "Liability is limited to the amount of profit David hoped to make from the investment",
    },
    correctAnswer: "B",
    explanation:
      "Under the principle established in cases like Target Holdings Ltd v Redferns [1996], trustees are jointly and severally liable for breaches of trust. Each trustee is liable for the full amount of any loss, regardless of their individual degree of fault. However, Emma may be able to seek contribution from David under the Civil Liability (Contribution) Act 1978, and may have a defense if she can prove she acted honestly and reasonably under s.61 Trustee Act 1925.",
    legalPrinciple: "Joint and several liability of trustees for breach of trust",
    caseReferences: ["Target Holdings Ltd v Redferns [1996]", "Bahin v Hughes (1886)"],
    statuteReferences: ["Trustee Act 1925, s.61", "Civil Liability (Contribution) Act 1978"],
    timeLimit: 0,
    marks: 0,
  },

  // FLK2 - Criminal Law - Mens Rea
  {
    id: "flk2-criminal-002",
    module: "FLK2",
    topic: "Criminal Law and Practice",
    subtopic: "Mens Rea",
    difficulty: "Intermediate",
    type: "MCQ",
    scenario:
      "Alex throws a brick at what he believes is an empty building to break a window as a practical joke. Unknown to Alex, there are people inside the building, and the brick strikes and seriously injures Ben, who was standing near the window. Alex is charged with causing grievous bodily harm under s.20 Offences Against the Person Act 1861, which requires that the defendant 'unlawfully and maliciously wound or inflict grievous bodily harm.'",
    question: "Does Alex have the required mens rea for the s.20 offence?",
    options: {
      A: "No, because Alex did not intend to harm Ben specifically",
      B: "Yes, because Alex intended to break the window and harm resulted",
      C: "No, because Alex believed the building was empty",
      D: "Yes, if Alex foresaw that some harm might result from his actions",
      E: "No, because the harm to Ben was purely accidental",
    },
    correctAnswer: "D",
    explanation:
      "Under R v Cunningham [1957] and R v Savage; R v Parmenter [1992], 'maliciously' in s.20 OAPA 1861 requires either intention to cause some harm or recklessness as to whether some harm might result. Recklessness is satisfied if the defendant foresees the risk of some harm occurring and unreasonably takes that risk. Alex's act of throwing a brick at a building could satisfy this test if he foresaw some risk of harm.",
    legalPrinciple: "Cunningham recklessness and the meaning of 'maliciously' in s.20 OAPA 1861",
    caseReferences: ["R v Cunningham [1957]", "R v Savage; R v Parmenter [1992]"],
    statuteReferences: ["Offences Against the Person Act 1861, s.20"],
    timeLimit: 0,
    marks: 0,
  },

  // FLK1 - Business Law - Directors' Duties
  {
    id: "flk1-business-001",
    module: "FLK1",
    topic: "Business Law and Practice",
    subtopic: "Directors Duties",
    difficulty: "Advanced",
    type: "Mock",
    scenario:
      "Sarah is a director of GreenTech Ltd, a renewable energy company. She learns through her position that the company is about to announce a major breakthrough in solar technology that will significantly increase the share price. Before the announcement, Sarah purchases 10,000 shares in the company at the current market price of £2 per share. After the announcement, the shares rise to £8 per share. Sarah sells her shares, making a profit of £60,000. The company's shareholders discover Sarah's transactions and claim she has breached her fiduciary duties.",
    question: "What is the most likely outcome of the shareholders' claim against Sarah?",
    options: {
      A: "Sarah has breached her duty to avoid conflicts of interest and must account for her profit",
      B: "Sarah's actions are permissible as she used her own money and took personal risk",
      C: "Sarah is only liable if she can be proved to have acted dishonestly",
      D: "The shareholders must prove the company suffered loss as a result of Sarah's actions",
      E: "Sarah's liability depends on whether the company's articles of association permit such transactions",
    },
    correctAnswer: "A",
    explanation:
      "Under s.175 Companies Act 2006 and the principle in Boardman v Phipps [1967], directors must avoid situations where their personal interests conflict with their duties to the company. Using confidential information obtained through their position for personal profit constitutes a breach of fiduciary duty. Sarah must account to the company for any profit made, regardless of whether the company suffered loss.",
    legalPrinciple: "Directors' duty to avoid conflicts of interest and account for secret profits",
    caseReferences: ["Boardman v Phipps [1967]", "Regal (Hastings) Ltd v Gulliver [1967]"],
    statuteReferences: ["Companies Act 2006, s.175"],
    timeLimit: 0,
    marks: 0,
  },

  // FLK2 - Wills and Probate - Testamentary Capacity
  {
    id: "flk2-wills-001",
    module: "FLK2",
    topic: "Wills and Administration of Estates",
    subtopic: "Testamentary Capacity",
    difficulty: "Intermediate",
    type: "MCQ",
    scenario:
      "Margaret, aged 85, suffers from early-stage dementia with good and bad days. On a good day, she instructs her solicitor to prepare a will leaving her entire estate worth £800,000 to her carer, Jane, instead of her estranged children. The solicitor notes that Margaret clearly understands the nature of making a will, knows the extent of her property, and understands the claims her children might have but chooses to exclude them due to their lack of contact. Margaret's children challenge the will after her death, claiming she lacked testamentary capacity.",
    question: "Does Margaret's will satisfy the test for testamentary capacity?",
    options: {
      A: "No, because dementia automatically invalidates testamentary capacity",
      B: "Yes, if Margaret satisfied the Banks v Goodfellow test at the time of making the will",
      C: "No, because the will makes unreasonable provision for her children",
      D: "Yes, but only if a medical expert confirms her capacity",
      E: "No, because the substantial gift to her carer raises suspicion of undue influence",
    },
    correctAnswer: "B",
    explanation:
      "Under Banks v Goodfellow (1870), testamentary capacity requires that the testator: (1) understands the nature of making a will, (2) knows the extent of their property, (3) understands and appreciates the claims to which they ought to give effect, and (4) is not affected by any disorder of mind that perverts their sense of right. Having dementia does not automatically invalidate capacity if these criteria are met at the time of making the will.",
    legalPrinciple: "Test for testamentary capacity under Banks v Goodfellow",
    caseReferences: ["Banks v Goodfellow (1870)", "Key v Key [2010]", "Walker v Badmin [2014]"],
    timeLimit: 0,
    marks: 0,
  },

  // FLK1 - Legal System - Statutory Interpretation
  {
    id: "flk1-legal-system-001",
    module: "FLK1",
    topic: "Legal System of England and Wales",
    subtopic: "Statutory Interpretation",
    difficulty: "Foundation",
    type: "MCQ",
    scenario:
      "The Road Traffic Safety Act 2025 states: 'It is an offence for any person to drive a motor vehicle on a road while using a mobile communication device.' Tom is prosecuted under this Act for using his smartphone's GPS navigation app while driving. Tom argues that using GPS for navigation is not the same as 'using a mobile communication device' as he was not communicating with anyone.",
    question: "Which approach to statutory interpretation would most likely support Tom's argument?",
    options: {
      A: "The literal rule - GPS use is not communication so falls outside the literal meaning",
      B: "The golden rule - the literal meaning would lead to an absurd result",
      C: "The mischief rule - Parliament intended to prevent all mobile phone use while driving",
      D: "The purposive approach - the Act aims to reduce driver distraction",
      E: "The ejusdem generis rule - GPS should be interpreted in the context of communication devices",
    },
    correctAnswer: "A",
    explanation:
      "The literal rule of statutory interpretation requires courts to give words their plain, ordinary meaning. Tom's argument relies on the literal interpretation that 'communication device' refers to actual communication with others, not solo use of GPS navigation. However, courts might reject this narrow interpretation using the purposive approach, considering Parliament's broader intention to prevent driver distraction.",
    legalPrinciple: "Literal rule of statutory interpretation and its limitations",
    caseReferences: [
      "Whiteley v Chappell (1868)",
      "Fisher v Bell [1961]",
      "R v Judge of the City of London Court [1892]",
    ],
    timeLimit: 0,
    marks: 0,
  },
]

// Helper functions to filter questions by criteria
export const getQuestionsByModule = (module: "FLK1" | "FLK2") =>
  comprehensiveLegalQuestions.filter((q) => q.module === module)

export const getQuestionsByTopic = (topic: string) => comprehensiveLegalQuestions.filter((q) => q.topic === topic)

export const getQuestionsByDifficulty = (difficulty: string) =>
  comprehensiveLegalQuestions.filter((q) => q.difficulty === difficulty)

export const getQuestionsByType = (type: "MCQ" | "Mock" | "MiniMock") =>
  comprehensiveLegalQuestions.filter((q) => q.type === type)

export const getRandomQuestions = (
  count: number,
  filters?: {
    module?: "FLK1" | "FLK2"
    topic?: string
    difficulty?: string
    type?: "MCQ" | "Mock" | "MiniMock"
  },
) => {
  let filteredQuestions = comprehensiveLegalQuestions

  if (filters?.module) {
    filteredQuestions = filteredQuestions.filter((q) => q.module === filters.module)
  }
  if (filters?.topic) {
    filteredQuestions = filteredQuestions.filter((q) => q.topic === filters.topic)
  }
  if (filters?.difficulty) {
    filteredQuestions = filteredQuestions.filter((q) => q.difficulty === filters.difficulty)
  }
  if (filters?.type) {
    filteredQuestions = filteredQuestions.filter((q) => q.type === filters.type)
  }

  // Shuffle and return requested count
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Topic and subtopic mappings for SQE syllabus
export const SQE_TOPICS = {
  FLK1: {
    "Business Law and Practice": [
      "Starting a new business",
      "Management and company decision-making",
      "Interests/rights/obligations/powers of stakeholders",
      "Financing a business",
      "Taxation of a business and its stakeholders",
      "Termination of a solvent business",
      "Corporate insolvency",
      "Personal bankruptcy",
    ],
    "Dispute Resolution": [
      "Options for dispute resolution",
      "Civil claims",
      "Starting/serving/responding to proceedings",
      "Statements of case",
      "Interim applications",
      "Case management",
      "Evidence",
      "Disclosure",
      "Trial",
      "Costs",
      "Appeals",
      "Enforcement",
    ],
    "Contract Law": [
      "Existence/formation of a contract",
      "Contents of a contract",
      "Causation and remoteness",
      "Vitiating elements",
      "Discharge of contract and remedies",
      "Unjust enrichment",
    ],
    "Tort Law": [
      "Negligence",
      "Remedies and defences",
      "Occupiers' liability",
      "Product liability",
      "Nuisance and the Rule in Rylands v Fletcher",
    ],
    "Legal System of England and Wales": [
      "Courts and judiciary",
      "Precedent",
      "Primary legislation",
      "Statutory interpretation",
      "Application of legislation",
    ],
    "Constitutional and Administrative Law and EU Law": [
      "Core institutions",
      "Legitimacy",
      "Judicial review",
      "Human Rights Act 1998",
      "EU law in UK constitution",
    ],
    "Legal Services": [
      "SRA regulatory role",
      "Overriding legal obligations",
      "Equality Act 2010",
      "Money laundering",
      "Financial services",
      "Funding options",
    ],
  },
  FLK2: {
    "Property Practice": [
      "Key elements of property transactions",
      "Investigation of titles",
      "Pre-contract searches and enquiries",
      "Progressing property transactions to exchange of contracts",
      "Pre-completion steps",
      "Completion and post-completion steps",
      "Grant and assignment of commercial leases",
      "Key lease covenants and breach",
      "Security of tenure",
      "Taxation of property transactions",
    ],
    "Wills and the Administration of Estates": [
      "Wills and Intestacy",
      "Probate and Administration Practice",
      "Taxation – wills and the administration of estates",
    ],
    "Solicitors Accounts": [
      "Client money",
      "Client account",
      "Interest",
      "Breaches",
      "Record-keeping",
      "Bills",
      "Joint/own accounts",
      "Third-party managed accounts",
      "Accountants' reports",
    ],
    "Land Law": [
      "Registered and unregistered land",
      "Freehold and leasehold estates",
      "Legal and equitable interests in land",
      "Landlord and tenant",
      "Co-ownership",
    ],
    Trusts: [
      "Express and implied trusts",
      "The fiduciary relationship",
      "Trustees' duties, powers, and liability",
      "Equitable remedies",
    ],
    "Criminal Law and Practice": [
      "Core principles of criminal liability",
      "Law/procedure/processes at the police station",
      "Pre-trial considerations",
      "Meeting the client's objectives",
      "Magistrates' Court and Crown Court trials",
    ],
  },
}

export interface SQE1ScaledScore {
  rawScore: number
  scaledScore: number
  passed: boolean
  percentile?: number
}

export const calculateSQE1ScaledScore = (correctAnswers: number, totalQuestions: number): SQE1ScaledScore => {
  const rawScore = correctAnswers
  const percentage = (correctAnswers / totalQuestions) * 100

  // SQE1 scaled scoring: 300 = pass mark (60%), max 500
  // Linear scaling: 0% = 100, 60% = 300, 100% = 500
  let scaledScore: number

  if (percentage <= 60) {
    // Below pass mark: scale from 100 to 300
    scaledScore = 100 + (percentage / 60) * 200
  } else {
    // Above pass mark: scale from 300 to 500
    scaledScore = 300 + ((percentage - 60) / 40) * 200
  }

  scaledScore = Math.round(scaledScore)
  const passed = scaledScore >= 300

  return {
    rawScore,
    scaledScore,
    passed,
  }
}

export interface WrongQuestionEntry {
  questionId: string
  userAnswer: string
  correctAnswer: string
  timestamp: Date
  attempts: number
  lastAttemptCorrect: boolean
}

export class WrongQuestionBank {
  private wrongQuestions: Map<string, WrongQuestionEntry> = new Map()

  addWrongQuestion(questionId: string, userAnswer: string, correctAnswer: string) {
    const existing = this.wrongQuestions.get(questionId)
    if (existing) {
      existing.attempts += 1
      existing.userAnswer = userAnswer
      existing.timestamp = new Date()
      existing.lastAttemptCorrect = false
    } else {
      this.wrongQuestions.set(questionId, {
        questionId,
        userAnswer,
        correctAnswer,
        timestamp: new Date(),
        attempts: 1,
        lastAttemptCorrect: false,
      })
    }
  }

  markQuestionCorrect(questionId: string) {
    const entry = this.wrongQuestions.get(questionId)
    if (entry) {
      entry.lastAttemptCorrect = true
      entry.timestamp = new Date()
    }
  }

  getWrongQuestions(): WrongQuestionEntry[] {
    return Array.from(this.wrongQuestions.values())
      .filter((entry) => !entry.lastAttemptCorrect)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  getQuestionsByAttempts(minAttempts: number): WrongQuestionEntry[] {
    return Array.from(this.wrongQuestions.values()).filter(
      (entry) => entry.attempts >= minAttempts && !entry.lastAttemptCorrect,
    )
  }
}

export const INTENSITY_LEVELS = {
  1: { name: "Foundation", description: "Basic legal principles", timeMultiplier: 1.2 },
  2: { name: "Intermediate", description: "Applied legal knowledge", timeMultiplier: 1.0 },
  3: { name: "Advanced", description: "Complex legal scenarios", timeMultiplier: 0.9 },
  4: { name: "Expert", description: "Professional competency level", timeMultiplier: 0.8 },
}

export const mockExamConfigs = {
  flk1: {
    duration: 300, // 5 hours in minutes
    totalQuestions: 180,
    passMarkScaled: 300, // 60% equivalent
    modules: [
      "Contract Law",
      "Tort Law",
      "Business Law and Practice",
      "Dispute Resolution",
      "Legal System of England and Wales",
      "Constitutional and Administrative Law and EU Law",
      "Legal Services",
    ],
    distribution: {
      "Contract Law": 30,
      "Tort Law": 25,
      "Business Law and Practice": 35,
      "Dispute Resolution": 35,
      "Legal System of England and Wales": 20,
      "Constitutional and Administrative Law and EU Law": 20,
      "Legal Services": 15,
    },
  },
  flk2: {
    duration: 300, // 5 hours in minutes
    totalQuestions: 180,
    passMarkScaled: 300, // 60% equivalent
    modules: [
      "Property Practice",
      "Wills and Administration of Estates",
      "Solicitors Accounts",
      "Land Law",
      "Trusts",
      "Criminal Law and Practice",
    ],
    distribution: {
      "Property Practice": 40,
      "Wills and Administration of Estates": 20,
      "Solicitors Accounts": 25,
      "Land Law": 35,
      Trusts: 30,
      "Criminal Law and Practice": 30,
    },
  },
}
