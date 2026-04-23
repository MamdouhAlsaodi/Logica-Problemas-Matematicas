const MathProblem = require('../models/MathProblem');

exports.getAllProblems = async (req, res) => {
  try {
    const { difficulty } = req.query;
    const filter = difficulty ? { difficulty } : {};
    const problems = await MathProblem.find(filter);
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const newProblem = new MathProblem(req.body);
    const problem = await newProblem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating problem', error: err.message });
  }
};

exports.getProblemById = async (req, res) => {
  try {
    const problem = await MathProblem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const problem = await MathProblem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating problem' });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const problem = await MathProblem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting problem' });
  }
};
