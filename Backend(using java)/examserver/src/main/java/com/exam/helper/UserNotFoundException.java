package com.exam.helper;

public class UserNotFoundException extends Exception{
	
	private static final long serialVersionUID = 1L;

	public UserNotFoundException() {
		super("No user with this username found in database!!");
	}
	
	public UserNotFoundException(String msg) {
		super(msg);
	}
}
