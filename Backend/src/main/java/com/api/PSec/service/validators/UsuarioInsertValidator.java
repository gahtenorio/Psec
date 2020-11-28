package com.api.PSec.service.validators;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.api.PSec.models.Usuario;
import com.api.PSec.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

public class UsuarioInsertValidator implements ConstraintValidator<UsuarioInsert, Usuario> {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private HttpServletRequest request;

	@Override
	public boolean isValid(Usuario value, ConstraintValidatorContext context) {
		if (request == null) {
			return true;
		}
		@SuppressWarnings("unchecked")
		Map<String, String> map = (Map<String, String>) request
				.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long id = null;
		if (map.get("id") != null) {
			id = Long.parseLong(map.get("id"));
		}

		Usuario aux = usuarioRepository.findByCpf(value.getCpf());
		if (aux != null) {
			if (id == null || !id.equals(aux.getId())) {
				context.disableDefaultConstraintViolation();
				context.buildConstraintViolationWithTemplate("Já existe um usuário com o CPF informado").addPropertyNode("cpf")
						.addConstraintViolation();
				return false;
			}
		}
		return true;
	}

}
