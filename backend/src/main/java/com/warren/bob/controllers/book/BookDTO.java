package com.warren.bob.controllers.book;

import com.warren.bob.models.book.BookStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookDTO {

    private Long id;

    private String title;

    private BookStatus bookStatus;

    private LocalDate startDate;

    private LocalDate endDate;

    private String author;

    private Integer pages;

    private String publisher;

    private String subject;
}
