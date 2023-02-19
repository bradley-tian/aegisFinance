# Aegis Finance
Aegis Finance revolutionizes employee reimbursements and fund transfers in the workplace by automating receipt tracking and auditing on-chain to enhance transparency, speed, and security.

## Inspiration
Reimbursements make up a core part of many companies' cash flow, yet there is no formalized, secure way to reimburse employees. In fact, expense reimbursement fraud costs US companies more than $1 billion per year. 

We identified flaws in the current way employees seek reimbursements from their employers. In particular, we identified two problems.

Firstly, the current manual process is inefficient and inaccurate. Employees currently pay for purchases (e.g. business trips) upfront and submit a receipt for reimbursement from the company later. This process is extremely inefficient, with employees often receiving reimbursements long after the purchase was made. This process is also manual and subject to inaccuracies, with company employees behind the scenes manually processing reimbursements which could lead to problems such as inaccurate data entries.

More importantly, the current process has a high prevalence of fraud and is susceptible to exploitation. Employees are required to submit proof of payment to receive reimbursements, but they may provide false receipts or make exaggerated claims for illegal private profits. The status quo could be exploited on a systematic level, leading to major financial damages to companies that are difficult to investigate.

## What it does
Aegis Finance is an on-chain solution that streamlines the reimbursement and auditing of employee expenses in an organization through a two-sided platform that increases efficiency and traceability to employees submitting requests and companies allocating funds.

For employees, our platform provides a dashboard displaying a complete history of their transactions and the status of their reimbursement claims (e.g. submitted, processing, paid). 

For employers, our platform would present an interface that supports comprehensive monitoring of transactions (categorizable by employee type, ID classification, etc.) and detailed analysis of individual transaction histories. 

Our web application is designed to serve both the employees and the organization. We allow employees to easily connect their bank account and submit reimbursement requests, which are then packaged and deployed to smart contracts on the Zetachain network. This gives organizations an immutable, traceable, and easily accessible record of payments. 

## How we built it
Our platform originates from a three-part design. Firstly, the frontend interface (React.js and Material UI Libraries), supports the visualization of transaction data and streamlined processing of reimbursement requests. Secondly, the backend system (Express and Node.js) facilitates data transfer between the frontend and databases. Finally, the data storage system (Supabase and ZetaChain networks) establishes an efficient pipeline for packaging and deploying transaction data/request information to smart contracts.

## Challenges we ran into
We spent a significant amount of time trying to connect Supabase with Retool as our frontend while integrating JS API backend functionality. Unfortunately, for the application we ended up building and its heavy use of API calls, it became impractical to use both Supabase and Retool due to entanglements with connection protocols and postgres-related difficulties. Hence, we decided against using Retool and opted for React as our frontend.

## Accomplishments that we're proud of
We are extremely proud of establishing a data pipeline that stores transaction data quickly and securely through a unique combination of Supabase’s database and the ZetaChain network. Upon recognizing that our transaction data are very organized in format and form many edge connections between each other, we decided to proceed with Supabase’s SQL-based, relational services, which significantly enhance search time and provide the user with a high-speed experience. 

The connection between Supabase and ZetaChain not only optimizes runtime efficiency but also creates a bijective authentication between records stored in the relational database and those deployed on-chain, ensuring both immutability and fast look-up capabilities at the same time.

## What we learned
Each of our team members had a deep understanding of a specific part of our tech stack; whether that be the frontend, database, blockchain integration, or smart contract development. We learned a lot about how these tools can be integrated and applied to solve such a large real-world issue.

Furthermore, by spending the first day going booth to booth and speaking individually to each and every sponsor, we learned about the intricacies of each platform. This allowed us to build a platform that synthesized the strengths of various tools and technologies. For example, we were able to take advantage of the efficiency of Supabase’s database and ZetaChain’s security and transparency in our platform.=

## What's next for Aegis Finance
There are a few next steps for Aegis Finance. Firstly, to make the process even more secure, we hope to integrate artificial intelligence and machine learning into our platform. We aim to create a logistic regression ML model using appropriate datasets to detect the presence of fraud in employee reimbursements. We were experimenting with InterSystems IntegratedML.

Secondly, we want to build out its full functionality and promised integrations. This means legitimately connecting a Plaid integration to view customer transactions, using Metamask API to allow each user to sign their own transaction, and building an Oracle between our Superbase database and smart contract so data is continually updated.

TreeHacks 2023, Bradley Tian, Joshua Chandiramani, Derrick Cui, Emily Park All Rights Reserved.
