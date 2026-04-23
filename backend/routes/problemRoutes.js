const express = require('express');
const router = express.Router();
const { validateProblem } = require('../middleware/validation');
const {
  getAllProblems,
  createProblem,
  getProblemById,
  checkAnswer,
  updateProblem,
  deleteProblem
} = require('../controllers/problemController');

router.get('/', getAllProblems);
router.post('/', validateProblem, createProblem);
router.get('/:id', getProblemById);
router.post('/:id/check', checkAnswer);
router.put('/:id', validateProblem, updateProblem);
router.delete('/:id', deleteProblem);

module.exports = router;
