package com.api.PSec.resources;

import java.net.URI;

import javax.validation.Valid;

import com.api.PSec.models.Usuario;
import com.api.PSec.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/user")
public class UsuarioResource {

  @Autowired
  private UsuarioService usuarioService;

  //Lista todos os usuários registrados(Apenas o ADMIN tem esta permissão).
  @GetMapping()
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<?> findAll() {
    return new ResponseEntity<>(usuarioService.findAll(), HttpStatus.OK);
  }

  //Mostra um único usuário por o ID.
  @GetMapping("/{cpf}")
  public ResponseEntity<?> findById(@PathVariable String cpf) {
    Usuario usuario = usuarioService.findByCpf(cpf);
    return new ResponseEntity<>(usuario, HttpStatus.OK);
  }

  //Cadastra usuário.
  @PostMapping()
  public ResponseEntity<Void> save(@Valid @RequestBody Usuario usuario) {
    Usuario usuarioSave = usuarioService.save(usuario);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usuarioSave.getId())
        .toUri();
    return ResponseEntity.created(uri).build();
  }

  //Deleta um usuário.
  @DeleteMapping()
  public ResponseEntity<?> deletarUsuario(@RequestBody Usuario usuario) {
    verificarId(usuario.getId());
    usuarioService.delete(usuario);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //Atualiza os dados do usuário.
  @PutMapping("/{id}")
  public ResponseEntity<Void> update(@Valid @RequestBody Usuario usuario, @PathVariable Long id) {
    usuario.setId(id);
    verificarId(usuario.getId());
		usuarioService.update(usuario);
		return ResponseEntity.noContent().build();
	}

  private void verificarId(Long id) {
    if (usuarioService.findById(id) == null)
      throw new ResourceNotFoundException("ID: " + id + " Não encotrado!");
  }

}