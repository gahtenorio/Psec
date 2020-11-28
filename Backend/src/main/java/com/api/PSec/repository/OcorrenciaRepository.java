package com.api.PSec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.api.PSec.models.Ocorrencia;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {

	Ocorrencia findById(long id);

	List<Ocorrencia> findByCidade(String cidade);

	List<Ocorrencia> findByIdUser(Integer idUser);
}
