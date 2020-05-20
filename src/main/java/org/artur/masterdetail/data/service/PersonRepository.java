package org.artur.masterdetail.data.service;

import org.artur.masterdetail.data.entity.Person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Integer> {

}