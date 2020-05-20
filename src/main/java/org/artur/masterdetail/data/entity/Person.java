package org.artur.masterdetail.data.entity;

import javax.persistence.Entity;

import org.artur.masterdetail.data.AbstractEntity;

@Entity
public class Person extends AbstractEntity {

    private Integer id;

    private String profilePicture;

    private String firstName;

    private String lastName;

    private String email;

    private String title;



    // Methods
}
