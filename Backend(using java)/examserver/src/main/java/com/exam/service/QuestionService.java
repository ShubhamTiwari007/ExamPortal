package com.exam.service;

import java.util.Set;

import com.exam.entities.exam.Question;
import com.exam.entities.exam.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	public Question updateQuestion(Question question);
	public Set<Question> getQuestions();
	public Question getQuestion(long quesId);
	public Set<Question> getQuestionOfQuiz(Quiz quiz);
	public void deleteQuestion(long quesId);
	public Question get(Long quesId);
}
