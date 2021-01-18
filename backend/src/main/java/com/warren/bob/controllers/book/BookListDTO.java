package com.warren.bob.controllers.book;

import com.warren.bob.models.book.BookStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookListDTO {

    private Long id;
    private String title;
    private BookStatus status;
}
