package com.sunbeam.controller;

import java.util.Base64;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.SigninRequest;
import com.sunbeam.dto.SigninResponse;
import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.User;
import com.sunbeam.security.JwtUtils;
import com.sunbeam.service.UserService;

@RestController
@RequestMapping("/login")
public class LoginController {
@Autowired
private UserService userService;
@Autowired
private AuthenticationManager authMgr;
@Autowired
private JwtUtils jwtUtils;
@Autowired
private UserDao udao;
@CrossOrigin(origins = "http://localhost:3000")
@PostMapping("/signin")
public ResponseEntity<?> authenticateUser(@RequestBody 
		@Valid SigninRequest request) {
	System.out.println("in sign in" + request);
	//create a token(implementation of Authentication i/f)
	//to store un verified user email n pwd
	UsernamePasswordAuthenticationToken token=new 
			UsernamePasswordAuthenticationToken(request.getEmail(), 
					request.getPassword());
	//invoke auth mgr's authenticate method;
	Authentication verifiedToken = authMgr.authenticate(token);
	//=> authentication n authorization  successful !
	System.out.println(verifiedToken.getPrincipal().getClass());//custom user details object
	//create JWT n send it to the clnt in response
	User user1 = udao.findByEmail(request.getEmail()).orElseThrow();
	String base64Image=Base64.getEncoder().encodeToString(user1.getUserImage());
	SigninResponse resp=new SigninResponse
			(jwtUtils.generateJwtToken(verifiedToken),
			user1.getRole().name(), user1.getUserId(),base64Image);
	System.out.println(resp.getId());
	return ResponseEntity.
			status(HttpStatus.CREATED).body(resp);
}
}
