package com.api.PSec.models;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.api.PSec.models.enums.PerfilAcesso;
import com.api.PSec.service.validators.UsuarioInsert;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "usuario")
@UsuarioInsert
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 80, nullable = false)
	@NotBlank(message = "O Nome é Obrigatorio")
	private String nome;

	@Column(length = 80, nullable = false)
	@NotBlank(message = "O Sobrenome é Obrigatorio")
	private String sobrenome;

	@Column(name = "cpf", nullable = false, unique = true)
	@NotBlank(message = "O CPF é Obrigatorio")
	private String cpf;

	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "data_nascimento", nullable = false)
	private Date dataNascimento;

	@ElementCollection
	@CollectionTable(name = "usuario_telefone")
	@Column(name = "telefone")
	@NotNull(message = "Informe um telefone para contato")
	@Size(min = 1, message = "É necessário informar pelo menos um telefone para contato")
	private List<String> telefones = new ArrayList<>();

	@Column(length = 60, nullable = false, unique = true)
	@NotBlank(message = "O Email é Obrigatorio")
	@Email(message = "Informe um Email válido")
	private String email;

	@Column(length = 100, nullable = false)
	@NotBlank(message = "A senha é Obrigatoria")
	private String senha;

	@OneToMany(mappedBy = "usuario")
	@JsonIgnore
	private List<Ocorrencia> ocorrencia = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "usuario_perfil")
	@NotNull(message = "Informe o perfil do usuario")
	@Size(min = 1, message = "Informe pelo menos um perfil para o usuário")
	private Set<Integer> perfis = new HashSet<>();

	@Embedded
	private Endereco endereco;

	public Usuario() {
	}

	public Usuario(Long id, String nome, String sobrenome, String cpf, Date dataNascimento, String email, String senha,
			Endereco endereco) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
		this.email = email;
		this.senha = senha;
		this.endereco = endereco;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public List<String> getTelefones() {
		return telefones;
	}

	public void setTelefones(List<String> telefones) {
		this.telefones = telefones;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
		;
	}

	public List<Ocorrencia> getOcorrencia() {
		return ocorrencia;
	}

	public void setOcorrencia(List<Ocorrencia> ocorrencia) {
		this.ocorrencia = ocorrencia;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public void setEndereco(String cep, String rua, String numero, String bairro, String cidade, String estado) {
		this.endereco = new Endereco(cep, rua, numero, bairro, cidade, estado);
	}

	public void addPerfil(PerfilAcesso perfil) {
		perfis.add(perfil.getCodigo());
	}

	public Set<PerfilAcesso> getPerfis() {
		return perfis.stream().map(x -> PerfilAcesso.toEnum(x)).collect(Collectors.toSet());
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cpf == null) ? 0 : cpf.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (cpf == null) {
			if (other.cpf != null)
				return false;
		} else if (!cpf.equals(other.cpf))
			return false;
		if (id != other.id)
			return false;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		return true;
	}

}
