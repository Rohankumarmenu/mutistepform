const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

const sessions = {};

const formDefinition = {
  steps: [
    { id: 1, fields: ['username', 'email', 'password'] },
    { id: 2, fields: ['firstname', 'lastname', 'phone'] },
    { id: 3, fields: ['cardnum', 'cvcnum', 'expdate'] },
   
  ],
};

// API endpoints

// Start a new form session
app.post('/api/form/start', (req, res) => {
  const sessionId = generateSessionId();
  sessions[sessionId] = { currentStep: 1, data: {} };
  res.json({ sessionId });
});

// Get the current step of the form
app.get('/api/form/:session_id/step', (req, res) => {
  const { session_id } = req.params;
  const session = sessions[session_id];
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const currentStep = formDefinition.steps[session.currentStep - 1];
  res.json({ currentStep, data: session.data });
});

// Submitting the data for the current step of the form
app.post('/api/form/:session_id/submit', (req, res) => {
  const { session_id } = req.params;
  const session = sessions[session_id];
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const currentStep = formDefinition.steps[session.currentStep - 1];
  const submittedData = req.body;



  // Storing the submitted data
  session.data = { ...session.data, ...submittedData };

  // Moving now to the next step if not the last step
  if (session.currentStep < formDefinition.steps.length) {
    session.currentStep += 1;
  }

  res.json({ message: 'Data submitted successfully' });
});

// Helper function to generate a unique session ID (for simplicity)
function generateSessionId() {
  return Math.random().toString(36).substring(7);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
