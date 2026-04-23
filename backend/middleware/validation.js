const { body, validationResult } = require('express-validator');

const validateProblem = [
  body('question').notEmpty().withMessage('A pergunta é obrigatória'),
  body('answer').notEmpty().withMessage('A resposta é obrigatória'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('A dificuldade deve ser: easy, medium ou hard'),
  body('category').notEmpty().withMessage('A categoria é obrigatória'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateProblem };
