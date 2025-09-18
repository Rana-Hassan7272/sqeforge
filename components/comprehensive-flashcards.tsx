"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

interface FlashCard {
  id: string
  front: string
  back: string
  category: string
  difficulty: "Foundation" | "Intermediate" | "Advanced" | "Expert"
  legalPrinciple: string
  caseReferences?: string[]
  statuteReferences?: string[]
}

export const comprehensiveFlashcards: Record<string, FlashCard[]> = {
  // FLK1 - Business Law and Practice (SRA 2024 Specification)
  "business-law": [
    {
      id: "bus-001",
      front: "According to SRA SQE1 specification, what are the key areas tested in Business Law and Practice?",
      back: "SRA SQE1 Business Law and Practice covers:\n1. Business structures (sole trader, partnership, LLP, company)\n2. Company law fundamentals\n3. Directors' duties and corporate governance\n4. Business finance and funding\n5. Commercial contracts\n6. Employment law basics\n7. Intellectual property fundamentals\n8. Taxation principles (as applied to business)\n9. Professional conduct in business context",
      category: "Business Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Business Law scope and requirements",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "bus-002",
      front: "What level of competency does the SRA expect for Business Law questions?",
      back: "SRA expects competency at the level of a newly qualified solicitor:\n- Apply legal principles to realistic client problems\n- Focus on practical application, not academic theory\n- No requirement to recall specific case names (unless commonly used terms)\n- No minute details that would typically be looked up\n- Emphasis on ethical problems and professional conduct\n- Current law as of 4 months before assessment",
      category: "Business Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA competency standards for newly qualified solicitors",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "bus-003",
      front: "What are the key steps in starting a business as a sole trader?",
      back: "1. Choose business name and check availability\n2. Register with HMRC for tax purposes\n3. Obtain necessary licenses and permits\n4. Set up business bank account\n5. Arrange appropriate insurance\n6. Consider VAT registration if turnover exceeds threshold\n7. Maintain proper business records",
      category: "Business Law",
      difficulty: "Foundation",
      legalPrinciple: "Sole trader business formation requirements",
    },
    {
      id: "bus-004",
      front: "What are the advantages and disadvantages of incorporating as a private limited company?",
      back: "Advantages:\n- Limited liability protection\n- Separate legal personality\n- Tax efficiency opportunities\n- Enhanced credibility\n- Easier to raise capital\n\nDisadvantages:\n- More complex administration\n- Public disclosure requirements\n- Corporation tax obligations\n- Directors' duties and responsibilities",
      category: "Business Law",
      difficulty: "Intermediate",
      legalPrinciple: "Private limited company characteristics",
      statuteReferences: ["Companies Act 2006"],
    },
  ],

  // FLK1 - Dispute Resolution
  "dispute-resolution": [
    {
      id: "disp-001",
      front: "What does the SRA SQE1 specification require for Dispute Resolution knowledge?",
      back: "SRA SQE1 Dispute Resolution covers:\n1. Civil litigation process and procedure\n2. Alternative dispute resolution (ADR)\n3. Court system and jurisdiction\n4. Pre-action protocols\n5. Case management and costs\n6. Evidence and disclosure\n7. Settlement and enforcement\n8. Professional conduct in litigation\n9. Overriding objective application",
      category: "Dispute Resolution",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Dispute Resolution scope",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024", "Civil Procedure Rules"],
    },
    {
      id: "disp-002",
      front: "How does the SRA expect Ethics and Professional Conduct to be tested in Dispute Resolution?",
      back: "Ethics and Professional Conduct in Dispute Resolution:\n- Examined pervasively across all questions\n- Can constitute up to 20% of total assessment\n- Applied to realistic client scenarios\n- Focus on SRA Standards and Regulations\n- Professional duties in litigation context\n- Conflicts of interest in disputes\n- Client confidentiality and privilege",
      category: "Dispute Resolution",
      difficulty: "Intermediate",
      legalPrinciple: "SRA professional conduct requirements in litigation",
      statuteReferences: ["SRA Standards and Regulations 2019", "SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "disp-003",
      front: "What are the three tracks in the Civil Procedure Rules and their financial limits?",
      back: "1. Small Claims Track: Up to £10,000 (£1,000 for personal injury)\n2. Fast Track: £10,000 - £25,000\n3. Multi-Track: Over £25,000\n\nEach track has different procedural requirements and cost rules.",
      category: "Dispute Resolution",
      difficulty: "Foundation",
      legalPrinciple: "CPR allocation tracks and limits",
      statuteReferences: ["Civil Procedure Rules"],
    },
    {
      id: "disp-004",
      front: "What is the overriding objective of the Civil Procedure Rules?",
      back: "To deal with cases justly and at proportionate cost, including:\n- Ensuring parties are on equal footing\n- Saving expense\n- Dealing with cases proportionately\n- Ensuring cases are dealt with expeditiously and fairly\n- Allotting appropriate share of court resources",
      category: "Dispute Resolution",
      difficulty: "Foundation",
      legalPrinciple: "CPR overriding objective",
      statuteReferences: ["CPR Part 1"],
    },
  ],

  // FLK1 - Contract Law
  "contract-law": [
    {
      id: "cont-001",
      front: "How does the SRA SQE1 specification approach Contract Law testing?",
      back: "SRA SQE1 Contract Law focuses on:\n1. Formation, terms, and interpretation\n2. Vitiating factors and remedies\n3. Discharge and frustration\n4. Commercial contract principles\n5. Consumer protection basics\n6. Professional conduct in contract matters\n7. Practical application to client scenarios\n8. No requirement for detailed case law knowledge\n9. Emphasis on problem-solving skills",
      category: "Contract Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Contract Law assessment approach",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "cont-002",
      front: "Explain the postal rule and its exceptions.",
      back: "Postal Rule: Acceptance takes effect when posted, not when received.\n\nApplies when:\n- Post is reasonable means of communication\n- Letter properly addressed and stamped\n- Offeror hasn't excluded the rule\n\nExceptions:\n- Offeror excludes the rule\n- Instantaneous communications (telex, email)\n- Acceptance would be unreasonable",
      category: "Contract Law",
      difficulty: "Intermediate",
      legalPrinciple: "Postal rule for contract acceptance",
      caseReferences: ["Adams v Lindsell [1818]", "Entores v Miles Far East Corp [1955]"],
    },
    {
      id: "cont-003",
      front: "What constitutes a valid offer in contract law?",
      back: "A valid offer must be:\n1. Clear and definite in terms\n2. Communicated to the offeree\n3. Distinguished from invitation to treat\n4. Capable of acceptance\n5. Made with intention to be bound\n\nExamples: Carlill v Carbolic Smoke Ball Co (advertisement as offer)",
      category: "Contract Law",
      difficulty: "Foundation",
      legalPrinciple: "Essential elements of contractual offer",
      caseReferences: ["Carlill v Carbolic Smoke Ball Co [1893]"],
    },
  ],

  // FLK1 - Tort Law
  "tort-law": [
    {
      id: "tort-001",
      front: "What Tort Law areas does the SRA SQE1 specification emphasize?",
      back: "SRA SQE1 Tort Law covers:\n1. Negligence (duty, breach, causation, remoteness)\n2. Occupiers' liability\n3. Nuisance (private and public)\n4. Trespass to person and property\n5. Defamation basics\n6. Vicarious liability\n7. Remedies and damages\n8. Professional negligence context\n9. Insurance and limitation issues",
      category: "Tort Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Tort Law scope and emphasis",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "tort-002",
      front: "State the elements required to establish negligence.",
      back: "1. Duty of Care: Legal duty owed to claimant (Caparo test)\n2. Breach of Duty: Defendant fell below reasonable standard\n3. Causation: Factual (but for test) and legal causation\n4. Remoteness: Damage must be reasonably foreseeable\n5. Damage: Actual loss or harm suffered",
      category: "Tort Law",
      difficulty: "Foundation",
      legalPrinciple: "Elements of negligence claim",
      caseReferences: ["Caparo Industries v Dickman [1990]", "Donoghue v Stevenson [1932]"],
    },
  ],

  // FLK1 - Constitutional and Administrative Law
  "constitutional-law": [
    {
      id: "const-001",
      front: "What Constitutional and Administrative Law topics are covered in SRA SQE1?",
      back: "SRA SQE1 Constitutional and Administrative Law includes:\n1. Sources of constitutional law\n2. Parliamentary sovereignty\n3. Rule of law principles\n4. Separation of powers\n5. Human rights fundamentals\n6. Judicial review basics\n7. Administrative decision-making\n8. Public law remedies\n9. EU law retained principles",
      category: "Constitutional Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Constitutional and Administrative Law scope",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024", "Human Rights Act 1998"],
    },
    {
      id: "const-002",
      front: "How does the SRA expect EU Law to be tested post-Brexit?",
      back: "Post-Brexit EU Law in SQE1:\n- Retained EU law principles\n- Impact on UK legal system\n- Interpretation of retained legislation\n- Supremacy and direct effect (historical context)\n- Current relationship with EU law\n- Professional conduct implications\n- Practical application in legal practice\n- No detailed knowledge of current EU developments required",
      category: "Constitutional Law",
      difficulty: "Intermediate",
      legalPrinciple: "Post-Brexit EU law application in UK practice",
      statuteReferences: ["European Union (Withdrawal) Act 2018", "SRA SQE1 Assessment Specification 2024"],
    },
  ],

  // FLK1 - Legal System and Legal Services
  "legal-system": [
    {
      id: "legal-001",
      front: "What aspects of the Legal System does SRA SQE1 cover?",
      back: "SRA SQE1 Legal System coverage:\n1. Court structure and hierarchy\n2. Sources of law (statute, common law, conventions)\n3. Legal personnel (judges, barristers, solicitors)\n4. Access to justice\n5. Legal aid and funding\n6. Alternative dispute resolution\n7. Regulatory framework\n8. Professional standards\n9. Client care requirements",
      category: "Legal System",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Legal System and Services scope",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024", "Legal Services Act 2007"],
    },
  ],

  // FLK2 - Property Practice (SRA 2024 Specification)
  "property-practice": [
    {
      id: "prop-001",
      front: "What Property Practice areas does the SRA SQE1 specification cover?",
      back: "SRA SQE1 Property Practice includes:\n1. Residential and commercial conveyancing\n2. Leasehold transactions\n3. Property finance and mortgages\n4. Planning and environmental issues\n5. Property taxation principles\n6. Professional conduct in property matters\n7. Client care and money handling\n8. Risk management\n9. Practical transaction management",
      category: "Property Practice",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Property Practice scope",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "prop-002",
      front: "What searches should be carried out in a property transaction?",
      back: "Standard searches:\n1. Local Authority Search - planning, roads, environmental\n2. Water Authority Search - drainage, water supply\n3. Environmental Search - contamination, flooding\n4. Chancel Repair Search - liability for church repairs\n5. Coal Mining Search - mining activity\n6. Commons Registration Search - common land rights",
      category: "Property Practice",
      difficulty: "Intermediate",
      legalPrinciple: "Property transaction searches",
    },
  ],

  // FLK2 - Land Law
  "land-law": [
    {
      id: "land-001",
      front: "How does SRA SQE1 approach Land Law testing?",
      back: "SRA SQE1 Land Law focuses on:\n1. Registered and unregistered land\n2. Legal and equitable interests\n3. Co-ownership and trusts of land\n4. Easements and covenants\n5. Mortgages and charges\n6. Leases and licenses\n7. Adverse possession basics\n8. Practical application to conveyancing\n9. Professional conduct implications",
      category: "Land Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Land Law assessment approach",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024", "Land Registration Act 2002"],
    },
    {
      id: "land-002",
      front: "Explain the difference between joint tenancy and tenancy in common.",
      back: "Joint Tenancy:\n- Right of survivorship applies\n- Four unities required (time, title, interest, possession)\n- Cannot leave share by will\n- Can be severed to create tenancy in common\n\nTenancy in Common:\n- No right of survivorship\n- Only unity of possession required\n- Can leave share by will\n- Shares may be unequal",
      category: "Land Law",
      difficulty: "Intermediate",
      legalPrinciple: "Co-ownership of land",
    },
  ],

  // FLK2 - Criminal Law and Practice
  "criminal-law": [
    {
      id: "crim-001",
      front: "What Criminal Law and Practice areas are covered in SRA SQE1?",
      back: "SRA SQE1 Criminal Law and Practice includes:\n1. Elements of criminal liability\n2. Specific offences (theft, fraud, violence)\n3. Defenses and mitigation\n4. Criminal procedure and evidence\n5. Police powers and rights\n6. Court procedures and sentencing\n7. Professional conduct in criminal practice\n8. Legal aid and funding\n9. Client care in criminal matters",
      category: "Criminal Law",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Criminal Law and Practice scope",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "crim-002",
      front: "What are the elements of actus reus?",
      back: "1. Conduct: What the defendant did or failed to do\n2. Circumstances: Surrounding circumstances that must exist\n3. Consequences: Results that must follow from conduct\n\nActus reus must be voluntary and may include:\n- Positive acts\n- Omissions (where duty exists)\n- State of affairs offences",
      category: "Criminal Law",
      difficulty: "Foundation",
      legalPrinciple: "Elements of actus reus",
    },
  ],

  // FLK2 - Wills and Administration
  "wills-administration": [
    {
      id: "wills-001",
      front: "What Wills and Administration topics does SRA SQE1 emphasize?",
      back: "SRA SQE1 Wills and Administration covers:\n1. Will drafting and execution\n2. Testamentary capacity and validity\n3. Intestacy rules\n4. Grant applications and probate\n5. Estate administration\n6. Inheritance tax principles\n7. Professional conduct and conflicts\n8. Client care and money handling\n9. Practical estate management",
      category: "Wills and Administration",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Wills and Administration scope",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024", "Wills Act 1837"],
    },
    {
      id: "wills-002",
      front: "What are the formal requirements for a valid will under s.9 Wills Act 1837?",
      back: "1. In writing\n2. Signed by testator (or someone in their presence at their direction)\n3. Testator intended signature to give effect to will\n4. Signature witnessed by two witnesses present at same time\n5. Each witness signs in presence of testator\n6. Witnesses need not be present when each other signs",
      category: "Wills and Administration",
      difficulty: "Foundation",
      legalPrinciple: "Formal validity of wills",
      statuteReferences: ["Wills Act 1837, s.9"],
    },
  ],

  // FLK2 - Solicitors Accounts
  "solicitors-accounts": [
    {
      id: "acc-001",
      front: "What Solicitors Accounts knowledge does SRA SQE1 require?",
      back: "SRA SQE1 Solicitors Accounts covers:\n1. SRA Accounts Rules 2019 compliance\n2. Client money identification and handling\n3. Accounting systems and records\n4. Reconciliation procedures\n5. Interest on client money\n6. Professional conduct obligations\n7. Risk management\n8. Regulatory compliance\n9. Practical application scenarios",
      category: "Solicitors Accounts",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Solicitors Accounts requirements",
      statuteReferences: ["SRA Accounts Rules 2019", "SRA SQE1 Assessment Specification 2024"],
    },
    {
      id: "acc-002",
      front: "What are the key principles of the SRA Accounts Rules?",
      back: "1. Client money must be kept separate from firm money\n2. Client money must be held in designated client account\n3. Proper accounting records must be maintained\n4. Regular reconciliations must be performed\n5. Client money must be available on demand\n6. No use of client money for firm purposes\n7. Compliance monitoring required",
      category: "Solicitors Accounts",
      difficulty: "Intermediate",
      legalPrinciple: "SRA Accounts Rules principles",
      statuteReferences: ["SRA Accounts Rules 2019"],
    },
  ],

  // FLK2 - Trusts
  trusts: [
    {
      id: "trust-001",
      front: "How does SRA SQE1 test Trusts knowledge?",
      back: "SRA SQE1 Trusts focuses on:\n1. Express, resulting, and constructive trusts\n2. Three certainties and formalities\n3. Trustees' duties and powers\n4. Beneficiaries' rights\n5. Breach of trust and remedies\n6. Variation and termination\n7. Professional conduct in trust matters\n8. Practical trust administration\n9. Tax implications (basic principles)",
      category: "Trusts",
      difficulty: "Foundation",
      legalPrinciple: "SRA SQE1 Trusts assessment approach",
      statuteReferences: ["SRA SQE1 Assessment Specification 2024", "Trustee Act 2000"],
    },
    {
      id: "trust-002",
      front: "What are the key duties of trustees?",
      back: "1. Duty of care - act as prudent businessperson\n2. Duty to act within powers\n3. Duty of impartiality between beneficiaries\n4. Duty to act personally (no delegation without authority)\n5. Duty to invest properly\n6. Duty to account and provide information\n7. Duty not to profit from position",
      category: "Trusts",
      difficulty: "Intermediate",
      legalPrinciple: "Trustees' duties",
      statuteReferences: ["Trustee Act 2000"],
    },
  ],
}

