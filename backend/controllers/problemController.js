const MathProblem = require('../models/MathProblem');

exports.getAllProblems = async (req, res) => {
  try {
    const { difficulty } = req.query;
    const filter = difficulty ? { difficulty } : {};
    const problems = await MathProblem.find(filter);
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Erro do Servidor', error: err.message });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const newProblem = new MathProblem(req.body);
    const problem = await newProblem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar problema', error: err.message });
  }
};

exports.getProblemById = async (req, res) => {
  try {
    const problem = await MathProblem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problema não encontrado' });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ message: 'ID inválido' });
  }
};

exports.checkAnswer = async (req, res) => {
  try {
    const problem = await MathProblem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problema não encontrado' });
    const { userAnswer } = req.body;
    const correct = userAnswer && userAnswer.trim().toLowerCase() === problem.answer.trim().toLowerCase();
    res.json({ correct, message: correct ? 'Resposta correta ✓' : 'Resposta incorreta ✗', correctAnswer: problem.answer });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao verificar resposta' });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const problem = await MathProblem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!problem) return res.status(404).json({ message: 'Problema não encontrado' });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar problema', error: err.message });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const problem = await MathProblem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problema não encontrado' });
    res.json({ message: 'Problema excluído com sucesso' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao excluir problema' });
  }
};
