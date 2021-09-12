package com.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByUsername(String userName);
	
//	public void deleteUserByUsername(String userName);
}
