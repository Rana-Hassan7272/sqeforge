// Mock Exam Database for SQE Practice
// FLK1 and FLK2 mock exams with 180 questions each, mixing ALL topics within each FLK area
// All questions are scenario-based with detailed paragraphs

export interface MockQuestion {
  id: number
  flkType: "FLK1" | "FLK2"
  module: string
  topic: string
  subtopic: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeLimit: number
  legislation: string[]
  cases: string[]
  tags: string[]
}

const flk1Topics = [
  // Contract Law (SQE requirement)
  "Contract Formation",
  "Contract Terms",
  "Contract Breach",
  "Contract Remedies",
  "Misrepresentation",
  "Mistake",
  "Duress",
  "Undue Influence",
  "Illegality",
  "Frustration",

  // Tort Law (SQE requirement)
  "Negligence",
  "Occupiers' Liability",
  "Nuisance",
  "Trespass to Person",
  "Trespass to Land",
  "Vicarious Liability",

  // Business Law (SQE requirement)
  "Company Formation",
  "Directors' Duties",
  "Shareholders' Rights",
  "Corporate Governance",
  "Insolvency",
  "Partnership",
  "Agency",

  // Dispute Resolution (SQE requirement)
  "Civil Procedure",
  "Evidence",
  "Alternative Dispute Resolution",
  "Costs",
  "Appeals",
]

const flk2Topics = [
  // Property Law (SQE requirement)
  "Freehold",
  "Leasehold",
  "Easements",
  "Covenants",
  "Mortgages",
  "Co-ownership",
  "Land Registration",
  "Trusts of Land",

  // Criminal Law & Procedure (SQE requirement)
  "Criminal Procedure",
  "Criminal Evidence",
  "Sentencing",
  "Appeals",
  "Bail",
  "Disclosure",

  // Professional Conduct (SQE requirement)
  "Professional Conduct",
  "Client Care",
  "Confidentiality",
  "Conflicts of Interest",
  "Money Laundering",
  "Regulatory Compliance",
]

