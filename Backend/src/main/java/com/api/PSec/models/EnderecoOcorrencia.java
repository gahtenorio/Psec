package com.api.PSec.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class EnderecoOcorrencia implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(length = 100, nullable = false)
	private String rua;

	@Column(length = 80, nullable = false)
	private String bairro;

	@Column(length = 100, nullable = true)
	private String complemento;

	public EnderecoOcorrencia() {

	}

	public EnderecoOcorrencia(String rua, String bairro, String complemento) {
		super();
		this.rua = rua;
		this.bairro = bairro;
		this.complemento = complemento;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

}
