# Summary App AI

### Project Description: 
Summary App AI is a web application that leverages Google Gemini LLM to generate summaries from user-input conversation texts. The app is built with a Node.js/Express backend, DynamoDB for data storage, and a React.js/Next.js frontend styled with Tailwind CSS. Users can input conversation text, get AI-generated summaries, and browse stored conversations filtered by user ID.

---

### Features:
+ Input raw conversation text and get AI-generated summaries
+ Summarization powered by Google Gemini LLM
+ Store and retrieve conversation summaries with metadata in DynamoDB
+ View and filter conversations by user ID
+ Detailed view for each summarized conversation

---

### How to Run the Backend:
1. Clone this repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file with the required environment variables (`PORT`, `GEMINI_API_KEY`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`)
5. Start the backend server: `node app.js`

---

### How to Run the Frontend:
1. Clone this repository
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend server: `npm run dev`
4. Access the application by navigating to http://localhost:3000 in the web browser

---

### Preview:
<img width="1920" height="467" alt="image" src="https://github.com/user-attachments/assets/4e0a75f3-32de-4b90-953a-9d8503b31459" />

<br><br>

<img width="1917" height="846" alt="image" src="https://github.com/user-attachments/assets/3f984aed-fb83-43a4-84cf-4e907066e9ee" />

<br><br>

<img width="1918" height="894" alt="Untitled" src="https://github.com/user-attachments/assets/6be83d67-9b7a-492b-bc3f-b86087d60c50" />

<br><br>

<img width="1920" height="589" alt="image" src="https://github.com/user-attachments/assets/bc18e0dd-23cb-4b91-b2c3-2e1a83efe228" />