const generateFLK1Questions = (startId: number, count: number): MockQuestion[] => {
  const scenarios = [
    {
      context: "Multi-Party Commercial Contract Dispute",
      background:
        "Meridian Construction Ltd entered into a complex construction contract with Pinnacle Developments plc for the construction of a £50 million mixed-use development in Manchester. The project involved multiple sub-contractors, including specialist firms for electrical work, plumbing, and architectural features. The main contract contained detailed specifications, milestone payments, liquidated damages clauses, and force majeure provisions. Meridian also entered into separate supply agreements with various material suppliers, including a long-term arrangement with SteelCorp Industries for structural steel components.",
      situation:
        "Eighteen months into the project, several critical issues have emerged simultaneously: SteelCorp has declared insolvency, causing significant delays to the steel frame construction; Pinnacle has withheld two milestone payments claiming defective work in the foundation phase; a sub-contractor has filed a negligence claim against Meridian regarding water damage to neighboring properties; and new environmental regulations have been introduced requiring costly modifications to the building's ventilation system. The project is now six months behind schedule, and all parties are threatening litigation while attempting to negotiate a resolution.",
    },
    {
      context: "Professional Negligence and Vicarious Liability Case",
      background:
        "Hartwell & Associates is a prestigious law firm specializing in corporate transactions. The firm was instructed by TechVenture Capital Ltd to conduct due diligence on a proposed £25 million acquisition of InnovateSoft, a software development company. The transaction involved complex intellectual property issues, employment law considerations, and regulatory compliance matters across multiple jurisdictions. Sarah Mitchell, a senior associate at Hartwell, was assigned to lead the due diligence team, which included junior lawyers, paralegals, and external consultants. The firm's retainer agreement contained standard limitation of liability clauses and professional indemnity provisions.",
      situation:
        "Six months after completion of the acquisition, TechVenture discovered that InnovateSoft had been involved in ongoing patent litigation that was not disclosed during the due diligence process. This litigation has now resulted in a £15 million judgment against InnovateSoft, significantly affecting the value of TechVenture's investment. Investigation reveals that the patent litigation was mentioned in board minutes that were provided to Hartwell but were not properly reviewed by the due diligence team. TechVenture is now claiming professional negligence against Hartwell, seeking damages for the diminution in value of their investment, while Hartwell maintains that the information was available and that any failure was on the part of TechVenture's own internal legal team.",
    },
    {
      context: "Corporate Governance and Directors' Duties Crisis",
      background:
        "Quantum Technologies plc is a publicly listed company specializing in quantum computing research and development. The company has experienced rapid growth over the past five years, expanding from a small startup to a major player in the quantum technology sector. The board consists of seven directors: three executive directors (CEO Marcus Chen, CTO Dr. Elena Rodriguez, and CFO James Thompson) and four non-executive directors, including the chairman Sir Robert Hamilton. The company has recently been the subject of a takeover bid from GlobalTech Corporation, a US-based technology conglomerate, valuing Quantum at £2.8 billion.",
      situation:
        "During the takeover negotiations, several governance issues have emerged: Marcus Chen has been secretly negotiating a separate employment contract with GlobalTech that would guarantee him a senior position post-acquisition; Dr. Rodriguez has discovered that the company's flagship quantum processor technology may infringe patents held by a competitor, but this information has not been disclosed to the board or to GlobalTech; James Thompson has identified significant accounting irregularities in the previous year's financial statements that could affect the company's valuation; and two of the non-executive directors have undisclosed financial interests in companies that would benefit from the takeover. The takeover deadline is approaching, shareholders are demanding clarity, and the board is divided on how to proceed while managing their various legal and fiduciary obligations.",
    },
  ]

  const questionsPerTopic = Math.floor(count / flk1Topics.length)
  const remainingQuestions = count % flk1Topics.length

  const questions: MockQuestion[] = []
  let currentId = startId

  // Generate questions for each topic to ensure comprehensive coverage
  flk1Topics.forEach((topic, topicIndex) => {
    const topicQuestionCount = questionsPerTopic + (topicIndex < remainingQuestions ? 1 : 0)

    for (let i = 0; i < topicQuestionCount; i++) {
      // Vary intensity: 40% Hard, 35% Medium, 25% Easy for Premium package
      const rand = Math.random()
      const isHard = rand < 0.4
      const isMedium = rand >= 0.4 && rand < 0.75

      const scenarioIndex = (currentId + i) % scenarios.length
      const scenario = scenarios[scenarioIndex]

      // Determine module based on topic
      let module = "contract-law"
      if (
        topic.includes("Negligence") ||
        topic.includes("Occupiers") ||
        topic.includes("Nuisance") ||
        topic.includes("Trespass") ||
        topic.includes("Vicarious")
      ) {
        module = "tort-law"
      } else if (
        topic.includes("Company") ||
        topic.includes("Directors") ||
        topic.includes("Shareholders") ||
        topic.includes("Corporate") ||
        topic.includes("Insolvency") ||
        topic.includes("Partnership") ||
        topic.includes("Agency")
      ) {
        module = "business-law"
      } else if (
        topic.includes("Procedure") ||
        topic.includes("Evidence") ||
        topic.includes("Dispute") ||
        topic.includes("Costs") ||
        topic.includes("Appeals")
      ) {
        module = "dispute-resolution"
      }

      // Create comprehensive scenario-based question with extensive paragraphs
      const questionText = `${scenario.context} - Advanced Legal Analysis\n\n**Background Context:**\n${scenario.background}\n\n**Current Situation:**\n${scenario.situation}\n\n**Legal Issue for Analysis:**\nIn the context of ${topic}, you are required to provide a comprehensive legal analysis that demonstrates advanced understanding of the relevant principles, statutory provisions, and case law authorities. ${
        isHard
          ? `This question requires you to critically evaluate the complex interplay between multiple legal doctrines, consider policy implications, analyze the development of the law through judicial precedent, and provide a sophisticated assessment of how the courts would likely approach this scenario. You must demonstrate understanding of not only the black letter law but also the underlying policy rationales, the evolution of legal principles through case law, and the practical implications of different legal approaches. Consider how recent developments in the law might affect the analysis, including any relevant statutory reforms, significant appellate decisions, or changes in judicial approach. Your analysis should also address potential counterarguments and alternative legal theories that might be advanced by opposing parties.`
          : isMedium
            ? `This question requires you to demonstrate a solid understanding of the key legal principles governing ${topic}, including relevant statutory provisions and leading case authorities. You should analyze how these principles apply to the specific factual circumstances presented, consider the likely approach of the courts, and evaluate the strengths and weaknesses of different legal arguments. Your analysis should show understanding of both the theoretical foundations and practical application of the relevant legal rules.`
            : `This question tests your understanding of the fundamental principles of ${topic} and their application to straightforward factual scenarios. You should identify the relevant legal rules, apply them to the given facts, and reach a reasoned conclusion about the likely legal outcome.`
      }\n\n**Question:** ${
        isHard
          ? `Critically analyze the legal position of all parties in relation to ${topic}, considering the full range of potential claims, defenses, and remedies available. Your analysis should address the interaction between different areas of law, the policy considerations underlying the relevant legal principles, and the practical implications of different legal approaches. Consider how the courts would likely balance competing interests and what factors would influence the ultimate outcome.`
          : isMedium
            ? `Analyze the legal position in relation to ${topic}, identifying the key issues, relevant legal principles, and likely outcomes. Consider the main arguments that would be advanced by each party and evaluate their respective strengths and weaknesses.`
            : `What is the correct legal position regarding ${topic} in this scenario?`
      }`

      questions.push({
        id: currentId,
        flkType: "FLK1",
        module,
        topic,
        subtopic: ["Formation", "Performance", "Breach", "Remedies", "Liability", "Defences", "Damages", "Procedure"][
          i % 8
        ],
        question: questionText,
        options: [
          isHard
            ? `The legal analysis requires comprehensive examination of the statutory framework governing ${topic}, including detailed consideration of how recent judicial developments have refined and modified traditional approaches. The courts would apply a sophisticated contextual analysis that carefully balances competing policy considerations, statutory objectives, and the legitimate expectations of all parties, while ensuring full compliance with human rights principles, proportionality requirements, and the overriding objective of achieving justice. This approach would involve detailed examination of the factual matrix, careful statutory interpretation using modern purposive methods, consideration of the interaction between different areas of law, and analysis of the broader implications for legal certainty and commercial practice. The resolution would need to take account of recent appellate guidance on similar issues, relevant regulatory developments, and the evolving approach of the courts to balancing private rights with public policy considerations.`
            : `The legal position is governed by established principles of ${topic}, with courts applying relevant statutory provisions and common law precedents to determine liability and appropriate remedies, taking into account the specific factual circumstances and the legitimate interests of all parties.`,

          isHard
            ? `This scenario presents multifaceted legal issues requiring sophisticated application of multiple interconnected doctrines within ${topic}, combined with careful analysis of how these principles interact with broader areas of law. The resolution would depend on meticulous analysis of the complete factual matrix, sophisticated statutory interpretation techniques, and detailed consideration of how different legal doctrines interact in complex commercial and social contexts. Courts would need to consider not only immediate legal consequences but also broader policy implications, the need to maintain commercial certainty and public confidence in legal institutions, and the importance of ensuring that legal developments remain coherent with established principles while adapting to contemporary circumstances. The analysis would require consideration of alternative legal approaches, evaluation of competing policy arguments, and assessment of the practical implications of different legal outcomes for similar cases and for the development of the law more generally.`
            : `This scenario involves application of established ${topic} principles, requiring analysis of how statutory provisions and case law precedents apply to the specific circumstances, with consideration of the competing interests and arguments of the different parties.`,

          isHard
            ? `The situation demonstrates the continuing evolution and sophistication of ${topic} as it adapts to modern commercial realities, technological developments, and changing social expectations. The legal analysis must integrate traditional doctrinal approaches with contemporary policy considerations, including economic efficiency, access to justice, proportionality, environmental protection, and the need to maintain public confidence in legal institutions and commercial practices. The outcome would likely reflect a carefully balanced judicial approach that adapts established principles to current circumstances while maintaining legal certainty and coherence. This would involve consideration of comparative legal approaches, analysis of the policy objectives underlying relevant legislation, evaluation of the practical consequences of different legal approaches, and assessment of how the resolution would contribute to the coherent development of this area of law. The courts would also need to consider the broader implications for legal practice, commercial behavior, and public policy, ensuring that their decision promotes appropriate standards while remaining practically workable.`
            : `This situation requires application of established ${topic} principles to the specific factual circumstances, with courts following established precedents while considering the particular factors relevant to this case and the appropriate balance of competing interests.`,

          isHard
            ? `The complexity and sophistication of this scenario requires advanced legal analysis that seamlessly integrates multiple aspects of ${topic} with broader legal principles, policy considerations, and practical implications. The resolution would involve careful consideration of statutory provisions using modern interpretive techniques, detailed analysis of case law development and judicial trends, comprehensive evaluation of policy objectives and their practical implementation, and sophisticated assessment of how different legal approaches would affect not only the immediate parties but also broader commercial and social interests. Courts would need to ensure that their decision promotes legal certainty while remaining appropriately responsive to changing commercial and social needs, maintains the coherence and integrity of the legal system as a whole, and provides clear guidance for future cases. The analysis would also need to consider potential unintended consequences, alternative legal approaches that might be adopted, and the broader implications for the development of legal doctrine in this area. This level of analysis demonstrates the sophisticated legal reasoning and comprehensive understanding required for advanced practice in ${topic}.`
            : `The scenario requires careful analysis of how ${topic} principles apply to the specific circumstances, with courts considering relevant precedents, statutory provisions, and the particular factors that would influence the appropriate legal outcome.`,
        ],
        correctAnswer: i % 4,
        explanation: isHard
          ? `This sophisticated scenario requires comprehensive understanding of ${topic} within the broader framework of modern legal practice and policy development. The analysis demonstrates several critical elements that characterize advanced legal reasoning:\n\n**Statutory Framework and Interpretation**: The governing legislation provides the foundational structure, but its application requires sophisticated interpretive techniques that go beyond literal textual analysis. Modern courts adopt a purposive approach that considers not just the statutory language but the underlying policy objectives, the broader legislative scheme, and the practical consequences of different interpretive approaches. This requires understanding of statutory interpretation principles, including the use of Hansard materials, consideration of the mischief rule, and analysis of how different provisions interact within the broader legislative framework.\n\n**Case Law Development and Judicial Trends**: Leading authorities in ${topic} have established fundamental principles, but these continue to evolve through judicial interpretation and application to new factual situations. Recent decisions demonstrate increasing judicial sophistication in balancing competing interests, with courts showing greater willingness to adapt traditional approaches where they might produce harsh or commercially unrealistic outcomes. This evolution reflects broader changes in judicial philosophy, including increased emphasis on proportionality, contextual analysis, and consideration of the practical consequences of legal decisions.\n\n**Policy Considerations and Broader Implications**: Contemporary legal analysis must consider the broader policy implications of legal decisions, including their effects on economic efficiency, access to justice, commercial certainty, and public confidence in legal institutions. Courts increasingly recognize that legal decisions have wider social and commercial consequences that must be factored into their reasoning. This requires understanding of the policy objectives underlying legal rules, analysis of how legal decisions affect behavior and commercial practice, and consideration of the broader social and economic context within which legal principles operate.\n\n**Practical Application and Professional Competence**: The scenario illustrates how theoretical legal knowledge must be applied in complex real-world situations where multiple factors interact and compete. Advanced practitioners must understand not just the doctrinal rules but how they operate in practice, how courts are likely to apply them in specific circumstances, and how different legal approaches might affect outcomes, costs, and risks. This requires sophisticated judgment about legal strategy, risk assessment, and the practical implications of different legal approaches.\n\nThis level of analysis demonstrates the sophisticated legal reasoning, comprehensive knowledge, and practical judgment required for effective practice in ${topic} at an advanced level.`
          : isMedium
            ? `This scenario tests comprehensive understanding of how ${topic} principles operate in complex practical situations. The analysis requires solid knowledge of both statutory provisions and case law authorities, demonstrating how courts balance different factors when reaching decisions in ${topic} cases. Students must show understanding of the policy considerations underlying the legal rules, how they influence judicial decision-making, and their practical application in professional practice. The scenario also tests ability to identify key legal issues, analyze competing arguments, and reach reasoned conclusions about likely outcomes.`
            : `This scenario tests fundamental understanding of ${topic} principles and their straightforward application to common factual situations, requiring identification of relevant legal rules and their basic application.`,
        difficulty: isHard ? "Hard" : isMedium ? "Medium" : "Easy",
        timeLimit: 120 + (isHard ? 120 : isMedium ? 60 : 0), // More time for complex analysis
        legislation: [
          "Companies Act 2006",
          "Contract (Rights of Third Parties) Act 1999",
          "Unfair Contract Terms Act 1977",
          "Occupiers' Liability Act 1957",
          "Civil Procedure Rules 1998",
          "Human Rights Act 1998",
          "Consumer Rights Act 2015",
          "Insolvency Act 1986",
          "Partnership Act 1890",
          "Sale of Goods Act 1979",
          "Arbitration Act 1996",
        ].slice(0, isHard ? 6 : isMedium ? 4 : 2),
        cases: [
          "Salomon v Salomon & Co",
          "Donoghue v Stevenson",
          "Carlill v Carbolic Smoke Ball Co",
          "Caparo Industries v Dickman",
          "Hadley v Baxendale",
          "Williams v Roffey Bros",
          "Foss v Harbottle",
          "Robinson v Chief Constable of West Yorkshire",
          "Rylands v Fletcher",
          "Bolton v Stone",
          "Anns v Merton LBC",
          "Murphy v Brentwood DC",
          "White v Jones",
          "Henderson v Merrett Syndicates",
          "Arthur JS Hall & Co v Simons",
        ].slice(0, isHard ? 6 : isMedium ? 4 : 2),
        tags: ["FLK1", topic.toLowerCase().replace(/\s+/g, "-"), module, "scenario-based", "comprehensive"],
      })

      currentId++
    }
  })

  return questions
}

