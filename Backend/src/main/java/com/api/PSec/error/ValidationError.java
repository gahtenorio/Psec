package com.api.PSec.error;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ValidationError extends StandardError implements Serializable {
	private static final long serialVersionUID = 1L;

	private List<FieldMessage> errors = new ArrayList<>();

	public ValidationError() {
	}

	public ValidationError(Integer status, String msg) {
		super(status, msg);
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<FieldMessage> getErrors() {
		return errors;
	}

	public void addError(String field, String message) {
		errors.add(new FieldMessage(field, message));
	}

}
