package com.api.PSec.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import com.api.PSec.models.enums.TipoOcorrencia;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "ocorrencias")
public class Ocorrencia implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	@Column(name = "data_registro", nullable = false)
	private Date dataRegistro;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoOcorrencia Tipo;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "horario_ocorrido", nullable = false)
	@JsonFormat(pattern = "HH:mm")
	private Date horarioOcorrido;

	@Embedded
	private EnderecoOcorrencia enderecoOcorrencia;

	@Column(name = "ocorrido", nullable = false)
	@NotBlank(message = "Informe o ocorrido")
	private String ocorrido;

	@Column(name = "cidade", nullable = false)
	@NotBlank(message = "Informe  a cidade do ocorrido")
	private String cidade;

	@ManyToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	private Usuario usuario;

	//Necessário para filtrar ocorrências por usuário
	@Column(name = "idUser")
	private Integer idUser;

	public Ocorrencia() {

	}

	public Ocorrencia(Long id, Date dataRegistro, TipoOcorrencia tipo, Date horarioOcorrido,
			EnderecoOcorrencia enderecoOcorrencia, String ocorrido, String cidade, Usuario usuario, Integer idUser) {
		super();
		this.id = id;
		this.dataRegistro = dataRegistro;
		this.Tipo = tipo;
		this.horarioOcorrido = horarioOcorrido;
		this.enderecoOcorrencia = enderecoOcorrencia;
		this.ocorrido = ocorrido;
		this.cidade = cidade;
		this.usuario = usuario;
		this.idUser = idUser;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public TipoOcorrencia getTipo() {
		return Tipo;
	}

	public void setTipo(TipoOcorrencia tipo) {
		Tipo = tipo;
	}

	public Date getHorarioOcorrido() {
		return horarioOcorrido;
	}

	public void setHorarioOcorrido(Date horarioOcorrido) {
		this.horarioOcorrido = horarioOcorrido;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public String getOcorrido() {
		return ocorrido;
	}

	public void setOcorrido(String ocorrido) {
		this.ocorrido = ocorrido;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public EnderecoOcorrencia getEnderecoOcorrencia() {
		return enderecoOcorrencia;
	}

	public void setEnderecoOcorrencia(EnderecoOcorrencia enderecoOcorrencia) {
		this.enderecoOcorrencia = enderecoOcorrencia;
	}

	public void EnderecoOcorrencia(String rua, String bairro, String complemento) {
		this.enderecoOcorrencia = new EnderecoOcorrencia(rua, bairro, complemento);
	}

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

}
