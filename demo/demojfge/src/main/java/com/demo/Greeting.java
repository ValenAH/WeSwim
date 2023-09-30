package com.demo;

public class Greeting {
	private final long id;
	private final String content;
	public long getId() {
		return id;
	}
	
	//para dar y recibir valor
	public String getContent() {
		return content;
	}
	public Greeting(long id, String content) {
		super();
		this.id = id;
		this.content = content;
	}
	
}
