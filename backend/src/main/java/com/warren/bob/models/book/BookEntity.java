package com.warren.bob.models.book;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;


@Entity(name="book")
@Getter
@Setter
public class BookEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private BookStatus bookStatus;

    private LocalDate startDate;

    private LocalDate endDate;
}