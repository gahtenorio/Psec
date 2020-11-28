package com.api.PSec.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.api.PSec.models.Ocorrencia;
import com.api.PSec.repository.OcorrenciaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Service
public class OcorrenciaService {

  @Autowired
  private OcorrenciaRepository ocorrenciaRepository;

  public Page<Ocorrencia> findAll(Integer page, Integer size, String direction, String orderBy) {
    PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), orderBy);
    return ocorrenciaRepository.findAll(pageRequest);
  }

  public List<Ocorrencia> findByCity(String cidade) {
    return ocorrenciaRepository.findByCidade(cidade);
  }

  public List<Ocorrencia> findByUser(Integer idUser) {
    return ocorrenciaRepository.findByIdUser(idUser);
  }

  public Ocorrencia findById(Long id) {
    Optional<Ocorrencia> obj = ocorrenciaRepository.findById(id);
    return obj.orElse(null);
  }

  public Ocorrencia save(Ocorrencia ocorrencia) {
    ocorrencia.setDataRegistro(new Date());
    return ocorrenciaRepository.save(ocorrencia);
  }

  public Ocorrencia update(Ocorrencia ocorrencia) {
    findById(ocorrencia.getId());
    return ocorrenciaRepository.save(ocorrencia);
  }

  public void deleteById(Long id) {
		ocorrenciaRepository.deleteById(id);
	}

}