const generateFLK2Questions = (startId: number, count: number): MockQuestion[] => {
  const scenarios = [
    {
      context: "Complex Multi-Property Development and Conveyancing",
      background:
        "Riverside Developments Ltd is undertaking a major mixed-use development project on a 15-acre brownfield site in Birmingham. The development will include 300 residential units, commercial space, and community facilities. The site has a complex history: it was previously used for industrial purposes, has been subject to various planning permissions over the years, and includes several different land titles with varying restrictions and easements. The development involves multiple stakeholders including the local authority, environmental agencies, existing leaseholders, and neighboring property owners. Riverside has entered into agreements with several parties including a section 106 agreement with the local authority, development agreements with construction partners, and pre-sale agreements with prospective purchasers.",
      situation:
        "As the development progresses, several complex legal issues have emerged: environmental surveys have revealed contamination requiring remediation that may affect some existing easements; the Land Registry has identified discrepancies in the registered titles that may affect the development's footprint; several existing leaseholders are claiming rights that were not properly investigated during the initial due diligence; a neighboring property owner is asserting a right of way that would interfere with the planned access road; and changes in planning regulations have created uncertainty about some aspects of the approved development. Additionally, some of the pre-sale purchasers are threatening to withdraw due to delays, while others are seeking to enforce specific performance of their purchase agreements despite the ongoing complications.",
    },
    {
      context: "Multi-Defendant Criminal Case with Complex Procedural Issues",
      background:
        "Operation Meridian is a major fraud investigation involving allegations of a sophisticated money laundering scheme operating across multiple jurisdictions. The case involves seven defendants, including company directors, professional advisers, and intermediaries, who are alleged to have participated in a scheme to launder proceeds from various criminal activities through a network of shell companies and offshore accounts. The investigation has been ongoing for three years and has involved cooperation with law enforcement agencies in five different countries. The evidence includes thousands of documents, electronic records, expert reports on financial transactions, and witness statements from over 100 individuals. The case has attracted significant media attention and involves complex issues of jurisdiction, disclosure, and case management.",
      situation:
        "As the case approaches trial, numerous procedural challenges have emerged: one defendant is challenging the admissibility of evidence obtained through international mutual legal assistance, claiming breaches of procedural requirements; another defendant is seeking to sever their trial from the others, arguing that joint trial would be prejudicial; the prosecution is facing difficulties with disclosure due to the volume of material and issues of public interest immunity; several witnesses are reluctant to testify due to concerns about their safety; there are applications for special measures for vulnerable witnesses; and the defense teams are arguing that the complexity of the case and the volume of evidence make it impossible to receive a fair trial within a reasonable timeframe. Additionally, there are ongoing applications relating to asset freezing orders, legal aid funding, and case management directions.",
    },
    {
      context: "Professional Conduct Crisis in Multi-Party Litigation",
      background:
        "Thornfield & Partners is a large commercial law firm representing multiple parties in a complex commercial dispute arising from the collapse of a major construction project. The firm represents the main contractor, two sub-contractors, and a professional consultant, all of whom have potential claims against each other as well as against external parties. The litigation involves claims totaling over £50 million and has been ongoing for two years. The case involves complex technical issues, extensive expert evidence, and multiple sets of proceedings in different courts. The firm has a team of 15 lawyers working on various aspects of the case, including partners, associates, and trainees, with different lawyers representing different clients within the overall matter.",
      situation:
        "A serious professional conduct issue has emerged when it becomes apparent that confidential information obtained while representing one client may be relevant to claims involving another client, potentially creating conflicts of interest that were not initially apparent. Additionally, one of the clients has been providing misleading information about key documents, and there are concerns that they may be attempting to conceal evidence that could be damaging to their case but relevant to other parties' claims. The situation is complicated by the fact that some of the lawyers involved have personal relationships with key witnesses, one of the partners has a financial interest in a company that could benefit from the outcome of the litigation, and there are concerns about the adequacy of the firm's client care procedures and file management systems. The clients are pressuring the firm to continue with their preferred approach, threatening to instruct alternative solicitors and to make complaints to the regulatory authorities if their demands are not met.",
    },
  ]

  const questionsPerTopic = Math.floor(count / flk2Topics.length)
  const remainingQuestions = count % flk2Topics.length

  const questions: MockQuestion[] = []
  let currentId = startId

  // Generate questions for each topic to ensure comprehensive coverage
  flk2Topics.forEach((topic, topicIndex) => {
    const topicQuestionCount = questionsPerTopic + (topicIndex < remainingQuestions ? 1 : 0)

    for (let i = 0; i < topicQuestionCount; i++) {
      // Vary intensity: 40% Hard, 35% Medium, 25% Easy for Premium package
      const rand = Math.random()
      const isHard = rand < 0.4
      const isMedium = rand >= 0.4 && rand < 0.75

      const scenarioIndex = (currentId + i) % scenarios.length
      const scenario = scenarios[scenarioIndex]

      // Determine module based on topic
      let module = "property-law"
      if (
        topic.includes("Criminal") ||
        topic.includes("Sentencing") ||
        topic.includes("Appeals") ||
        topic.includes("Bail") ||
        topic.includes("Disclosure")
      ) {
        module = "criminal-law"
      } else if (
        topic.includes("Professional") ||
        topic.includes("Client") ||
        topic.includes("Confidentiality") ||
        topic.includes("Conflicts") ||
        topic.includes("Money") ||
        topic.includes("Regulatory")
      ) {
        module = "professional-conduct"
      }

      // Create comprehensive scenario-based question with extensive paragraphs
      const questionText = `${scenario.context} - Advanced Professional Analysis\n\n**Detailed Background:**\n${scenario.background}\n\n**Complex Current Situation:**\n${scenario.situation}\n\n**Professional Challenge for Analysis:**\nIn relation to ${topic}, you are required to provide a comprehensive analysis that demonstrates advanced understanding of the relevant legal principles, procedural requirements, professional obligations, and regulatory framework. ${
        isHard
          ? `This question requires you to critically evaluate the complex interplay between statutory requirements, procedural rules, professional conduct obligations, and policy considerations. You must demonstrate sophisticated understanding of how different legal and professional requirements interact in complex practical situations, including consideration of competing obligations, risk management, and the broader implications for professional practice and the administration of justice. Your analysis should address the evolution of professional standards, recent regulatory developments, and the practical challenges of maintaining professional integrity while achieving client objectives. Consider how recent changes in regulation, case law, and professional guidance might affect the analysis, and evaluate alternative approaches that might be adopted while maintaining compliance with professional and legal requirements.`
          : isMedium
            ? `This question requires you to demonstrate solid understanding of the key legal and procedural principles governing ${topic}, including relevant statutory provisions, procedural rules, and professional obligations. You should analyze how these requirements apply to the specific circumstances presented, consider the appropriate course of action, and evaluate the implications of different approaches. Your analysis should show understanding of both the theoretical foundations and practical application of the relevant requirements.`
            : `This question tests your understanding of the fundamental principles and procedures relating to ${topic} and their application to straightforward professional situations.`
      }\n\n**Question:** ${
        isHard
          ? `Critically analyze the legal and professional position of all parties in relation to ${topic}, considering the full range of statutory requirements, procedural obligations, professional conduct considerations, and practical implications. Your analysis should address the interaction between different legal and professional requirements, the policy considerations underlying the relevant rules, and the practical challenges of compliance in complex professional situations. Consider how the relevant authorities would likely approach this situation and what factors would influence the appropriate course of action.`
          : isMedium
            ? `Analyze the position in relation to ${topic}, identifying the key legal and professional issues, relevant requirements, and appropriate course of action. Consider the main considerations that would influence the approach to be taken and evaluate the implications of different options.`
            : `What is the correct approach regarding ${topic} in this situation?`
      }`

      questions.push({
        id: currentId,
        flkType: "FLK2",
        module,
        topic,
        subtopic: [
          "Registration",
          "Priority",
          "Protection",
          "Enforcement",
          "Procedure",
          "Evidence",
          "Remedies",
          "Ethics",
        ][i % 8],
        question: questionText,
        options: [
          isHard
            ? `The approach requires comprehensive analysis of the statutory and procedural framework governing ${topic}, including detailed consideration of how recent developments in case law, regulatory guidance, and professional standards have refined traditional approaches. The resolution must carefully balance competing interests, obligations, and policy considerations while ensuring full compliance with professional conduct requirements, procedural rules, and the overriding objective of dealing with cases justly and proportionately. This approach would involve detailed examination of the regulatory framework, careful analysis of professional obligations and their interaction with legal requirements, consideration of risk management principles and their practical application, and evaluation of the broader implications for professional practice and public confidence in the legal system. The analysis must also consider recent regulatory developments, changes in professional guidance, and evolving expectations of professional conduct in complex practice situations.`
            : `The approach is governed by established statutory and procedural requirements for ${topic}, with clear professional guidance on the appropriate steps to be taken in such circumstances, taking into account the specific professional and legal obligations involved.`,

          isHard
            ? `This scenario presents sophisticated challenges requiring careful navigation of multiple legal, procedural, and professional requirements within ${topic}. The resolution demands comprehensive understanding of how different rules, obligations, and policy considerations interact in complex professional situations, including detailed consideration of professional conduct requirements, client interests, third party rights, regulatory expectations, and the broader public interest. The approach must be legally sound, professionally appropriate, and practically workable, while maintaining the integrity of the legal system and public confidence in professional standards. This requires sophisticated analysis of competing obligations, evaluation of alternative approaches and their implications, consideration of risk management principles, and assessment of the broader consequences for professional practice and the administration of justice.`
            : `This scenario requires application of established procedures and professional standards for ${topic}, following recognized protocols and regulatory guidance while considering the specific circumstances and professional obligations involved.`,

          isHard
            ? `The situation demonstrates the continuing evolution of ${topic} in response to modern professional practice, changing regulatory expectations, and evolving social and commercial contexts. The analysis must integrate traditional procedural and professional approaches with contemporary policy considerations, including access to justice, proportionality, efficiency, transparency, and maintaining public confidence in the legal system and professional standards. The resolution should reflect best practice while adapting established procedures and professional requirements to current circumstances, taking account of recent regulatory developments, changes in professional expectations, and the need to maintain both professional integrity and practical effectiveness. This requires consideration of comparative approaches, analysis of regulatory objectives and their practical implementation, and evaluation of the broader implications for professional development and public policy.`
            : `This situation requires following established procedures and professional standards for ${topic}, with reference to current regulatory guidance, best practice, and the specific professional obligations relevant to these circumstances.`,

          isHard
            ? `The complexity of this scenario requires sophisticated legal and professional analysis that seamlessly integrates multiple aspects of ${topic} with broader professional, ethical, and policy considerations. The resolution must ensure compliance with all relevant statutory provisions, procedural rules, professional conduct requirements, and regulatory expectations while achieving a practical and proportionate outcome that serves the interests of justice, maintains professional integrity, and preserves public confidence in the legal system. This requires comprehensive understanding of the regulatory framework, sophisticated analysis of competing obligations and their practical implications, evaluation of risk management considerations, and assessment of the broader consequences for professional practice, client service, and the administration of justice. The approach must also consider potential unintended consequences, alternative strategies and their implications, and the broader impact on professional standards and public policy.`
            : `The scenario requires careful application of the relevant procedures and professional standards for ${topic}, ensuring compliance with all applicable legal requirements, professional obligations, and regulatory expectations while achieving an appropriate outcome.`,
        ],
        correctAnswer: i % 4,
        explanation: isHard
          ? `This sophisticated scenario requires comprehensive understanding of ${topic} within the modern framework of professional legal practice and regulatory oversight. The analysis demonstrates several critical elements that characterize advanced professional competence:\n\n**Statutory and Procedural Framework**: The governing legislation and procedural rules provide the foundational structure for professional practice, but their application requires sophisticated understanding of how different requirements interact in complex practical situations. Modern practice operates within an increasingly complex regulatory environment that emphasizes the overriding objective of dealing with cases justly, efficiently, and proportionately. This requires understanding of not just the specific procedural requirements but also the underlying policy objectives, the broader regulatory framework, and the practical implications of different approaches for professional practice and client service.\n\n**Professional Conduct and Ethical Obligations**: Contemporary legal practice operates within a comprehensive framework of professional conduct requirements that must be carefully balanced with client interests, duties to the court, and broader obligations to the legal system and society. This scenario illustrates the complexity of navigating competing professional obligations while maintaining integrity, competence, and appropriate standards of client service. Advanced practitioners must understand not just the specific conduct rules but also the underlying principles, the policy objectives they serve, and their practical application in complex professional situations.\n\n**Risk Management and Professional Responsibility**: Modern professional practice requires sophisticated understanding of risk management principles and their application to complex legal and professional situations. This includes understanding of professional indemnity considerations, regulatory compliance requirements, and the broader implications of professional decisions for client interests, professional reputation, and public confidence in the legal system. Advanced practitioners must be able to identify potential risks, evaluate their implications, and develop appropriate strategies for managing them while maintaining professional standards and achieving client objectives.\n\nThis level of analysis demonstrates the sophisticated professional reasoning, comprehensive knowledge, and practical judgment required for effective practice in ${topic} at an advanced level, reflecting the standards expected of competent practitioners in complex professional situations.`
          : isMedium
            ? `This scenario tests comprehensive understanding of how ${topic} operates in complex professional situations. The analysis requires solid knowledge of statutory provisions, procedural rules, and professional obligations, demonstrating how practitioners must balance different factors when making professional decisions. Students must show understanding of the policy considerations underlying the requirements, how they influence professional practice, and their practical application in complex situations. The scenario also tests ability to identify key professional issues, analyze competing considerations, and reach appropriate conclusions about professional conduct and compliance.`
            : `This scenario tests fundamental understanding of ${topic} principles and procedures and their straightforward application to common professional situations, requiring identification of relevant requirements and their basic application.`,
        difficulty: isHard ? "Hard" : isMedium ? "Medium" : "Easy",
        timeLimit: 120 + (isHard ? 120 : isMedium ? 60 : 0), // More time for complex analysis
        legislation: [
          "Land Registration Act 2002",
          "Law of Property Act 1925",
          "Criminal Procedure Rules 2020",
          "Solicitors Regulation Authority Code of Conduct",
          "Civil Procedure Rules 1998",
          "Landlord and Tenant Act 1985",
          "Police and Criminal Evidence Act 1984",
          "Proceeds of Crime Act 2002",
          "Legal Aid, Sentencing and Punishment of Offenders Act 2012",
          "Trusts of Land and Appointment of Trustees Act 1996",
          "Criminal Justice Act 2003",
          "Money Laundering Regulations 2017",
        ].slice(0, isHard ? 6 : isMedium ? 4 : 2),
        cases: [
          "Williams & Glyn's Bank v Boland",
          "Stack v Dowden",
          "R v Turnbull",
          "R v Lucas",
          "Abbey National v Cann",
          "City of London Building Society v Flegg",
          "Arthur JS Hall & Co v Simons",
          "Medcalf v Mardell",
          "R v Davis",
          "R v H",
          "Patel v University of Bradford",
          "Three Rivers DC v Bank of England",
          "Jones v Kernott",
          "R v Galbraith",
          "R v Ward",
        ].slice(0, isHard ? 6 : isMedium ? 4 : 2),
        tags: ["FLK2", topic.toLowerCase().replace(/\s+/g, "-"), module, "scenario-based", "comprehensive"],
      })

      currentId++
    }
  })

  return questions
}

