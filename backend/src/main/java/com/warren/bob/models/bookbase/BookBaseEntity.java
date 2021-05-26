package com.warren.bob.models.bookbase;

import com.warren.bob.models.book.BookStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity(name="bookbase")
@Getter
@Setter
public class BookBaseEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String author;

    private Integer pages;

    private String publisher;

    private String subject;

}