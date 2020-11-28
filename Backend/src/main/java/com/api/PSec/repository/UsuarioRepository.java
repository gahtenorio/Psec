package com.api.PSec.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import com.api.PSec.models.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String> {

	@Transactional(readOnly = true)
	Usuario findByCpf(String cpf);

	@Transactional(readOnly = true)
	Usuario findByEmail(String email);

	Optional<Usuario> findById(Long id);

	void deleteById(Long id);

}