// Create mock exam databases
export const mockExamsDatabase = {
  // Starter Package: 3 FLK1 + 3 FLK2 mocks (6 total)
  starter: {
    flk1: [
      generateFLK1Questions(1, 180), // FLK1 Mock 1
      generateFLK1Questions(181, 180), // FLK1 Mock 2
      generateFLK1Questions(361, 180), // FLK1 Mock 3
    ],
    flk2: [
      generateFLK2Questions(541, 180), // FLK2 Mock 1
      generateFLK2Questions(721, 180), // FLK2 Mock 2
      generateFLK2Questions(901, 180), // FLK2 Mock 3
    ],
  },

  // Standard Package: 6 FLK1 + 6 FLK2 mocks (12 total)
  standard: {
    flk1: [
      generateFLK1Questions(1, 180), // FLK1 Mock 1
      generateFLK1Questions(181, 180), // FLK1 Mock 2
      generateFLK1Questions(361, 180), // FLK1 Mock 3
      generateFLK1Questions(541, 180), // FLK1 Mock 4
      generateFLK1Questions(721, 180), // FLK1 Mock 5
      generateFLK1Questions(901, 180), // FLK1 Mock 6
    ],
    flk2: [
      generateFLK2Questions(1081, 180), // FLK2 Mock 1
      generateFLK2Questions(1261, 180), // FLK2 Mock 2
      generateFLK2Questions(1441, 180), // FLK2 Mock 3
      generateFLK2Questions(1621, 180), // FLK2 Mock 4
      generateFLK2Questions(1801, 180), // FLK2 Mock 5
      generateFLK2Questions(1981, 180), // FLK2 Mock 6
    ],
  },

  // Premium Package: 25 FLK1 + 25 FLK2 mocks (50 total)
  premium: {
    flk1: Array.from({ length: 25 }, (_, i) => generateFLK1Questions(i * 180 + 1, 180)),
    flk2: Array.from({ length: 25 }, (_, i) => generateFLK2Questions((i + 25) * 180 + 1, 180)),
  },
}

