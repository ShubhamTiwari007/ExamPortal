package com.exam.helper;

public class UserFoundException extends Exception{

	private static final long serialVersionUID = 1L;

	public UserFoundException() {
		super("User with this username is already there in DB !! try with anothe username");
	}
	
	public UserFoundException(String msg) {
		super(msg);
	}

}
