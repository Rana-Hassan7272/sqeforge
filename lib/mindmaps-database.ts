export interface MindMapNode {
  id: string
  label: string
  type: "root" | "branch" | "leaf"
  children?: MindMapNode[]
  description?: string
  caselaw?: string[]
  statutes?: string[]
}

export interface MindMap {
  id: string
  title: string
  module: string
  topic: string
  rootNode: MindMapNode
  description: string
}

export const mindMapsDatabase: Record<string, MindMap[]> = {
  "business-law-practice": [
    {
      id: "bl-directors-duties",
      title: "Directors' Duties",
      module: "business-law-practice",
      topic: "directors-duties",
      description: "Comprehensive overview of directors' duties under Companies Act 2006",
      rootNode: {
        id: "root",
        label: "Directors' Duties",
        type: "root",
        children: [
          {
            id: "statutory-duties",
            label: "Statutory Duties (CA 2006)",
            type: "branch",
            children: [
              {
                id: "s171",
                label: "s.171 - Act within powers",
                type: "leaf",
                description:
                  "Directors must act in accordance with company's constitution and exercise powers for proper purposes",
                caselaw: ["Howard Smith Ltd v Ampol Petroleum Ltd", "Eclairs Group Ltd v JKX Oil & Gas plc"],
              },
              {
                id: "s172",
                label: "s.172 - Promote success of company",
                type: "leaf",
                description: "Duty to act in way most likely to promote success of company for benefit of members",
                caselaw: ["Regentcrest plc v Cohen", "BTI 2014 LLC v Sequana SA"],
              },
              {
                id: "s173",
                label: "s.173 - Exercise independent judgment",
                type: "leaf",
                description: "Directors must exercise independent judgment, not fetter discretion",
                caselaw: ["Fulham Football Club Ltd v Cabra Estates plc"],
              },
              {
                id: "s174",
                label: "s.174 - Reasonable care, skill and diligence",
                type: "leaf",
                description: "Objective and subjective test for standard of care",
                caselaw: ["Re D'Jan of London Ltd", "Dorchester Finance Co Ltd v Stebbing"],
              },
              {
                id: "s175",
                label: "s.175 - Avoid conflicts of interest",
                type: "leaf",
                description: "Duty to avoid situations where personal interests conflict with company interests",
                caselaw: ["Boardman v Phipps", "Regal (Hastings) Ltd v Gulliver"],
              },
            ],
          },
          {
            id: "enforcement",
            label: "Enforcement",
            type: "branch",
            children: [
              {
                id: "derivative-claims",
                label: "Derivative Claims",
                type: "leaf",
                description: "Claims brought by shareholders on behalf of company",
                statutes: ["Companies Act 2006 ss.260-264"],
              },
              {
                id: "unfair-prejudice",
                label: "Unfair Prejudice",
                type: "leaf",
                description: "Personal claims by shareholders for unfairly prejudicial conduct",
                statutes: ["Companies Act 2006 s.994"],
              },
            ],
          },
        ],
      },
    },
    {
      id: "bl-company-formation",
      title: "Company Formation",
      module: "business-law-practice",
      topic: "company-formation",
      description: "Process and requirements for incorporating a company",
      rootNode: {
        id: "root",
        label: "Company Formation",
        type: "root",
        children: [
          {
            id: "incorporation-process",
            label: "Incorporation Process",
            type: "branch",
            children: [
              {
                id: "memorandum",
                label: "Memorandum of Association",
                type: "leaf",
                description: "Document signed by subscribers stating intention to form company",
                statutes: ["Companies Act 2006 s.8"],
              },
              {
                id: "articles",
                label: "Articles of Association",
                type: "leaf",
                description: "Company's constitution governing internal management",
                statutes: ["Companies Act 2006 ss.17-38"],
              },
              {
                id: "application",
                label: "Application for Registration",
                type: "leaf",
                description: "Form IN01 with required information and documents",
                statutes: ["Companies Act 2006 s.9"],
              },
            ],
          },
          {
            id: "legal-effects",
            label: "Legal Effects of Incorporation",
            type: "branch",
            children: [
              {
                id: "separate-personality",
                label: "Separate Legal Personality",
                type: "leaf",
                description: "Company exists as separate legal person from its members",
                caselaw: ["Salomon v A Salomon & Co Ltd"],
              },
              {
                id: "limited-liability",
                label: "Limited Liability",
                type: "leaf",
                description: "Members' liability limited to amount unpaid on shares",
                caselaw: ["Lee v Lee's Air Farming Ltd"],
              },
            ],
          },
        ],
      },
    },
  ],

  "contract-law-practice": [
    {
      id: "cl-formation",
      title: "Contract Formation",
      module: "contract-law-practice",
      topic: "formation",
      description: "Essential elements required to form a valid contract",
      rootNode: {
        id: "root",
        label: "Contract Formation",
        type: "root",
        children: [
          {
            id: "offer",
            label: "Offer",
            type: "branch",
            children: [
              {
                id: "definition",
                label: "Definition",
                type: "leaf",
                description: "Clear, definite proposal to enter into contract on specified terms",
                caselaw: ["Carlill v Carbolic Smoke Ball Co", "Gibson v Manchester City Council"],
              },
              {
                id: "invitation-to-treat",
                label: "Invitation to Treat",
                type: "leaf",
                description: "Invitation to make an offer, not an offer itself",
                caselaw: ["Fisher v Bell", "Pharmaceutical Society of GB v Boots Cash Chemists"],
              },
              {
                id: "termination",
                label: "Termination of Offer",
                type: "leaf",
                description: "Offer can be terminated by revocation, rejection, lapse of time, or death",
                caselaw: ["Byrne v Van Tienhoven", "Dickinson v Dodds"],
              },
            ],
          },
          {
            id: "acceptance",
            label: "Acceptance",
            type: "branch",
            children: [
              {
                id: "communication",
                label: "Communication",
                type: "leaf",
                description: "Acceptance must be communicated to offeror",
                caselaw: ["Entores Ltd v Miles Far East Corporation", "Brinkibon Ltd v Stahag Stahl"],
              },
              {
                id: "postal-rule",
                label: "Postal Rule",
                type: "leaf",
                description: "Postal acceptance effective when posted, not when received",
                caselaw: ["Adams v Lindsell", "Household Fire Insurance v Grant"],
              },
              {
                id: "conduct",
                label: "Acceptance by Conduct",
                type: "leaf",
                description: "Acceptance can be inferred from conduct",
                caselaw: ["Brogden v Metropolitan Railway Co"],
              },
            ],
          },
          {
            id: "consideration",
            label: "Consideration",
            type: "branch",
            children: [
              {
                id: "definition",
                label: "Definition",
                type: "leaf",
                description: "Something of value in the eye of the law",
                caselaw: ["Currie v Misa", "Thomas v Thomas"],
              },
              {
                id: "rules",
                label: "Rules of Consideration",
                type: "leaf",
                description: "Must be sufficient but need not be adequate, must move from promisee, must not be past",
                caselaw: ["Chappell & Co Ltd v Nestlé Co Ltd", "Re McArdle"],
              },
            ],
          },
        ],
      },
    },
  ],

  "tort-law-practice": [
    {
      id: "tl-negligence",
      title: "Negligence",
      module: "tort-law-practice",
      topic: "negligence",
      description: "Elements and principles of negligence liability",
      rootNode: {
        id: "root",
        label: "Negligence",
        type: "root",
        children: [
          {
            id: "duty-of-care",
            label: "Duty of Care",
            type: "branch",
            children: [
              {
                id: "caparo-test",
                label: "Caparo Test",
                type: "leaf",
                description: "Three-stage test: foreseeability, proximity, fair/just/reasonable",
                caselaw: ["Caparo Industries plc v Dickman", "Robinson v Chief Constable of West Yorkshire"],
              },
              {
                id: "established-categories",
                label: "Established Categories",
                type: "leaf",
                description: "Road users, doctor-patient, employer-employee, etc.",
                caselaw: ["Donoghue v Stevenson", "Cassidy v Ministry of Health"],
              },
            ],
          },
          {
            id: "breach",
            label: "Breach of Duty",
            type: "branch",
            children: [
              {
                id: "reasonable-person",
                label: "Reasonable Person Test",
                type: "leaf",
                description: "Objective standard of reasonable person in defendant's position",
                caselaw: ["Blyth v Birmingham Waterworks", "Nettleship v Weston"],
              },
              {
                id: "risk-factors",
                label: "Risk Factors",
                type: "leaf",
                description: "Likelihood of harm, severity of harm, cost of precautions, social utility",
                caselaw: ["Bolton v Stone", "Paris v Stepney Borough Council"],
              },
            ],
          },
          {
            id: "causation",
            label: "Causation",
            type: "branch",
            children: [
              {
                id: "factual-causation",
                label: "Factual Causation",
                type: "leaf",
                description: "But for test - would damage have occurred but for defendant's breach?",
                caselaw: ["Barnett v Chelsea & Kensington Hospital", "Cork v Kirby MacLean Ltd"],
              },
              {
                id: "legal-causation",
                label: "Legal Causation",
                type: "leaf",
                description: "Remoteness - was damage reasonably foreseeable?",
                caselaw: ["The Wagon Mound (No 1)", "Hughes v Lord Advocate"],
              },
            ],
          },
        ],
      },
    },
  ],

  "property-law-practice": [
    {
      id: "pl-freehold",
      title: "Freehold Ownership",
      module: "property-law-practice",
      topic: "freehold",
      description: "Nature and characteristics of freehold estates",
      rootNode: {
        id: "root",
        label: "Freehold Ownership",
        type: "root",
        children: [
          {
            id: "fee-simple",
            label: "Fee Simple Absolute",
            type: "branch",
            children: [
              {
                id: "characteristics",
                label: "Characteristics",
                type: "leaf",
                description: "Perpetual duration, inheritable, alienable",
                statutes: ["Law of Property Act 1925 s.1"],
              },
              {
                id: "restrictions",
                label: "Restrictions",
                type: "leaf",
                description: "Planning laws, compulsory purchase, taxation",
                statutes: ["Town and Country Planning Act 1990"],
              },
            ],
          },
          {
            id: "co-ownership",
            label: "Co-ownership",
            type: "branch",
            children: [
              {
                id: "joint-tenancy",
                label: "Joint Tenancy",
                type: "leaf",
                description: "Four unities, right of survivorship",
                caselaw: ["AG Securities v Vaughan", "Hammersmith LBC v Monk"],
              },
              {
                id: "tenancy-in-common",
                label: "Tenancy in Common",
                type: "leaf",
                description: "Distinct shares, no survivorship",
                caselaw: ["Bull v Bull", "Jones v Kernott"],
              },
            ],
          },
        ],
      },
    },
  ],

  "criminal-law-practice": [
    {
      id: "crl-murder",
      title: "Murder",
      module: "criminal-law-practice",
      topic: "murder",
      description: "Elements and defences to murder",
      rootNode: {
        id: "root",
        label: "Murder",
        type: "root",
        children: [
          {
            id: "actus-reus",
            label: "Actus Reus",
            type: "branch",
            children: [
              {
                id: "unlawful-killing",
                label: "Unlawful Killing",
                type: "leaf",
                description: "Causing death of human being without lawful justification",
                caselaw: ["R v Gibbins and Proctor", "R v Stone and Dobinson"],
              },
              {
                id: "causation",
                label: "Causation",
                type: "leaf",
                description: "Factual and legal causation must be established",
                caselaw: ["R v White", "R v Smith", "R v Cheshire"],
              },
            ],
          },
          {
            id: "mens-rea",
            label: "Mens Rea",
            type: "branch",
            children: [
              {
                id: "malice-aforethought",
                label: "Malice Aforethought",
                type: "leaf",
                description: "Intention to kill or cause grievous bodily harm",
                caselaw: ["R v Vickers", "R v Cunningham", "R v Woollin"],
              },
            ],
          },
          {
            id: "defences",
            label: "Defences",
            type: "branch",
            children: [
              {
                id: "diminished-responsibility",
                label: "Diminished Responsibility",
                type: "leaf",
                description: "Abnormality of mental functioning substantially impairing responsibility",
                statutes: ["Homicide Act 1957 s.2 (as amended)"],
                caselaw: ["R v Byrne", "R v Golds"],
              },
              {
                id: "loss-of-control",
                label: "Loss of Control",
                type: "leaf",
                description: "Loss of self-control with qualifying trigger",
                statutes: ["Coroners and Justice Act 2009 ss.54-56"],
                caselaw: ["R v Clinton", "R v Dawes"],
              },
            ],
          },
        ],
      },
    },
  ],

  "dispute-resolution": [
    {
      id: "dr-civil-procedure",
      title: "Civil Procedure",
      module: "dispute-resolution",
      topic: "civil-procedure",
      description: "Overview of civil litigation process",
      rootNode: {
        id: "root",
        label: "Civil Procedure",
        type: "root",
        children: [
          {
            id: "pre-action",
            label: "Pre-Action",
            type: "branch",
            children: [
              {
                id: "protocols",
                label: "Pre-Action Protocols",
                type: "leaf",
                description: "Specific protocols for different types of claims",
                statutes: ["CPR Pre-Action Protocols"],
              },
              {
                id: "letter-of-claim",
                label: "Letter of Claim",
                type: "leaf",
                description: "Formal notification of intended claim with details",
                statutes: ["Practice Direction - Pre-Action Conduct"],
              },
            ],
          },
          {
            id: "proceedings",
            label: "Court Proceedings",
            type: "branch",
            children: [
              {
                id: "claim-form",
                label: "Claim Form",
                type: "leaf",
                description: "N1 form to commence proceedings",
                statutes: ["CPR Part 7"],
              },
              {
                id: "service",
                label: "Service",
                type: "leaf",
                description: "Formal delivery of court documents",
                statutes: ["CPR Part 6"],
              },
              {
                id: "defence",
                label: "Defence",
                type: "leaf",
                description: "Defendant's response to claim",
                statutes: ["CPR Part 15"],
              },
            ],
          },
          {
            id: "case-management",
            label: "Case Management",
            type: "branch",
            children: [
              {
                id: "allocation",
                label: "Allocation to Track",
                type: "leaf",
                description: "Small claims, fast track, or multi-track",
                statutes: ["CPR Parts 26-28"],
              },
              {
                id: "directions",
                label: "Case Management Directions",
                type: "leaf",
                description: "Court orders for case progression",
                statutes: ["CPR Part 29"],
              },
            ],
          },
        ],
      },
    },
  ],
}

export const getMindMapsByModule = (module: string): MindMap[] => {
  return mindMapsDatabase[module] || []
}

export const getMindMapByTopic = (module: string, topic: string): MindMap | undefined => {
  const moduleMindMaps = mindMapsDatabase[module] || []

  const normalizedTopic = topic.toLowerCase().replace(/[-_]/g, " ").trim()

  return moduleMindMaps.find((mm) => {
    const mmTopic = mm.topic.toLowerCase().replace(/[-_]/g, " ")
    const mmTitle = mm.title.toLowerCase().replace(/[-_]/g, " ")

    return (
      mmTopic === normalizedTopic ||
      mmTopic.includes(normalizedTopic) ||
      normalizedTopic.includes(mmTopic) ||
      mmTitle.includes(normalizedTopic) ||
      mm.id.includes(topic)
    )
  })
}

export const getAllMindMaps = (): MindMap[] => {
  return Object.values(mindMapsDatabase).flat()
}
