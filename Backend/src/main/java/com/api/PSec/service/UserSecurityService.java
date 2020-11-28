package com.api.PSec.service;

import com.api.PSec.models.Usuario;
import com.api.PSec.repository.UsuarioRepository;
import com.api.PSec.security.UserSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;;

@Service
public class UserSecurityService implements UserDetailsService {

	@Autowired
	private UsuarioRepository repository;

	@Override
	public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
		Usuario usuario = repository.findByCpf(cpf);
		if (usuario == null) {
			throw new UsernameNotFoundException(cpf);
		}
		return new UserSecurity(usuario.getId(), usuario.getCpf(), usuario.getSenha(), usuario.getPerfis());
	}

}