package com.bolsistas.crudbolsista.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Bolsistas {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String documento;
	private String banco;
	private String agencia;
	private int conta;
	
	
	
}
