package com.exam.entities;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority{

	private String auth;
	
	public Authority(String auth) {
		this.auth = auth;
	}
	
	@Override
	public String getAuthority() {
		return this.auth;
	}
}