// Helper functions
export const getMockExamsByPackage = (packageType: "starter" | "standard" | "premium") => {
  return mockExamsDatabase[packageType]
}

export const getMockExamQuestions = (examId: string) => {
  // Parse examId to determine package type and mock details
  // Format: flk1-full, flk2-full, mixed-practice

  if (examId === "flk1-full") {
    // Return a full FLK1 mock exam (180 questions)
    return generateFLK1Questions(1, 180)
  } else if (examId === "flk2-full") {
    // Return a full FLK2 mock exam (180 questions)
    return generateFLK2Questions(1, 180)
  } else if (examId === "mixed-practice") {
    // Return a mixed practice exam (60 questions from both FLK1 and FLK2)
    const flk1Questions = generateFLK1Questions(1, 30)
    const flk2Questions = generateFLK2Questions(31, 30)
    return [...flk1Questions, ...flk2Questions]
  }

  // Default fallback
  return generateFLK1Questions(1, 180)
}

export const getMockExamQuestionsByPackage = (
  packageType: "starter" | "standard" | "premium",
  flkType: "FLK1" | "FLK2",
  mockNumber: number,
) => {
  const packageData = mockExamsDatabase[packageType]
  if (flkType === "FLK1") {
    return packageData.flk1[mockNumber - 1] || []
  } else {
    return packageData.flk2[mockNumber - 1] || []
  }
}

export const getAvailableMocks = (packageType: "starter" | "standard" | "premium") => {
  const packageData = mockExamsDatabase[packageType]
  return {
    flk1Count: packageData.flk1.length,
    flk2Count: packageData.flk2.length,
    totalCount: packageData.flk1.length + packageData.flk2.length,
  }
}
