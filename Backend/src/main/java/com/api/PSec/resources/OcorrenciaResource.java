package com.api.PSec.resources;

import java.util.List;

import javax.validation.Valid;

import com.api.PSec.models.Ocorrencia;
import com.api.PSec.service.OcorrenciaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/ocorrencia")
public class OcorrenciaResource {

  @Autowired
  private OcorrenciaService ocorrenciaService;

  //Lista todas as ocorrências(apenas o ADMIN tem esta permissão).
  @GetMapping()
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Page<Ocorrencia>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page, 
			@RequestParam(value = "size", defaultValue = "20") Integer size, 
			@RequestParam(value = "direction", defaultValue = "ASC") String direction, 
			@RequestParam(value = "orderBy", defaultValue = "id") String orderBy) {
		Page<Ocorrencia> pageObj = ocorrenciaService.findAll(page, size, direction, orderBy);
		return ResponseEntity.ok().body(pageObj);
	}
  
  //Lista ocorrências filtradas por cidade.
  @GetMapping("/cidade")
  public @ResponseBody List<Ocorrencia> findByCity(@RequestParam("cidade") String cidade) {
    List<Ocorrencia> ocorrencia = ocorrenciaService.findByCity(cidade);
    return ocorrencia;
  }

  //Lista ocorrências filtradas por usuário.
  @GetMapping("/user")
  public @ResponseBody List<Ocorrencia> findByUser(@RequestParam("idUser") Integer idUser) {
    List<Ocorrencia> ocorrencia = ocorrenciaService.findByUser(idUser);
    return ocorrencia;
  }

  //Mostra uma única ocorrência por o ID.
  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable(value = "id") long id) {
    verificarId(id);
    Ocorrencia ocorrencia = ocorrenciaService.findById(id);
    return new ResponseEntity<>(ocorrencia, HttpStatus.OK);
  }

  //Registra ocorrências.
  @PostMapping()
  public ResponseEntity<Void> save(@Valid @RequestBody Ocorrencia ocorrencia) {
    ocorrenciaService.save(ocorrencia);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  //Deleta ocorrências.
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarOcorrencia(@PathVariable(value = "id") long id) {
    ocorrenciaService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  private void verificarId(Long id) {
    if (ocorrenciaService.findById(id) == null)
      throw new ResourceNotFoundException("ID: " + id + " Não encotrado!");
  }

}