package com.api.PSec.models;

import java.io.Serializable;

public class CredenciaisAcesso implements Serializable {
	private static final long serialVersionUID = 1L;

	private String cpf;
	private String senha;

	public CredenciaisAcesso() {
	}

	public CredenciaisAcesso(String cpf, String senha) {
		super();
		this.cpf = cpf;
		this.senha = senha;
	}

	public String getCpf() {
		return cpf;
	}

	public void setcpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

}
