package com.api.PSec.service;

import java.util.List;
import java.util.Optional;

import com.api.PSec.error.DataIntegrityException;
import com.api.PSec.models.Usuario;
import com.api.PSec.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private BCryptPasswordEncoder encoder;

  public List<Usuario> findAll() {
    return (List<Usuario>) usuarioRepository.findAll();
  }

  public Usuario findById(Long id) {
    Optional<Usuario> obj = usuarioRepository.findById(id);
    return obj.orElse(null);
  }

  public Usuario findByCpf (String cpf) {
    return usuarioRepository.findByCpf(cpf);
  }

  public Usuario save(Usuario usuario) {
    usuario.setSenha(encoder.encode(usuario.getSenha()));
    return usuarioRepository.save(usuario);
  }

  public Usuario update(Usuario usuario) {
    usuario.setSenha(encoder.encode(usuario.getSenha()));
    findById(usuario.getId());
    return usuarioRepository.save(usuario);
  }

  public void delete(Usuario usuario) {
    try {
      usuarioRepository.delete(usuario);
    } catch (DataIntegrityException e) {
      throw new DataIntegrityException("Não é possível deletar um usuário com ocorrências vinculadas a ele.");
    }
  }
}