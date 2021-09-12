package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entities.exam.Question;
import com.exam.entities.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@Autowired
	private QuizService quizSerive;

	// add
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question ques) {
		return ResponseEntity.ok(this.questionService.addQuestion(ques));
	}

	// update
	@PutMapping("/")
	public Question updateQuestion(@RequestBody Question ques) {
		return this.questionService.updateQuestion(ques);
	}

	// get question of quiz
	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("quizId") Long quizId) {

		Quiz quiz = this.quizSerive.getQuiz(quizId);
		Set<Question> questions = quiz.getQuestions();
		List<Question> list = new ArrayList(questions);
		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()) + 1);
		}
		list.forEach(q->q.setAnswer(""));
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}

	// get all question of quiz
	@GetMapping("/quiz/all/{quizId}")
	public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("quizId") Long quizId) {
		Quiz quiz = new Quiz();
		quiz.setqId(quizId);
		Set<Question> questionsOfQuiz = this.questionService.getQuestionOfQuiz(quiz);
		return ResponseEntity.ok(questionsOfQuiz);

	}

	// get question
	@GetMapping("/{quesId}")
	public Question getQuestion(@PathVariable("quesId") long quesId) {
		return this.questionService.getQuestion(quesId);
	}

	// delete
	@DeleteMapping("/{quesId}")
	public void delete(@PathVariable("quesId") Long quesId) {
		this.questionService.deleteQuestion(quesId);
	}

	// evaluate quiz
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
		double marksGot = 0;
		int attempted = 0;
		int correctAnswers = 0;
		for (Question q : questions) {
			Question question = this.questionService.get(q.getQuesId());
			
			if (question.getAnswer().equals(q.getGivenAnswer())) {
				correctAnswers++;
				double singleMarks = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
				marksGot += singleMarks;
			}

			if (q.getGivenAnswer() != null)
				attempted++;
		}
		
		Map<Object, Object> map = Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted);
		
		return ResponseEntity.ok(map);
	}
}