export const comprehensiveMindMaps: Record<string, any> = {
  "business-law": {
    title: "Business Law & Practice (FLK1)",
    subtitle: "SRA SQE1 Specification 2024",
    nodes: [
      {
        id: "center",
        title: "Business Law & Practice",
        description: "SRA SQE1 FLK1 - Competency level: Newly qualified solicitor",
        x: 400,
        y: 300,
        level: 0,
        connections: ["formation", "governance", "finance", "employment", "ip", "ethics"],
        color: "bg-blue-500",
      },
      {
        id: "formation",
        title: "Business Formation",
        description: "SRA Requirement: All business structures and formation processes",
        x: 200,
        y: 150,
        level: 1,
        connections: ["sole-trader", "partnership", "llp", "company"],
        color: "bg-green-500",
      },
      {
        id: "governance",
        title: "Corporate Governance",
        description: "SRA Focus: Directors' duties, meetings, decision-making",
        x: 600,
        y: 150,
        level: 1,
        connections: ["directors", "shareholders", "meetings", "compliance"],
        color: "bg-purple-500",
      },
      {
        id: "finance",
        title: "Business Finance",
        description: "SRA Coverage: Funding, securities, insolvency basics",
        x: 200,
        y: 450,
        level: 1,
        connections: ["equity", "debt", "securities", "insolvency"],
        color: "bg-orange-500",
      },
      {
        id: "employment",
        title: "Employment Law",
        description: "SRA Requirement: Basic employment law principles",
        x: 600,
        y: 450,
        level: 1,
        connections: ["contracts", "discrimination", "termination"],
        color: "bg-red-500",
      },
      {
        id: "ip",
        title: "Intellectual Property",
        description: "SRA Coverage: Fundamentals of IP protection",
        x: 100,
        y: 300,
        level: 1,
        connections: ["copyright", "trademarks", "patents"],
        color: "bg-cyan-500",
      },
      {
        id: "ethics",
        title: "Professional Conduct",
        description: "SRA Emphasis: Up to 20% of questions, pervasive testing",
        x: 700,
        y: 300,
        level: 1,
        connections: ["standards", "conflicts", "client-care"],
        color: "bg-yellow-500",
      },
    ],
  },

  "contract-law": {
    title: "Contract Law (FLK1)",
    subtitle: "SRA SQE1 Specification 2024 - Practical Application Focus",
    nodes: [
      {
        id: "center",
        title: "Contract Law",
        description: "SRA Focus: Practical application to client scenarios",
        x: 400,
        y: 300,
        level: 0,
        connections: ["formation", "terms", "vitiating", "discharge", "remedies", "commercial"],
        color: "bg-blue-500",
      },
      {
        id: "formation",
        title: "Formation",
        description: "SRA Requirement: Offer, acceptance, consideration, intention",
        x: 200,
        y: 150,
        level: 1,
        connections: ["offer", "acceptance", "consideration", "intention"],
        color: "bg-green-500",
      },
      {
        id: "terms",
        title: "Terms & Interpretation",
        description: "SRA Coverage: Express, implied, exclusion clauses",
        x: 600,
        y: 150,
        level: 1,
        connections: ["express", "implied", "exclusion", "interpretation"],
        color: "bg-purple-500",
      },
      {
        id: "vitiating",
        title: "Vitiating Factors",
        description: "SRA Focus: Misrepresentation, mistake, duress, undue influence",
        x: 200,
        y: 450,
        level: 1,
        connections: ["misrep", "mistake", "duress", "undue-influence"],
        color: "bg-orange-500",
      },
      {
        id: "discharge",
        title: "Discharge",
        description: "SRA Requirement: Performance, breach, frustration",
        x: 600,
        y: 450,
        level: 1,
        connections: ["performance", "breach", "frustration"],
        color: "bg-red-500",
      },
      {
        id: "remedies",
        title: "Remedies",
        description: "SRA Coverage: Damages, specific performance, injunctions",
        x: 100,
        y: 300,
        level: 1,
        connections: ["damages", "specific", "injunctions"],
        color: "bg-cyan-500",
      },
      {
        id: "commercial",
        title: "Commercial Contracts",
        description: "SRA Emphasis: Business context and consumer protection",
        x: 700,
        y: 300,
        level: 1,
        connections: ["sale-goods", "consumer", "unfair-terms"],
        color: "bg-yellow-500",
      },
    ],
  },

  "property-practice": {
    title: "Property Practice (FLK2)",
    subtitle: "SRA SQE1 Specification 2024 - Transaction Focus",
    nodes: [
      {
        id: "center",
        title: "Property Practice",
        description: "SRA Focus: Practical transaction management and client care",
        x: 400,
        y: 300,
        level: 0,
        connections: ["residential", "commercial", "leasehold", "finance", "taxation", "conduct"],
        color: "bg-blue-500",
      },
      {
        id: "residential",
        title: "Residential Conveyancing",
        description: "SRA Requirement: Complete transaction process",
        x: 200,
        y: 150,
        level: 1,
        connections: ["pre-contract", "exchange", "completion", "registration"],
        color: "bg-green-500",
      },
      {
        id: "commercial",
        title: "Commercial Property",
        description: "SRA Coverage: Business premises and investment property",
        x: 600,
        y: 150,
        level: 1,
        connections: ["due-diligence", "warranties", "conditions"],
        color: "bg-purple-500",
      },
      {
        id: "leasehold",
        title: "Leasehold Transactions",
        description: "SRA Focus: Lease assignments and new leases",
        x: 200,
        y: 450,
        level: 1,
        connections: ["assignments", "new-leases", "consents"],
        color: "bg-orange-500",
      },
      {
        id: "finance",
        title: "Property Finance",
        description: "SRA Requirement: Mortgages and security",
        x: 600,
        y: 450,
        level: 1,
        connections: ["mortgages", "charges", "guarantees"],
        color: "bg-red-500",
      },
      {
        id: "taxation",
        title: "Property Taxation",
        description: "SRA Coverage: SDLT, VAT, CGT principles",
        x: 100,
        y: 300,
        level: 1,
        connections: ["sdlt", "vat", "cgt"],
        color: "bg-cyan-500",
      },
      {
        id: "conduct",
        title: "Professional Conduct",
        description: "SRA Emphasis: Client money, conflicts, undertakings",
        x: 700,
        y: 300,
        level: 1,
        connections: ["client-money", "conflicts", "undertakings"],
        color: "bg-yellow-500",
      },
    ],
  },

  "criminal-law": {
    title: "Criminal Law & Practice (FLK2)",
    subtitle: "SRA SQE1 Specification 2024 - Procedure and Conduct Focus",
    nodes: [
      {
        id: "center",
        title: "Criminal Law & Practice",
        description: "SRA Focus: Practical criminal practice and procedure",
        x: 400,
        y: 300,
        level: 0,
        connections: ["liability", "offences", "procedure", "evidence", "sentencing", "conduct"],
        color: "bg-blue-500",
      },
      {
        id: "liability",
        title: "Criminal Liability",
        description: "SRA Requirement: Actus reus, mens rea, defenses",
        x: 200,
        y: 150,
        level: 1,
        connections: ["actus-reus", "mens-rea", "defenses"],
        color: "bg-green-500",
      },
      {
        id: "offences",
        title: "Specific Offences",
        description: "SRA Coverage: Theft, fraud, violence, public order",
        x: 600,
        y: 150,
        level: 1,
        connections: ["theft", "fraud", "violence", "public-order"],
        color: "bg-purple-500",
      },
      {
        id: "procedure",
        title: "Criminal Procedure",
        description: "SRA Focus: Court procedures and case management",
        x: 200,
        y: 450,
        level: 1,
        connections: ["magistrates", "crown-court", "appeals"],
        color: "bg-orange-500",
      },
      {
        id: "evidence",
        title: "Criminal Evidence",
        description: "SRA Requirement: Admissibility and disclosure",
        x: 600,
        y: 450,
        level: 1,
        connections: ["admissibility", "disclosure", "witnesses"],
        color: "bg-red-500",
      },
      {
        id: "sentencing",
        title: "Sentencing",
        description: "SRA Coverage: Sentencing guidelines and mitigation",
        x: 100,
        y: 300,
        level: 1,
        connections: ["guidelines", "mitigation", "appeals"],
        color: "bg-cyan-500",
      },
      {
        id: "conduct",
        title: "Professional Conduct",
        description: "SRA Emphasis: Client care, conflicts, legal aid",
        x: 700,
        y: 300,
        level: 1,
        connections: ["client-care", "conflicts", "legal-aid"],
        color: "bg-yellow-500",
      },
    ],
  },
}

