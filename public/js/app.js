// ===== 全域狀態：原始題庫、本次測驗、標記、計時器與持久化紀錄 =====
    // 這些系統用 key 不是真正題庫，updateHistoryDropdown() 會排除它們避免出現在下拉選單。
    const QUIZ_SETTINGS_STORAGE_KEY = 'quiz_sys_settings';
    const QUIZ_CORRECT_STORAGE_KEY = 'quiz_sys_correct_questions';
    const QUIZ_METADATA_STORAGE_KEY = 'quiz_sys_metadata';
    const QUIZ_THEME_STORAGE_KEY = 'quiz_sys_theme';
    const QUIZ_WRONG_HISTORY_STORAGE_KEY = 'quiz_sys_wrong_history';
    const QUIZ_ACCURACY_HISTORY_STORAGE_KEY = 'quiz_sys_accuracy_history';
    const QUIZ_QUESTION_STATS_STORAGE_KEY = 'quiz_sys_question_stats';
    const QUIZ_WRONG_RETRY_PREFERENCE_STORAGE_KEY = 'quiz_sys_wrong_retry_preference';
    const QUIZ_SELECTED_BANK_STORAGE_KEY = 'quiz_sys_selected_bank';
    const PQS_CURRENT_USER_STORAGE_KEY = 'quiz_sys_current_user';
    const BUILTIN_EDRP_STORAGE_KEY = 'quiz_sys_EDRP.csv';
    const SUPABASE_PROJECT_URL = window.PQS_ENV?.SUPABASE_PROJECT_URL || '';
    const SUPABASE_ANON_API_KEY = window.PQS_ENV?.SUPABASE_ANON_API_KEY || '';
    const SUPABASE_REST_URL = SUPABASE_PROJECT_URL ? `${SUPABASE_PROJECT_URL.replace(/\/$/, '')}/rest/v1` : '';
    const BUILTIN_EDRP_QUIZ_BANK = [{"q":"ABC Inc. has a host of servers, each serving a different purpose. Almost all of them are critical to the functioning of the business. Most of the servers were virtualized and had backup virtual components. Thus, when the memory of one server crashed in the middle of a busy business day, it did not affect the operations as the server quickly switched to a different virtual memory, which was kept as a backup for this purpose precisely. What is such a feature called?","opts":["1. Deduplication","2. High Availability","3. Fault Tolerance","4. Mirroring"],"ans":"3"},{"q":"Zoe is a fashion designer who owns an online retail store. She was recently named ‘The Best Upcoming Fashion Designer of the Year’ by a highly popular fashion magazine. Due to this recognition, the web traffic to her site greatly increased. However, the server on which her website was housed on could not handle the high amount of web traffic, which led to the crashing of the website. To resolve this issue, Zoe purchased two additional servers. Using a solution, she distributed the burden from the web traffic between the three servers, which helped in maximizing the efficiency of the servers. Which solution did Zoe use?","opts":["1. Load Balancing","2. High-Availability","3. Point in Time Recovery","4. Clustering"],"ans":"1"},{"q":"Which of the following services provides mail and calendar services?","opts":["1. Web Server","2. Application Server","3. Domain Controller","4. Exchange Server"],"ans":"4"},{"q":"Seth wants to get an approximate picture of the likelihood of the risks that were identified by his organization. After getting a high-level understanding of their probability, he could dedicate his resources to risk mitigation according to the priorities since he was a bit under-staffed. He was told that out of theidentified risks, the occurrence of an earthquake was highly unlikely owing to the geography of their location. Furthermore, he learned that the chances of a fire breaking out in his building were high and his facility also faced a risk of physical intrusion but that was partly under control owing to the physical guards. What kind of risk assessment is Seth essentially conducting?","opts":["1. Semi-Quantitative Risk Assessment","2. Quantitative Risk Assessment","3. Qualitative Risk Assessment","4. Semi-Qualitative Risk Assessment"],"ans":"3"},{"q":"Which of the following terms define the assessment of the risk factors and the relationship that exists between these factors?","opts":["1. Risk Models","2. Risk Mitigation","3. Risk Management","4. Risk Assessment"],"ans":"1"},{"q":"Richard was a cautious person, and he used to back up his organization’s data daily at 8:00 pm. One day, due to a fire in his office building at 9:00 am, servers containing critical data were destroyed. It would take about 8 hours for Richard’s organization to transfer the backed up data from the alternate site to the primary site. Based on the last data backup, the recovery time in this scenario is ‘minus 13 hours’. What\ntechnical term best defines this time period of 13 hours?","opts":["1. Recovery Point Objective (RPO)","2. Recovery Time Objective (RTO)","3. Single Point of Failure (SPOF)","4. Maximum Acceptable Outage (MAO)"],"ans":"1"},{"q":"Jess, who owns an IT firm, wants to implement the standard for societal security in the business continuity management system in her organization to reap its benefits in the future if a disaster strikes. Which of the following standards should she implement?","opts":["1. NFPA 1600","2. ISO 27005","3. ISO 27031","4. ISO 22301"],"ans":"4"},{"q":"John wanted to transfer his organization’s data to an alternate site. He wanted the alternate site to run in parallel to the primary site, which would allow his organization to continue normal business operations almost immediately in the event of a disruption. Which of the following sites is best suited to John’s requirements?","opts":["1. Hot Site","2. Warm Site","3. Colocation Facilities","4. Cold Site"],"ans":"1"},{"q":"Katie has implemented the RAID level that splits data into blocks and evenly writes\nthe data to multiple hard drives but does not provide data redundancy. This type of RAID level requires a minimum of __________ in order to setup.","opts":["1. Three drives","2. Six drives","3. Two drives","4. Four drives"],"ans":"3"},{"q":"Jill wanted to start a food truck with her savings from her previous job. Before she did so, she wanted to make sure that it would prove to be a feasible investment. After discussing her plans with a few industry professionals, she was advised to conduct an analysis to help her decide if the business would prove to be profitable in the monetary sense. Which analysis was Jill advised to conduct?","opts":["1. Cost Benefit Analysis","2. Cost Analysis","3. Business Impact Analysis","4. Risk Analysis"],"ans":"1"},{"q":"XYZ.com is a popular online discounts store based out of London. Due to a disaster, one of the hosting servers was destroyed, slowing the website considerably. The management feared that this would lead to a decrease in the website traffic. Fortunately, the network administrators at the organization solved the problem of the slow running of the website by routing the site traffic to the alternate hosting server based in Mumbai. What technical term best describes this scenario?","opts":["1. High-Availability","2. Global Load Balancing","3. Failover","4. Network Load Balancing"],"ans":"2"},{"q":"Which of the following technologies is used to create a copy of data on one server on another server?","opts":["1. Data Replication","2. Snapshots","3. Cloud Storage","4. Failover Cluster"],"ans":"1"},{"q":"Which of the following teams is responsible for the implementation and execution of the disaster recovery plan, including test plans?","opts":["1. Operations Team","2. Planning Team","3. Technology Team","4. Support Team"],"ans":"3"},{"q":"To protect against a disaster or other site-specific problem, many people choose this method to back up their media. The location can be as simple as the system administrator’s home office or as sophisticated as a disaster-hardened, temperature-controlled, high-security bunker that has facilities for backup media storage. Which type of backup method is being referred here?","opts":["1. Near-line","2. Offsite","3. Onsite","4. Online"],"ans":"2"},{"q":"Nancy is working as a network administrator for a small company. Management wants to implement a RAID storage for their organization. They want to use the appropriate RAID level for their backup plan that will satisfy the following requirements:\n1. It has a parity check tostore all the information about the data in multiple drives.\n2. Help reconstruct the data during downtime.\n3. Process the data at a good speed.\n4. Should not be expensive.\nThe management team asks Nancy to research and suggest the appropriate RAID level that best suits their requirements. What RAID level will she suggest?","opts":["1. RAID 1","2. RAID 3","3. RAID 10","4. RAID 0"],"ans":"2"},{"q":"James owns a company that provides 24x7 telephonic technical support for a technology giant. During a risk assessment, he discovered that should a natural disaster strike rendering his facility defunct, he would need at least a hundred telephone lines up and running within eight hours to keep his business running. He contacted a service provider that assured him that a hundred virtual connections can be provided to him in such a case within the time frame. For such a service, James would have to shell out $10,000 a day. James has a cold backup site that takes 48 hours to become functional. To make it a warm or a hot site, James would have to incur a cost way more than the virtual service. Hence, James kept the cold site and kept aside $20,000 from the company funds for the virtual service should this scenario occur. What is this emergency fund that James kept aside called?","opts":["1. Risk Adjusted Return on Capital (RAROC)","2. Risk Adjusted Return on Risk Adjusted Capital (RARORAC)","3. Risk Adjusted Performance Management (RAPM)","4. Return on Risk Adjusted Capital (RORAC)"],"ans":"1"},{"q":"Which of the following is NOT a component of a centralized governance structure for Business Continuity and Risk Management?","opts":["1. Programs and Practices","2. Enablement","3. Effectiveness","4. Authenticity"],"ans":"4"},{"q":"Amy was conducting a disaster recovery test at her clinic. In this test scenario, a real-life disaster was mimicked, and important aspects such as software, communication, procedures, and personnel were tested. Which test was Amy conducting?","opts":["1. Walkthrough Testing","2. Parallel Testing","3. Full Interruption Testing","4. Simulation Testing"],"ans":"4"},{"q":"Which of the following is a standard on disaster/emergency management and business continuity programs that specifically defines disasters and provides provisions to cover the development, implementation, assessment, and maintenance of programs for prevention, mitigation, preparedness, response, continuity, and recovery?","opts":["1. NFPA 1600","2. INCITS 483-2012","3. ISO 27031","4. ISO 27005"],"ans":"1"},{"q":"Which of the following server categories stores the information about host accounts and implements security policies in its particular domain?","opts":["1. Global Catalog Servers","2. Domain Controller Servers","3. File Servers","4. IIS Servers"],"ans":"2"},{"q":"Timothy works as a network administrator in a multinational organization. He decides to implement a dedicated network for sharing storage resources. He uses a ________ as it separates the storage units from the servers and the user network.","opts":["1. SCSA","2. NAS","3. SAN","4. SAS"],"ans":"3"},{"q":"Jack is a system administrator working in a data center, which operates thousands of the virtual servers running on the Microsoft’s virtualization platform, Hyper-V. Jack’s manager advises him to take a snapshot backup instead of a full backup of the virtual machines running on Hyper-V to save the backup time. Which native feature present in Hyper-V Manager should he use in this scenario?","opts":["1. Checkpoint Backup","2. Hyper-V Replication","3. System Backup","4. Snapshots Backup"],"ans":"4"},{"q":"Which of the following terms refers to the individual skills required to ensure the achievement of the terminal objectives?","opts":["1. Enabling Objectives","2. Routine Objectives","3. Qualitative Objectives","4. Development Objectives"],"ans":"1"},{"q":"Matt needed multiple servers for his organization but could purchase only one. Using a particular technology, he created several logical servers on his sole physical server. Which technology did Matt make use?","opts":["1. Deduplication","2. Snapshot","3. Virtualization","4. Mirroring"],"ans":"3"},{"q":"Will is working as a Network Administrator. Management wants to maintain a backup of all the company data as soon as it starts operations. They decide to use a RAID backup storage technology for their data backup plan. To implement the RAID data backup storage, Will sets up a pair of RAID disks so that all the data written to one disk is copied automatically to the other disk as well. This maintains an additional copy of the data. Which RAID level is used here?","opts":["1. RAID 5","2. RAID 1","3. RAID 0","4. RAID 3"],"ans":"2"},{"q":"Zane is a server administrator. While doing the regular maintenance of the servers, she finds out that the Active Directory of one of the servers present in the domain is missing. Which restoration process would help Zane in this scenario given that all the other servers in the domain have their Active Directory intact?","opts":["1. Authoritative Active Directory Restoration","2. Non-Authoritative Active Directory Restoration","3. Data Replication","4. Server Migration"],"ans":"2"},{"q":"After Colin’s organization had identified and prioritized the risks faced by the organization, Colin decided to implement certain strategies to manage risk (also known as risk response). Which of the following strategies is not a part of risk response?","opts":["1. Sharing","2. Safety","3. Mitigation","4. Acceptance"],"ans":"2"},{"q":"Cameron wanted to back up the data present on his organization’s server in case a disaster struck and the data was lost. The software he used created a copy of the data using block level imaging. Which software did Cameron use?","opts":["1. Bare-metal Restore","2. Disk Imaging","3. Virtualization","4. Cloud Backup"],"ans":"2"},{"q":"Which of the following refers to a central command and control facility responsible for carrying out recovery actions, coordinating response and resources, and assuring the coherence of operations of an organization?","opts":["1. Emergency Operations Center","2. Colocation Facilities","3. Mobile Recovery Center","4. Crisis Command Center"],"ans":"1"},{"q":"Annabeth’s organization provides web-hosting services for several multinational corporations. Due to the nature of her clientele, her organization cannot afford to have any downtime. To combat any disaster that may occur in the future, she identified a backup site to which she can switch operations to in case the primary site is destroyed. She opted for a live replication of files in the backup site. This would allow her to get her services running immediately at the backup site if the primary site is destroyed. Which of the following backup sites did Annabeth opt for?","opts":["1. Hot Sites","2. Warm Sites","3. Colocation Facilities","4. Cold Sites"],"ans":"1"},{"q":"Fred, the owner of an organization wanted to implement a plan that consists of well-planned actions to be adopted before, during, and after a catastrophic event. Which plan did Fred want to implement?","opts":["1. Risk Assessment","2. Business Recovery Plan","3. Data Backup Plan","4. IT Disaster Recovery Plan"],"ans":"4"},{"q":"Which of the following techniques verifies that data is safe, secure, and readable after going through processes like update, restore, or retrieve?","opts":["1. Database Integrity Testing","2. Backup Integrity Testing","3. Database Authentication","4. Database Consolidation"],"ans":"2"},{"q":"In which of the following tests, is the entire BCP implemented?","opts":["1. Orientation Test","2. Functional Test","3. Simulation Test","4. Full-Scale Test"],"ans":"4"},{"q":"ABC Investment Bank is implementing a security and disaster recovery plan. As part of the plan, it sets up several remote data centers across the globe. The objective was to not have all the records of any one important client at one location but to distribute chunks of it throughout these centers. This was if any one of the centers is compromised, the attacker will not have only chunks of data and will not be able to use it maliciously against the bank’s clients. One other advantage of this is that if a center is struck by a disaster, all the data about a client’s portfolio is not lost. For this plan to work, a percentage of deviation should not exist between the actual and targeted business data. Which recovery metric best defines this percentage of deviation?","opts":["1. Recovery Service Resiliency (RSR)","2. Recovery Object Granularity(ROG)","3. Recovery Consistency Objective (RCO)","4. Recovery Location Scope (RLS)"],"ans":"3"},{"q":"Jonathan was tasked with conducting the risk assessment process for a logistics-based startup. As part of his assignment, he was required to spend time in the organization and interact with people so as to prioritize the various risks faced by the organization. After examining the risks faced by the organization, he classified the risks in the following order:\n⚫ Very Low\n⚫ Low\n⚫ Medium\n⚫ High\n⚫ Very High\nWhich assessment method did Jonathan use to perform the risk assessment?","opts":["1. Semi-Qualitative Risk Assessment","2. Quantitative Risk Assessment","3. Semi-Quantitative Risk Assessment","4. Qualitative Risk Assessment"],"ans":"4"},{"q":"Which of the following terms refers to those systems that maintain data and access to it in the face of malicious and accidental problems with storage servers, interconnection networks, client systems, and user accounts?","opts":["1. Survivable Storage System","2. Decentralized Computing","3. Mainframe Computer System","4. Mirroring"],"ans":"1"},{"q":"Kelly is taking backups of the organization’s data. Currently, he is taking backups of only those files, which are created or modified after the last backup. What type of backup is Kelly using?","opts":["1. Normal backup","2. Full backup","3. Differential Backup","4. Incremental backup"],"ans":"4"},{"q":"Which of the following terms refers to a set of tasks that organizations must continue throughout or resume rapidly after a disruptive incident?","opts":["1. Business Impact Analysis","2. Maximum Allowed Downtime (MAD)","3. Mission Essential Functions (MEF)","4. Risk Mitigation"],"ans":"3"},{"q":"Jack wanted to transfer his startup’s data to a secure backup site. Since cost was a huge factor for him, one of his friends suggested that he should rent a server for his data from the same data center that his friend used for his organization’s needs. This physical site provided cooling facilities and was cheaper as compared to other backup sites. Which of the following backup sites did Jack opt for?","opts":["1. Colocation Facilities","2. Hot Sites","3. Cold Sites","4. Warm Sites"],"ans":"1"},{"q":"Rachel was reviewing the various tiers of disaster recovery so as to implement them in her startup. One particular tier attracted her attention, and she wanted to put it into effect in her startup. This specific disaster recovery tier backed up data over a WAN connection. Which disaster recovery tier did Rachel want to implement in her startup?","opts":["1. Tier 0","2. Tier 6","3. Tier 5","4. Tier 3"],"ans":"3"},{"q":"Which of the following methods keeps the SYSVOL folder synchronized inside multiple servers present on the same domain?","opts":["1. Failover","2. Distributed File System Replication","3. Data Backup","4. Load Balancing"],"ans":"2"},{"q":"Lisa’s organization has multiple servers to cater to the needs of different businesses and clients. Each of these servers run different applications in order to keep them isolated from each other. The server room incurs a huge cost because of the number of servers owing to the massive cooling systems, server maintenance, data center footprint, and quicker server provisioning. An audit of the resources discovered that most of the servers are idle two-thirds of business hours since these servers are dedicated towards faster recovery during disasters and the isolation of applications. Lisa is looking for a solution to bring down the cost of maintaining these servers, optimize the use of resources, and save money on the energy spent to keep these servers cool. Which solution can meet all these needs of Lisa?","opts":["1. Operating System Virtualization","2. Server Replication","3. Virtual Desktop Infrastructure","4. Server Virtualization"],"ans":"4"},{"q":"Rick is the IT administrator of a small organization, which has a single central server for all the internal service requests of the employees. Due to the recent increase in the team size, the server has been overburdened leading to delays in the processing of employees’ requests. Since cost is an issue, the organization does not want to add more servers and is not willing to go for virtual servers outside the facility. To solve the problem, Rick interconnected the individual computers of the team members and took the server out of the process. This balanced the load between all the computers bringing down the processing time. Which architecture did Rick use in this scenario?","opts":["1. Three Tier","2. N-Tier","3. Peer-to-Peer","4. Client-Server"],"ans":"3"},{"q":"Which of the following terms refers to a storage system, which consists of hard disk drives (HDDs) that look and act like a physical tape library?","opts":["1. Disk-to-Disk (D2D)","2. Virtual Tape Library (VTL)","3. Mirroring","4. Snapshot"],"ans":"2"},{"q":"Which of the following is NOT an advantage of colocation facilities?","opts":["1. Backup","2. Cooling","3. Economic Advantages","4. Recovery of Servers"],"ans":"4"},{"q":"The IT department of ABC Inc. had a practice of storing replicas of the various database servers housed in the organization. One such database server housed the annual sales, profit/ loss, revenue, and other such important data of the organization. The IT department did not want to take frequent replicas of that database since it was updated just once a year and frequent replicas would unnecessarily take storage space and eat into the bandwidth of the organization. In this scenario, the IT department decided to copy the data changes from the original database server to replica database server annually. Which of the following solutions did the IT department implement in this scenario?","opts":["1. Transactional Replication","2. SQL Server Replication","3. Merge Replication","4. Snapshot Replication"],"ans":"4"},{"q":"Match the following RAID components with their functions:","opts":["1. 1-iii,2-v,3-i,4-iv","2. 1-ii, 2-i,3-iv,4-iii","3. 1-iv,2-iii,3-v,4-i","4. 1-v,2-iv,3-ii,4-ii"],"ans":"2"},{"q":"Joan was conducting a particular disaster recovery test in her startup. In this test, the effectiveness, bottlenecks, or any weaknesses in the plan had to be confirmed by the team members. Which test was Joan conducting?","opts":["1. Parallel Testing","2. Walkthrough Testing","3. Simulation Testing","4. Full Interruption Testing"],"ans":"2"},{"q":"When information availability increases in PASIS architecture, which feature decreases as a result?","opts":["1. Confidentiality","2. Durability","3. Nonrepudiation","4. Latency"],"ans":"1"},{"q":"XYZ Inc. has set up an FTP server between its primary site of business and its backup site. Jennifer, the IT administrator, is charged with transferring all the critical data to the backup site via this FTP server. Which of the following terms best describes the process?","opts":["1. Electronic Vaulting","2. Disk Shadowing","3. Disk Duplexing","4. Manually copying the data files and transferring them to the remote site"],"ans":"1"},{"q":"Which of the following terms refers to the ease with which technicians can resolve or replace failing components or systems?","opts":["1. Robustness","2. Redundancy","3. Reparability","4. Recoverability"],"ans":"3"},{"q":"Jack was setting up BCP training for those employees in the organization who did not have a large role to play in the execution of the BCP. This training consisted of the framework, processes, and strategies involved in the plan. What is this training known as?","opts":["1. Scenario Training","2. Detailed Awareness Training","3. Simulation Training","4. Introductory Awareness Training"],"ans":"4"},{"q":"Jonah recently adopted a method to back up his data to an external hard disk. He noticed that his laptop was creating a new backup daily, and each backup was taking up more storage space than the previous one.\nWhich type of backup is Jonah’s computer creating daily?","opts":["1. Differential Backup","2. Online Data Backup","3. Full System Backup","4. Incremental Backup"],"ans":"1"},{"q":"Owing to an impending cyclone, Jonas took certain measures to avoid or minimize the damage the cyclone could cause to his startup’s operations. Under which of the following classifications do Jonas’ measures fall?","opts":["1. Backup","2. Recovery","3. Prevention","4. Resumption"],"ans":"3"},{"q":"Which disaster recovery plan is very expensive and disrupts normal business operations?","opts":["1. Checklist Testing","2. Full Interruption Testing","3. Simulation Testing","4. Parallel Testing"],"ans":"2"},{"q":"Gloria was auditing the BCP prepared by one of her clients. The BCP audit stage that she was currently examining ascertained whether operational resiliency and continuity was being encouraged, and if the BCP was overfunded or underfunded. Which BCP audit stage was Gloria examining?","opts":["1. Management of Process Changes","2. Overall Testing of the Plan","3. Ongoing Program Management","4. Overall Program Governance"],"ans":"3"},{"q":"Emma was conducting scenario training in her organization. In the training phase\nthat was currently being conducted, the participants were well informed in advance about the training taking place. Which training phase was currently being conducted?","opts":["1. Planning Phase","2. Warning Phase","3. Execution Phase","4. Review Phase"],"ans":"2"},{"q":"Which of the following terms measures the severity of the impact of a risk on a business?","opts":["1. Frequency","2. Recovery Time","3. Recovery Scale","4. Assessment Scale"],"ans":"4"},{"q":"Alan wants to start backing up the news articles his team generates every day. Usually his team churns out three or four articles daily. Since the time taken to back up the articles is essentially a downtime for the team, he does not want the backing up process to be too time consuming. Which of the following backups would suit Alan’s needs?","opts":["1. Differential Backup","2. Incremental Backup","3. Full System Backup","4. Online Data Backup"],"ans":"2"},{"q":"Which of the following terms refers to the system’s ability to correctly serve the\nrequests that it receives?","opts":["1. Nonrepudiation","2. Availability","3. Precaution","4. Integrity"],"ans":"2"},{"q":"To comply with a certain information security risk management standard, George did an exercise to identify all the risks that his organization faced. He ascertained that his organization was vulnerable to the following risks:\n⚫ Phishing emails tothe employees of his organization\n⚫ Earthquakes, whichwere common for the city in which his office was located\n⚫ Destruction of theorganization’s critical data due to the crashing of the primary server\n⚫ Electrical surges,which in long-term could cause harm to the primary server\nThe standard demanded that he prioritize these risks before chalking out a plan to deal with them and identify the risk with the highest priority. According to George, electrical surges were the highest priority risk. Which standard is George trying to comply with?","opts":["1. ISO 27001","2. ISO/ IEC 27005","3. INCITS 483-2012","4. ISO 27031"],"ans":"4"},{"q":"Phil, an entrepreneur, is running an important experiment on a virtual machine that may give him a breakthrough in the research for his next product. Unfortunately, while the experiment was being conducted, the virtual machine crashed. Fortunately, Phil had implemented a method that took a backup of the machine at regular intervals and would provide an architectural instance of the last saved version of the\nvirtual machine. Which backup method did Phil implement?","opts":["1. Disk-to-Disk (D2D)","2. Snapshot","3. Continuous Data Protection (CDP)","4. Mirroring"],"ans":"2"},{"q":"Max and Carl, two partners in an organization, are considering whether to implement a standard that provides a framework of methods and processes to identify and specify all aspects for improving an organization's ICT readiness to ensure business continuity. Which standard are Max and Carl discussing about?","opts":["1. INCITS 483-2012","2. ISO 27005","3. ISO 27031","4. ISO 22313"],"ans":"3"},{"q":"Phoebe was conducting several test cases in her organization for the disaster recovery plan. For the cases to be successful, at least 90% of the test cases must pass. What is this scenario known as?","opts":["1. Software Testing Lifecycle","2. Suspension Criteria","3. Exit Criteria","4. Entry Criteria"],"ans":"3"},{"q":"What is the name of the shared directory in the Microsoft Server OS, which contains the copy of commonly shared and replicated public files of that particular domain?","opts":["1. Public Files","2. ADFS","3. inetpub","4. SYSVOL"],"ans":"4"},{"q":"Using which feature of Windows 10, users can preserve the state of the systems including the important system files, installed applications, and system settings?","opts":["1. System Backup","2. System Update","3. Failover replication","4. System Restore"],"ans":"4"},{"q":"Which of the following clusters provides consistent file system images across servers in a cluster, allowing the servers to simultaneously read and write to a single shared file system?","opts":["1. High-Performance Clusters","2. Storage Cluster","3. Failover Cluster","4. High-Availability Clusters"],"ans":"2"},{"q":"Jessie was implementing PASIS architecture in her organization in order to keep the organization’s critical data safe, in case a disaster struck. Additionally, she also wanted to prevent unauthorized access of data. After the PASIS architecture was implemented, the critical data was only accessible to the authorized employees. Which feature of PASIS architecture made this possible?","opts":["1. Reaction","2. Confidentiality","3. Availability","4. Maintenance"],"ans":"2"},{"q":"Jonathan was preparing a disaster recovery plan for his organization. One of the components he was using contained a pictorial representation of all the processes in disaster recovery. Which disaster recovery component was being used by Jonathan?","opts":["1. Exclusions","2. Activation Procedures","3. System Description","4. Scope Statement"],"ans":"3"},{"q":"Which of the following terms refers to a high-speed data transmission technique that provides access to consolidated block-level storage?","opts":["1. Network Attached Storage (NAS)","2. Storage Area Network (SAN)","3. Cloud Storage","4. Storage Virtualization"],"ans":"2"},{"q":"Which of the following terms refers to a storage technology that is used to capture real-time data changes and facilitate data restore points and recovery?","opts":["1. Mirroring","2. Disk-to-Disk (D2D)","3. Virtual Tape Library (VTL)","4. Continuous Data Protection (CDP)"],"ans":"4"},{"q":"Archie was testing the BCP in his startup by mobilizing the resources. Which specific test was Archie conducting?","opts":["1. Functional Test","2. Simulation Test","3. Checklist Test","4. Orientation Test"],"ans":"1"},{"q":"Joanna installed a software on her office computer that backed up, restored, and recovered database files. The software performed these functions using database server sessions. Which software did Joanna install?","opts":["1. Disk Drill","2. RMAN","3. Recuva","4. Virtuozzo"],"ans":"2"},{"q":"Which of the following terms refers to the recommencement of business functions and operations as the systems are gradually made available after the occurrence of a disaster?","opts":["1. Resume","2. Recover","3. Reduce","4. Return"],"ans":"1"},{"q":"Jake was preparing a particular plan for his organization in which all personnel accountable for research, development, and implementation of the disaster recovery plan were being identified. Which plan was Jake preparing for his organization?","opts":["1. Disaster Recovery Plan","2. Disaster Management Plan","3. Business Continuity Plan","4. IT Recovery Plan"],"ans":"1"},{"q":"Tom works as a network administrator in a multinational organization having branches across North America and Europe. He wants to implement a storage technology that can provide centralized data storage and free data backup on the server. In addition, the selected technology will aid him in performing data backup and recovery more efficiently. Which of the following storage technologies best suits Tom’s requirements?","opts":["1. PAS","2. RAID","3. NAS","4. DAS"],"ans":"3"},{"q":"Where can the VM Management Service be located in the Hyper-V architecture?","opts":["1. Parent Partition","2. Child Partition","3. Windows Kernel","4. Hypervisor Layer"],"ans":"1"},{"q":"Which of the following sub-teams is responsible for assigning the research and carry\nout the development and implementation of the disaster recovery plan throughout the organization?","opts":["1. Disaster Management Team Chairpersons","2. Disaster Management Team Coordinators","3. Disaster Management Team","4. Disaster Management Executive Committee"],"ans":"4"},{"q":"A few days after Fred launched his new website online, he discovers that the site is not accessible. Upon investigation, he learns that some of the hosting files on the server have been corrupted. Which of the following servers would Fred have to restore to get his site backup?","opts":["1. Catalog Server","2. IIS Server","3. Application Server","4. Database Server"],"ans":"2"},{"q":"Which of the following terms refers to a programming pattern in which computers are clustered together in a distributed and parallel fashion?","opts":["1. Decentralized Computing","2. Cloud Computing","3. Grid Computing","4. Centralized Computing"],"ans":"3"},{"q":"Which of the following terms refers to a backup that is taken when the database is offline?","opts":["1. Full System Backup","2. Hot Backup","3. Online Data Backup","4. Cold Backup"],"ans":"4"},{"q":"After learning about the features of PASIS architecture, James decides to implement the same in his startup. After a few months, an earthquake destroyed a few storage nodes in the central server rendering the data in those nodes unreadable. Since James had implemented the PASIS architecture, he was able to recover the data present in the destroyed nodes. Which feature of PASIS architecture allowed James to recover the data?","opts":["1. Integrity","2. Availability","3. Reaction","4. Durability"],"ans":"4"},{"q":"A company wants to implement a data backup method that allows them to encrypt the data ensuring its security as well as access at any time and from any location. What is the appropriate backup method that should be implemented?","opts":["1. Cloud Backup","2. Hot Site Backup","3. Offsite Backup","4. Onsite Backup"],"ans":"1"},{"q":"Fred identified that his organization was vulnerable to mainly two risks.\na. One was a suddenpower outage that could damage critical data.\nb. Second was themalicious attachment in an email. Since Fred’s organization\nreceived manyemails\nenquiring about the services from unknown sources.\nTo face these risks, Fred decided to take some cautionary measures. Despite his office being in a locality where power was seldom disrupted, there had been instances in the past when the authorities shut down power without warning owing to an oncoming storm. Hence, Fred had a backup generator installed. Then, Fred asked his IT team to install a malware and spam protection software at the mail server to scan all the emails coming to the organization. Additionally, he also had an eight-hour backup system installed in his organization’s server room. This would give him enough time to properly power down the servers. These two steps by him greatly mitigated the two primary risks faced by his organization. Which process did Fred go through?","opts":["1. Risk Mitigation","2. Risk Assessment","3. Risk Management","4. Risk Identification"],"ans":"3"},{"q":"Which of the following terms measures the number of applications or data sets handled by the recovery solution and the maximum size of the data it can store?","opts":["1. Recovery Location Scope (RLS)","2. Recovery Service Resiliency (RSR)","3. Recovery Point Objective (RPO)","4. Recovery Service Scalability (RSS)"],"ans":"4"},{"q":"Matt wants his organization to be prepared for any disaster that may occur in the future. In his preparations for the same, he wants to implement a robust storage system for his servers. After conducting a thorough research, he arrives at the conclusion that PASIS architecture would be the best suited for his requirements as it combines several critical components to provide survivable data storage. Which of\nthe following components does the PASIS architecture integrate?","opts":["1. Centralized Computing, Data Redundancy and Encoding","2. Centralized Storage Systems, Deduplication and Mirroring","3. Decentralized Storage Systems, Data Redundancy and Encoding, and Dynamic Self-Maintenance","4. Distributed Computing, Data Redundancy and Encoding, and Dynamic Self-Maintenance"],"ans":"3"},{"q":"Which of the following terms refers to the ability to restore data and applications that run businesses should their data centers, servers, or other infrastructure get damaged or destroyed due to a disaster?","opts":["1. Recovery Management","2. Disaster Recovery","3. Data Recovery","4. Application Recovery"],"ans":"2"},{"q":"An online betting site accepts bets for sporting events held around the world. Due to this, their operations need to be up 24X7. During an internal IT audit, they discovered a vulnerability in their payment gateway system. They assessed that should the payment gateway go down for more an hour, they will lose about $100,000 and about 15% of their customers to their competitor website. Moreover, they might lose 25% of their customer base permanently due to the constant promotions run by their competitor to attract and retain new customers. This was unacceptable for the business under any circumstances, so immediate corrective measures were taken to fix the vulnerability. What technical term best defines this time period of two hours?","opts":["1. Recovery Point Objective (RPO)","2. Work Recovery Time (WRT)","3. Maximum Tolerable Period of Disruption (MTPOD)","4. Recovery Time Objective (RTO)"],"ans":"3"},{"q":"While implementing a business continuity plan in her organization, Jane wants to make use of a specific standard. This specific standard would guide her organization in establishing, implementing, and maintaining a formal and documented business impact analysis (BIA) process. Which of the following standards did Jane want to implement in her organization?","opts":["1. ISO/IEC 27031","2. ISO/TS 22317","3. ISO/IEC 27005","4. AS/NZS 5050"],"ans":"2"},{"q":"Which of the following terms refers to a data storage and processing facility that is virtualized and provided as a service?","opts":["1. Cloud-based Storage","2. Software Defined Data Center","3. Virtual Machines","4. Data Virtualization"],"ans":"2"},{"q":"Which of the following terms refers to a dedicated server, which is also used for file storage and sharing?","opts":["1. Network Attached Storage (NAS)","2. Data Virtualization","3. Storage Area Network (SAN)","4. Cloud Storage"],"ans":"1"},{"q":"Martin works as a network administrator in a company. He recently created a FTP server and wants to take the backup of the configuration of his Cisco Router on the FTP server. Which Cisco IOS CLI (Command Line Interface) command can help him do this?","opts":["1. #copy running-configuration tftp","2. #backup running-configuration ftp","3. #backup running-configuration tftp","4. #copy running-configuration ftp"],"ans":"4"},{"q":"Jason is a system administrator in an organization, which operates virtual machines. While going through the testing process, he noticed that the speed of transmission of data between the virtual machines was slow. This issue may have occurred due to poor Virtual Machine Queuing (VMQ) handling, as a result of Network Interface Card (NIC) restrictions on the physical machines. What should Jason do to remedy this issue?","opts":["1. Improve the performance of the network storage","2. None of these","3. Increase the bandwidth of the network connection","4. Update the NIC driver"],"ans":"4"},{"q":"Remy had invested $15,000 in an organization that manufactured computer hardware. The investment was risky as it had a 15% chance of failing in the first three months if the organization did not get a specific desired contract. However, this percentage drastically increased to 35% over the same period when an inspection revealed that the manufacturing unit did not have adequate fire safety measures in place. Due to this, the chances of a fire breaking out and destroying the unit were\nvery high. Which method of evaluating the risk has Remy used in this scenario?","opts":["1. Risk Valuation","2. Risk Adjusted Return On Capital (RAROC)","3. Value at Risk","4. Return on Risk Adjusted Capital (RORAC)"],"ans":"3"},{"q":"Which of the following terms refers to the process of repairing the old site affected by a disaster or setting up a completely new alternate site to resume business operations after a disaster?","opts":["1. Restoration","2. Business Continuity","3. Resumption","4. Response"],"ans":"1"},{"q":"Lily works as a disaster recovery professional in an IT company. The archiving method used by the company provides the tools and software required for the archiving of data. The data can be easily accessed and cataloged in this method. However, this method involves recurring costs in its cooling and maintenance. What data archiving method is being used by Lily’s company?","opts":["1. Cloud-Based Archiving","2. Legacy Archiving","3. Optical Media Storage","4. On-Premise Disk Based Archiving"],"ans":"4"},{"q":"A hospital was upgrading its records to a digital form. In the process, it was also moving from manual processes in the emergency room to automated online\nprocesses. Since this information was extremely vital and could not be unavailable for even minutes, the IT department proposed a solution that would address this need. In the proposed system, a secondary server would take over the primary one automatically the second the primary server goes down for any reason. This required the two servers to be in coordination at all times. Which solution is the IT department proposing?","opts":["1. Point in Time Recovery","2. Database Replication","3. Failover","4. Deduplication"],"ans":"3"},{"q":"Which of the following terms refers to a client-server architecture that is merged with layered architecture?","opts":["1. Client-Server Architecture","2. Application Server-Tier Architecture","3. Tightly Coupled Architecture","4. N-Tier Architecture"],"ans":"4"},{"q":"Which of the following terms refers to the potential gain from the best alternative forgone when a choice needs to be made between several mutually exclusive alternatives?","opts":["1. Cost Benefit Analysis","2. Fixed Cost","3. Business Impact Analysis","4. Opportunity Cost"],"ans":"4"},{"q":"Jack updated the operating system of his MacBook to the latest beta version. Few hours later, while working on his MacBook, Jack discovers that some of his installed applications are not working properly and this may happen due to the bug-ridden beta update. Hence, he decides to restore his MacBook to the previous OS version. Which MacBook feature should Jack be using in this scenario?","opts":["1. Time Shift","2. Image Recovery","3. Snapshots","4. Time Machine"],"ans":"4"},{"q":"Which of the following is a feature of mainframe computers?","opts":["1. Pluralism","2. Proven Reliability","3. Openness","4. Transparency"],"ans":"2"},{"q":"Which of the following terms refers to the backing up of files that have been modified, changed or have been added since the last full backup?","opts":["1. Differential Backup","2. Online Data Backup","3. Incremental Backup","4. Full System Backup"],"ans":"1"},{"q":"Which of the following term refers to the evaluation of the potential interruptions in the working of a department due to the failure of their internal systems?","opts":["1. Team-wide BIA","2. Branch-wide BIA","3. Organization-wide BIA","4. Country-wide BIA"],"ans":"2"},{"q":"A US-based organization decided to implement a RAID storage technology for their data backup plan. John wants to setup a RAID level that requires a minimum of six drives to meet high fault tolerance and high speed for the data read and write operations. What RAID level is John considering to meet this requirement?","opts":["1. RAID level 10","2. RAID level 5","3. RAID level 50","4. RAID level 1"],"ans":"3"},{"q":"Which of the following terms refers to the process of determining the potential impact of disruptive events on an organization’s business processes?","opts":["1. Risk Assessment","2. Business Impact Analysis","3. Risk Management","4. Vulnerability Assessment"],"ans":"2"},{"q":"Which of the following terms refers to third party services like recovery infrastructure, real-time remote backup, and offsite replication?","opts":["1. Continuous Data Protection","2. Managed Disaster Recovery","3. Tape Vaulting","4. Disk Shadowing"],"ans":"2"},{"q":"Which of the following training programs is meant for those employees who have an important role in the execution of the BCP and are provided with the framework, processes, and strategies involved in the plan?","opts":["1. Detailed Awareness Training","2. Introductory Awareness Training","3. Scenario Training","4. Simulation Training"],"ans":"1"},{"q":"Mike is installing a new file server running on the Windows Server 2012 operating system. In order to enable the backup and restoration capabilities of that file server, Mike needs to install a specific feature inside the Windows Server 2012 operating system. Which feature should Mike install by using which built- in Windows Server application?","opts":["1. Windows Server Backup, Administrative Tools","2. Server Migration, Microsoft Management Console","3. Windows Server Backup, Microsoft Management Console","4. Server Migration, Administrative Tool"],"ans":"3"},{"q":"Which of the following terms refers to the training milestones that must be achieved in order to meet the BC training program’s aim?","opts":["1. Routine Objectives","2. Development Objectives","3. Time-Related Objectives","4. Terminal Objectives"],"ans":"4"},{"q":"Which of the following disaster recovery tiers makes use of point in time copies?","opts":["1. Tier 6","2. Tier 5","3. Tier 0","4. Tier 4"],"ans":"4"},{"q":"Polly was estimating the magnitude of damage that would be done to her organization if someone were to leak the specifics of the new product her team was developing. Since the information was stored on a potentially vulnerable server and the cost of upgrading the infrastructure was huge, she was assessing if the upgrade should be done. According to her estimations, her company might stand to lose over two hundred thousand dollars should such a leak occur. Since this was more than the cost of the upgrade, she decided to go for the upgrade. Which risk factor did Polly essentially estimate?","opts":["1. Likelihood","2. Vulnerability","3. Impact","4. Hazard"],"ans":"3"},{"q":"Which of the following terms refers to the blueprint that calls out the tactics, which eventually dictate how continuity and recovery from a disaster will be achieved?","opts":["1. Business Continuity Plan","2. Business Continuity Strategy","3. Business Continuity Management","4. Crisis Management"],"ans":"2"},{"q":"Sam was working on an Ubuntu OS-based system and accidentally deleted some of his official project files. Fortunately, he had taken a backup of his system previously. Which of the following native Ubuntu option should he use to recover his deleted files?","opts":["1. Shadow Copy","2. Snapshots","3. D?j? Dup","4. Checkpoints"],"ans":"3"},{"q":"Which of the options must be considered by an organization when conducting BIA?","opts":["1. Transferring a business activity to a third-party","2. Time scales for assessment","3. Establishing alternate processes or creating redundancy/spare capacity in processes","4. Ceasing or changing a business activity if viable alternatives are available"],"ans":"2"},{"q":"Due to the occurrence of a disaster, the data and applications at Phil’s organization were lost. Fortunately, Phil had invested in a disaster recovery tier. This disaster recovery tier provided Phil with automated recovery of data and applications. Which disaster recovery tier did Phil invest in?","opts":["1. Tier 2","2. Tier 4","3. Tier 6","4. Tier 7"],"ans":"2"},{"q":"Which of the following is not an objective of business impact analysis?","opts":["1. Identify RTO and RPO for Each Process","2. Assess the Impact Caused by a Threat","3. Identify the Critical Resources Required by the Business","4. Establish the Recovery Order of the Critical Business Functions"],"ans":"2"},{"q":"XYZ Inc. is an esteemed organization that deals with a variety of internet services and solutions. The organization is developing an Internet-based messaging application, which is currently in the analysis phase. According to the analysis conducted, if a disaster destroyed the primary server, the secondary server would only be able to take the traffic load for four hours since it had limited memory and storage capabilities. Hence, the primary server would need to be up and running within four hours. What technical term best defines this time period of four hours?","opts":["1. Recovery Time Objective (RTO)","2. Recovery Point Objective (RPO)","3. Maximum Tolerable Downtime (MTD)","4. Work Recovery Time (WRT)"],"ans":"1"},{"q":"Which of the following terms refers to the process of an organization to bring a system’s application, and data back to a previous state in a prescribed and acceptable time frame?","opts":["1. System Migration","2. System Replication","3. System Backup","4. System Recovery"],"ans":"4"},{"q":"Jon wanted to conduct a vulnerability assessment for his startup in order to safeguard it from any disaster in the future. The steps in vulnerability assessment are given below:\na) Assess the potentialimpact of the threat on the organization\nb) Estimate theprobability of occurrence of each threat\nc) Assess the internaland external resources available to mitigate the identified threats\nd) List the threats that may occur\nList the threats that may occur\nIn which order should Jon implement these steps?","opts":["1. b, d, c, a","2. b, c, d, a","3. d, b, a, c","4. c, a, d, b"],"ans":"3"},{"q":"Oliver’s team had been working hard on a proposal for a new project. After meticulously working out the details for a month, they found out that someone had leaked their proposal to their competitor and they had lost the project. This impacted their morale hugely, and for the next two months, all the other projects progressed extremely slowly resulting in their delay. Which of the following best describes the impact that this data breach had on the organization?","opts":["1. Quantitative Impact","2. Qualitative Impact","3. Semi-Qualitative Impact","4. Industrial Impact"],"ans":"2"},{"q":"The internal audit of the BCP takes place so as to make sure the plan conforms to which particular standard?","opts":["1. ISO 22313","2. ISO/IEC 27031:2011","3. ISO 22301:2012","4. ISO/IEC 27005:2011"],"ans":"3"},{"q":"Matt is the security advisor for a global online stock brokering organization. He wants to back up his organization’s critical data but is faced with a challenge. Due to the real-time data updating nature of his organization’s business, he cannot have any down time for his systems to back them up. Which of the following backup techniques can help Matt overcome this challenge?","opts":["1. Incremental Backup","2. Online Data Backup","3. Cold Backup","4. Hot Backup"],"ans":"4"},{"q":"Jack owns a startup that provides IT solutions to customers. Jack’s business was faring very well; however, he was facing issues with the scalability of his IT infrastructure. He decided to remedy this situation by implementing a solution, which connected his computers and servers into a single unified computing resource. He connected these computers and servers using various hardware, networks, and software. Additionally, implementation of this solution helped him protect his business against application, server, software, and site failures. Which solution did Jack implement?","opts":["1. Mirroring","2. Deduplication","3. Server Clustering","4. Failover"],"ans":"3"},{"q":"Which of the following terms refers to a graphical representation of a series of data protection tools and services that are designed to help balance the overall cost of data protection against the time-to-recovery in the event of data loss?","opts":["1. 3DR","2. Continuous Data Protection","3. Data Backup","4. Data Protection Continuum"],"ans":"4"},{"q":"Which of the following terms refers to the process of utilizing the full backup of a file and then modifying that file with one or more incremental backups?","opts":["1. Incremental Forever Backup","2. Differential Backup","3. Incremental Backup","4. Synthetic Backup"],"ans":"4"},{"q":"Roger was testing the BCP in his organization. The test that he was conducting simulated a specific event scenario, in which the BCP would be tested. Which test was Roger making use of?","opts":["1. Checklist Test","2. Orientation Test","3. Simulation Test","4. Tabletop Test"],"ans":"3"},{"q":"Joan noticed that one of the servers, which she was responsible for, was slowing down due to a spike in traffic. Too many requests came in due to the extra traffic which was eating up all the memory of the server. This meant that the requests had to wait for a longer period of time before they could be processed. This delay was unacceptable to the business; hence, Joan added some extra virtual memory to the server to smooth things out. What is such a feature called?","opts":["1. Monotonicity","2. Transparency","3. Openness","4. Scalability"],"ans":"4"},{"q":"Which of the following clusters uses mounted file systems to read and write data?","opts":["1. Failover Cluster","2. Storage Cluster","3. High-Availability Cluster","4. High-Performance Clusters"],"ans":"2"},{"q":"Which of the following three components define the three-tier architecture in decentralized computing?","opts":["1. Client, Peer-to-Peer, and Application","2. Application, Peer-to-Peer, and Tightly Coupled","3. Client, Application Server, and Database Server","4. Tightly Coupled, Client, and Peer-to-Peer"],"ans":"3"},{"q":"Mia’s office computer was destroyed completely in a fire that burnt down her apartment. The laptop was crucial for her to carry on with her responsibilities at work since it had a lot of important data about her clients and her dealings with them. As a policy, the IT department had taken frequent backups of her laptop for such situations. The IT department took a laptop in which no OS or software was installed and which was identical to her old one. They used the backups of her old laptop to restore the new one to a last known state of the old one. The entire process was automated, so it was done quickly with a little margin of error. Which method of data recovery did the IT team employ?","opts":["1. System Restore","2. Mirroring","3. Bare Metal Recovery","4. System Image Recovery"],"ans":"3"},{"q":"Which of the following terms refers to any circumstance with the potential to disrupt or degrade the quality of operations or assets?","opts":["1. Threat","2. Vulnerability","3. Hazard","4. Impact"],"ans":"3"},{"q":"Which of the following terms refers to a collection of historical records specifically selected for long-term retention and future reference?","opts":["1. Data Archiving","2. Data Backup","3. Data Deletion","4. Data Restore"],"ans":"1"},{"q":"Which of the following technical process provides additional security to virtual machines by disabling unnecessary interfaces, devices, ports, and services?","opts":["1. Hardening","2. Restriction of Physical Access","3. Defense-in-Depth","4. Isolation of Security Functions"],"ans":"1"},{"q":"Which of the following virtualization methods requires a software called containers or virtual engines to run?","opts":["1. Desktop Virtualization","2. OS-based Virtualization","3. Data Virtualization","4. Network Virtualization"],"ans":"2"},{"q":"Which of the following terms refers to the delay experienced by a system while it is serving a request?","opts":["1. Latency","2. Nonrepudiation","3. Reaction","4. Durability"],"ans":"1"},{"q":"Matt is unable to boot his Windows Server 2012 system after an OS update. He later finds out that some of the important files of the boot manager are corrupted and that led to boot manager failure. However, he tries to recover the boot manager using the Command Prompt present in the System Recovery option. Which command\nprompt command should Matt use in this scenario?","opts":["1. repadmin /showrepl","2. sfc /scannow","3. ntdsutil","4. Bootrec /RebuildBCD"],"ans":"4"},{"q":"An organization is facing issues with updating its data since it has been the culture of the organization for employees to create individual backups for the same data. This is not only consuming a lot of virtual storage space but is also eating into the bandwidth of the organization. Additionally, this can also lead to a potential data leak in the organization. What can be done to contain this situation?","opts":["1. Data Remanence","2. Failover","3. Data Erasure","4. Deduplication"],"ans":"4"},{"q":"What is the main objective of a BC test plan?","opts":["1. To demonstrate proficiency in management response and crisis conditions","2. Not threaten the normal business operations of an organization","3. To diverge from the test storyboard to include unplanned events or circumstances","4. To ensure the plan is accurate and relevant under adverse circumstances"],"ans":"4"},{"q":"When information confidentiality increases in PASIS architecture, what else also increases as a direct result?","opts":["1. Reaction","2. Durability","3. Latency","4. Storage Requirement"],"ans":"4"},{"q":"In which scenario training phase, a debrief is conducted with the participants to obtain more feedback?","opts":["1. Warning Phase","2. Execution Phase","3. Planning Phase","4. Review Phase"],"ans":"4"},{"q":"Which of the following is a virtualization standard specified by the Distributed Management Task Force (DMTF)?","opts":["1. vCloud API","2. Open Virtualization Format (OVF)","3. Cloud Security Alliance (CSA)","4. PCI Data Security Standard (PCI DSS)"],"ans":"2"},{"q":"Which of the following refers to a moveable operating environment that can be set up or installed at any place on transportable units?","opts":["1. Colocation Facilities","2. Cold Site","3. Crisis Command Center","4. Mobile Recovery Center"],"ans":"4"},{"q":"In which disaster recovery tier is data backed up with a hot site?","opts":["1. Tier 2","2. Tier 5","3. Tier 1","4. Tier 4"],"ans":"2"},{"q":"Katie was setting up disaster recovery teams in her organization to combat any disaster that occurred. One of the most important teams was the disaster recovery coordinator. Having two names in mind for the post, Katie interviewed the two people for the roles and responsibilities of the disaster recovery coordinator. Which of the following statements should either of the interviewees use to get the post?","opts":["1. Day-to-day management control over the execution and maintenance of the disaster recovery program","2. Responsible for the specification and design of all technology-based disaster recovery solutions","3. Executive authority over the disaster recovery program","4. Responsible for disaster recovery planning verification and compliance"],"ans":"1"},{"q":"Which layer of the Recovery Management Model would provide hassle-free recovery of systems in case of a disaster and would enable the control of data protection technologies such as replication and backup?","opts":["1. Analytics and Reporting Layer","2. Protection Technologies Layer","3. Testing Simulation Layer","4. Common Management Layer"],"ans":"4"},{"q":"Remus works as an IT administrator for an organization. An important aspect of his job is to ensure that physical storage space remains available in all host machines at all times. However, recently there was not much physical storage space available in one host machine, so he deleted several snapshots of the virtual machines present. Despite the deletion, free space could not be obtained. What can Remus do to remedy this situation?","opts":["1. Uninstall the Hypervisor","2. Shut down or restart the virtual machine system","3. Delete the virtual machine database","4. Delete the child disk of the snapshots present in the host machine"],"ans":"4"},{"q":"James was working on a presentation for the past few weeks. Once James completed the presentation, he stored it on an external hard disk. Unfortunately, James accidentally damaged the hard drive when he was on his way for the presentation. Due to the irreversible damage, the data present on the hard drive was rendered unreadable and inaccessible.\nWhat type of data loss did James cause?","opts":["1. Logical","2. Natural Disaster","3. Physical","4. Data Corruption"],"ans":"3"},{"q":"Which of the following terms refers to a holistic management process that identifies potential threats to an organization and its impacts on business operations? It further provides a framework for building organizational resilience with the capability for an effective response that safeguards the interests of its key stakeholders, reputation, brand and value-creating activities?","opts":["1. Business Impact Analysis","2. Risk Management","3. Business Continuity Management","4. Disaster Recovery"],"ans":"3"},{"q":"Which of the following terms refers to the application of strategies designed to help an organization deal with a sudden and significant undesirable event?","opts":["1. Business Impact Analysis (BIA)","2. Application Recovery","3. Risk Assessment","4. Crisis Management"],"ans":"4"},{"q":"Which of the following is also known as the doomsday recovery level in 3DR?","opts":["1. Backup of Data","2. Archiving of Data","3. Local Data Protection","4. Remote Backup of Data Protection"],"ans":"2"},{"q":"Which of the following terms refers to the act, manner, or practice of an organization to bring systems, applications, and data back to “normal” conditions in a prescribed and acceptable time frame?","opts":["1. Risk Management","2. Business Continuity Management (BCM)","3. Disaster Recovery Management","4. Recovery Management"],"ans":"4"},{"q":"Craig runs a back-end support center for a few technology clients. Due to the global nature of his clientele, the operations need to be up 24x7. However, he can afford a downtime of a few days in the event of a disaster owing to the non-emergency nature of the products he supports. He identified a backup site for his operations to which he can switch to in case his primary site of business is rendered defunct by a disaster. Since he has the buffer of a few days, he decided that he would pre-install the hardware and pre-configure restoration settings at the backup site. This will allow him to get his operations up and running within the specified RTO. Which of the following backup sites did Craig go for?","opts":["1. Warm Sites","2. Cold Sites","3. Hot Sites","4. Colocation Facilities"],"ans":"1"},{"q":"Which of the following is not a component of BIA?","opts":["1. Safety","2. Formation of Committee","3. Feedback","4. Executive Sponsorship"],"ans":"1"}];
    const QUIZ_RESERVED_STORAGE_KEYS = new Set([
        QUIZ_SETTINGS_STORAGE_KEY,
        QUIZ_CORRECT_STORAGE_KEY,
        QUIZ_METADATA_STORAGE_KEY,
        QUIZ_THEME_STORAGE_KEY,
        QUIZ_WRONG_HISTORY_STORAGE_KEY,
        QUIZ_ACCURACY_HISTORY_STORAGE_KEY,
        QUIZ_QUESTION_STATS_STORAGE_KEY,
        QUIZ_WRONG_RETRY_PREFERENCE_STORAGE_KEY,
        QUIZ_SELECTED_BANK_STORAGE_KEY,
        PQS_CURRENT_USER_STORAGE_KEY
    ]);

    // sourceQuizBank 永遠保存完整原始題庫；quizBank 則是套用設定後的本次測驗清單。
    let sourceQuizBank = [];
    let quizBank = [];
    let markedQuestions = {}; // 用於追蹤哪些題號被 Mark
    let examTimerInterval = null; // 用於儲存定時器物件
    let totalSeconds = 0;         // 累計作答秒數
    let answerHintTimers = {};    // 答案提示倒數器，避免連續點選時殘留提示樣式
    let currentQuizStorageKey = ''; // 本次測驗所屬題庫 key，用於錯題歷史分題庫保存
    let currentSessionFirstAttempts = new Set(); // 本次測驗中已記錄過第一次選項點擊的題目 id
    let currentSessionFirstWrongIds = new Set(); // 本次測驗第一次點選就答錯的選擇題 id
    let lastWrongRetryQuestions = []; // 完成作答後保留本次可再次測驗的錯題清單
    let currentSessionMode = 'exam'; // 未來複習模式可設為 review，統計記錄會自動停用
    let isExamInProgress = false;
    let isSummaryVisible = false;
    let nextQuestionScrollTimer = null;
    let correctlyAnsweredQuestions = new Set(JSON.parse(localStorage.getItem(QUIZ_CORRECT_STORAGE_KEY) || '[]'));
    let currentPqsUser = localStorage.getItem(PQS_CURRENT_USER_STORAGE_KEY) || '';
    const PQS_PAGE = document.body?.dataset?.page || 'home';
    const PQS_IS_OFFLINE = window.PQS_OFFLINE_MODE === true || document.body?.dataset?.offline === 'true';

    function getPagePath(page) {
        const routes = {
            access: 'index.html',
            home: 'home.html',
            quiz: 'quiz.html',
            stats: 'stats.html'
        };
        return routes[page] || routes.home;
    }

    function navigateToPage(page) {
        if (PQS_IS_OFFLINE) return;
        window.location.href = getPagePath(page);
    }

    function getActiveQuizStorageKey() {
        const select = document.getElementById('historySelect');
        return select?.value || currentQuizStorageKey || localStorage.getItem(QUIZ_SELECTED_BANK_STORAGE_KEY) || '';
    }

    function setActiveQuizStorageKey(storageKey) {
        currentQuizStorageKey = storageKey || '';
        if (storageKey) localStorage.setItem(QUIZ_SELECTED_BANK_STORAGE_KEY, storageKey);
    }

    function isSupabaseEnabled() {
        return !PQS_IS_OFFLINE && Boolean(SUPABASE_REST_URL && SUPABASE_ANON_API_KEY);
    }

    async function supabaseRequest(path, options = {}) {
        if (!isSupabaseEnabled()) return null;

        const headers = Object.assign({
            apikey: SUPABASE_ANON_API_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_API_KEY}`,
            'Content-Type': 'application/json'
        }, options.headers || {});

        const response = await fetch(`${SUPABASE_REST_URL}/${path}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`Supabase ${response.status}: ${message}`);
        }

        if (response.status === 204) return null;
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }

    function syncSupabase(promise) {
        if (!promise) return;
        promise.catch(error => console.warn('[PQS Supabase sync]', error.message));
    }

    function normalizePqsUsername(value) {
        return String(value || '')
            .trim()
            .replace(/\s+/g, ' ')
            .slice(0, 40);
    }

    function getUserInitials(name) {
        const normalized = normalizePqsUsername(name);
        if (!normalized) return '--';

        const parts = normalized.split(/[\s._-]+/).filter(Boolean);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return normalized.slice(0, 2).toUpperCase();
    }

    function updateUserMenuDisplay() {
        const displayName = currentPqsUser || '未選擇使用者';
        const avatar = document.getElementById('userAvatar');
        const display = document.getElementById('userDisplayName');
        const menuName = document.getElementById('userMenuName');

        if (avatar) avatar.textContent = getUserInitials(displayName);
        if (display) display.textContent = displayName;
        if (menuName) menuName.textContent = displayName;
        scheduleHeaderLayoutUpdate();
    }

    function scheduleHeaderLayoutUpdate() {
        requestAnimationFrame(function() {
            updateHeaderTitleFit();
            scheduleHistorySelectAlignment();
        });
    }

    function updateHeaderTitleFit() {
        const button = document.querySelector('.app-title-button');
        const headerMain = document.querySelector('.header-main');
        const header = document.querySelector('.exam-header');
        const headerTools = document.querySelector('.header-tools');
        const titleText = document.getElementById('appTitleText');
        if (!button || !headerMain || !header || !headerTools || !titleText) return;

        const titles = window.innerWidth > 820
            ? ['練習測驗系統 (Practice Quiz System)', '練習測驗系統(PQS)', '練習測驗系統', '測驗系統', 'PQS']
            : ['練習測驗系統(PQS)', '練習測驗系統', '測驗系統', 'PQS'];

        const measure = document.createElement('span');
        const styles = window.getComputedStyle(button);
        measure.className = 'app-title-measure';
        measure.style.font = styles.font;
        document.body.appendChild(measure);

        const headerStyles = window.getComputedStyle(header);
        const headerGap = parseFloat(headerStyles.columnGap || headerStyles.gap) || 0;
        const headerPadding = parseFloat(headerStyles.paddingLeft) + parseFloat(headerStyles.paddingRight);
        const panelToggle = document.getElementById('mobileHeaderPanelToggle');
        const toggleWidth = panelToggle && window.getComputedStyle(panelToggle).display !== 'none'
            ? panelToggle.offsetWidth + 6
            : 0;
        const reserved = headerTools.offsetWidth + headerPadding + headerGap + toggleWidth + 16;
        const availableWidth = Math.max(0, header.offsetWidth - reserved);
        let selected = titles[titles.length - 1];

        for (const title of titles) {
            measure.textContent = title;
            if (measure.offsetWidth <= availableWidth) {
                selected = title;
                break;
            }
        }

        measure.remove();
        titleText.textContent = selected;
    }

    function closeUserMenu() {
        const menu = document.getElementById('userMenu');
        const button = document.getElementById('userMenuButton');
        if (menu) menu.hidden = true;
        if (button) button.setAttribute('aria-expanded', 'false');
    }

    function toggleUserMenu() {
        const menu = document.getElementById('userMenu');
        const button = document.getElementById('userMenuButton');
        if (!menu || !button) return;

        const willOpen = menu.hidden;
        menu.hidden = !willOpen;
        button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    }

    function showAccessSection() {
        if (!PQS_IS_OFFLINE && PQS_PAGE !== 'access') {
            navigateToPage('access');
            return;
        }
        const accessSection = document.getElementById('accessSection');
        const managementSection = document.getElementById('managementSection');
        const statsSection = document.getElementById('statsSection');
        const quizSection = document.getElementById('quizSection');
        const userInput = document.getElementById('accessUserInput');

        isExamInProgress = false;
        closeMobileExamPanel();
        closeUserMenu();
        resetExamTimer();
        if (managementSection) managementSection.style.display = 'none';
        if (statsSection) statsSection.style.display = 'none';
        if (quizSection) quizSection.style.display = 'none';
        if (accessSection) accessSection.style.display = 'grid';
        if (userInput) {
            userInput.value = '';
            userInput.focus();
        }
        document.body.classList.add('access-active');
        document.body.classList.remove('quiz-active');
        setHomeBackgroundVisible(true);
    }

    function switchPqsUser() {
        localStorage.removeItem(PQS_CURRENT_USER_STORAGE_KEY);
        currentPqsUser = '';
        updateUserMenuDisplay();
        showAccessSection();
    }

    function getSupabaseUserParam() {
        return encodeURIComponent(currentPqsUser || 'default');
    }

    function syncCurrentUserToSupabase() {
        if (!currentPqsUser) return null;
        return supabaseRequest('pqs_users?on_conflict=username', {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates' },
            body: JSON.stringify({
                username: currentPqsUser,
                display_name: currentPqsUser,
                last_seen_at: new Date().toISOString()
            })
        });
    }

    function syncQuizBankToSupabase(storageKey, displayName, questions, timestamp) {
        if (!storageKey || !Array.isArray(questions)) return null;

        return supabaseRequest('pqs_quiz_banks?on_conflict=username,storage_key', {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates' },
            body: JSON.stringify({
                username: currentPqsUser || 'default',
                storage_key: storageKey,
                display_name: displayName,
                question_count: questions.length,
                questions,
                uploaded_at: new Date(timestamp || Date.now()).toISOString(),
                updated_at: new Date().toISOString()
            })
        });
    }

    async function ensureQuizBankSyncedToSupabase(storageKey) {
        if (!isSupabaseEnabled() || !storageKey) return null;

        let questions = [];
        try {
            questions = JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch (e) {
            questions = [];
        }
        if (!Array.isArray(questions) || questions.length === 0) return null;

        const displayName = storageKey === BUILTIN_EDRP_STORAGE_KEY
            ? 'EDRP.csv'
            : storageKey.replace(/^quiz_sys_/, '');
        const metaData = JSON.parse(localStorage.getItem(QUIZ_METADATA_STORAGE_KEY) || '{}');
        return syncQuizBankToSupabase(storageKey, displayName, questions, metaData[storageKey] || Date.now());
    }

    function deleteQuizBankFromSupabase(storageKey) {
        if (!storageKey || storageKey === BUILTIN_EDRP_STORAGE_KEY) return null;
        return supabaseRequest(`pqs_quiz_banks?username=eq.${getSupabaseUserParam()}&storage_key=eq.${encodeURIComponent(storageKey)}`, {
            method: 'DELETE',
            headers: { Prefer: 'return=minimal' }
        });
    }

    function deleteQuizStatsFromSupabase(storageKey) {
        if (!storageKey) return null;
        const quizParam = encodeURIComponent(storageKey);
        const userParam = getSupabaseUserParam();
        return Promise.all([
            supabaseRequest(`pqs_accuracy_history?username=eq.${userParam}&quiz_storage_key=eq.${quizParam}`, {
                method: 'DELETE',
                headers: { Prefer: 'return=minimal' }
            }),
            supabaseRequest(`pqs_question_stats?username=eq.${userParam}&quiz_storage_key=eq.${quizParam}`, {
                method: 'DELETE',
                headers: { Prefer: 'return=minimal' }
            }),
            supabaseRequest(`pqs_wrong_history?username=eq.${userParam}&quiz_storage_key=eq.${quizParam}`, {
                method: 'DELETE',
                headers: { Prefer: 'return=minimal' }
            })
        ]);
    }

    function syncCorrectAnswerToSupabase(questionId) {
        if (!questionId) return null;
        return supabaseRequest('pqs_correct_questions?on_conflict=username,question_id', {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates' },
            body: JSON.stringify({
                username: currentPqsUser || 'default',
                question_id: String(questionId),
                marked_at: new Date().toISOString()
            })
        });
    }

    async function syncWrongHistoryToSupabase(quizStorageKey, wrongIds, recordedAt) {
        if (!quizStorageKey) return null;
        await ensureQuizBankSyncedToSupabase(quizStorageKey);
        return supabaseRequest('pqs_wrong_history', {
            method: 'POST',
            headers: { Prefer: 'return=minimal' },
            body: JSON.stringify({
                username: currentPqsUser || 'default',
                quiz_storage_key: quizStorageKey,
                recorded_at: new Date(recordedAt || Date.now()).toISOString(),
                wrong_ids: [...new Set((wrongIds || []).map(id => String(id)))]
            })
        });
    }

    async function syncLearningStatsToSupabase(quizStorageKey, historyRecord, quizStats, completedAt) {
        if (!quizStorageKey || !historyRecord) return null;
        await ensureQuizBankSyncedToSupabase(quizStorageKey);

        const answeredStats = Object.entries(quizStats || {})
            .map(([questionId, stats]) => ({
                username: currentPqsUser || 'default',
                quiz_storage_key: quizStorageKey,
                question_id: questionId,
                attempts: stats.attempts || 0,
                correct: stats.correct || 0,
                wrong: stats.wrong || 0,
                last_answered_at: new Date(stats.lastAnsweredAt || completedAt).toISOString(),
                updated_at: new Date().toISOString()
            }));

        const writeHistory = supabaseRequest('pqs_accuracy_history', {
            method: 'POST',
            headers: { Prefer: 'return=minimal' },
            body: JSON.stringify({
                username: currentPqsUser || 'default',
                quiz_storage_key: quizStorageKey,
                completed_at: new Date(completedAt).toISOString(),
                correct_count: historyRecord.correctCount,
                total_count: historyRecord.totalCount,
                accuracy_rate: historyRecord.accuracyRate,
                duration_seconds: historyRecord.durationSeconds,
                mode: historyRecord.mode
            })
        });

        const writeQuestionStats = answeredStats.length
            ? supabaseRequest('pqs_question_stats?on_conflict=username,quiz_storage_key,question_id', {
                method: 'POST',
                headers: { Prefer: 'resolution=merge-duplicates' },
                body: JSON.stringify(answeredStats)
            })
            : Promise.resolve(null);

        return Promise.all([writeHistory, writeQuestionStats]);
    }

    async function loadSupabaseQuizBanksToLocalStorage() {
        if (!isSupabaseEnabled()) return;

        const rows = await supabaseRequest(`pqs_quiz_banks?username=eq.${getSupabaseUserParam()}&select=storage_key,display_name,uploaded_at,questions&order=uploaded_at.desc`);
        if (!Array.isArray(rows)) return;

        const metaData = JSON.parse(localStorage.getItem(QUIZ_METADATA_STORAGE_KEY) || '{}');
        rows.forEach(row => {
            if (!row.storage_key || !Array.isArray(row.questions)) return;
            localStorage.setItem(row.storage_key, JSON.stringify(row.questions));
            metaData[row.storage_key] = row.uploaded_at ? new Date(row.uploaded_at).getTime() : Date.now();
        });
        localStorage.setItem(QUIZ_METADATA_STORAGE_KEY, JSON.stringify(metaData));
        updateHistoryDropdown();
        updateQuestionScopeHint();
    }

    async function loadSupabaseUserDataToLocalStorage() {
        if (!isSupabaseEnabled() || !currentPqsUser) return;

        await loadSupabaseQuizBanksToLocalStorage();

        const userParam = getSupabaseUserParam();
        const [accuracyRows, questionStatRows, wrongRows, correctRows] = await Promise.all([
            supabaseRequest(`pqs_accuracy_history?username=eq.${userParam}&select=quiz_storage_key,completed_at,correct_count,total_count,accuracy_rate,duration_seconds,mode&order=completed_at.desc`),
            supabaseRequest(`pqs_question_stats?username=eq.${userParam}&select=quiz_storage_key,question_id,attempts,correct,wrong,last_answered_at`),
            supabaseRequest(`pqs_wrong_history?username=eq.${userParam}&select=quiz_storage_key,recorded_at,wrong_ids&order=recorded_at.desc`),
            supabaseRequest(`pqs_correct_questions?username=eq.${userParam}&select=question_id`)
        ]);

        const accuracyStore = {};
        (accuracyRows || []).forEach(row => {
            if (!row.quiz_storage_key) return;
            const records = accuracyStore[row.quiz_storage_key] || [];
            records.push({
                completedAt: Date.parse(row.completed_at),
                correctCount: row.correct_count || 0,
                totalCount: row.total_count || 0,
                accuracyRate: row.accuracy_rate || 0,
                durationSeconds: row.duration_seconds || 0,
                mode: row.mode || 'exam'
            });
            accuracyStore[row.quiz_storage_key] = records.slice(0, 120);
        });
        saveAccuracyHistoryStore(accuracyStore);

        const questionStatsStore = {};
        (questionStatRows || []).forEach(row => {
            if (!row.quiz_storage_key || !row.question_id) return;
            const quizStats = questionStatsStore[row.quiz_storage_key] || {};
            quizStats[row.question_id] = {
                attempts: row.attempts || 0,
                correct: row.correct || 0,
                wrong: row.wrong || 0,
                lastAnsweredAt: row.last_answered_at ? Date.parse(row.last_answered_at) : null
            };
            questionStatsStore[row.quiz_storage_key] = quizStats;
        });
        saveQuestionStatsStore(questionStatsStore);

        const wrongHistoryStore = {};
        (wrongRows || []).forEach(row => {
            if (!row.quiz_storage_key) return;
            const records = wrongHistoryStore[row.quiz_storage_key] || [];
            records.push({
                completedAt: Date.parse(row.recorded_at),
                wrongIds: Array.isArray(row.wrong_ids) ? row.wrong_ids.map(id => String(id)) : []
            });
            wrongHistoryStore[row.quiz_storage_key] = records.slice(0, 5);
        });
        saveWrongHistoryStore(wrongHistoryStore);

        correctlyAnsweredQuestions = new Set((correctRows || []).map(row => String(row.question_id)).filter(Boolean));
        localStorage.setItem(QUIZ_CORRECT_STORAGE_KEY, JSON.stringify([...correctlyAnsweredQuestions]));
        renderStatsPanel();
        updateQuestionScopeHint();
    }

    function initializeBuiltinQuizBanks() {
        const metaData = JSON.parse(localStorage.getItem(QUIZ_METADATA_STORAGE_KEY) || '{}');
        const hasBuiltinBank = localStorage.getItem(BUILTIN_EDRP_STORAGE_KEY);
        if (!hasBuiltinBank) {
            localStorage.setItem(BUILTIN_EDRP_STORAGE_KEY, JSON.stringify(BUILTIN_EDRP_QUIZ_BANK));
        }
        if (!metaData[BUILTIN_EDRP_STORAGE_KEY]) {
            metaData[BUILTIN_EDRP_STORAGE_KEY] = Date.now();
            localStorage.setItem(QUIZ_METADATA_STORAGE_KEY, JSON.stringify(metaData));
        }
    }

    async function enterPqsUser(username) {
        const normalizedName = normalizePqsUsername(username);
        if (!normalizedName) return;

        currentPqsUser = normalizedName;
        localStorage.setItem(PQS_CURRENT_USER_STORAGE_KEY, currentPqsUser);
        updateUserMenuDisplay();

        const status = document.getElementById('accessStatus');
        if (status) status.textContent = '正在載入雲端資料...';

        const accessSection = document.getElementById('accessSection');
        const managementSection = document.getElementById('managementSection');
        if (accessSection) accessSection.style.display = 'none';
        if (managementSection) managementSection.style.display = 'block';
        document.body.classList.remove('access-active');
        setHomeBackgroundVisible(true);
        updateQuestionScopeHint();
        scheduleHeaderLayoutUpdate();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (!PQS_IS_OFFLINE && PQS_PAGE === 'access') {
            requestAnimationFrame(() => navigateToPage('home'));
        }

        requestAnimationFrame(function() {
            initializeBuiltinQuizBanks();
            updateHistoryDropdown();
            updateQuestionScopeHint();
            scheduleHeaderLayoutUpdate();
        });

        syncSupabase((async function() {
            await syncCurrentUserToSupabase();
            await syncQuizBankToSupabase(BUILTIN_EDRP_STORAGE_KEY, 'EDRP.csv', BUILTIN_EDRP_QUIZ_BANK, Date.now());
            await loadSupabaseUserDataToLocalStorage();
            if (status) status.textContent = '';
            scheduleHeaderLayoutUpdate();
        })());
    }

    function submitAccessUser(event) {
        if (event) event.preventDefault();
        const input = document.getElementById('accessUserInput');
        const status = document.getElementById('accessStatus');
        const username = normalizePqsUsername(input?.value);

        if (!username) {
            if (status) status.textContent = '請先輸入使用者名稱。';
            if (input) input.focus();
            return;
        }

        enterPqsUser(username);
    }

    window.onload = function() {
        if (PQS_IS_OFFLINE && !currentPqsUser) {
            currentPqsUser = 'offline';
            localStorage.setItem(PQS_CURRENT_USER_STORAGE_KEY, currentPqsUser);
        }

        if (!PQS_IS_OFFLINE && PQS_PAGE !== 'access' && !currentPqsUser) {
            navigateToPage('access');
            return;
        }

        loadThemeMode();
        updateHistoryDropdown();
        loadQuizSettings();
        loadWrongRetryPreference();
        bindSettingsControls();
        bindWrongRetryPreferenceControl();
        bindTooltipControls();
        bindThemeModeControl();
        updateTimerVisibility();
        initializeHomeMatrixBackground();
        bindDynamicChromeControls();
        setHomeBackgroundVisible(true);

        const accessSection = document.getElementById('accessSection');
        const managementSection = document.getElementById('managementSection');
        const statsSection = document.getElementById('statsSection');
        const quizSection = document.getElementById('quizSection');
        const userInput = document.getElementById('accessUserInput');
        if (managementSection) managementSection.style.display = PQS_PAGE === 'home' || PQS_IS_OFFLINE ? 'block' : 'none';
        if (statsSection) statsSection.style.display = PQS_PAGE === 'stats' ? 'block' : 'none';
        if (quizSection) quizSection.style.display = PQS_PAGE === 'quiz' ? 'flex' : 'none';
        if (userInput && currentPqsUser) userInput.value = currentPqsUser;
        updateUserMenuDisplay();
        if (PQS_PAGE === 'access' && currentPqsUser && !PQS_IS_OFFLINE) {
            navigateToPage('home');
            return;
        }

        if (currentPqsUser) {
            if (accessSection) accessSection.style.display = 'none';
            if (PQS_PAGE === 'home' || PQS_IS_OFFLINE) {
                enterPqsUser(currentPqsUser);
            } else {
                document.body.classList.remove('access-active');
                initializeBuiltinQuizBanks();
                updateHistoryDropdown();
                setActiveQuizStorageKey(getActiveQuizStorageKey());
                setHomeBackgroundVisible(PQS_PAGE !== 'quiz');
                if (PQS_PAGE === 'stats') renderStatsPanel();
                if (PQS_PAGE === 'quiz') customStartQuiz();
            }
        } else {
            if (accessSection) accessSection.style.display = 'grid';
            document.body.classList.add('access-active');
            if (userInput) userInput.focus();
        }
        window.addEventListener('resize', scheduleHeaderLayoutUpdate);
        document.addEventListener('click', function(event) {
            const shell = document.getElementById('userMenuShell');
            if (shell && !shell.contains(event.target)) {
                closeUserMenu();
            }
        });
    };

    function bindDynamicChromeControls() {
        const scrollPositions = new WeakMap();
        let lastMoveAt = Date.now();
        let touchStartY = 0;

        function getPrimaryScrollTop() {
            if (document.body.classList.contains('quiz-active')) {
                const quizScroller = document.querySelector('.exam-left-panel');
                if (quizScroller) return quizScroller.scrollTop || 0;
            }
            return window.scrollY || 0;
        }

        function setChromeVisible(isVisible) {
            if (document.body.classList.contains('mobile-panel-open')) {
                isVisible = true;
            }
            const shouldHide = !isVisible;
            if (document.body.classList.contains('chrome-hidden') === shouldHide) return;
            document.body.classList.toggle('chrome-hidden', shouldHide);
        }

        function handleScroll(target, currentTop) {
            if (document.body.classList.contains('mobile-panel-open')) {
                setChromeVisible(true);
                scrollPositions.set(target, Math.max(0, currentTop));
                return;
            }

            if (document.body.classList.contains('quiz-active')) {
                const lastScrollTop = scrollPositions.get(target) || 0;
                const delta = currentTop - lastScrollTop;
                if (currentTop <= 4 || delta < -4) {
                    setChromeVisible(true);
                } else if (delta > 4) {
                    setChromeVisible(false);
                }
                scrollPositions.set(target, Math.max(0, currentTop));
                return;
            }

            const lastScrollTop = scrollPositions.get(target) || 0;
            const delta = currentTop - lastScrollTop;
            if (Math.abs(delta) < 8) return;

            if (!document.body.classList.contains('home-active')) {
                if (currentTop <= 4) setChromeVisible(true);
                scrollPositions.set(target, Math.max(0, currentTop));
                return;
            }

            if (currentTop <= 40) {
                setChromeVisible(true);
            } else if (delta < 0) {
                setChromeVisible(true);
            } else {
                setChromeVisible(false);
            }

            scrollPositions.set(target, Math.max(0, currentTop));
        }

        function handleIntent(deltaY) {
            if (document.body.classList.contains('mobile-panel-open')) {
                setChromeVisible(true);
                return;
            }
            if (document.body.classList.contains('home-active')) return;
            if (document.body.classList.contains('quiz-active')) {
                if (getPrimaryScrollTop() <= 4 || deltaY < 0) {
                    setChromeVisible(true);
                } else if (deltaY > 0) {
                    setChromeVisible(false);
                }
                return;
            }
            if (Math.abs(deltaY) < 4) return;
            if (deltaY > 0) {
                setChromeVisible(false);
            } else {
                setChromeVisible(true);
            }
        }

        window.addEventListener('scroll', () => handleScroll(window, window.scrollY || 0), { passive: true });
        window.addEventListener('wheel', event => handleIntent(event.deltaY), { passive: true });
        window.addEventListener('touchstart', event => {
            touchStartY = event.touches && event.touches.length ? event.touches[0].clientY : 0;
        }, { passive: true });
        window.addEventListener('touchmove', event => {
            if (!event.touches || !event.touches.length) return;
            handleIntent(touchStartY - event.touches[0].clientY);
            touchStartY = event.touches[0].clientY;
        }, { passive: true });

        ['.exam-left-panel', '.stats-section'].forEach(selector => {
            const target = document.querySelector(selector);
            if (!target) return;
            target.addEventListener('scroll', () => handleScroll(target, target.scrollTop || 0), { passive: true });
        });

        document.addEventListener('mousemove', event => {
            const now = Date.now();
            if (now - lastMoveAt < 80) return;
            lastMoveAt = now;

            if (event.clientY <= 72 || event.clientY >= window.innerHeight - 72) {
                setChromeVisible(true);
            }
        });

        setChromeVisible(true);
    }

    function setHomeBackgroundVisible(isVisible) {
        const canvas = document.getElementById('homeMatrixCanvas');
        document.body.classList.toggle('home-active', isVisible);
        if (canvas) canvas.style.display = isVisible ? 'block' : 'none';
        document.body.classList.remove('chrome-hidden');
    }

    function initializeHomeMatrixBackground() {
        const canvas = document.getElementById('homeMatrixCanvas');
        if (!canvas || canvas.dataset.ready === 'true') return;

        canvas.dataset.ready = 'true';
        const ctx = canvas.getContext('2d');
        const glyphs = '01{}[]<>/\\#$CEHOSCPCTIAroot';
        let columns = [];
        let fontSize = 11.6;
        let columnStep = 7;
        let lastFrameTime = 0;
        let resizeTimer = null;
        let themeBlend = document.body.classList.contains('dark-mode') ? 1 : 0;

        function mix(start, end, amount) {
            return start + ((end - start) * amount);
        }

        function rgba(light, dark, amount) {
            const r = Math.round(mix(light[0], dark[0], amount));
            const g = Math.round(mix(light[1], dark[1], amount));
            const b = Math.round(mix(light[2], dark[2], amount));
            const a = mix(light[3], dark[3], amount).toFixed(3);
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            fontSize = window.innerWidth < 760 ? 9.6 : 11.6;
            columnStep = Math.max(5.8, fontSize * 0.62);
            const count = Math.ceil(canvas.width / columnStep);
            columns = Array.from({ length: count }, () => Math.random() * canvas.height / fontSize);
        }

        function draw(timestamp = 0) {
            if (canvas.style.display === 'none' || document.hidden) {
                requestAnimationFrame(draw);
                return;
            }

            const targetThemeBlend = document.body.classList.contains('dark-mode') ? 1 : 0;
            const isThemeBlending = Math.abs(themeBlend - targetThemeBlend) > 0.01;
            const frameInterval = isThemeBlending ? 16 : (window.innerWidth < 760 ? 58 : 42);
            if (timestamp - lastFrameTime < frameInterval) {
                requestAnimationFrame(draw);
                return;
            }
            lastFrameTime = timestamp;
            themeBlend = isThemeBlending
                ? mix(themeBlend, targetThemeBlend, 0.16)
                : targetThemeBlend;

            ctx.fillStyle = rgba([238, 242, 247, 0.18], [1, 5, 11, 0.2], themeBlend);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px Consolas, Monaco, monospace`;
            ctx.shadowBlur = mix(0.35, 0.7, themeBlend);
            ctx.shadowColor = rgba([22, 163, 74, 0.05], [34, 197, 94, 0.08], themeBlend);

            columns.forEach((y, index) => {
                const x = index * columnStep;
                const trailLength = window.innerWidth < 760 ? 3 : 4;
                const isLit = Math.random() > 0.46;
                if (!isLit) {
                    columns[index] = y + (window.innerWidth < 760 ? 0.78 : 0.9);
                    return;
                }

                for (let trail = 0; trail < trailLength; trail++) {
                    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
                    const alpha = Math.max(0.04, 0.36 - trail * 0.09);
                    const yPos = (y - trail) * fontSize;

                    ctx.fillStyle = trail === 0
                        ? rgba([4, 120, 87, 0.56], [132, 214, 160, 0.43], themeBlend)
                        : rgba([16, 120, 86, alpha * 0.78], [58, 136, 90, alpha * 0.5], themeBlend);

                    ctx.fillText(char, x, yPos);
                }

                if (y * fontSize > canvas.height + (trailLength * fontSize)) {
                    columns[index] = Math.random() > 0.975 ? 0 : -Math.random() * 80;
                } else {
                    columns[index] = y + (window.innerWidth < 760 ? 0.78 : 0.9);
                }
            });

            requestAnimationFrame(draw);
        }

        resize();
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 120);
        });
        draw();
    }

    let themeTransitionTimer = null;

    function startThemeTransitionOverlay() {
        const overlay = document.getElementById('themeTransitionOverlay');
        if (!overlay) return;

        clearTimeout(themeTransitionTimer);
        overlay.className = 'theme-transition-overlay is-visible';
        overlay.classList.toggle('from-dark', document.body.classList.contains('dark-mode'));

        // 強制瀏覽器先套用不透明遮罩，再開始淡出，避免直接跳到透明狀態。
        overlay.getBoundingClientRect();
        requestAnimationFrame(function() {
            overlay.classList.add('is-fading');
        });

        themeTransitionTimer = setTimeout(function() {
            overlay.className = 'theme-transition-overlay';
        }, 460);
    }

    // 明暗模式會獨立保存，不跟測驗 checkbox 混在一起。
    function applyThemeMode(mode, options = {}) {
        if (options.animate) {
            startThemeTransitionOverlay();
        }

        const isDark = mode === 'dark';
        document.body.classList.toggle('dark-mode', isDark);

        const themeToggle = document.getElementById('themeModeCheckbox');
        if (themeToggle) {
            themeToggle.checked = isDark;
        }
    }

    function loadThemeMode() {
        applyThemeMode(localStorage.getItem(QUIZ_THEME_STORAGE_KEY) || 'light');
    }

    function bindThemeModeControl() {
        const themeToggle = document.getElementById('themeModeCheckbox');
        if (!themeToggle) return;

        themeToggle.addEventListener('change', function() {
            const mode = themeToggle.checked ? 'dark' : 'light';
            localStorage.setItem(QUIZ_THEME_STORAGE_KEY, mode);
            applyThemeMode(mode, { animate: true });
        });
    }

    // 集中讀取所有測驗設定，後續新增模式時優先擴充這個物件。
    function getQuizSettings() {
        const saved = JSON.parse(localStorage.getItem(QUIZ_SETTINGS_STORAGE_KEY) || '{}');
        const checkboxValue = (id, key) => {
            const checkbox = document.getElementById(id);
            return checkbox ? checkbox.checked : saved[key] === true;
        };
        const selectValue = (id, key, fallback) => {
            const select = document.getElementById(id);
            return select ? select.value : (typeof saved[key] === 'string' ? saved[key] : fallback);
        };
        const numberValue = (id, key) => {
            const input = document.getElementById(id);
            const value = input ? input.value : saved[key];
            return parseInt(value, 10) || 0;
        };

        return {
            shuffleQuestions: checkboxValue('shuffleCheckbox', 'shuffleQuestions'),
            hideCorrect: checkboxValue('hideCorrectCheckbox', 'hideCorrect'),
            wrongMode: checkboxValue('wrongModeCheckbox', 'wrongMode'),
            shuffleOptions: checkboxValue('shuffleOptionsCheckbox', 'shuffleOptions'),
            answerHint: checkboxValue('answerHintCheckbox', 'answerHint'),
            hideTimer: checkboxValue('showTimerCheckbox', 'hideTimer'),
            questionScopeMode: selectValue('questionScopeMode', 'questionScopeMode', 'all'),
            randomQuestionCount: numberValue('randomQuestionCount', 'randomQuestionCount'),
            rangeStartQuestion: numberValue('rangeStartQuestion', 'rangeStartQuestion'),
            rangeEndQuestion: numberValue('rangeEndQuestion', 'rangeEndQuestion')
        };
    }

    // 頁面載入時還原上次勾選狀態，避免使用者每次重開都要重新設定。
    function loadQuizSettings() {
        const saved = JSON.parse(localStorage.getItem(QUIZ_SETTINGS_STORAGE_KEY) || '{}');
        const checkboxMap = {
            shuffleQuestions: 'shuffleCheckbox',
            hideCorrect: 'hideCorrectCheckbox',
            wrongMode: 'wrongModeCheckbox',
            shuffleOptions: 'shuffleOptionsCheckbox',
            answerHint: 'answerHintCheckbox',
            hideTimer: 'showTimerCheckbox'
        };

        Object.entries(checkboxMap).forEach(([settingKey, checkboxId]) => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox && typeof saved[settingKey] === 'boolean') {
                checkbox.checked = saved[settingKey];
            }
        });

        const scopeMode = document.getElementById('questionScopeMode');
        if (scopeMode && typeof saved.questionScopeMode === 'string') {
            scopeMode.value = saved.questionScopeMode;
        }

        [
            ['randomQuestionCount', saved.randomQuestionCount],
            ['rangeStartQuestion', saved.rangeStartQuestion],
            ['rangeEndQuestion', saved.rangeEndQuestion]
        ].forEach(([id, value]) => {
            const input = document.getElementById(id);
            if (input && Number.isFinite(Number(value)) && Number(value) > 0) {
                input.value = Number(value);
            }
        });
    }

    // 任一 checkbox 變更時立即保存，不必等到開始測驗才生效。
    function saveQuizSettings() {
        localStorage.setItem(QUIZ_SETTINGS_STORAGE_KEY, JSON.stringify(getQuizSettings()));
    }

    function loadWrongRetryPreference() {
        const checkbox = document.getElementById('wrongRetryPreferenceCheckbox');
        if (!checkbox) return;

        checkbox.checked = localStorage.getItem(QUIZ_WRONG_RETRY_PREFERENCE_STORAGE_KEY) === 'true';
    }

    function saveWrongRetryPreference() {
        const checkbox = document.getElementById('wrongRetryPreferenceCheckbox');
        if (!checkbox) return;

        localStorage.setItem(QUIZ_WRONG_RETRY_PREFERENCE_STORAGE_KEY, checkbox.checked ? 'true' : 'false');
    }

    function bindWrongRetryPreferenceControl() {
        const checkbox = document.getElementById('wrongRetryPreferenceCheckbox');
        if (!checkbox) return;

        checkbox.addEventListener('change', saveWrongRetryPreference);
    }

    function bindSettingsControls() {
        ['shuffleCheckbox', 'hideCorrectCheckbox', 'wrongModeCheckbox', 'shuffleOptionsCheckbox', 'answerHintCheckbox', 'showTimerCheckbox'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (!checkbox) return;

            checkbox.addEventListener('change', function() {
                saveQuizSettings();
                if (id === 'showTimerCheckbox') {
                    updateTimerVisibility();
                }
            });
        });

        ['questionScopeMode', 'randomQuestionCount', 'rangeStartQuestion', 'rangeEndQuestion'].forEach(id => {
            const control = document.getElementById(id);
            if (!control) return;

            const eventName = control.tagName === 'SELECT' ? 'change' : 'input';
            control.addEventListener(eventName, function() {
                saveQuizSettings();
                updateQuestionScopeControls();
            });
        });

        const historySelect = document.getElementById('historySelect');
        if (historySelect) {
            historySelect.addEventListener('change', updateQuestionScopeHint);
            historySelect.addEventListener('change', scheduleHistorySelectAlignment);
            historySelect.addEventListener('change', function() {
                setActiveQuizStorageKey(historySelect.value);
                const statsSection = document.getElementById('statsSection');
                if (statsSection && statsSection.style.display !== 'none') {
                    renderStatsPanel();
                }
            });
        }

        updateQuestionScopeControls();
        updateQuestionScopeHint();
    }

    function bindTooltipControls() {
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            let longPressTimer = null;

            const hideTooltip = function() {
                clearTimeout(longPressTimer);
                longPressTimer = null;
                el.classList.remove('tooltip-active');
            };

            el.addEventListener('touchstart', function() {
                clearTimeout(longPressTimer);
                longPressTimer = setTimeout(function() {
                    document.querySelectorAll('.tooltip-active').forEach(activeEl => {
                        if (activeEl !== el) activeEl.classList.remove('tooltip-active');
                    });
                    el.classList.add('tooltip-active');
                }, 550);
            }, { passive: true });

            el.addEventListener('touchend', hideTooltip, { passive: true });
            el.addEventListener('touchcancel', hideTooltip, { passive: true });
            el.addEventListener('touchmove', hideTooltip, { passive: true });
        });
    }

    function getAccuracyHistoryStore() {
        return JSON.parse(localStorage.getItem(QUIZ_ACCURACY_HISTORY_STORAGE_KEY) || '{}');
    }

    function saveAccuracyHistoryStore(store) {
        localStorage.setItem(QUIZ_ACCURACY_HISTORY_STORAGE_KEY, JSON.stringify(store));
    }

    function getQuestionStatsStore() {
        return JSON.parse(localStorage.getItem(QUIZ_QUESTION_STATS_STORAGE_KEY) || '{}');
    }

    function saveQuestionStatsStore(store) {
        localStorage.setItem(QUIZ_QUESTION_STATS_STORAGE_KEY, JSON.stringify(store));
    }

    // 只有正式測驗才寫入學習統計；答案提示與未來複習模式都不記錄。
    function shouldRecordLearningStats() {
        const settings = getQuizSettings();
        return !settings.answerHint && currentSessionMode !== 'review';
    }

    function getQuizDisplayName(quizStorageKey) {
        return quizStorageKey ? quizStorageKey.replace('quiz_sys_', '') : '未選擇題庫';
    }

    function formatStatsDate(timestamp) {
        if (!timestamp) return '尚無紀錄';
        return new Date(timestamp).toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function getQuestionStats(item) {
        const store = getQuestionStatsStore();
        return store[currentQuizStorageKey]?.[getQuestionId(item)] || null;
    }

    function getQuestionStatsText(item) {
        const stats = getQuestionStats(item);
        if (!stats || !stats.attempts) return '作答 0 次｜答對率 --｜最後作答：尚無紀錄';

        const accuracy = Math.round((stats.correct / stats.attempts) * 100);
        return `作答 ${stats.attempts} 次｜答對率 ${accuracy}%｜最後作答：${formatStatsDate(stats.lastAnsweredAt)}`;
    }

    function refreshCurrentQuestionStatsBadges() {
        quizBank.forEach((item, index) => {
            const badge = document.getElementById(`question_stat_${index}`);
            if (badge) badge.textContent = getQuestionStatsText(item);
        });
    }

    function showCurrentQuestionStatsBadges() {
        quizBank.forEach((item, index) => {
            const badge = document.getElementById(`question_stat_${index}`);
            if (!badge) return;

            badge.textContent = getQuestionStatsText(item);
            badge.classList.add('is-visible');
        });
    }

    function recordLearningStats(answerResults, correctCount, accuracyRate) {
        if (!shouldRecordLearningStats() || !currentQuizStorageKey) return false;

        const completedAt = Date.now();
        const historyStore = getAccuracyHistoryStore();
        const historyRecords = historyStore[currentQuizStorageKey] || [];
        const historyRecord = {
            completedAt,
            correctCount,
            totalCount: answerResults.length,
            accuracyRate,
            durationSeconds: totalSeconds,
            mode: currentSessionMode
        };
        historyRecords.unshift(historyRecord);
        historyStore[currentQuizStorageKey] = historyRecords.slice(0, 120);
        saveAccuracyHistoryStore(historyStore);

        const questionStatsStore = getQuestionStatsStore();
        const quizStats = questionStatsStore[currentQuizStorageKey] || {};
        answerResults.forEach(result => {
            if (!result.hasUserAnswer) return;

            const questionId = getQuestionId(result.item);
            const stats = quizStats[questionId] || {
                attempts: 0,
                correct: 0,
                wrong: 0,
                lastAnsweredAt: null
            };

            stats.attempts++;
            if (result.isCorrect) {
                stats.correct++;
            } else {
                stats.wrong++;
            }
            stats.lastAnsweredAt = completedAt;
            quizStats[questionId] = stats;
        });
        questionStatsStore[currentQuizStorageKey] = quizStats;
        saveQuestionStatsStore(questionStatsStore);
        syncSupabase(syncLearningStatsToSupabase(currentQuizStorageKey, historyRecord, quizStats, completedAt));

        return true;
    }

    function buildAccuracyChart(records) {
        const recent = records.slice(0, 12).reverse();
        if (recent.length === 0) {
            return '<div class="stats-empty">目前沒有正式測驗紀錄。開啟答案提示時不會寫入統計。</div>';
        }

        const width = 520;
        const height = 170;
        const pad = 28;
        const usableWidth = width - pad * 2;
        const usableHeight = height - pad * 2;
        const points = recent.map((record, index) => {
            const x = recent.length === 1 ? width / 2 : pad + (usableWidth * index / (recent.length - 1));
            const y = pad + usableHeight - (usableHeight * record.accuracyRate / 100);
            return { x, y, record };
        });
        const polyline = points.map(point => `${point.x},${point.y}`).join(' ');
        const circles = points.map(point => `<circle cx="${point.x}" cy="${point.y}" r="4"><title>${formatStatsDate(point.record.completedAt)}｜${point.record.accuracyRate}%</title></circle>`).join('');

        return `
            <div class="stats-chart">
                <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="正確率歷史折線圖">
                    <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#cbd5e1" />
                    <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#cbd5e1" />
                    <text x="4" y="${pad + 4}" font-size="11" fill="#64748b">100%</text>
                    <text x="10" y="${height - pad + 4}" font-size="11" fill="#64748b">0%</text>
                    <polyline fill="none" stroke="#16a085" stroke-width="3" points="${polyline}" />
                    <g fill="#16a085">${circles}</g>
                </svg>
            </div>
        `;
    }

    function renderStatsPanel() {
        const panel = document.getElementById('statsPanel');
        const content = document.getElementById('statsPanelContent');
        if (!panel || !content) return;

        const quizStorageKey = getActiveQuizStorageKey();
        if (!quizStorageKey) {
            content.innerHTML = '';
            return;
        }

        const historyRecords = getAccuracyHistoryStore()[quizStorageKey] || [];
        const latest = historyRecords[0] || null;
        const average = historyRecords.length
            ? Math.round(historyRecords.reduce((sum, record) => sum + record.accuracyRate, 0) / historyRecords.length)
            : 0;

        const historyRows = historyRecords.slice(0, 8).map(record => `
            <div class="stats-history-row">
                <span>${formatStatsDate(record.completedAt)}</span>
                <strong>${record.correctCount} / ${record.totalCount} 題</strong>
                <strong>${record.accuracyRate}%</strong>
            </div>
        `).join('');

        content.innerHTML = `
            <div class="stats-summary-grid">
                <div class="stats-mini-card">題庫<strong>${getQuizDisplayName(quizStorageKey)}</strong></div>
                <div class="stats-mini-card">正式測驗次數<strong>${historyRecords.length}</strong></div>
                <div class="stats-mini-card">平均正確率<strong>${historyRecords.length ? average + '%' : '--'}</strong></div>
            </div>
            ${buildAccuracyChart(historyRecords)}
            <div class="stats-history-list">
                ${latest ? `
                    <div class="stats-history-header">
                        <span>完成時間</span>
                        <span>答對題數</span>
                        <span>正確率</span>
                    </div>
                    ${historyRows}
                ` : '<div class="stats-empty">尚無正式測驗紀錄。答案提示啟用時，系統不會寫入正確率歷史與每題統計。</div>'}
            </div>
        `;
    }

    function resetSelectedQuizStats() {
        const quizStorageKey = getActiveQuizStorageKey();
        if (!quizStorageKey) {
            alert('請先選擇一個題庫。');
            return;
        }

        const displayName = getQuizDisplayName(quizStorageKey);
        const firstCheck = confirm(`確定要重置「${displayName}」的學習統計嗎？\n\n這會清除正確率歷史、每題作答統計與錯題紀錄。`);
        if (!firstCheck) return;

        const secondCheck = confirm('最後確認：重置後該題庫的學習統計無法復原。');
        if (!secondCheck) return;

        const accuracyHistoryStore = getAccuracyHistoryStore();
        delete accuracyHistoryStore[quizStorageKey];
        saveAccuracyHistoryStore(accuracyHistoryStore);

        const questionStatsStore = getQuestionStatsStore();
        delete questionStatsStore[quizStorageKey];
        saveQuestionStatsStore(questionStatsStore);

        const wrongHistoryStore = getWrongHistoryStore();
        delete wrongHistoryStore[quizStorageKey];
        saveWrongHistoryStore(wrongHistoryStore);

        syncSupabase(deleteQuizStatsFromSupabase(quizStorageKey));
        refreshCurrentQuestionStatsBadges();
        renderStatsPanel();
        alert('該題庫的學習統計已重置。');
    }

    function toggleStatsPanel(forceShow) {
        const statsSection = document.getElementById('statsSection');
        const managementSection = document.getElementById('managementSection');
        const quizSection = document.getElementById('quizSection');
        const shouldShow = typeof forceShow === 'boolean' ? forceShow : !statsSection || statsSection.style.display === 'none';

        if (shouldShow) {
            const quizStorageKey = getActiveQuizStorageKey();
            if (!quizStorageKey) {
                alert('請先選擇一個題庫，才能查看學習統計。');
                return;
            }
            setActiveQuizStorageKey(quizStorageKey);

            const historyRecords = getAccuracyHistoryStore()[quizStorageKey] || [];
            if (historyRecords.length === 0) {
                alert('這個題庫目前尚無考試紀錄，將顯示空白統計頁。');
            }

            if (!statsSection) {
                navigateToPage('stats');
                return;
            }

            renderStatsPanel();
            document.body.classList.remove('quiz-active');
            closeMobileExamPanel();
            setHomeBackgroundVisible(true);
            if (managementSection) managementSection.style.display = 'none';
            if (quizSection) quizSection.style.display = 'none';
            statsSection.style.display = 'block';
            statsSection.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        statsSection.style.display = 'none';
    }

    function showHomeSection() {
        const statsSection = document.getElementById('statsSection');
        const managementSection = document.getElementById('managementSection');
        const quizSection = document.getElementById('quizSection');

        if (!PQS_IS_OFFLINE && !managementSection) {
            navigateToPage('home');
            return;
        }

        resetExamTimer();

        isExamInProgress = false;
        document.body.classList.remove('quiz-active');
        closeMobileExamPanel();
        if (statsSection) statsSection.style.display = 'none';
        if (quizSection) quizSection.style.display = 'none';
        if (managementSection) {
            managementSection.style.display = 'block';
        }
        setHomeBackgroundVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateTimerVisibility();
        scheduleHeaderLayoutUpdate();
    }

    function returnHomeFromHeader() {
        if (isExamInProgress) {
            const shouldLeave = confirm(
                "⚠️ 考試尚未完成\n\n" +
                "返回首頁會放棄本次作答進度，且本次測驗不會計入學習統計。\n\n" +
                "確定要返回首頁並放棄本次考試嗎？"
            );
            if (!shouldLeave) return;
        }

        showHomeSection();
    }

    function returnHomeFromStats() {
        showHomeSection();
    }

    // 隱藏計時器時保留 DOM 佔位，避免頂部 header 高度或左右排版跳動。
    function updateTimerVisibility() {
        const timer = document.getElementById('examTimer');
        if (!timer) return;
        const shouldHide = getQuizSettings().hideTimer;
        timer.style.visibility = shouldHide ? 'hidden' : 'visible';
        timer.style.opacity = shouldHide ? '0' : '1';
    }

    function getSelectedQuizTotal() {
        const select = document.getElementById('historySelect');
        if (!select || !select.value) return 0;

        try {
            const data = JSON.parse(localStorage.getItem(select.value) || '[]');
            return Array.isArray(data) ? data.length : 0;
        } catch (e) {
            return 0;
        }
    }

    function updateQuestionScopeHint() {
        const total = getSelectedQuizTotal();
        const hint = document.getElementById('questionTotalHint');
        if (hint) {
            hint.textContent = total > 0
                ? `目前選擇的題庫共有 ${total} 題。指定範圍請輸入 1 到 ${total} 之間的題號。`
                : '目前尚未選擇題庫。';
        }

        ['randomQuestionCount', 'rangeStartQuestion', 'rangeEndQuestion'].forEach(id => {
            const input = document.getElementById(id);
            if (input && total > 0) input.max = String(total);
        });
    }

    function updateQuestionScopeControls() {
        const mode = document.getElementById('questionScopeMode')?.value || 'all';
        const randomInput = document.getElementById('randomQuestionCount');
        const startInput = document.getElementById('rangeStartQuestion');
        const endInput = document.getElementById('rangeEndQuestion');
        const randomField = document.getElementById('randomQuestionCountField');
        const rangeField = document.getElementById('rangeQuestionField');

        if (randomField) randomField.style.display = mode === 'random' ? 'flex' : 'none';
        if (rangeField) rangeField.style.display = mode === 'range' ? 'flex' : 'none';
        if (randomInput) randomInput.disabled = mode !== 'random';
        if (startInput) startInput.disabled = mode !== 'range';
        if (endInput) endInput.disabled = mode !== 'range';
        updateQuestionScopeHint();
    }

    function shuffleArray(list) {
        const result = [...list];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function hashString(text) {
        let hash = 2166136261;
        for (let i = 0; i < text.length; i++) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (hash >>> 0).toString(36);
    }

    function getQuestionId(item) {
        if (item.id) return String(item.id);
        return hashString(`${item.q || ''}|${JSON.stringify(item.opts || [])}|${JSON.stringify(item.ans || '')}`);
    }

    function normalizeQuestion(item, sourceIndex) {
        return { ...item, id: getQuestionId(item), sourceIndex };
    }

    // 載入或上傳題庫後統一進入這裡，為每題補穩定 id，方便統計與模式篩選。
    function setSourceQuizBank(list) {
        sourceQuizBank = (Array.isArray(list) ? list : []).map((item, index) => normalizeQuestion(item, index));
        quizBank = [...sourceQuizBank];
    }

    function getWrongHistoryStore() {
        return JSON.parse(localStorage.getItem(QUIZ_WRONG_HISTORY_STORAGE_KEY) || '{}');
    }

    function saveWrongHistoryStore(store) {
        localStorage.setItem(QUIZ_WRONG_HISTORY_STORAGE_KEY, JSON.stringify(store));
    }

    // 錯題模式取該題庫最近五次完成測驗，只要曾經錯過一次就納入本次題目池。
    function getRecentWrongQuestionIds(quizStorageKey) {
        const store = getWrongHistoryStore();
        const recentRecords = (store[quizStorageKey] || []).slice(0, 5);
        const wrongIds = new Set();

        recentRecords.forEach(record => {
            (record.wrongIds || []).forEach(id => wrongIds.add(String(id)));
        });

        return wrongIds;
    }

    // 完成測驗後寫入本次錯題，最多保留每個題庫最近五次完整提交紀錄。
    function recordWrongQuestionHistory(quizStorageKey, wrongIds) {
        if (!quizStorageKey) return;

        const store = getWrongHistoryStore();
        const records = store[quizStorageKey] || [];
        const completedAt = Date.now();
        records.unshift({
            completedAt,
            wrongIds: [...new Set(wrongIds.map(id => String(id)))]
        });
        store[quizStorageKey] = records.slice(0, 5);
        saveWrongHistoryStore(store);
        syncSupabase(syncWrongHistoryToSupabase(quizStorageKey, wrongIds, completedAt));
    }

    function resetSessionMistakeTracking() {
        currentSessionFirstAttempts = new Set();
        currentSessionFirstWrongIds = new Set();
        lastWrongRetryQuestions = [];

        updateSummaryWrongRetryControls();
    }

    // 只記錄選擇題的第一次點選；第一次選錯就納入本次「錯題再次測驗」。
    function recordFirstChoiceAttempt(item, selectedValue) {
        const questionId = getQuestionId(item);
        if (currentSessionFirstAttempts.has(questionId)) return;

        currentSessionFirstAttempts.add(questionId);
        if (String(selectedValue).trim() !== String(item.ans).trim()) {
            currentSessionFirstWrongIds.add(questionId);
        }
    }

    function restoreSubmitButton() {
        const footerRightDiv = document.querySelector('.exam-footer > div:last-child');
        if (footerRightDiv) {
            footerRightDiv.innerHTML = `
                <button type="button" class="submit-btn" id="submitBtn" onclick="checkAnswers()">
                    完成作答 (Submit Exam)
                </button>
            `;
        }
    }

    function resetSummaryBox() {
        isSummaryVisible = false;
        if (nextQuestionScrollTimer) {
            clearTimeout(nextQuestionScrollTimer);
            nextQuestionScrollTimer = null;
        }
        const summaryBox = document.getElementById('summaryBox');
        const statsText = document.getElementById('statsText');
        if (summaryBox) summaryBox.style.display = 'none';
        if (statsText) statsText.innerHTML = '';
        document.body.classList.remove('chrome-hidden');
    }

    function scrollExamPanelToTop() {
        const leftPanel = document.querySelector('.exam-left-panel');
        const scrollTop = () => {
            leftPanel.scrollTop = 0;
            leftPanel.scrollTo({ top: 0, behavior: 'auto' });
        };
        if (leftPanel) {
            scrollTop();
            requestAnimationFrame(scrollTop);
            setTimeout(scrollTop, 0);
            setTimeout(scrollTop, 80);
            setTimeout(scrollTop, 240);
            return;
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    function setMobileExamPanelOpen(isOpen) {
        const panel = document.getElementById('examRightPanel');
        const toggle = document.getElementById('mobileExamPanelToggle');
        const headerToggle = document.getElementById('mobileHeaderPanelToggle');
        if (!panel) return;

        panel.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('mobile-panel-open', isOpen);
        if (isOpen) {
            document.body.classList.remove('chrome-hidden');
        }
        [toggle, headerToggle].forEach(function(button) {
            if (!button) return;
            button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    function toggleMobileExamPanel() {
        const panel = document.getElementById('examRightPanel');
        if (!panel) return;
        setMobileExamPanelOpen(!panel.classList.contains('is-open'));
    }

    function closeMobileExamPanel() {
        setMobileExamPanelOpen(false);
    }

    function applyQuestionScope(pool, settings) {
        const total = sourceQuizBank.length;

        if (settings.questionScopeMode === 'random') {
            if (!settings.randomQuestionCount || settings.randomQuestionCount < 1) return [];
            const count = Math.min(settings.randomQuestionCount, pool.length);
            return shuffleArray(pool).slice(0, count);
        }

        if (settings.questionScopeMode === 'range') {
            if (!settings.rangeStartQuestion || !settings.rangeEndQuestion) return [];

            const start = Math.max(1, Math.min(settings.rangeStartQuestion, total));
            const end = Math.max(1, Math.min(settings.rangeEndQuestion, total));
            const startIndex = Math.min(start, end) - 1;
            const endIndex = Math.max(start, end) - 1;

            return pool.filter(item => item.sourceIndex >= startIndex && item.sourceIndex <= endIndex);
        }

        return pool;
    }

    // 依目前設定建立「本次測驗清單」；未來標記模式也應接在這裡。
    function buildQuizSession() {
        const settings = getQuizSettings();
        let pool = [...sourceQuizBank];

        if (settings.wrongMode) {
            const wrongIds = getRecentWrongQuestionIds(currentQuizStorageKey);
            pool = pool.filter(item => wrongIds.has(getQuestionId(item)));
        }

        if (settings.hideCorrect) {
            pool = pool.filter(item => !correctlyAnsweredQuestions.has(getQuestionId(item)));
        }

        pool = applyQuestionScope(pool, settings);

        if (settings.shuffleQuestions) {
            pool = shuffleArray(pool);
        }

        return pool;
    }

    // 答對題目會被記住，供「隱藏已答對題目」在下次建立 session 時排除。
    function recordCorrectAnswer(item) {
        const questionId = getQuestionId(item);
        correctlyAnsweredQuestions.add(questionId);
        localStorage.setItem(QUIZ_CORRECT_STORAGE_KEY, JSON.stringify([...correctlyAnsweredQuestions]));
        syncSupabase(syncCorrectAnswerToSupabase(questionId));
    }

    // 每次重新開始測驗前先清除舊 interval，避免多個計時器同時累加。
    function resetExamTimer() {
        if (examTimerInterval) clearInterval(examTimerInterval);
        examTimerInterval = null;
        totalSeconds = 0;
        const timer = document.getElementById('examTimer');
        if (timer) timer.textContent = "作答時間 00:00:00";
        updateTimerVisibility();
    }

    function startExamTimer() {
        resetExamTimer();
        examTimerInterval = setInterval(function() {
            totalSeconds++;
            let hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            let mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            let secs = String(totalSeconds % 60).padStart(2, '0');
            const timer = document.getElementById('examTimer');
            if (timer) timer.textContent = `作答時間 ${hrs}:${mins}:${secs}`;
        }, 1000);
    }

    // 智慧過濾與修復文字格式的關鍵邏輯
    function cleanAndParsePythonFormat(rawText) {
        let processed = rawText.replace(/\u00a0/g, ' ').trim();
        processed = processed.replace(/#.*$/gm, '');

        if (!processed.startsWith('[')) {
            processed = processed.trim().replace(/,$/, '');
            processed = '[' + processed + ']';
        }

        try {
            return new Function(`return ${processed};`)();
        } catch (e) {
            return JSON.parse(processed);
        }
    }

    // 更新歷史紀錄下拉選單
    function scheduleHistorySelectAlignment() {
        requestAnimationFrame(function() {
            updateHistorySelectAlignment();
            requestAnimationFrame(updateHistorySelectAlignment);
        });
        setTimeout(updateHistorySelectAlignment, 120);
    }

    function updateHistorySelectAlignment() {
        const select = document.getElementById('historySelect');
        if (!select) return;

        const selectedText = select.options[select.selectedIndex]?.textContent || '';
        const probe = document.createElement('span');
        const styles = window.getComputedStyle(select);
        probe.textContent = selectedText;
        probe.style.position = 'fixed';
        probe.style.left = '-9999px';
        probe.style.top = '-9999px';
        probe.style.visibility = 'hidden';
        probe.style.whiteSpace = 'nowrap';
        probe.style.font = styles.font;
        document.body.appendChild(probe);

        const horizontalPadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight) + 34;
        const isOverflow = probe.offsetWidth > Math.max(0, select.clientWidth - horizontalPadding);
        probe.remove();

        select.classList.toggle('is-option-overflow', isOverflow);
    }

    function updateHistoryDropdown() {
        const select = document.getElementById('historySelect');
        if(!select) return;
        select.innerHTML = '<option value="">-- 請選擇題庫 --</option>';
        
        let metaData = JSON.parse(localStorage.getItem(QUIZ_METADATA_STORAGE_KEY) || '{}');
        let items = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('quiz_sys_') && !QUIZ_RESERVED_STORAGE_KEYS.has(key)) {
                const displayName = key.replace('quiz_sys_', '');
                const timestamp = metaData[key] || 0;
                items.push({ key, displayName, timestamp });
            }
        }

        items.sort((a, b) => b.timestamp - a.timestamp);

        items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.key;
            opt.textContent = item.displayName;
            select.appendChild(opt);
        });
        const savedKey = getActiveQuizStorageKey();
        if (savedKey && [...select.options].some(option => option.value === savedKey)) {
            select.value = savedKey;
            setActiveQuizStorageKey(savedKey);
        }
        scheduleHistorySelectAlignment();
    }

// 二階段安全刪除確認（對應 HTML 的 原safeDeleteHistory）
    function safeDeleteHistory() {
        const select = document.getElementById('historySelect');
        const selectedKey = select.value;
        
        // 第一防線：防呆檢查是否有選取題庫
        if(!selectedKey) {
            alert("請先從下拉選單中，選擇一個想要刪除的題庫紀錄！");
            return;
        }

        if (selectedKey === BUILTIN_EDRP_STORAGE_KEY) {
            alert("EDRP.csv 是內建題庫，會固定保留在歷史題庫中。");
            return;
        }
        
        // 🚨 第一階段警告彈窗：詢問是否確認刪除
        const firstCheck = confirm(`警告：您確定要永久刪除「${selectedKey.replace('quiz_sys_', '')}」嗎？\n此操作將無法復原！`);
        
        if (firstCheck) {
            // 🚨 第二階段警告彈窗：終極手殘攔截
            const secondCheck = confirm("最後確認：真的要刪除嗎？刪除後該題庫資料將從瀏覽器中徹底抹除。");
            
            if (secondCheck) {
                // 雙重通關，正式執行刪除與快取清理
                localStorage.removeItem(selectedKey);
                let metaData = JSON.parse(localStorage.getItem(QUIZ_METADATA_STORAGE_KEY) || '{}');
                delete metaData[selectedKey];
                localStorage.setItem(QUIZ_METADATA_STORAGE_KEY, JSON.stringify(metaData));

                const wrongHistoryStore = getWrongHistoryStore();
                delete wrongHistoryStore[selectedKey];
                saveWrongHistoryStore(wrongHistoryStore);

                const accuracyHistoryStore = getAccuracyHistoryStore();
                delete accuracyHistoryStore[selectedKey];
                saveAccuracyHistoryStore(accuracyHistoryStore);

                const questionStatsStore = getQuestionStatsStore();
                delete questionStatsStore[selectedKey];
                saveQuestionStatsStore(questionStatsStore);
                syncSupabase(deleteQuizBankFromSupabase(selectedKey));
                
                // 更新下拉選單介面
                updateHistoryDropdown();
                updateQuestionScopeHint();
                alert("紀錄已成功刪除。");
            }
        }
    }

    // 上傳時自動為選項補上 "1. ", "2. " 序號，完美阻斷引號內部的換行與逗號
    function parseCSV(text) {
        let result = [];
        let row = [];
        let col = "";
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let nextChar = text[i + 1];

            if (inQuotes) {
                if (char === '"') {
                    if (nextChar === '"') { 
                        col += '"';
                        i++;
                    } else { 
                        inQuotes = false;
                    }
                } else {
                    col += char; 
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',') {
                    row.push(col.trim());
                    col = "";
                } else if (char === '\r' || char === '\n') {
                    if (char === '\r' && nextChar === '\n') {
                        i++; 
                    }
                    if (col !== "" || row.length > 0) {
                        row.push(col.trim());
                        if (row.length >= 4) {
                            processRowData(row, result);
                        }
                        row = [];
                        col = "";
                    }
                } else {
                    col += char;
                }
            }
        }
        
        if (col !== "" || row.length > 0) {
            row.push(col.trim());
            if (row.length >= 4) {
                processRowData(row, result);
            }
        }
        
        return result;
    }

    // 輔助處理函式：在這裡進行「自動補序號」的動作
    function processRowData(row, resultList) {
        let type = row[0].trim();
        if (type.includes("題目類型") || type.includes("type")) return;

        let qText = row[2] ? row[2].trim() : '';
        let answer = row[3] ? row[3].trim() : '';

        if (type === 'A' || type === 'C') { 
            let options = [];
            let optCounter = 1; 
            
            for (let j = 4; j < row.length; j++) {
                if (row[j] !== undefined && row[j] !== "") {
                    let optText = row[j].trim();
                    
                    if (!/^\d+\./.test(optText)) {
                        optText = optCounter + ". " + optText;
                    }
                    
                    options.push(optText);
                    optCounter++;
                }
            }
            resultList.push({ q: qText, opts: options, ans: answer });
        } else if (type === 'B') { 
            resultList.push({ q: qText, ans: [answer] });
        }
    }

    // 強制指定 UTF-8 編碼讀取，消滅問號亂碼
    function handleFileUpload(input) {
        const files = input.files;
        if (!files || files.length === 0) return;
        
        const file = files[0];
        const fileName = file.name;
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const text = e.target.result;
                if(fileName.endsWith('.json')) {
                    setSourceQuizBank(cleanAndParsePythonFormat(text));
                } else if(fileName.endsWith('.csv') || fileName.endsWith('.txt')) {
                    if(text.trim().startsWith('[')) {
                        setSourceQuizBank(cleanAndParsePythonFormat(text));
                    } else {
                        setSourceQuizBank(parseCSV(text));
                    }
                }
                
                if(quizBank && quizBank.length > 0) {
                    const saveKey = 'quiz_sys_' + fileName;
                    const savedAt = Date.now();
                    localStorage.setItem(saveKey, JSON.stringify(quizBank));
                    
                    let metaData = JSON.parse(localStorage.getItem(QUIZ_METADATA_STORAGE_KEY) || '{}');
                    metaData[saveKey] = savedAt;
                    localStorage.setItem(QUIZ_METADATA_STORAGE_KEY, JSON.stringify(metaData));
                    syncSupabase(syncQuizBankToSupabase(saveKey, fileName, quizBank, savedAt));
                    
                    updateHistoryDropdown();
                    const select = document.getElementById('historySelect');
                    if (select) {
                        select.value = saveKey;
                        setActiveQuizStorageKey(saveKey);
                        scheduleHistorySelectAlignment();
                    }
                    updateQuestionScopeHint();
                    alert(`檔案「${fileName}」上傳並解析成功！共 ${quizBank.length} 題，請選取並開始測驗。`);
                } else {
                    alert("解析出來的題庫內容為空，請檢查格式。");
                }
            } catch(err) {
                alert("檔案解析失敗，錯誤原因：" + err.message);
            }
        };
        
        reader.readAsText(file, 'UTF-8'); 
    }

    // 加載已經儲存的題庫紀錄
    function loadSavedQuiz() {
        const select = document.getElementById('historySelect');
        const selectedKey = select.value;
        if(!selectedKey) {
            alert("請從下拉選單選擇一個歷史題庫！");
            return;
        }
        const data = localStorage.getItem(selectedKey);
        if(data) {
            setSourceQuizBank(JSON.parse(data));
            customStartQuiz();
        } else {
            alert("找不到該題庫快取資料。");
        }
    }
    
    // 開考流程與初始化控制面板
    // 入口責任：驗證題庫、建立 session、切換畫面、渲染題目與啟動計時器。
    function customStartQuiz() {
        const select = document.getElementById('historySelect');
        const selectedKey = select?.value || getActiveQuizStorageKey();
        if(!selectedKey) {
            alert("目前尚未選擇任何題庫，請先從下拉選單選擇題庫或上傳檔案。");
            return;
        }

        const data = localStorage.getItem(selectedKey);
        if(!data) {
            alert("找不到該題庫快取資料，請重新選擇或重新上傳題庫。");
            return;
        }

        setActiveQuizStorageKey(selectedKey);
        setSourceQuizBank(JSON.parse(data));
        if(!sourceQuizBank || sourceQuizBank.length === 0) {
            alert("目前選擇的題庫沒有可用題目，請檢查題庫內容。");
            return;
        }

        const quizSection = document.getElementById('quizSection');
        if (!quizSection) {
            navigateToPage('quiz');
            return;
        }

        quizBank = buildQuizSession();
        if (quizBank.length === 0) {
            const settings = getQuizSettings();
            const message = settings.wrongMode
                ? "錯題模式目前沒有可作答的題目。請先完成至少一次測驗並產生錯題，或先取消『錯題模式』。"
                : settings.questionScopeMode === 'random'
                    ? "隨機題數尚未正確設定，請輸入至少 1 題。"
                : settings.questionScopeMode === 'range'
                    ? "指定題號範圍目前沒有可作答的題目，請確認起始與結束題號，或檢查是否被其他模式篩掉。"
                : "目前設定下沒有可作答的題目。請取消『隱藏已答對題目』或更換題庫。";
            alert(message);
            return;
        }

        setHomeBackgroundVisible(false);
        const managementSection = document.getElementById('managementSection');
        if (managementSection) managementSection.style.display = 'none';
        quizSection.style.display = 'flex'; // 修正為 flex 佈局
        document.body.classList.add('quiz-active');
        const statsSection = document.getElementById('statsSection');
        if (statsSection) statsSection.style.display = 'none';
        markedQuestions = {};
        currentSessionMode = 'exam';
        isExamInProgress = true;
        document.title = '考試｜PQS';
        resetSummaryBox();
        resetSessionMistakeTracking();
        closeMobileExamPanel();

        renderQuizQuestions();
        buildNavigationGrid();
        startExamTimer();

	// 還原 [完成作答] 按鈕
        restoreSubmitButton();
    }

    function startWrongRetryQuiz() {
        if (!lastWrongRetryQuestions || lastWrongRetryQuestions.length === 0) {
            alert("本次測驗沒有可再次測驗的錯題。");
            return;
        }

        quizBank = [...lastWrongRetryQuestions];
        markedQuestions = {};
        currentSessionMode = 'wrongRetry';
        isExamInProgress = true;
        document.title = '考試｜PQS';
        resetSummaryBox();
        resetSessionMistakeTracking();
        closeMobileExamPanel();

        setHomeBackgroundVisible(false);
        const managementSection = document.getElementById('managementSection');
        if (managementSection) managementSection.style.display = 'none';
        const quizSection = document.getElementById('quizSection');
        if (quizSection) quizSection.style.display = 'flex';
        document.body.classList.add('quiz-active');
        const statsSection = document.getElementById('statsSection');
        if (statsSection) statsSection.style.display = 'none';

        renderQuizQuestions();
        buildNavigationGrid();
        startExamTimer();
        restoreSubmitButton();

        const leftPanel = document.querySelector('.exam-left-panel');
        if (leftPanel) leftPanel.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateSummaryWrongRetryControls() {
        const checkbox = document.getElementById('wrongRetryPreferenceCheckbox');
        const label = checkbox ? checkbox.closest('.wrong-retry-toggle') : null;
        if (!checkbox || !label) return;

        const hasWrongRetryQuestions = lastWrongRetryQuestions.length > 0;
        loadWrongRetryPreference();
        checkbox.disabled = !hasWrongRetryQuestions;
        label.classList.toggle('is-disabled', !hasWrongRetryQuestions);
        label.title = hasWrongRetryQuestions
            ? "勾選後，再次測驗只會考本次錯題"
            : "本次測驗沒有可再次測驗的錯題";
    }

    function startSummaryRetry() {
        const checkbox = document.getElementById('wrongRetryPreferenceCheckbox');
        if (checkbox && checkbox.checked && !checkbox.disabled) {
            startWrongRetryQuiz();
            return;
        }

        resetSummaryBox();
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) submitBtn.style.display = 'inline-block';
        customStartQuiz();
    }

    // 統一產生正確答案顯示文字，交卷後錯題提示使用同一套格式。
    function getDisplayAnswer(item) {
        let showAns = String(item.ans);
        let targetOptIndex = parseInt(item.ans) - 1;

        if (item.opts && item.opts[targetOptIndex]) {
            showAns = item.opts[targetOptIndex];
        } else if (Array.isArray(item.ans)) {
            showAns = item.ans[item.ans.length - 1];
        }

        return showAns;
    }

    // 答案提示模式：使用者點選任一選項後，正確選項亮綠兩秒再恢復。
    function showAnswerHint(index, correctAnswer) {
        if (!getQuizSettings().answerHint) return;

        const inputs = Array.from(document.getElementsByName(`q_${index}`));
        const correctInput = inputs.find(input => input.value === String(correctAnswer).trim());
        if (!correctInput) return;

        const correctLabel = correctInput.closest('.option-label');
        if (!correctLabel) return;

        if (answerHintTimers[index]) {
            clearTimeout(answerHintTimers[index]);
            correctLabel.classList.remove('answer-hint-highlight');
        }

        correctLabel.classList.add('answer-hint-highlight');
        answerHintTimers[index] = setTimeout(function() {
            correctLabel.classList.remove('answer-hint-highlight');
            delete answerHintTimers[index];
        }, 2000);
    }

    // 選完選擇題後延遲 0.5 秒自動前往下一題；最後一題沒有下一題時不動作。
    function scrollToNextQuestion(index) {
        const nextCard = document.getElementById(`question_card_${index + 1}`);
        if (!nextCard) return;

        if (nextQuestionScrollTimer) clearTimeout(nextQuestionScrollTimer);
        nextQuestionScrollTimer = setTimeout(function() {
            nextQuestionScrollTimer = null;
            if (!isExamInProgress || isSummaryVisible) return;
            nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    }

    // 動態渲染題目卡片 (優化：選項 Value 設為 1, 2, 3, 4 正確對應答案)
    function renderQuizQuestions() {
        const container = document.getElementById('quizContainer');
        container.innerHTML = '';

        quizBank.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `question_card_${index}`;

            const markBtn = document.createElement('button');
            markBtn.className = 'mark-btn';
            markBtn.textContent = '★ Mark 標記';
            markBtn.onclick = function() { toggleMark(index, markBtn); };
            card.appendChild(markBtn);


            // 智慧文字修復
            let fixedQuestionText = item.q;
            fixedQuestionText = fixedQuestionText.replace(/[\uFFFD]+/g, "'");
            if (fixedQuestionText.includes('?')) {
                fixedQuestionText = fixedQuestionText.replace(/\?\s*(?=[A-Z\u4e00-\u9fa5])/g, '• ');
            }

            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = `第 ${index + 1} 題：${fixedQuestionText}`;
            card.appendChild(title);

            const statBadge = document.createElement('div');
            statBadge.className = 'question-stat-badge';
            statBadge.id = `question_stat_${index}`;
            statBadge.textContent = getQuestionStatsText(item);
            card.appendChild(statBadge);

            if (item.opts && item.opts.length > 0) {
                const optsGroup = document.createElement('div');
                optsGroup.className = 'options-group';
                
                // 顯示順序可以打亂，但 value 永遠保留原始 index，答案判斷才不會被打亂影響。
                let optionsToRender = item.opts.map((opt, optIndex) => ({
                    text: opt,
                    originalIndex: optIndex
                }));

                if (getQuizSettings().shuffleOptions) {
                    optionsToRender = shuffleArray(optionsToRender);
                }

                optionsToRender.forEach(option => {
                    const label = document.createElement('label');
                    label.className = 'option-label';
                    
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `q_${index}`;
                    radio.value = String(option.originalIndex + 1);
                    radio.onchange = function() {
                        recordFirstChoiceAttempt(item, radio.value);
                        updateNavStatus(index, 'answered');
                        showAnswerHint(index, item.ans);

                        const answerHintEnabled = getQuizSettings().answerHint;
                        const isCorrectChoice = radio.value === String(item.ans).trim();
                        if (answerHintEnabled && !isCorrectChoice) return;

                        scrollToNextQuestion(index);
                    };
                    
		    // 將文字用 span 包裹，給翻譯軟體一個乾淨的對象，徹底解決亂換行問題
                    label.appendChild(radio);
                    
                    const optTextSpan = document.createElement('span');
                    optTextSpan.className = 'opt-text';
                    optTextSpan.textContent = ' ' + option.text;
                    label.appendChild(optTextSpan);
                    
                    optsGroup.appendChild(label);
                });
                card.appendChild(optsGroup);
            } else {
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';
                
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'blank-input';
                input.placeholder = '請在此處輸入答案...';
                input.name = `q_${index}`;
                input.autocomplete = 'off';
                input.autocapitalize = 'none';
                input.spellcheck = false;
                input.setAttribute('autocorrect', 'off');
                input.oninput = function() { 
                    if(input.value.trim() !== "") {
                        updateNavStatus(index, 'answered');
                    } else {
                        updateNavStatus(index, 'unanswered');
                    }
                };
                
                inputGroup.appendChild(input);
                card.appendChild(inputGroup);
            }

            const resText = document.createElement('div');
            resText.className = 'result-text';
            resText.id = `result_${index}`;
            card.appendChild(resText);

            container.appendChild(card);
        });
    }

    // 動態生成右側導航網格
    function buildNavigationGrid() {
        const grid = document.getElementById('examNavGrid');
        grid.innerHTML = '';
        quizBank.forEach((_, index) => {
            const btn = document.createElement('div');
            btn.className = 'nav-btn unanswered';
            btn.id = `nav_btn_${index}`;
            btn.textContent = index + 1;
            btn.onclick = function() {
                document.getElementById(`question_card_${index}`).scrollIntoView({ behavior: 'smooth' });
                closeMobileExamPanel();
            };
            grid.appendChild(btn);
        });
    }

    // 更新導航方格狀態
    function updateNavStatus(index, status) {
        const btn = document.getElementById(`nav_btn_${index}`);
        if (!btn) return;

        if (markedQuestions[index]) {
            btn.className = 'nav-btn marked';
        } else if (status === 'answered') {
            btn.className = 'nav-btn answered';
        } else {
            btn.className = 'nav-btn unanswered';
        }
    }

    // 切換 Mark 狀態
    function toggleMark(index, btnElement) {
        if (markedQuestions[index]) {
            delete markedQuestions[index];
            btnElement.classList.remove('active');
            const hasAns = checkQuestionHasAnswer(index);
            updateNavStatus(index, hasAns ? 'answered' : 'unanswered');
        } else {
            markedQuestions[index] = true;
            btnElement.classList.add('active');
            updateNavStatus(index, 'marked');
        }
    }

    // 檢查題目是否有填寫答案
    function checkQuestionHasAnswer(index) {
        const inputs = document.getElementsByName(`q_${index}`);
        if(inputs.length > 0) {
            const first = inputs[0]; 
            if(first.type === 'radio') {
                return Array.from(inputs).some(r => r.checked);
            } else {
                return first.value.trim() !== "";
            }
        }
        return false;
    }

    function getLastAnsweredQuestionIndex() {
        let lastAnsweredIndex = -1;
        quizBank.forEach((_, index) => {
            if (checkQuestionHasAnswer(index)) {
                lastAnsweredIndex = index;
            }
        });
        return lastAnsweredIndex;
    }

    // 本次錯題重測：第一次點錯的選擇題 + 最後已作答題之前被跳過的未答題。
    function buildWrongRetryQuestions() {
        const lastAnsweredIndex = getLastAnsweredQuestionIndex();

        return quizBank.filter((item, index) => {
            const questionId = getQuestionId(item);
            const isFirstChoiceWrong = currentSessionFirstWrongIds.has(questionId);
            const isSkippedBeforeLastAnswered = index < lastAnsweredIndex && !checkQuestionHasAnswer(index);

            return isFirstChoiceWrong || isSkippedBeforeLastAnswered;
        });
    }

// 核對全體答案 (完美保留原底色，僅追加紅綠外框)
    // 交卷入口：防呆確認、停止計時、鎖定作答、判分、記錄答對題目並渲染統計結果。
    function checkAnswers() {
	// 【防呆機制】
        // 1. 先統計有幾題尚未作答
        let unansweredCount = 0;
        quizBank.forEach((item, index) => {
            const inputs = document.getElementsByName(`q_${index}`);
            if (inputs.length > 0) {
                if (inputs[0].type === 'radio') {
                    // 選擇題：沒人被選中
                    const hasChecked = Array.from(inputs).some(r => r.checked);
                    if (!hasChecked) unansweredCount++;
                } else {
                    // 簡答題/填空題：內容為空
                    if (inputs[0].value.trim() === "") unansweredCount++;
                }
            }
        });

        // 2. 如果有沒寫的題目，跳出二次確認視窗
        if (unansweredCount > 0) {
            const isSure = confirm(`您還有 ${unansweredCount} 題未寫，確定要提交結算嗎？`);
            if (!isSure) {
                return; // 使用者按取消，直接中斷，不往下執行結算
            }
        } else {
            // 如果全都寫完了，也可以做個貼心的基本二次確認
            const isSure = confirm("確定要提交答案並結束作答嗎？");
            if (!isSure) return;
        }

	// 送出答案結算時，立刻停止計時器，鎖定作答時間
        if (examTimerInterval) clearInterval(examTimerInterval);
        examTimerInterval = null;
        isExamInProgress = false;
        if (nextQuestionScrollTimer) {
            clearTimeout(nextQuestionScrollTimer);
            nextQuestionScrollTimer = null;
        }

        let correctCount = 0;
        const wrongQuestionIds = [];
        const answerResults = [];
        
        quizBank.forEach((item, index) => {
            const card = document.getElementById(`question_card_${index}`);
            const resDiv = document.getElementById(`result_${index}`);
            const navBtn = document.getElementById(`nav_btn_${index}`); // 取得右側對應的題號按鈕
            let userAns = "";
            let isCorrect = false;
            let hasUserAnswer = false;

            const inputs = document.getElementsByName(`q_${index}`);
            if (inputs.length > 0) {
                const first = inputs[0]; 
                if (first.type === 'radio') {
                    const checked = Array.from(inputs).find(r => r.checked);
                    userAns = checked ? checked.value : "";
                    hasUserAnswer = !!checked;
                    isCorrect = (userAns === String(item.ans).trim());
                } else {
                    userAns = first.value.trim();
                    hasUserAnswer = userAns !== "";
                    if(Array.isArray(item.ans)) {
                        isCorrect = item.ans.map(a => String(a).trim()).includes(userAns);
                    } else {
                        isCorrect = (userAns === String(item.ans).trim());
                    }
                }
                
                // 鎖死作答區：結束答題後將選項全部禁用
                inputs.forEach(input => {
                    input.disabled = true;
                });
            }

            answerResults.push({ item, isCorrect, hasUserAnswer });

            resDiv.style.display = 'block';
            if (isCorrect) {
                correctCount++;
                recordCorrectAnswer(item);
                card.className = 'card correct';
                resDiv.innerHTML = `<span class="correct-ans">✓ 正確</span>`;
                
                // 保留原本的 class 底色，僅追加「綠框」
                if (navBtn) navBtn.classList.add('nav-correct');
	    } else {
                card.className = 'card wrong';
                wrongQuestionIds.push(getQuestionId(item));
                
                const showAns = getDisplayAnswer(item);
                resDiv.innerHTML = `<span class="wrong-ans">✗ 錯誤</span> (正確答案：${showAns})`;
                
                // 保留右側面板變紅框的優良傳統
                if (navBtn) navBtn.classList.add('nav-wrong');
            }
        });

        recordWrongQuestionHistory(currentQuizStorageKey, wrongQuestionIds);
        lastWrongRetryQuestions = buildWrongRetryQuestions();

	// 計算四捨五入後的正確率（不要小數點）
        const accuracyRate = quizBank.length > 0 ? Math.round((correctCount / quizBank.length) * 100) : 0;
        const didRecordLearningStats = recordLearningStats(answerResults, correctCount, accuracyRate);
        showCurrentQuestionStatsBadges();

        const summaryBox = document.getElementById('summaryBox');
        const statsText = document.getElementById('statsText');
        const settings = getQuizSettings();
        const statsNotice = didRecordLearningStats
            ? '已寫入學習統計'
            : settings.answerHint
                ? '答案提示已啟用，本次未寫入學習統計'
                : currentSessionMode === 'review'
                    ? '複習模式不寫入學習統計'
                    : '本次未寫入學習統計';
        statsText.innerHTML = `測驗完成！您答對了 ${correctCount} / ${quizBank.length} 題<br>正確率 ${accuracyRate}%<br><span class="summary-note">${statsNotice}</span>`;
        isSummaryVisible = true;
        document.title = '測驗結果｜PQS';
        document.body.classList.remove('chrome-hidden');
        summaryBox.style.display = 'block';
        renderStatsPanel();
        updateSummaryWrongRetryControls();
        scrollExamPanelToTop();
	const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            const footerBtnGroup = submitBtn.parentElement;
            footerBtnGroup.innerHTML = ''; // 清空原本的紅色送出按鈕
            
            const topBtn = document.createElement('button');
            topBtn.className = 'action-btn';
            topBtn.style.backgroundColor = '#3498db'; 
            topBtn.style.fontSize = '14px';
            topBtn.style.padding = '6px 18px';
            topBtn.textContent = '返回頂部 (Return to Top)';
            
            topBtn.onclick = function() {
                const leftPanel = document.querySelector('.exam-left-panel');
                if (leftPanel) {
                    leftPanel.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
            footerBtnGroup.appendChild(topBtn);
        }
        
        // 鎖死 Mark 按鈕
        document.querySelectorAll('.mark-btn').forEach(btn => {
            btn.onclick = null;
            btn.style.cursor = 'not-allowed';
        });
    }