interface FlashCardComponentProps {
  cards: FlashCard[]
  category: string
}

export function ComprehensiveFlashCardComponent({ cards, category }: FlashCardComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const currentCard = cards[currentIndex]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    setIsFlipped(false)
  }

  const markCorrect = () => {
    setScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }))
    nextCard()
  }

  const markIncorrect = () => {
    setScore((prev) => ({ ...prev, total: prev.total + 1 }))
    nextCard()
  }

  const resetScore = () => {
    setScore({ correct: 0, total: 0 })
  }

  if (!currentCard) return null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{category} Flashcards</h2>
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Score: {score.correct}/{score.total}
            {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
          </div>
          <Button variant="outline" size="sm" onClick={resetScore}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="min-h-[400px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{isFlipped ? "Answer" : "Question"}</CardTitle>
            <Badge
              variant={
                currentCard.difficulty === "Foundation"
                  ? "secondary"
                  : currentCard.difficulty === "Intermediate"
                    ? "default"
                    : currentCard.difficulty === "Advanced"
                      ? "destructive"
                      : "outline"
              }
            >
              {currentCard.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] flex items-center">
            <div className="w-full">
              {isFlipped ? (
                <div className="space-y-4">
                  <div className="whitespace-pre-line text-sm leading-relaxed">{currentCard.back}</div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Legal Principle: {currentCard.legalPrinciple}
                    </p>
                    {currentCard.caseReferences && (
                      <p className="text-xs text-muted-foreground">Cases: {currentCard.caseReferences.join(", ")}</p>
                    )}
                    {currentCard.statuteReferences && (
                      <p className="text-xs text-muted-foreground">
                        Statutes: {currentCard.statuteReferences.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-lg leading-relaxed">{currentCard.front}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" onClick={prevCard} disabled={cards.length <= 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
            {isFlipped ? "Show Question" : "Show Answer"}
          </Button>
        </div>

        <Button variant="outline" onClick={nextCard} disabled={cards.length <= 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {isFlipped && (
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="destructive" onClick={markIncorrect}>
            Incorrect
          </Button>
          <Button variant="default" onClick={markCorrect}>
            Correct
          </Button>
        </div>
      )}
    </div>
  )
}
